import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = { title: "Admin – Aclin" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 antialiased">
      {children}
      <Toaster position="top-right" />
    </div>
  );
}
