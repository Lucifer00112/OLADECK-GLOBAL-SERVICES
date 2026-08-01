"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Mail, Menu, MessageCircle, Phone, User, X } from "lucide-react";
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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-navy text-white">
        <div className="container-pad flex flex-wrap items-center justify-between py-1.5 text-xs gap-2">
          <span className="hidden md:inline text-white/70 text-[11px] lg:text-xs">
            OLADECK Global Services — Nigeria&apos;s Most Trusted Vehicle Clearing Company
          </span>
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 text-[11px] sm:text-xs">
            <a href="tel:+2348172973820" className="flex items-center gap-1 text-white/90 hover:text-gold transition">
              <Phone className="h-3 w-3 text-gold" /> +234 817 297 3820
            </a>
            <a href="mailto:biona4real@gmail.com" className="hidden xs:flex items-center gap-1 text-white/80 hover:text-white transition">
              <Mail className="h-3 w-3" /> biona4real@gmail.com
            </a>
            <div className="flex items-center gap-2.5 border-l border-white/20 pl-3">
              <Link href="/login" className="flex items-center gap-1 text-gold font-bold hover:underline">
                <User className="h-3 w-3" /> Sign In
              </Link>
              <Link href="/signup" className="text-white/90 font-semibold hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-pad flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setMobileOpen(false)}>
          <img
            src="/logo.png"
            alt="OLADECK Global Services Logo"
            className="h-10 w-10 sm:h-11 sm:w-11 object-contain rounded-full shadow-sm"
          />
          <div className="leading-tight">
            <p className="text-sm sm:text-base font-extrabold tracking-tight text-navy uppercase">OLADECK</p>
            <p className="text-[9px] sm:text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Global Services</p>
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
              <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lifted border border-border py-1.5 z-50">
                {services.map(([label, href]) => (
                  <Link key={label} href={href} className="block px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted hover:text-navy transition">
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
              <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lifted border border-border py-1.5 z-50">
                {industries.map(([label, href]) => (
                  <Link key={label} href={href} className="block px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted hover:text-navy transition">
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

        {/* Desktop CTA row */}
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

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden flex items-center justify-center p-2 rounded-lg text-navy hover:bg-muted transition"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[90px] bottom-0 z-40 bg-white border-t border-border overflow-y-auto lg:hidden shadow-2xl flex flex-col justify-between">
          <div className="container-pad py-5 space-y-3">
            <Link
              href="/#about"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-3 px-4 rounded-xl bg-muted/40 text-sm font-bold text-navy"
            >
              <span>About Us</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>

            {/* Collapsible Mobile Services */}
            <div className="rounded-xl border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileServicesOpen((o) => !o)}
                className="w-full flex items-center justify-between py-3 px-4 bg-muted/20 text-sm font-bold text-navy text-left"
              >
                <span>Services</span>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileServicesOpen && (
                <div className="bg-white border-t border-border py-1 px-2 divide-y divide-border/40">
                  {services.map(([label, href]) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2.5 px-3 text-xs font-semibold text-foreground hover:text-navy"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Collapsible Mobile Industries */}
            <div className="rounded-xl border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileIndustriesOpen((o) => !o)}
                className="w-full flex items-center justify-between py-3 px-4 bg-muted/20 text-sm font-bold text-navy text-left"
              >
                <span>Industries</span>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${mobileIndustriesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileIndustriesOpen && (
                <div className="bg-white border-t border-border py-1 px-2 divide-y divide-border/40">
                  {industries.map(([label, href]) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2.5 px-3 text-xs font-semibold text-foreground hover:text-navy"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-3 px-4 rounded-xl bg-muted/40 text-sm font-bold text-navy"
            >
              <span>Blog &amp; Resources</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>

            <Link
              href="/track"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-3 px-4 rounded-xl bg-muted/40 text-sm font-bold text-navy"
            >
              <span>Track Shipment</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-3 px-4 rounded-xl bg-muted/40 text-sm font-bold text-navy"
            >
              <span>Contact Us</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </div>

          {/* Bottom Mobile Action Buttons */}
          <div className="p-4 bg-muted/30 border-t border-border space-y-2 mt-auto">
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center rounded-xl border border-navy/20 bg-white py-3 text-xs font-bold text-navy shadow-xs"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center rounded-xl bg-gold/20 border border-gold/40 py-3 text-xs font-bold text-navy shadow-xs"
              >
                Sign Up
              </Link>
            </div>
            <a
              href={whatsappUrl("Hello OLADECK Global Services, I would like to clear my vehicle.")}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-bold text-white shadow-sm"
            >
              <MessageCircle className="h-4.5 w-4.5" /> Chat on WhatsApp
            </a>
            <Link
              href="/quote"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center rounded-xl bg-navy py-3 text-sm font-bold text-white shadow-sm"
            >
              Get a Quote Online
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
