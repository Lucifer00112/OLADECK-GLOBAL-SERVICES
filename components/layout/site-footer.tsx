import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone, ShipWheel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  "Quick Links": [
    ["Home", "/"],
    ["Get a Quote", "/quote"],
    ["Track Quote", "/track"],
    ["Admin", "/admin"]
  ],
  Services: [
    ["Customs Clearance", "/#services"],
    ["Duty Processing", "/#services"],
    ["Fleet Clearance", "/#services"],
    ["Fast Track", "/#services"]
  ],
  Legal: [
    ["Privacy Policy", "/privacy"],
    ["Terms", "/terms"],
    ["Contact", "/contact"]
  ]
};

export function SiteFooter() {
  return (
    <footer className="border-t bg-navy text-white">
      <div className="container-pad grid gap-10 py-14 lg:grid-cols-[1.15fr_.85fr]">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-white/10">
              <ShipWheel className="h-5 w-5 text-gold" />
            </span>
            <div>
              <p className="font-semibold">MG Enterprises</p>
              <p className="text-sm text-white/65">Imported vehicle clearing, handled with precision.</p>
            </div>
          </div>
          <div className="grid gap-3 text-sm text-white/70 sm:grid-cols-3">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> Nigeria</span>
            <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> +234 817 297 3820</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> biona4real@gmail.com</span>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/8 p-5 shadow-glow">
          <p className="text-sm font-semibold">Port intelligence newsletter</p>
          <p className="mt-2 text-sm text-white/65">
            Monthly import tips, port alerts, and customs documentation reminders.
          </p>
          <form className="mt-4 flex gap-2">
            <Input
              type="email"
              placeholder="Email address"
              aria-label="Email address"
              className="border-white/15 bg-white/10 text-white placeholder:text-white/50"
            />
            <Button type="submit" variant="secondary" size="icon" aria-label="Subscribe">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      <div className="container-pad grid gap-8 border-t border-white/10 py-8 md:grid-cols-3">
        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group}>
            <p className="mb-3 text-sm font-semibold text-gold">{group}</p>
            <div className="grid gap-2">
              {links.map(([label, href]) => (
                <Link key={href} href={href} className="text-sm text-white/65 transition hover:text-white">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="container-pad border-t border-white/10 py-5 text-sm text-white/55">
        Copyright 2026 MG Enterprises. All rights reserved.
      </div>
    </footer>
  );
}
