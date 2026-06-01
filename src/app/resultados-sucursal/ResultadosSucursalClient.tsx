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

  const filtered = useMemo(() => {
    return items.filter((e) =>
      query === "" || e.nombre.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);

  function handleSearch(v: string) { setQuery(v); }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
      {/* Barra de búsqueda */}
      <div className="max-w-sm mb-6">
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Ingresa el nombre del examen"
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
      </div>

      {/* Lista */}
      <div className="rounded-xl overflow-hidden border border-gray-200 max-h-[600px] overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="text-gray-400 text-sm py-8 text-center">Sin resultados</p>
        ) : (
          filtered.map((item, i) => (
            <div
              key={item.id}
              className={`px-5 py-3 text-sm text-gray-900 ${i % 2 === 1 ? "bg-[#e8f4ee]" : "bg-white"}`}
            >
              {item.nombre}
            </div>
          ))
        )}
      </div>
      <p className="text-xs text-gray-500 mt-2 text-right">{filtered.length} resultado{filtered.length !== 1 ? "s" : ""}</p>
    </div>
  );
}
