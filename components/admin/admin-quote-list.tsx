"use client";

import { useMemo, useState } from "react";
import { Filter, Save, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { clearingStatuses } from "@/lib/data";
import type { QuoteRecord } from "@/lib/types";
import { vehicleCatalog } from "@/lib/vehicle-catalog";
import { formatCurrency } from "@/lib/utils";

type AdminQuoteListProps = {
  quotes: QuoteRecord[];
  quotePrices: Record<string, number>;
  onUpdateStatus: (record: QuoteRecord, nextStatus: string) => void;
  onUpdatePrice: (record: QuoteRecord, value: string) => void;
  onSavePrice: (record: QuoteRecord) => void;
  isPending: boolean;
};

export function AdminQuoteList({
  quotes,
  quotePrices,
  onUpdateStatus,
  onUpdatePrice,
  onSavePrice,
  isPending
}: AdminQuoteListProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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

  function getStatusBadgeStyle(status: QuoteRecord["status"]) {
    switch (status) {
      case "Received by Customer":
        return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
      case "Pending":
        return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30";
      case "Received":
      default:
        return "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30";
    }
  }

  return (
    <Card className="shadow-glow">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Manage Live Quotes</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Review requests, update clearing statuses, and set final quoted prices.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[200px] flex-1 sm:flex-initial">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tracking, name..."
                className="pl-9 h-9 text-sm"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="focus-ring h-9 rounded-lg border bg-background px-3 text-xs font-medium"
            >
              <option value="All">All Statuses</option>
              {clearingStatuses.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Desktop View: Table (hidden on small mobile screens < md) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="py-3">Tracking</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Status</th>
                <th>Quote Price</th>
                <th>ETA</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredQuotes.length ? (
                filteredQuotes.map((record) => {
                  const matchingCar = vehicleCatalog.find((car) =>
                    record.vehicle.includes(`${car.brand} ${car.model}`)
                  );
                  return (
                    <tr key={record.trackingNumber} className="hover:bg-muted/30">
                      <td className="py-4 font-mono font-bold text-foreground">
                        {record.trackingNumber}
                      </td>
                      <td>
                        <p className="font-semibold text-foreground">{record.customer}</p>
                        <p className="text-xs text-muted-foreground">{record.phone || record.email}</p>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          {record.image || matchingCar?.image ? (
                            <img
                              src={record.image ?? matchingCar?.image ?? ""}
                              alt={record.vehicle}
                              className="h-10 w-14 rounded-md object-cover"
                            />
                          ) : null}
                          <span className="font-medium text-foreground">{record.vehicle}</span>
                        </div>
                      </td>
                      <td>
                        <select
                          value={record.status}
                          onChange={(e) => onUpdateStatus(record, e.target.value)}
                          className={`focus-ring rounded-lg border px-2.5 py-1 text-xs font-semibold ${getStatusBadgeStyle(
                            record.status
                          )}`}
                        >
                          {clearingStatuses.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <Input
                          className="w-32 h-8 text-xs font-semibold"
                          inputMode="numeric"
                          value={quotePrices[record.trackingNumber] ?? 0}
                          onChange={(e) => onUpdatePrice(record, e.target.value)}
                          onBlur={() => onSavePrice(record)}
                          aria-label={`${record.trackingNumber} price`}
                        />
                      </td>
                      <td className="text-xs text-muted-foreground">{record.estimatedCompletion}</td>
                      <td className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onSavePrice(record)}
                          disabled={isPending}
                        >
                          <Save className="mr-1 h-3 w-3" /> Save
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">
                    No quotes found matching your search filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Stacked Responsive Cards (visible on mobile < md) */}
        <div className="grid gap-4 md:hidden">
          {filteredQuotes.length ? (
            filteredQuotes.map((record) => {
              const matchingCar = vehicleCatalog.find((car) =>
                record.vehicle.includes(`${car.brand} ${car.model}`)
              );
              return (
                <div key={record.trackingNumber} className="rounded-xl border bg-card p-4 shadow-xs grid gap-3">
                  <div className="flex items-center justify-between gap-2 border-b pb-2">
                    <span className="font-mono text-xs font-bold text-foreground">
                      {record.trackingNumber}
                    </span>
                    <Badge variant="outline" className={`text-xs ${getStatusBadgeStyle(record.status)}`}>
                      {record.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    {record.image || matchingCar?.image ? (
                      <img
                        src={record.image ?? matchingCar?.image ?? ""}
                        alt={record.vehicle}
                        className="h-12 w-16 rounded-lg object-cover"
                      />
                    ) : null}
                    <div>
                      <p className="font-bold text-foreground text-sm">{record.vehicle}</p>
                      <p className="text-xs text-muted-foreground">{record.customer}</p>
                      <p className="text-xs text-muted-foreground">{record.phone || record.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t text-xs">
                    <div>
                      <span className="block text-muted-foreground text-[10px] uppercase font-semibold">Status</span>
                      <select
                        value={record.status}
                        onChange={(e) => onUpdateStatus(record, e.target.value)}
                        className="mt-1 w-full rounded-md border bg-background px-2 py-1 text-xs"
                      >
                        {clearingStatuses.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <span className="block text-muted-foreground text-[10px] uppercase font-semibold">Quote Price</span>
                      <div className="flex items-center gap-1 mt-1">
                        <Input
                          className="h-7 text-xs font-semibold"
                          inputMode="numeric"
                          value={quotePrices[record.trackingNumber] ?? 0}
                          onChange={(e) => onUpdatePrice(record, e.target.value)}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 shrink-0"
                          onClick={() => onSavePrice(record)}
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No quotes found matching your search filter.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
