"use server";

import { z } from "zod";
import {
  clearAdminSession,
  isAdminAuthenticated,
  isAdminPasswordConfigured,
  verifyOtpAndCreateSession,
  verifyPasscodeAndRequestOtp
} from "@/lib/admin-auth";
import { defaultPriceList } from "@/lib/data";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { mapPriceRow, mapQuoteRow } from "@/lib/supabase/quote-mappers";
import type { ClearingStatus, PriceItem, QuoteRecord } from "@/lib/types";

const statusSchema = z.enum(["Received", "Pending", "Received by Customer"]);
const quotePriceSchema = z.object({
  trackingNumber: z.string().min(4),
  quotedPrice: z.coerce.number().min(0)
});
const servicePriceSchema = z.object({
  id: z.string().min(2),
  service: z.string().min(2),
  basePrice: z.coerce.number().min(0),
  unit: z.string().min(1),
  description: z.string().min(2)
});

export type AdminDashboardPayload = {
  authenticated: boolean;
  passwordConfigured: boolean;
  supabaseConfigured: boolean;
  quotes: QuoteRecord[];
  priceList: PriceItem[];
  message?: string;
};

export async function getAdminSessionStatus() {
  return {
    authenticated: await isAdminAuthenticated(),
    passwordConfigured: isAdminPasswordConfigured()
  };
}

export async function verifyPasscodeAction(password: string) {
  return verifyPasscodeAndRequestOtp(password);
}

export async function verifyOtpAction(otpCode: string) {
  return verifyOtpAndCreateSession(otpCode);
}

export async function logoutAdminDashboard() {
  await clearAdminSession();
  return { ok: true };
}

export async function loadAdminDashboardData(): Promise<AdminDashboardPayload> {
  const authenticated = await isAdminAuthenticated();
  const passwordConfigured = isAdminPasswordConfigured();

  if (!authenticated) {
    return {
      authenticated: false,
      passwordConfigured,
      supabaseConfigured: false,
      quotes: [],
      priceList: defaultPriceList,
      message: "Please sign in to access the admin dashboard."
    };
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return {
      authenticated: true,
      passwordConfigured,
      supabaseConfigured: false,
      quotes: [],
      priceList: defaultPriceList,
      message: "Add Supabase URL, anon key, and service role key in .env.local for live database sync."
    };
  }

  const [{ data: quoteRows, error: quoteError }, { data: priceRows, error: priceError }] =
    await Promise.all([
      supabase.from("quotes").select("*").order("created_at", { ascending: false }).limit(500),
      supabase
        .from("service_prices")
        .select("id, service, base_price, unit, description")
        .eq("active", true)
        .order("service")
    ]);

  return {
    authenticated: true,
    passwordConfigured,
    supabaseConfigured: true,
    quotes: quoteRows ? quoteRows.map(mapQuoteRow) : [],
    priceList: priceRows?.length ? priceRows.map(mapPriceRow) : defaultPriceList,
    message: quoteError?.message || priceError?.message
  };
}

export async function updateQuoteStatusAction(trackingNumber: string, status: ClearingStatus) {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, message: "Admin access is required." };
  }

  const parsedStatus = statusSchema.safeParse(status);
  if (!parsedStatus.success) {
    return { ok: false, message: "Invalid status." };
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return { ok: false, message: "Supabase is not configured." };
  }

  const { data, error } = await supabase
    .from("quotes")
    .update({ status: parsedStatus.data })
    .eq("tracking_number", trackingNumber)
    .select("id")
    .single();

  if (error) {
    return { ok: false, message: error.message };
  }

  await supabase.from("tracking_events").insert({
    quote_id: data.id,
    status: parsedStatus.data,
    note: `Status updated to ${parsedStatus.data} from the admin dashboard.`
  });

  return { ok: true, message: "Status updated successfully." };
}

export async function updateQuotePriceAction(input: {
  trackingNumber: string;
  quotedPrice: number;
}) {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, message: "Admin access is required." };
  }

  const parsed = quotePriceSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid quote price." };
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return { ok: false, message: "Supabase is not configured." };
  }

  const { error } = await supabase
    .from("quotes")
    .update({ quoted_price: parsed.data.quotedPrice })
    .eq("tracking_number", parsed.data.trackingNumber);

  return error
    ? { ok: false, message: error.message }
    : { ok: true, message: "Quote price saved successfully." };
}

export async function saveServicePricesAction(prices: PriceItem[]) {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, message: "Admin access is required." };
  }

  const parsed = z.array(servicePriceSchema).safeParse(prices);
  if (!parsed.success) {
    return { ok: false, message: "One or more service prices are invalid." };
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return { ok: false, message: "Supabase is not configured." };
  }

  const { error } = await supabase.from("service_prices").upsert(
    parsed.data.map((item) => ({
      id: item.id,
      service: item.service,
      base_price: item.basePrice,
      unit: item.unit,
      description: item.description,
      active: true
    }))
  );

  return error
    ? { ok: false, message: error.message }
    : { ok: true, message: "Service prices saved to Supabase." };
}

export async function resetServicePricesAction() {
  return saveServicePricesAction(defaultPriceList);
}
