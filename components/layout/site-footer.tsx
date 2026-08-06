"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, MessageCircle, Phone, Ship } from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

const footerLinks = {
  "Quick Links": [
    ["Home", "/"],
    ["About Us", "/#about"],
    ["Port Works & Showcase", "/gallery"],
    ["Get a Quote", "/quote"],
    ["Track Shipment", "/track"],
    ["Customer Sign In", "/login"],
    ["Create Account", "/signup"]
  ],
  Services: [
    ["Customs Clearance", "/#services"],
    ["Duty Processing", "/#services"],
    ["Clearing & Forwarding", "/#services"],
    ["Fleet Clearance", "/#services"],
    ["Fast Track Assistance", "/#services"]
  ],
  Industries: [
    ["Automobile Imports", "/#services"],
    ["Oil & Gas Equipment", "/#services"],
    ["Agricultural Machinery", "/#services"],
    ["Industrial Equipment", "/#services"],
    ["Corporate Fleets", "/#services"]
  ],
  Legal: [
    ["Terms of Service", "/terms"],
    ["Privacy Policy", "/privacy"],
    ["Cookie Policy", "/cookies"],
    ["Duty Disclaimer", "/disclaimer"],
    ["Refund Policy", "/refund-policy"],
    ["Contact Us", "/contact"]
  ]
};

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className="bg-navy text-white">
      {/* CTA strip */}
      <div className="border-b border-white/10 bg-white/5">
        <div className="container-pad py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-extrabold text-white">Ready to Clear Your Vehicle?</h3>
            <p className="mt-1 text-sm text-white/65">Send us the vehicle details on WhatsApp and get a price quote in minutes.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={whatsappUrl("Hello OLADECK Global Services, I want to clear my vehicle and need a price quote.")}
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1db854] transition"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
            <Link href="/quote" className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition text-center">
              Online Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container-pad py-14">
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          {/* Brand col */}
          <div className="space-y-5 col-span-2 sm:col-span-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="OLADECK Global Services Logo"
                className="h-11 w-11 object-contain rounded-full shadow-sm"
              />
              <div>
                <p className="font-extrabold tracking-tight uppercase text-white">OLADECK</p>
                <p className="text-[10px] font-semibold tracking-widest text-white/55 uppercase">Global Services</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Nigeria's most trusted vehicle clearing and forwarding company. Licensed, experienced, and WhatsApp-first.
            </p>
            <div className="space-y-2 text-sm text-white/60">
              <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-gold shrink-0" /> Apapa, Lagos · Nigeria</p>
              <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-gold shrink-0" /> +234 817 297 3820</p>
              <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-gold shrink-0" /> biona4real@gmail.com</p>
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-4">{group}</p>
              <ul className="space-y-2.5">
                {links.map(([label, href]) => (
                  <li key={`${label}-${href}`}>
                    <Link href={href} className="text-sm text-white/60 hover:text-white transition">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <div className="container-pad flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© 2026 OLADECK Global Services Limited. All rights reserved.</p>
          <p>Licensed Customs Agent · Nigeria · CAC Registered</p>
        </div>
      </div>
    </footer>
  );
}
