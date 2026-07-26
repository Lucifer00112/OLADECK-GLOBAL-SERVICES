import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Car,
  Clock3,
  FileCheck2,
  Landmark,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Ship,
  Sparkles,
  Truck
} from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/marketing/animated-counter";
import { Gallery } from "@/components/marketing/gallery";
import { MotionHeroReel } from "@/components/marketing/motion-hero-reel";
import { VehicleShowcase } from "@/components/marketing/vehicle-showcase";
import { DocumentChecklist } from "@/components/tools/document-checklist";
import { DutyEstimator } from "@/components/tools/duty-estimator";
import {
  blogPosts,
  faqs,
  galleryItems,
  portUpdates,
  resources,
  services,
  stats,
  companyName,
  heroMotionPanels
} from "@/lib/data";
import { whatsappUrl } from "@/lib/utils";

const serviceIcons = [
  ShieldCheck,
  FileCheck2,
  Landmark,
  PackageCheck,
  Ship,
  Truck,
  Car,
  Sparkles,
  Building2,
  BadgeCheck,
  MessageCircle,
  Clock3
];
const process = [
  "Contact Us",
  "Submit Vehicle Info",
  "Customs Documentation",
  "Duty Processing",
  "Vehicle Release",
  "Delivery"
];
const benefits = [
  "Transparent pricing",
  "Experienced professionals",
  "Fast communication",
  "Trusted handling",
  "Reliable support",
  "Customer satisfaction"
];

