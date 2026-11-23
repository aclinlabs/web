import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = 'force-dynamic';

// Los meses y días se cuentan en hora de Chile: createdAt se guarda en UTC.
const ZONA = "America/Santiago";

function nombreMes(mes: string) {
  const [anio, m] = mes.split("-").map(Number);
  const texto = new Date(Date.UTC(anio, m - 1, 15)).toLocaleDateString("es-CL", { month: "long", year: "numeric", timeZone: "UTC" });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export default async function AdminCotizacionesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const porMes = await prisma.$queryRaw<{ mes: string; total: number; conAdjuntos: number; dias: number }[]>`
    SELECT to_char(("createdAt" AT TIME ZONE 'UTC') AT TIME ZONE ${ZONA}, 'YYYY-MM') AS mes,
           count(*)::int AS total,
           count(*) FILTER (WHERE adjuntos > 0)::int AS "conAdjuntos",
           count(DISTINCT ((("createdAt" AT TIME ZONE 'UTC') AT TIME ZONE ${ZONA})::date))::int AS dias
    FROM "Cotizacion"
    GROUP BY 1
    ORDER BY 1 DESC
  `;

  const pedido = (await searchParams).mes;
  const mes = porMes.find((m) => m.mes === pedido)?.mes ?? porMes[0]?.mes;

  const [porSucursal, porPrevision, primera] = mes
    ? await Promise.all([
        prisma.$queryRaw<{ nombre: string; total: number }[]>`
          SELECT coalesce(nullif(sucursal, ''), 'Sin sucursal') AS nombre, count(*)::int AS total
          FROM "Cotizacion"
          WHERE to_char(("createdAt" AT TIME ZONE 'UTC') AT TIME ZONE ${ZONA}, 'YYYY-MM') = ${mes}
          GROUP BY 1 ORDER BY 2 DESC, 1
        `,
        prisma.$queryRaw<{ nombre: string; total: number }[]>`
          SELECT prevision AS nombre, count(*)::int AS total
          FROM "Cotizacion"
          WHERE to_char(("createdAt" AT TIME ZONE 'UTC') AT TIME ZONE ${ZONA}, 'YYYY-MM') = ${mes}
          GROUP BY 1 ORDER BY 2 DESC, 1
        `,
        prisma.cotizacion.findFirst({ orderBy: { createdAt: "asc" }, select: { createdAt: true } }),
      ])
    : [[], [], null];

  const totalGeneral = porMes.reduce((t, m) => t + m.total, 0);
  const totalMes = porMes.find((m) => m.mes === mes)?.total ?? 0;
  const desde = primera?.createdAt.toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric", timeZone: ZONA });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-teal-600 text-white px-6 py-4 flex items-center gap-4 shadow-md">
        <Link href="/admin" className="hover:text-teal-200 transition"><ArrowLeft size={20} /></Link>
        <h1 className="font-bold text-lg">Cotizaciones</h1>
        <span className="ml-auto text-teal-100 text-sm">{totalGeneral} registradas</span>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {porMes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
            Todavía no hay cotizaciones registradas.
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">
              Cotizaciones enviadas desde el sitio y registradas desde el {desde}. Las anteriores a esa fecha solo están en el correo.
            </p>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 text-left">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Mes</th>
                    <th className="px-4 py-3 font-semibold text-right">Cotizaciones</th>
                    <th className="px-4 py-3 font-semibold text-right">Con adjuntos</th>
                    <th className="px-4 py-3 font-semibold text-right">Promedio por día</th>
                  </tr>
                </thead>
                <tbody>
                  {porMes.map((m) => (
                    <tr key={m.mes} className={`border-t border-gray-100 ${m.mes === mes ? "bg-teal-50" : ""}`}>
                      <td className="px-4 py-3">
                        <Link href={`/admin/cotizaciones?mes=${m.mes}`} className="font-semibold text-teal-700 hover:underline">
                          {nombreMes(m.mes)}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-gray-900 tabular-nums">{m.total}</td>
                      <td className="px-4 py-3 text-right text-gray-700 tabular-nums">{m.conAdjuntos}</td>
                      <td className="px-4 py-3 text-right text-gray-700 tabular-nums">
                        {(m.total / m.dias).toFixed(1)} <span className="text-gray-400">({m.dias} {m.dias === 1 ? "día" : "días"})</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="font-bold text-gray-900 mb-3">Detalle de {nombreMes(mes!)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { titulo: "Por sucursal", filas: porSucursal },
                { titulo: "Por previsión", filas: porPrevision },
              ].map(({ titulo, filas }) => (
                <div key={titulo} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden self-start">
                  <div className="px-4 py-3 bg-gray-50 text-sm font-semibold text-gray-600">{titulo}</div>
                  <table className="w-full text-sm">
                    <tbody>
                      {filas.map((f) => (
                        <tr key={f.nombre} className="border-t border-gray-100">
                          <td className="px-4 py-2 text-gray-800">{f.nombre}</td>
                          <td className="px-4 py-2 text-right font-semibold text-gray-900 tabular-nums">{f.total}</td>
                          <td className="px-4 py-2 text-right text-gray-400 tabular-nums w-16">{Math.round((f.total / totalMes) * 100)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
