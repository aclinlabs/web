import { prisma } from "@/lib/prisma";
import ExamenesClient from "./ExamenesClient";

export const dynamic = 'force-dynamic';
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Exámenes – Aclin Laboratorio Clínico" };

export default async function ExamenesPage() {
  const examenes = await prisma.examen.findMany({ where: { activo: true }, orderBy: { nombre: "asc" } });
  const categorias = [...new Set(examenes.map((e: { categoria?: string | null }) => e.categoria).filter(Boolean))].sort() as string[];
  return (
    <div className="min-h-screen bg-white">
      {/* Hero + panel verde (mobile solapa el hero, desktop solo espacio) */}
      <div className="relative w-full">
        {/* Imagen de fondo */}
        <div
          className="absolute top-0 left-0 w-full h-[200px] md:h-[320px]"
          style={{
            backgroundImage: "url('/examenes.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Mobile: panel verde superpuesto con radio — igual que cotizaciones */}
        <div className="md:hidden relative px-4 pt-24 pb-0">
          <div className="bg-[#065e39] rounded-2xl px-6 py-8 text-white text-center">
            <h1
              className="mb-3"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", fontWeight: 700, fontSize: "36px", lineHeight: "1.2", color: "#FFFFFF" }}
            >
              Exámenes
            </h1>
            <p className="text-green-100 text-sm leading-relaxed">
              Tecnología de excelencia y un equipo profesional especializado para una toma de muestras de calidad, segura y sencilla.
            </p>
          </div>
        </div>

        {/* Desktop: espacio para que el hero se vea */}
        <div className="hidden md:block h-[320px]" />
      </div>

      {/* Título desktop — solo desktop */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-8 pb-2">
        <h1 className="text-3xl md:text-5xl font-black text-[#087849]">Exámenes</h1>
        <p className="text-gray-500 mt-2 text-sm max-w-sm">
          Tecnología de excelencia y un equipo profesional especializado<br />
          para una toma de muestras de calidad, segura y sencilla.
        </p>
      </div>

      <ExamenesClient examenes={examenes} categorias={categorias} />
    </div>
  );
}
