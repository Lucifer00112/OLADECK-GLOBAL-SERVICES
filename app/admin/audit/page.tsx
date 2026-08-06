import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { FileText, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Audit & Operations Logs — OLADECK Admin",
  description: "View system audit logs and administrator activities."
};

const mockAuditLogs = [
  {
    id: "log-1",
    time: "Today, 14:20",
    user: "System Administrator",
    action: "CONSOLE_LOGIN",
    details: "Admin session authenticated successfully from IP 105.112.42.10."
  },
  {
    id: "log-2",
    time: "Today, 13:45",
    user: "System Administrator",
    action: "AI_POST_PUBLISH",
    details: "Published cleared car showcase: 2023 Mercedes-Benz GLE 450 (Apapa Port)."
  },
  {
    id: "log-3",
    time: "Yesterday, 18:10",
    user: "System Administrator",
    action: "QUOTE_STATUS_UPDATE",
    details: "Updated quote CLR-8492 status to 'Received by Customer'."
  },
  {
    id: "log-4",
    time: "Yesterday, 11:30",
    user: "System Administrator",
    action: "PRICE_SET",
    details: "Set clearing quote price for Lexus RX 350 to ₦1,850,000."
  }
];

export default async function AdminAuditPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-7xl mx-auto">
      <div className="bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-amber-400" /> Admin Action &amp; Audit History
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Complete security and operational audit trail for OLADECK Global Services.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            {mockAuditLogs.length} Security Log Records
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {mockAuditLogs.map((log) => (
            <div key={log.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-mono text-amber-400 font-bold mr-3">[{log.time}]</span>
                <span className="font-extrabold text-white mr-2">{log.user}:</span>
                <span className="text-slate-300">{log.details}</span>
              </div>
              <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-lg bg-slate-950 text-slate-400 border border-slate-800 shrink-0">
                {log.action}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
