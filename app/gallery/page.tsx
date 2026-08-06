import type { Metadata } from "next";
import { ClearanceFeed } from "@/components/portfolio/clearance-feed";
import { ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Verified Port Clearances & Vehicle Feed — OLADECK Global Services",
  description: "Browse live cleared vehicle posts, customs port documentation, and real delivery records by OLADECK Global Services."
};

export default function GalleryPage() {
  return (
    <section className="py-10 md:py-16 bg-muted/20 min-h-screen">
      <div className="container-pad space-y-8">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-3.5 py-1 text-xs font-bold text-navy border border-gold/40 shadow-xs">
            <ShieldCheck className="h-4 w-4 text-gold" /> Verified Port Operations Feed
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-navy">
            Our Cleared Vehicles <span className="text-gold">&amp; Port Works</span>
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            Real vehicle clearing records, duty assessment documentation, and port delivery proofs directly from Apapa Port, Tin Can Island, PTML, and Onne.
          </p>
        </div>

        {/* Live Feed Component */}
        <ClearanceFeed />
      </div>
    </section>
  );
}
