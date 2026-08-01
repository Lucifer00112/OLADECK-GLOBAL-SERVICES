import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Executive Operations Console — OLADECK Global Services",
  description: "Secure high-tech operations dashboard for vehicle quotes, customs statuses, and pricing."
};

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#070C18] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      <AdminDashboard />
    </div>
  );
}
