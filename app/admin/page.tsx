import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Operations Console",
  description: "Secure operations dashboard for quotes, customers, pricing, and clearing statuses."
};

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <section className="bg-muted/40 py-10 md:py-16">
      <div className="container-pad">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Secure Console</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-4xl">Operations Command Center</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Live quote tracking, status workflow, and package pricing connected to Supabase.
            </p>
          </div>
        </div>
        <AdminDashboard />
      </div>
    </section>
  );
}
