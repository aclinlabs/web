"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Mismo pin que el mapa publico (LeafletMiniMap), para que el admin vea
// exactamente lo que se va a mostrar en el sitio.
const pin = L.icon({
  iconUrl:
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40"><path d="M16 0C7.163 0 0 7.163 0 16c0 11.25 16 24 16 24s16-12.75 16-24C32 7.163 24.837 0 16 0z" fill="#145c2d"/><circle cx="16" cy="16" r="6" fill="white"/></svg>`,
    ),
  iconSize: [24, 30],
  iconAnchor: [12, 30],
});

function Recenter({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center[0], center[1], zoom, map]);
  return null;
}

function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function LeafletPicker({
  position,
  zoom = 14,
  onPick,
}: {
  position: { lat: number; lng: number };
  zoom?: number;
  onPick: (lat: number, lng: number) => void;
}) {
  return (
    <MapContainer
      className="mapa-aclin"
      center={[position.lat, position.lng]}
      zoom={zoom}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        maxZoom={19}
      />
      <Recenter center={[position.lat, position.lng]} zoom={zoom} />
      <ClickHandler onPick={onPick} />
      <Marker
        position={[position.lat, position.lng]}
        icon={pin}
        draggable
        eventHandlers={{
          dragend: (e) => {
            const { lat, lng } = (e.target as L.Marker).getLatLng();
            onPick(lat, lng);
          },
        }}
      />
    </MapContainer>
  );
}
