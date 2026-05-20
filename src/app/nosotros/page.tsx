import type { Metadata } from "next";

export const metadata: Metadata = { title: "Nosotros – Aclin Laboratorio Clínico" };

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Sección 1: Historia — imagen izquierda + texto derecha */}
      <section className="flex flex-col md:flex-row items-stretch">
        <div className="md:w-5/12 shrink-0">
          <img src="/sucursales.jpg" alt="Edificio Aclin" className="w-full h-64 md:h-full object-cover" style={{ minHeight: "unset" }} />
        </div>
        <div className="md:w-7/12 px-5 md:px-10 py-8 md:py-14 flex flex-col justify-center">
          <h1 className="text-[#087849] mb-6 text-2xl md:text-5xl font-bold leading-tight" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
            Aclin, apoyo de excelencia<br />al diagnóstico médico
          </h1>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            ACLIN laboratorio clínico fue fundado en septiembre de 1987 por tres socios con más de 35 años de experiencia en el campo de la salud: dos Químicos Farmacéuticos y un médico hematólogo. Inicialmente, prestaba servicios de análisis de laboratorio al Hospital del Instituto de Seguridad del Trabajo (IST) de Viña del Mar. En 2001, el laboratorio se independizó del IST y se trasladó a sus actuales dependencias en calle 9 Norte N° 795, esquina con 1 Oriente, en una instalación de 500 m² útiles.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            A lo largo de los años, ACLIN ha crecido significativamente. Hoy cuenta con un equipo multidisciplinario de más de 180 colaboradores, que incluye 1 médico, 5 Químicos Farmacéuticos, 9 tecnólogos médicos, más de 23 profesionales de tomas de muestras, técnicos de tomas de muestras y personal auxiliar, distribuido en 22 sucursales externas en la región de Valparaíso. Este equipo, apoyado por tecnología de última generación, procesa alrededor de 500 tipos diferentes de exámenes y atiende diariamente a más de 600 usuarios.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mb-6">
            El laboratorio se ha comprometido a entregar atención de calidad y resultados precisos, lo que le ha permitido consolidarse como el principal laboratorio de la Quinta Región. Su dedicación a la excelencia en el servicio y la confianza que genera tanto en pacientes como en médicos hacen que ACLIN sea un referente en el diagnóstico médico en la región.
          </p>
          <a href="#" className="text-[#087849] font-semibold text-sm hover:underline">
            &gt; Revisa nuestras metodologías y equipos.
          </a>
        </div>
      </section>

      {/* Sección 2: Nuestros Profesionales */}
      <section className="relative" style={{ marginTop: "60px" }}>
        <img src="/profesionales.jpg" alt="Nuestros Profesionales" className="w-full object-cover" style={{ maxHeight: "480px" }} />
        <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-[#087849] text-white text-xs md:text-sm font-bold px-3 py-1.5 md:px-4 md:py-2">
          Nuestros Profesionales
        </div>
      </section>

      {/* Sección 3: Nuestros Fundadores */}
      <section className="relative mt-6 md:mt-10">
        <div className="relative">
          <img src="/profesionales_2.jpg" alt="Nuestros Fundadores" className="w-full object-cover" style={{ maxHeight: "480px" }} />
          <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-[#087849] text-white text-xs md:text-sm font-bold px-3 py-1.5 md:px-4 md:py-2">
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
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <div className="flex justify-center mb-3">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#087849" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
            </svg>
          </div>
          <h3 className="font-bold text-[#087849] mb-2">Misión</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Brindar un servicio de excelencia, con ética, profesionalismo, e innovación tecnológica.</p>
        </div>
        <div>
          <div className="flex justify-center mb-3">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#087849" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <h3 className="font-bold text-[#087849] mb-2">Visión</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Ser el laboratorio clínico líder de Valparaíso, ofreciendo prestaciones de excelencia con tecnología moderna y resultados confiables.</p>
        </div>
        <div>
          <div className="flex justify-center mb-3">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#087849" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <h3 className="font-bold text-[#087849] mb-2">Política de Calidad</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Realizar exámenes con calidad y oportunidad, superando las expectativas de pacientes y médicos.</p>
        </div>
      </section>

      {/* Botón Nuestra Historia */}
      <div className="flex justify-end">
        <div className="bg-[#087849] text-white px-8 py-4 font-bold text-base cursor-pointer hover:bg-[#065e39] transition-colors">
          Nuestra Historia
        </div>
      </div>

      {/* Timeline */}
      <section className="bg-[#e8f4ee] py-12 overflow-x-auto">
        <div className="px-10">
          <div className="relative flex items-start gap-0 min-w-max">
            {/* línea horizontal — alineada con los dots */}
            <div className="absolute left-0 right-0 h-0.5 bg-[#087849] z-0" style={{ bottom: "36px" }} />

            {[
              { year: "1987", desc: "Fundación de ACLIN con 5 funcionarios." },
              { year: "1992", desc: "Apertura de la primera sucursal externa en Limache y llegada del primer computador." },
              { year: "1993", desc: "Apertura de la primera sucursal en Viña (6 norte).", featured: true },
              { year: "1995", desc: "Contratación de la primera enfermera universitaria." },
              { year: "1999", desc: "Apertura de la sucursal de CEDI (14 norte)." },
              { year: "2001", desc: "Apertura de la sucursal en Quilpué." },
              { year: "2002", desc: "Instalación del primer citómetro de flujo en la región." },
              { year: "2003", desc: "Inauguración de ACLIN en 9 Norte." },
              { year: "2006", desc: "Apertura de sucursales en Villa Alemana, Quillota, Reñaca y Valparaíso." },
              { year: "2008", desc: "Automatización del sistema (Programa Infolab)." },
              { year: "2013", desc: "Lanzamiento de la primera página web." },
              { year: "2015", desc: "Reorganización de la administración." },
              { year: "2016", desc: "Implementación del programa IRISLAB." },
              { year: "2018", desc: "Creación de ATL QUÍMICA." },
              { year: "2019", desc: "Apertura de la sucursal en Casa Blanca." },
              { year: "2022", desc: "Implementación de la intranet y segunda sucursal en La Calera." },
            ].map((item) => (
              <div key={item.year} className="relative z-10 flex flex-col items-center text-center px-4" style={{ width: "160px" }}>
                <p className={`text-[#087849] leading-none mb-3 ${item.featured ? "text-5xl font-black" : "text-xl font-bold"}`}>{item.year}</p>
                <p className="text-gray-600 text-xs leading-snug mb-4" style={{ minHeight: "60px" }}>{item.desc}</p>
                <div className="w-3 h-3 rounded-full border-2 border-[#087849] bg-white shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Especialidades y profesionales */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-[#087849] mb-12 text-center" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", fontWeight: 700, fontSize: "48px", lineHeight: "57px" }}>Especialidades<br />y profesionales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: "Administración",
              icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3"/><path d="M6 20v-1a6 6 0 0 1 12 0v1"/><circle cx="19" cy="19" r="3"/><path d="M17.5 17.5 19 19l1.5-1.5"/></svg>
            },
            {
              label: "Bacteriología",
              icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/><circle cx="12" cy="12" r="1.5" fill="white"/></svg>
            },
            {
              label: "Bioquímica Molecular",
              icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="12" cy="10" r="2"/><line x1="7" y1="6" x2="17" y2="6"/><line x1="12" y1="8" x2="5" y2="6"/><line x1="12" y1="8" x2="19" y2="6"/><line x1="12" y1="12" x2="12" y2="17"/></svg>
            },
            {
              label: "Bioquímica Clínica y Hormonas",
              icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 3 19.5 7.5 19.5 16.5 12 21 4.5 16.5 4.5 7.5"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="19.5" y1="7.5" x2="14.6" y2="10.5"/><line x1="19.5" y1="16.5" x2="14.6" y2="13.5"/><line x1="12" y1="21" x2="12" y2="15"/><line x1="4.5" y1="16.5" x2="9.4" y2="13.5"/><line x1="4.5" y1="7.5" x2="9.4" y2="10.5"/></svg>
            },
            {
              label: "Cromatología líquida de Alta Resolución (HPLC)",
              icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="13" rx="1"/><rect x="17" y="4" width="4" height="16" rx="1"/><path d="M5 11V5h2"/><path d="M12 7V3h2"/><line x1="3" y1="20" x2="21" y2="20"/></svg>
            },
            {
              label: "Enfermería",
              icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8c0-1 .5-2 2-2h12c1.5 0 2 1 2 2v2H4V8z"/><rect x="4" y="10" width="16" height="10" rx="1"/><line x1="12" y1="13" x2="12" y2="17"/><line x1="10" y1="15" x2="14" y2="15"/></svg>
            },
            {
              label: "Hematología y Hemostasia",
              icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/><path d="M11 7c0 2-2 3-2 5s2 3 2 3" strokeWidth="1.5"/></svg>
            },
            {
              label: "Inmunología",
              icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V6L12 2z"/><circle cx="12" cy="12" r="2.5"/><line x1="12" y1="9.5" x2="12" y2="7"/><line x1="12" y1="14.5" x2="12" y2="17"/><line x1="9.5" y1="12" x2="7" y2="12"/><line x1="14.5" y1="12" x2="17" y2="12"/></svg>
            },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4 bg-[#3a7a52] text-white px-5 py-5">
              <div className="shrink-0">
                {item.icon}
              </div>
              <span className="text-sm font-semibold leading-snug">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
