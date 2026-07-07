import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendFormEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  const data = await req.json();
  const { nombre, apellido, correo, sucursal, motivo, comentarios } = data;

  if (!nombre || !apellido || !correo || !sucursal || !motivo) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const sucursalInfo = await prisma.sucursal.findUnique({ where: { id: sucursal } });

  try {
    await sendFormEmail({
      subject: `Contacto sitio web — ${motivo}`,
      replyTo: correo,
      fields: [
        { label: "Nombre", value: `${nombre} ${apellido}` },
        { label: "Correo", value: correo },
        { label: "Sucursal", value: sucursalInfo ? `${sucursalInfo.ciudad} — ${sucursalInfo.nombre}` : sucursal },
        { label: "Motivo", value: motivo },
        { label: "Comentarios", value: comentarios || "" },
      ],
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error enviando correo de contacto:", err);
    return NextResponse.json({ error: "No se pudo enviar el mensaje" }, { status: 500 });
  }
}
