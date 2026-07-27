import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Car, CheckCircle2, Clock, LogOut, MessageCircle, PackageCheck, PlusCircle, ShieldCheck, User } from "lucide-react";
import { logoutAction } from "@/app/auth/actions";
import { TrackingDashboard } from "@/components/tracking/tracking-dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  // If no session found, redirect to login page
  if (!userEmail) {
    redirect("/login");
  }

  return (
    <section className="py-12 md:py-16 bg-muted/20 min-h-[calc(100vh-8rem)]">
      <div className="container-pad space-y-8">
        {/* Welcome Banner */}
        <div className="rounded-2xl bg-navy p-6 md:p-8 text-white shadow-lifted flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-gold border border-gold/30">
              <ShieldCheck className="h-3.5 w-3.5" /> Customer Account Dashboard
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome back, <span className="text-gold">{userName}</span>
            </h1>
            <p className="text-xs md:text-sm text-white/70">
              Logged in as <span className="font-mono text-white/90">{userEmail}</span> · Phone: <span className="font-mono text-white/90">{userPhone}</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-bold text-white hover:bg-gold/90 transition shadow-sm"
            >
              <PlusCircle className="h-4 w-4" /> Clear New Vehicle
            </Link>
            <form action={logoutAction}>
              <Button type="submit" variant="outline" size="sm" className="rounded-full border-white/30 text-white hover:bg-white/10 hover:text-white">
                <LogOut className="mr-1.5 h-3.5 w-3.5" /> Sign Out
              </Button>
            </form>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-border shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-navy/8 flex items-center justify-center text-navy shrink-0">
                <Car className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Active Shipments</p>
                <p className="text-xl font-extrabold text-navy">Live Tracking Active</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Estimated Clearing</p>
                <p className="text-xl font-extrabold text-navy">5-6 Working Days</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-green-500/15 flex items-center justify-center text-green-700 shrink-0">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Direct Support</p>
                <a
                  href={whatsappUrl(`Hello OLADECK Global Services, I am logged in as ${userName} (${userEmail}) and need support.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-bold text-[#25D366] hover:underline"
                >
                  WhatsApp Agent Desk →
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Tracking Module */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-navy">Your Live Vehicle Tracking</h2>
              <p className="text-xs text-muted-foreground">Search any CLR tracking number to monitor port release status</p>
            </div>
            <Link href="/quote" className="text-xs font-bold text-navy hover:underline flex items-center gap-1">
              + Submit New Request
            </Link>
          </div>
          <TrackingDashboard />
        </div>
      </div>
    </section>
  );
}
