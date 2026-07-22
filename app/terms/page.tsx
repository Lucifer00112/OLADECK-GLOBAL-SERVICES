import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <section className="container-pad py-16">
      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl font-semibold tracking-normal">Terms</h1>
        <p className="leading-7 text-muted-foreground">
          Estimates are provided for planning purposes and do not replace official customs assessment, terminal charges,
          shipping line invoices, government levies, or third-party logistics costs.
        </p>
        <p className="leading-7 text-muted-foreground">
          Vehicle release timelines depend on document accuracy, vessel discharge, inspection queues, duty confirmation,
          terminal operations, and regulatory requirements.
        </p>
      </div>
    </section>
  );
}
