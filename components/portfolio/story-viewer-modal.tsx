"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, Pause, Play, ShieldCheck, X } from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

export type StoryItem = {
  id: string;
  name: string;
  avatar: string;
  tag: string;
  mediaUrl: string;
  headline: string;
  caption: string;
  port: string;
  timestamp: string;
};

export const sampleStories: StoryItem[] = [
  {
    id: "story-1",
    name: "Apapa Dock Operations",
    avatar: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=200&q=80",
    tag: "🔴 LIVE",
    mediaUrl: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=85",
    headline: "Apapa Ocean Terminal — Fast Duty Release",
    caption: "Live from Apapa Terminal Berth 4! 30 Luxury SUVs cleared with zero demurrage today.",
    port: "Apapa Port, Lagos",
    timestamp: "10 mins ago"
  },
  {
    id: "story-2",
    name: "Tin Can RORO Release",
    avatar: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=200&q=80",
    tag: "RELEASED",
    mediaUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
    headline: "Tin Can Island RORO Vessel Discharge",
    caption: "Direct vessel discharge at Tin Can Island RORO terminal. Fast-tracked Customs Single Window clearance.",
    port: "Tin Can Island Port, Lagos",
    timestamp: "25 mins ago"
  },
  {
    id: "story-3",
    name: "PTML Clearance Spot",
    avatar: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=200&q=80",
    tag: "FAST",
    mediaUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85",
    headline: "PTML Terminal Luxury Vehicle Handover",
    caption: "PTML Terminal drive-out! 2022 Lexus RX 350 cleared & handed over to happy owner.",
    port: "PTML Terminal, Lagos",
    timestamp: "1 hour ago"
  },
  {
    id: "story-4",
    name: "Duty Paid Verification",
    avatar: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=200&q=80",
    tag: "VERIFIED",
    mediaUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=85",
    headline: "100% Genuine Nigeria Customs Duty Receipts",
    caption: "100% genuine Nigeria Customs Service duty payment receipts & authentic C-Number verification.",
    port: "All Major Nigerian Ports",
    timestamp: "2 hours ago"
  }
];

export function StoryViewerModal({
  initialIndex = 0,
  onClose
}: {
  initialIndex?: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentStory = sampleStories[currentIndex];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentIndex < sampleStories.length - 1) {
            setCurrentIndex((idx) => idx + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, onClose]);

  function handleNext() {
    if (currentIndex < sampleStories.length - 1) {
      setCurrentIndex((i) => i + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setProgress(0);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md h-[85vh] bg-slate-950 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border border-slate-800">
        
        {/* Progress Bar Header */}
        <div className="absolute top-0 inset-x-0 p-4 z-20 space-y-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <div className="flex gap-1.5">
            {sampleStories.map((s, idx) => (
              <div key={s.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-100 ease-linear"
                  style={{
                    width:
                      idx === currentIndex
                        ? `${progress}%`
                        : idx < currentIndex
                        ? "100%"
                        : "0%"
                  }}
                />
              </div>
            ))}
          </div>

          {/* Story Author Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={currentStory.avatar}
                alt={currentStory.name}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-gold"
              />
              <div>
                <p className="font-extrabold text-white text-xs flex items-center gap-1">
                  {currentStory.name} <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                </p>
                <p className="text-[10px] text-slate-300 font-mono">{currentStory.timestamp} • {currentStory.port}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPaused((p) => !p)}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Media Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentStory.mediaUrl}
            alt={currentStory.headline}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
        </div>

        {/* Click Navigation Overlay */}
        <div className="absolute inset-0 z-10 flex">
          <div className="w-1/2 h-full cursor-pointer" onClick={handlePrev} />
          <div className="w-1/2 h-full cursor-pointer" onClick={handleNext} />
        </div>

        {/* Bottom Headline & Action Bar */}
        <div className="relative z-20 p-5 mt-auto space-y-3 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 uppercase">
              {currentStory.tag}
            </span>
            <h3 className="text-base font-extrabold text-white">{currentStory.headline}</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">{currentStory.caption}</p>
          </div>

          <a
            href={whatsappUrl(`Hello OLADECK, I saw your live story for ${currentStory.headline} (${currentStory.port}) and want to clear a vehicle.`)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-2xl bg-[#25D366] text-white py-3 text-xs font-extrabold hover:bg-[#1db854] transition shadow-lg"
          >
            <MessageCircle className="h-4 w-4" /> Inquire About Clearance at {currentStory.port}
          </a>
        </div>
      </div>
    </div>
  );
}
