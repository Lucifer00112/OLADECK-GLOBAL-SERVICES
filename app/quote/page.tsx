import type { Metadata } from "next";
import { QuoteForm } from "@/components/forms/quote-form";

export const metadata: Metadata = {
  title: "Request a Vehicle Clearing Quote",
  description:
    "Submit vehicle, shipping, and document details for a Nigerian imported vehicle clearing quote."
};

export default function QuotePage() {
  return (
    <section className="bg-muted/55 py-16 md:py-24">
      <div className="container-pad">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Advanced Quote Request</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
            Share the details once. Track everything after.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Search or type your car, add the model year and files, then send the prepared details to WhatsApp for the transaction.
          </p>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
