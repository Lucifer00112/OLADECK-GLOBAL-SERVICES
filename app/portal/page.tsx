import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Car,
  CheckCircle2,
  Clock,
  LogOut,
  MessageCircle,
  PackageCheck,
  PlusCircle,
  ShieldCheck,
  User
} from "lucide-react";
import { logoutAction } from "@/app/auth/actions";
import { TrackingDashboard } from "@/components/tracking/tracking-dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { whatsappUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Customer Portal — OLADECK Global Services",
  description: "Manage your vehicle clearing quotes, track port progress, and view invoices."
};

export default async function CustomerPortalPage() {
  const cookieStore = await cookies();
  const rawSession = cookieStore.get("oladeck-user-session")?.value;
  let userEmail = "";
  let userName = "Valued Customer";
  let userPhone = "+234 817 297 3820";

  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      userEmail = data.user.email || "";
      userName = data.user.user_metadata?.full_name || data.user.email?.split("@")[0] || "Valued Customer";
      userPhone = data.user.user_metadata?.phone || userPhone;
    }
  }

  if (!userEmail && rawSession) {
    try {
      if (rawSession.startsWith("{")) {
        const parsed = JSON.parse(rawSession);
        userEmail = parsed.email || "";
        userName = parsed.fullName || userName;
        userPhone = parsed.phone || userPhone;
      } else {
        userEmail = rawSession;
        userName = rawSession.split("@")[0] || userName;
      }
    } catch {
      userEmail = rawSession;
    }
  }

  if (!userEmail) {
    redirect("/login");
  }

  const initials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="min-h-[calc(100vh-8rem)] bg-muted/20">
      {/* ─── Welcome Banner ─── */}
      <div className="bg-navy text-white">
        <div className="container-pad py-5 md:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 md:h-14 md:w-14 rounded-full bg-gold/20 border-2 border-gold/50 flex items-center justify-center text-gold text-base md:text-xl font-extrabold shadow-lg shrink-0">
              {initials}
            </div>
            <div className="space-y-0.5">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-2.5 py-0.5 text-[10px] font-bold text-gold border border-gold/30">
                <ShieldCheck className="h-3 w-3" /> Customer Dashboard
              </div>
              <h1 className="text-lg md:text-2xl font-extrabold tracking-tight leading-tight">
                Welcome, <span className="text-gold">{userName}</span>
              </h1>
              <p className="text-[11px] md:text-xs text-white/60 font-mono truncate max-w-[200px] md:max-w-none">
                {userEmail}
              </p>
            </div>
          </div>

          {/* Banner actions */}
          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
            <Link
              href="/quote"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold text-white hover:bg-gold/90 transition shadow-sm"
            >
              <PlusCircle className="h-3.5 w-3.5" /> Clear New Vehicle
            </Link>
            <form action={logoutAction}>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="rounded-full border-white/30 text-white hover:bg-white/10 hover:text-white text-xs h-8 px-3"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline ml-1.5">Sign Out</span>
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="container-pad py-5 md:py-8 space-y-5 md:space-y-7">

        {/* ─── Mobile: compact info strip ─── */}
        <div className="flex md:hidden items-center justify-between gap-2 bg-white border border-border rounded-2xl px-4 py-3 shadow-sm text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Car className="h-4 w-4 text-navy shrink-0" />
            <span className="font-semibold text-navy">Live Tracking Active</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-gold shrink-0" />
            <span className="font-semibold text-navy">5–6 Working Days</span>
          </div>
        </div>

        {/* ─── Mobile: Quick Actions (compact row) ─── */}
        <div className="flex md:hidden gap-2">
          <Link
            href="/quote"
            className="flex-1 flex flex-col items-center gap-1 rounded-xl bg-navy text-white py-3 text-[10px] font-bold"
          >
            <PlusCircle className="h-4 w-4 text-gold" />
            New Clearing
          </Link>
          <Link
            href="/track"
            className="flex-1 flex flex-col items-center gap-1 rounded-xl border border-border bg-white text-navy py-3 text-[10px] font-bold"
          >
            <PackageCheck className="h-4 w-4" />
            Track Ship.
          </Link>
          <a
            href={whatsappUrl(`Hello OLADECK, I am ${userName} (${userEmail}) and need support with my vehicle clearing.`)}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex flex-col items-center gap-1 rounded-xl bg-[#25D366] text-white py-3 text-[10px] font-bold"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        {/* ─── Desktop: Profile card + stats grid ─── */}
        <div className="hidden md:grid gap-5 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="border-border shadow-sm lg:col-span-1">
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <div className="h-24 w-24 rounded-full bg-navy flex items-center justify-center text-white text-3xl font-extrabold shadow-lg ring-4 ring-gold/30">
                {initials}
              </div>
              <div>
                <p className="font-extrabold text-navy text-xl leading-tight">{userName}</p>
                <p className="text-xs text-muted-foreground mt-0.5 break-all">{userEmail}</p>
                <p className="text-xs text-muted-foreground">{userPhone}</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" /> Verified Customer Account
              </div>
              <div className="w-full space-y-2 pt-2 border-t border-border">
                <Link
                  href="/quote"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-navy text-white text-xs font-bold py-2.5 hover:bg-navy/90 transition"
                >
                  <PlusCircle className="h-3.5 w-3.5 text-gold" /> Request New Clearing
                </Link>
                <Link
                  href="/track"
                  className="flex items-center justify-center gap-2 w-full rounded-xl border border-border bg-muted/40 text-navy text-xs font-semibold py-2.5 hover:bg-muted transition"
                >
                  <PackageCheck className="h-3.5 w-3.5" /> Track Shipment
                </Link>
                <a
                  href={whatsappUrl(`Hello OLADECK, I am ${userName} (${userEmail}) and need support with my vehicle clearing.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] text-white text-xs font-bold py-2.5 hover:bg-[#1db854] transition"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Support
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="lg:col-span-2 grid gap-4 grid-cols-2 content-start">
            <Card className="border-border shadow-sm">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-navy/8 flex items-center justify-center text-navy shrink-0">
                  <Car className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Active Shipments</p>
                  <p className="text-base font-extrabold text-navy">Live Tracking Active</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Est. Clearing</p>
                  <p className="text-base font-extrabold text-navy">5–6 Working Days</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm col-span-2">
              <CardContent className="p-5 flex items-start sm:items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-green-500/15 flex items-center justify-center text-green-700 shrink-0">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium">Need Help? Direct Support Available 24/7</p>
                  <p className="text-sm font-bold text-navy">Our clearing desk responds within 15 minutes on WhatsApp.</p>
                </div>
                <a
                  href={whatsappUrl(`Hello OLADECK Global Services, I am logged in as ${userName} (${userEmail}) and need support.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold text-[#25D366] hover:underline shrink-0"
                >
                  WhatsApp Agent →
                </a>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm col-span-2 bg-muted/20">
              <CardContent className="p-5">
                <p className="text-xs font-bold text-navy mb-3 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-gold" /> Account Details
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground">Full Name</p>
                    <p className="font-bold text-navy">{userName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-bold text-navy break-all">{userEmail}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone / WhatsApp</p>
                    <p className="font-bold text-navy">{userPhone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Account Status</p>
                    <p className="font-bold text-emerald-600">✓ Verified &amp; Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ─── Live Tracking Module ─── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base md:text-xl font-extrabold text-navy">Live Vehicle Tracking</h2>
              <p className="text-xs text-muted-foreground">Search any CLR tracking number to monitor port release status</p>
            </div>
            <Link href="/quote" className="text-xs font-bold text-navy hover:underline flex items-center gap-1 shrink-0">
              + New Request
            </Link>
          </div>
          <TrackingDashboard />
        </div>
      </div>
    </section>
  );
}
