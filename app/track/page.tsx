import type { Metadata } from "next";
import { TrackingDashboard } from "@/components/tracking/tracking-dashboard";

export const metadata: Metadata = {
  title: "Track Vehicle Clearing Progress",
  description: "Track an OLADECK Global Services vehicle clearing quote, timeline, documents, and payment status."
};

export default async function TrackPage({
  searchParams
}: {
  searchParams: Promise<{ tracking?: string }>;
}) {
  const params = await searchParams;
  return (
    <section className="bg-muted/55 py-16 md:py-24">
      <div className="container-pad">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Customer Portal</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">Track your clearing progress.</h1>
          <p className="mt-4 text-muted-foreground">
            View quote status, documents, invoices, payment history, notifications, and support messages.
          </p>
        </div>
        <TrackingDashboard initialTracking={params.tracking} />
      </div>
    </section>
  );
}
