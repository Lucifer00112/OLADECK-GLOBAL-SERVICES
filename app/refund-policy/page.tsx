import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy — OLADECK Global Services",
  description: "Official refund and service cancellation policy for vehicle clearing and freight forwarding deposits."
};

export default function RefundPolicyPage() {
  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container-pad max-w-4xl bg-white rounded-2xl p-8 sm:p-12 shadow-card border border-border space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gold mb-1">Customer Terms</p>
          <h1 className="text-3xl font-extrabold text-navy sm:text-4xl">Refund &amp; Cancellation Policy</h1>
          <p className="mt-2 text-xs text-muted-foreground">OLADECK Global Services Limited · Operational Guarantees</p>
        </div>

        <div className="space-y-4 text-sm text-foreground leading-relaxed divide-y divide-border/60">
          <div className="pt-4 space-y-2">
            <h2 className="text-base font-bold text-navy">1. Agency Clearing Fees</h2>
            <p className="text-muted-foreground">
              Client service deposits paid to OLADECK Global Services for clearing facilitation are 100% refundable if cancellation is requested prior to document submission to Nigeria Customs Service.
            </p>
          </div>

          <div className="pt-4 space-y-2">
            <h2 className="text-base font-bold text-navy">2. Statutory Customs Duties &amp; Government Payments</h2>
            <p className="text-muted-foreground">
              Payments made directly to the Federal Government of Nigeria (NCS duty assessments, Assessment Memos, SON, NAFDAC, or Port Authority fees) are non-refundable once remitted to official government bank accounts.
            </p>
          </div>

          <div className="pt-4 space-y-2">
            <h2 className="text-base font-bold text-navy">3. Processing Timelines</h2>
            <p className="text-muted-foreground">
              Approved refunds are remitted to the client&apos;s original bank account within 3 to 5 business days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
