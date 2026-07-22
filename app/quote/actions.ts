"use server";

import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { generateTrackingNumber, whatsappUrl } from "@/lib/utils";

const quoteSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  company: z.string().optional(),
  carType: z.string().min(2),
  modelYear: z.coerce.number().int().min(1980).max(2035),
  manufacturer: z.string().optional(),
  model: z.string().optional(),
  year: z.coerce.number().optional(),
  countryPurchased: z.string().min(2),
  vin: z.string().min(5),
  condition: z.string().min(2),
  engineSize: z.string().min(1),
  fuelType: z.string().min(2),
  transmission: z.string().min(2),
  port: z.string().min(2),
  shippingLine: z.string().optional(),
  containerNumber: z.string().optional(),
  billOfLading: z.string().min(3),
  arrivalDate: z.string().min(4),
  notes: z.string().optional()
});

export type QuoteActionState = {
  ok: boolean;
  message: string;
  trackingNumber?: string;
  whatsappLink?: string;
  quote?: {
    trackingNumber: string;
    customer: string;
    phone: string;
    email: string;
    vehicle: string;
    status: "Received";
    estimatedCompletion: string;
    notes?: string;
  };
};

export async function submitQuote(
  _previousState: QuoteActionState,
  formData: FormData
): Promise<QuoteActionState> {
  const payload = Object.fromEntries(formData.entries());
  const parsed = quoteSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please review the highlighted fields and complete the required information."
    };
  }

  const sequence = Number(String(Date.now()).slice(-6));
  const trackingNumber = generateTrackingNumber(sequence);
  const supabase = createSupabaseAdminClient();
  const fileNames = formData
    .getAll("documents")
    .map((file) => {
      const maybeFile = file as { name?: string; size?: number };
      return maybeFile.name && maybeFile.size ? maybeFile.name : "";
    })
    .filter(Boolean);
  const vehicleParts = parsed.data.carType.split(" ");
  const vehicleMake = parsed.data.manufacturer || vehicleParts[0] || "Vehicle";
  const vehicleModel = parsed.data.model || vehicleParts.slice(1).join(" ") || parsed.data.carType;
  const vehicle = `${parsed.data.modelYear} ${parsed.data.carType}`;
  const estimatedCompletion = "5-6 working days after the vehicle arrives in Nigeria, sometimes more if port or customs delays occur.";

  if (supabase) {
    const { error } = await supabase.from("quotes").insert({
      tracking_number: trackingNumber,
      status: "Received",
      customer_name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      company: parsed.data.company,
      vehicle_make: vehicleMake,
      vehicle_model: vehicleModel,
      vehicle_year: parsed.data.modelYear,
      country_purchased: parsed.data.countryPurchased,
      vin: parsed.data.vin,
      vehicle_condition: parsed.data.condition,
      engine_size: parsed.data.engineSize,
      fuel_type: parsed.data.fuelType,
      transmission: parsed.data.transmission,
      port_of_arrival: parsed.data.port,
      shipping_line: parsed.data.shippingLine,
      container_number: parsed.data.containerNumber,
      bill_of_lading: parsed.data.billOfLading,
      arrival_date: parsed.data.arrivalDate,
      notes: parsed.data.notes
    });

    if (error) {
      return {
        ok: false,
        message: "The quote could not be saved. Please try again or contact support on WhatsApp."
      };
    }
  }

  const whatsappMessage = [
    "MG Enterprises import request",
    `Tracking: ${trackingNumber}`,
    `Customer: ${parsed.data.name}`,
    `Phone: ${parsed.data.phone}`,
    `Email: ${parsed.data.email}`,
    parsed.data.company ? `Company: ${parsed.data.company}` : "",
    `Vehicle: ${vehicle}`,
    `Country purchased: ${parsed.data.countryPurchased}`,
    `VIN/Chassis: ${parsed.data.vin}`,
    `Condition: ${parsed.data.condition}`,
    `Engine: ${parsed.data.engineSize}`,
    `Fuel: ${parsed.data.fuelType}`,
    `Transmission: ${parsed.data.transmission}`,
    `Port: ${parsed.data.port}`,
    parsed.data.shippingLine ? `Shipping line: ${parsed.data.shippingLine}` : "",
    parsed.data.containerNumber ? `Container: ${parsed.data.containerNumber}` : "",
    `Bill of lading: ${parsed.data.billOfLading}`,
    `Arrival date: ${parsed.data.arrivalDate}`,
    fileNames.length ? `Files selected: ${fileNames.join(", ")}` : "Files selected: customer will send in WhatsApp",
    parsed.data.notes ? `Notes: ${parsed.data.notes}` : "",
    "",
    "Please review this import request. Transactions and document follow-up will continue on WhatsApp."
  ]
    .filter(Boolean)
    .join("\n");

  return {
    ok: true,
    trackingNumber,
    whatsappLink: whatsappUrl(whatsappMessage),
    quote: {
      trackingNumber,
      customer: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      vehicle,
      status: "Received",
      estimatedCompletion,
      notes: parsed.data.notes
    },
    message:
      "Your request is ready. Send the prepared details to WhatsApp so MG Enterprises can continue the transaction there."
  };
}
