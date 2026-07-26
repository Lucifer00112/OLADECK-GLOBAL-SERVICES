"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Clock3, MessageSquare, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { clearingStatuses, quoteRecords } from "@/lib/data";
import type { QuoteRecord } from "@/lib/types";
import { whatsappUrl } from "@/lib/utils";

export function TrackingDashboard({ initialTracking }: { initialTracking?: string }) {
  const [tracking, setTracking] = useState(initialTracking ?? "");
  const [records, setRecords] = useState<QuoteRecord[]>(quoteRecords);
  const [searchedTracking, setSearchedTracking] = useState(initialTracking ?? "");

  useEffect(() => {
    const saved = localStorage.getItem("mg-enterprises-quotes");
    const userQuotes: QuoteRecord[] = saved ? JSON.parse(saved) : [];
    // Combine user saved quotes with built-in demo records (user quotes taking precedence)
    const combined = [...userQuotes];
    quoteRecords.forEach((demo) => {
      if (!combined.some((q) => q.trackingNumber.toLowerCase() === demo.trackingNumber.toLowerCase())) {
        combined.push(demo);
      }
    });
    setRecords(combined);
  }, []);

  const record = useMemo(
    () =>
      records.find(
        (item) => item.trackingNumber.toLowerCase() === searchedTracking.trim().toLowerCase()
      ),
    [records, searchedTracking]
  );
  const visibleStatus = record?.status === "Received by Customer" ? record.status : "Pending";
  const currentIndex = record ? clearingStatuses.indexOf(visibleStatus) : -1;
  const progress = record ? ((currentIndex + 1) / clearingStatuses.length) * 100 : 0;

  function markReceived() {
    if (!record) return;
    const updated = records.map((item) =>
      item.trackingNumber === record.trackingNumber
        ? { ...item, status: "Received by Customer" as const }
        : item
    );
    setRecords(updated);
    localStorage.setItem("mg-enterprises-quotes", JSON.stringify(updated));
  }

  function handleQuickTrack(num: string) {
    setTracking(num);
    setSearchedTracking(num);
  }

  return (
    <div className="grid gap-6">
      <Card className="shadow-lifted border-border">
        <CardContent className="flex flex-col gap-3 p-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              value={tracking}
              onChange={(event) => setTracking(event.target.value)}
              placeholder="Enter your CLR tracking number (e.g. CLR-2026-000001)"
              aria-label="Tracking number"
              className="text-base"
            />
            <Button type="button" onClick={() => setSearchedTracking(tracking)} className="bg-navy text-white hover:bg-navy/90 font-bold shrink-0">
              <Search className="mr-2 h-4 w-4" /> Track Progress
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground pt-1">
            <span className="font-semibold text-foreground">Quick Demo Codes:</span>
            <button
              type="button"
              onClick={() => handleQuickTrack("CLR-2026-000001")}
              className="rounded-full bg-navy/8 px-2.5 py-1 text-navy font-mono font-medium hover:bg-navy/15 transition"
            >
              CLR-2026-000001 (In Progress)
            </button>
            <button
              type="button"
              onClick={() => handleQuickTrack("CLR-2026-000002")}
              className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-emerald-700 font-mono font-medium hover:bg-emerald-500/25 transition"
            >
              CLR-2026-000002 (Delivered)
            </button>
          </div>
        </CardContent>
      </Card>

      {!record ? (
        <Card className="border-dashed">
          <CardContent className="grid gap-3 p-8 text-center">
            <Clock3 className="mx-auto h-8 w-8 text-gold" />
            <h2 className="text-xl font-semibold text-navy">No live request found yet</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Submit a quote on our <a href="/quote" className="text-navy font-bold hover:underline">Quote Page</a> to receive your tracking number, or click one of the demo buttons above to test tracking live!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <Card className="shadow-lifted border-border">
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-xl font-bold text-navy">{record.vehicle}</CardTitle>
                  <p className="mt-1 text-xs font-semibold text-muted-foreground">
                    Customer: {record.customer} | Tracking #: <span className="font-mono text-navy font-bold">{record.trackingNumber}</span>
                  </p>
                </div>
                <Badge
                  className={`text-xs font-semibold border ${
                    record.status === "Received by Customer"
                      ? "status-completed"
                      : record.status === "Pending"
                      ? "status-pending"
                      : "status-received"
                  }`}
                >
                  {visibleStatus}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">Clearing Progress</span>
                  <span className="text-navy font-bold">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2.5" />
              </div>
              <div className="mt-8 grid gap-4">
                {clearingStatuses.map((status, index) => (
                  <div key={status} className="grid grid-cols-[28px_1fr] gap-3">
                    <span
                      className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        index <= currentIndex
                          ? "bg-gold text-white"
                          : "border border-muted-foreground/30 text-muted-foreground"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div className="border-b pb-4">
                      <p className="font-bold text-navy text-sm">{status}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {status === "Received"
                          ? "OLADECK Global Services has received your request and logged your vehicle documents."
                          : status === "Pending"
                            ? "Vehicle undergoes customs inspection and port clearing at Nigeria arrival port (5-6 working days)."
                            : "Vehicle has been safely released and delivered to your designated address."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="border-border">
              <CardHeader><CardTitle className="text-base font-bold text-navy">Arrival Guidance</CardTitle></CardHeader>
              <CardContent className="grid gap-3 text-xs text-muted-foreground leading-relaxed">
                <p className="font-semibold text-foreground">{record.estimatedCompletion}</p>
                <p>
                  Keep your invoice, bill of lading, VIN/chassis details, and vehicle photos ready for instant verification on WhatsApp.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader><CardTitle className="text-base font-bold text-navy">WhatsApp Support Desk</CardTitle></CardHeader>
              <CardContent className="grid gap-3">
                <Button asChild className="bg-[#25D366] hover:bg-[#1db854] text-white font-bold">
                  <a
                    href={whatsappUrl(`Hello OLADECK Global Services, I want to discuss tracking ${record.trackingNumber} for ${record.vehicle}.`)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" /> Continue on WhatsApp
                  </a>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={markReceived}
                  disabled={record.status === "Received by Customer"}
                  className="font-semibold"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                  {record.status === "Received by Customer" ? "Car Delivery Confirmed" : "Confirm I Have Received My Car"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
