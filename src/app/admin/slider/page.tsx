import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminSliderClient from "./AdminSliderClient";

export const dynamic = "force-dynamic";

export default async function AdminSliderPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const slides = await prisma.sliderImagen.findMany({
    orderBy: { orden: "asc" },
    select: { id: true, titulo: true, link: true, orden: true, activo: true, updatedAt: true },
  });
  const data = slides.map((s) => ({
    ...s,
    updatedAt: s.updatedAt.toISOString(),
    imagenUrl: `/api/slider/${s.id}/imagen?v=${s.updatedAt.getTime()}`,
  }));

  return <AdminSliderClient slides={data} />;
}
