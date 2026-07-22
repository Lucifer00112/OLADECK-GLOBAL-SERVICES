"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";

export function DutyEstimator() {
  const [year, setYear] = useState("2021");
  const [engine, setEngine] = useState("2.5");
  const [port, setPort] = useState("Tin Can Island");

  const estimate = useMemo(() => {
    const age = Math.max(0, new Date().getFullYear() - Number(year || 2021));
    const engineFactor = Math.max(1, Number(engine || 2));
    const portFactor = port === "Onne" ? 1.08 : port === "Apapa" ? 1.03 : 1;
    const low = (1800000 + engineFactor * 460000 + age * 105000) * portFactor;
    return { low, high: low * 1.35 };
  }, [engine, port, year]);

  return (
    <Card className="shadow-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-gold" /> Duty & Import Cost Estimator
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="grid gap-2 text-sm font-medium">
            Vehicle Year
            <Input value={year} onChange={(event) => setYear(event.target.value)} inputMode="numeric" />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Engine Size
            <Input value={engine} onChange={(event) => setEngine(event.target.value)} placeholder="2.5" />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Arrival Port
            <select
              value={port}
              onChange={(event) => setPort(event.target.value)}
              className="focus-ring h-11 rounded-lg border bg-background px-3 text-sm"
            >
              <option>Tin Can Island</option>
              <option>Apapa</option>
              <option>PTML</option>
              <option>Onne</option>
            </select>
          </label>
        </div>
        <div className="rounded-lg bg-navy p-5 text-white">
          <p className="text-sm text-white/65">Planning range</p>
          <p className="mt-1 text-2xl font-semibold">
            {formatCurrency(estimate.low)} - {formatCurrency(estimate.high)}
          </p>
          <p className="mt-2 text-xs text-white/60">
            This is an estimate for planning only, not a final customs assessment or quote.
          </p>
        </div>
        <Button asChild variant="secondary">
          <a href="/quote">Convert estimate to quote</a>
        </Button>
      </CardContent>
    </Card>
  );
}
