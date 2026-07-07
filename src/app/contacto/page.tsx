import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ContactoForm from "./ContactoForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Contacto – Aclin Laboratorio Clínico" };

export default async function ContactoPage() {
  const sucursales = await prisma.sucursal.findMany({
    where: { activa: true },
    orderBy: { orden: "asc" },
    select: { id: true, nombre: true, ciudad: true },
  });
  return (
    <div className="bg-white">
      <ContactoForm sucursales={sucursales} />
    </div>
  );
}
