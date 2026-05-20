import type { Metadata } from "next";
import HeroCotizacionForm from "@/components/HeroCotizacionForm";

export const metadata: Metadata = { title: "Cotizaciones – Aclin Laboratorio Clínico" };

export default function CotizacionesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroCotizacionForm />
    </div>
  );
}
