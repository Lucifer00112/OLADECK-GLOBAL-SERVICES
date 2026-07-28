import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AiAssistant } from "@/components/tools/ai-assistant";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "OLADECK Global Services | Vehicle Clearing and Forwarding",
    template: "%s | OLADECK Global Services"
  },
  description:
    "Premium Nigerian vehicle clearing and forwarding for imported cars, SUVs, luxury vehicles, auction cars, and corporate fleets.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png"
  },
  keywords: [
    "Nigeria vehicle clearing",
    "customs clearance",
    "imported cars Nigeria",
    "Lagos port clearing",
    "Tin Can vehicle clearance",
    "OLADECK Global Services"
  ],
  openGraph: {
    title: "Fast, Reliable & Trusted Vehicle Clearing Services in Nigeria",
    description:
      "Clear imported vehicles through Nigerian ports with speed, transparency, and professional support.",
    url: "/",
    siteName: "OLADECK Global Services",
    images: [
      {
        url: "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?auto=format&fit=crop&w=1600&q=80",
        width: 1600,
        height: 900,
        alt: "Cargo containers and port logistics"
      }
    ],
    locale: "en_NG",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "OLADECK Global Services",
    description: "Premium imported vehicle clearing and forwarding in Nigeria."
  },
  alternates: {
    canonical: "/"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1F3A"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "OLADECK Global Services",
    areaServed: "Nigeria",
    telephone: "+234 817 297 3820",
    email: "biona4real@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nigeria",
      addressCountry: "NG"
    },
    serviceType: "Vehicle customs clearing and forwarding"
  };

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <AiAssistant />
      </body>
    </html>
  );
}
