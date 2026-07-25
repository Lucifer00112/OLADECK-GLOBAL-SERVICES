"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Database, LogOut, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { defaultPriceList } from "@/lib/data";
import type { PriceItem, QuoteRecord } from "@/lib/types";
import {
  loadAdminDashboardData,
  logoutAdminDashboard,
  resetServicePricesAction,
  saveServicePricesAction,
  updateQuotePriceAction,
  updateQuoteStatusAction,
  type AdminDashboardPayload
} from "@/app/admin/actions";
import { AdminQuoteList } from "@/components/admin/admin-quote-list";
import { AdminMetrics } from "@/components/admin/admin-metrics";
import { AdminPricingManager } from "@/components/admin/admin-pricing-manager";

const initialPayload: AdminDashboardPayload = {
  authenticated: true,
  passwordConfigured: true,
  supabaseConfigured: false,
  quotes: [],
  priceList: defaultPriceList
};

export function AdminDashboard() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [dashboard, setDashboard] = useState(initialPayload);
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [priceList, setPriceList] = useState<PriceItem[]>(defaultPriceList);
  const [quotePrices, setQuotePrices] = useState<Record<string, number>>({});
  const [isPending, startTransition] = useTransition();

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
    });
  }

  useEffect(() => {
    refreshDashboard();
  }, []);

  function updateServicePrice(id: string, value: string) {
    const numericValue = Number(value.replace(/[^\d]/g, ""));
    setPriceList((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, basePrice: Number.isNaN(numericValue) ? 0 : numericValue }
          : item
      )
    );
  }

  function savePrices() {
    startTransition(async () => {
      const result = await saveServicePricesAction(priceList);
      setMessage(result.message);
      if (result.ok) refreshDashboard();
    });
  }

  function resetPrices() {
    startTransition(async () => {
      const result = await resetServicePricesAction();
      setMessage(result.message);
      if (result.ok) refreshDashboard();
    });
  }

  function handleLogout() {
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
    startTransition(async () => {
      const result = await updateQuotePriceAction({
        trackingNumber: record.trackingNumber,
        quotedPrice: quotePrices[record.trackingNumber] ?? 0
      });
      setMessage(result.message);
    });
  }

  return (
    <div className="grid gap-6">
      {/* Top Status Notification Banner */}
      <Card className="border-gold/30 bg-gold/5">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Database className="h-5 w-5 text-gold shrink-0" />
            <div>
              <p className="text-sm font-bold text-foreground">
                {dashboard.supabaseConfigured ? "Supabase Live Connected" : "Supabase Offline / Demo Mode"}
              </p>
              <p className="text-xs text-muted-foreground">
                {message ||
                  (dashboard.supabaseConfigured
                    ? "Live database sync active for quotes, statuses, and pricing."
                    : "Add Supabase keys in .env.local to record live customer quotes.")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={refreshDashboard} disabled={isPending}>
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-1.5 h-3.5 w-3.5" /> Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* TOP PRIORITY: Manage Quotes Component */}
      <AdminQuoteList
        quotes={quotes}
        quotePrices={quotePrices}
        onUpdateStatus={updateQuoteStatus}
        onUpdatePrice={updateQuotePrice}
        onSavePrice={saveQuotePrice}
        isPending={isPending}
      />

      {/* SECOND PRIORITY: KPI Metrics & Progress */}
      <AdminMetrics quotes={quotes} />

      {/* THIRD PRIORITY: Pricing Package Manager */}
      <AdminPricingManager
        priceList={priceList}
        onUpdateServicePrice={updateServicePrice}
        onSavePrices={savePrices}
        onResetPrices={resetPrices}
        isPending={isPending}
        supabaseConfigured={dashboard.supabaseConfigured}
      />
    </div>
  );
}
