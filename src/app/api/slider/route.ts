import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const slides = await prisma.sliderImagen.findMany({
    where: { activo: true },
    orderBy: { orden: "asc" },
    select: { id: true, titulo: true, link: true, updatedAt: true },
  });
  const data = slides.map((s) => ({
    id: s.id,
    titulo: s.titulo,
    link: s.link,
    imagenUrl: `/api/slider/${s.id}/imagen?v=${s.updatedAt.getTime()}`,
    imagenUrlMobile: `/api/slider/${s.id}/imagen?variant=mobile&v=${s.updatedAt.getTime()}`,
  }));
  return NextResponse.json(data);
}
