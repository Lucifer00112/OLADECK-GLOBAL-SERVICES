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

const industries = [
  { label: "Automobile Imports", detail: "Cars, SUVs, Pickups, Buses, Vans" },
  { label: "Oil & Gas Equipment", detail: "AGO, PMS, Tankers, Machinery" },
  { label: "Agricultural Machinery", detail: "Tractors, Harvesters, Equipment" },
  { label: "Industrial Equipment", detail: "Factory, Construction, Mining" },
  { label: "Government & Military", detail: "Licensed sensitive cargo clearance" },
  { label: "Corporate Fleets", detail: "Bulk vehicle clearance programs" }
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

const steps = [
  { step: "01", title: "Contact Us on WhatsApp", desc: "Send us your vehicle details — Make, Model, Year, VIN, and arrival port. We respond within minutes." },
  { step: "02", title: "Receive a Price Quote", desc: "We calculate customs duty, port fees, and clearing charges and send you a transparent breakdown." },
  { step: "03", title: "Submit Required Documents", desc: "Bill of lading, purchase invoice, export title, and valid ID — our team guides you through every requirement." },
  { step: "04", title: "We Handle the Port", desc: "Our licensed officers interface with Nigeria Customs and all government agencies on your behalf at the port." },
  { step: "05", title: "Duty Payment & Release", desc: "We process all duty payments and coordinate terminal release procedures for your vehicle." },
  { step: "06", title: "Delivery to Your Door", desc: "Safely transported from port to your home, office, or any state in Nigeria by our trusted logistics partners." }
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="hero-bg text-white overflow-hidden">
        <div className="container-pad grid min-h-[520px] items-center gap-10 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300 mb-4">
              Nigeria's Trusted Vehicle Clearing Agency
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight sm:text-5xl lg:text-6xl">
              We make vehicle{" "}
              <span className="text-gold">imports &amp; clearance</span>{" "}
              simple!
            </h1>
            <p className="mt-5 text-lg text-white/80 max-w-xl leading-relaxed">
              OLADECK Global Services is the vehicle clearing agent in Nigeria you can always count on — fast, transparent, and hassle-free from port to delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappUrl("Hello OLADECK Global Services, I would like to clear my vehicle. Please advise on pricing.")}
                className="flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white hover:bg-[#1db854] transition shadow-md"
              >
                <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
              </a>
              <Link
                href="/quote"
                className="flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20 transition"
              >
                Get a Quote Online
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-extrabold text-gold">{s.value}</p>
                  <p className="mt-1 text-xs text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?auto=format&fit=crop&w=900&q=85"
                alt="Cargo containers at Nigerian port"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-xl bg-white text-navy p-4 shadow-lifted flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-sm">Port-to-Door Delivery</p>
                <p className="text-xs text-muted-foreground">Covered across all Nigerian states</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE TRUST BAR ────────────────────────────────────── */}
      <div className="border-y border-border bg-muted/40 py-4">
        <div className="container-pad flex flex-wrap items-center justify-center gap-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {["Apapa Port", "Tin Can Island", "PTML Terminal", "Onne Port", "All Nigerian States", "Licensed & Bonded", "Customs Compliant"].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ────────────────────────────────────────────────── */}
      <section id="about" className="section-light py-16 md:py-24">
        <div className="container-pad grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative order-2 lg:order-1">
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
            <div className="absolute -bottom-3 -right-3 rounded-xl bg-gold text-white px-4 py-3 shadow-gold text-center">
              <p className="text-2xl font-extrabold">15+</p>
              <p className="text-xs font-medium">Years in Business</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="accent-line" />
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">About Us</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
              The Only Clearing Agent in Nigeria You Will Ever Need
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              As the most efficient clearing agent in Nigeria, OLADECK Global Services acts as your dedicated guide through the often complex import and export process. From the moment your vehicle docks at the port, we act on your behalf — clearing through Nigeria Customs, ensuring 100% compliance with all regulations, processing duties and tariffs, and ultimately delivering your vehicle to your door.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Our licensed team of logistics and customs professionals take great pride in helping importers of all experience levels — from first-time buyers to large-volume commercial dealers — handle each case with exceptional care.
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {["Licensed by Nigeria Customs", "All documents handled online", "WhatsApp real-time updates", "Serving all Nigerian ports", "15+ years of experience", "Corporate fleet specialists"].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <Link href="/quote" className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy/90 transition">
                Start a Clearing Request
              </Link>
              <Link href="/contact" className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────── */}
      <section id="services" className="section-muted py-16 md:py-24">
        <div className="container-pad">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="accent-line mx-auto" />
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">What We Do</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
              Specialist Clearing Services for Imported Vehicles
            </h2>
            <p className="mt-3 text-muted-foreground">
              We handle every aspect of the vehicle clearing process so you can focus on your business.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="service-card p-6">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-navy text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="section-light py-16 md:py-24">
        <div className="container-pad">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="accent-line mx-auto" />
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Simple Process</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
              How Vehicle Clearing Works with OLADECK
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s) => (
              <div key={s.step} className="relative rounded-xl border border-border bg-white p-6 shadow-card hover:shadow-lifted transition">
                <span className="absolute -top-3 -left-1 text-5xl font-extrabold text-muted/60 select-none">{s.step}</span>
                <h3 className="mt-6 font-bold text-navy text-base">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOMS CLEARANCE DETAIL ─────────────────────────────── */}
      <section className="section-light-blue py-16 md:py-24">
        <div className="container-pad grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="accent-line" />
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Customs Clearance</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
              Licensed Customs Agents with Deep Nigeria Expertise
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              OLADECK Global Services is a fully licensed clearing agent in Nigeria with deep expertise in import and export procedures. We have served both direct importers and exporters, as well as Nigerian-based and international freight forwarding professionals, with excellent customs clearance services for over 15 years.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Located in Apapa, Lagos, our team deals with the Nigeria Customs Service and all other government agencies on behalf of your company or yourself — obtaining the fastest possible clearance into the country. We file entries electronically and ensure all government agency requirements — including NAFDAC, SON, NFPC, and NXp — are met before your goods arrive at the port.
            </p>
            <div className="mt-6 grid gap-3">
              {["Electronic entry filing with NCS", "NAFDAC & SON compliance", "PAAR & SON conformity assessment", "Bill of lading to release handled"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lifted aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=85"
              alt="Container port customs clearance"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── CLEARING & FORWARDING ────────────────────────────────── */}
      <section className="section-light py-16 md:py-24">
        <div className="container-pad grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="rounded-2xl overflow-hidden shadow-lifted aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&w=800&q=85"
              alt="Freight forwarding trucks"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="accent-line" />
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Clearing & Forwarding</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
              From Any Port in the World to Your Doorstep in Nigeria
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our professional freight clearance services include FCL and LCL shipments for exports and worldwide containers arriving weekly to Nigeria — whether part loads or full loads from all international ports including seaports and airports.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Especially relevant — whether your company is large or small, the weight of cargo light or heavy — OLADECK Global Services will take care of your vehicle from dock to door if required to do so. We handle all export documentation filing, carrier arrangements, packing, crating, and storage needs.
            </p>
            <a
              href={whatsappUrl("Hello OLADECK Global Services, I need freight forwarding and clearing services.")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy/90 transition"
            >
              <MessageCircle className="h-4 w-4" /> Get a Freight Quote on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────────── */}
      <section className="section-muted py-16 md:py-24">
        <div className="container-pad">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="accent-line mx-auto" />
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Industries We Serve</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
              Clearing Solutions Across All Import Sectors
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <div key={ind.label} className="service-card p-5 flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-navy/8 flex items-center justify-center shrink-0">
                  <Ship className="h-5 w-5 text-navy" />
                </div>
                <div>
                  <h3 className="font-bold text-navy text-sm">{ind.label}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{ind.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────── */}
      <section className="section-navy py-16 md:py-24">
        <div className="container-pad">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-3">Why Choose OLADECK?</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              The Clearing Agent of Choice for Hundreds of Importers
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-xl bg-white/8 border border-white/12 p-5">
                  <div className="h-10 w-10 rounded-lg bg-gold/20 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-white/65 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
          {/* Big CTA */}
          <div className="mt-14 rounded-2xl bg-gold/20 border border-gold/30 p-8 md:p-12 text-center">
            <h3 className="text-2xl font-extrabold text-white md:text-3xl">
              Have a Vehicle to Clear? Let's Talk Pricing.
            </h3>
            <p className="mt-3 text-white/75 max-w-xl mx-auto">
              Send us your car details on WhatsApp — Make, Model, Year, VIN, and arrival port — and we will send you a full clearing price breakdown within minutes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappUrl("Hello OLADECK Global Services, I want to clear my car. Here are the details:\n\n- Make & Model:\n- Year:\n- VIN:\n- Arrival Port:")}
                className="flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3 text-base font-bold text-white hover:bg-[#1db854] transition shadow-lg"
              >
                <MessageCircle className="h-5 w-5" /> Send Vehicle Details on WhatsApp
              </a>
              <Link
                href="/quote"
                className="flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3 text-base font-semibold text-white hover:bg-white/10 transition"
              >
                Submit Request Online
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOOLS ROW ────────────────────────────────────────────── */}
      <section className="section-light py-16 md:py-24">
        <div className="container-pad grid gap-8 lg:grid-cols-2">
          <DutyEstimator />
          <DocumentChecklist />
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────────── */}
      <Gallery items={galleryItems} />

      {/* ── LIVE TRACKING ────────────────────────────────────────── */}
      <section className="section-muted py-16 md:py-24">
        <div className="container-pad">
          <div className="max-w-2xl mb-10">
            <span className="accent-line" />
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Live Tracking</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
              Track Your Vehicle Clearing Progress
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every quote receives a unique tracking number. Use it below to check your clearing status in real time.
            </p>
          </div>
          <TrackingDashboard />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="section-light py-16 md:py-24">
        <div className="container-pad grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div>
            <span className="accent-line" />
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">FAQs</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Answers to the most common questions about vehicle importing, customs clearance, duties, and documentation in Nigeria.
            </p>
            <a
              href={whatsappUrl("Hello OLADECK Global Services, I have a question about clearing my vehicle.")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy/90 transition"
            >
              <MessageCircle className="h-4 w-4" /> Ask Us on WhatsApp
            </a>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>

      {/* ── BLOG & RESOURCES ─────────────────────────────────────── */}
      <section className="section-muted py-16 md:py-24">
        <div className="container-pad">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <span className="accent-line" />
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Import Guides</p>
              <h2 className="text-3xl font-extrabold tracking-tight text-navy">Latest Articles & Port Updates</h2>
            </div>
            <Link href="/blog" className="hidden sm:inline-flex rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-white transition shrink-0">
              View All Articles →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <div key={post.slug} className="service-card overflow-hidden group">
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                </div>
                <div className="p-5">
                  <span className="inline-block rounded-full bg-gold/12 text-gold text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 mb-3">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-navy text-sm leading-snug">{post.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <p className="mt-4 text-[11px] text-muted-foreground">{post.date} · {post.readTime}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Port updates & downloads */}
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="font-bold text-navy text-base mb-4">Port Updates</h3>
              {portUpdates.length ? (
                portUpdates.map((u) => (
                  <div key={u.title} className="service-card p-4 mb-3">
                    <p className="text-[10px] font-bold text-gold uppercase">{u.date}</p>
                    <p className="font-bold text-sm text-navy mt-1">{u.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{u.body}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground text-center">
                  No active port notices at this time.
                </div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-navy text-base mb-4">Free Downloads</h3>
              <div className="grid gap-2">
                {resources.map((r) => (
                  <a key={r} href="/blog" className="flex items-center gap-3 rounded-lg border border-border bg-white p-3.5 text-sm font-medium text-navy hover:bg-muted hover:border-gold/40 transition">
                    <span className="h-8 w-8 rounded-md bg-gold/12 flex items-center justify-center text-gold text-xs font-bold shrink-0">PDF</span>
                    {r}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
