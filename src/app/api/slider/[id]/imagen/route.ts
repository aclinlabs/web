import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mobile = new URL(req.url).searchParams.get("variant") === "mobile";
  const slide = await prisma.sliderImagen.findUnique({
    where: { id },
    select: { imagen: true, mimeType: true, imagenMobile: true, mimeTypeMobile: true },
  });
  if (!slide) return new Response("No encontrado", { status: 404 });

  const bytes = mobile && slide.imagenMobile ? slide.imagenMobile : slide.imagen;
  const mimeType = mobile && slide.mimeTypeMobile ? slide.mimeTypeMobile : slide.mimeType;

  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