export default function HomePage() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 -z-20">
          <video
            className="h-full w-full object-cover opacity-45"
            poster={heroMotionPanels[0].image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Cargo port background video"
          >
            <source src={heroMotionPanels[0].video} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,31,58,.96),rgba(11,31,58,.82),rgba(11,31,58,.45))]" />
        <div className="container-pad grid min-h-[calc(85vh-4rem)] items-center gap-8 py-12 md:py-20 lg:grid-cols-[1.05fr_.95fr]">
          <div className="max-w-3xl">
            <Badge className="border-white/20 bg-white/10 text-gold text-xs py-1 px-3">
              {companyName} • Nigeria Vehicle Clearing
            </Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
              Fast, Reliable & Trusted Vehicle Clearing Services in Nigeria
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              OLADECK Global Services clears imported vehicles through Nigerian ports with speed, transparency, and professional handling from documentation to release and delivery.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <Link href="/quote">Get a Quote <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/10 text-white hover:bg-white/20 font-semibold"
              >
                <a href={whatsappUrl("Hello OLADECK Global Services, I would like to clear a vehicle.")}>
                  Chat on WhatsApp <MessageCircle className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <MotionHeroReel />
        </div>
      </section>

      {/* 2. TRUST & PROOF SECTION (Logos + Stats) */}
      <section className="border-b bg-background py-8">
        <div className="container-pad grid gap-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {["Car Dealers", "Importers", "Businesses", "Individual Buyers"].map((logo) => (
              <div key={logo} className="rounded-lg border bg-card p-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground shadow-xs">
                {logo}
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 pt-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border bg-card p-4 shadow-xs">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="mt-1 text-xs font-medium text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES GRID */}
      <section id="services" className="section-tint-subtle py-14 md:py-20">
        <div className="container-pad">
          <div className="max-w-2xl">
            <Badge className="border-gold/40 bg-gold/10 text-gold">Services</Badge>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-4xl">
              Specialist Clearing for Imported Vehicles
            </h2>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              Dedicated handling for cars, SUVs, luxury vehicles, and commercial fleets through Lagos & Port Harcourt ports.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <Card key={service} className="group transition hover:-translate-y-1 hover:shadow-glow">
                  <CardContent className="p-5">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold/15 text-navy dark:text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-bold text-base text-foreground">{service}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      Clear ownership, timely documentation, and proactive status communication.
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (PROCESS) */}
      <section id="process" className="bg-navy py-16 md:py-24 text-white">
        <div className="container-pad">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">How It Works</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-4xl">
              A Calm, Structured Clearing Process
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {process.map((step, index) => (
              <div key={step} className="rounded-xl border border-white/10 bg-white/5 p-4 flex flex-col justify-between">
                <span className="text-xs font-bold text-gold">0{index + 1}</span>
                <p className="mt-3 font-semibold text-sm leading-snug">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DIRECT WHATSAPP CONSULTATION CALLOUT (Replaces Car Search) */}
      <section className="py-14 md:py-20 section-tint-navy text-white relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_90%_20%,rgba(212,175,55,.18),transparent_50%)]" />
        <div className="container-pad">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="border-gold/40 bg-gold/15 text-gold text-xs py-1 px-3">
              Direct WhatsApp Pricing & Quote
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Have a Vehicle to Clear?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
              Send us a direct message on WhatsApp with your vehicle details—Make, Model, Year, and Arrival Port—and our team will review your specs and discuss clearing prices instantly.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto font-bold text-base px-8">
                <a href={whatsappUrl("Hello OLADECK Global Services, I want to clear my car. Here are the details:\n\n- Make & Model:\n- Year:\n- Shipping Port:")}>
                  <MessageCircle className="mr-2 h-5 w-5" /> Chat on WhatsApp Now
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-white/25 bg-white/10 text-white hover:bg-white/20 font-semibold">
                <Link href="/quote">Submit Request Online</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. QUOTE PLANNING & TOOLS (Estimator & Checklist) */}
      <section className="py-14 md:py-20 section-tint-blue border-y border-border/30">
        <div className="container-pad grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div>
            <Badge className="border-gold/40 bg-gold/10 text-gold">Why Choose Us</Badge>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-4xl">
              Built for Trust, Speed & Transparency
            </h2>
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {benefits.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg border bg-card p-3 shadow-xs">
                  <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
                  <span className="text-xs font-semibold text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-6">
            <DutyEstimator />
            <DocumentChecklist />
          </div>
        </div>
      </section>

      {/* 7. VEHICLE SHOWCASE & GALLERY */}
      <VehicleShowcase />
      <Gallery items={galleryItems} />

      <section className="section-tint-subtle border-t border-border/30 py-14 md:py-20">
        <div className="container-pad grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Live Tracking</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-4xl">
              No Blind Spots. Track Your Import Status Live.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              After submitting your clearing request, receive your tracking number to monitor port progress, customs verification, and release milestones.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Received", "Your clearing request is recorded in our system."],
              ["Pending", "Vehicle undergoes customs inspection and port clearing."],
              ["Received by Customer", "Car is safely released and delivered to you."]
            ].map(([status, desc], index) => (
              <Card key={status} className="shadow-xs">
                <CardContent className="p-4">
                  <span className="text-xs font-bold text-gold">Step 0{index + 1}</span>
                  <h3 className="mt-2 font-bold text-sm text-foreground">{status}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ & RESOURCE CENTER */}
      <section className="bg-muted/40 py-16 md:py-24">
        <div className="container-pad grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <Badge className="border-gold/40 bg-gold/10 text-gold">FAQ</Badge>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-pad grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-end justify-between gap-4">
              <div>
                <Badge className="border-gold/40 bg-gold/10 text-gold">Resource Center</Badge>
                <h2 className="mt-2 text-2xl font-bold tracking-tight">Guides & Customs Updates</h2>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/blog">View Blog</Link>
              </Button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {blogPosts.map((post) => (
                <Card key={post.slug} className="transition hover:-translate-y-1 hover:shadow-glow">
                  <CardContent className="p-4 flex flex-col justify-between h-full">
                    <div>
                      <Badge variant="outline" className="text-[10px]">{post.category}</Badge>
                      <h3 className="mt-3 font-bold text-sm text-foreground leading-snug">{post.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    </div>
                    <p className="mt-4 text-[11px] text-muted-foreground">{post.date} • {post.readTime}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-base text-foreground">Port Updates</h3>
            <div className="mt-3 grid gap-3">
              {portUpdates.length ? (
                portUpdates.map((update) => (
                  <Card key={update.title}>
                    <CardContent className="p-4">
                      <p className="text-[10px] font-bold text-gold">{update.date}</p>
                      <p className="mt-1 font-bold text-xs text-foreground">{update.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{update.body}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-4 text-xs text-muted-foreground">
                    No live port notice has been posted yet.
                  </CardContent>
                </Card>
              )}
            </div>
            <h3 className="mt-6 font-bold text-base text-foreground">Downloads</h3>
            <div className="mt-3 grid gap-2">
              {resources.map((resource) => (
                <a
                  key={resource}
                  href="/blog"
                  className="rounded-lg border bg-card p-3 text-xs font-semibold transition hover:bg-muted"
                >
                  {resource}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
