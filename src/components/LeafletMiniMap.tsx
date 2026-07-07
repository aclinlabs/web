"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Punto {
  id: string;
  lat: number;
  lng: number;
  activo: boolean;
}

function pinIcon(color: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40"><path d="M16 0C7.163 0 0 7.163 0 16c0 11.25 16 24 16 24s16-12.75 16-24C32 7.163 24.837 0 16 0z" fill="${color}"/><circle cx="16" cy="16" r="6" fill="white"/></svg>`;
  return L.icon({
    iconUrl: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
    iconSize: [24, 30],
    iconAnchor: [12, 30],
  });
}

function Recenter({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center[0], center[1], zoom, map]);
  return null;
}

export default function LeafletMiniMap({
  center,
  zoom,
  puntos,
  onSelect,
}: {
  center: { lat: number; lng: number };
  zoom: number;
  puntos: Punto[];
  onSelect: (id: string) => void;
}) {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      zoomControl={false}
      attributionControl={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
      <Recenter center={[center.lat, center.lng]} zoom={zoom} />
      {puntos.map((p) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={pinIcon(p.activo ? "#087849" : "#f59e0b")}
          eventHandlers={{ click: () => onSelect(p.id) }}
        />
      ))}
    </MapContainer>
  );
}
