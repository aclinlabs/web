"use client";
import { useState } from "react";
import { MapPin, Plus, Pencil, Trash2, X, Check, ArrowLeft, ToggleLeft, ToggleRight } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

interface Sucursal {
  id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  telefono?: string | null;
  email?: string | null;
  lat: number;
  lng: number;
  horarioClinica?: string | null;
  horarioAdmin?: string | null;
  imagen?: string | null;
  activa: boolean;
  orden: number;
}

const empty: Partial<Sucursal> = { nombre: "", direccion: "", ciudad: "", telefono: "", email: "", lat: -33.02, lng: -71.55, horarioClinica: "", horarioAdmin: "", imagen: "", activa: true, orden: 0 };

export default function AdminSucursalesClient({ sucursales: initial, apiKey }: { sucursales: Sucursal[]; apiKey: string }) {
  const [list, setList] = useState<Sucursal[]>(initial);
  const [form, setForm] = useState<Partial<Sucursal>>(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [mapPos, setMapPos] = useState({ lat: -33.02, lng: -71.55 });

  const { isLoaded } = useJsApiLoader({ id: "admin-map", googleMapsApiKey: apiKey });

  function openNew() {
    setForm(empty);
    setEditing(null);
    setMapPos({ lat: -33.02, lng: -71.55 });
    setShowForm(true);
  }

  function openEdit(s: Sucursal) {
    setForm(s);
    setEditing(s.id);
    setMapPos({ lat: s.lat, lng: s.lng });
    setShowForm(true);
  }

  async function handleSave() {
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/sucursales/${editing}` : "/api/sucursales";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, lat: Number(form.lat), lng: Number(form.lng), orden: Number(form.orden) }) });
    if (!res.ok) { toast.error("Error al guardar"); return; }
    const saved = await res.json();
    if (editing) {
      setList(list.map((s) => (s.id === editing ? saved : s)));
      toast.success("Sucursal actualizada");
    } else {
      setList([...list, saved]);
      toast.success("Sucursal creada");
    }
    setShowForm(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta sucursal?")) return;
    const res = await fetch(`/api/sucursales/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Error al eliminar"); return; }
    setList(list.filter((s) => s.id !== id));
    toast.success("Sucursal eliminada");
  }

  async function toggleActiva(s: Sucursal) {
    const res = await fetch(`/api/sucursales/${s.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ activa: !s.activa }) });
    if (!res.ok) return;
    const updated = await res.json();
    setList(list.map((x) => (x.id === s.id ? updated : x)));
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#1a7a3c] text-white px-6 py-4 flex items-center gap-4 shadow-md">
        <Link href="/admin" className="hover:text-green-200 transition"><ArrowLeft size={20} /></Link>
        <MapPin size={20} />
        <h1 className="font-bold text-lg">Gestión de Sucursales</h1>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 text-sm">{list.length} sucursales registradas</p>
          <button onClick={openNew} className="flex items-center gap-2 bg-[#1a7a3c] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#145c2d] transition">
            <Plus size={16} /> Nueva Sucursal
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">{editing ? "Editar Sucursal" : "Nueva Sucursal"}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {[
                { key: "nombre", label: "Nombre" },
                { key: "direccion", label: "Dirección" },
                { key: "ciudad", label: "Ciudad" },
                { key: "telefono", label: "Teléfono" },
                { key: "email", label: "Email" },
                { key: "orden", label: "Orden" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <input
                    type={key === "orden" ? "number" : "text"}
                    value={(form as any)[key] || ""}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1a7a3c]"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Latitud</label>
                <input type="number" step="0.00001" value={form.lat || ""} onChange={(e) => { const v = parseFloat(e.target.value); setForm({ ...form, lat: v }); setMapPos({ lat: v, lng: form.lng || -71.55 }); }} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1a7a3c]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Longitud</label>
                <input type="number" step="0.00001" value={form.lng || ""} onChange={(e) => { const v = parseFloat(e.target.value); setForm({ ...form, lng: v }); setMapPos({ lat: form.lat || -33.02, lng: v }); }} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1a7a3c]" />
              </div>
            </div>

            {/* Map picker */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1">Selecciona posición en el mapa (clic para mover pin)</label>
              {isLoaded ? (
                <div className="rounded-xl overflow-hidden border border-gray-200 h-48">
                  <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={mapPos}
                    zoom={14}
                    onClick={(e) => {
                      const lat = e.latLng?.lat() || 0;
                      const lng = e.latLng?.lng() || 0;
                      setForm({ ...form, lat, lng });
                      setMapPos({ lat, lng });
                    }}
                  >
                    <MarkerF position={mapPos} />
                  </GoogleMap>
                </div>
              ) : <div className="h-48 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">Cargando mapa...</div>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">URL Imagen</label>
                <input type="text" placeholder="https://..." value={form.imagen || ""} onChange={(e) => setForm({ ...form, imagen: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1a7a3c]" />
                {form.imagen && <img src={form.imagen} alt="preview" className="mt-2 h-24 w-full object-cover rounded-lg border border-gray-200" />}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Horario Clínico</label>
                <textarea rows={4} value={form.horarioClinica || ""} onChange={(e) => setForm({ ...form, horarioClinica: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1a7a3c] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Horario Administrativo</label>
                <textarea rows={4} value={form.horarioAdmin || ""} onChange={(e) => setForm({ ...form, horarioAdmin: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1a7a3c] resize-none" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.activa !== false} onChange={(e) => setForm({ ...form, activa: e.target.checked })} className="accent-[#1a7a3c] w-4 h-4" />
                Sucursal activa
              </label>
              <div className="flex gap-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition">Cancelar</button>
                <button onClick={handleSave} className="flex items-center gap-1 px-4 py-2 bg-[#1a7a3c] text-white rounded-lg text-sm font-semibold hover:bg-[#145c2d] transition"><Check size={16} /> Guardar</button>
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
                <th className="w-16 px-4 py-3 hidden md:table-cell"></th>
                <th className="text-left px-4 py-3 text-gray-600 font-semibold hidden md:table-cell">Ciudad</th>
                <th className="text-left px-4 py-3 text-gray-600 font-semibold hidden lg:table-cell">Email</th>
                <th className="text-left px-4 py-3 text-gray-600 font-semibold">Estado</th>
                <th className="w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {list.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-900">{s.nombre}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {s.imagen ? <img src={s.imagen} alt={s.nombre} className="h-10 w-16 object-cover rounded-lg border border-gray-200" /> : <div className="h-10 w-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-xs">Sin img</div>}
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{s.ciudad}</td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{s.email || "–"}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActiva(s)} className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${s.activa ? "bg-green-100 text-[#1a7a3c]" : "bg-gray-100 text-gray-500"}`}>
                      {s.activa ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                      {s.activa ? "Activa" : "Inactiva"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEdit(s)} className="text-gray-400 hover:text-[#1a7a3c] transition"><Pencil size={16} /></button>
                      <button onClick={() => handleDelete(s.id)} className="text-gray-400 hover:text-red-500 transition"><Trash2 size={16} /></button>
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
