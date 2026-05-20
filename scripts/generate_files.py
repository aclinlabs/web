#!/usr/bin/env python3
"""Script to write all Next.js app files for Aclin website"""
import os

BASE = "/Users/jaimegomez/Desktop/Kimsa/webs/web aclin/aclin/src"

def write(path, content):
    full = os.path.join(BASE, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w") as f:
        f.write(content)
    print(f"✅ {path}")

# ─────────────────────────────────────────
# HOME PAGE
# ─────────────────────────────────────────
write("app/page.tsx", r"""import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MapPin, FlaskConical, Baby, ClipboardList, Truck, Monitor, CheckCircle, ArrowRight } from "lucide-react";
import SucursalesMapPreview from "@/components/SucursalesMapPreview";

async function getSucursales() {
  return prisma.sucursal.findMany({ where: { activa: true }, orderBy: { orden: "asc" } });
}

export default async function HomePage() {
  const sucursales = await getSucursales();
  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#1a7a3c] to-[#0d5c2a] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 py-32 flex flex-col items-start gap-6">
          <h1 className="text-5xl md:text-6xl font-black leading-tight">Su salud,<br />nuestra prioridad</h1>
          <p className="text-xl text-green-100 max-w-xl">Lo acompañamos con exámenes confiables, resultados claros y una atención de primera.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/examenes" className="bg-white text-[#1a7a3c] px-7 py-3 rounded-full font-bold hover:bg-green-50 transition">Ver Exámenes</Link>
            <a href="https://pacientes.aclin.cl/resultados/" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white px-7 py-3 rounded-full font-bold hover:bg-white/10 transition">Ver Resultados</a>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 pb-8 w-full">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl grid grid-cols-2 md:grid-cols-4 border border-white/20 overflow-hidden">
            {[
              { icon: Truck, label: "Atención a domicilio", href: "/contacto" },
              { icon: Monitor, label: "Carga tu examen online", href: "/examenes" },
              { icon: ClipboardList, label: "Lista de espera", href: "/sucursales" },
              { icon: CheckCircle, label: "Resultados en línea", href: "https://pacientes.aclin.cl/resultados/" },
            ].map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} className="flex flex-col items-center gap-2 py-5 px-3 hover:bg-white/10 transition text-center border-r border-white/20 last:border-r-0">
                <Icon size={24} />
                <span className="text-xs font-medium leading-tight">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#1a7a3c] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3">
            <div className="text-8xl font-black leading-none">37</div>
            <div className="text-2xl font-bold mt-1">años de experiencia</div>
            <p className="text-green-200 mt-3 text-sm leading-relaxed max-w-xs">Brindando un servicio de excelencia, con ética, profesionalismo e innovación tecnológica.</p>
            <Link href="/nosotros" className="inline-block mt-5 border-2 border-white text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-white/10 transition">Conócenos</Link>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: MapPin, title: "22 Sucursales", desc: "Presentes en toda la región para estar siempre cerca de usted." },
              { icon: Baby, title: "Enfermeras Pediátricas", desc: "Profesionales con experiencia en cuidado infantil." },
              { icon: FlaskConical, title: "+400 Exámenes", desc: "Amplio catálogo de exámenes para monitorear su salud." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/10 rounded-xl p-5 border border-white/20">
                <Icon size={28} className="mb-3" />
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-green-200 text-sm mt-1 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 PASOS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-10">Prepárese en 3 pasos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "1", title: "Revise las indicaciones", desc: "Verifique instrucciones previas, ayuno o preparación especial, según su examen." },
              { num: "2", title: "Traiga sus documentos", desc: "Atención por orden de llegada. Traiga su orden médica y carnet de identidad." },
              { num: "3", title: "Consulte dudas", desc: "Nuestro equipo está disponible para orientarle con cualquier duda que tenga." },
            ].map(({ num, title, desc }) => (
              <div key={num} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-[#1a7a3c] text-white text-2xl font-black flex items-center justify-center mx-auto mb-4">{num}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUCURSALES MAP */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-gray-900">Nuestras Sucursales</h2>
              <p className="text-gray-500 mt-1">{sucursales.length} sucursales en toda la región</p>
            </div>
            <Link href="/sucursales" className="hidden md:flex items-center gap-2 bg-[#1a7a3c] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#145c2d] transition">
              Ver todas <ArrowRight size={16} />
            </Link>
          </div>
          <SucursalesMapPreview sucursales={sucursales} />
          <div className="mt-6 text-center md:hidden">
            <Link href="/sucursales" className="inline-flex items-center gap-2 bg-[#1a7a3c] text-white px-6 py-2.5 rounded-full font-semibold text-sm">Ver todas <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
""")

# ─────────────────────────────────────────
# SUCURSALES MAP PREVIEW COMPONENT
# ─────────────────────────────────────────
write("components/SucursalesMapPreview.tsx", r""""use client";
import { useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { MapPin, Phone, Mail, Clock, X } from "lucide-react";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

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
}

const mapContainerStyle = { width: "100%", height: "450px" };
const defaultCenter = { lat: -33.02, lng: -71.55 };
const mapOptions = {
  styles: [
    { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
  ],
  disableDefaultUI: false,
  zoomControl: true,
};

export default function SucursalesMapPreview({ sucursales }: { sucursales: Sucursal[] }) {
  const { isLoaded } = useJsApiLoader({ id: "google-map-script", googleMapsApiKey: GOOGLE_MAPS_API_KEY });
  const [selected, setSelected] = useState<Sucursal | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => { mapRef.current = map; }, []);

  if (!isLoaded) return <div className="h-[450px] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500">Cargando mapa...</div>;

  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={11}
        onLoad={onLoad}
        options={mapOptions}
      >
        {sucursales.map((s) => (
          <MarkerF
            key={s.id}
            position={{ lat: s.lat, lng: s.lng }}
            onClick={() => setSelected(s)}
            icon={{
              url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40"><path d="M16 0C7.163 0 0 7.163 0 16c0 11.25 16 24 16 24s16-12.75 16-24C32 7.163 24.837 0 16 0z" fill="#1a7a3c"/><circle cx="16" cy="16" r="6" fill="white"/></svg>'),
              scaledSize: new window.google.maps.Size(28, 35),
            }}
          />
        ))}
        {selected && (
          <InfoWindowF
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div className="max-w-xs p-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-[#1a7a3c] text-sm">{selected.nombre}</h3>
              </div>
              <p className="text-gray-600 text-xs mt-1">{selected.direccion}, {selected.ciudad}</p>
              {selected.email && <p className="text-xs text-gray-500 mt-1">{selected.email}</p>}
              {selected.horarioClinica && (
                <p className="text-xs text-gray-500 mt-2 whitespace-pre-line">{selected.horarioClinica}</p>
              )}
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
}
""")

# ─────────────────────────────────────────
# SUCURSALES PAGE
# ─────────────────────────────────────────
write("app/sucursales/page.tsx", r"""import { prisma } from "@/lib/prisma";
import SucursalesClient from "./SucursalesClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sucursales – Aclin Laboratorio Clínico" };

export default async function SucursalesPage() {
  const sucursales = await prisma.sucursal.findMany({ where: { activa: true }, orderBy: { ciudad: "asc" } });
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1a7a3c] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-black">Nuestras Sucursales</h1>
          <p className="text-green-200 mt-2">Encuéntranos en toda la región. {sucursales.length} sucursales disponibles.</p>
        </div>
      </div>
      <SucursalesClient sucursales={sucursales} apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} />
    </div>
  );
}
""")

write("app/sucursales/SucursalesClient.tsx", r""""use client";
import { useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { MapPin, Phone, Mail, Clock, Search, X } from "lucide-react";

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
}

const mapContainerStyle = { width: "100%", height: "100%" };
const defaultCenter = { lat: -33.02, lng: -71.55 };

export default function SucursalesClient({ sucursales, apiKey }: { sucursales: Sucursal[]; apiKey: string }) {
  const { isLoaded } = useJsApiLoader({ id: "google-map-script", googleMapsApiKey: apiKey });
  const [selected, setSelected] = useState<Sucursal | null>(null);
  const [query, setQuery] = useState("");
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const mapRef = useRef<google.maps.Map | null>(null);
  const onLoad = useCallback((map: google.maps.Map) => { mapRef.current = map; }, []);

  const ciudades = [...new Set(sucursales.map((s) => s.ciudad))].sort();
  const filtered = sucursales.filter(
    (s) =>
      query === "" ||
      s.nombre.toLowerCase().includes(query.toLowerCase()) ||
      s.ciudad.toLowerCase().includes(query.toLowerCase()) ||
      s.direccion.toLowerCase().includes(query.toLowerCase())
  );

  function focusSucursal(s: Sucursal) {
    setSelected(s);
    setMapCenter({ lat: s.lat, lng: s.lng });
    if (mapRef.current) {
      mapRef.current.panTo({ lat: s.lat, lng: s.lng });
      mapRef.current.setZoom(15);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Ingresa tu ubicación o ciudad..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a7a3c] focus:border-transparent"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <X size={14} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#1a7a3c] text-white px-4 py-3 text-sm font-semibold">
            Número de sucursales: {filtered.length}
          </div>
          <div className="overflow-y-auto max-h-[500px]">
            {ciudades.map((ciudad) => {
              const citySucursales = filtered.filter((s) => s.ciudad === ciudad);
              if (citySucursales.length === 0) return null;
              return (
                <div key={ciudad}>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-[#e8f5ed] transition text-sm font-medium text-gray-800 border-b border-gray-100 flex items-center justify-between"
                    onClick={() => focusSucursal(citySucursales[0])}
                  >
                    {ciudad}
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{citySucursales.length}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Map + Card */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200 h-[450px]">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={11}
                onLoad={onLoad}
                options={{ styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }] }}
              >
                {filtered.map((s) => (
                  <MarkerF
                    key={s.id}
                    position={{ lat: s.lat, lng: s.lng }}
                    onClick={() => setSelected(s)}
                    icon={{
                      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40"><path d="M16 0C7.163 0 0 7.163 0 16c0 11.25 16 24 16 24s16-12.75 16-24C32 7.163 24.837 0 16 0z" fill="#1a7a3c"/><circle cx="16" cy="16" r="6" fill="white"/></svg>'),
                      scaledSize: new window.google.maps.Size(28, 35),
                    }}
                  />
                ))}
                {selected && (
                  <InfoWindowF position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
                    <div className="p-1 max-w-[200px]">
                      <h3 className="font-bold text-[#1a7a3c] text-sm">{selected.nombre}</h3>
                      <p className="text-xs text-gray-600 mt-1">{selected.direccion}</p>
                      {selected.email && <p className="text-xs text-blue-600 mt-1">{selected.email}</p>}
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block bg-[#1a7a3c] text-white text-xs px-3 py-1 rounded font-semibold"
                      >
                        Zoom
                      </a>
                    </div>
                  </InfoWindowF>
                )}
              </GoogleMap>
            ) : (
              <div className="h-full bg-gray-100 flex items-center justify-center text-gray-500">Cargando mapa...</div>
            )}
          </div>

          {/* Selected card */}
          {selected && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between">
                <h2 className="font-bold text-[#1a7a3c] text-lg">{selected.nombre}</h2>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 ml-2">
                  <X size={18} />
                </button>
              </div>
              <p className="text-gray-600 text-sm mt-1 flex items-center gap-1"><MapPin size={14} className="text-[#1a7a3c]" /> {selected.direccion}, {selected.ciudad}</p>
              {selected.telefono && <p className="text-gray-600 text-sm mt-1 flex items-center gap-1"><Phone size={14} className="text-[#1a7a3c]" /> {selected.telefono}</p>}
              {selected.email && <p className="text-gray-600 text-sm mt-1 flex items-center gap-1"><Mail size={14} className="text-[#1a7a3c]" /> {selected.email}</p>}
              {selected.horarioClinica && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">{selected.horarioClinica}</p>
                </div>
              )}
              {selected.horarioAdmin && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">{selected.horarioAdmin}</p>
                </div>
              )}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-[#1a7a3c] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#145c2d] transition"
              >
                <MapPin size={14} /> Cómo llegar
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
""")

# ─────────────────────────────────────────
# EXAMENES PAGE
# ─────────────────────────────────────────
write("app/examenes/page.tsx", r"""import { prisma } from "@/lib/prisma";
import ExamenesClient from "./ExamenesClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Exámenes – Aclin Laboratorio Clínico" };

export default async function ExamenesPage() {
  const examenes = await prisma.examen.findMany({ where: { activo: true }, orderBy: { nombre: "asc" } });
  const categorias = [...new Set(examenes.map((e) => e.categoria).filter(Boolean))].sort() as string[];
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1a7a3c] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-black">Catálogo de Exámenes</h1>
          <p className="text-green-200 mt-2">+400 exámenes disponibles. Busca el tuyo aquí.</p>
        </div>
      </div>
      <ExamenesClient examenes={examenes} categorias={categorias} />
    </div>
  );
}
""")

write("app/examenes/ExamenesClient.tsx", r""""use client";
import { useState, useMemo } from "react";
import { Search, FlaskConical, X, ChevronDown } from "lucide-react";

interface Examen {
  id: string;
  nombre: string;
  codigo?: string | null;
  categoria?: string | null;
  descripcion?: string | null;
  preparacion?: string | null;
  tiempo?: string | null;
  muestra?: string | null;
}

export default function ExamenesClient({ examenes, categorias }: { examenes: Examen[]; categorias: string[] }) {
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] = useState("Todos");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 20;

  const filtered = useMemo(() => {
    return examenes.filter((e) => {
      const matchQuery = query === "" || e.nombre.toLowerCase().includes(query.toLowerCase()) || (e.codigo && e.codigo.toLowerCase().includes(query.toLowerCase()));
      const matchCat = catFilter === "Todos" || e.categoria === catFilter;
      return matchQuery && matchCat;
    });
  }, [examenes, query, catFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleSearch(v: string) { setQuery(v); setPage(1); }
  function handleCat(v: string) { setCatFilter(v); setPage(1); }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar examen por nombre o código..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a7a3c]"
          />
          {query && (
            <button onClick={() => handleSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <X size={14} />
            </button>
          )}
        </div>
        <select
          value={catFilter}
          onChange={(e) => handleCat(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a7a3c] bg-white"
        >
          <option value="Todos">Todas las categorías</option>
          {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <p className="text-sm text-gray-500 mb-4">{filtered.length} exámenes encontrados</p>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-gray-600 font-semibold">Examen</th>
              <th className="text-left px-4 py-3 text-gray-600 font-semibold hidden md:table-cell">Código</th>
              <th className="text-left px-4 py-3 text-gray-600 font-semibold hidden lg:table-cell">Categoría</th>
              <th className="text-left px-4 py-3 text-gray-600 font-semibold hidden lg:table-cell">Muestra</th>
              <th className="w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                  <FlaskConical size={32} className="mx-auto mb-2 text-gray-300" />
                  No se encontraron exámenes con ese criterio.
                </td>
              </tr>
            ) : (
              paginated.map((e) => (
                <>
                  <tr
                    key={e.id}
                    className="hover:bg-gray-50 cursor-pointer transition"
                    onClick={() => setExpanded(expanded === e.id ? null : e.id)}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">{e.nombre}</td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{e.codigo || "–"}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {e.categoria && (
                        <span className="bg-green-100 text-[#1a7a3c] px-2 py-0.5 rounded-full text-xs font-medium">{e.categoria}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{e.muestra || "–"}</td>
                    <td className="px-4 py-3">
                      <ChevronDown size={14} className={`text-gray-400 transition-transform ${expanded === e.id ? "rotate-180" : ""}`} />
                    </td>
                  </tr>
                  {expanded === e.id && (
                    <tr key={`${e.id}-detail`} className="bg-green-50/50">
                      <td colSpan={5} className="px-6 py-4 text-sm text-gray-700">
                        {e.descripcion && <p className="mb-2"><span className="font-semibold">Descripción:</span> {e.descripcion}</p>}
                        {e.preparacion && <p className="mb-2"><span className="font-semibold">Preparación:</span> {e.preparacion}</p>}
                        {e.tiempo && <p><span className="font-semibold">Tiempo de entrega:</span> {e.tiempo}</p>}
                      </td>
                    </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1.5 rounded border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-50 transition">← Anterior</button>
          <span className="text-sm text-gray-500">Página {page} de {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1.5 rounded border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-50 transition">Siguiente →</button>
        </div>
      )}
    </div>
  );
}
""")

# ─────────────────────────────────────────
# NOSOTROS PAGE
# ─────────────────────────────────────────
write("app/nosotros/page.tsx", r"""import type { Metadata } from "next";
import { Award, Users, FlaskConical, Heart } from "lucide-react";

export const metadata: Metadata = { title: "Nosotros – Aclin Laboratorio Clínico" };

export default function NosotrosPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-[#1a7a3c] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-black mb-4">Sobre Aclin</h1>
          <p className="text-green-200 max-w-2xl mx-auto text-lg">37 años brindando servicios de laboratorio clínico con los más altos estándares de calidad y excelencia.</p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Nuestra Historia</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Aclin nació hace más de 37 años con la misión de ofrecer exámenes clínicos de alta calidad al alcance de todos los habitantes de la Región de Valparaíso. Con el paso de los años, hemos crecido hasta contar con más de 20 sucursales estratégicamente ubicadas para estar siempre cerca de usted.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Nuestro equipo de profesionales altamente calificados, junto con tecnología de punta y metodologías innovadoras, nos permite ofrecer resultados confiables y oportunos que contribuyen al diagnóstico y tratamiento de nuestros pacientes.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Estamos comprometidos con la mejora continua de nuestros procesos y servicios, garantizando la confidencialidad y seguridad de la información de cada uno de nuestros pacientes.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 text-center mb-10">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Excelencia", desc: "Comprometidos con los más altos estándares de calidad en cada examen." },
              { icon: Heart, title: "Ética", desc: "Actuamos con transparencia, honestidad e integridad en todo momento." },
              { icon: Users, title: "Profesionalismo", desc: "Equipo altamente capacitado y en constante formación." },
              { icon: FlaskConical, title: "Innovación", desc: "Tecnología de punta para resultados precisos y confiables." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#e8f5ed] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-[#1a7a3c]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1a7a3c] text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "37+", label: "Años de experiencia" },
            { num: "20+", label: "Sucursales" },
            { num: "+400", label: "Tipos de exámenes" },
            { num: "100%", label: "Compromiso contigo" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="text-4xl font-black">{num}</div>
              <div className="text-green-200 mt-1 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
""")

# ─────────────────────────────────────────
# CONTACTO PAGE
# ─────────────────────────────────────────
write("app/contacto/page.tsx", r"""import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = { title: "Contacto – Aclin Laboratorio Clínico" };

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1a7a3c] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-black">Contacto</h1>
          <p className="text-green-200 mt-2">Estamos para ayudarte. Comunícate con nosotros.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <MapPin size={20} className="text-[#1a7a3c] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Casa Matriz</p>
                <p className="text-gray-600 text-sm">9 Norte 795, Viña del Mar</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <Phone size={20} className="text-[#1a7a3c] flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Call Center</p>
                <a href="tel:323323600" className="text-gray-600 text-sm hover:text-[#1a7a3c]">32 33 23 600</a>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <Mail size={20} className="text-[#1a7a3c] flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Email</p>
                <a href="mailto:consultas@aclin.cl" className="text-gray-600 text-sm hover:text-[#1a7a3c]">consultas@aclin.cl</a>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <Clock size={20} className="text-[#1a7a3c] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Horario Call Center</p>
                <p className="text-gray-600 text-sm">Lunes a Viernes: 8:30 – 21:00 hrs.</p>
                <p className="text-gray-600 text-sm">Sábado: 8:30 – 14:30 hrs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a7a3c]" placeholder="Tu nombre" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a7a3c]" placeholder="tu@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono (opcional)</label>
              <input type="tel" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a7a3c]" placeholder="+56 9 1234 5678" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
              <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a7a3c] resize-none" placeholder="¿En qué podemos ayudarte?" />
            </div>
            <button type="submit" className="w-full bg-[#1a7a3c] text-white py-3 rounded-lg font-semibold hover:bg-[#145c2d] transition">
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
""")

# ─────────────────────────────────────────
# API ROUTES
# ─────────────────────────────────────────
write("app/api/popup/route.ts", r"""import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const popup = await prisma.popup.findFirst({ where: { activo: true }, orderBy: { updatedAt: "desc" } });
  return NextResponse.json(popup || { activo: false });
}
""")

write("app/api/sucursales/route.ts", r"""import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const sucursales = await prisma.sucursal.findMany({ where: { activa: true }, orderBy: { orden: "asc" } });
  return NextResponse.json(sucursales);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const data = await req.json();
  const sucursal = await prisma.sucursal.create({ data });
  return NextResponse.json(sucursal);
}
""")

write("app/api/sucursales/[id]/route.ts", r"""import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const data = await req.json();
  const sucursal = await prisma.sucursal.update({ where: { id: params.id }, data });
  return NextResponse.json(sucursal);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  await prisma.sucursal.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
""")

write("app/api/examenes/route.ts", r"""import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const examenes = await prisma.examen.findMany({ orderBy: { nombre: "asc" } });
  return NextResponse.json(examenes);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const data = await req.json();
  const examen = await prisma.examen.create({ data });
  return NextResponse.json(examen);
}
""")

write("app/api/examenes/[id]/route.ts", r"""import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const data = await req.json();
  const examen = await prisma.examen.update({ where: { id: params.id }, data });
  return NextResponse.json(examen);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  await prisma.examen.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
""")

write("app/api/popup/admin/route.ts", r"""import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const popups = await prisma.popup.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(popups);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const data = await req.json();
  const popup = await prisma.popup.create({ data });
  return NextResponse.json(popup);
}
""")

write("app/api/popup/admin/[id]/route.ts", r"""import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const data = await req.json();
  if (data.activo === true) {
    await prisma.popup.updateMany({ data: { activo: false } });
  }
  const popup = await prisma.popup.update({ where: { id: params.id }, data });
  return NextResponse.json(popup);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  await prisma.popup.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
""")

write("app/api/auth/[...nextauth]/route.ts", r"""import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
""")

# ─────────────────────────────────────────
# ADMIN LAYOUT
# ─────────────────────────────────────────
write("app/admin/layout.tsx", r"""import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = { title: "Admin – Aclin" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-100 antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
""")

write("app/admin/login/page.tsx", r""""use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      toast.error("Credenciales incorrectas");
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a7a3c] to-[#0d5c2a]">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-[#1a7a3c] font-black text-3xl tracking-tight">aclin</div>
          <div className="text-gray-400 text-xs tracking-widest uppercase mt-1">Panel de Administración</div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a7a3c]"
              placeholder="admin@aclin.cl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a7a3c]"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a7a3c] text-white py-3 rounded-lg font-semibold hover:bg-[#145c2d] transition disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
""")

# ─────────────────────────────────────────
# ADMIN DASHBOARD
# ─────────────────────────────────────────
write("app/admin/page.tsx", r"""import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { MapPin, FlaskConical, Bell, LogOut } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const [sucursalesCount, examenesCount, popupActive] = await Promise.all([
    prisma.sucursal.count(),
    prisma.examen.count(),
    prisma.popup.findFirst({ where: { activo: true } }),
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#1a7a3c] text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <span className="font-black text-xl">aclin</span>
          <span className="text-green-300 text-sm">/ Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-green-200">{session.user?.name}</span>
          <a href="/api/auth/signout" className="flex items-center gap-1 text-sm text-green-200 hover:text-white transition">
            <LogOut size={16} /> Salir
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-black text-gray-900 mb-2">Panel de Administración</h1>
        <p className="text-gray-500 mb-8">Bienvenido, {session.user?.name}</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <MapPin size={22} className="text-[#1a7a3c]" />
            </div>
            <div>
              <div className="text-3xl font-black text-gray-900">{sucursalesCount}</div>
              <div className="text-gray-500 text-sm">Sucursales</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FlaskConical size={22} className="text-blue-600" />
            </div>
            <div>
              <div className="text-3xl font-black text-gray-900">{examenesCount}</div>
              <div className="text-gray-500 text-sm">Exámenes</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${popupActive ? "bg-yellow-100" : "bg-gray-100"}`}>
              <Bell size={22} className={popupActive ? "text-yellow-600" : "text-gray-400"} />
            </div>
            <div>
              <div className={`text-lg font-bold ${popupActive ? "text-yellow-600" : "text-gray-400"}`}>
                {popupActive ? "Activo" : "Inactivo"}
              </div>
              <div className="text-gray-500 text-sm">Popup</div>
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { href: "/admin/sucursales", icon: MapPin, title: "Sucursales", desc: "Agregar, editar y gestionar sucursales. Configurar posición en el mapa.", color: "bg-[#1a7a3c]" },
            { href: "/admin/examenes", icon: FlaskConical, title: "Exámenes", desc: "Administrar catálogo de exámenes, categorías y preparaciones.", color: "bg-blue-600" },
            { href: "/admin/popup", icon: Bell, title: "Popup / Anuncios", desc: "Habilitar o deshabilitar el popup y editar su contenido.", color: "bg-yellow-500" },
          ].map(({ href, icon: Icon, title, desc, color }) => (
            <Link key={href} href={href} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group">
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon size={22} className="text-white" />
              </div>
              <h2 className="font-bold text-gray-900 text-lg mb-1">{title}</h2>
              <p className="text-gray-500 text-sm">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
""")

# ─────────────────────────────────────────
# ADMIN SUCURSALES
# ─────────────────────────────────────────
write("app/admin/sucursales/page.tsx", r"""import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminSucursalesClient from "./AdminSucursalesClient";

export default async function AdminSucursalesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  const sucursales = await prisma.sucursal.findMany({ orderBy: { orden: "asc" } });
  return <AdminSucursalesClient sucursales={sucursales} apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} />;
}
""")

write("app/admin/sucursales/AdminSucursalesClient.tsx", r""""use client";
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
  activa: boolean;
  orden: number;
}

const empty: Partial<Sucursal> = { nombre: "", direccion: "", ciudad: "", telefono: "", email: "", lat: -33.02, lng: -71.55, horarioClinica: "", horarioAdmin: "", activa: true, orden: 0 };

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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a7a3c]"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Latitud</label>
                <input type="number" step="0.00001" value={form.lat || ""} onChange={(e) => { const v = parseFloat(e.target.value); setForm({ ...form, lat: v }); setMapPos({ lat: v, lng: form.lng || -71.55 }); }} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a7a3c]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Longitud</label>
                <input type="number" step="0.00001" value={form.lng || ""} onChange={(e) => { const v = parseFloat(e.target.value); setForm({ ...form, lng: v }); setMapPos({ lat: form.lat || -33.02, lng: v }); }} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a7a3c]" />
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
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Horario Clínico</label>
                <textarea rows={4} value={form.horarioClinica || ""} onChange={(e) => setForm({ ...form, horarioClinica: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a7a3c] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Horario Administrativo</label>
                <textarea rows={4} value={form.horarioAdmin || ""} onChange={(e) => setForm({ ...form, horarioAdmin: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a7a3c] resize-none" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.activa !== false} onChange={(e) => setForm({ ...form, activa: e.target.checked })} className="accent-[#1a7a3c] w-4 h-4" />
                Sucursal activa
              </label>
              <div className="flex gap-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition">Cancelar</button>
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
""")

# ─────────────────────────────────────────
# ADMIN EXAMENES
# ─────────────────────────────────────────
write("app/admin/examenes/page.tsx", r"""import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminExamenesClient from "./AdminExamenesClient";

export default async function AdminExamenesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  const examenes = await prisma.examen.findMany({ orderBy: { nombre: "asc" } });
  return <AdminExamenesClient examenes={examenes} />;
}
""")

write("app/admin/examenes/AdminExamenesClient.tsx", r""""use client";
import { useState } from "react";
import { FlaskConical, Plus, Pencil, Trash2, X, Check, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface Examen {
  id: string;
  nombre: string;
  codigo?: string | null;
  categoria?: string | null;
  descripcion?: string | null;
  preparacion?: string | null;
  tiempo?: string | null;
  muestra?: string | null;
  activo: boolean;
}

const empty: Partial<Examen> = { nombre: "", codigo: "", categoria: "", descripcion: "", preparacion: "", tiempo: "", muestra: "", activo: true };

export default function AdminExamenesClient({ examenes: initial }: { examenes: Examen[] }) {
  const [list, setList] = useState<Examen[]>(initial);
  const [form, setForm] = useState<Partial<Examen>>(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = list.filter((e) => query === "" || e.nombre.toLowerCase().includes(query.toLowerCase()) || (e.codigo && e.codigo.toLowerCase().includes(query.toLowerCase())));

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

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white px-6 py-4 flex items-center gap-4 shadow-md">
        <Link href="/admin" className="hover:text-blue-200 transition"><ArrowLeft size={20} /></Link>
        <FlaskConical size={20} />
        <h1 className="font-bold text-lg">Gestión de Exámenes</h1>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Buscar..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
          </div>
          <button onClick={openNew} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
            <Plus size={16} /> Nuevo Examen
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">{editing ? "Editar Examen" : "Nuevo Examen"}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {[
                { key: "nombre", label: "Nombre del Examen" },
                { key: "codigo", label: "Código" },
                { key: "categoria", label: "Categoría" },
                { key: "muestra", label: "Tipo de muestra" },
                { key: "tiempo", label: "Tiempo de entrega" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <input type="text" value={(form as any)[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Descripción</label>
                <textarea rows={3} value={form.descripcion || ""} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Preparación</label>
                <textarea rows={3} value={form.preparacion || ""} onChange={(e) => setForm({ ...form, preparacion: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.activo !== false} onChange={(e) => setForm({ ...form, activo: e.target.checked })} className="accent-blue-600 w-4 h-4" />
                Examen activo
              </label>
              <div className="flex gap-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition">Cancelar</button>
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
                <th className="text-left px-4 py-3 text-gray-600 font-semibold">Estado</th>
                <th className="w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-900">{e.nombre}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{e.codigo || "–"}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {e.categoria && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">{e.categoria}</span>}
                  </td>
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
""")

# ─────────────────────────────────────────
# ADMIN POPUP
# ─────────────────────────────────────────
write("app/admin/popup/page.tsx", r"""import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminPopupClient from "./AdminPopupClient";

export default async function AdminPopupPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  const popups = await prisma.popup.findMany({ orderBy: { createdAt: "desc" } });
  return <AdminPopupClient popups={popups} />;
}
""")

write("app/admin/popup/AdminPopupClient.tsx", r""""use client";
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
                <input type="text" value={form.titulo || ""} onChange={(e) => setForm({ ...form, titulo: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Contenido</label>
                <textarea rows={4} value={form.contenido || ""} onChange={(e) => setForm({ ...form, contenido: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">URL Imagen (opcional)</label>
                <input type="url" value={form.imagen || ""} onChange={(e) => setForm({ ...form, imagen: e.target.value })} placeholder="https://..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Link (opcional)</label>
                <input type="url" value={form.link || ""} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.activo !== false} onChange={(e) => setForm({ ...form, activo: e.target.checked })} className="accent-yellow-500 w-4 h-4" />
                Activar inmediatamente
              </label>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition">Cancelar</button>
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
""")

print("\n🎉 All files written successfully!")
