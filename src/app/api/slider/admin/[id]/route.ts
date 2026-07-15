import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { compressToWebp } from "@/lib/sliderImage";

const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { id } = await params;

  const form = await req.formData();
  const file = form.get("imagen") as File | null;
  const fileMobile = form.get("imagenMobile") as File | null;

  const data: Record<string, unknown> = {};
  if (form.has("titulo")) data.titulo = (form.get("titulo") as string) || null;
  if (form.has("link")) data.link = (form.get("link") as string) || null;
  if (form.has("activo")) data.activo = form.get("activo") === "true";
  if (form.has("orden")) data.orden = parseInt(form.get("orden") as string, 10);

  if (file && file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "La imagen no puede superar 15MB" }, { status: 400 });
  }
  if (fileMobile && fileMobile.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "La imagen no puede superar 15MB" }, { status: 400 });
  }

  if (file && file.size > 0) {
    data.imagen = await compressToWebp(Buffer.from(await file.arrayBuffer()), 1920);
    data.mimeType = "image/webp";
  }
  if (fileMobile && fileMobile.size > 0) {
    data.imagenMobile = await compressToWebp(Buffer.from(await fileMobile.arrayBuffer()), 1080);
    data.mimeTypeMobile = "image/webp";
  }

  const slide = await prisma.sliderImagen.update({
    where: { id },
    data,
    select: { id: true, titulo: true, link: true, orden: true, activo: true, updatedAt: true },
  });

  return NextResponse.json({
    ...slide,
    imagenUrl: `/api/slider/${slide.id}/imagen?v=${slide.updatedAt.getTime()}`,
    imagenUrlMobile: `/api/slider/${slide.id}/imagen?variant=mobile&v=${slide.updatedAt.getTime()}`,
  });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { id } = await params;
  await prisma.sliderImagen.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
