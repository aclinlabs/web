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
        className="relative text-white h-[260px] md:h-[520px]"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 h-full flex flex-col items-center md:items-start justify-center gap-4 md:gap-5 pt-8 md:pt-0 pb-10">
          <h1
            className="text-3xl font-black leading-tight text-center"
            style={{
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            <span className="md:hidden">Su salud,<br />nuestra prioridad</span>
            <span className="hidden md:inline" style={{ fontWeight: 700, fontSize: "48px", lineHeight: "57px" }}>Su salud, nuestra prioridad</span>
          </h1>
          <p className="text-base md:text-lg font-semibold text-white max-w-md text-center md:text-left">Lo acompañamos con exámenes confiables,<br className="hidden md:block" />resultados claros y una atención de primera.</p>
          <Link href="/sucursales" className="w-fit bg-[#087849] text-white px-7 md:px-10 py-3 rounded-full font-semibold text-sm md:text-base hover:bg-[#065e39] transition shadow-lg mx-auto md:mx-0">
            Encuentre su sucursal aquí
          </Link>
        </div>
      </section>

      {/* Quick actions — mitad sobre la imagen, mitad sobre el blanco */}
      <div
        className="relative z-10 md:-mt-10"
        style={{ background: "linear-gradient(to bottom, transparent 40px, white 40px)" }}
      >
        <div className="max-w-3xl mx-auto px-4 py-8 md:pt-0 md:pb-8 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 text-center">
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
              href: "/cotizaciones",
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
      <section className="text-white">
        <div className="flex flex-col md:flex-row">
          {/* Verde — 2/3 del ancho */}
          <div className="bg-[#087849] w-full md:w-2/3 flex flex-col md:flex-row items-stretch">
            {/* Texto izquierda */}
            <div className="md:w-[72%] px-8 md:pl-28 md:pr-8 py-12 md:py-16 flex flex-col justify-center items-center md:items-start text-center md:text-left">
              <div className="text-[64px] md:text-[80px] leading-none md:leading-[57px] font-bold" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", fontWeight: 700 }}>38</div>
              <div className="mt-4 text-2xl md:text-3xl font-bold leading-tight md:whitespace-nowrap" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", letterSpacing: "0.02em" }}>años de experiencia</div>
              <p className="text-green-100 mt-4 text-base md:text-lg leading-relaxed" style={{ letterSpacing: "0.1em" }}>Brindando un servicio de excelencia, con ética, profesionalismo e innovación tecnológica, garantizando precisión y seguridad en cada resultado.</p>
              <Link href="/nosotros" className="inline-block mt-5 bg-white text-[#087849] px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-50 transition w-fit">¡Conózcanos!</Link>
            </div>
            {/* Cards */}
            <div className="md:w-[48%] px-8 md:pl-0 md:pr-0 py-8 md:py-16 flex flex-col gap-4 justify-center md:items-end relative z-10 md:translate-x-[80px]">
              {[
                { icon: MapPin, title: "21 Sucursales", desc: "Estamos presentes por toda la región\npara estar siempre cerca de usted." },
                { icon: Baby, title: "Enfermeras Pediátricas", desc: "Profesionales con experiencia en cuidado infantil." },
                { icon: FlaskConical, title: "+400 Exámenes", desc: "Amplia gama de exámenes para monitorear su salud." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-xl p-3 md:p-4 flex items-start gap-3 shadow-md w-full max-w-[400px]">
                  <div className="w-9 h-9 rounded-full bg-[#087849]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={18} className="text-[#087849]" />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-[#087849]"
                      style={{ fontFamily: "var(--font-montserrat)", fontSize: "18px", lineHeight: "24px" }}
                    >{title}</h3>
                    <p className="text-gray-500 text-xs mt-0.5 leading-snug whitespace-pre-line">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Foto — 1/4 del ancho, solo desktop */}
          <div
            className="hidden md:block md:w-1/3 shrink-0"
            style={{
              backgroundImage: "url('/stats-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "300px",
            }}
          />
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
              { icon: <FileText size={36} />, title: "Revise las indicaciones", desc: "Verifique instrucciones previas, ayuno o preparación especial, según su examen." },
              { icon: <IdCard size={36} />, title: "Traiga sus documentos", desc: "Atención por orden de llegada. Traiga su orden médica y carnet de identidad." },
              { icon: <MessageCircleQuestion size={36} />, title: "Consulte dudas", desc: "Nuestro equipo está disponible para orientarle con cualquier duda que tenga." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="p-6 md:p-8">
                <div className="w-20 h-20 rounded-full bg-[#087849] text-white flex items-center justify-center mx-auto mb-4">{icon}</div>
                <h3
                  className="mb-2 text-[#087849]"
                  style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "24px", lineHeight: "31px" }}
                >{title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed font-bold">{desc}</p>
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
