"use client";
import { useRef, useState } from "react";
import { Images, Plus, Pencil, Trash2, X, Check, ArrowLeft, ToggleLeft, ToggleRight, ArrowUp, ArrowDown, Upload } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface Slide {
  id: string;
  titulo?: string | null;
  link?: string | null;
  orden: number;
  activo: boolean;
  updatedAt: string;
  imagenUrl: string;
  imagenUrlMobile: string;
}

const empty = { titulo: "", link: "", activo: true };

export default function AdminSliderClient({ slides: initial }: { slides: Slide[] }) {
  const [list, setList] = useState<Slide[]>(initial);
  const [form, setForm] = useState<{ titulo: string; link: string; activo: boolean }>(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [previewMobile, setPreviewMobile] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const fileMobileRef = useRef<HTMLInputElement>(null);

  function openNew() {
    setForm(empty);
    setEditing(null);
    setPreview(null);
    setPreviewMobile(null);
    if (fileRef.current) fileRef.current.value = "";
    if (fileMobileRef.current) fileMobileRef.current.value = "";
    setShowForm(true);
  }

  function openEdit(s: Slide) {
    setForm({ titulo: s.titulo || "", link: s.link || "", activo: s.activo });
    setEditing(s.id);
    setPreview(s.imagenUrl);
    setPreviewMobile(s.imagenUrlMobile);
    if (fileRef.current) fileRef.current.value = "";
    if (fileMobileRef.current) fileMobileRef.current.value = "";
    setShowForm(true);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }

  function onFileChangeMobile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewMobile(URL.createObjectURL(file));
  }

  async function handleSave() {
    if (!editing && !fileRef.current?.files?.[0]) {
      toast.error("Selecciona una imagen");
      return;
    }
    setSaving(true);
    const body = new FormData();
    body.append("titulo", form.titulo);
    body.append("link", form.link);
    body.append("activo", String(form.activo));
    if (fileRef.current?.files?.[0]) body.append("imagen", fileRef.current.files[0]);
    if (fileMobileRef.current?.files?.[0]) body.append("imagenMobile", fileMobileRef.current.files[0]);

    const url = editing ? `/api/slider/admin/${editing}` : "/api/slider/admin";
    const method = editing ? "PATCH" : "POST";
    const res = await fetch(url, { method, body });
    setSaving(false);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      toast.error(err.error || "Error al guardar");
      return;
    }
    const saved = await res.json();
    if (editing) {
      setList(list.map((s) => (s.id === editing ? { ...s, ...saved } : s)));
      toast.success("Imagen actualizada");
    } else {
      setList([...list, saved].sort((a, b) => a.orden - b.orden));
      toast.success("Imagen agregada");
    }
    setShowForm(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta imagen del slider?")) return;
    const res = await fetch(`/api/slider/admin/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Error al eliminar"); return; }
    setList(list.filter((s) => s.id !== id));
    toast.success("Imagen eliminada");
  }

  async function toggleActivo(s: Slide) {
    const body = new FormData();
    body.append("activo", String(!s.activo));
    const res = await fetch(`/api/slider/admin/${s.id}`, { method: "PATCH", body });
    if (!res.ok) { toast.error("Error"); return; }
    setList(list.map((x) => (x.id === s.id ? { ...x, activo: !s.activo } : x)));
  }

  async function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= list.length) return;
    const a = list[index];
    const b = list[target];
    const [ordenA, ordenB] = [b.orden, a.orden];
    const bodyA = new FormData();
    bodyA.append("orden", String(ordenA));
    const bodyB = new FormData();
    bodyB.append("orden", String(ordenB));
    const [resA, resB] = await Promise.all([
      fetch(`/api/slider/admin/${a.id}`, { method: "PATCH", body: bodyA }),
      fetch(`/api/slider/admin/${b.id}`, { method: "PATCH", body: bodyB }),
    ]);
    if (!resA.ok || !resB.ok) { toast.error("Error al reordenar"); return; }
    const newList = [...list];
    newList[index] = { ...a, orden: ordenA };
    newList[target] = { ...b, orden: ordenB };
    setList(newList.sort((x, y) => x.orden - y.orden));
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-cyan-600 text-white px-6 py-4 flex items-center gap-4 shadow-md">
        <Link href="/admin" className="hover:text-cyan-100 transition"><ArrowLeft size={20} /></Link>
        <Images size={20} />
        <h1 className="font-bold text-lg">Slider del Home</h1>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 mb-6 text-sm text-cyan-800">
          Las imágenes se comprimen y convierten automáticamente a WebP al subirlas, sin importar el peso o formato original. El orden de la lista es el orden en que aparecen en el slider.
        </div>

        <div className="flex justify-end mb-6">
          <button onClick={openNew} className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-cyan-700 transition">
            <Plus size={16} /> Nueva Imagen
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">{editing ? "Editar Imagen" : "Nueva Imagen"}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Imagen horizontal (desktop) {editing && "(opcional, deja vacío para mantener la actual)"}</label>
                <label className="flex items-center gap-2 border border-dashed border-gray-300 rounded-lg px-3 py-3 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 transition">
                  <Upload size={16} />
                  Seleccionar archivo
                  <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" />
                </label>
                {preview && <img src={preview} alt="preview" className="mt-2 h-32 w-full object-contain bg-gray-100 rounded-lg border border-gray-200" />}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Imagen vertical (mobile, opcional) — evita que se corte el texto en celulares</label>
                <label className="flex items-center gap-2 border border-dashed border-gray-300 rounded-lg px-3 py-3 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 transition">
                  <Upload size={16} />
                  Seleccionar archivo
                  <input ref={fileMobileRef} type="file" accept="image/*" onChange={onFileChangeMobile} className="hidden" />
                </label>
                {previewMobile && <img src={previewMobile} alt="preview mobile" className="mt-2 h-32 mx-auto w-auto object-contain bg-gray-100 rounded-lg border border-gray-200" />}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Título (opcional, solo referencial)</label>
                <input type="text" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Link al hacer clic (opcional)</label>
                <input type="url" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.activo} onChange={(e) => setForm({ ...form, activo: e.target.checked })} className="accent-cyan-600 w-4 h-4" />
                Mostrar en el slider
              </label>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition">Cancelar</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-1 px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-semibold hover:bg-cyan-700 transition disabled:opacity-60">
                <Check size={16} /> {saving ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {list.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-400 border border-gray-100">
              <Images size={32} className="mx-auto mb-2 text-gray-300" />
              No hay imágenes en el slider aún.
            </div>
          )}
          {list.map((s, i) => (
            <div key={s.id} className={`bg-white rounded-2xl shadow-sm border p-4 flex items-center gap-4 ${s.activo ? "border-cyan-200" : "border-gray-100 opacity-60"}`}>
              <img src={s.imagenUrl} alt={s.titulo || ""} className="w-28 h-16 object-cover rounded-lg border border-gray-200 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 truncate">{s.titulo || "(sin título)"}</h3>
                  {s.activo && <span className="bg-cyan-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0">VISIBLE</span>}
                </div>
                {s.link && <p className="text-blue-600 text-xs truncate">{s.link}</p>}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => move(i, -1)} disabled={i === 0} title="Subir" className="p-1.5 text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition disabled:opacity-30 disabled:pointer-events-none"><ArrowUp size={16} /></button>
                <button onClick={() => move(i, 1)} disabled={i === list.length - 1} title="Bajar" className="p-1.5 text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition disabled:opacity-30 disabled:pointer-events-none"><ArrowDown size={16} /></button>
                <button onClick={() => toggleActivo(s)} title={s.activo ? "Ocultar" : "Mostrar"} className={`p-1.5 rounded-lg transition ${s.activo ? "text-cyan-600 hover:bg-cyan-100" : "text-gray-400 hover:bg-gray-100"}`}>
                  {s.activo ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                </button>
                <button onClick={() => openEdit(s)} className="p-1.5 text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition"><Pencil size={16} /></button>
                <button onClick={() => handleDelete(s.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
