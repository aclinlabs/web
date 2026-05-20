import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const popup = await prisma.popup.findFirst({ where: { activo: true }, orderBy: { updatedAt: "desc" } });
  return NextResponse.json(popup || { activo: false });
}
