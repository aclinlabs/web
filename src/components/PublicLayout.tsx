"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopupBanner from "@/components/PopupBanner";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main className="bg-white">{children}</main>
      <Footer />
      <PopupBanner />
      <FloatingWhatsApp />
    </>
  );
}
