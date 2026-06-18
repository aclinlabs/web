"use client";
import { useState, useRef } from "react";
import { Headphones, Home, Send, Paperclip, CheckCircle } from "lucide-react";
import Link from "next/link";

const PREVISIONES = [
  "Particular",
  "Fonasa A", "Fonasa B", "Fonasa C", "Fonasa D",
  "Banmédica", "Colmena", "Cruz Blanca", "Consalud",
  "Isapre Chuquicamata", "MasVida", "Nueva Masvida", "Vida Tres",
  "Otra Isapre",
];

export default function HeroCotizacionForm() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "", apellido: "", rut: "", prevision: "",
    correo: "", fechaNacimiento: "", telefono: "", comentarios: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setFileName(e.target.files?.[0]?.name ?? null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  const labelClass = "block text-xs font-semibold text-[#087849] mb-1";
  const inputClass = "w-full border border-[#087849]/30 rounded-lg px-3 py-2 text-sm bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#087849]";

  return (
    <section className="relative w-full pb-16">
      {/* Imagen hero — sin oscurecer */}
      <div
        className="absolute top-0 left-0 w-full h-[200px] md:h-[340px]"
        style={{
          backgroundImage: "url('/cotizacion.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-36 md:pt-36 flex flex-col md:flex-row items-start">

        {/* LEFT — texto + iconos */}
        <div className="w-full md:w-[32%] bg-[#065e39] rounded-t-2xl md:rounded-t-none md:rounded-l-2xl p-8 flex flex-col justify-between text-white relative overflow-visible md:mt-20" style={{paddingBottom: "80px"}}>
          <div>
            <h2 className="mb-4" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", fontWeight: 700, fontSize: "48px", lineHeight: "57px", letterSpacing: "0%", color: "#FFFFFF" }}>
              Cotice sus<br />exámenes
            </h2>
            <p className="text-green-100 text-sm leading-relaxed">
              Ahorre tiempo y cotice con nosotros, complete su información y recibirá en su correo la información en la brevedad.
            </p>
          </div>
          {/* Iconos cortados por la mitad en el borde inferior — solo desktop */}
          <div className="hidden md:flex absolute bottom-0 translate-y-1/2 left-0 w-full gap-8 justify-start px-6">
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
        <div className="relative bg-[#e8f4ee] rounded-b-2xl md:rounded-2xl p-8 pb-20 md:pb-14 flex-1 w-full" style={{minHeight: "640px"}}>
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-10 text-center">
              <div className="w-16 h-16 rounded-full bg-[#087849]/20 flex items-center justify-center">
                <CheckCircle size={36} className="text-[#087849]" />
              </div>
              <h3 className="text-xl font-black text-[#087849]">¡Cotización enviada!</h3>
              <p className="text-gray-500 text-sm max-w-xs">Le enviaremos la información a su correo a la brevedad.</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ nombre: "", apellido: "", rut: "", prevision: "", correo: "", fechaNacimiento: "", telefono: "", comentarios: "" }); setFileName(null); }}
                className="mt-2 bg-[#087849] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#065e39] transition"
              >
                Nueva cotización
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Nombre <span className="text-red-500">*</span></label>
                  <input type="text" name="nombre" required value={form.nombre} onChange={handleChange}
                    placeholder="Ingrese su nombre" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Rut o Pasaporte <span className="text-red-500">*</span></label>
                  <input type="text" name="rut" required value={form.rut} onChange={handleChange}
                    placeholder="12.345.678-9" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Apellido <span className="text-red-500">*</span></label>
                  <input type="text" name="apellido" required value={form.apellido} onChange={handleChange}
                    placeholder="Ingrese su apellido" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Previsión <span className="text-red-500">*</span></label>
                  <select name="prevision" required value={form.prevision} onChange={handleChange}
                    className={inputClass}>
                    <option value="" disabled>Seleccione su previsión</option>
                    {PREVISIONES.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Correo Electrónico <span className="text-red-500">*</span></label>
                  <input type="email" name="correo" required value={form.correo} onChange={handleChange}
                    placeholder="Ingrese su correo electrónico" className={inputClass} />
                </div>
                <div className="md:row-span-3">
                  <label className={labelClass}>Comentarios / Preguntas</label>
                  <textarea name="comentarios" value={form.comentarios} onChange={handleChange}
                    placeholder="Escribe tu comentario"
                    className={`${inputClass} md:h-[calc(100%-20px)] min-h-[108px] resize-none`} />
                </div>
                <div>
                  <label className={labelClass}>Fecha de nacimiento <span className="text-red-500">*</span></label>
                  <input type="date" name="fechaNacimiento" required value={form.fechaNacimiento} onChange={handleChange}
                    className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Teléfono <span className="text-red-500">*</span></label>
                  <input type="tel" name="telefono" required value={form.telefono} onChange={handleChange}
                    placeholder="+56 9" className={inputClass} />
                </div>
              </div>

              {/* Botones */}
              <div className="flex flex-wrap gap-3 mt-4">
                <button type="submit" disabled={loading}
                  className="bg-[#087849] text-white px-7 py-2.5 rounded-full font-semibold text-sm hover:bg-[#065e39] transition flex items-center gap-2 disabled:opacity-70">
                  {loading
                    ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Enviando...</>
                    : <><Send size={13} />Enviar</>}
                </button>
                <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={handleFile} className="hidden" id="hero-file" />
                <label htmlFor="hero-file"
                  className="cursor-pointer bg-[#065e39] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#044a2d] transition flex items-center gap-2">
                  <Paperclip size={13} />
                  {fileName ?? "Selecciona su archivo"}
                </label>
              </div>
            </form>
          )}

          {/* Iconos mobile — mitad fuera de la caja */}
          <div className="md:hidden absolute bottom-0 translate-y-1/2 left-0 w-full flex gap-10 justify-center px-6">
            <Link href="/sucursales" className="flex flex-col items-center gap-2 group">
              <div className="w-[74px] h-[74px] rounded-full bg-[#087849] border-4 border-white flex items-center justify-center group-hover:bg-[#065e39] transition shadow-md">
                <Home size={30} className="text-white" />
              </div>
              <span className="text-xs text-center leading-snug text-[#087849] font-semibold mt-1">Encuentre<br />su sucursal</span>
            </Link>
            <Link href="/contacto" className="flex flex-col items-center gap-2 group">
              <div className="w-[74px] h-[74px] rounded-full bg-[#087849] border-4 border-white flex items-center justify-center group-hover:bg-[#065e39] transition shadow-md">
                <Headphones size={30} className="text-white" />
              </div>
              <span className="text-xs text-center leading-snug text-[#087849] font-semibold mt-1">¿Tiene dudas?<br />¡Contáctanos!</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
