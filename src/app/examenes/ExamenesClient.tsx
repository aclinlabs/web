"use client";
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";

interface Examen {
  id: string;
  nombre: string;
  codigo?: string | null;
  categoria?: string | null;
  subcategoria?: string | null;
  descripcion?: string | null;
  preparacion?: string | null;
  tiempo?: string | null;
  muestra?: string | null;
}

function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const INSTRUCTIVOS_DIR = "/instructivos";
const INSTR = {
  clonidina: `${INSTRUCTIVOS_DIR}/CONSENTIMIENTO INFORMADO PARA TEST DE ESTIMULACIÓN CON CLONIDINA.pdf`,
  vih: `${INSTRUCTIVOS_DIR}/DETECCIÓN DEL VIRUS DE LA INMUNODEFICIENCIA HUMANA (VIH).pdf`,
  hemoglobinaDeposicion: `${INSTRUCTIVOS_DIR}/HEMOGLOBINA HUMANA EN DEPOSICIÓN (1, 2 o 3 MUESTRAS).pdf`,
  sangreGeneral: `${INSTRUCTIVOS_DIR}/INSTRUCTIVO GENERAL PARA TOMA DE MUESTRAS DE SANGRE.pdf`,
  orinaVacio: `${INSTRUCTIVOS_DIR}/INSTRUCTIVO ORINA AL VACÍO - REVISIÓN IGNACIA TAPIA.pdf`,
  transporteDomicilio: `${INSTRUCTIVOS_DIR}/INSTRUCTIVO PARA EL CORRECTO TRANSPORTE DE MUESTRAS DOMICILIARIAS HASTA UNIDADES DE TOMA DE MUESTRAS.pdf`,
  deposicionFresca: `${INSTRUCTIVOS_DIR}/RECOLECCIÓN DE DEPOSICIÓN FRESCA.pdf`,
  orina24h: `${INSTRUCTIVOS_DIR}/RECOLECCIÓN DE ORINA DE 24 HORAS.pdf`,
  sangreOculta: `${INSTRUCTIVOS_DIR}/SANGRE OCULTA EN DEPOSICIONES.pdf`,
  orinaCompletaMujer: `${INSTRUCTIVOS_DIR}/TOMA DE MUESTRA PARA ORINA COMPLETA _ SEDIMENTO URINARIO - MUJER.pdf`,
  orinaCompletaHombre: `${INSTRUCTIVOS_DIR}/TOMA DE MUESTRA PARA ORINA COMPLETA _ SEDIMENTO URINARIO _ UROCULTIVO - HOMBRE.pdf`,
  urocultivoMujer: `${INSTRUCTIVOS_DIR}/TOMA DE MUESTRA PARA UROCULTIVO - MUJER.pdf`,
  coproparasitologico: `${INSTRUCTIVOS_DIR}/TOMA DE MUESTRAS EXAMEN COPROPARASITOLÓGICO SERIADO.pdf`,
};

function resolveInstructivo(examen: Examen): string | null {
  const nombre = normalizar(examen.nombre || "");
  const prep = normalizar(examen.preparacion || "");
  const muestra = normalizar(examen.muestra || "");
  const texto = `${nombre} ${prep}`;

  if (texto.includes("clonidina")) return INSTR.clonidina;
  if (texto.includes("inmunodeficiencia humana") || /\bvih\b/.test(texto)) return INSTR.vih;
  if (texto.includes("hemoglobina humana en deposicion")) return INSTR.hemoglobinaDeposicion;
  if (texto.includes("hemorragias ocultas") || texto.includes("sangre oculta")) return INSTR.sangreOculta;
  if (texto.includes("coproparasitologico")) return INSTR.coproparasitologico;
  if (texto.includes("orina al vacio")) return INSTR.orinaVacio;
  if (texto.includes("domiciliari")) return INSTR.transporteDomicilio;
  if (texto.includes("urocultivo")) {
    if (texto.includes("mujer")) return INSTR.urocultivoMujer;
    return INSTR.orinaCompletaHombre;
  }
  if (texto.includes("sedimento urinario") || texto.includes("orina completa")) {
    if (texto.includes("hombre")) return INSTR.orinaCompletaHombre;
    return INSTR.orinaCompletaMujer;
  }
  if (muestra.includes("orina") && /24\s*h/.test(prep + texto)) return INSTR.orina24h;
  if (muestra.includes("deposicion") && prep.includes("fresca")) return INSTR.deposicionFresca;
  if (muestra.includes("sangre")) return INSTR.sangreGeneral;
  if (muestra.includes("orina")) return INSTR.orinaCompletaMujer;
  if (muestra.includes("deposicion")) return INSTR.deposicionFresca;
  return INSTR.sangreGeneral;
}

function renderPreparacion(examen: Examen) {
  const preparacion = examen.preparacion || "";
  if (preparacion.startsWith("http") || preparacion.toLowerCase().endsWith(".pdf")) {
    return <a href={preparacion} target="_blank" rel="noopener noreferrer" className="text-[#087849] underline">Ver PDF</a>;
  }
  const marcador = "(Ver instructivo)";
  const idx = preparacion.indexOf(marcador);
  if (idx === -1) return preparacion;
  const antes = preparacion.slice(0, idx).trim();
  const url = resolveInstructivo(examen);
  return (
    <>
      {antes && <>{antes} </>}
      <a href={encodeURI(url!)} target="_blank" rel="noopener noreferrer" className="text-[#087849] underline whitespace-nowrap">
        Ver instructivo
      </a>
    </>
  );
}

