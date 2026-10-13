import { NextResponse } from "next/server";
import { sendFormEmail } from "@/lib/mailer";
import { errorApellidos, errorDocumento, errorFechaNacimiento } from "@/lib/validaciones";

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
  const archivos = form.getAll("archivo") as File[];

  if (!nombre || !apellido || !rut || !prevision || !correo || !fechaNacimiento || !telefono) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const errorRut = errorDocumento(rut);
  if (errorRut) {
    return NextResponse.json({ error: errorRut }, { status: 400 });
  }

  const errorApellido = errorApellidos(apellido, rut);
  if (errorApellido) {
    return NextResponse.json({ error: errorApellido }, { status: 400 });
  }

  const errorFecha = errorFechaNacimiento(fechaNacimiento);
  if (errorFecha) {
    return NextResponse.json({ error: errorFecha }, { status: 400 });
  }

  const attachments = [];
  for (const archivo of archivos) {
    if (archivo && archivo.size > 0) {
      const buffer = Buffer.from(await archivo.arrayBuffer());
      attachments.push({ filename: archivo.name, content: buffer });
    }
  }

  // El formulario manda los adjuntos codificados en base64 porque el firewall
  // que hay delante del sitio bloquea las subidas binarias.
  const archivosB64 = String(form.get("archivosB64") || "");
  if (archivosB64) {
    try {
      const lista = JSON.parse(archivosB64) as { nombre: string; contenido: string }[];
      for (const a of lista) {
        if (a?.contenido) attachments.push({ filename: a.nombre || "adjunto", content: Buffer.from(a.contenido, "base64") });
      }
    } catch {
      return NextResponse.json({ error: "No pudimos leer el archivo adjunto." }, { status: 400 });
    }
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
