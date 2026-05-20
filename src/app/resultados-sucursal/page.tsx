import { prisma } from "@/lib/prisma";
import ResultadosSucursalClient from "./ResultadosSucursalClient";

export const dynamic = 'force-dynamic';
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Resultados en Sucursal – Aclin Laboratorio Clínico" };

export default async function ResultadosSucursalPage() {
  const items = await prisma.resultadoSucursal.findMany({
    where: { activo: true },
    orderBy: [{ orden: "asc" }, { nombre: "asc" }],
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
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
        {/* Botones flotantes — mitad dentro del hero, mitad fuera */}
        <div className="absolute bottom-0 right-4 md:right-8 translate-y-1/2 z-10 flex gap-3 md:gap-6">
          <a href="/contacto" className="flex flex-col items-center gap-1 group">
            <div className="w-14 h-14 md:w-[74px] md:h-[74px] rounded-full bg-[#087849] border-4 border-white shadow-lg flex items-center justify-center group-hover:bg-[#065e39] transition">
              <svg width="24" height="24" className="md:w-[30px] md:h-[30px]" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
              </svg>
            </div>
            <span className="text-xs text-center text-[#087849] font-semibold leading-snug mt-1">¿Tienes dudas?<br />¡Contáctanos!</span>
          </a>
          <a href="/sucursales" className="flex flex-col items-center gap-1 group">
            <div className="w-14 h-14 md:w-[74px] md:h-[74px] rounded-full bg-[#087849] border-4 border-white shadow-lg flex items-center justify-center group-hover:bg-[#065e39] transition">
              <svg width="24" height="24" className="md:w-[30px] md:h-[30px]" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <span className="text-xs text-center text-[#087849] font-semibold leading-snug mt-1">Encuentra tu<br />sucursal</span>
          </a>
        </div>
      </div>

      {/* Título — con padding top para dar espacio a los botones que sobresalen */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-12 md:pt-14 pb-2">
        <div>
          <h1 className="text-2xl md:text-5xl font-bold leading-tight" style={{ fontFamily: "var(--font-montserrat)", color: "#087849" }}>
            Retira tus resultados<br />en tu sucursal
          </h1>
          <p className="text-gray-700 mt-3 text-sm max-w-lg">
            Este es el listado de exámenes que requieren <strong>retiro presencial en la sucursal donde realizaste tu toma de muestras.</strong><br />
            Sus resultados <strong>no</strong> están disponibles en línea.
          </p>
        </div>
      </div>

      <ResultadosSucursalClient items={items} />
    </div>
  );
}
