"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { GalleryItem } from "@/lib/types";

const filters = ["All", "SUVs", "Sedans", "Commercial"] as const;

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const filtered = useMemo(
    () => (filter === "All" ? items : items.filter((item) => item.category === filter)),
    [filter, items]
  );

  return (
    <section id="gallery" className="bg-muted/55 py-24">
      <div className="container-pad">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge className="border-gold/40 bg-gold/10 text-navy dark:text-gold">Featured Gallery</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
              Cleared vehicles, documented from port to release.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <Button
                key={item}
                variant={filter === item ? "secondary" : "outline"}
                size="sm"
                onClick={() => setFilter(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {filtered.map((item, index) => (
            <motion.button
              type="button"
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              onClick={() => setSelected(item)}
              className="group mb-5 w-full break-inside-avoid overflow-hidden rounded-lg border bg-card text-left shadow-sm transition hover:-translate-y-1 hover:shadow-glow"
            >
              <img
                src={item.image}
                alt={item.vehicle}
                loading="lazy"
                className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{item.vehicle}</p>
                  <Badge>{item.category}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.year} · {item.port} · {item.completedAt}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {selected ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-navy/80 p-4 backdrop-blur" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-lg bg-card shadow-glow">
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-3 top-3 z-10 bg-background/80"
              onClick={() => setSelected(null)}
              aria-label="Close gallery image"
            >
              <X className="h-5 w-5" />
            </Button>
            <img src={selected.image} alt={selected.vehicle} className="max-h-[72vh] w-full object-cover" />
            <div className="p-5">
              <p className="text-xl font-semibold">{selected.vehicle}</p>
              <p className="text-sm text-muted-foreground">
                {selected.year} · {selected.port} · Completed {selected.completedAt}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
