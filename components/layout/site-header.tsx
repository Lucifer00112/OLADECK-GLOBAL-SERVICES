"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Mail, Menu, MessageCircle, Phone, User, X } from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

const services = [
  ["Customs Clearance", "/#services"],
  ["Duty Processing", "/#services"],
  ["Clearing & Forwarding", "/#services"],
  ["Fleet Clearance", "/#services"],
  ["Cargo Handling", "/#services"],
  ["Fast Track Assistance", "/#services"]
];

const industries = [
  ["Automobile Imports", "/#services"],
  ["Oil & Gas Equipment", "/#services"],
  ["Agricultural Machinery", "/#services"],
  ["Industrial Equipment", "/#services"],
  ["Government & Military", "/#services"],
  ["Corporate Fleets", "/#services"]
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-navy text-white">
        <div className="container-pad flex items-center justify-between py-1.5 text-xs">
          <span className="hidden sm:block text-white/70">OLADECK Global Services — Nigeria&apos;s Most Trusted Vehicle Clearing Company</span>
          <div className="flex items-center gap-4 ml-auto">
            <a href="tel:+2348172973820" className="flex items-center gap-1.5 text-white/85 hover:text-white transition">
              <Phone className="h-3 w-3" /> +234 817 297 3820
            </a>
            <a href="mailto:biona4real@gmail.com" className="flex items-center gap-1.5 text-white/85 hover:text-white transition">
              <Mail className="h-3 w-3" /> biona4real@gmail.com
            </a>
            <Link href="/login" className="flex items-center gap-1 text-gold font-semibold hover:underline border-l border-white/20 pl-4 ml-1">
              <User className="h-3 w-3" /> Sign In
            </Link>
            <Link href="/signup" className="flex items-center gap-1 text-white/90 font-semibold hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-pad flex h-16 items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-gold" stroke="hsl(43 85% 45%)" strokeWidth="1.8">
              <path d="M3 18l2-12h14l2 12H3z" />
              <path d="M7 18v2M17 18v2" />
              <circle cx="8" cy="18" r="1.5" fill="hsl(43 85% 45%)" stroke="none" />
              <circle cx="16" cy="18" r="1.5" fill="hsl(43 85% 45%)" stroke="none" />
              <path d="M2 10h20" strokeWidth="1.4" />
            </svg>
          </div>
          <div className="leading-tight">
            <p className="text-sm font-extrabold tracking-tight text-navy uppercase">OLADECK</p>
            <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Global Services</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <Link href="/#about" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-navy hover:bg-muted transition">
            About Us
          </Link>

          {/* Services dropdown */}
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-navy hover:bg-muted transition">
              Services <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-lifted border border-border py-1 z-50">
                {services.map(([label, href]) => (
                  <Link key={label} href={href} className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-navy transition">
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Industries dropdown */}
          <div className="relative" onMouseEnter={() => setIndustriesOpen(true)} onMouseLeave={() => setIndustriesOpen(false)}>
            <button className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-navy hover:bg-muted transition">
              Industries <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {industriesOpen && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-lifted border border-border py-1 z-50">
                {industries.map(([label, href]) => (
                  <Link key={label} href={href} className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-navy transition">
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/blog" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-navy hover:bg-muted transition">
            Blog
          </Link>
          <Link href="/track" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-navy hover:bg-muted transition">
            Track
          </Link>
          <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-navy hover:bg-muted transition">
            Contact
          </Link>
        </nav>

        {/* CTA row */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Link
            href="/login"
            className="rounded-full border border-navy/20 px-3.5 py-1.5 text-xs font-semibold text-navy hover:bg-muted transition"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-gold/15 border border-gold/30 px-3.5 py-1.5 text-xs font-bold text-navy hover:bg-gold/25 transition"
          >
            Sign Up
          </Link>
          <a
            href={whatsappUrl("Hello OLADECK Global Services, I would like to clear my vehicle.")}
            className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#1db854] transition shadow-sm"
          >
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
          </a>
          <Link
            href="/quote"
            className="rounded-full bg-navy px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-navy/90 transition shadow-sm"
          >
            Get a Quote
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-muted transition"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[105px] z-40 bg-white/95 backdrop-blur-xl overflow-y-auto lg:hidden">
          <div className="container-pad py-6 flex flex-col gap-2">
            <Link href="/#about" onClick={() => setMobileOpen(false)} className="py-3 px-4 rounded-lg text-base font-medium hover:bg-muted transition">About Us</Link>
            <p className="px-4 pt-2 pb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Services</p>
            {services.map(([label, href]) => (
              <Link key={label} href={href} onClick={() => setMobileOpen(false)} className="py-2.5 px-6 rounded-lg text-sm hover:bg-muted transition">{label}</Link>
            ))}
            <p className="px-4 pt-2 pb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Industries</p>
            {industries.map(([label, href]) => (
              <Link key={label} href={href} onClick={() => setMobileOpen(false)} className="py-2.5 px-6 rounded-lg text-sm hover:bg-muted transition">{label}</Link>
            ))}
            <Link href="/blog" onClick={() => setMobileOpen(false)} className="py-3 px-4 rounded-lg text-base font-medium hover:bg-muted transition">Blog</Link>
            <Link href="/track" onClick={() => setMobileOpen(false)} className="py-3 px-4 rounded-lg text-base font-medium hover:bg-muted transition">Track Shipment</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="py-3 px-4 rounded-lg text-base font-medium hover:bg-muted transition">Contact</Link>
            <div className="pt-4 grid gap-3 border-t">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="flex items-center justify-center rounded-full border border-navy/20 py-3 text-sm font-semibold text-navy">
                Customer Sign In
              </Link>
              <Link href="/signup" onClick={() => setMobileOpen(false)} className="flex items-center justify-center rounded-full bg-navy/10 py-3 text-sm font-semibold text-navy">
                Create Account
              </Link>
              <a
                href={whatsappUrl("Hello OLADECK Global Services, I would like to clear my vehicle.")}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <Link href="/quote" onClick={() => setMobileOpen(false)} className="flex items-center justify-center rounded-full bg-navy py-3 text-sm font-semibold text-white">
                Get a Clearing Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
