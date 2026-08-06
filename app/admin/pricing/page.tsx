import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { loadAdminDashboardData } from "@/app/admin/actions";
import { AdminPricingManagerWrapper } from "@/components/admin/admin-pricing-wrapper";

export const metadata: Metadata = {
  title: "Service Prices — OLADECK Admin",
  description: "Manage customs clearance service prices and tariff rates."
};

export default async function AdminPricingPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  const payload = await loadAdminDashboardData();

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-7xl mx-auto">
      <AdminPricingManagerWrapper initialPriceList={payload.priceList} supabaseConfigured={payload.supabaseConfigured} />
    </div>
  );
}
