"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CarFront, FilterX, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { vehicleBrands, vehicleCatalog } from "@/lib/vehicle-catalog";

const categoryChips = ["All", "Toyota", "Lexus", "Honda", "SUVs", "Sedans", "Electric"] as const;

export function CarCatalogSearch() {
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState<typeof categoryChips[number]>("All");
  const [brandSelect, setBrandSelect] = useState("All");

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();
    return vehicleCatalog
      .filter((car) => {
        if (brandSelect !== "All") return car.brand === brandSelect;
        if (activeChip === "All") return true;
        if (activeChip === "Toyota" || activeChip === "Lexus" || activeChip === "Honda") {
          return car.brand === activeChip;
        }
        if (activeChip === "SUVs") return car.bodyType === "SUV";
        if (activeChip === "Sedans") return car.bodyType === "Sedan";
        if (activeChip === "Electric") return car.fuel === "Electric" || car.fuel === "Hybrid";
        return true;
      })
      .filter((car) =>
        [car.brand, car.model, car.generation, car.bodyType, car.fuel, car.origin]
          .join(" ")
          .toLowerCase()
          .includes(search)
      )
      .slice(0, 16);
  }, [activeChip, brandSelect, query]);

  function resetFilters() {
    setQuery("");
    setActiveChip("All");
    setBrandSelect("All");
  }

  return (
    <section id="catalog" className="relative isolate overflow-hidden py-14 md:py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(212,175,55,.14),transparent_40%)]" />
      <div className="container-pad">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Badge variant="gold">Vehicle Catalog</Badge>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-4xl">
              Inspect Common Imported Vehicles
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Quickly lookup clearing specifications for top imported models in Nigeria including Toyota, Lexus, Honda, SUVs, and Electric vehicles.
            </p>
          </div>

          {/* Search & Brand Filter - Mobile Responsive Widths */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-[260px]">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9 text-xs sm:text-sm h-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search model, e.g. RX 350..."
              />
            </div>
            <select
              value={brandSelect}
              onChange={(e) => {
                setBrandSelect(e.target.value);
                if (e.target.value !== "All") setActiveChip("All");
              }}
              className="focus-ring h-9 w-full sm:w-auto rounded-lg border bg-background px-3 text-xs font-semibold"
            >
              <option value="All">All Brands</option>
              {vehicleBrands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Chips / Tabs */}
        <div className="mt-5 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categoryChips.map((chip) => {
            const isActive = activeChip === chip && brandSelect === "All";
            return (
              <button
                key={chip}
                type="button"
                onClick={() => {
                  setActiveChip(chip);
                  setBrandSelect("All");
                }}
                className={`whitespace-nowrap rounded-full px-3.5 py-1 text-xs font-semibold transition ${
                  isActive
                    ? "bg-navy text-white shadow-xs dark:bg-gold dark:text-navy"
                    : "border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>

        {/* Results Grid - 1 col on mobile, 2 on tablet, 3-4 on desktop */}
        {results.length ? (
          <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((car) => (
              <Card
                key={car.id}
                className="group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="relative h-40 w-full overflow-hidden bg-muted">
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <Badge variant="outline" className="bg-background/90 text-foreground backdrop-blur-xs shadow-xs text-[10px] py-0 px-2">
                      {car.bodyType}
                    </Badge>
                  </div>
                </div>

                <CardContent className="flex flex-1 flex-col justify-between p-3.5">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-sm text-foreground">
                          {car.brand} {car.model}
                        </h3>
                        <p className="text-[11px] font-medium text-muted-foreground">{car.generation}</p>
                      </div>
                      <CarFront className="h-4 w-4 shrink-0 text-gold" />
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-1.5 text-[11px] text-muted-foreground">
                      <div className="rounded-md border bg-muted/30 px-2 py-0.5">
                        <span className="block text-[9px] uppercase font-semibold text-muted-foreground/70">Years</span>
                        {car.yearFrom} – {car.yearTo}
                      </div>
                      <div className="rounded-md border bg-muted/30 px-2 py-0.5">
                        <span className="block text-[9px] uppercase font-semibold text-muted-foreground/70">Fuel</span>
                        {car.fuel}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t flex items-center justify-between gap-2">
                    <Badge variant="outline" className="text-[10px] py-0 px-2">
                      {car.origin}
                    </Badge>
                    <Button asChild size="sm" variant="ghost" className="h-7 text-xs font-semibold text-gold hover:text-gold hover:bg-gold/10 px-2">
                      <Link href={`/quote?vehicle=${encodeURIComponent(`${car.brand} ${car.model}`)}`}>
                        Quote <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mt-6">
            <CardContent className="grid gap-3 p-8 text-center">
              <FilterX className="mx-auto h-7 w-7 text-muted-foreground/60" />
              <h3 className="text-base font-semibold">No matching vehicles found</h3>
              <p className="mx-auto max-w-sm text-xs text-muted-foreground">
                We couldn't find any vehicle matching "{query}". Try adjusting your search term or brand filter.
              </p>
              <div>
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
