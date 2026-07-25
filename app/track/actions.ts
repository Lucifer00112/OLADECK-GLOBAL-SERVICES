"use server";

import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { mapQuoteRow } from "@/lib/supabase/quote-mappers";
import type { QuoteRecord } from "@/lib/types";

const trackingSchema = z.string().trim().min(4).max(64);

export async function getTrackingRecordAction(trackingNumber: string): Promise<{
  ok: boolean;
  supabaseConfigured: boolean;
  record?: QuoteRecord;
  message?: string;
}> {
  const parsed = trackingSchema.safeParse(trackingNumber);
  if (!parsed.success) {
    return {
      ok: false,
      supabaseConfigured: Boolean(createSupabaseAdminClient()),
      message: "Enter a valid tracking number."
    };
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return {
      ok: false,
      supabaseConfigured: false,
      message: "Supabase is not configured yet."
    };
  }

  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .eq("tracking_number", parsed.data)
    .maybeSingle();

  if (error) {
    return { ok: false, supabaseConfigured: true, message: error.message };
  }

  return {
    ok: Boolean(data),
    supabaseConfigured: true,
    record: data ? mapQuoteRow(data) : undefined,
    message: data ? undefined : "No live request found for that tracking number."
  };
}

export async function markVehicleReceivedAction(trackingNumber: string) {
  const parsed = trackingSchema.safeParse(trackingNumber);
  if (!parsed.success) {
    return { ok: false, message: "Enter a valid tracking number." };
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return { ok: false, message: "Supabase is not configured yet." };
  }

  const { data, error } = await supabase
    .from("quotes")
    .update({ status: "Received by Customer" })
    .eq("tracking_number", parsed.data)
    .select("id")
    .single();

  if (error) {
    return { ok: false, message: error.message };
  }

  await supabase.from("tracking_events").insert({
    quote_id: data.id,
    status: "Received by Customer",
    note: "Customer confirmed vehicle receipt."
  });

  return { ok: true, message: "Vehicle receipt confirmed." };
}
