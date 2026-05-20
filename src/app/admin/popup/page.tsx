import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminPopupClient from "./AdminPopupClient";

export const dynamic = 'force-dynamic';

export default async function AdminPopupPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  const popups = await prisma.popup.findMany({ orderBy: { createdAt: "desc" } });
  return <AdminPopupClient popups={popups} />;
}
