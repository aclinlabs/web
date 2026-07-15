import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import sharp from "sharp";

const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const slides = await prisma.sliderImagen.findMany({
    orderBy: { orden: "asc" },
    select: { id: true, titulo: true, link: true, orden: true, activo: true, updatedAt: true },
  });
  const data = slides.map((s) => ({
    ...s,
    imagenUrl: `/api/slider/${s.id}/imagen?v=${s.updatedAt.getTime()}`,
  }));
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("imagen") as File | null;
  if (!file || file.size === 0) {
    return NextResponse.json({ error: "Falta la imagen" }, { status: 400 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "La imagen no puede superar 15MB" }, { status: 400 });
  }

  const titulo = (form.get("titulo") as string) || null;
  const link = (form.get("link") as string) || null;
  const activo = form.get("activo") !== "false";

  const inputBuffer = Buffer.from(await file.arrayBuffer());
  const webp = await sharp(inputBuffer)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toBuffer();

  const maxOrden = await prisma.sliderImagen.aggregate({ _max: { orden: true } });
  const orden = (maxOrden._max.orden ?? -1) + 1;

  const slide = await prisma.sliderImagen.create({
    data: { imagen: webp, mimeType: "image/webp", titulo, link, activo, orden },
    select: { id: true, titulo: true, link: true, orden: true, activo: true, updatedAt: true },
  });

  return NextResponse.json({ ...slide, imagenUrl: `/api/slider/${slide.id}/imagen?v=${slide.updatedAt.getTime()}` });
}
