import React from "react";
import Link from "next/link";

export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { MapPin, FlaskConical, Baby, ClipboardList, Home, CheckCircle, FileText, IdCard, MessageCircleQuestion } from "lucide-react";
import SucursalesMapPreview from "@/components/SucursalesMapPreview";

async function getSucursales() {
  return prisma.sucursal.findMany({ where: { activa: true }, orderBy: { orden: "asc" } });
}

export default async function HomePage() {
  const sucursales = await getSucursales();
  return (
    <>
      {/* HERO */}
      <section
        className="relative text-white"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          height: "520px",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-full flex flex-col justify-center gap-4 md:gap-5 pb-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight drop-shadow-xl" style={{textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)"}}>Su salud,<br />nuestra prioridad</h1>
          <p className="text-base md:text-lg font-semibold text-white max-w-md" style={{textShadow: "1px 1px 6px rgba(0,0,0,0.9)"}}>Lo acompañamos con exámenes confiables,<br className="hidden md:block" />resultados claros y una atención de primera.</p>
          <Link href="/sucursales" className="w-fit bg-[#087849] text-white px-7 md:px-10 py-3 rounded-full font-semibold text-sm md:text-base hover:bg-[#065e39] transition shadow-lg">
            Encuentre su sucursal aquí
          </Link>
        </div>
      </section>

      {/* Quick actions — mitad sobre la imagen, mitad sobre el blanco */}
      <div
        className="relative z-10 -mt-10"
        style={{ background: "linear-gradient(to bottom, transparent 40px, white 40px)" }}
      >
        <div className="max-w-3xl mx-auto px-4 pt-0 pb-8 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 text-center">
          {([
            { icon: <Home size={32} className="text-white" />, label: "Atención a\ndomicilio", href: "/atencion-domicilio" },
            {
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <line x1="2" y1="20" x2="22" y2="20"/>
                  <text x="12" y="13" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white" stroke="none">$</text>
                </svg>
              ),
              label: "Cotice su\nexamen online",
              href: "/examenes",
            },
            { icon: <ClipboardList size={32} className="text-white" />, label: "Revise la lista\nde exámenes", href: "/examenes" },
            { icon: <CheckCircle size={32} className="text-white" />, label: "Resultados\nen sucursal", href: "/resultados-sucursal" },
          ] as { icon: React.ReactNode; label: string; href: string }[]).map(({ icon, label, href }) => (
            <a key={label} href={href} className="flex flex-col items-center gap-2 md:gap-3 group">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#087849] flex items-center justify-center shadow-lg group-hover:bg-[#065e39] transition border-4 border-white">
                {icon}
              </div>
              <span className="text-xs font-semibold text-[#087849] leading-snug whitespace-pre-line">{label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="bg-[#087849] text-white relative overflow-hidden">
        {/* Imagen fondo lado derecho — llega a la mitad de las cards */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full hidden md:block"
          style={{
            backgroundImage: "url('/stats-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-stretch">
          {/* Texto izquierda */}
          <div className="md:w-5/12 py-16 flex flex-col justify-center">
            <div className="text-5xl md:text-8xl font-black leading-none">37</div>
            <div className="text-2xl md:text-3xl font-bold mt-1 leading-tight">años de experiencia</div>
            <p className="text-green-100 mt-4 text-sm leading-relaxed max-w-xs">Brindando un servicio de excelencia, con ética, profesionalismo e innovación tecnológica, garantizando precisión y seguridad en cada resultado.</p>
            <Link href="/nosotros" className="inline-block mt-5 bg-white text-[#087849] px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-50 transition w-fit">¡Conózcanos!</Link>
          </div>
          {/* Cards encima de la imagen */}
          <div className="md:w-7/12 py-8 md:py-16 flex flex-col gap-4 justify-center md:pl-8">
            {[
              { icon: MapPin, title: "22 Sucursales", desc: "Estamos presentes por\ntoda la región." },
              { icon: Baby, title: "Enfermeras Pediátricas", desc: "Profesionales con\nexperiencia en cuidado infantil." },
              { icon: FlaskConical, title: "+400 Exámenes", desc: "Amplia gama de exámenes\npara monitorear su salud." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-4 md:p-5 flex items-start gap-4 shadow-md w-full md:max-w-[390px]">
                <div className="w-11 h-11 rounded-full bg-[#087849]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={22} className="text-[#087849]" />
                </div>
                <div>
                  <h3
                    className="font-semibold text-[#087849]"
                    style={{ fontFamily: "var(--font-montserrat)", fontSize: "24px", lineHeight: "31px" }}
                  >{title}</h3>
                  <p className="text-gray-500 text-sm mt-1 leading-snug whitespace-pre-line">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 PASOS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2
            className="mb-10 text-[#087849] text-3xl md:text-5xl font-bold text-center md:text-right"
            style={{
              fontFamily: "var(--font-montserrat)",
            }}
          >Prepárese en 3 pasos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: <FileText size={28} />, title: "Revise las indicaciones", desc: "Verifique instrucciones previas, ayuno o preparación especial, según su examen." },
              { icon: <IdCard size={28} />, title: "Traiga sus documentos", desc: "Atención por orden de llegada. Traiga su orden médica y carnet de identidad." },
              { icon: <MessageCircleQuestion size={28} />, title: "Consulte dudas", desc: "Nuestro equipo está disponible para orientarle con cualquier duda que tenga." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-[#087849] text-white flex items-center justify-center mx-auto mb-4">{icon}</div>
                <h3
                  className="mb-2 text-[#087849]"
                  style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "24px", lineHeight: "31px" }}
                >{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUCURSALES MAP */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SucursalesMapPreview sucursales={sucursales} />
        </div>
      </section>
    </>
  );
}
