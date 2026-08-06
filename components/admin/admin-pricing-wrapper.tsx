"use client";

import { useState, useTransition } from "react";
import { AdminPricingManager } from "@/components/admin/admin-pricing-manager";
import { resetServicePricesAction, saveServicePricesAction } from "@/app/admin/actions";
import type { PriceItem } from "@/lib/types";

export function AdminPricingManagerWrapper({
  initialPriceList,
  supabaseConfigured
}: {
  initialPriceList: PriceItem[];
  supabaseConfigured: boolean;
}) {
  const [priceList, setPriceList] = useState<PriceItem[]>(initialPriceList);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function savePrices() {
    startTransition(async () => {
      const result = await saveServicePricesAction(priceList);
      setMessage(result.message);
    });
  }

  function resetPrices() {
    startTransition(async () => {
      const result = await resetServicePricesAction();
      setMessage(result.message);
    });
  }

  return (
    <div className="bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
      {message && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
          {message}
        </div>
      )}
      <AdminPricingManager
        priceList={priceList}
        onUpdateServicePrice={(id, val) => {
          const num = Number(val.replace(/[^\d]/g, ""));
          setPriceList((curr) => curr.map((p) => (p.id === id ? { ...p, basePrice: Number.isNaN(num) ? 0 : num } : p)));
        }}
        onSavePrices={savePrices}
        onResetPrices={resetPrices}
        isPending={isPending}
        supabaseConfigured={supabaseConfigured}
      />
    </div>
  );
}
