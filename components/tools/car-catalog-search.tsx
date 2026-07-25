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
      .slice(0, 24);
  }, [activeChip, brandSelect, query]);

  function resetFilters() {
    setQuery("");
    setActiveChip("All");
    setBrandSelect("All");
  }

  return (
    <section id="catalog" className="relative isolate overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(212,175,55,.12),transparent_35%)]" />
      <div className="container-pad">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Badge className="border-gold/40 bg-gold/10 text-gold">Vehicle Catalog</Badge>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-4xl">
              Inspect Common Imported Vehicles
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
              Quickly lookup clearing specifications for top imported models in Nigeria including Toyota, Lexus, Honda, SUVs, and Electric vehicles.
            </p>
          </div>

          {/* Search & Brand Filter */}
          <div className="grid gap-3 sm:flex sm:items-center">
            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9 text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search model, e.g. RX 350, Camry..."
              />
            </div>
            <select
              value={brandSelect}
              onChange={(e) => {
                setBrandSelect(e.target.value);
                if (e.target.value !== "All") setActiveChip("All");
              }}
              className="focus-ring h-10 rounded-lg border bg-background px-3 text-sm"
            >
              <option value="All">All Brands</option>
              {vehicleBrands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Chips / Tabs */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
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
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? "bg-navy text-white shadow-sm dark:bg-gold dark:text-navy"
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
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((car) => (
              <Card
                key={car.id}
                className="group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="relative h-44 w-full overflow-hidden bg-muted">
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-background/90 text-foreground backdrop-blur-xs shadow-xs text-[11px]">
                      {car.bodyType}
                    </Badge>
                  </div>
                </div>

                <CardContent className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-base text-foreground">
                          {car.brand} {car.model}
                        </h3>
                        <p className="text-xs font-medium text-muted-foreground">{car.generation}</p>
                      </div>
                      <CarFront className="h-4 w-4 shrink-0 text-gold" />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                      <div className="rounded-md border bg-muted/30 px-2 py-1">
                        <span className="block text-[10px] uppercase font-semibold text-muted-foreground/70">Years</span>
                        {car.yearFrom} – {car.yearTo}
                      </div>
                      <div className="rounded-md border bg-muted/30 px-2 py-1">
                        <span className="block text-[10px] uppercase font-semibold text-muted-foreground/70">Fuel</span>
                        {car.fuel}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t flex items-center justify-between gap-2">
                    <Badge variant="outline" className="text-[10px]">
                      {car.origin}
                    </Badge>
                    <Button asChild size="sm" variant="ghost" className="h-8 text-xs font-semibold text-gold hover:text-gold hover:bg-gold/10">
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
          <Card className="mt-8">
            <CardContent className="grid gap-3 p-10 text-center">
              <FilterX className="mx-auto h-8 w-8 text-muted-foreground/60" />
              <h3 className="text-lg font-semibold">No matching vehicles found</h3>
              <p className="mx-auto max-w-sm text-sm text-muted-foreground">
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
