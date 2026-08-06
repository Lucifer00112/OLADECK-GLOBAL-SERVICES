import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { AdminQuotesManager } from "@/components/admin/admin-quotes-manager";

export const metadata: Metadata = {
  title: "Quotes & Tracking — OLADECK Admin",
  description: "Manage live vehicle clearing quotes, customer records, and port clearance statuses."
};

export default async function AdminQuotesPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-7xl mx-auto">
      <AdminQuotesManager />
    </div>
  );
}
