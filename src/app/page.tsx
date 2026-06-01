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
      <section className="relative text-white" style={{ height: "520px" }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
          }}
        />
        {/* Overlay negro 40% para contraste */}
        <div className="absolute inset-0 bg-gray-900/40" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 h-full flex flex-col justify-center gap-4 md:gap-5 pb-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight">
            Su salud, nuestra prioridad
          </h1>
          <p className="text-base md:text-lg font-semibold text-white max-w-md">
            Lo acompañamos con exámenes confiables,<br className="hidden md:block" />resultados claros y una atención de primera.
          </p>
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
            { icon: <Home size={36} className="text-white" />, label: "Atención a\ndomicilio", href: "/atencion-domicilio" },
            {
              icon: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <line x1="2" y1="20" x2="22" y2="20"/>
                  <text x="12" y="13" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white" stroke="none">$</text>
                </svg>
              ),
              label: "Cotice su\nexamen online",
              href: "/cotizaciones",
            },
            { icon: <ClipboardList size={36} className="text-white" />, label: "Revise la lista\nde exámenes", href: "/examenes" },
            { icon: <CheckCircle size={36} className="text-white" />, label: "Resultados\nen sucursal", href: "/resultados-sucursal" },
          ] as { icon: React.ReactNode; label: string; href: string }[]).map(({ icon, label, href }) => (
            <a key={label} href={href} className="flex flex-col items-center gap-2 md:gap-3 group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#087849] flex items-center justify-center shadow-lg group-hover:bg-[#065e39] transition border-4 border-white">
                {icon}
              </div>
              <span className="text-xs font-semibold text-[#087849] leading-snug whitespace-pre-line">{label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="bg-[#087849] text-white relative overflow-hidden">
        {/* Imagen fondo lado derecho — 1/3 del ancho */}
        <div
          className="absolute top-0 right-0 w-1/3 h-full hidden md:block"
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
            <p className="text-green-100 mt-4" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", fontWeight: 600, fontSize: "18px", lineHeight: "23px" }}>
              Brindando un servicio de excelencia, con ética, profesionalismo e innovación tecnológica, garantizando precisión y seguridad en cada resultado.
            </p>
            <Link href="/nosotros" className="inline-block mt-5 bg-white text-[#087849] px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-50 transition w-fit">¡Conózcanos!</Link>
          </div>
          {/* Cards encima de la imagen */}
          <div className="md:w-7/12 py-8 md:py-16 flex flex-col gap-4 justify-center md:pl-8">
            {[
              { icon: MapPin, title: "22 Sucursales", desc: "Estamos presentes en toda la región de Valparaíso, siempre cerca de usted." },
              { icon: Baby, title: "Enfermeras Pediátricas", desc: "Profesionales con experiencia en cuidado infantil, dedicadas a su bienestar." },
              { icon: FlaskConical, title: "+400 Exámenes", desc: "Amplia gama de exámenes para monitorear y cuidar su salud." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-5 md:p-6 flex items-start gap-4 shadow-md w-full md:max-w-[390px]">
                <div className="w-12 h-12 rounded-full bg-[#087849]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={24} className="text-[#087849]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#087849]" style={{ fontFamily: "var(--font-montserrat)", fontSize: "22px", lineHeight: "28px" }}>{title}</h3>
                  <p className="text-gray-500 text-sm mt-1 leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 PASOS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2
            className="mb-12 text-right"
            style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", fontWeight: 700, fontSize: "48px", lineHeight: "57px", color: "#087849" }}
          >Prepárese en 3 pasos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
            {[
              { icon: <FileText size={32} />, title: "Revise las indicaciones", desc: "Verifique instrucciones previas, ayuno o preparación especial, según su examen." },
              { icon: <IdCard size={32} />, title: "Traiga sus documentos", desc: "La atención es por orden de llegada, preséntese con tiempo con su orden médica y carnet de identidad." },
              { icon: <MessageCircleQuestion size={32} />, title: "Consulte dudas", desc: "Nuestro equipo está disponible para orientarlo con cualquier duda que tenga." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="px-4 py-6">
                <div className="w-20 h-20 rounded-full bg-[#087849] text-white flex items-center justify-center mx-auto mb-6">{icon}</div>
                <h3
                  className="mb-3"
                  style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", fontWeight: 600, fontSize: "24px", lineHeight: "31px", color: "#087849" }}
                >{title}</h3>
                <p style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", fontWeight: 600, fontSize: "18px", lineHeight: "23px", color: "#000000" }}>{desc}</p>
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
