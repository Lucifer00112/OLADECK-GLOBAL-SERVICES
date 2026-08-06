import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle, Ship, ShieldCheck, Star } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Gallery } from "@/components/marketing/gallery";
import { DocumentChecklist } from "@/components/tools/document-checklist";
import { DutyEstimator } from "@/components/tools/duty-estimator";
import { TrackingDashboard } from "@/components/tracking/tracking-dashboard";
import {
  blogPosts,
  faqs,
  galleryItems,
  portUpdates,
  resources
} from "@/lib/data";
import { whatsappUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us — OLADECK Global Services",
  description: "Nigeria's most trusted vehicle clearing agent with over 15 years of port operations experience."
};

const services = [
  {
    icon: "🛃",
    title: "Customs Clearance",
    desc: "We handle all paperwork, declarations, and compliance procedures with Nigeria Customs Service on your behalf — ensuring your vehicle clears without delays."
  },
  {
    icon: "📋",
    title: "Duty Processing",
    desc: "Our team coordinates duty assessments, calculates tariffs, and processes all duty memo payments through the proper government channels with full transparency."
  },
  {
    icon: "🚢",
    title: "Clearing & Forwarding",
    desc: "From port of origin to your doorstep, we manage FCL/LCL shipments, shipping line coordination, and container examination at all major Nigerian ports."
  },
  {
    icon: "🚛",
    title: "Fleet Clearance",
    desc: "Whether you're importing 5 or 50 vehicles, our bulk clearance service offers staged documentation, priority handling, and group discounts for corporate importers."
  },
  {
    icon: "📦",
    title: "Cargo Handling",
    desc: "Professional personnel receive and handle your vehicle at the terminal, ensuring it's safely stored, inspected, and prepared for release without damage."
  },
  {
    icon: "⚡",
    title: "Fast Track Assistance",
    desc: "Urgent clearance needed? Our fast track desk prioritises your case with dedicated officers, accelerating release for qualified urgent import cases."
  }
];

const whyUs = [
  {
    icon: Star,
    title: "15+ Years of Experience",
    desc: "Over a decade and a half clearing thousands of vehicles through Nigeria's busiest ports including Apapa, Tin Can, PTML, and Onne."
  },
  {
    icon: ShieldCheck,
    title: "100% Customs Compliance",
    desc: "We file all entries electronically and ensure NAFDAC, SON, NFPC, and NXP requirements are fully met to prevent port delays."
  },
  {
    icon: CheckCircle2,
    title: "All Ports, One Contact",
    desc: "We operate across all major Nigerian arrival ports. One point of contact, one trusted team handling your entire clearing journey."
  },
  {
    icon: MessageCircle,
    title: "WhatsApp-First Communication",
    desc: "Instant price discussions, status updates, and document sharing — all through WhatsApp for maximum speed and convenience."
  }
];

const stats = [
  { value: "3,000+", label: "Vehicles Cleared" },
  { value: "15+", label: "Years of Experience" },
  { value: "5", label: "Major Ports Covered" },
  { value: "24/7", label: "WhatsApp Support" }
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Header */}
      <section className="hero-bg text-white py-16 md:py-24">
        <div className="container-pad text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">About OLADECK Global Services</p>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Nigeria&apos;s Most Trusted <span className="text-gold">Vehicle Clearing Agency</span>
          </h1>
          <p className="text-sm md:text-base text-white/80 leading-relaxed">
            For over 15 years, OLADECK Global Services has provided seamless customs clearance, tariff assessment, and port delivery for imported cars, SUVs, and commercial fleets across Nigeria.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <a
              href={whatsappUrl("Hello OLADECK, I would like to learn more about your clearing services.")}
              className="rounded-full bg-[#25D366] px-6 py-3 text-xs font-bold text-white hover:bg-[#1db854] transition shadow-md flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" /> Contact Us on WhatsApp
            </a>
            <Link
              href="/quote"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-bold text-white hover:bg-white/20 transition"
            >
              Get a Quote Online
            </Link>
          </div>
        </div>
      </section>

      {/* Main About Details */}
      <section id="about" className="section-light py-16 md:py-24">
        <div className="container-pad grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <img
                src="https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=600&q=85"
                alt="Luxury car clearing"
                className="rounded-2xl object-cover aspect-square shadow-card col-span-1"
              />
              <div className="grid gap-3 col-span-1">
                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=85"
                  alt="Port operations"
                  className="rounded-2xl object-cover w-full h-full shadow-card"
                />
                <img
                  src="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=400&q=85"
                  alt="Vehicle processing"
                  className="rounded-2xl object-cover w-full h-full shadow-card"
                />
              </div>
            </div>
          </div>
          <div>
            <span className="accent-line" />
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Company Overview</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
              The Only Clearing Agent in Nigeria You Will Ever Need
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-sm">
              As the most efficient clearing agent in Nigeria, OLADECK Global Services acts as your dedicated guide through the often complex import and export process. From the moment your vehicle docks at the port, we act on your behalf — clearing through Nigeria Customs, ensuring 100% compliance with all regulations, processing duties and tariffs, and ultimately delivering your vehicle to your door.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed text-sm">
              Our licensed team of logistics and customs professionals take great pride in helping importers of all experience levels — from first-time buyers to large-volume commercial dealers — handle each case with exceptional care.
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 text-xs font-semibold">
              {["Licensed by Nigeria Customs", "All documents handled online", "WhatsApp real-time updates", "Serving all Nigerian ports", "15+ years of experience", "Corporate fleet specialists"].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-navy">
                  <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="section-muted py-16">
        <div className="container-pad space-y-8">
          <div className="max-w-2xl text-center mx-auto space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">What We Do</p>
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">Comprehensive Customs &amp; Clearing Services</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="service-card p-6 bg-white rounded-2xl border border-border shadow-sm">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-navy text-base mb-2">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
