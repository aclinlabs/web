"use client";
import { useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { MapPin, Mail, Search } from "lucide-react";

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

export default function SucursalesClient({ sucursales, apiKey }: { sucursales: Sucursal[]; apiKey: string }) {
  const { isLoaded } = useJsApiLoader({ id: "google-map-script", googleMapsApiKey: apiKey });
  const [selected, setSelected] = useState<Sucursal | null>(null);
  const [openCity, setOpenCity] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(10);
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

  function selectSucursal(s: Sucursal) {
    setSelected(s);
    setOpenCity(s.ciudad);
    setMapCenter({ lat: s.lat, lng: s.lng });
    setMapZoom(15);
    if (mapRef.current) {
      mapRef.current.panTo({ lat: s.lat, lng: s.lng });
      mapRef.current.setZoom(15);
    }
  }

  function toggleCity(ciudad: string) {
    if (openCity === ciudad) {
      setOpenCity(null);
      setSelected(null);
      setMapZoom(10);
      setMapCenter(defaultCenter);
    } else {
      const citySucursales = filtered.filter((s) => s.ciudad === ciudad);
      setOpenCity(ciudad);
      if (citySucursales.length === 1) {
        selectSucursal(citySucursales[0]);
      } else {
        setSelected(null);
        setMapCenter({ lat: citySucursales[0].lat, lng: citySucursales[0].lng });
        setMapZoom(13);
        if (mapRef.current) {
          mapRef.current.panTo({ lat: citySucursales[0].lat, lng: citySucursales[0].lng });
          mapRef.current.setZoom(13);
        }
      }
    }
  }

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Título */}
      <h1
        className="text-[#087849] mb-6"
        style={{ fontFamily: "var(--font-montserrat)", fontWeight: 700, fontSize: "36px", lineHeight: "44px" }}
      >
        Nuestras sucursales
      </h1>

      {/* Search */}
      <div className="mb-4 max-w-xs">
        <p className="text-xs text-gray-500 mb-1">ubicación de búsqueda</p>
        <div className="flex">
          <input
            type="text"
            placeholder="ingresa tu ubicación"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l text-sm focus:outline-none focus:ring-1 focus:ring-[#087849]"
          />
          <button className="bg-[#087849] text-white px-3 py-2 rounded-r hover:bg-[#065e39] transition">
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* Layout: sidebar + imagen grande + mapa pequeño */}
      <div className="flex gap-0 border border-gray-200 rounded overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 shrink-0 border-r border-gray-200 overflow-y-auto bg-white" style={{ minHeight: "320px" }}>
          <div className="bg-[#087849] text-white px-4 py-3 text-sm font-semibold">
            Número de sucursales: {filtered.length}
          </div>
          {ciudades.map((ciudad) => {
            const citySucursales = filtered.filter((s) => s.ciudad === ciudad);
            if (citySucursales.length === 0) return null;
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
                      <div className="mt-2">
                        <p className="text-xs font-bold text-[#087849] uppercase tracking-wide mb-1">Horario Clínico</p>
                        <p className="text-xs text-gray-700 leading-relaxed">{s.horarioClinica}</p>
                      </div>
                    )}
                    {s.horarioAdmin && (
                      <div className="mt-2">
                        <p className="text-xs font-bold text-[#087849] uppercase tracking-wide mb-1">Horario Administrativo</p>
                        <p className="text-xs text-gray-700 leading-relaxed">{s.horarioAdmin}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Imagen grande de la sucursal + mapa pequeño en esquina */}
        <div className="flex-1 relative overflow-hidden bg-gray-100">
          {/* Imagen grande */}
          {selected?.imagen ? (
            <img
              src={selected.imagen}
              alt={selected.nombre}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
              Selecciona una sucursal
            </div>
          )}

          {/* Mapa pequeño — esquina inferior derecha */}
          <div className="absolute bottom-3 right-3 w-52 h-36 rounded-lg overflow-hidden shadow-lg border-2 border-white">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={mapCenter}
                zoom={mapZoom}
                onLoad={onLoad}
                options={{
                  disableDefaultUI: true,
                  zoomControl: false,
                  styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }],
                }}
              >
                {filtered.map((s) => (
                  <MarkerF
                    key={s.id}
                    position={{ lat: s.lat, lng: s.lng }}
                    onClick={() => selectSucursal(s)}
                    icon={{
                      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
                        selected?.id === s.id
                          ? '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40"><path d="M16 0C7.163 0 0 7.163 0 16c0 11.25 16 24 16 24s16-12.75 16-24C32 7.163 24.837 0 16 0z" fill="#087849"/><circle cx="16" cy="16" r="6" fill="white"/></svg>'
                          : '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40"><path d="M16 0C7.163 0 0 7.163 0 16c0 11.25 16 24 16 24s16-12.75 16-24C32 7.163 24.837 0 16 0z" fill="#f59e0b"/><circle cx="16" cy="16" r="6" fill="white"/></svg>'
                      ),
                      scaledSize: new window.google.maps.Size(24, 30),
                    }}
                  />
                ))}
              </GoogleMap>
            ) : (
              <div className="h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">Mapa</div>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Sección Casa Matriz */}
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row rounded-xl overflow-hidden shadow-sm border border-gray-100">
        {/* Imagen */}
        <div className="md:w-1/2">
          <img src="/sucursales.jpg" alt="Casa Matriz Aclin" className="w-full h-full object-cover" style={{ minHeight: "320px" }} />
        </div>
        {/* Info */}
        <div className="md:w-1/2 bg-[#3a7a52] text-white px-10 py-10 flex flex-col justify-center">
          <h2 className="text-3xl font-black mb-6">Casa Matriz</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              </span>
              <a href="https://maps.google.com/?q=9+Norte+795,+Viña+del+Mar" target="_blank" rel="noopener noreferrer" className="hover:underline">9 Norte 795, Viña del Mar</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              </span>
              <a href="tel:323323600" className="hover:underline">32 33 23 600</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </span>
              <a href="mailto:consultas@aclin.cl" className="hover:underline">consultas@aclin.cl</a>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shrink-0 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </span>
              <div>
                <p className="font-bold">Horarios de atención call center</p>
                <p>Lunes a viernes: 8.30 a 21 hrs</p>
                <p>Sábado: 8.30 a 14.30 hrs.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}
