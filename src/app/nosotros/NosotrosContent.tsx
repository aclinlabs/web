"use client";
import { useState } from "react";

function EspecialidadesSection() {
  const [open, setOpen] = useState<string | null>(null);

  const especialidades = [
    {
      label: "Administración",
      profesionales: ["Equipo administrativo especializado"],
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3"/><path d="M6 20v-1a6 6 0 0 1 12 0v1"/></svg>,
    },
    {
      label: "Bacteriología",
      profesionales: ["Tecnólogo médico especialista en microbiología"],
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>,
    },
    {
      label: "Bioquímica Molecular",
      profesionales: ["Bioquímico especialista en genética molecular"],
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="12" cy="10" r="2"/><line x1="7" y1="6" x2="17" y2="6"/><line x1="12" y1="8" x2="5" y2="6"/><line x1="12" y1="8" x2="19" y2="6"/><line x1="12" y1="12" x2="12" y2="17"/></svg>,
    },
    {
      label: "Bioquímica Clínica y Hormonas",
      profesionales: ["Químico Farmacéutico especialista en endocrinología"],
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 3 19.5 7.5 19.5 16.5 12 21 4.5 16.5 4.5 7.5"/><circle cx="12" cy="12" r="3"/></svg>,
    },
    {
      label: "Cromatología Líquida de Alta Resolución (HPLC)",
      profesionales: ["Claudia Parada L.", "Química Farmacéutica", "Jefe Laboratorio Cromatografía"],
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="13" rx="1"/><rect x="17" y="4" width="4" height="16" rx="1"/><line x1="3" y1="20" x2="21" y2="20"/></svg>,
    },
    {
      label: "Enfermería",
      profesionales: ["Enfermeras universitarias especializadas en toma de muestras"],
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8c0-1 .5-2 2-2h12c1.5 0 2 1 2 2v2H4V8z"/><rect x="4" y="10" width="16" height="10" rx="1"/><line x1="12" y1="13" x2="12" y2="17"/><line x1="10" y1="15" x2="14" y2="15"/></svg>,
    },
    {
      label: "Hematología y Hemostasia",
      profesionales: ["Tecnólogo médico especialista en hematología"],
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>,
    },
    {
      label: "Inmunología",
      profesionales: ["Bioquímico especialista en inmunología clínica"],
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V6L12 2z"/></svg>,
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-[#087849] mb-10" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", fontWeight: 700, fontSize: "42px", lineHeight: "52px" }}>
        Especialidades<br />y profesionales
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {especialidades.map((item) => (
          <div key={item.label}>
            <button
              onClick={() => setOpen(open === item.label ? null : item.label)}
              className="w-full flex items-center gap-3 bg-[#087849] text-white px-4 py-4 hover:bg-[#065e39] transition text-left"
            >
              <div className="shrink-0">{item.icon}</div>
              <span className="text-sm font-semibold leading-snug flex-1">{item.label}</span>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
                className={`shrink-0 transition-transform duration-200 ${open === item.label ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {open === item.label && (
              <div className="bg-[#e8f4ee] px-4 py-3 border-l-2 border-[#087849]">
                {item.profesionales.map((p, i) => (
                  <p key={i} className="text-sm text-gray-900 leading-relaxed">{p}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function NosotrosContent() {
  return (
    <div className="min-h-screen bg-white">

      {/* Sección 1: Historia — imagen izquierda + texto derecha */}
      <section className="flex flex-col md:flex-row items-stretch">
        <div className="md:w-5/12 shrink-0">
          <img src="/sucursales.jpg" alt="Edificio Aclin" className="w-full h-64 md:h-full object-cover" />
        </div>
        <div className="md:w-7/12 px-6 md:px-12 py-10 md:py-16 flex flex-col justify-center">
          <h1 className="text-[#087849] mb-6 text-2xl md:text-4xl font-bold leading-tight" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
            Aclin, apoyo de excelencia<br />al diagnóstico médico
          </h1>
          <p className="text-gray-900 text-sm leading-relaxed mb-4">
            ACLIN laboratorio clínico fue fundado en septiembre de 1987 por tres socios con más de 35 años de experiencia en el campo de la salud: dos Químicos Farmacéuticos y un médico hematólogo. Inicialmente, prestaba servicios de análisis de laboratorio al Hospital del Instituto de Seguridad del Trabajo (IST) de Viña del Mar. En 2001, el laboratorio se independizó del IST y se trasladó a sus actuales dependencias en calle 9 Norte N° 795, esquina con 1 Oriente, en una instalación de 500 m² útiles.
          </p>
          <p className="text-gray-900 text-sm leading-relaxed mb-4">
            A lo largo de los años, ACLIN ha crecido significativamente. Hoy cuenta con un equipo multidisciplinario de más de 180 colaboradores, distribuido en 22 sucursales externas en la región de Valparaíso, procesando alrededor de 500 tipos diferentes de exámenes y atendiendo diariamente a más de 600 usuarios.
          </p>
          <p className="text-gray-900 text-sm leading-relaxed mb-6">
            El laboratorio se ha comprometido a entregar atención de calidad y resultados precisos, consolidándose como el principal laboratorio de la Quinta Región.
          </p>
          <a href="/metodologias" className="text-[#087849] font-semibold text-sm hover:underline">
            &gt; Revisa nuestras metodologías y equipos.
          </a>
        </div>
      </section>

      {/* Sección 2: Nuestros Profesionales */}
      <section className="relative mt-10">
        <img src="/profesionales.jpg" alt="Nuestros Profesionales" className="w-full object-cover" style={{ maxHeight: "480px" }} />
        <div className="absolute -top-4 left-0 bg-[#087849] text-white text-sm font-bold px-4 py-2 rounded-r">
          Nuestros Profesionales
        </div>
      </section>

      {/* Sección 3: Nuestros Fundadores */}
      <section className="mt-10">
        <div className="relative">
          <img src="/profesionales_2.jpg" alt="Nuestros Fundadores" className="w-full object-cover" style={{ maxHeight: "480px" }} />
          <div className="absolute -top-4 left-0 bg-[#087849] text-white text-sm font-bold px-4 py-2 rounded-r">
            Nuestros Fundadores
          </div>
        </div>
        <div className="bg-[#087849] text-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center">
            {[
              { nombre: "Marcelo Tapia Carrerev", cargo1: "Químico Farmacéutico", cargo2: "Director Técnico" },
              { nombre: "Vicente Cid Krebs", cargo1: "Químico Farmacéutico", cargo2: "Gerente General" },
              { nombre: "Sergio Tapia Carrerev", cargo1: "Médico Hematólogo", cargo2: "Jefe Laboratorio Hematología" },
            ].map((f) => (
              <div key={f.nombre}>
                <p className="font-bold text-base">{f.nombre}</p>
                <p className="text-green-200 text-sm">{f.cargo1}</p>
                <p className="text-green-200 text-sm">{f.cargo2}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 4: Misión / Visión / Política de Calidad */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-14 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {[
          {
            title: "Misión",
            text: "Brindar un servicio de excelencia, con ética, profesionalismo e innovación tecnológica.",
            icon: <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#087849" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
          },
          {
            title: "Visión",
            text: "Ser el laboratorio clínico líder de Valparaíso, ofreciendo prestaciones de excelencia con tecnología moderna y resultados confiables.",
            icon: <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#087849" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
          },
          {
            title: "Política de Calidad",
            text: "Realizar exámenes con calidad y oportunidad, superando las expectativas de pacientes y médicos.",
            icon: <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#087849" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
          },
        ].map(({ title, text, icon }) => (
          <div key={title}>
            <div className="flex justify-center mb-4">{icon}</div>
            <h3 className="font-bold text-[#087849] mb-3 text-xl">{title}</h3>
            <p className="text-gray-700 text-base leading-relaxed">{text}</p>
          </div>
        ))}
      </section>

      {/* Nuestra Historia — franja verde + timeline */}
      <section>
        <div className="bg-[#087849] text-white py-4 px-8 flex justify-end">
          <span className="text-xl font-bold">Nuestra Historia</span>
        </div>
        <div className="bg-[#e8f4ee] py-14 overflow-x-auto">
          <div className="px-10">
            <div className="relative flex items-start min-w-max">
              <div className="absolute left-0 right-0 h-0.5 bg-[#087849] z-0" style={{ bottom: "28px" }} />
              {[
                { year: "1987", desc: "Fundación de ACLIN con 5 funcionarios." },
                { year: "1992", desc: "Apertura de la primera sucursal en Limache." },
                { year: "1993", desc: "Apertura primera sucursal Aclin Viña Norte." },
                { year: "1995", desc: "Primera enfermera universitaria contratada." },
                { year: "1999", desc: "Apertura sucursal CEDI (14 norte)." },
                { year: "2001", desc: "Apertura sucursal en Quilpué." },
                { year: "2002", desc: "Instalación primer citómetro de flujo en la región." },
                { year: "2003", desc: "Apertura sucursales en Villa Alemana, Quillota y Reñaca." },
                { year: "2006", desc: "Apertura sucursales Villa Alemana, Quillota, Reñaca y Valparaíso." },
                { year: "2008", desc: "Automatización del sistema (Programa Infolab)." },
                { year: "2013", desc: "Lanzamiento de la primera página web." },
                { year: "2015", desc: "Reorganización de la administración." },
                { year: "2016", desc: "Implementación del programa IRISLAB." },
                { year: "2018", desc: "Creación de ATL QUÍMICA." },
                { year: "2019", desc: "Apertura sucursal Casa Blanca." },
                { year: "2022", desc: "Intranet y segunda sucursal La Calera." },
              ].map((item, idx) => {
                const fontSize = 14 + idx * 2;
                return (
                  <div key={item.year} className="relative z-10 flex flex-col items-center text-center px-5" style={{ width: "200px" }}>
                    <p className="text-[#087849] leading-none mb-2 font-bold" style={{ fontSize: `${fontSize}px` }}>{item.year}</p>
                    <p className="text-gray-700 text-xs leading-snug mb-5" style={{ minHeight: "48px" }}>{item.desc}</p>
                    <div className="w-3 h-3 rounded-full border-2 border-[#087849] bg-white shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <EspecialidadesSection />

    </div>
  );
}
