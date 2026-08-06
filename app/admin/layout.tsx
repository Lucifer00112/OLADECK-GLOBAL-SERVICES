import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    // If not authenticated, allow viewing the login page specifically
  }

  return (
    <div className="min-h-screen bg-[#070C18] text-slate-100 font-sans flex flex-col md:flex-row">
      <AdminSidebar authenticated={authenticated} />
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
