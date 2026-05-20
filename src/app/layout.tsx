import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import PublicLayout from "@/components/PublicLayout";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Aclin – Laboratorio Clínico",
  description:
    "37 años brindando servicios de excelencia. Exámenes clínicos, resultados en línea y 20+ sucursales en la región.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} ${montserrat.variable} bg-white text-gray-900 antialiased`}>
        <PublicLayout>{children}</PublicLayout>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
