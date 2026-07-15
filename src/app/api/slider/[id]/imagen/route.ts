import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slide = await prisma.sliderImagen.findUnique({
    where: { id },
    select: { imagen: true, mimeType: true },
  });
  if (!slide) return new Response("No encontrado", { status: 404 });
  return new Response(new Uint8Array(slide.imagen), {
    headers: {
      "Content-Type": slide.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
