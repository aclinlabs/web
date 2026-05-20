"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface PopupData {
  id: string;
  titulo: string;
  contenido: string;
  imagen?: string | null;
  link?: string | null;
}

export default function PopupBanner() {
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch("/api/popup")
      .then((r) => r.json())
      .then((data) => {
        if (data?.activo) {
          setPopup(data);
          setVisible(true);
        }
      })
      .catch(() => {});
  }, []);

  if (!visible || !popup) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative animate-in zoom-in-95 duration-300">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 z-10 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
        >
          <X size={18} />
        </button>

        {popup.imagen && (
          <img src={popup.imagen} alt={popup.titulo} className="w-full h-48 object-cover" />
        )}

        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{popup.titulo}</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{popup.contenido}</p>

          <div className="mt-4 flex gap-2">
            {popup.link && (
              <a
                href={popup.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#1a7a3c] text-white text-center py-2 rounded-lg font-semibold text-sm hover:bg-[#145c2d] transition"
              >
                Más información
              </a>
            )}
            <button
              onClick={() => setVisible(false)}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold text-sm hover:bg-gray-50 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
