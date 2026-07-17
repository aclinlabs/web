"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

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

  const onOwnLinkPage = popup?.link?.startsWith("/") && pathname === popup.link;

  if (!visible || !popup || onOwnLinkPage) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative animate-in zoom-in-95 duration-300">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 z-10 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition text-[#1a7a3c]"
        >
          <X size={18} />
        </button>

        {popup.imagen && (
          <img src={popup.imagen} alt={popup.titulo} className="w-full h-48 object-cover" />
        )}

        <div className="p-6 text-center">
          <h2 className="text-xl font-bold text-[#1a7a3c] mb-3">{popup.titulo}</h2>
          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{popup.contenido}</p>

          {popup.link && (
            <div className="mt-4">
              <a
                href={popup.link}
                onClick={() => setVisible(false)}
                {...(!popup.link.startsWith("/") && { target: "_blank", rel: "noopener noreferrer" })}
                className="block bg-[#1a7a3c] text-white text-center py-2 rounded-lg font-semibold text-sm hover:bg-[#145c2d] transition"
              >
                Más información
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
