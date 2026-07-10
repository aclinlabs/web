"use client";
import { useState, useRef } from "react";
import { Send, Paperclip, CheckCircle } from "lucide-react";

const PREVISIONES = [
  "Particular",
  "Fonasa A",
  "Fonasa B",
  "Fonasa C",
  "Fonasa D",
  "Banmédica",
  "Colmena",
  "Cruz Blanca",
  "Consalud",
  "Isapre Chuquicamata",
  "MasVida",
  "Nueva Masvida",
  "Vida Tres",
  "Otra Isapre",
];

export default function CotizacionesClient() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    prevision: "",
    correo: "",
    fechaNacimiento: "",
    telefono: "",
    comentarios: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    setFileNames(files ? Array.from(files).map((f) => f.name) : []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const body = new FormData();
      Object.entries(form).forEach(([key, value]) => body.append(key, value));
      if (fileRef.current?.files) {
        Array.from(fileRef.current.files).forEach((file) => body.append("archivo", file));
      }

      const res = await fetch("/api/cotizacion", { method: "POST", body });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("No pudimos enviar su cotización. Intente nuevamente o contáctenos por WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
        <div className="w-20 h-20 rounded-full bg-[#e8f5ed] flex items-center justify-center">
          <CheckCircle size={40} className="text-[#087849]" />
        </div>
        <h2 className="text-2xl font-black text-[#087849]">¡Cotización enviada!</h2>
        <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
          Hemos recibido su solicitud. Le enviaremos la información a su correo a la brevedad.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ nombre: "", apellido: "", rut: "", prevision: "", correo: "", fechaNacimiento: "", telefono: "", comentarios: "" }); setFileNames([]); }}
          className="mt-2 bg-[#087849] text-white px-8 py-2.5 rounded-full font-semibold hover:bg-[#065e39] transition text-sm"
        >
          Nueva cotización
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="nombre"
              required
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ingrese su nombre"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#087849]"
            />
          </div>

          {/* Rut */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rut o Pasaporte <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="rut"
              required
              value={form.rut}
              onChange={handleChange}
              placeholder="12.345.678-9"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#087849]"
            />
          </div>

          {/* Apellido */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apellido <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="apellido"
              required
              value={form.apellido}
              onChange={handleChange}
              placeholder="Ingrese su apellido"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#087849]"
            />
          </div>

          {/* Previsión */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Previsión <span className="text-red-500">*</span></label>
            <select
              name="prevision"
              required
              value={form.prevision}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#087849] bg-white"
            >
              <option value="" disabled>Seleccione su previsión</option>
              {PREVISIONES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Correo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="correo"
              required
              value={form.correo}
              onChange={handleChange}
              placeholder="Ingrese su correo electrónico"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#087849]"
            />
          </div>

          {/* Comentarios */}
          <div className="md:row-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Comentarios / Preguntas</label>
            <textarea
              name="comentarios"
              value={form.comentarios}
              onChange={handleChange}
              rows={5}
              placeholder="Escribe tu comentario"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#087849] resize-none h-full min-h-[120px]"
            />
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento <span className="text-red-500">*</span></label>
            <input
              type="date"
              name="fechaNacimiento"
              required
              value={form.fechaNacimiento}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#087849]"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono <span className="text-red-500">*</span></label>
            <input
              type="tel"
              name="telefono"
              required
              value={form.telefono}
              onChange={handleChange}
              placeholder="+56 9"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#087849]"
            />
          </div>
        </div>

        {/* Archivo + Enviar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#087849] text-white px-8 py-2.5 rounded-full font-semibold hover:bg-[#065e39] transition text-sm flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center gap-2"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Enviando...</span>
            ) : (
              <><Send size={14} />Enviar</>
            )}
          </button>

          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            multiple
            onChange={handleFile}
            className="hidden"
            id="cotizacion-file"
          />
          <label
            htmlFor="cotizacion-file"
            className="cursor-pointer bg-[#065e39] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#044a2d] transition text-sm flex items-center gap-2"
          >
            <Paperclip size={14} />
            {fileNames.length > 0
              ? fileNames.length === 1
                ? fileNames[0]
                : `${fileNames.length} archivos seleccionados`
              : "Selecciona sus archivos"}
          </label>
          {fileNames.length > 0 && (
            <span className="text-xs text-gray-400 truncate max-w-[180px]">{fileNames.join(", ")}</span>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Puede adjuntar su orden médica o exámenes anteriores (PDF, JPG, PNG, DOC). Tamaño máximo: 10 MB.
        </p>
        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      </form>
    </div>
  );
}
