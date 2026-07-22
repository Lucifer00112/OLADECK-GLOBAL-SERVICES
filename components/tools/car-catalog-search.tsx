"use client";

import { useMemo, useState } from "react";
import { CarFront, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { vehicleBrands, vehicleCatalog } from "@/lib/vehicle-catalog";

export function CarCatalogSearch() {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("All");

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();
    return vehicleCatalog
      .filter((car) => brand === "All" || car.brand === brand)
      .filter((car) =>
        [car.brand, car.model, car.generation, car.bodyType, car.fuel, car.origin]
          .join(" ")
          .toLowerCase()
          .includes(search)
      )
      .slice(0, 24);
  }, [brand, query]);

  return (
    <section id="car-checker" className="relative isolate overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(201,162,39,.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,.03),transparent)]" />
      <div className="container-pad">
        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div>
            <Badge className="border-gold/40 bg-gold/10 text-gold">Check Your Car</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
              Search brand, model, generation, year range, fuel, body type, and origin.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Built for clearing-agent work: Toyota Corolla E120, E140, E170, E210 and hundreds of common imported models are searchable before quote submission.
            </p>
          </div>
          <Card className="shadow-glow">
            <CardContent className="grid gap-3 p-4">
              <label className="grid gap-2 text-sm font-medium">
                Search car
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-9"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Toyota Corolla E120, Lexus RX 350, Honda Accord..."
                  />
                </div>
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Brand
                <select
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                  className="focus-ring h-11 rounded-lg border bg-background px-3 text-sm"
                >
                  <option>All</option>
                  {vehicleBrands.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((car) => (
            <Card key={car.id} className="overflow-hidden transition hover:-translate-y-1 hover:shadow-glow">
              <div className="h-40 overflow-hidden">
                <img src={car.image} alt={`${car.brand} ${car.model}`} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{car.brand} {car.model}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{car.generation}</p>
                  </div>
                  <CarFront className="h-5 w-5 shrink-0 text-gold" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <span className="rounded-lg border bg-background p-2">From {car.yearFrom}</span>
                  <span className="rounded-lg border bg-background p-2">To {car.yearTo}</span>
                  <span className="rounded-lg border bg-background p-2">{car.bodyType}</span>
                  <span className="rounded-lg border bg-background p-2">{car.fuel}</span>
                </div>
                <Badge className="mt-3">{car.origin}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
