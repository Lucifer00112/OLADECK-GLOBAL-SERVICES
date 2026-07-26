import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — OLADECK Global Services",
  description: "Terms and conditions governing the use of OLADECK Global Services vehicle clearing, forwarding, and logistics services."
};

export default function TermsPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-pad">
        <div className="max-w-3xl mx-auto">
          <span className="accent-line" />
          <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Legal</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">Terms of Service</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: July 2026</p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
            <div>
              <h2 className="text-lg font-bold text-navy mb-3">1. Agreement to Terms</h2>
              <p>By engaging OLADECK Global Services (&quot;the Company&quot;, &quot;we&quot;, &quot;us&quot;) for vehicle clearing, customs brokerage, freight forwarding, or any related logistics service, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services or website.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy mb-3">2. Services Provided</h2>
              <p>OLADECK Global Services provides the following clearing and logistics services:</p>
              <ul className="mt-3 list-disc pl-6 space-y-1.5">
                <li>Vehicle customs clearance at all Nigerian ports (Apapa, Tin Can Island, PTML, Onne, and others)</li>
                <li>Customs duty calculation, assessment coordination, and duty payment processing</li>
                <li>Clearing and forwarding for FCL/LCL shipments</li>
                <li>Fleet clearance for corporate and bulk importers</li>
                <li>Cargo handling, terminal coordination, and container examination supervision</li>
                <li>Port-to-door vehicle delivery anywhere in Nigeria</li>
                <li>Document preparation, compliance review, and electronic entry filing</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy mb-3">3. Quotes and Pricing</h2>
              <ul className="mt-3 list-disc pl-6 space-y-1.5">
                <li>All price quotes provided through our website, WhatsApp, or other channels are <strong className="text-foreground">estimates</strong> based on information provided by the client and prevailing customs tariff rates at the time of quotation.</li>
                <li>Final customs duty is determined solely by the Nigeria Customs Service (NCS) based on their official assessment. OLADECK Global Services does not control or guarantee the final duty amount.</li>
                <li>Additional charges may apply for terminal storage (demurrage), shipping line fees, government agency charges, inspection fees, and other third-party costs not included in the initial quote.</li>
                <li>Quotes are valid for 14 calendar days from the date of issue unless otherwise stated.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy mb-3">4. Client Responsibilities</h2>
              <p>To enable timely clearance, clients must:</p>
              <ul className="mt-3 list-disc pl-6 space-y-1.5">
                <li>Provide accurate and complete vehicle information (make, model, year, VIN, engine capacity)</li>
                <li>Submit all required documents promptly — including bill of lading, purchase invoice, export title, and valid identification</li>
                <li>Ensure all payments (duty, clearing fees, logistics costs) are made on time as communicated</li>
                <li>Respond to document requests and verification queries within 48 hours</li>
                <li>Declare truthful information about the vehicle&apos;s condition, value, and specifications</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy mb-3">5. Timelines and Delivery</h2>
              <ul className="mt-3 list-disc pl-6 space-y-1.5">
                <li>Standard vehicle clearance takes approximately 5–6 working days after vessel discharge, subject to document accuracy, customs inspection queues, and port terminal operations.</li>
                <li>Timelines may be extended due to factors beyond our control, including customs holds, government agency delays, port congestion, public holidays, or incomplete client documentation.</li>
                <li>OLADECK Global Services does not guarantee specific release dates but commits to pursuing the fastest possible clearance within regulatory requirements.</li>
                <li>Port-to-door delivery times vary based on destination state and road conditions (typically 1–5 business days).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy mb-3">6. Payment Terms</h2>
              <ul className="mt-3 list-disc pl-6 space-y-1.5">
                <li>Service fees are payable in advance before clearance processing begins.</li>
                <li>Customs duty payments must be funded before duty assessment confirmation with NCS.</li>
                <li>All payments should be made via bank transfer to the official OLADECK Global Services account as communicated through verified channels.</li>
                <li>Receipts and payment confirmations are provided for all transactions.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy mb-3">7. Liability Limitations</h2>
              <ul className="mt-3 list-disc pl-6 space-y-1.5">
                <li>OLADECK Global Services acts as your customs broker and clearing agent. We do not own, operate, or control port terminals, shipping lines, or customs systems.</li>
                <li>We are not liable for delays, losses, or damages arising from government actions, port operational issues, force majeure events, or inaccurate information provided by the client.</li>
                <li>Our total liability for any claim shall not exceed the service fee paid for the specific clearing transaction in question.</li>
                <li>Vehicle insurance during transit is recommended and available through third-party providers upon request.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy mb-3">8. Prohibited Items</h2>
              <p>We do not clear vehicles or goods that are prohibited under Nigerian law, including:</p>
              <ul className="mt-3 list-disc pl-6 space-y-1.5">
                <li>Vehicles older than 15 years (subject to current import restrictions)</li>
                <li>Stolen or undocumented vehicles</li>
                <li>Vehicles with tampered VIN numbers or odometers</li>
                <li>Any goods prohibited under the Nigeria Customs Prohibition List</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy mb-3">9. Dispute Resolution</h2>
              <p>Any disputes arising from these terms shall first be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to mediation or arbitration in Lagos, Nigeria, in accordance with the Arbitration and Conciliation Act of Nigeria.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy mb-3">10. Contact</h2>
              <p>For questions about these terms, contact:</p>
              <div className="mt-3 rounded-lg border border-border bg-muted/40 p-4">
                <p className="font-bold text-navy">OLADECK Global Services</p>
                <p>Email: biona4real@gmail.com</p>
                <p>Phone/WhatsApp: +234 817 297 3820</p>
                <p>Location: Apapa, Lagos, Nigeria</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
