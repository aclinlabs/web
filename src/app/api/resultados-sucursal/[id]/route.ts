import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const item = await prisma.resultadoSucursal.update({
    where: { id },
    data: {
      nombre: body.nombre,
      activo: body.activo ?? true,
      orden: body.orden ?? 0,
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.resultadoSucursal.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
