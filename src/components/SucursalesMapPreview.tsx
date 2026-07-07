"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, Mail } from "lucide-react";
import Link from "next/link";

const LeafletMiniMap = dynamic(() => import("./LeafletMiniMap"), {
  ssr: false,
  loading: () => <div className="h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">Mapa</div>,
});

interface Sucursal {
  id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  telefono?: string | null;
  email?: string | null;
  lat: number;
  lng: number;
  imagen?: string | null;
  horarioClinica?: string | null;
  horarioAdmin?: string | null;
}

const defaultCenter = { lat: -33.12, lng: -71.3 };

export default function SucursalesMapPreview({ sucursales }: { sucursales: Sucursal[] }) {
  const [selected, setSelected] = useState<Sucursal | null>(null);
  const [openCity, setOpenCity] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(10);

  const ciudades = [...new Set(sucursales.map((s) => s.ciudad))].sort();

  function selectSucursal(s: Sucursal) {
    setSelected(s);
    setOpenCity(s.ciudad);
    setMapCenter({ lat: s.lat, lng: s.lng });
    setMapZoom(15);
  }

  function toggleCity(ciudad: string) {
    if (openCity === ciudad) {
      setOpenCity(null);
      setSelected(null);
      setMapZoom(10);
      setMapCenter(defaultCenter);
    } else {
      const citySucursales = sucursales.filter((s) => s.ciudad === ciudad);
      setOpenCity(ciudad);
      if (citySucursales.length === 1) {
        selectSucursal(citySucursales[0]);
      } else {
        setSelected(null);
        setMapCenter({ lat: citySucursales[0].lat, lng: citySucursales[0].lng });
        setMapZoom(13);
      }
    }
  }

  return (
    <div>
      {/* Layout: sidebar + imagen grande + mapa pequeño */}
      <div className="flex gap-0 border border-gray-200 rounded overflow-hidden" style={{ maxHeight: "500px" }}>
        {/* Sidebar */}
        <div className="w-80 shrink-0 border-r border-gray-200 overflow-y-auto bg-white">
          <div className="bg-[#087849] text-white px-4 py-3 text-sm font-semibold">
            Número de sucursales: {sucursales.length}
          </div>
          {ciudades.map((ciudad) => {
            const citySucursales = sucursales.filter((s) => s.ciudad === ciudad);
            const isOpen = openCity === ciudad;
            return (
              <div key={ciudad}>
                <button
                  onClick={() => toggleCity(ciudad)}
                  className={`w-full text-left px-4 py-3 text-sm border-b border-gray-100 transition ${
                    isOpen ? "bg-[#087849] text-white font-semibold" : "text-gray-700 hover:bg-green-50"
                  }`}
                >
                  {ciudad}
                </button>
                {isOpen && citySucursales.map((s) => (
                  <div
                    key={s.id}
                    className="px-4 py-4 bg-gray-50 border-b border-gray-100 cursor-pointer hover:bg-green-50 transition"
                    onClick={() => selectSucursal(s)}
                  >
                    <p className="font-bold text-sm text-gray-900 mb-2">{s.nombre}</p>
                    <p className="text-xs text-gray-500 flex items-start gap-1 mb-1">
                      <MapPin size={12} className="text-[#087849] shrink-0 mt-0.5" /> {s.direccion}
                    </p>
                    {s.email && (
                      <p className="text-xs text-gray-500 flex items-start gap-1 mb-2">
                        <Mail size={12} className="text-[#087849] shrink-0 mt-0.5" /> {s.email}
                      </p>
                    )}
                    {s.horarioClinica && (
                      <div className="mt-3 border-t border-gray-200 pt-2">
                        <p className="text-xs font-bold text-[#087849] mb-0.5">🧪 Horario de atención clínica</p>
                        <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">{s.horarioClinica}</p>
                      </div>
                    )}
                    {s.horarioAdmin && (
                      <div className="mt-2">
                        <p className="text-xs font-bold text-[#087849] mb-0.5">📋 Horario de atención administrativa</p>
                        <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">{s.horarioAdmin}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Imagen grande + mapa pequeño en esquina */}
        <div className="flex-1 relative overflow-hidden bg-white flex items-center justify-start">
          {selected?.imagen ? (
            <img
              src={selected.imagen}
              alt={selected.nombre}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
              Selecciona una sucursal
            </div>
          )}

          {/* Mapa — esquina inferior derecha */}
          <div className="absolute bottom-3 right-3 rounded-lg overflow-hidden shadow-lg border-2 border-white" style={{ width: 500, height: 250 }}>
            <LeafletMiniMap
              center={mapCenter}
              zoom={mapZoom}
              puntos={sucursales.map((s) => ({ id: s.id, lat: s.lat, lng: s.lng, activo: selected?.id === s.id }))}
              onSelect={(id) => {
                const s = sucursales.find((s) => s.id === id);
                if (s) selectSucursal(s);
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 text-right">
        <Link href="/sucursales" className="text-sm text-[#087849] font-semibold hover:underline">
          Ver todas las sucursales →
        </Link>
      </div>
    </div>
  );
}
