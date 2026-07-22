export type ClearingStatus =
  | "Received"
  | "Pending"
  | "Received by Customer";

export type GalleryItem = {
  id: string;
  vehicle: string;
  year: number;
  port: string;
  completedAt: string;
  category: "SUVs" | "Sedans" | "Luxury" | "Commercial" | "Electric Vehicles";
  image: string;
};

export type QuoteRecord = {
  trackingNumber: string;
  customer: string;
  vehicle: string;
  status: ClearingStatus;
  estimatedCompletion: string;
  image?: string;
  quotedPrice?: number;
  phone?: string;
  email?: string;
  notes?: string;
};

export type VehicleShowcaseItem = {
  id: string;
  name: string;
  category: GalleryItem["category"];
  image: string;
  note: string;
};

export type PriceItem = {
  id: string;
  service: string;
  basePrice: number;
  unit: string;
  description: string;
};

export type CommonCar = {
  make: string;
  model: string;
  type: "Sedan" | "Hatchback" | "SUV" | "Minivan" | "Pickup" | "Bus";
  years: string;
  image: string;
};

export type VehicleCatalogEntry = {
  id: string;
  brand: string;
  model: string;
  generation: string;
  yearFrom: number;
  yearTo: number | "Present";
  bodyType: "Sedan" | "Hatchback" | "SUV" | "Minivan" | "Pickup" | "Bus" | "Truck" | "Coupe" | "Wagon" | "Van";
  fuel: "Petrol" | "Diesel" | "Hybrid" | "Electric" | "Petrol/Hybrid" | "Petrol/Diesel";
  origin: string;
  image: string;
};
