import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { importarExamenes, leerExamenes } from "@/lib/importarExamenes";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No se recibió archivo" }, { status: 400 });

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "El archivo supera el tamaño máximo permitido (5MB)" }, { status: 400 });
  }
  if (!/\.(xlsx|xls|csv)$/i.test(file.name)) {
    return NextResponse.json({ error: "Formato no permitido. Usa .xlsx, .xls o .csv" }, { status: 400 });
  }

  const filas = leerExamenes(Buffer.from(await file.arrayBuffer()));
  if (filas.length === 0) {
    return NextResponse.json(
      { error: "No se encontraron filas válidas. Asegúrate de que exista la columna 'Nombre del Examen'." },
      { status: 400 }
    );
  }

  const resultado = await importarExamenes(filas);
  return NextResponse.json({ ok: true, ...resultado });
}
