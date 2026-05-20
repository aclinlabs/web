import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminResultadosSucursalClient from "./AdminResultadosSucursalClient";

export const dynamic = 'force-dynamic';

export default async function AdminResultadosSucursalPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  const items = await prisma.resultadoSucursal.findMany({ orderBy: [{ orden: "asc" }, { nombre: "asc" }] });
  return <AdminResultadosSucursalClient items={items} />;
}
