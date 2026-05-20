"use client";
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";

interface ResultadoSucursal {
  id: string;
  nombre: string;
  activo: boolean;
}

export default function ResultadosSucursalClient({ items }: { items: ResultadoSucursal[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 20;

  const filtered = useMemo(() => {
    return items.filter((e) =>
      query === "" || e.nombre.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleSearch(v: string) { setQuery(v); setPage(1); }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10 flex flex-col md:flex-row gap-6 md:gap-8">
      {/* Sidebar */}
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
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => handleSearch("")}
              className="text-sm font-semibold w-full text-left py-0.5 text-[#087849]"
            >
              Ver Todo
            </button>
          </li>
        </ul>
      </aside>

      {/* Lista */}
      <div className="flex-1">
        <div className="rounded-xl overflow-hidden">
          {paginated.length === 0 ? (
            <p className="text-gray-400 text-sm py-8 text-center">Sin resultados</p>
          ) : (
            paginated.map((item, i) => (
              <div
                key={item.id}
                className={`px-5 py-3 text-sm text-gray-800 ${i % 2 === 1 ? "bg-[#e8f4ee]" : "bg-white"}`}
              >
                {item.nombre}
              </div>
            ))
          )}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex gap-2 mt-6 justify-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-full text-sm font-semibold transition ${
                  p === page ? "bg-[#087849] text-white" : "text-gray-500 hover:text-[#087849]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
