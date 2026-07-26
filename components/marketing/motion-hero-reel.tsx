import { Badge } from "@/components/ui/badge";
import { heroMotionPanels } from "@/lib/data";

export function MotionHeroReel() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/15 bg-white/10 p-3 shadow-glow">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,162,39,.28),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,.16),transparent_28%)]" />
      <div className="relative grid gap-3">
        <div className="flex items-center justify-between">
          <Badge className="border-white/20 bg-white/10 text-gold">OLADECK Live Motion Reel</Badge>
          <span className="flex items-center gap-2 text-xs text-white/70">
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold" /> moving background
          </span>
        </div>
        <div className="grid h-[430px] gap-3 md:grid-cols-[1.35fr_.65fr]">
          <div className="video-panel group relative overflow-hidden rounded-lg">
            <video
              className="h-full w-full object-cover"
              poster={heroMotionPanels[0].image}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Container port operations video"
            >
              <source src={heroMotionPanels[0].video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gold">Port to pickup</p>
              <p className="mt-2 text-2xl font-semibold">Documents, duty, release, delivery.</p>
            </div>
            <div className="scanline" />
          </div>
          <div className="grid gap-3">
            {heroMotionPanels.slice(1).map((panel, index) => (
              <div key={panel.label} className="video-panel relative overflow-hidden rounded-lg">
                {panel.video ? (
                  <video
                    className="h-full w-full object-cover"
                    poster={panel.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={`${panel.label} video`}
                  >
                    <source src={panel.video} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={panel.image}
                    alt={panel.label}
                    className={`h-full w-full object-cover ${index === 0 ? "pan-left" : "pan-right"}`}
                  />
                )}
                <div className="absolute inset-0 bg-navy/35" />
                <p className="absolute bottom-4 left-4 text-sm font-semibold">{panel.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs text-white/70">
          {["Arrival confirmed", "Customs desk active", "Release ETA visible"].map((item) => (
            <div key={item} className="rounded-lg border border-white/10 bg-white/8 px-3 py-2">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
