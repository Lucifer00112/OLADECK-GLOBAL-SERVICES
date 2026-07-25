"use client";

import { useMemo } from "react";
import { Save, Settings2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { PriceItem } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

type AdminPricingManagerProps = {
  priceList: PriceItem[];
  onUpdateServicePrice: (id: string, value: string) => void;
  onSavePrices: () => void;
  onResetPrices: () => void;
  isPending: boolean;
  supabaseConfigured: boolean;
};

export function AdminPricingManager({
  priceList,
  onUpdateServicePrice,
  onSavePrices,
  onResetPrices,
  isPending,
  supabaseConfigured
}: AdminPricingManagerProps) {
  const priceListTotal = useMemo(
    () => priceList.reduce((sum, item) => sum + item.basePrice, 0),
    [priceList]
  );

  return (
    <Card className="shadow-glow">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Settings2 className="h-5 w-5 text-gold" /> Service Package Pricing
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Configure base prices for vehicle clearing packages. Changes save to the Supabase `service_prices` table.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onResetPrices} disabled={isPending}>
              Reset
            </Button>
            <Button size="sm" onClick={onSavePrices} disabled={isPending || !supabaseConfigured}>
              <Save className="mr-1.5 h-4 w-4" /> Save Prices
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="rounded-lg bg-navy p-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Total Base Package Price
          </p>
          <p className="mt-1 text-2xl font-bold text-gold">{formatCurrency(priceListTotal)}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {priceList.map((item) => (
            <div key={item.id} className="grid gap-3 rounded-lg border bg-background p-4 shadow-xs">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-foreground text-sm">{item.service}</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
                <Badge variant="outline" className="text-[10px] shrink-0">
                  {item.unit}
                </Badge>
              </div>
              <label className="grid gap-1 text-xs font-semibold">
                Base Price (NGN)
                <Input
                  inputMode="numeric"
                  className="h-8 text-xs font-semibold"
                  value={item.basePrice}
                  onChange={(e) => onUpdateServicePrice(item.id, e.target.value)}
                  aria-label={`${item.service} base price`}
                />
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
