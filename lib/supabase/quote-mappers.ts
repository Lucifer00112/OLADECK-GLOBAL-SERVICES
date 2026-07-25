import type { PriceItem, QuoteRecord } from "@/lib/types";
import { vehicleCatalog } from "@/lib/vehicle-catalog";

type QuoteRow = {
  tracking_number: string;
  status: QuoteRecord["status"];
  customer_name: string;
  phone?: string | null;
  email?: string | null;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
  estimated_completion?: string | null;
  quoted_price?: number | string | null;
  notes?: string | null;
  arrival_date?: string | null;
};

type PriceRow = {
  id: string;
  service: string;
  base_price: number | string;
  unit: string;
  description: string;
};

export function estimateCompletionText(date?: string | null) {
  if (!date) {
    return "5-6 working days after the vehicle arrives in Nigeria, sometimes more if port or customs delays occur.";
  }

  return `Normally 5-6 working days after arrival in Nigeria. Current arrival date on file: ${date}.`;
}

export function mapQuoteRow(row: QuoteRow): QuoteRecord {
  const vehicleName = `${row.vehicle_make} ${row.vehicle_model}`;
  const matchingCar = vehicleCatalog.find((car) =>
    vehicleName.toLowerCase().includes(`${car.brand} ${car.model}`.toLowerCase())
  );

  return {
    trackingNumber: row.tracking_number,
    customer: row.customer_name,
    phone: row.phone ?? undefined,
    email: row.email ?? undefined,
    vehicle: `${row.vehicle_year} ${vehicleName}`,
    status: row.status,
    estimatedCompletion: estimateCompletionText(row.arrival_date ?? row.estimated_completion),
    image: matchingCar?.image,
    quotedPrice: row.quoted_price ? Number(row.quoted_price) : undefined,
    notes: row.notes ?? undefined
  };
}

export function mapPriceRow(row: PriceRow): PriceItem {
  return {
    id: row.id,
    service: row.service,
    basePrice: Number(row.base_price),
    unit: row.unit,
    description: row.description
  };
}
