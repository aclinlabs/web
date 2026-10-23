import * as XLSX from "xlsx";
import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import mapaDrive from "./instructivosDrive.json";

/**
 * Importacion del listado oficial de examenes (Excel de Aclin).
 *
 * El Excel trae el titulo en la fila 1 y la cabecera en la fila 3, y los
 * instructivos van como hipervinculos a Google Drive dentro de las celdas
 * "Preparacion del Paciente" e "Instructivo 2/3/4". Aca se leen esos links,
 * se cambian por el PDF alojado en el sitio (public/instructivos) y se guardan
 * como lista en el campo `instructivos` de cada examen.
 *
 * El listado se toma como la verdad completa: lo que no viene se desactiva.
 */

export interface Instructivo {
  etiqueta: string;
  url: string;
}

export interface FilaExamen {
  nombre: string;
  codigo: string | null;
  categoria: string | null;
  subcategoria: string | null;
  muestra: string | null;
  preparacion: string | null;
  tiempo: string | null;
  lugarToma: string | null;
  descripcion: string | null;
  instructivos: Instructivo[];
}

export interface ResultadoImportacion {
  actualizados: number;
  creados: number;
  desactivados: number;
  creadosNombres: string[];
  desactivadosNombres: string[];
}

type Campo = Exclude<keyof FilaExamen, "instructivos">;

// Cabeceras aceptadas (en minusculas y sin tildes) -> campo del examen
const COLUMNAS: Record<string, Campo> = {
  "nombre del examen": "nombre",
  nombre: "nombre",
  codigo: "codigo",
  categoria: "categoria",
  subcategoria: "subcategoria",
  "tipo de muestra": "muestra",
  muestra: "muestra",
  "preparacion del paciente": "preparacion",
  preparacion: "preparacion",
  "plazo de entrega": "tiempo",
  tiempo: "tiempo",
  "lugar de toma de muestra": "lugarToma",
  "lugar de toma": "lugarToma",
  descripcion: "descripcion",
};

const mapaInstructivos = mapaDrive as Record<string, { archivo: string; titulo: string; codigo: string }>;

// DOC-CLI-032 -> PDF local. Sirve para las columnas de referencia del Excel
// ("Codigo instructivo"), que a veces listan mas documentos de los que caben
// como hipervinculo (el panel de ITS necesita siete).
const porCodigoDoc = new Map(Object.values(mapaInstructivos).map((i) => [i.codigo, i]));

// "Indicaciones para toma de muestras de secrecion uretral" -> "Secrecion uretral"
export function etiquetaCorta(titulo: string) {
  const t = titulo.replace(/^indicaciones(?:\s+generales)?\s+para(?:\s+la)?\s+toma\s+de\s+muestras?\s+(?:(?:de|para|del|en)\b\s*)?/i, "").trim();
  return t ? t[0].toUpperCase() + t.slice(1) : titulo;
}

