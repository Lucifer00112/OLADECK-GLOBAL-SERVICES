"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Database,
  Download,
  FileText,
  Filter,
  Layers,
  LayoutDashboard,
  Lock,
  LogOut,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  Ship,
  Sparkles,
  User,
  Users,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { defaultPriceList } from "@/lib/data";
import type { PriceItem, QuoteRecord } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import {
  loadAdminDashboardData,
  logoutAdminDashboard,
  resetServicePricesAction,
  saveServicePricesAction,
  updateQuotePriceAction,
  updateQuoteStatusAction,
  type AdminDashboardPayload
} from "@/app/admin/actions";
import { AdminMetrics } from "@/components/admin/admin-metrics";
import { AdminPricingManager } from "@/components/admin/admin-pricing-manager";

const initialPayload: AdminDashboardPayload = {
  authenticated: true,
  passwordConfigured: true,
  supabaseConfigured: false,
  quotes: [],
  priceList: defaultPriceList
};

type Role = "admin" | "manager" | "staff";

export function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"quotes" | "metrics" | "pricing" | "audit">("quotes");
  const [currentRole, setCurrentRole] = useState<Role>("admin");
  const [selectedQuote, setSelectedQuote] = useState<QuoteRecord | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [message, setMessage] = useState("");
  const [dashboard, setDashboard] = useState(initialPayload);
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [priceList, setPriceList] = useState<PriceItem[]>(defaultPriceList);
  const [quotePrices, setQuotePrices] = useState<Record<string, number>>({});
  const [isPending, startTransition] = useTransition();

  // Audit Log Entries
  const [auditLogs, setAuditLogs] = useState<
    Array<{ id: string; time: string; user: string; action: string; details: string }>
  >([
    {
      id: "log-1",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      user: "System Administrator",
      action: "CONSOLE_LOGIN",
      details: "Admin session authenticated successfully."
    }
  ]);

  function logAction(action: string, details: string) {
    const entry = {
      id: `log-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      user: `${currentRole.toUpperCase()} User`,
      action,
      details
    };
    setAuditLogs((prev) => [entry, ...prev.slice(0, 49)]);
  }

  function refreshDashboard() {
    startTransition(async () => {
      const payload = await loadAdminDashboardData();
      setDashboard(payload);
      setQuotes(payload.quotes);
      setPriceList(payload.priceList.length ? payload.priceList : defaultPriceList);
      setQuotePrices(
        Object.fromEntries(
          payload.quotes.map((record) => [record.trackingNumber, record.quotedPrice ?? 0])
        )
      );
      setMessage(payload.message ?? "");
      logAction("DASHBOARD_REFRESH", "Refreshed live quotes and pricing from server.");
    });
  }

  useEffect(() => {
    refreshDashboard();
  }, []);

  function handleLogout() {
    logAction("CONSOLE_LOGOUT", "Admin signed out.");
    startTransition(async () => {
      await logoutAdminDashboard();
      router.push("/admin/login");
      router.refresh();
    });
  }

  function updateQuoteStatus(record: QuoteRecord, value: string) {
    const nextStatus = value as QuoteRecord["status"];
    const previous = quotes;
    const updated = quotes.map((quote) =>
      quote.trackingNumber === record.trackingNumber ? { ...quote, status: nextStatus } : quote
    );
    setQuotes(updated);
    if (selectedQuote?.trackingNumber === record.trackingNumber) {
      setSelectedQuote((prev) => (prev ? { ...prev, status: nextStatus } : null));
    }
    logAction(
      "STATUS_UPDATE",
      `Quote ${record.trackingNumber} status changed to '${nextStatus}'`
    );

    startTransition(async () => {
      const result = await updateQuoteStatusAction(record.trackingNumber, nextStatus);
      setMessage(result.message);
      if (!result.ok) setQuotes(previous);
    });
  }

  function updateQuotePrice(record: QuoteRecord, value: string) {
    const nextPrice = Number(value.replace(/[^\d]/g, ""));
    const cleanPrice = Number.isNaN(nextPrice) ? 0 : nextPrice;
    setQuotePrices((current) => ({ ...current, [record.trackingNumber]: cleanPrice }));
    setQuotes((current) =>
      current.map((quote) =>
        quote.trackingNumber === record.trackingNumber
          ? { ...quote, quotedPrice: cleanPrice }
          : quote
      )
    );
  }

  function saveQuotePrice(record: QuoteRecord) {
    const priceVal = quotePrices[record.trackingNumber] ?? 0;
    logAction("PRICE_SET", `Set quote ${record.trackingNumber} price to ₦${priceVal.toLocaleString()}`);
    startTransition(async () => {
      const result = await updateQuotePriceAction({
        trackingNumber: record.trackingNumber,
        quotedPrice: priceVal
      });
      setMessage(result.message);
    });
  }

  function savePrices() {
    logAction("PRICING_CATALOG_UPDATE", "Saved updated service pricing schedule.");
    startTransition(async () => {
      const result = await saveServicePricesAction(priceList);
      setMessage(result.message);
      if (result.ok) refreshDashboard();
    });
  }

  function resetPrices() {
    logAction("PRICING_RESET", "Reset service prices to default values.");
    startTransition(async () => {
      const result = await resetServicePricesAction();
      setMessage(result.message);
      if (result.ok) refreshDashboard();
    });
  }

  function exportCSV() {
    logAction("EXPORT_CSV", "Exported live quote records to CSV.");
    const headers = ["TrackingNumber", "Customer", "Email", "Phone", "Vehicle", "Status", "QuotedPrice"];
    const rows = filteredQuotes.map((q) => [
      q.trackingNumber,
      `"${q.customer}"`,
      `"${q.email || ""}"`,
      `"${q.phone || ""}"`,
      `"${q.vehicle}"`,
      `"${q.status}"`,
      q.quotedPrice || 0
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `OLADECK_Quotes_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const filteredQuotes = useMemo(() => {
    return quotes
      .filter((q) => statusFilter === "All" || q.status === statusFilter)
      .filter((q) =>
        [q.customer, q.vehicle, q.trackingNumber, q.status, q.email, q.phone]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      );
  }, [query, quotes, statusFilter]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Executive Top Navigation Header */}
      <header className="bg-[#0B132B] border-b border-slate-800 text-slate-100 sticky top-0 z-40">
        <div className="container-pad flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold shrink-0 shadow-lg">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-white uppercase text-sm sm:text-base">OLADECK</span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  OPS COMMAND
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-400">Licensed Customs Clearing &amp; Logistics Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={refreshDashboard}
              disabled={isPending}
              className="border-slate-700 bg-slate-900/50 text-slate-200 hover:bg-slate-800 hover:text-white text-xs h-9"
            >
              <RefreshCw className="mr-1.5 h-3.5 w-3.5 text-amber-400" /> Sync Data
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-red-900/50 bg-red-950/30 text-red-300 hover:bg-red-900/50 hover:text-white text-xs h-9"
            >
              <LogOut className="mr-1.5 h-3.5 w-3.5" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="container-pad py-8 flex-1 space-y-6">
        {/* Status Notification Banner */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200 flex items-center gap-2">
                {dashboard.supabaseConfigured ? "Live Database Connected" : "Local Engine Active"}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {message ||
                  (dashboard.supabaseConfigured
                    ? "All quote updates, customer records, and pricing models are synchronized live."
                    : "Operating in local database mode.")}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
            System Administrator Session
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab("quotes")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === "quotes"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
            }`}
          >
            <Ship className="h-4 w-4" /> Live Quotes ({quotes.length})
          </button>

          <button
            onClick={() => setActiveTab("metrics")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === "metrics"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
            }`}
          >
            <Activity className="h-4 w-4" /> KPI Analytics
          </button>

          {currentRole !== "staff" && (
            <button
              onClick={() => setActiveTab("pricing")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === "pricing"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
              }`}
            >
              <Settings className="h-4 w-4" /> Service Prices
            </button>
          )}

          <button
            onClick={() => setActiveTab("audit")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === "audit"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
            }`}
          >
            <FileText className="h-4 w-4" /> Audit Logs ({auditLogs.length})
          </button>

          <Button
            onClick={exportCSV}
            variant="outline"
            size="sm"
            className="ml-auto border-emerald-500/40 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/50 text-xs h-9"
          >
            <Download className="mr-1.5 h-3.5 w-3.5" /> Export CSV
          </Button>
        </div>

        {/* TAB 1: Live Quotes List */}
        {activeTab === "quotes" && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by customer name, tracking #, VIN, phone..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs font-bold text-amber-300 rounded-xl px-3 py-2 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Received">Received</option>
                  <option value="Pending">Pending Clearance</option>
                  <option value="Received by Customer">Received by Customer</option>
                </select>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Tracking #</th>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Vehicle Specs</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Quoted Price</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredQuotes.length ? (
                    filteredQuotes.map((q) => (
                      <tr key={q.trackingNumber} className="hover:bg-slate-800/40 transition">
                        <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                          {q.trackingNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-white">{q.customer}</p>
                          <p className="text-[11px] text-slate-400">{q.phone || q.email || "No contact"}</p>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-200">
                          {q.vehicle}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={q.status}
                            disabled={currentRole === "staff" && q.status === "Received by Customer"}
                            onChange={(e) => updateQuoteStatus(q, e.target.value)}
                            className="bg-slate-950 border border-slate-700 text-xs rounded-lg px-2.5 py-1 text-slate-200 focus:border-amber-500 font-semibold"
                          >
                            <option value="Received">Received</option>
                            <option value="Pending">Pending Clearance</option>
                            <option value="Received by Customer">Received by Customer</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-400">₦</span>
                            <input
                              type="text"
                              value={quotePrices[q.trackingNumber] ? quotePrices[q.trackingNumber].toLocaleString() : ""}
                              onChange={(e) => updateQuotePrice(q, e.target.value)}
                              placeholder="Set price..."
                              className="w-28 bg-slate-950 border border-slate-700 text-xs text-white rounded-md px-2 py-1 focus:border-amber-500 font-mono"
                            />
                            <button
                              onClick={() => saveQuotePrice(q)}
                              className="p-1 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/40 transition"
                              title="Save price"
                            >
                              Save
                            </button>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setSelectedQuote(q)}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 text-amber-300 hover:bg-amber-500 hover:text-slate-950 font-bold transition text-xs"
                          >
                            View Specs
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500 text-xs">
                        No quotes match your search filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Mode */}
            <div className="md:hidden space-y-3">
              {filteredQuotes.length ? (
                filteredQuotes.map((q) => (
                  <div key={q.trackingNumber} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-lg">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-mono font-extrabold text-amber-400 text-xs">{q.trackingNumber}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {q.status}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-white">{q.customer}</p>
                      <p className="text-xs text-slate-400">{q.vehicle}</p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <p className="text-[10px] text-slate-400">Quoted Price:</p>
                        <p className="font-mono font-bold text-amber-300 text-sm">
                          {quotePrices[q.trackingNumber] ? formatCurrency(quotePrices[q.trackingNumber]) : "Pending"}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedQuote(q)}
                        className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                      >
                        Inspect Quote
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-slate-900 p-8 rounded-2xl text-center text-slate-500 text-xs">
                  No matching quotes found.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: KPI Metrics */}
        {activeTab === "metrics" && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <AdminMetrics quotes={quotes} />
          </div>
        )}

        {/* TAB 3: Service Pricing Manager */}
        {activeTab === "pricing" && currentRole !== "staff" && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <AdminPricingManager
              priceList={priceList}
              onUpdateServicePrice={(id, val) => {
                const num = Number(val.replace(/[^\d]/g, ""));
                setPriceList((curr) => curr.map((p) => (p.id === id ? { ...p, basePrice: Number.isNaN(num) ? 0 : num } : p)));
              }}
              onSavePrices={savePrices}
              onResetPrices={resetPrices}
              isPending={isPending}
              supabaseConfigured={dashboard.supabaseConfigured}
            />
          </div>
        )}

        {/* TAB 4: Audit Logs */}
        {activeTab === "audit" && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="h-4 w-4 text-amber-400" /> Admin Action & Audit History
              </h3>
              <span className="text-xs text-slate-400 font-mono">{auditLogs.length} Records</span>
            </div>

            <div className="divide-y divide-slate-800/80 max-h-[400px] overflow-y-auto">
              {auditLogs.map((log) => (
                <div key={log.id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs">
                  <div>
                    <span className="font-mono text-amber-400 font-bold mr-2">[{log.time}]</span>
                    <span className="font-bold text-slate-200 mr-2">{log.user}:</span>
                    <span className="text-slate-400">{log.details}</span>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                    {log.action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Quote Detail Drawer Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0B132B] border border-slate-800 text-slate-100 w-full max-w-xl rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Inspection Drawer</p>
                <h3 className="text-lg font-extrabold text-white">{selectedQuote.vehicle}</h3>
                <p className="text-xs font-mono text-slate-400">Tracking: {selectedQuote.trackingNumber}</p>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <p className="text-slate-500 font-bold uppercase text-[10px]">Customer Name</p>
                <p className="font-bold text-white text-sm mt-0.5">{selectedQuote.customer}</p>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <p className="text-slate-500 font-bold uppercase text-[10px]">Clearing Status</p>
                <p className="font-bold text-amber-400 text-sm mt-0.5">{selectedQuote.status}</p>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <p className="text-slate-500 font-bold uppercase text-[10px]">Contact Info</p>
                <p className="font-medium text-slate-300 mt-0.5">{selectedQuote.phone || selectedQuote.email || "N/A"}</p>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <p className="text-slate-500 font-bold uppercase text-[10px]">Quoted Amount</p>
                <p className="font-mono font-bold text-emerald-400 text-sm mt-0.5">
                  {quotePrices[selectedQuote.trackingNumber]
                    ? formatCurrency(quotePrices[selectedQuote.trackingNumber])
                    : "Not Quoted Yet"}
                </p>
              </div>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <p className="font-bold text-slate-300">Document Verification Checklist</p>
              <div className="grid grid-cols-2 gap-2 text-slate-400">
                <p className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Bill of Lading</p>
                <p className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> VIN Verification</p>
                <p className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Export Title</p>
                <p className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Customs Entry</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-800 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedQuote(null)}
                className="border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
