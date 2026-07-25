"use client";

import { useMemo } from "react";
import { BarChart3, CheckCircle2, Clock3, DollarSign, PackageCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { QuoteRecord } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export function AdminMetrics({ quotes }: { quotes: QuoteRecord[] }) {
  const totalRevenue = useMemo(
    () => quotes.reduce((sum, q) => sum + (q.quotedPrice ?? 0), 0),
    [quotes]
  );
  const completedCount = useMemo(
    () => quotes.filter((q) => q.status === "Received by Customer").length,
    [quotes]
  );
  const pendingCount = useMemo(
    () => quotes.filter((q) => q.status !== "Received by Customer").length,
    [quotes]
  );

  return (
    <div className="grid gap-6">
      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold uppercase">Total Value</span>
              <DollarSign className="h-4 w-4 text-gold" />
            </div>
            <p className="mt-2 text-xl font-bold md:text-2xl text-foreground">
              {formatCurrency(totalRevenue)}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold uppercase">Total Quotes</span>
              <PackageCheck className="h-4 w-4 text-sky-500" />
            </div>
            <p className="mt-2 text-xl font-bold md:text-2xl text-foreground">{quotes.length}</p>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold uppercase">Completed</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="mt-2 text-xl font-bold md:text-2xl text-foreground">{completedCount}</p>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold uppercase">Pending</span>
              <Clock3 className="h-4 w-4 text-amber-500" />
            </div>
            <p className="mt-2 text-xl font-bold md:text-2xl text-foreground">{pendingCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Progress Card */}
      <Card className="shadow-xs">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-bold">
            <BarChart3 className="h-4 w-4 text-gold" /> Live Workflow Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {[
            ["Total Submitted Quotes", quotes.length, "bg-sky-500"],
            ["Pending Customs Clearance", pendingCount, "bg-amber-500"],
            ["Received by Customer", completedCount, "bg-emerald-500"]
          ].map(([label, count, colorClass]) => (
            <div key={String(label)}>
              <div className="mb-1.5 flex justify-between text-xs font-medium">
                <span>{label}</span>
                <span className="font-bold">{count}</span>
              </div>
              <Progress
                value={quotes.length ? (Number(count) / quotes.length) * 100 : 0}
                className="h-2"
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
