import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — OLADECK Global Services",
  description: "Learn how OLADECK Global Services collects, stores, and protects your personal information during the vehicle clearing process."
};

export default function PrivacyPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-pad">
        <div className="max-w-3xl mx-auto">
          <span className="accent-line" />
          <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Legal</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: July 2026</p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
            <div>
              <h2 className="text-lg font-bold text-navy mb-3">1. Information We Collect</h2>
              <p>When you submit a clearing quote request or register an account with OLADECK Global Services, we collect the following information:</p>
              <ul className="mt-3 list-disc pl-6 space-y-1.5">
                <li><strong className="text-foreground">Personal Information:</strong> Full name, email address, phone number (WhatsApp-enabled), and residential or business address.</li>
                <li><strong className="text-foreground">Vehicle Information:</strong> Vehicle make, model, year, VIN/chassis number, colour, engine capacity, and country of purchase.</li>
                <li><strong className="text-foreground">Shipping Information:</strong> Bill of lading number, arrival port, shipping line, container number, and estimated arrival date.</li>
                <li><strong className="text-foreground">Documents:</strong> Purchase invoice, export title, bill of lading, passport or national ID copies, and any other customs-required documentation.</li>
                <li><strong className="text-foreground">Payment Records:</strong> Duty payment receipts, service fee records, and bank transfer references.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy mb-3">2. How We Use Your Information</h2>
              <p>Your information is used exclusively for the following purposes:</p>
              <ul className="mt-3 list-disc pl-6 space-y-1.5">
                <li>Processing your vehicle clearing quote and customs declaration</li>
                <li>Filing electronic entries with the Nigeria Customs Service (NCS)</li>
                <li>Communicating clearing updates via WhatsApp, email, and SMS</li>
                <li>Coordinating with terminal operators, shipping lines, and government agencies</li>
                <li>Complying with Nigeria Customs regulations, NAFDAC, SON, and other statutory requirements</li>
                <li>Improving our services and customer support processes</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy mb-3">3. Information Sharing</h2>
              <p>We do not sell, rent, or trade your personal information. We share your data only with:</p>
              <ul className="mt-3 list-disc pl-6 space-y-1.5">
                <li>Nigeria Customs Service (NCS) — as required for customs declarations</li>
                <li>Terminal operators (APM Terminals, TICT, PTML) — for container examination and vehicle release</li>
                <li>Government agencies (NAFDAC, SON, NFPC) — for regulatory compliance</li>
                <li>Licensed logistics partners — for port-to-door vehicle delivery</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy mb-3">4. Data Security</h2>
              <p>We implement industry-standard security measures to protect your personal information, including encrypted data transmission (SSL/TLS), secure server infrastructure, access controls, and regular security audits. All sensitive documents are stored securely and accessible only to authorized clearing officers assigned to your case.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy mb-3">5. Data Retention</h2>
              <p>Your clearing records, vehicle details, and associated documents are retained for a minimum of 7 years as required by Nigerian customs and tax regulations. Account information is retained for as long as your account remains active. You may request deletion of your account data by contacting us.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy mb-3">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="mt-3 list-disc pl-6 space-y-1.5">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your data (subject to legal retention requirements)</li>
                <li>Opt out of marketing communications at any time</li>
                <li>Receive a copy of your data in a portable format</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy mb-3">7. Cookies & Analytics</h2>
              <p>Our website uses essential cookies for session management and basic analytics to understand how visitors use our site. We do not use third-party advertising trackers. You can manage cookie preferences through your browser settings.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy mb-3">8. Contact Us</h2>
              <p>For questions about this privacy policy or to exercise your data rights, contact us at:</p>
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
