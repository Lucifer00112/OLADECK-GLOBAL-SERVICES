import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { whatsappUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact — OLADECK Global Services",
  description: "Contact OLADECK Global Services for vehicle clearing, forwarding, duty assistance, and port logistics."
};

export default function ContactPage() {
  const contactItems: [LucideIcon, string, string, string][] = [
    [MapPin, "Office Address", "Apapa, Lagos, Nigeria", "Our team operates at Nigeria's busiest port zone"],
    [Phone, "Phone", "+234 817 297 3820", "Available Mon–Sat, 8am–6pm WAT"],
    [Mail, "Email", "biona4real@gmail.com", "We respond within 24 hours"],
    [MessageCircle, "WhatsApp", "+234 817 297 3820", "Fastest way to reach us — instant replies"]
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container-pad grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <span className="accent-line" />
          <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Get in Touch</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Talk to an import clearing specialist.
          </h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Whether you have a vehicle arriving at port or just want to understand the clearing process, our team is ready to help. Reach us via WhatsApp for the fastest response.
          </p>

          <div className="mt-8 grid gap-3">
            {contactItems.map(([Icon, label, value, note]) => (
              <Card key={label} className="border-border shadow-sm hover:shadow-lifted transition">
                <CardContent className="flex items-center gap-4 p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-navy/8 text-navy shrink-0">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                    <p className="font-bold text-navy text-sm">{value}</p>
                    <p className="text-xs text-muted-foreground">{note}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <a
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white hover:bg-[#1db854] transition shadow-sm"
            href={whatsappUrl("Hello OLADECK Global Services, please call me about vehicle clearing.")}
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp Now
          </a>
        </div>

        <div className="grid gap-6">
          <ContactForm />
          <div className="rounded-xl overflow-hidden border border-border shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15854.59!2d3.3792!3d6.4474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sApapa%2C%20Lagos!5e0!3m2!1sen!2sng!4v1690000000000!5m2!1sen!2sng"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="OLADECK Global Services — Apapa, Lagos"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
