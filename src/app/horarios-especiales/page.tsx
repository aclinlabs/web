import type { Metadata } from "next";
import { AlertTriangle, Phone, Mail } from "lucide-react";

export const metadata: Metadata = { title: "Horario especial – Aclin Laboratorio Clínico" };

interface Sede {
  direccion: string;
  clinica: string;
  admin: string;
}
interface Ciudad {
  nombre: string;
  sedes: Sede[];
}

const CIUDADES: Ciudad[] = [
  {
    nombre: "Viña del Mar",
    sedes: [
      { direccion: "1 Oriente #458 (entre 5 y 6 Norte)", clinica: "8:30 a 10:30", admin: "8:30 a 11:00" },
      { direccion: "1 Oriente #841 (entre 9 y 10 Norte)", clinica: "8:00 a 10:30", admin: "8:00 a 12:00" },
      { direccion: "Errázuriz #634 (Centro Médico Cedid)", clinica: "8:30 a 10:30", admin: "8:30 a 11:00" },
      { direccion: "14 Norte #571 (Edificio Prosalud, Oficina N.º 101)", clinica: "8:30 a 10:30", admin: "8:30 a 11:00" },
      { direccion: "Llay Llay #1510", clinica: "8:30 a 10:30", admin: "8:30 a 11:00" },
      { direccion: "Barros Arana #74 (Reñaca)", clinica: "8:30 a 10:30", admin: "8:30 a 11:00" },
      { direccion: "Av. Edmundo Eluchans #3047 (Centro Médico Bosques de Montemar, Of. N.º 112, Reñaca)", clinica: "8:30 a 10:30", admin: "8:30 a 11:00" },
    ],
  },
  {
    nombre: "Concón",
    sedes: [{ direccion: "Av. Concón Reñaca #70", clinica: "8:30 a 10:30", admin: "8:30 a 11:00" }],
  },
  {
    nombre: "Valparaíso",
    sedes: [
      { direccion: "Av. Brasil #2128", clinica: "8:30 a 10:30", admin: "8:30 a 11:00" },
      { direccion: "Av. Fundadores #634 (Curauma)", clinica: "8:00 a 10:00", admin: "8:00 a 11:00" },
    ],
  },
  {
    nombre: "Casablanca",
    sedes: [{ direccion: "Teniente Merino #12", clinica: "8:30 a 10:00", admin: "8:30 a 11:00" }],
  },
  {
    nombre: "Quilpué",
    sedes: [
      { direccion: "Vicuña Mackenna #874 (Edificio Vicuña Mackenna, Of. N.º 108)", clinica: "8:30 a 10:30", admin: "8:30 a 11:00" },
      { direccion: "Matta #738", clinica: "8:00 a 10:30", admin: "8:00 a 11:00" },
    ],
  },
  {
    nombre: "Villa Alemana",
    sedes: [
      { direccion: "Díaz #931", clinica: "8:00 a 10:00", admin: "8:00 a 11:00" },
      { direccion: "Av. Valparaíso #645 (Centro Médico Ítalo Composto, Local N.º 2)", clinica: "8:00 a 10:00", admin: "8:00 a 11:00" },
    ],
  },
  {
    nombre: "Limache",
    sedes: [{ direccion: "Urmeneta #496 (Centro Médico Limache)", clinica: "8:00 a 9:30", admin: "8:00 a 11:00" }],
  },
  {
    nombre: "Quillota",
    sedes: [
      { direccion: "Blanco Encalada #240", clinica: "8:00 a 9:30", admin: "8:00 a 11:00" },
      { direccion: "Pudeto #311 (Centro Médico CEM)", clinica: "8:30 a 9:30", admin: "8:30 a 11:00" },
    ],
  },
  {
    nombre: "La Calera",
    sedes: [
      { direccion: "Av. Carrera #1533", clinica: "8:00 a 9:15", admin: "8:00 a 11:00" },
      { direccion: "Av. Carrera #503 (Centro Médico Radiológico La Calera)", clinica: "8:30 a 9:15", admin: "8:30 a 11:00" },
    ],
  },
  {
    nombre: "Los Andes",
    sedes: [{ direccion: "Av. Santa Teresa #680, Local 108", clinica: "7:30 a 8:45", admin: "7:30 a 11:00" }],
  },
];

export default function HorariosEspecialesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[#087849] text-white px-4 py-10 md:py-14">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/15 mb-4">
            <AlertTriangle size={28} />
          </div>
          <h1 className="text-2xl md:text-4xl font-black mb-3">Horario especial – Viernes 17 de julio</h1>
          <p className="text-green-100 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Debido al sistema frontal que afecta a la Región de Valparaíso, y con el objetivo de resguardar
            la seguridad de nuestros pacientes y colaboradores, este viernes 17 de julio nuestras sucursales
            atenderán en horarios modificados.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <p className="text-gray-600 text-sm mb-8 text-center max-w-2xl mx-auto">
          Agradecemos su comprensión frente a esta medida preventiva. Por favor revise el horario
          actualizado de su sucursal antes de acudir.
        </p>

        {/* Mobile: cards */}
        <div className="md:hidden space-y-6">
          {CIUDADES.map((ciudad) => (
            <div key={ciudad.nombre}>
              <h2 className="text-[#087849] font-bold text-lg mb-2">{ciudad.nombre}</h2>
              <div className="space-y-3">
                {ciudad.sedes.map((s, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-4">
                    <p className="font-semibold text-sm text-gray-900 mb-2">{s.direccion}</p>
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold text-[#087849]">Atención clínica (toma de muestras): </span>
                      {s.clinica}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      <span className="font-semibold text-[#087849]">Atención administrativa: </span>
                      {s.admin}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#087849] text-white text-left">
                <th className="px-4 py-3 font-semibold">Ciudad</th>
                <th className="px-4 py-3 font-semibold">Unidad de toma de muestras</th>
                <th className="px-4 py-3 font-semibold">Horario atención clínica</th>
                <th className="px-4 py-3 font-semibold">Horario atención administrativa</th>
              </tr>
            </thead>
            <tbody>
              {CIUDADES.map((ciudad) =>
                ciudad.sedes.map((s, i) => (
                  <tr key={`${ciudad.nombre}-${i}`} className="border-t border-gray-100 even:bg-gray-50">
                    {i === 0 && (
                      <td
                        rowSpan={ciudad.sedes.length}
                        className="px-4 py-3 font-bold text-[#087849] align-top border-r border-gray-100 whitespace-nowrap"
                      >
                        {ciudad.nombre}
                      </td>
                    )}
                    <td className="px-4 py-3 text-gray-700">{s.direccion}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{s.clinica}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{s.admin}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Contacto */}
        <div className="mt-10 bg-gray-50 border border-gray-100 rounded-xl p-6 text-center text-sm text-gray-600">
          <p className="mb-4">
            Lamentamos los inconvenientes que esta situación pueda ocasionar y agradecemos su comprensión y
            preferencia.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[#087849] font-semibold">
            <a href="tel:323323600" className="flex items-center gap-1.5 hover:underline">
              <Phone size={14} /> 32 33 23 600
            </a>
            <a href="mailto:consultas@aclin.cl" className="flex items-center gap-1.5 hover:underline">
              <Mail size={14} /> consultas@aclin.cl
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
