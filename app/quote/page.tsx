import type { Metadata } from "next";
import { QuoteForm } from "@/components/forms/quote-form";

export const metadata: Metadata = {
  title: "Request a Vehicle Clearing Quote — OLADECK Global Services",
  description:
    "Submit vehicle, shipping, and document details for a Nigerian imported vehicle clearing quote from OLADECK Global Services."
};

export default function QuotePage() {
  return (
    <section className="section-muted py-16 md:py-24">
      <div className="container-pad">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="accent-line mx-auto" />
          <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Online Quote Request</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Share the details once. Track everything after.
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Fill in your vehicle and shipping details below. You will receive a tracking number immediately, and our team will continue the transaction on WhatsApp.
          </p>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