export default function ExamenesClient({ examenes, categorias }: { examenes: Examen[]; categorias: string[] }) {
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] = useState("Todos");

  const filtered = useMemo(() => {
    return examenes.filter((e) => {
      const matchQuery = query === "" || e.nombre.toLowerCase().includes(query.toLowerCase()) || (e.codigo && e.codigo.toLowerCase().includes(query.toLowerCase()));
      const matchCat = catFilter === "Todos" || e.categoria === catFilter;
      return matchQuery && matchCat;
    });
  }, [examenes, query, catFilter]);

  function handleSearch(v: string) { setQuery(v); }
  function handleCat(v: string) { setCatFilter(v); }

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10 flex flex-col md:flex-row gap-6 md:gap-8">
      {/* Sidebar izquierdo */}
      <aside className="w-full md:w-48 shrink-0">
        <p className="text-xs font-semibold text-gray-500 mb-2">Busca tu examen</p>
        <div className="relative mb-4">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Ingresa el código o nombre"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-8 pr-7 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#087849]"
          />
          {query && (
            <button onClick={() => handleSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
              <X size={12} />
            </button>
          )}
        </div>
        {/* Mobile: dropdown */}
        <select
          value={catFilter}
          onChange={(e) => handleCat(e.target.value)}
          className="md:hidden w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#087849] bg-white"
        >
          <option value="Todos">Ver Todo</option>
          {categorias.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {/* Desktop: lista */}
        <ul className="hidden md:flex md:flex-col md:space-y-1">
          <li>
            <button
              onClick={() => handleCat("Todos")}
              className={`text-sm font-semibold w-full text-left py-0.5 ${catFilter === "Todos" ? "text-[#087849]" : "text-gray-700 hover:text-[#087849]"}`}
            >
              Ver Todo
            </button>
          </li>
          {categorias.map((c) => (
            <li key={c}>
              <button
                onClick={() => handleCat(c)}
                className={`text-sm w-full text-left py-0.5 font-semibold ${catFilter === c ? "text-[#087849]" : "text-gray-700 hover:text-[#087849]"}`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Tabla con scroll */}
      <div className="flex-1 min-w-0">
        <div className="rounded-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
            <table className="w-full text-sm min-w-[480px]">
              <thead className="sticky top-0">
                <tr className="bg-[#087849] text-white">
                  <th className="text-left px-3 py-3 font-semibold">Nombre</th>
                  <th className="text-left px-3 py-3 font-semibold">Preparación del paciente</th>
                  <th className="text-left px-3 py-3 font-semibold">Plazo de entrega</th>
                  <th className="text-left px-3 py-3 font-semibold">Código</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-gray-400 text-sm">
                      No se encontraron exámenes con ese criterio.
                    </td>
                  </tr>
                ) : (
                  filtered.map((e, i) => (
                    <tr key={e.id} className={i % 2 === 0 ? "bg-white" : "bg-[#f0f8f4]"}>
                      <td className="px-3 py-3 text-gray-900 font-medium">{e.nombre}</td>
                      <td className="px-3 py-3 text-gray-900">
                        {e.preparacion ? renderPreparacion(e) : "–"}
                      </td>
                      <td className="px-3 py-3 text-gray-900">{e.tiempo || "–"}</td>
                      <td className="px-3 py-3 text-gray-600">{e.codigo || "–"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-right">{filtered.length} examen{filtered.length !== 1 ? "es" : ""} encontrado{filtered.length !== 1 ? "s" : ""}</p>
      </div>
    </div>

    {/* Botones acceso rápido */}
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex gap-8">
      <a href="/cotizaciones" className="flex flex-col items-center gap-2 group">
        <div className="w-20 h-20 rounded-full bg-[#087849] border-4 border-white shadow-lg flex items-center justify-center group-hover:bg-[#065e39] transition">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/>
            <text x="12" y="13" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white" stroke="none">$</text>
          </svg>
        </div>
        <span className="text-xs text-center text-[#087849] font-semibold leading-snug">Cotice su<br />examen online</span>
      </a>
      <a href="/atencion-domicilio" className="flex flex-col items-center gap-2 group">
        <div className="w-20 h-20 rounded-full bg-[#087849] border-4 border-white shadow-lg flex items-center justify-center group-hover:bg-[#065e39] transition">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <span className="text-xs text-center text-[#087849] font-semibold leading-snug">Atención a<br />domicilio</span>
      </a>
    </div>

    {/* Sección ¡Recuerde! */}
    <div className="bg-[#e8f4ee] mt-0 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-[#087849] mb-3">¡Recuerde!</h2>
        <p className="text-gray-900 mb-4 max-w-3xl">
          Planifique su día si se realizará alguno de los siguientes exámenes, necesitará permanecer al menos
          2 horas y media aproximadamente en las inmediaciones de la unidad de toma de muestras.
        </p>
        <ul className="space-y-2 mb-5 max-w-3xl">
          {[
            "Exámenes post carga de glucosa: Curva de tolerancia oral a la glucosa (PTGO) con dos o más glicemias;",
            "Medición de glicemia a la hora o dos horas post carga de glucosa;",
            "Curva de insulina post carga de glucosa con dos o más mediciones;",
            "Insulina post carga de glucosa; Hormona del crecimiento (HGH) post carga de glucosa;",
            "Glucosa y/o insulina post prandial.",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 text-gray-900 text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#087849] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-gray-900 text-sm max-w-3xl">
          Estos exámenes se realizan de lunes a viernes, o puedes{" "}
          <strong>agendar en algunas sucursales los días sábados.</strong><br />
          Acérquese a su sucursal más cercana o contáctenos al Call Center{" "}
          <span className="whitespace-nowrap font-semibold">32 33 23 600</span>
        </p>

      </div>
    </div>
    </>
  );
}
