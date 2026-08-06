"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  CheckCircle2,
  Download,
  Package,
  RefreshCw,
  Search,
  Ship,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { QuoteRecord } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import {
  loadAdminDashboardData,
  updateQuotePriceAction,
  updateQuoteStatusAction
} from "@/app/admin/actions";

export function AdminQuotesManager() {
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRecord | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [quotePrices, setQuotePrices] = useState<Record<string, number>>({});
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function refresh() {
    startTransition(async () => {
      const payload = await loadAdminDashboardData();
      setQuotes(payload.quotes);
      setQuotePrices(
        Object.fromEntries(
          payload.quotes.map((record) => [record.trackingNumber, record.quotedPrice ?? 0])
        )
      );
      setMessage(payload.message ?? "");
    });
  }

  useEffect(() => {
    refresh();
  }, []);

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
    startTransition(async () => {
      const result = await updateQuotePriceAction({
        trackingNumber: record.trackingNumber,
        quotedPrice: priceVal
      });
      setMessage(result.message);
    });
  }

  function exportCSV() {
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
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Package className="h-5 w-5 text-amber-400" /> Vehicle Clearing Quotes &amp; Port Statuses
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage customer clearance status, set custom duty quotes, and export records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={refresh}
            disabled={isPending}
            variant="outline"
            size="sm"
            className="border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800 text-xs"
          >
            <RefreshCw className="mr-1.5 h-3.5 w-3.5 text-amber-400" /> Sync Quotes
          </Button>

          <Button
            onClick={exportCSV}
            variant="outline"
            size="sm"
            className="border-emerald-500/40 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/50 text-xs"
          >
            <Download className="mr-1.5 h-3.5 w-3.5" /> Export CSV
          </Button>
        </div>
      </div>

      {message && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
          {message}
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-md">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by customer name, tracking #, vehicle, phone..."
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
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
            <tr>
              <th className="py-4 px-4">Tracking #</th>
              <th className="py-4 px-4">Customer</th>
              <th className="py-4 px-4">Vehicle Specs</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4">Quoted Price</th>
              <th className="py-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredQuotes.length ? (
              filteredQuotes.map((q) => (
                <tr key={q.trackingNumber} className="hover:bg-slate-800/40 transition">
                  <td className="py-4 px-4 font-mono font-bold text-amber-400">
                    {q.trackingNumber}
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-white">{q.customer}</p>
                    <p className="text-[11px] text-slate-400">{q.phone || q.email || "No contact"}</p>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-200">
                    {q.vehicle}
                  </td>
                  <td className="py-4 px-4">
                    <select
                      value={q.status}
                      onChange={(e) => updateQuoteStatus(q, e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-xs rounded-lg px-2.5 py-1 text-slate-200 focus:border-amber-500 font-semibold"
                    >
                      <option value="Received">Received</option>
                      <option value="Pending">Pending Clearance</option>
                      <option value="Received by Customer">Received by Customer</option>
                    </select>
                  </td>
                  <td className="py-4 px-4">
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
                        className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 text-[11px] font-bold hover:bg-amber-500/40 transition"
                      >
                        Save
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => setSelectedQuote(q)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 text-amber-300 hover:bg-amber-500 hover:text-slate-950 font-bold transition text-xs"
                    >
                      Inspect
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

      {/* Quote Detail Drawer Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0B132B] border border-slate-800 text-slate-100 w-full max-w-xl rounded-2xl p-6 shadow-2xl space-y-5">
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
