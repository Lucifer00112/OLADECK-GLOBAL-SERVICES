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
import { CarCatalogSearch } from "@/components/tools/car-catalog-search";
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

const serviceIcons = [ShieldCheck, FileCheck2, Landmark, PackageCheck, Ship, Truck, Car, Sparkles, Building2, BadgeCheck, MessageCircle, Clock3];
const process = ["Contact Us", "Submit Vehicle Information", "Customs Documentation", "Duty Processing", "Vehicle Release", "Delivery"];
const benefits = ["Transparent pricing", "Experienced professionals", "Fast communication", "Trusted handling", "Reliable support", "Customer satisfaction"];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 -z-20">
          <video
            className="h-full w-full object-cover opacity-55"
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
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,31,58,.98),rgba(11,31,58,.78),rgba(11,31,58,.32))]" />
        <div className="container-pad grid min-h-[calc(100svh-4rem)] items-center gap-10 py-20 lg:grid-cols-[1.05fr_.95fr]">
          <div className="max-w-3xl">
            <Badge className="border-white/20 bg-white/10 text-gold">{companyName} - Nigeria imported vehicle clearing only</Badge>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-normal sm:text-6xl lg:text-7xl">
              Fast, Reliable & Trusted Vehicle Clearing Services in Nigeria
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
              MG Enterprises clears imported vehicles through Nigerian ports with speed, transparency, and professional handling from documentation to release and delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link href="/quote">Get a Quote <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/18">
                <a href={whatsappUrl("Hello MG Enterprises, I would like a quote for vehicle clearing.")}>
                  Chat on WhatsApp <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <MotionHeroReel />
        </div>
      </section>

      <section className="border-b bg-background py-8">
        <div className="container-pad grid grid-cols-2 gap-3 md:grid-cols-4">
          {["Car Dealers", "Importers", "Businesses", "Individual Buyers"].map((logo) => (
            <div key={logo} className="rounded-lg border bg-card p-5 text-center text-sm font-semibold shadow-sm">
              {logo}
            </div>
          ))}
        </div>
      </section>

      <section className="border-b bg-background py-10">
        <div className="container-pad grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border bg-card p-5 shadow-sm">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <VehicleShowcase />
      <CarCatalogSearch />

      <section id="services" className="py-24">
        <div className="container-pad">
          <div className="max-w-3xl">
            <Badge className="border-gold/40 bg-gold/10">Services</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
              Specialist clearing for imported vehicles, not general freight.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <Card key={service} className="group transition hover:-translate-y-1 hover:shadow-glow">
                  <CardContent className="p-5">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-gold/15 text-navy dark:text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-semibold">{service}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Clear ownership, timely documentation, and proactive status communication.
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="process" className="bg-navy py-24 text-white">
        <div className="container-pad">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">How It Works</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
              A calm process for a high-stakes shipment.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-6">
            {process.map((step, index) => (
              <div key={step} className="relative rounded-lg border border-white/10 bg-white/8 p-5">
                <span className="text-sm text-gold">0{index + 1}</span>
                <p className="mt-4 font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-pad grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div>
            <Badge className="border-gold/40 bg-gold/10">Why Choose Us</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
              Built for trust, speed, and visibility.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {benefits.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg border bg-card p-4">
                  <ShieldCheck className="h-5 w-5 text-gold" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5">
            <DutyEstimator />
            <DocumentChecklist />
          </div>
        </div>
      </section>

      <Gallery items={galleryItems} />
      <section className="py-24">
        <div className="container-pad grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Real-Time Workflow</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
              No fake jobs. Your submitted import request becomes the live record.
            </h2>
            <p className="mt-4 text-muted-foreground">
              After submission, MG Enterprises prepares the full WhatsApp message with your car type, model year, documents, shipping details, and contact information.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Received", "Pending", "Received by Customer"].map((status, index) => (
              <Card key={status} className="shadow-sm">
                <CardContent className="p-5">
                  <span className="text-sm font-semibold text-gold">0{index + 1}</span>
                  <h3 className="mt-4 font-semibold">{status}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {index === 0
                      ? "Your request is recorded."
                      : index === 1
                        ? "Please wait while the car arrives and clears."
                        : "You confirm this only when the car gets to you."}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/55 py-24">
        <div className="container-pad grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <Badge className="border-gold/40 bg-gold/10">FAQ</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
              Answers before you even call.
            </h2>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>

      <section className="py-24">
        <div className="container-pad grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-end justify-between gap-4">
              <div>
                <Badge className="border-gold/40 bg-gold/10">Resource Center</Badge>
                <h2 className="mt-4 text-3xl font-semibold tracking-normal">Guides and industry updates.</h2>
              </div>
              <Button asChild variant="outline">
                <Link href="/blog">View Blog</Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {blogPosts.map((post) => (
                <Card key={post.slug} className="transition hover:-translate-y-1 hover:shadow-glow">
                  <CardContent className="p-5">
                    <Badge>{post.category}</Badge>
                    <h3 className="mt-4 font-semibold">{post.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                    <p className="mt-4 text-xs text-muted-foreground">{post.date} - {post.readTime}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Port Updates</h3>
            <div className="mt-4 grid gap-4">
              {portUpdates.length ? portUpdates.map((update) => (
                <Card key={update.title}>
                  <CardContent className="p-5">
                    <p className="text-xs font-semibold text-gold">{update.date}</p>
                    <p className="mt-2 font-semibold">{update.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{update.body}</p>
                  </CardContent>
                </Card>
              )) : (
                <Card>
                  <CardContent className="p-5 text-sm text-muted-foreground">
                    No live port notice has been posted yet.
                  </CardContent>
                </Card>
              )}
            </div>
            <h3 className="mt-8 font-semibold">Downloads</h3>
            <div className="mt-4 grid gap-2">
              {resources.map((resource) => (
                <a key={resource} href="/blog" className="rounded-lg border bg-card p-3 text-sm font-medium transition hover:bg-muted">
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
