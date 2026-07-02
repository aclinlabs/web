import type { Metadata } from "next";
import HeroCotizacionForm from "@/components/HeroCotizacionForm";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Cotizaciones – Aclin Laboratorio Clínico" };
export const dynamic = "force-dynamic";

export default async function CotizacionesPage() {
  const sucursales = await prisma.sucursal.findMany({
    where: { activa: true },
    orderBy: [{ ciudad: "asc" }, { nombre: "asc" }],
    select: { id: true, nombre: true, ciudad: true },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroCotizacionForm sucursales={sucursales} />
    </div>
  );
}
