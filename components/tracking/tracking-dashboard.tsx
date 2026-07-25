"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Clock3, MessageSquare, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { clearingStatuses } from "@/lib/data";
import type { QuoteRecord } from "@/lib/types";
import { whatsappUrl } from "@/lib/utils";

export function TrackingDashboard({ initialTracking }: { initialTracking?: string }) {
  const [tracking, setTracking] = useState(initialTracking ?? "");
  const [records, setRecords] = useState<QuoteRecord[]>([]);
  const [searchedTracking, setSearchedTracking] = useState(initialTracking ?? "");

  useEffect(() => {
    const saved = localStorage.getItem("mg-enterprises-quotes");
    setRecords(saved ? JSON.parse(saved) : []);
  }, []);

  const record = useMemo(
    () =>
      records.find(
        (item) => item.trackingNumber.toLowerCase() === searchedTracking.toLowerCase()
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

  return (
    <div className="grid gap-6">
      <Card className="shadow-glow">
        <CardContent className="flex flex-col gap-3 p-5 sm:flex-row">
          <Input
            value={tracking}
            onChange={(event) => setTracking(event.target.value)}
            placeholder="Enter your MG tracking number"
            aria-label="Tracking number"
          />
          <Button type="button" onClick={() => setSearchedTracking(tracking)}>
            <Search className="h-4 w-4" /> Track
          </Button>
        </CardContent>
      </Card>

      {!record ? (
        <Card>
          <CardContent className="grid gap-3 p-8 text-center">
            <Clock3 className="mx-auto h-8 w-8 text-gold" />
            <h2 className="text-xl font-semibold">No live request found yet</h2>
            <p className="text-sm text-muted-foreground">
              Submit a quote first, then use the generated tracking number here. MG Enterprises will continue transactions on WhatsApp.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <Card className="shadow-glow">
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle>{record.vehicle}</CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {record.customer} - {record.trackingNumber}
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
              <Progress value={progress} />
              <div className="mt-8 grid gap-4">
                {clearingStatuses.map((status, index) => (
                  <div key={status} className="grid grid-cols-[28px_1fr] gap-3">
                    <span
                      className={`mt-1 h-4 w-4 rounded-full border ${
                        index <= currentIndex ? "border-gold bg-gold" : "border-muted-foreground/30"
                      }`}
                    />
                    <div className="border-b pb-4">
                      <p className="font-medium">{status}</p>
                      <p className="text-sm text-muted-foreground">
                        {status === "Received"
                          ? "MG Enterprises has received your request."
                          : status === "Pending"
                            ? "Please wait. After the vehicle arrives in Nigeria, clearing normally takes 5-6 working days and can take more if there are port or customs delays."
                            : "Tap the confirmation button only when the car has reached you."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card>
              <CardHeader><CardTitle>Arrival Guidance</CardTitle></CardHeader>
              <CardContent className="grid gap-3 text-sm text-muted-foreground">
                <p>{record.estimatedCompletion}</p>
                <p>
                  Keep your invoice, bill of lading, VIN/chassis details, and vehicle photos ready in WhatsApp.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>WhatsApp Transaction Desk</CardTitle></CardHeader>
              <CardContent className="grid gap-3">
                <Button asChild>
                  <a
                    href={whatsappUrl(`Hello MG Enterprises, I want to discuss tracking ${record.trackingNumber} for ${record.vehicle}.`)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageSquare className="h-4 w-4" /> Continue on WhatsApp
                  </a>
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={markReceived}
                  disabled={record.status === "Received by Customer"}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {record.status === "Received by Customer" ? "Car Received" : "I have received my car"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
