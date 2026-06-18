import type { Metadata } from "next";
import ContactoForm from "./ContactoForm";

export const metadata: Metadata = { title: "Contacto – Aclin Laboratorio Clínico" };

export default function ContactoPage() {
  return (
    <div className="bg-white">
      <ContactoForm />
    </div>
  );
}
