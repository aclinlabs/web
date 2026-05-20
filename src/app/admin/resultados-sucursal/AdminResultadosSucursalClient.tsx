"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface ResultadoSucursal {
  id: string;
  nombre: string;
  activo: boolean;
  orden: number;
}

const empty: Partial<ResultadoSucursal> = { nombre: "", activo: true, orden: 0 };

export default function AdminResultadosSucursalClient({ items: initial }: { items: ResultadoSucursal[] }) {
  const [list, setList] = useState<ResultadoSucursal[]>(initial);
  const [form, setForm] = useState<Partial<ResultadoSucursal>>(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = list.filter((e) =>
    query === "" || e.nombre.toLowerCase().includes(query.toLowerCase())
  );

  function openNew() { setForm(empty); setEditing(null); setShowForm(true); }
  function openEdit(e: ResultadoSucursal) { setForm(e); setEditing(e.id); setShowForm(true); }

  async function handleSave() {
    if (!form.nombre?.trim()) { toast.error("El nombre es obligatorio"); return; }
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/resultados-sucursal/${editing}` : "/api/resultados-sucursal";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (!res.ok) { toast.error("Error al guardar"); return; }
    const saved = await res.json();
    if (editing) { setList(list.map((e) => (e.id === editing ? saved : e))); toast.success("Actualizado"); }
    else { setList([...list, saved]); toast.success("Creado"); }
    setShowForm(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este registro?")) return;
    const res = await fetch(`/api/resultados-sucursal/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Error al eliminar"); return; }
    setList(list.filter((e) => e.id !== id));
    toast.success("Eliminado");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white px-6 py-4 flex items-center gap-4 shadow-md">
        <Link href="/admin" className="hover:text-blue-200 transition"><ArrowLeft size={20} /></Link>
        <h1 className="font-bold text-lg">Resultados en Sucursal</h1>
        <span className="ml-auto text-blue-200 text-sm">{list.length} registros</span>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white w-72"
            />
          </div>
          <button onClick={openNew} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
            <Plus size={16} /> Nuevo
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">{editing ? "Editar" : "Nuevo"} examen de retiro en sucursal</h2>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="flex flex-col gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Nombre del Examen *</label>
                <input
                  type="text"
                  value={form.nombre || ""}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Orden</label>
                  <input
                    type="number"
                    value={form.orden ?? 0}
                    onChange={(e) => setForm({ ...form, orden: Number(e.target.value) })}
                    className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm cursor-pointer mt-4">
                  <input type="checkbox" checked={form.activo !== false} onChange={(e) => setForm({ ...form, activo: e.target.checked })} className="accent-blue-600 w-4 h-4" />
                  Activo
                </label>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition">Cancelar</button>
              <button onClick={handleSave} className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"><Check size={16} /> Guardar</button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-gray-600 font-semibold">Nombre</th>
                <th className="text-left px-4 py-3 text-gray-600 font-semibold w-20">Orden</th>
                <th className="text-left px-4 py-3 text-gray-600 font-semibold w-24">Estado</th>
                <th className="w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">Sin resultados</td></tr>
              ) : filtered.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-900">{e.nombre}</td>
                  <td className="px-4 py-3 text-gray-500">{e.orden}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${e.activo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                      {e.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEdit(e)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(e.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition"><Trash2 size={14} /></button>
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
