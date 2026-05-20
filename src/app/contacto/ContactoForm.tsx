"use client";
import { useState } from "react";
import { CheckCircle, Headphones, Home } from "lucide-react";
import Link from "next/link";

const SUCURSALES = [
  "Casa Matriz - 9 Norte",
  "Viña del Mar - 6 Norte",
  "Quilpué",
  "Villa Alemana",
  "Quillota",
  "Reñaca",
  "Valparaíso",
  "Limache",
  "Casa Blanca",
  "La Calera",
];

export default function ContactoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "", apellido: "", correo: "", sucursal: "", motivo: "", comentarios: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section className="relative w-full pb-10 md:pb-16">
      {/* Imagen hero */}
      <div
        className="absolute top-0 left-0 w-full"
        style={{
          backgroundImage: "url('/contacto.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          height: "520px",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-40 md:pt-64 flex flex-col md:flex-row items-start">

        {/* LEFT — panel verde */}
        <div
          className="w-full md:w-[32%] bg-[#065e39]/90 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none p-6 md:p-8 flex flex-col justify-between text-white relative overflow-visible"
          style={{ paddingBottom: "80px", marginTop: "0px" }}
        >
          <div>
            <h1 className="text-4xl font-black leading-tight mb-4">¡Hablemos!</h1>
            <p className="text-green-100 text-sm leading-relaxed mb-6">
              Queremos estar siempre cerca de usted. Nuestro equipo está disponible para entregarle respuestas claras y confiables. <span className="font-bold">¡Contáctenos!</span>
            </p>

            <p className="font-bold text-sm mb-3">Casa Matriz</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <a href="https://maps.google.com/?q=9+Norte+795,+Viña+del+Mar" target="_blank" rel="noopener noreferrer" className="hover:underline">9 Norte 795, Viña del Mar</a>
              </li>
              <li className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                <a href="tel:323323600" className="hover:underline">32 33 23 600</a>
              </li>
              <li className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <a href="mailto:consultas@aclin.cl" className="hover:underline">consultas@aclin.cl</a>
              </li>
            </ul>
          </div>

          {/* Iconos abajo */}
          <div className="absolute bottom-0 translate-y-1/2 left-0 w-full flex gap-6 md:gap-8 justify-start px-6 z-10">
            <Link href="/contacto" className="flex flex-col items-center gap-2 group">
              <div className="w-[74px] h-[74px] rounded-full bg-[#087849] border-4 border-white flex items-center justify-center group-hover:bg-[#065e39] transition shadow-md">
                <Headphones size={30} className="text-white" />
              </div>
              <span className="text-xs text-center leading-snug text-[#087849] font-semibold mt-1">¿Tiene dudas?<br />¡Contáctanos!</span>
            </Link>
            <Link href="/sucursales" className="flex flex-col items-center gap-2 group">
              <div className="w-[74px] h-[74px] rounded-full bg-[#087849] border-4 border-white flex items-center justify-center group-hover:bg-[#065e39] transition shadow-md">
                <Home size={30} className="text-white" />
              </div>
              <span className="text-xs text-center leading-snug text-[#087849] font-semibold mt-1">Encuentre<br />su sucursal</span>
            </Link>
          </div>
        </div>

        {/* RIGHT — formulario */}
        <div className="bg-[#e8f3ee]/95 rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none p-6 md:p-8 pb-10 md:pb-14 flex-1 mt-8 md:mt-0" style={{ minHeight: "540px" }}>
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-[#087849]/20 flex items-center justify-center">
                <CheckCircle size={36} className="text-[#087849]" />
              </div>
              <h3 className="text-xl font-black text-[#087849]">¡Mensaje enviado!</h3>
              <p className="text-gray-500 text-sm max-w-xs">Nuestro equipo le responderá a la brevedad.</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ nombre: "", apellido: "", correo: "", sucursal: "", motivo: "", comentarios: "" }); }}
                className="mt-2 bg-[#087849] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#065e39] transition"
              >
                Nuevo mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Nombre <span className="text-red-500">*</span></label>
                  <input type="text" name="nombre" required value={form.nombre} onChange={handleChange}
                    placeholder="Ingrese su nombre"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#087849]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Apellido <span className="text-red-500">*</span></label>
                  <input type="text" name="apellido" required value={form.apellido} onChange={handleChange}
                    placeholder="Ingrese su apellido"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#087849]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Correo Electrónico <span className="text-red-500">*</span></label>
                  <input type="email" name="correo" required value={form.correo} onChange={handleChange}
                    placeholder="Ingrese su correo electrónico"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#087849]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Sucursal <span className="text-red-500">*</span></label>
                  <select name="sucursal" required value={form.sucursal} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#087849]">
                    <option value="" disabled>Seleccione su sucursal</option>
                    {SUCURSALES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Motivo <span className="text-red-500">*</span></label>
                  <select name="motivo" required value={form.motivo} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#087849]">
                    <option value="" disabled>Felicitación / Reclamo / Otro</option>
                    <option>Felicitación</option>
                    <option>Reclamo</option>
                    <option>Consulta</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div className="row-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Comentarios/ Preguntas</label>
                  <textarea name="comentarios" value={form.comentarios} onChange={handleChange}
                    placeholder="Escriba un comentario"
                    className="w-full h-[calc(100%-20px)] min-h-[108px] border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#087849] resize-none" />
                </div>
                <div className="col-span-1 md:col-span-2 mt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#087849] text-white px-8 py-2.5 rounded-full font-semibold text-sm hover:bg-[#065e39] transition disabled:opacity-60"
                  >
                    {loading ? "Enviando..." : "Enviar"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
