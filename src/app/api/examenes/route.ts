import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const examenes = await prisma.examen.findMany({ orderBy: { nombre: "asc" } });
  return NextResponse.json(examenes);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const data = await req.json();
  const examen = await prisma.examen.create({ data });
  return NextResponse.json(examen);
}
