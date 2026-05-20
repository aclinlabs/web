"use client";
import { useState } from "react";
import { Bell, Plus, Pencil, Trash2, X, Check, ArrowLeft, ToggleLeft, ToggleRight } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface Popup {
  id: string;
  titulo: string;
  contenido: string;
  imagen?: string | null;
  link?: string | null;
  activo: boolean;
}

const empty: Partial<Popup> = { titulo: "", contenido: "", imagen: "", link: "", activo: false };

export default function AdminPopupClient({ popups: initial }: { popups: Popup[] }) {
  const [list, setList] = useState<Popup[]>(initial);
  const [form, setForm] = useState<Partial<Popup>>(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  function openNew() { setForm(empty); setEditing(null); setShowForm(true); }
  function openEdit(p: Popup) { setForm(p); setEditing(p.id); setShowForm(true); }

  async function handleSave() {
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/popup/admin/${editing}` : "/api/popup/admin";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (!res.ok) { toast.error("Error al guardar"); return; }
    const saved = await res.json();
    if (editing) { setList(list.map((p) => (p.id === editing ? saved : p))); toast.success("Popup actualizado"); }
    else { setList([...list, saved]); toast.success("Popup creado"); }
    setShowForm(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este popup?")) return;
    const res = await fetch(`/api/popup/admin/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Error al eliminar"); return; }
    setList(list.filter((p) => p.id !== id));
    toast.success("Popup eliminado");
  }

  async function toggleActivo(p: Popup) {
    const newVal = !p.activo;
    const res = await fetch(`/api/popup/admin/${p.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ activo: newVal }) });
    if (!res.ok) { toast.error("Error"); return; }
    const saved = await res.json();
    setList(list.map((x) => ({ ...x, activo: x.id === p.id ? saved.activo : (newVal ? false : x.activo) })));
    toast.success(newVal ? "Popup activado" : "Popup desactivado");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-yellow-500 text-white px-6 py-4 flex items-center gap-4 shadow-md">
        <Link href="/admin" className="hover:text-yellow-100 transition"><ArrowLeft size={20} /></Link>
        <Bell size={20} />
        <h1 className="font-bold text-lg">Gestión de Popups / Anuncios</h1>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-sm text-yellow-800">
          Solo un popup puede estar activo a la vez. Al activar uno, los demás se desactivan automáticamente.
        </div>

        <div className="flex justify-end mb-6">
          <button onClick={openNew} className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition">
            <Plus size={16} /> Nuevo Popup
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">{editing ? "Editar Popup" : "Nuevo Popup"}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Título</label>
                <input type="text" value={form.titulo || ""} onChange={(e) => setForm({ ...form, titulo: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Contenido</label>
                <textarea rows={4} value={form.contenido || ""} onChange={(e) => setForm({ ...form, contenido: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">URL Imagen (opcional)</label>
                <input type="url" value={form.imagen || ""} onChange={(e) => setForm({ ...form, imagen: e.target.value })} placeholder="https://..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Link (opcional)</label>
                <input type="url" value={form.link || ""} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.activo !== false} onChange={(e) => setForm({ ...form, activo: e.target.checked })} className="accent-yellow-500 w-4 h-4" />
                Activar inmediatamente
              </label>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition">Cancelar</button>
              <button onClick={handleSave} className="flex items-center gap-1 px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-semibold hover:bg-yellow-600 transition"><Check size={16} /> Guardar</button>
            </div>
          </div>
        )}

        {/* List */}
        <div className="space-y-3">
          {list.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-400 border border-gray-100">
              <Bell size={32} className="mx-auto mb-2 text-gray-300" />
              No hay popups creados aún.
            </div>
          )}
          {list.map((p) => (
            <div key={p.id} className={`bg-white rounded-2xl shadow-sm border p-5 flex items-start justify-between gap-4 ${p.activo ? "border-yellow-300 bg-yellow-50/50" : "border-gray-100"}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{p.titulo}</h3>
                  {p.activo && <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">ACTIVO</span>}
                </div>
                <p className="text-gray-600 text-sm">{p.contenido}</p>
                {p.link && <p className="text-blue-600 text-xs mt-1 truncate">{p.link}</p>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => toggleActivo(p)} title={p.activo ? "Desactivar" : "Activar"} className={`p-1.5 rounded-lg transition ${p.activo ? "text-yellow-600 hover:bg-yellow-100" : "text-gray-400 hover:bg-gray-100"}`}>
                  {p.activo ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                </button>
                <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"><Pencil size={16} /></button>
                <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
