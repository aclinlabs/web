"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#087849] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center">
          <Image src="/logo-bn.png" alt="Aclin Laboratorio Clínico" width={120} height={40} className="object-contain" priority />
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white">
          <Link href="/" className="hover:text-green-200 transition">Inicio</Link>
          <Link href="/examenes" className="hover:text-green-200 transition">Exámenes</Link>
          <Link href="/cotizaciones" className="hover:text-green-200 transition">Cotizaciones</Link>
          <Link href="/sucursales" className="hover:text-green-200 transition">Sucursales</Link>
          <Link href="/nosotros" className="hover:text-green-200 transition">Nosotros</Link>
          <Link href="/contacto" className="hover:text-green-200 transition">Contacto</Link>
          <a
            href="https://pacientes.aclin.cl/resultados/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#087849] px-4 py-2 rounded-full text-sm font-bold hover:bg-green-50 transition"
          >
            Ver Resultados
          </a>
        </div>

        {/* Mobile menu btn */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#065e39] px-4 py-4 flex flex-col gap-4 text-sm font-medium text-white border-t border-green-700">
          <Link href="/" onClick={() => setOpen(false)} className="hover:text-green-200 transition">Inicio</Link>
          <Link href="/examenes" onClick={() => setOpen(false)} className="hover:text-green-200 transition">Exámenes</Link>
          <Link href="/cotizaciones" onClick={() => setOpen(false)} className="hover:text-green-200 transition">Cotizaciones</Link>
          <Link href="/sucursales" onClick={() => setOpen(false)} className="hover:text-green-200 transition">Sucursales</Link>
          <Link href="/nosotros" onClick={() => setOpen(false)} className="hover:text-green-200 transition">Nosotros</Link>
          <Link href="/contacto" onClick={() => setOpen(false)} className="hover:text-green-200 transition">Contacto</Link>
          <a
            href="https://pacientes.aclin.cl/resultados/"
            className="bg-white text-[#087849] px-4 py-2 rounded-full text-center font-bold hover:bg-green-50 transition"
          >
            Ver Resultados
          </a>
        </div>
      )}
    </nav>
  );
}
