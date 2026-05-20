"use client";
import { useState, useRef } from "react";
import { FlaskConical, Plus, Pencil, Trash2, X, Check, ArrowLeft, Search, Upload, Download } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface Examen {
  id: string;
  nombre: string;
  codigo?: string | null;
  categoria?: string | null;
  subcategoria?: string | null;
  descripcion?: string | null;
  preparacion?: string | null;
  tiempo?: string | null;
  muestra?: string | null;
  activo: boolean;
}

const empty: Partial<Examen> = {
  nombre: "", codigo: "", categoria: "", subcategoria: "",
  descripcion: "", preparacion: "", tiempo: "", muestra: "", activo: true,
};

export default function AdminExamenesClient({ examenes: initial }: { examenes: Examen[] }) {
  const [list, setList] = useState<Examen[]>(initial);
  const [form, setForm] = useState<Partial<Examen>>(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");
  const [importing, setImporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = list.filter((e) =>
    query === "" ||
    e.nombre.toLowerCase().includes(query.toLowerCase()) ||
    (e.codigo && e.codigo.toLowerCase().includes(query.toLowerCase())) ||
    (e.categoria && e.categoria.toLowerCase().includes(query.toLowerCase()))
  );

  function openNew() { setForm(empty); setEditing(null); setShowForm(true); }
  function openEdit(e: Examen) { setForm(e); setEditing(e.id); setShowForm(true); }

  async function handleSave() {
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/examenes/${editing}` : "/api/examenes";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (!res.ok) { toast.error("Error al guardar"); return; }
    const saved = await res.json();
    if (editing) { setList(list.map((e) => (e.id === editing ? saved : e))); toast.success("Examen actualizado"); }
    else { setList([...list, saved]); toast.success("Examen creado"); }
    setShowForm(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este examen?")) return;
    const res = await fetch(`/api/examenes/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Error al eliminar"); return; }
    setList(list.filter((e) => e.id !== id));
    toast.success("Examen eliminado");
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/examenes/import", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Error al importar"); return; }
      toast.success(`${data.count} exámenes importados correctamente`);
      // Recargar lista
      const listRes = await fetch("/api/examenes");
      setList(await listRes.json());
    } catch {
      toast.error("Error al importar el archivo");
    } finally {
      setImporting(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white px-6 py-4 flex items-center gap-4 shadow-md">
        <Link href="/admin" className="hover:text-blue-200 transition"><ArrowLeft size={20} /></Link>
        <FlaskConical size={20} />
        <h1 className="font-bold text-lg">Gestión de Exámenes</h1>
        <span className="ml-auto text-blue-200 text-sm">{list.length} exámenes</span>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, código o categoría..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white w-72"
            />
          </div>
          <div className="flex gap-2">
            {/* Descargar ejemplo */}
            <a
              href="/ejemplo-importacion-examenes.csv"
              download
              className="flex items-center gap-2 border border-gray-300 bg-white text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
              title="Descargar CSV de ejemplo"
            >
              <Download size={15} /> Descargar ejemplo
            </a>
            {/* Importar */}
            <label className={`flex items-center gap-2 border border-blue-500 text-blue-600 px-3 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-blue-50 transition ${importing ? "opacity-50 pointer-events-none" : ""}`}>
              <Upload size={15} /> {importing ? "Importando..." : "Importar CSV/XLS"}
              <input ref={fileRef} type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={handleImport} />
            </label>
            {/* Nuevo */}
            <button onClick={openNew} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
              <Plus size={16} /> Nuevo Examen
            </button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">{editing ? "Editar Examen" : "Nuevo Examen"}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Nombre del Examen *</label>
                <input type="text" value={form.nombre || ""} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              {[
                { key: "codigo", label: "Código" },
                { key: "categoria", label: "Categoría" },
                { key: "subcategoria", label: "Subcategoría" },
                { key: "muestra", label: "Tipo de Muestra" },
                { key: "tiempo", label: "Plazo de Entrega" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <input type="text" value={(form as any)[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Preparación del Paciente</label>
                <textarea rows={3} value={form.preparacion || ""} onChange={(e) => setForm({ ...form, preparacion: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Descripción</label>
                <textarea rows={3} value={form.descripcion || ""} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.activo !== false} onChange={(e) => setForm({ ...form, activo: e.target.checked })} className="accent-blue-600 w-4 h-4" />
                Examen activo
              </label>
              <div className="flex gap-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition">Cancelar</button>
                <button onClick={handleSave} className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"><Check size={16} /> Guardar</button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-gray-600 font-semibold">Nombre</th>
                <th className="text-left px-4 py-3 text-gray-600 font-semibold hidden md:table-cell">Código</th>
                <th className="text-left px-4 py-3 text-gray-600 font-semibold hidden lg:table-cell">Categoría</th>
                <th className="text-left px-4 py-3 text-gray-600 font-semibold hidden xl:table-cell">Muestra</th>
                <th className="text-left px-4 py-3 text-gray-600 font-semibold">Estado</th>
                <th className="w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">Sin resultados</td></tr>
              ) : filtered.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-900">{e.nombre}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{e.codigo || "–"}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {e.categoria && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">{e.categoria}</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden xl:table-cell">{e.muestra || "–"}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${e.activo ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {e.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEdit(e)} className="text-gray-400 hover:text-blue-600 transition"><Pencil size={16} /></button>
                      <button onClick={() => handleDelete(e.id)} className="text-gray-400 hover:text-red-500 transition"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