function sinTildes(texto: string) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function limpiar(valor: unknown): string {
  return String(valor ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Clave para emparejar examenes por nombre, tolerante a tildes, espacios y mayusculas. */
export function normalizarNombre(nombre: string) {
  return sinTildes(nombre)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Link de Drive -> PDF del sitio, si lo tenemos descargado. Si no, se deja el link tal cual. */
export function resolverUrlInstructivo(url: string) {
  const id = url.match(/\/d\/([^/?#]+)/)?.[1] ?? url.match(/[?&]id=([^&#]+)/)?.[1];
  return (id && mapaInstructivos[id]?.archivo) || url;
}

// "Ver instructivo (Orina 24 hrs)" -> "Orina 24 hrs"; "Ver instructivo" -> ""
function etiquetaDesde(texto: string) {
  const linea = texto.split("\n").find((l) => /instructivo/i.test(l)) ?? texto;
  return limpiar(
    linea
      .replace(/.*instructivo/i, "")
      .replace(/^[\s:(-]+|[\s)]+$/g, "")
      .replace(/^tipo de muestra[\s:]*/i, "")
  );
}

function esUrl(texto: string) {
  return /^https?:\/\//i.test(texto.trim());
}

/** Lee el Excel (o CSV) y devuelve una fila por examen, con sus instructivos. */
export function leerExamenes(buffer: Buffer): FilaExamen[] {
  const libro = XLSX.read(buffer, { type: "buffer" });
  const hoja = libro.Sheets[libro.SheetNames[0]];
  if (!hoja || !hoja["!ref"]) return [];
  const rango = XLSX.utils.decode_range(hoja["!ref"]);

  const celda = (r: number, c: number) => hoja[XLSX.utils.encode_cell({ r, c })];
  const texto = (r: number, c: number) => limpiar(celda(r, c)?.v);

  // La cabecera no siempre es la primera fila: el listado oficial trae un titulo arriba.
  let filaCabecera = -1;
  for (let r = rango.s.r; r <= Math.min(rango.e.r, rango.s.r + 20); r++) {
    for (let c = rango.s.c; c <= rango.e.c; c++) {
      if (COLUMNAS[sinTildes(texto(r, c)).toLowerCase()] === "nombre") filaCabecera = r;
    }
    if (filaCabecera >= 0) break;
  }
  if (filaCabecera < 0) return [];

  const campos = new Map<number, Campo>();
  const columnasInstructivo: number[] = [];
  for (let c = rango.s.c; c <= rango.e.c; c++) {
    const cab = sinTildes(texto(filaCabecera, c)).toLowerCase();
    if (COLUMNAS[cab]) campos.set(c, COLUMNAS[cab]);
    // "Instructivo", "Instructivo 2", ... (los "Codigo instructivo" son solo referencia interna)
    if (/^instructivo(\s*\d+)?$/.test(cab)) columnasInstructivo.push(c);
  }

  const filas: FilaExamen[] = [];
  for (let r = filaCabecera + 1; r <= rango.e.r; r++) {
    const fila: FilaExamen = {
      nombre: "", codigo: null, categoria: null, subcategoria: null, muestra: null,
      preparacion: null, tiempo: null, lugarToma: null, descripcion: null, instructivos: [],
    };
    for (const [c, campo] of campos) {
      const v = texto(r, c);
      if (v) fila[campo] = v;
    }
    if (!fila.nombre) continue;

    // Instructivo que viene como hipervinculo en la celda de preparacion
    const colPrep = [...campos].find(([, campo]) => campo === "preparacion")?.[0];
    if (colPrep !== undefined) {
      const cel = celda(r, colPrep);
      const crudo = String(cel?.v ?? "");
      const link: string | undefined = cel?.l?.Target;
      if (link) fila.instructivos.push({ etiqueta: etiquetaDesde(crudo), url: resolverUrlInstructivo(link) });
      // La preparacion se guarda sin la linea "Ver instructivo": el link va aparte.
      const sinLink = crudo
        .split("\n")
        .filter((l) => !/ver instructivo/i.test(l))
        .join("\n")
        .trim();
      fila.preparacion = sinLink ? limpiar(sinLink) : null;
    }

    for (const c of columnasInstructivo) {
      const cel = celda(r, c);
      const crudo = String(cel?.v ?? "");
      const link: string | undefined = cel?.l?.Target ?? (esUrl(crudo) ? crudo.trim() : undefined);
      if (link) fila.instructivos.push({ etiqueta: esUrl(crudo) ? "" : etiquetaDesde(crudo), url: resolverUrlInstructivo(link) });
    }

    // Codigos DOC-CLI que aparezcan en cualquier celda de la fila y aun no esten
    // enlazados: se agregan con el PDF local. Si no tenemos ese PDF, se omite.
    const yaEnlazados = new Set(fila.instructivos.map((i) => i.url));
    for (let c = rango.s.c; c <= rango.e.c; c++) {
      for (const codigo of texto(r, c).toUpperCase().match(/DOC-CLI-\d{3}/g) ?? []) {
        const doc = porCodigoDoc.get(codigo);
        if (doc && !yaEnlazados.has(doc.archivo)) {
          yaEnlazados.add(doc.archivo);
          fila.instructivos.push({ etiqueta: etiquetaCorta(doc.titulo), url: doc.archivo });
        }
      }
    }

    if (fila.lugarToma && /^todas$/i.test(fila.lugarToma)) fila.lugarToma = "Todas";
    filas.push(fila);
  }
  return filas;
}

/**
 * Aplica el listado a la base: actualiza por nombre, crea los nuevos y
 * desactiva los que ya no vienen. Si el mismo nombre esta repetido en la base,
 * se conserva uno (de preferencia el que tiene codigo) y el resto se desactiva.
 */
export async function importarExamenes(filas: FilaExamen[]): Promise<ResultadoImportacion> {
  const existentes = await prisma.examen.findMany({ select: { id: true, nombre: true, codigo: true, activo: true } });
  const porNombre = new Map<string, typeof existentes>();
  for (const e of existentes) {
    const clave = normalizarNombre(e.nombre);
    porNombre.set(clave, [...(porNombre.get(clave) ?? []), e]);
  }
  for (const lista of porNombre.values()) lista.sort((a, b) => Number(Boolean(b.codigo)) - Number(Boolean(a.codigo)));

  const usados = new Set<string>();
  const operaciones: Prisma.PrismaPromise<unknown>[] = [];
  const resultado: ResultadoImportacion = { actualizados: 0, creados: 0, desactivados: 0, creadosNombres: [], desactivadosNombres: [] };

  for (const fila of filas) {
    const { instructivos, ...resto } = fila;
    const data = { ...resto, instructivos: instructivos as unknown as Prisma.InputJsonValue, activo: true };
    const candidato = (porNombre.get(normalizarNombre(fila.nombre)) ?? []).find((e) => !usados.has(e.id));
    if (candidato) {
      usados.add(candidato.id);
      operaciones.push(prisma.examen.update({ where: { id: candidato.id }, data }));
      resultado.actualizados++;
    } else {
      operaciones.push(prisma.examen.create({ data }));
      resultado.creados++;
      resultado.creadosNombres.push(fila.nombre);
    }
  }

  for (const e of existentes) {
    if (!usados.has(e.id) && e.activo) {
      operaciones.push(prisma.examen.update({ where: { id: e.id }, data: { activo: false } }));
      resultado.desactivados++;
      resultado.desactivadosNombres.push(e.nombre);
    }
  }

  // Son ~600 escrituras; con el limite por defecto (5 s) la transaccion vence y se revierte.
  await prisma.$transaction(operaciones, { timeout: 180_000, maxWait: 15_000 });
  return resultado;
}
