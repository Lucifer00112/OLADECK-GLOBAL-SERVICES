import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { vehicleShowcaseItems } from "@/lib/data";

export function VehicleShowcase() {
  return (
    <section className="overflow-hidden bg-navy py-20 text-white">
      <div className="container-pad">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <Badge className="border-white/20 bg-white/10 text-gold">Every Vehicle Type Covered</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
              Real car categories, real clearing workflows.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/65">
            OLADECK Global Services focuses on the everyday imported cars Nigerian buyers and dealers actually move: sedans, compact SUVs, buses, pickups, and family vans.
          </p>
        </div>
      </div>
      <div className="mt-10 flex gap-5 overflow-hidden">
        <div className="showcase-marquee flex min-w-full gap-5 px-5">
          {[...vehicleShowcaseItems, ...vehicleShowcaseItems].map((vehicle, index) => (
            <Card
              key={`${vehicle.id}-${index}`}
              className="w-[280px] shrink-0 overflow-hidden border-white/10 bg-white/8 text-white shadow-glow"
            >
              <div className="h-44 overflow-hidden">
                <img src={vehicle.image} alt={vehicle.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <CardContent className="p-4">
                <Badge className="border-white/15 bg-white/10 text-gold">{vehicle.category}</Badge>
                <h3 className="mt-3 font-semibold">{vehicle.name}</h3>
                <p className="mt-2 text-sm leading-6 text-white/65">{vehicle.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
