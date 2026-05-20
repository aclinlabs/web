import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminSucursalesClient from "./AdminSucursalesClient";

export const dynamic = 'force-dynamic';

export default async function AdminSucursalesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  const sucursales = await prisma.sucursal.findMany({ orderBy: { orden: "asc" } });
  return <AdminSucursalesClient sucursales={sucursales} apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} />;
}
