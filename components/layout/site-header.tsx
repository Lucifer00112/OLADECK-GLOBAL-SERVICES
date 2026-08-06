"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  Lock,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  Package,
  Phone,
  User,
  UserCheck,
  X
} from "lucide-react";
import { logoutAction } from "@/app/auth/actions";
import { whatsappUrl } from "@/lib/utils";

const services = [
  ["Customs Clearance", "/about#services"],
  ["Duty Processing", "/about#services"],
  ["Clearing & Forwarding", "/about#services"],
  ["Fleet Clearance", "/about#services"],
  ["Cargo Handling", "/about#services"],
  ["Fast Track Assistance", "/quote"]
];

const industries = [
  ["Automobile Imports", "/about#services"],
  ["Oil & Gas Equipment", "/about#services"],
  ["Agricultural Machinery", "/about#services"],
  ["Industrial Equipment", "/about#services"],
  ["Government & Military", "/about#services"],
  ["Corporate Fleets", "/quote"]
];

import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname?.startsWith("/admin")) {
    return null;
  }
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
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
            <div className="flex items-center gap-2.5 border-l border-white/20 pl-3 relative">
              {/* Profile Avatar Dropdown Trigger */}
              <button
                onClick={() => setProfileOpen((o) => !o)}
                className="flex items-center gap-1.5 text-gold font-bold hover:text-yellow-300 transition py-0.5"
              >
                <div className="h-5 w-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold">
                  <User className="h-3 w-3" />
                </div>
                <span>Account</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {profileOpen && (
                <div
                  onMouseLeave={() => setProfileOpen(false)}
                  className="absolute right-0 top-full mt-2 w-56 bg-white text-navy rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-extrabold text-navy uppercase tracking-wider">Customer Portal</p>
                    <p className="text-[10px] text-muted-foreground">Manage quotes &amp; vehicle tracking</p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/portal"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted hover:text-navy transition"
                    >
                      <UserCheck className="h-3.5 w-3.5 text-gold" /> Customer Dashboard
                    </Link>
                    <Link
                      href="/track"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted hover:text-navy transition"
                    >
                      <Package className="h-3.5 w-3.5 text-navy" /> Live Vehicle Tracking
                    </Link>
                    <Link
                      href="/quote"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted hover:text-navy transition"
                    >
                      <FileText className="h-3.5 w-3.5 text-navy" /> Request New Quote
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 pt-1">
                    <button
                      onClick={async () => {
                        setProfileOpen(false);
                        await logoutAction();
                        window.location.href = "/login";
                      }}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut className="h-3.5 w-3.5" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
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

          <Link href="/gallery" className="px-3 py-2 rounded-md text-sm font-semibold text-amber-600 hover:bg-amber-50 transition flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" /> Port Works
          </Link>
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
            href="/portal"
            className="flex items-center gap-1.5 rounded-full border border-navy/20 bg-navy/5 px-3.5 py-1.5 text-xs font-bold text-navy hover:bg-navy/10 transition"
          >
            <User className="h-3.5 w-3.5 text-gold" /> Portal
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
              href="/portal"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-3 px-4 rounded-xl bg-gold/15 border border-gold/30 text-sm font-bold text-navy"
            >
              <span className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-gold" /> Customer Account Dashboard
              </span>
              <ChevronRight className="h-4 w-4 text-navy" />
            </Link>

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
              href="/gallery"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-3 px-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-sm font-bold text-navy"
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" /> Cleared Vehicles Showcase
              </span>
              <ChevronRight className="h-4 w-4 text-navy" />
            </Link>

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
