import type { Metadata } from "next";
import NosotrosContent from "./NosotrosContent";

export const metadata: Metadata = { title: "Nosotros – Aclin Laboratorio Clínico" };

export default function NosotrosPage() {
  return <NosotrosContent />;
}
