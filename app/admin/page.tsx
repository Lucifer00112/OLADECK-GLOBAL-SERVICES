import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Secure operations dashboard for quotes, customers, CMS, media, analytics, and clearing statuses."
};

export default function AdminPage() {
  return (
    <section className="bg-muted/55 py-16 md:py-24">
      <div className="container-pad">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Secure Admin</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">Operations command center.</h1>
            <p className="mt-4 max-w-3xl text-muted-foreground">
              Authentication, roles, permissions, audit logging, and Supabase RLS policies are represented in the schema.
            </p>
          </div>
        </div>
        <AdminDashboard />
      </div>
    </section>
  );
}
