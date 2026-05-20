import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import * as XLSX from "xlsx";

// Cabeceras aceptadas (lowercase, sin tildes)
const COL_MAP: Record<string, string> = {
  "nombre del examen": "nombre",
  "nombre": "nombre",
  "codigo": "codigo",
  "código": "codigo",
  "categoria": "categoria",
  "categoría": "categoria",
  "subcategoria": "subcategoria",
  "subcategoría": "subcategoria",
  "tipo de muestra": "muestra",
  "muestra": "muestra",
  "preparacion del paciente": "preparacion",
  "preparación del paciente": "preparacion",
  "preparacion": "preparacion",
  "preparación": "preparacion",
  "plazo de entrega": "tiempo",
  "tiempo": "tiempo",
  "descripcion": "descripcion",
  "descripción": "descripcion",
  "activo": "activo",
};

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No se recibió archivo" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawRows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  if (rawRows.length === 0) return NextResponse.json({ error: "El archivo está vacío" }, { status: 400 });

  // Mapear columnas
  const mapped = rawRows
    .map((row) => {
      const out: Record<string, string | boolean> = {};
      for (const [k, v] of Object.entries(row)) {
        const key = COL_MAP[normalize(k)];
        if (key) out[key] = String(v).trim();
      }
      return out;
    })
    .filter((r) => r.nombre && String(r.nombre).trim() !== "");

  if (mapped.length === 0) {
    return NextResponse.json(
      { error: "No se encontraron filas válidas. Asegúrate de que la columna 'Nombre del Examen' exista." },
      { status: 400 }
    );
  }

  // Insertar en lotes, actualizando por código si existe
  let count = 0;
  for (let i = 0; i < mapped.length; i += 50) {
    const lote = mapped.slice(i, i + 50);
    for (const row of lote) {
      const data = {
        nombre: String(row.nombre),
        codigo: row.codigo ? String(row.codigo) : null,
        categoria: row.categoria ? String(row.categoria) : null,
        subcategoria: row.subcategoria ? String(row.subcategoria) : null,
        muestra: row.muestra ? String(row.muestra) : null,
        preparacion: row.preparacion ? String(row.preparacion) : null,
        tiempo: row.tiempo ? String(row.tiempo) : null,
        descripcion: row.descripcion ? String(row.descripcion) : null,
        activo: true,
      };
      if (row.codigo) {
        await prisma.examen.upsert({
          where: { codigo: String(row.codigo) } as any,
          update: data,
          create: data,
        });
      } else {
        await prisma.examen.create({ data });
      }
      count++;
    }
  }

  return NextResponse.json({ ok: true, count });
}
