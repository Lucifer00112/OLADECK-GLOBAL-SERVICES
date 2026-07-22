import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(value);
}

export function generateTrackingNumber(sequence = 1) {
  return `CLR-${new Date().getFullYear()}-${String(sequence).padStart(6, "0")}`;
}

export function whatsappUrl(message: string) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348172973820";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
