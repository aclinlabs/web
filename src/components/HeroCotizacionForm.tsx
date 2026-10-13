"use client";
import { useState, useRef, useEffect } from "react";
import { Headphones, Home, Send, Paperclip, CheckCircle } from "lucide-react";
import Link from "next/link";
import { errorApellidos, errorDocumento, errorFechaNacimiento, esPasaporte, formatearFecha } from "@/lib/validaciones";

const PREVISIONES = [
  "Particular",
  "Fonasa A", "Fonasa B", "Fonasa C", "Fonasa D",
  "Banmédica", "Colmena", "Cruz Blanca", "Consalud",
  "Isapre Chuquicamata", "MasVida", "Nueva Masvida", "Vida Tres",
  "Otra Isapre",
];

interface Sucursal {
  id: string;
  nombre: string;
  ciudad: string;
}

export default function HeroCotizacionForm({ sucursales = [] }: { sucursales?: Sucursal[] }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const apellidoRef = useRef<HTMLInputElement>(null);
  const rutRef = useRef<HTMLInputElement>(null);
  const fechaRef = useRef<HTMLInputElement>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progreso, setProgreso] = useState<number | null>(null);
  const [form, setForm] = useState({
    nombre: "", apellido: "", rut: "", prevision: "",
    correo: "", fechaNacimiento: "", telefono: "", comentarios: "", sucursal: "",
  });

  // Con RUT se exigen ambos apellidos; con pasaporte basta uno. Se recalcula al
  // cambiar cualquiera de los dos campos, y el navegador bloquea el envio con
  // el mensaje mientras no se cumpla.
  useEffect(() => {
    apellidoRef.current?.setCustomValidity(errorApellidos(form.apellido, form.rut));
    rutRef.current?.setCustomValidity(errorDocumento(form.rut));
    fechaRef.current?.setCustomValidity(errorFechaNacimiento(form.fechaNacimiento));
  }, [form.apellido, form.rut, form.fechaNacimiento]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "fechaNacimiento" ? formatearFecha(value) : value }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    setFileNames(files ? Array.from(files).map((f) => f.name) : []);
  }

  const AVISO_WHATSAPP = " Si el problema persiste, contáctenos por WhatsApp.";
  const MAX_ADJUNTOS_MB = 18;

  /**
   * Los adjuntos se mandan codificados en texto (base64) en vez de como
   * archivo binario: el firewall que hay delante del sitio bloquea las subidas
   * binarias y los pacientes no podian enviar su orden medica.
   */
  function leerComoTexto(archivo: File) {
    return new Promise<{ nombre: string; tipo: string; contenido: string }>((resolve, reject) => {
      const lector = new FileReader();
      lector.onload = () =>
        resolve({ nombre: archivo.name, tipo: archivo.type, contenido: String(lector.result).split(",")[1] ?? "" });
      lector.onerror = () => reject(new Error(`No pudimos leer ${archivo.name}`));
      lector.readAsDataURL(archivo);
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProgreso(null);

    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => body.append(key, value));
    const archivos = fileRef.current?.files ? Array.from(fileRef.current.files) : [];

    const pesoMB = archivos.reduce((t, a) => t + a.size, 0) / 1024 / 1024;
    if (pesoMB > MAX_ADJUNTOS_MB) {
      setLoading(false);
      setError(
        `Los archivos pesan ${pesoMB.toFixed(1)} MB y el maximo es ${MAX_ADJUNTOS_MB} MB. ` +
          "Envie menos archivos o tomeles una foto de menor calidad."
      );
      return;
    }

    if (archivos.length > 0) {
      try {
        body.append("archivosB64", JSON.stringify(await Promise.all(archivos.map(leerComoTexto))));
      } catch {
        setLoading(false);
        setError("No pudimos leer el archivo adjunto. Intente seleccionarlo nuevamente." + AVISO_WHATSAPP);
        return;
      }
    }

    // XMLHttpRequest en vez de fetch: es la unica forma de mostrar el avance de
    // la subida, que es lo que mas demora cuando adjuntan una orden escaneada.
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/cotizacion");

    if (archivos.length > 0) {
      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable) setProgreso(Math.round((ev.loaded / ev.total) * 100));
      };
    }

    xhr.onload = () => {
      setLoading(false);
      setProgreso(null);
      if (xhr.status >= 200 && xhr.status < 300) {
        setSubmitted(true);
        return;
      }
      // El servidor explica por que rechazo; antes ese motivo se perdia.
      let motivo = "";
      try {
        motivo = JSON.parse(xhr.responseText)?.error ?? "";
      } catch {}
      setError(motivo || "No pudimos enviar su cotización. Intente nuevamente." + AVISO_WHATSAPP);
    };

    // Conexion caida o subida cortada a medio camino: es el caso mas comun con
    // archivos pesados, y antes se mostraba el mismo mensaje que un rechazo.
    xhr.onerror = xhr.ontimeout = () => {
      setLoading(false);
      setProgreso(null);
      setError(
        "Se cortó la conexión mientras se enviaba" +
          (archivos.length > 0 ? " el archivo adjunto" : "") +
          ". Revise su conexión e intente nuevamente." + AVISO_WHATSAPP
      );
    };

    xhr.send(body);
  }

  const labelClass = "block text-xs font-semibold text-[#087849] mb-1";
  const inputClass = "w-full border border-[#087849]/30 rounded-lg px-3 py-2 text-sm bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#087849]";

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
                onClick={() => { setSubmitted(false); setForm({ nombre: "", apellido: "", rut: "", prevision: "", correo: "", fechaNacimiento: "", telefono: "", comentarios: "", sucursal: "" }); setFileNames([]); }}
                className="mt-2 bg-[#087849] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#065e39] transition"
              >
                Nueva cotización
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Nombres del paciente <span className="text-red-500">*</span></label>
                  <input type="text" name="nombre" required value={form.nombre} onChange={handleChange}
                    placeholder="Ingrese los nombres del paciente" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Apellidos del paciente <span className="text-red-500">*</span></label>
                  <input ref={apellidoRef} type="text" name="apellido" required value={form.apellido} onChange={handleChange}
                    placeholder="Ingrese ambos apellidos del paciente" className={inputClass} />
                  <p className="mt-1 text-[11px] text-gray-500">
                    {esPasaporte(form.rut)
                      ? "Con pasaporte basta con un apellido."
                      : "Paterno y materno. Si ingresa pasaporte, basta con uno."}
                  </p>
                </div>
                <div>
                  <label className={labelClass}>Fecha de nacimiento <span className="text-red-500">*</span></label>
                  <input ref={fechaRef} type="text" name="fechaNacimiento" required inputMode="numeric"
                    value={form.fechaNacimiento} onChange={handleChange}
                    placeholder="dd/mm/aaaa" maxLength={10} className={inputClass} />
                  {errorFechaNacimiento(form.fechaNacimiento) ? (
                    <p className="mt-1 text-[11px] text-red-600">{errorFechaNacimiento(form.fechaNacimiento)}</p>
                  ) : (
                    <p className="mt-1 text-[11px] text-gray-500">Día, mes y año. Por ejemplo 16/11/1986.</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Rut o Pasaporte <span className="text-red-500">*</span></label>
                  <input ref={rutRef} type="text" name="rut" required value={form.rut} onChange={handleChange}
                    placeholder="12.345.678-9" className={inputClass} />
                  {errorDocumento(form.rut) && (
                    <p className="mt-1 text-[11px] text-red-600">{errorDocumento(form.rut)}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Teléfono <span className="text-red-500">*</span></label>
                  <input type="tel" name="telefono" required value={form.telefono} onChange={handleChange}
                    placeholder="+56 9" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Correo Electrónico <span className="text-red-500">*</span></label>
                  <input type="email" name="correo" required value={form.correo} onChange={handleChange}
                    placeholder="Ingrese su correo electrónico" className={inputClass} />
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
                  <label className={labelClass}>Comuna / Sucursal <span className="text-red-500">*</span></label>
                  <select name="sucursal" required value={form.sucursal} onChange={handleChange}
                    className={inputClass}>
                    <option value="" disabled>Seleccione dónde se realizará el examen</option>
                    {sucursales.map((s) => (
                      <option key={s.id} value={`${s.nombre} — ${s.ciudad}`}>{s.nombre} — {s.ciudad}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Comentarios / Preguntas</label>
                  <textarea name="comentarios" value={form.comentarios} onChange={handleChange}
                    placeholder="Escribe tu comentario"
                    className={`${inputClass} min-h-[108px] resize-none`} />
                </div>
              </div>

              {/* Botones */}
              <div className="flex flex-wrap gap-3 mt-4">
                <button type="submit" disabled={loading}
                  className="bg-[#087849] text-white px-7 py-2.5 rounded-full font-semibold text-sm hover:bg-[#065e39] transition flex items-center gap-2 disabled:opacity-70">
                  {loading
                    ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>{progreso !== null && progreso < 100 ? `Subiendo ${progreso}%` : "Enviando..."}</>
                    : <><Send size={13} />Enviar</>}
                </button>
                <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" multiple onChange={handleFile} className="hidden" id="hero-file" />
                <label htmlFor="hero-file"
                  className="cursor-pointer bg-[#065e39] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#044a2d] transition flex items-center gap-2">
                  <Paperclip size={13} />
                  {fileNames.length > 0
                    ? fileNames.length === 1
                      ? fileNames[0]
                      : `${fileNames.length} archivos seleccionados`
                    : "Selecciona sus archivos"}
                </label>
              </div>
              {loading && progreso !== null && (
                <div className="mt-3">
                  <div className="h-1.5 w-full bg-[#087849]/15 rounded-full overflow-hidden">
                    <div className="h-full bg-[#087849] transition-all duration-200" style={{ width: `${progreso}%` }} />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    {progreso < 100 ? `Subiendo archivo… ${progreso}%` : "Archivo subido, enviando la cotización…"}
                  </p>
                </div>
              )}
              {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
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
