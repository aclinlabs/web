import { prisma } from "@/lib/prisma";
import ExamenesClient from "./ExamenesClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Exámenes – Aclin Laboratorio Clínico" };

export default async function ExamenesPage() {
  const examenes = await prisma.examen.findMany({ where: { activo: true }, orderBy: { nombre: "asc" } });
  const categorias = [...new Set(examenes.map((e) => e.categoria).filter(Boolean))].sort() as string[];
  return (
    <div className="min-h-screen bg-white">
      {/* Hero con imagen */}
      <div
        className="relative w-full"
        style={{
          backgroundImage: "url('/examenes.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          height: "320px",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Título + accesos rápidos — debajo del hero */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-8 pb-2">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Título */}
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-[#087849]">Exámenes</h1>
            <p className="text-gray-500 mt-2 text-sm max-w-sm">
              Tecnología de excelencia y un equipo profesional especializado<br className="hidden md:block" />
              para una toma de muestras de calidad, segura y sencilla.
            </p>
          </div>
          {/* Accesos rápidos */}
          <div className="flex gap-6 pb-2">
            <a href="/cotizaciones" className="flex flex-col items-center gap-1 group">
              <div className="w-16 h-16 rounded-full bg-[#087849] border-4 border-white shadow-lg flex items-center justify-center group-hover:bg-[#065e39] transition">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/>
                  <text x="12" y="13" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white" stroke="none">$</text>
                </svg>
              </div>
              <span className="text-xs text-center text-[#087849] font-semibold leading-snug">Cotice su<br />examen online</span>
            </a>
            <a href="/contacto" className="flex flex-col items-center gap-1 group">
              <div className="w-16 h-16 rounded-full bg-[#087849] border-4 border-white shadow-lg flex items-center justify-center group-hover:bg-[#065e39] transition">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <span className="text-xs text-center text-[#087849] font-semibold leading-snug">Atención a<br />domicilio</span>
            </a>
          </div>
        </div>
      </div>

      <ExamenesClient examenes={examenes} categorias={categorias} />
    </div>
  );
}
