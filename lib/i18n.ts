export const defaultLocale = "en";

export const locales = ["en"] as const;

export type Locale = (typeof locales)[number];

export const dictionaries = {
  en: {
    quote: "Get a Quote",
    whatsapp: "Chat on WhatsApp",
    track: "Track Shipment"
  }
};
