import { NextResponse } from "next/server";
import { sendFormEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  const form = await req.formData();

  const nombre = String(form.get("nombre") || "");
  const apellido = String(form.get("apellido") || "");
  const rut = String(form.get("rut") || "");
  const prevision = String(form.get("prevision") || "");
  const correo = String(form.get("correo") || "");
  const fechaNacimiento = String(form.get("fechaNacimiento") || "");
  const telefono = String(form.get("telefono") || "");
  const comentarios = String(form.get("comentarios") || "");
  const sucursal = String(form.get("sucursal") || "");
  const archivo = form.get("archivo") as File | null;

  if (!nombre || !apellido || !rut || !prevision || !correo || !fechaNacimiento || !telefono) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const attachments = [];
  if (archivo && archivo.size > 0) {
    const buffer = Buffer.from(await archivo.arrayBuffer());
    attachments.push({ filename: archivo.name, content: buffer });
  }

  try {
    await sendFormEmail({
      subject: `Cotización de examen — ${nombre} ${apellido}`,
      replyTo: correo,
      fields: [
        { label: "Nombre paciente", value: `${nombre} ${apellido}` },
        { label: "Rut o Pasaporte", value: rut },
        { label: "Previsión", value: prevision },
        { label: "Correo", value: correo },
        { label: "Fecha de nacimiento", value: fechaNacimiento },
        { label: "Teléfono", value: telefono },
        { label: "Sucursal", value: sucursal },
        { label: "Comentarios", value: comentarios },
      ],
      attachments,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error enviando correo de cotización:", err);
    return NextResponse.json({ error: "No se pudo enviar la cotización" }, { status: 500 });
  }
}
