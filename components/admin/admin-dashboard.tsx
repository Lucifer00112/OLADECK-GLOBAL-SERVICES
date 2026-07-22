"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  FileDown,
  Filter,
  Save,
  Search,
  Settings2,
  Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  clearingStatuses,
  defaultPriceList,
  galleryItems
} from "@/lib/data";
import type { PriceItem, QuoteRecord } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { vehicleCatalog } from "@/lib/vehicle-catalog";

export function AdminDashboard() {
  const [query, setQuery] = useState("");
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [priceList, setPriceList] = useState<PriceItem[]>(() => {
    if (typeof window === "undefined") return defaultPriceList;
    const saved = window.localStorage.getItem("mg-enterprises-price-list");
    return saved ? JSON.parse(saved) : defaultPriceList;
  });
  const [quotePrices, setQuotePrices] = useState<Record<string, number>>(() =>
    ({})
  );

  useEffect(() => {
    const savedQuotes = localStorage.getItem("mg-enterprises-quotes");
    const liveQuotes: QuoteRecord[] = savedQuotes ? JSON.parse(savedQuotes) : [];
    setQuotes(liveQuotes);
    setQuotePrices(
      Object.fromEntries(
        liveQuotes.map((record) => [record.trackingNumber, record.quotedPrice ?? 0])
      )
    );
  }, []);

  const filtered = useMemo(
    () =>
      quotes.filter((record) =>
        [record.customer, record.vehicle, record.trackingNumber, record.status]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [query, quotes]
  );

  const priceListTotal = useMemo(
    () => priceList.reduce((sum, item) => sum + item.basePrice, 0),
    [priceList]
  );

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
    window.localStorage.setItem("mg-enterprises-price-list", JSON.stringify(priceList));
  }

  function resetPrices() {
    setPriceList(defaultPriceList);
    window.localStorage.removeItem("mg-enterprises-price-list");
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Revenue", "Set in pricing"],
          ["Quotes", String(quotes.length)],
          ["Completed Jobs", String(quotes.filter((quote) => quote.status === "Received by Customer").length)],
          ["Pending Jobs", String(quotes.filter((quote) => quote.status !== "Received by Customer").length)]
        ].map(([label, value]) => (
          <Card key={label}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="mt-2 text-2xl font-semibold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-glow">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-gold" /> Pricing Manager
              </CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                Set base prices for MG Enterprises services. Saved prices stay live in this browser and the Supabase schema is ready for database persistence.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={resetPrices}>Reset</Button>
              <Button onClick={savePrices}>
                <Save className="h-4 w-4" /> Save Prices
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="rounded-lg bg-navy p-4 text-white">
            <p className="text-sm text-white/65">Current base package total</p>
            <p className="mt-1 text-2xl font-semibold">{formatCurrency(priceListTotal)}</p>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {priceList.map((item) => (
              <div key={item.id} className="grid gap-3 rounded-lg border bg-background p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{item.service}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Badge>{item.unit}</Badge>
                </div>
                <label className="grid gap-2 text-sm font-medium">
                  Base price
                  <Input
                    inputMode="numeric"
                    value={item.basePrice}
                    onChange={(event) => updateServicePrice(item.id, event.target.value)}
                    aria-label={`${item.service} base price`}
                  />
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <Card className="shadow-glow">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-gold" /> Live Workflow
              </CardTitle>
              <Button variant="outline" size="sm">
                <FileDown className="h-4 w-4" /> Export PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            {[
              ["Submitted quotes", quotes.length],
              ["Pending cars", quotes.filter((quote) => quote.status !== "Received by Customer").length],
              ["Customer received", quotes.filter((quote) => quote.status === "Received by Customer").length]
            ].map(([label, value]) => (
              <div key={label}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
                <Progress value={quotes.length ? (Number(value) / quotes.length) * 100 : 0} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gold" /> Role System
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {["Admin: full access", "Manager: quotes, invoices, CMS", "Staff: assigned jobs and notes"].map((role) => (
              <div key={role} className="rounded-lg border p-3 text-sm">{role}</div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle>Manage Quotes</CardTitle>
            <div className="flex gap-2">
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search customers, VIN, quotes..."
              />
              <Button variant="outline" size="icon" aria-label="Filter">
                <Filter className="h-4 w-4" />
              </Button>
              <Button size="icon" aria-label="Search">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="border-b text-muted-foreground">
              <tr>
                <th className="py-3">Tracking</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Status</th>
                <th>Quote Price</th>
                <th>ETA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length ? filtered.map((record) => {
                const matchingCar = vehicleCatalog.find((car) => record.vehicle.includes(`${car.brand} ${car.model}`));
                return (
                <tr key={record.trackingNumber} className="border-b">
                  <td className="py-4 font-medium">{record.trackingNumber}</td>
                  <td>{record.customer}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      {record.image || matchingCar?.image ? (
                        <img
                          src={record.image ?? matchingCar?.image ?? ""}
                          alt={record.vehicle}
                          className="h-12 w-16 rounded-lg object-cover"
                        />
                      ) : null}
                      <span>{record.vehicle}</span>
                    </div>
                  </td>
                  <td>
                    <select
                      defaultValue={record.status}
                      className="focus-ring rounded-lg border bg-background px-2 py-1"
                      onChange={(event) => {
                        const nextStatus = event.target.value as QuoteRecord["status"];
                        const updated = quotes.map((quote) =>
                          quote.trackingNumber === record.trackingNumber
                            ? { ...quote, status: nextStatus }
                            : quote
                        );
                        setQuotes(updated);
                        localStorage.setItem("mg-enterprises-quotes", JSON.stringify(updated));
                      }}
                    >
                      {clearingStatuses.map((status) => <option key={status}>{status}</option>)}
                    </select>
                  </td>
                  <td>
                    <Input
                      className="w-32"
                      inputMode="numeric"
                      value={quotePrices[record.trackingNumber] ?? 0}
                      onChange={(event) =>
                        setQuotePrices((current) => {
                          const nextPrice = Number(event.target.value.replace(/[^\d]/g, ""));
                          const next = {
                            ...current,
                            [record.trackingNumber]: nextPrice
                          };
                          const updated = quotes.map((quote) =>
                            quote.trackingNumber === record.trackingNumber
                              ? { ...quote, quotedPrice: nextPrice }
                              : quote
                          );
                          setQuotes(updated);
                          localStorage.setItem("mg-enterprises-quotes", JSON.stringify(updated));
                          return next;
                        })
                      }
                      aria-label={`${record.trackingNumber} quote price`}
                    />
                  </td>
                  <td>{record.estimatedCompletion}</td>
                  <td>
                    <Button variant="outline" size="sm">View</Button>
                  </td>
                </tr>
                );
              }) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">
                    No real quote submissions yet. Submitted customer requests will appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {["Gallery Management", "Blog Management", "Website CMS"].map((title) => (
          <Card key={title}>
            <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {title === "Gallery Management"
                ? `${galleryItems.length} vehicles, categories, reorder, upload, delete`
                : "Draft, publish, schedule, SEO metadata, media library, audit trail"}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
