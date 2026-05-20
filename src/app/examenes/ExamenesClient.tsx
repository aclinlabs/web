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

export default function ExamenesClient({ examenes, categorias }: { examenes: Examen[]; categorias: string[] }) {
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] = useState("Todos");
  const [page, setPage] = useState(1);
  const PER_PAGE = 20;

  const filtered = useMemo(() => {
    return examenes.filter((e) => {
      const matchQuery = query === "" || e.nombre.toLowerCase().includes(query.toLowerCase()) || (e.codigo && e.codigo.toLowerCase().includes(query.toLowerCase()));
      const matchCat = catFilter === "Todos" || e.categoria === catFilter;
      return matchQuery && matchCat;
    });
  }, [examenes, query, catFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleSearch(v: string) { setQuery(v); setPage(1); }
  function handleCat(v: string) { setCatFilter(v); setPage(1); }

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
        <ul className="flex flex-row flex-wrap gap-x-4 gap-y-1 md:flex-col md:space-y-1">
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

      {/* Tabla */}
      <div className="flex-1 min-w-0">
        <div className="rounded-xl overflow-hidden border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="bg-[#087849] text-white">
                <th className="text-left px-4 py-3 font-semibold">Nombre</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Preparación del paciente</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Plazo de entrega</th>
                <th className="text-left px-4 py-3 font-semibold">Código</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-gray-400 text-sm">
                    No se encontraron exámenes con ese criterio.
                  </td>
                </tr>
              ) : (
                paginated.map((e, i) => (
                  <tr key={e.id} className={i % 2 === 0 ? "bg-white" : "bg-[#f0f8f4]"}>
                    <td className="px-4 py-3 text-gray-800 font-medium">{e.nombre}</td>
                    <td className="px-4 py-3 text-[#087849] hidden md:table-cell">{e.preparacion || "–"}</td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{e.tiempo || "–"}</td>
                    <td className="px-4 py-3 text-gray-600">{e.codigo || "–"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1.5 rounded border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-50 transition">← Anterior</button>
            <span className="text-sm text-gray-500">Página {page} de {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1.5 rounded border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-50 transition">Siguiente →</button>
          </div>
        )}
      </div>
    </div>

    {/* Sección ¡Recuerde! */}
    <div className="bg-[#e8f4ee] mt-10 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-[#087849] mb-3">¡Recuerde!</h2>
        <p className="text-gray-700 mb-4 max-w-3xl">
          Planifique su día si se realizará alguno de los siguientes exámenes, necesitará permanecer al menos
          2 horas y media aproximadamente en las inmediaciones de la unidad de toma de muestras.
        </p>
        <ul className="space-y-2 mb-5 max-w-3xl">
          {[
            "Exámenes post carga de glucosa: Curva de tolerancia oral a la glucosa (PTGO) con dos o más glicemias;",
            "Medición de glicemia a la hora o dos horas post carga de glucosa;",
            "Curva de insulina post carga de glucosa con dos o más mediciones;",
            "Insulina post carga de glucosa;   Hormona del crecimiento (HGH) post carga de glucosa;",
            "Glucosa y/o insulina post prandial.",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 text-gray-700 text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#087849] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-gray-700 text-sm max-w-3xl">
          Estos exámenes se realizan de lunes a viernes, o puedes{" "}
          <strong>agendar en algunas sucursales los días sábados.</strong><br />
          Acércase a su sucursal más cercana para obtener más indicaciones o contáctanos a nuestro Call Center (32 33 23 600)
        </p>

        {/* Iconos */}
        <div className="flex gap-10 mt-8">
          <a href="/contacto" className="flex flex-col items-center gap-2 group">
            <div className="w-20 h-20 rounded-full bg-[#087849] flex items-center justify-center group-hover:bg-[#065e39] transition">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.35 2 2 0 0 1 3.57 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.74a16 16 0 0 0 6.29 6.29l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <span className="text-xs text-center text-[#087849] font-semibold leading-snug">¿Tiene dudas?<br />¡Contáctenos!</span>
          </a>
          <a href="/sucursales" className="flex flex-col items-center gap-2 group">
            <div className="w-20 h-20 rounded-full bg-[#087849] flex items-center justify-center group-hover:bg-[#065e39] transition">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <span className="text-xs text-center text-[#087849] font-semibold leading-snug">Encuentre su<br />sucursal</span>
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
