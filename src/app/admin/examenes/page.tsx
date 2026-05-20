import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminExamenesClient from "./AdminExamenesClient";

export default async function AdminExamenesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  const examenes = await prisma.examen.findMany({ orderBy: { nombre: "asc" } });
  return <AdminExamenesClient examenes={examenes} />;
}
