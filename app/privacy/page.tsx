import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <section className="container-pad py-16">
      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl font-semibold tracking-normal">Privacy Policy</h1>
        <p className="leading-7 text-muted-foreground">
          OLADECK Global Services collects customer, vehicle, shipping, document, and payment records only for quote processing,
          customs support, communication, compliance, and service improvement.
        </p>
        <p className="leading-7 text-muted-foreground">
          Production deployments should configure Supabase RLS, secure storage buckets, audit logs, data retention rules,
          and provider-specific consent for email, SMS, and WhatsApp notifications.
        </p>
      </div>
    </section>
  );
}
