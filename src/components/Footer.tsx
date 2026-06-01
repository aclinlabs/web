import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#087849] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">

        {/* Col 1: Nuestros Servicios */}
        <div>
          <h4 className="font-bold text-white mb-4 text-sm">Nuestros Servicios</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><a href="https://pacientes.aclin.cl/resultados/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Resultados en línea</a></li>
            <li><Link href="/resultados-sucursal" className="hover:text-white transition">Resultados en sucursal</Link></li>
            <li><Link href="/examenes" className="hover:text-white transition">Exámenes</Link></li>
            <li><a href="http://164.77.220.219/ACLINCONVENIOS/login_Nuevo.asp" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Convenios</a></li>
            <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSd7waNjw8VVsaJHE5LFZzfZmS2lxmCfdl-AEHHPYT7AgQMyQg/viewform" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Talonarios</a></li>
          </ul>
        </div>

        {/* Col 2: Nuestro Laboratorio */}
        <div>
          <h4 className="font-bold text-white mb-4 text-sm">Nuestro Laboratorio</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/nosotros" className="hover:text-white transition">Nosotros</Link></li>
            <li><Link href="/nosotros" className="hover:text-white transition">Profesionales</Link></li>
            <li><Link href="/contacto" className="hover:text-white transition">Contacto</Link></li>
          </ul>
        </div>

        {/* Col 3: Casa Matriz */}
        <div>
          <h4 className="font-bold text-white mb-4 text-sm">Casa Matriz</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <MapPin size={15} fill="currentColor" stroke="none" className="mt-0.5 shrink-0 text-white" />
              <span>9 Norte 795, Viña del Mar</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} fill="currentColor" stroke="none" className="shrink-0 text-white" />
              <a href="tel:323323600" className="hover:text-white transition whitespace-nowrap">32 33 23 600</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} fill="currentColor" stroke="none" className="shrink-0 text-white" />
              <a href="mailto:consultas@aclin.cl" className="hover:text-white transition">consultas@aclin.cl</a>
            </li>
            <li className="flex items-start gap-2">
              <Clock size={15} fill="currentColor" stroke="none" className="mt-0.5 shrink-0 text-white" />
              <span>
                <span className="font-semibold text-white">Horarios de atención<br />call center</span><br />
                Lunes a viernes: 8.30 a 21 hrs<br />
                Sábado: 8.30 a 14.30 hrs.
              </span>
            </li>
          </ul>
        </div>

        {/* Col 4: Síguenos + Logo */}
        <div className="col-span-2 md:col-span-1 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-white mb-4 text-sm">¡Síguenos!</h4>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=61566541113740&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/20 border-2 border-white flex items-center justify-center hover:bg-white hover:text-[#087849] transition text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/aclinlaboratorioclinico?igsh=MzI0YXloOG9renJt" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/20 border-2 border-white flex items-center justify-center hover:bg-white hover:text-[#087849] transition text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8">
            <Image src="/logo-bn.png" alt="Aclin Laboratorio Clínico" width={100} height={36} className="object-contain" />
          </div>
        </div>

      </div>
    </footer>
  );
}
