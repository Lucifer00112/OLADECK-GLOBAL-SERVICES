import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { whatsappUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact OLADECK Global Services for vehicle clearing, forwarding, duty assistance, and port logistics."
};

export default function ContactPage() {
  const contactItems: [LucideIcon, string, string][] = [
    [MapPin, "Office", "Nigeria - WhatsApp operations desk"],
    [Phone, "Phone", "+234 817 297 3820"],
    [Mail, "Email", "biona4real@gmail.com"],
    [MessageCircle, "WhatsApp", "Instant chat support"]
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container-pad grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Contact</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">Talk to an import clearing specialist.</h1>
          <div className="mt-8 grid gap-4">
            {contactItems.map(([Icon, label, value]) => (
              <Card key={label}>
                <CardContent className="flex items-center gap-4 p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold/15 text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <a
            className="mt-6 inline-flex rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground"
            href={whatsappUrl("Hello OLADECK Global Services, please call me about vehicle clearing.")}
          >
            Chat on WhatsApp
          </a>
        </div>
        <div className="grid gap-6">
          <ContactForm />
          <div className="grid min-h-72 place-items-center rounded-lg border bg-muted text-center">
            <div>
              <p className="font-semibold">Google Map</p>
              <p className="mt-2 text-sm text-muted-foreground">Embed your verified office location here.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
