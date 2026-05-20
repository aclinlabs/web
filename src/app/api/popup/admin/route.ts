import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const popups = await prisma.popup.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(popups);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const data = await req.json();
  const popup = await prisma.popup.create({ data });
  return NextResponse.json(popup);
}
