import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Atención a Domicilio – Aclin Laboratorio Clínico" };

export default function AtencionDomicilioPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative h-[320px]">
        <img src="/domicilio.jpg" alt="Atención a domicilio Aclin" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/25" />
        {/* Botón ¿Tienes dudas? arriba derecha */}
        <div className="absolute bottom-0 right-4 md:right-8 translate-y-1/2 z-10 flex flex-col items-center gap-1">
          <Link href="/contacto" className="flex flex-col items-center group">
            <div className="w-14 h-14 md:w-[74px] md:h-[74px] rounded-full bg-[#087849] border-4 border-white flex items-center justify-center group-hover:bg-[#065e39] transition shadow-md">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
              </svg>
            </div>
            <span className="text-xs text-center text-[#087849] font-semibold mt-1 leading-snug">¿Tienes dudas?<br />¡Contáctanos!</span>
          </Link>
        </div>
      </section>

      {/* Título y descripción */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 pt-10 md:pt-14 pb-6 md:pb-8">
        <h1 className="mb-4 text-3xl md:text-5xl font-bold leading-tight" style={{ fontFamily: "var(--font-montserrat)", color: "#087849" }}>&#xa1;Aclin a tu casa!</h1>
        <p className="text-gray-600 text-sm leading-relaxed max-w-xl">
          Realiza tu toma de muestra desde la comodidad de tu hogar, nuestro servicio a domicilio permite acceder a la misma calidad y precisión de atención que entregamos en nuestras sucursales, sin necesidad de trasladarte.
        </p>
      </section>

      {/* 3 pasos */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 py-8 md:py-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-center">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-[#087849] flex items-center justify-center mb-4">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
            </svg>
          </div>
          <h3 className="mb-2 text-lg md:text-2xl font-semibold" style={{ fontFamily: "var(--font-montserrat)", color: "#087849" }}>Solicita el servicio</h3>
          <p className="text-sm md:text-base" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#000000", textAlign: "center" }}>Contacta a nuestra central para coordinar el día según disponibilidad.</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-[#087849] flex items-center justify-center mb-4">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M15 10h2M15 14h2M7 14h4"/>
            </svg>
          </div>
          <h3 className="mb-2 text-lg md:text-2xl font-semibold" style={{ fontFamily: "var(--font-montserrat)", color: "#087849" }}>Prepárate para tu examen</h3>
          <p className="text-sm md:text-base" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#000000", textAlign: "center" }}>Revisa indicaciones de preparación y ten tus documentos y orden médica si es necesario.</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-[#087849] flex items-center justify-center mb-4">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <h3 className="mb-2 text-lg md:text-2xl font-semibold" style={{ fontFamily: "var(--font-montserrat)", color: "#087849" }}>Recibe al profesional</h3>
          <p className="text-sm md:text-base" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#000000", textAlign: "center" }}>El día agendado un profesional de ACLIN llegará a tu hogar para una atención rápida y segura.</p>
        </div>
      </section>

      {/* Barra de contacto */}
      <section className="text-white px-4 md:px-[60px]">
        <div className="bg-[#087849] rounded-xl px-4 md:px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-center text-sm font-semibold">
          <a href="tel:323323600" className="flex items-center justify-center gap-3 hover:opacity-80 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            +32 33 23 600
          </a>
          <a href="https://wa.me/56932240951" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 hover:opacity-80 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            +56 9 3224 0951
          </a>
          <a href="mailto:consultas@aclin.cl" className="flex items-center justify-center gap-3 hover:opacity-80 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            consultas@aclin.cl
          </a>
        </div>
      </section>

      {/* ¡Importante! */}
      <section className="bg-[#e8f4ee] mt-16 md:mt-[100px] px-4 md:px-8 pt-10 pb-16 md:pb-[100px]">
        <div className="max-w-5xl mx-auto">
          <h2 className="mb-2 text-3xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-montserrat)", color: "#087849" }}>&#xa1;Importante!</h2>
          <p className="text-gray-600 text-sm mb-1">Servicio disponible en las siguientes comunas:</p>
          <p className="text-gray-800 text-sm font-bold">
            Limache, Villa Alemana, Quilpué, Viña del Mar, Concón, Valparaíso, Curauma y Casablanca.
          </p>
        </div>
      </section>

    </div>
  );
}
