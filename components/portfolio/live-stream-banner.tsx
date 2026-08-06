"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Radio, ShieldCheck, Users, Volume2, VolumeX } from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

export function LiveStreamBanner() {
  const [viewersCount, setViewersCount] = useState(1482);
  const [isMuted, setIsMuted] = useState(true);
  const [tickerIndex, setTickerIndex] = useState(0);

  const liveTickers = [
    "Apapa Ocean Terminal: 2023 Mercedes-Benz GLE 450 duty assessment cleared!",
    "Tin Can Island RORO: Vessel discharge completed with zero demurrage.",
    "PTML Terminal: 2024 Toyota Land Cruiser Prado fast-track release approved.",
    "Onne Port Harcourt: Commercial fleet duty memo issued successfully."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setViewersCount((prev) => prev + Math.floor(Math.random() * 7) - 3);
      setTickerIndex((prev) => (prev + 1) % liveTickers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [liveTickers.length]);

  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-navy text-white p-5 rounded-3xl border border-red-500/40 shadow-xl space-y-4 relative overflow-hidden">
      {/* Live Badge Top Row */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white font-extrabold text-[11px] uppercase tracking-wider animate-pulse shadow-md">
            <Radio className="h-3.5 w-3.5 animate-spin" /> LIVE BROADCAST
          </span>
          <span className="text-xs font-bold text-amber-400">Apapa Port Operational Desk</span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1 text-slate-300">
            <Users className="h-3.5 w-3.5 text-red-400" /> {viewersCount.toLocaleString()} Watching
          </span>
          <button
            onClick={() => setIsMuted((m) => !m)}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Video Simulation Box */}
      <div className="relative rounded-2xl overflow-hidden aspect-video bg-black group border border-slate-800">
        <img
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80"
          alt="Live Port Clearing Operations"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-90"
        />

        {/* Live Stream Overlay Elements */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-mono font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4" /> OLADECK Live Feed • Cam 01
        </div>

        <div className="absolute bottom-3 inset-x-3 bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping shrink-0" />
            <span className="font-bold text-amber-300 truncate">
              {liveTickers[tickerIndex]}
            </span>
          </div>

          <a
            href={whatsappUrl("Hello OLADECK, I am watching your Live Port Stream and need to clear a vehicle.")}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 px-3.5 py-1.5 rounded-xl bg-[#25D366] text-white font-extrabold text-xs hover:bg-[#1db854] transition shadow-md flex items-center gap-1.5"
          >
            <MessageCircle className="h-3.5 w-3.5" /> Chat Live Officer
          </a>
        </div>
      </div>
    </div>
  );
}
