import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.resultadoSucursal.findMany({ orderBy: [{ orden: "asc" }, { nombre: "asc" }] });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const body = await req.json();
  const item = await prisma.resultadoSucursal.create({
    data: {
      nombre: body.nombre,
      activo: body.activo ?? true,
      orden: body.orden ?? 0,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
