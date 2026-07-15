import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = 'force-dynamic';
import { MapPin, FlaskConical, Bell, LogOut, ClipboardList, Images } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const [sucursalesCount, examenesCount, popupActive] = await Promise.all([
    prisma.sucursal.count(),
    prisma.examen.count(),
    prisma.popup.findFirst({ where: { activo: true } }),
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#1a7a3c] text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <span className="font-black text-xl">aclin</span>
          <span className="text-green-300 text-sm">/ Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-green-200">{session.user?.name}</span>
          <a href="/api/auth/signout" className="flex items-center gap-1 text-sm text-green-200 hover:text-white transition">
            <LogOut size={16} /> Salir
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-black text-gray-900 mb-2">Panel de Administración</h1>
        <p className="text-gray-500 mb-8">Bienvenido, {session.user?.name}</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <MapPin size={22} className="text-[#1a7a3c]" />
            </div>
            <div>
              <div className="text-3xl font-black text-gray-900">{sucursalesCount}</div>
              <div className="text-gray-500 text-sm">Sucursales</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FlaskConical size={22} className="text-blue-600" />
            </div>
            <div>
              <div className="text-3xl font-black text-gray-900">{examenesCount}</div>
              <div className="text-gray-500 text-sm">Exámenes</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${popupActive ? "bg-yellow-100" : "bg-gray-100"}`}>
              <Bell size={22} className={popupActive ? "text-yellow-600" : "text-gray-400"} />
            </div>
            <div>
              <div className={`text-lg font-bold ${popupActive ? "text-yellow-600" : "text-gray-400"}`}>
                {popupActive ? "Activo" : "Inactivo"}
              </div>
              <div className="text-gray-500 text-sm">Popup</div>
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { href: "/admin/slider", icon: Images, title: "Slider del Home", desc: "Subir y ordenar las imágenes del carrusel principal del sitio.", color: "bg-cyan-600" },
            { href: "/admin/sucursales", icon: MapPin, title: "Sucursales", desc: "Agregar, editar y gestionar sucursales. Configurar posición en el mapa.", color: "bg-[#1a7a3c]" },
            { href: "/admin/examenes", icon: FlaskConical, title: "Exámenes", desc: "Administrar catálogo de exámenes, categorías y preparaciones.", color: "bg-blue-600" },
            { href: "/admin/popup", icon: Bell, title: "Popup / Anuncios", desc: "Habilitar o deshabilitar el popup y editar su contenido.", color: "bg-yellow-500" },
            { href: "/admin/resultados-sucursal", icon: ClipboardList, title: "Resultados en Sucursal", desc: "Gestionar listado de exámenes que requieren retiro presencial.", color: "bg-purple-600" },
          ].map(({ href, icon: Icon, title, desc, color }) => (
            <Link key={href} href={href} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group">
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon size={22} className="text-white" />
              </div>
              <h2 className="font-bold text-gray-900 text-lg mb-1">{title}</h2>
              <p className="text-gray-500 text-sm">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
