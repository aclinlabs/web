import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const sucursales = await prisma.sucursal.findMany({ where: { activa: true }, orderBy: { orden: "asc" } });
  return NextResponse.json(sucursales);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const data = await req.json();
  const sucursal = await prisma.sucursal.create({ data });
  return NextResponse.json(sucursal);
}
