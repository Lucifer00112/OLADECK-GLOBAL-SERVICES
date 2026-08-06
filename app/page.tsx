import type { Metadata } from "next";
import Link from "next/link";
import { ClearanceFeed } from "@/components/portfolio/clearance-feed";
import {
  CheckCircle2,
  FileText,
  Flame,
  MessageCircle,
  PackageCheck,
  PlusCircle,
  ShieldCheck,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "OLADECK Social — Live Cleared Vehicles & Port Operations Feed",
  description: "Browse verified cleared vehicles, port release documentations, and real-time customs updates from Apapa, Tin Can, and PTML."
};

const storyHighlights = [
  {
    name: "Apapa Dock",
    avatar: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=200&q=80",
    tag: "LIVE"
  },
  {
    name: "Tin Can RORO",
    avatar: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=200&q=80",
    tag: "RELEASED"
  },
  {
    name: "PTML Clearance",
    avatar: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=200&q=80",
    tag: "FAST"
  },
  {
    name: "Duty Paid",
    avatar: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=200&q=80",
    tag: "VERIFIED"
  }
];

const trendingTopics = [
  { tag: "#ApapaPort", posts: "4.2k clearances" },
  { tag: "#TinCanIsland", posts: "3.8k clearances" },
  { tag: "#VINValuation", posts: "Updated 2026" },
  { tag: "#PTMLRORO", posts: "2.1k clearances" },
  { tag: "#ZeroDemurrage", posts: "Guaranteed" }
];

export default function SocialHomePage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen py-6 md:py-10">
      <div className="container-pad">
        {/* Main 3-Column Social Media Layout */}
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          
          {/* ── LEFT SIDEBAR (Desktop) ── */}
          <aside className="hidden lg:block lg:col-span-3 space-y-4 sticky top-20">
            {/* User Profile / Quick Action Card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-navy flex items-center justify-center text-gold font-extrabold shadow-md ring-2 ring-gold/40">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-navy text-sm leading-tight">OLADECK Global</h3>
                  <p className="text-[11px] text-muted-foreground">@oladeck_official</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-gold/10 border border-gold/30 text-xs font-semibold text-navy flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                <span>Licensed Customs Agent #CAC-84920</span>
              </div>

              <div className="space-y-2 pt-1 text-xs font-bold">
                <Link
                  href="/quote"
                  className="flex items-center justify-center gap-2 w-full rounded-2xl bg-navy text-white py-2.5 hover:bg-navy/90 transition shadow-sm"
                >
                  <PlusCircle className="h-4 w-4 text-gold" /> Clear My Vehicle Now
                </Link>
                <Link
                  href="/track"
                  className="flex items-center justify-center gap-2 w-full rounded-2xl border border-gray-200 bg-muted/30 text-navy py-2.5 hover:bg-muted transition"
                >
                  <PackageCheck className="h-4 w-4" /> Track Port Shipment
                </Link>
                <Link
                  href="/about"
                  className="flex items-center justify-center gap-2 w-full rounded-2xl border border-gray-200 bg-white text-muted-foreground py-2.5 hover:text-navy transition"
                >
                  About OLADECK &amp; Services
                </Link>
              </div>
            </div>

            {/* Trending Topics Box */}
            <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-navy flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-amber-500" /> Trending Port Topics
              </h4>
              <div className="divide-y divide-gray-100 text-xs">
                {trendingTopics.map((topic) => (
                  <div key={topic.tag} className="py-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-navy hover:underline cursor-pointer">{topic.tag}</p>
                      <p className="text-[10px] text-muted-foreground">{topic.posts}</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Live
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ── CENTER FEED (Main Content) ── */}
          <main className="lg:col-span-6 space-y-6">
            
            {/* Story / Highlights Bar */}
            <div className="bg-white border border-gray-200 p-4 rounded-3xl shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-navy px-1">
                <span className="flex items-center gap-1.5 text-amber-600">
                  <Sparkles className="h-4 w-4" /> Today&apos;s Port Spotlights
                </span>
                <span className="text-[10px] font-semibold text-muted-foreground">Apapa · Tin Can · PTML</span>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-2 scrollbar-none">
                {storyHighlights.map((story, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
                    <div className="h-16 w-16 rounded-full p-0.5 ring-2 ring-amber-500 group-hover:scale-105 transition duration-200 relative">
                      <img src={story.avatar} alt={story.name} className="w-full h-full object-cover rounded-full" />
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-extrabold bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded-full uppercase">
                        {story.tag}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-navy">{story.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prompt Bar (Truth Social style prompt) */}
            <div className="bg-white border border-gray-200 p-4 rounded-3xl shadow-xs flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center text-navy font-bold shrink-0">
                🚗
              </div>
              <div className="flex-1 bg-muted/30 hover:bg-muted/60 transition rounded-2xl px-4 py-2.5 text-xs text-muted-foreground cursor-pointer font-medium">
                Importing a car soon? Click here to calculate clearance duty...
              </div>
              <Link
                href="/quote"
                className="px-4 py-2 rounded-2xl bg-navy text-white text-xs font-bold hover:bg-navy/90 transition shrink-0"
              >
                Get Quote
              </Link>
            </div>

            {/* The Main Social Feed */}
            <ClearanceFeed />
          </main>

          {/* ── RIGHT SIDEBAR (Desktop) ── */}
          <aside className="hidden lg:block lg:col-span-3 space-y-4 sticky top-20">
            {/* Live WhatsApp Agent Desk Card */}
            <div className="bg-gradient-to-br from-navy to-slate-900 text-white rounded-3xl p-5 shadow-md space-y-3">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-[10px] font-bold text-gold border border-gold/30">
                <ShieldCheck className="h-3.5 w-3.5" /> 24/7 Agent Support
              </div>
              <h3 className="text-base font-extrabold text-white leading-snug">
                Need Fast Vehicle Clearance at the Port?
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Talk directly with our licensed customs clearing officers on WhatsApp for instant rates &amp; advice.
              </p>
              <a
                href={whatsappUrl("Hello OLADECK Global Services, I want to clear a vehicle and need an immediate quote.")}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-2xl bg-[#25D366] text-white py-3 text-xs font-bold hover:bg-[#1db854] transition shadow-md"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Agent Desk
              </a>
            </div>

            {/* Quick Info & Navigation Links */}
            <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-xs space-y-3 text-xs">
              <h4 className="font-extrabold text-navy uppercase tracking-wider text-[11px]">Port Information &amp; Services</h4>
              <div className="space-y-2 text-muted-foreground font-medium">
                <p className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span>Apapa Ocean Port</span>
                  <span className="font-bold text-emerald-600">Active</span>
                </p>
                <p className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span>Tin Can Island Terminal</span>
                  <span className="font-bold text-emerald-600">Active</span>
                </p>
                <p className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span>PTML RORO Berth</span>
                  <span className="font-bold text-emerald-600">Active</span>
                </p>
                <p className="flex items-center justify-between py-1">
                  <span>Onne Port Terminal</span>
                  <span className="font-bold text-emerald-600">Active</span>
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100 text-[11px] text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">
                <Link href="/about" className="hover:underline text-navy font-semibold">About Company</Link>
                <Link href="/terms" className="hover:underline">Terms</Link>
                <Link href="/privacy" className="hover:underline">Privacy</Link>
                <Link href="/contact" className="hover:underline">Contact</Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
