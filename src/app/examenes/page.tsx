import { prisma } from "@/lib/prisma";
import ExamenesClient from "./ExamenesClient";

export const dynamic = 'force-dynamic';
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Exámenes – Aclin Laboratorio Clínico" };

export default async function ExamenesPage() {
  const examenes = await prisma.examen.findMany({ where: { activo: true }, orderBy: { nombre: "asc" } });
  const categorias = [
    ...new Set(
      examenes
        .map((e: { categoria?: string | null }) => e.categoria)
        .filter((c): c is string => Boolean(c) && c !== "Sin clasificar")
    ),
  ].sort() as string[];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero con imagen + botones Quick Access anclados al borde inferior derecho */}
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
        {/* Botones Quick Access — mitad dentro del hero, mitad fuera */}
        <div className="absolute bottom-0 right-4 md:right-8 translate-y-1/2 z-10 flex gap-6">
          <a href="/cotizaciones" className="flex flex-col items-center gap-1 group">
            <div className="w-16 h-16 md:w-[74px] md:h-[74px] rounded-full bg-[#087849] border-4 border-white shadow-lg flex items-center justify-center group-hover:bg-[#065e39] transition">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/>
                <text x="12" y="13" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white" stroke="none">$</text>
              </svg>
            </div>
            <span className="text-xs text-center text-[#087849] font-semibold leading-snug mt-1">Cotice su<br />examen online</span>
          </a>
          <a href="/atencion-domicilio" className="flex flex-col items-center gap-1 group">
            <div className="w-16 h-16 md:w-[74px] md:h-[74px] rounded-full bg-[#087849] border-4 border-white shadow-lg flex items-center justify-center group-hover:bg-[#065e39] transition">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <span className="text-xs text-center text-[#087849] font-semibold leading-snug mt-1">Atención a<br />domicilio</span>
          </a>
        </div>
      </div>

      {/* Título — con padding top para dar espacio a los botones que sobresalen */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-12 pb-2">
        <h1 style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", fontWeight: 700, fontSize: "48px", lineHeight: "57px", letterSpacing: "0%", color: "#087849" }}>Exámenes</h1>
        <p className="text-gray-900 mt-2 text-sm max-w-md">
          Tecnología de excelencia y un equipo profesional especializado para una toma de muestras de calidad, segura y sencilla.
        </p>
      </div>

      <ExamenesClient examenes={examenes} categorias={categorias} />
    </div>
  );
}
