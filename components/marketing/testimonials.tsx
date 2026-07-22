"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, PlayCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Testimonial = {
  name: string;
  role: string;
  rating: number;
  image: string;
  quote: string;
};

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const item = items[index];

  return (
    <section className="py-24">
      <div className="container-pad grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Client Trust</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
            Communication customers can feel.
          </h2>
          <p className="mt-4 text-muted-foreground">
            The best clearance experience is calm, documented, and easy to understand even when the port is busy.
          </p>
        </div>
        <Card className="overflow-hidden shadow-glow">
          <CardContent className="grid gap-6 p-0 md:grid-cols-[240px_1fr]">
            <div className="relative min-h-72 bg-navy">
              <img src={item.image} alt={item.name} className="h-full w-full object-cover opacity-90" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 text-sm text-navy">
                <PlayCircle className="h-4 w-4 text-gold" /> Video ready
              </div>
            </div>
            <div className="flex flex-col justify-between p-6">
              <div>
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: item.rating }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-5 text-2xl font-medium leading-snug">"{item.quote}"</blockquote>
                <p className="mt-6 font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.role}</p>
              </div>
              <div className="mt-8 flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setIndex((current) => (current - 1 + items.length) % items.length)}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setIndex((current) => (current + 1) % items.length)}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
