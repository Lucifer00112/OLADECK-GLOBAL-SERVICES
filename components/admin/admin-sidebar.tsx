"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  Activity,
  Database,
  FileText,
  LayoutDashboard,
  LogOut,
  Package,
  RefreshCw,
  Settings,
  Shield,
  Sparkles
} from "lucide-react";
import { logoutAdminDashboard } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

export function AdminSidebar({ authenticated }: { authenticated: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // If on login page or unauthenticated, hide sidebar
  if (pathname === "/admin/login" || !authenticated) {
    return null;
  }

  const navItems = [
    { href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard },
    { href: "/admin/posts", label: "AI Content Studio & Works", icon: Sparkles, badge: "AI Writer" },
    { href: "/admin/quotes", label: "Quotes & Tracking", icon: Package },
    { href: "/admin/pricing", label: "Service Prices Schedule", icon: Settings },
    { href: "/admin/audit", label: "Audit & Operations Logs", icon: FileText }
  ];

  function handleLogout() {
    startTransition(async () => {
      await logoutAdminDashboard();
      router.push("/admin/login");
      router.refresh();
    });
  }

  return (
    <aside className="w-full md:w-64 bg-[#0B132B] border-b md:border-b-0 md:border-r border-slate-800 p-5 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 border-b border-slate-800/80 pb-5">
          <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold shrink-0 shadow-lg">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-white uppercase text-sm block">OLADECK</span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
              CONSOLE v2.0
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5 text-xs font-bold">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-md font-extrabold"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 ${isActive ? "text-slate-950" : "text-amber-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-slate-950 text-amber-400" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="pt-6 border-t border-slate-800/80 space-y-3 mt-6 md:mt-0">
        <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
          <Database className="h-4 w-4 text-emerald-400 shrink-0" />
          <div className="truncate">
            <p className="font-bold text-slate-200">System Connected</p>
            <p className="text-[10px] text-slate-500">Live Database Ready</p>
          </div>
        </div>

        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          disabled={isPending}
          className="w-full border-red-900/50 bg-red-950/30 text-red-300 hover:bg-red-900/50 hover:text-white text-xs h-9 justify-center"
        >
          <LogOut className="mr-1.5 h-3.5 w-3.5" /> Sign Out Admin
        </Button>
      </div>
    </aside>
  );
}
