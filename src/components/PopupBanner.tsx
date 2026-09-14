"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { formatearWhatsapp } from "@/lib/formatoWhatsapp";

interface PopupData {
  id: string;
  titulo: string;
  contenido: string;
  imagen?: string | null;
  link?: string | null;
}

// Los links internos a veces se guardan sin la barra inicial (ej. "horarios-especiales"
// en vez de "/horarios-especiales"); esto los normaliza para href y comparaciones de ruta.
function normalizeLink(link: string) {
  if (/^https?:\/\//i.test(link)) return link;
  return link.startsWith("/") ? link : `/${link}`;
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

  const href = popup?.link ? normalizeLink(popup.link) : null;
  const isExternal = href ? /^https?:\/\//i.test(href) : false;
  const onOwnLinkPage = href !== null && !isExternal && pathname === href;

  if (!visible || !popup || onOwnLinkPage) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/*
        max-h-full acota la tarjeta al alto visible (el padre es fixed inset-0),
        sin depender de vh/dvh que en moviles no coinciden con lo que se ve.
        La tarjeta es una columna: imagen y boton fijos, el texto hace scroll.
      */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-full flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-300">
        <button
          onClick={() => setVisible(false)}
          aria-label="Cerrar aviso"
          className="absolute top-3 right-3 z-10 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition text-[#1a7a3c]"
        >
          <X size={18} />
        </button>

        {popup.imagen && (
          <img src={popup.imagen} alt={popup.titulo} className="w-full h-36 sm:h-48 object-cover shrink-0" />
        )}

        <div
          className={`flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 pt-6 text-center ${
            href ? "pb-4" : "pb-6"
          }`}
        >
          {popup.titulo?.trim() && (
            <h2 className="text-lg sm:text-xl font-bold text-[#1a7a3c] mb-3 pr-8">{popup.titulo}</h2>
          )}
          <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
            {formatearWhatsapp(popup.contenido)}
          </div>
        </div>

        {href && (
          <div className="shrink-0 px-6 pb-6">
            <a
              href={href}
              onClick={() => setVisible(false)}
              {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
              className="block bg-[#1a7a3c] text-white text-center py-2 rounded-lg font-semibold text-sm hover:bg-[#145c2d] transition"
            >
              Más información
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
