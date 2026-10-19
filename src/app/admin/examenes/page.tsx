import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminExamenesClient from "./AdminExamenesClient";

export const dynamic = 'force-dynamic';

export default async function AdminExamenesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  const examenes = (await prisma.examen.findMany({ orderBy: { nombre: "asc" } })).map((e) => ({
    ...e,
    // En la base es JSON libre; el editor trabaja con la lista de { etiqueta, url }.
    instructivos: Array.isArray(e.instructivos) ? (e.instructivos as { etiqueta: string; url: string }[]) : [],
  }));
  return <AdminExamenesClient examenes={examenes} />;
}
