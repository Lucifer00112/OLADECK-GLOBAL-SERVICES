import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { loadAdminDashboardData } from "@/app/admin/actions";
import { AdminMetrics } from "@/components/admin/admin-metrics";
import { Sparkles, Package, Settings, FileText, ArrowRight, ShieldCheck, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Console Overview — OLADECK Admin",
  description: "Executive operations command overview for vehicle clearing and port activities."
};

export default async function AdminDashboardOverviewPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  const payload = await loadAdminDashboardData();

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
            <ShieldCheck className="h-3.5 w-3.5" /> Executive Command Center
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Welcome to Operations Console
          </h1>
          <p className="text-xs text-slate-400">
            Monitor live vehicle clearing requests, publish cleared car showcases with AI, and manage pricing schedules.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 transition shadow-lg"
          >
            <Sparkles className="h-4 w-4" /> Open AI Content Studio
          </Link>
        </div>
      </div>

      {/* KPI Metrics Component */}
      <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <h2 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">
          Live Operational Analytics
        </h2>
        <AdminMetrics quotes={payload.quotes} />
      </div>

      {/* Quick Navigation Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/admin/posts"
          className="group bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-amber-500/50 transition shadow-lg flex flex-col justify-between space-y-4"
        >
          <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base group-hover:text-amber-400 transition">AI Content Studio</h3>
            <p className="text-xs text-slate-400 mt-1">Upload cleared cars &amp; auto-generate Truth Social captions &amp; docs.</p>
          </div>
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1 pt-2 border-t border-slate-800">
            Access Studio <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
          href="/admin/quotes"
          className="group bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-amber-500/50 transition shadow-lg flex flex-col justify-between space-y-4"
        >
          <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base group-hover:text-blue-400 transition">Quotes &amp; Tracking</h3>
            <p className="text-xs text-slate-400 mt-1">Manage customer vehicle clearing status &amp; set custom prices.</p>
          </div>
          <span className="text-xs font-bold text-blue-400 flex items-center gap-1 pt-2 border-t border-slate-800">
            Manage Quotes <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
          href="/admin/pricing"
          className="group bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-amber-500/50 transition shadow-lg flex flex-col justify-between space-y-4"
        >
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base group-hover:text-emerald-400 transition">Pricing Catalog</h3>
            <p className="text-xs text-slate-400 mt-1">Update base service prices &amp; customs duty estimation formulas.</p>
          </div>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 pt-2 border-t border-slate-800">
            Edit Pricing <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
          href="/admin/audit"
          className="group bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-amber-500/50 transition shadow-lg flex flex-col justify-between space-y-4"
        >
          <div className="h-12 w-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base group-hover:text-purple-400 transition">Audit Logs</h3>
            <p className="text-xs text-slate-400 mt-1">View system activity, status changes, and administrator logins.</p>
          </div>
          <span className="text-xs font-bold text-purple-400 flex items-center gap-1 pt-2 border-t border-slate-800">
            View Logs <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}
