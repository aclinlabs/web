import { prisma } from "@/lib/prisma";
import SucursalesClient from "./SucursalesClient";

export const dynamic = 'force-dynamic';
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sucursales – Aclin Laboratorio Clínico" };

export default async function SucursalesPage() {
  const sucursales = await prisma.sucursal.findMany({ where: { activa: true }, orderBy: [{ ciudad: "asc" }, { orden: "asc" }] });
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div
        className="relative w-full h-[200px] md:h-[320px]"
        style={{
          backgroundImage: "url('/sucursales.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <SucursalesClient sucursales={sucursales} apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} />
    </div>
  );
}
