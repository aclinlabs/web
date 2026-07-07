"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Imagen {
  src: string;
  nombre: string;
}

export default function MetodologiaSlider({ imagenes }: { imagenes: Imagen[] }) {
  const [index, setIndex] = useState(0);
  const actual = imagenes[index];

  function anterior() {
    setIndex((i) => (i === 0 ? imagenes.length - 1 : i - 1));
  }
  function siguiente() {
    setIndex((i) => (i === imagenes.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="w-full md:w-72 shrink-0">
      <div className="relative w-full aspect-square bg-white rounded border border-gray-100">
        <img
          src={actual.src}
          alt={actual.nombre}
          className="w-full h-full object-contain p-4"
        />
        {imagenes.length > 1 && (
          <>
            <button
              type="button"
              onClick={anterior}
              aria-label="Anterior"
              className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center text-[#087849] hover:bg-white transition shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={siguiente}
              aria-label="Siguiente"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center text-[#087849] hover:bg-white transition shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      <p className="text-sm text-center text-gray-700 font-semibold mt-2">{actual.nombre}</p>

      {imagenes.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-2">
          {imagenes.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver ${img.nombre}`}
              className={`w-2 h-2 rounded-full transition ${i === index ? "bg-[#087849]" : "bg-gray-300 hover:bg-gray-400"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
