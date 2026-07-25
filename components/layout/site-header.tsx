"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, ShipWheel, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { whatsappUrl } from "@/lib/utils";

const navItems = [
  ["Services", "/#services"],
  ["How It Works", "/#process"],
  ["Vehicle Catalog", "/#catalog"],
  ["Gallery", "/#gallery"],
  ["Blog", "/blog"],
  ["Track", "/track"],
  ["Admin", "/admin"]
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-xl">
      <div className="container-pad flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-navy text-white shadow-glow">
            <ShipWheel className="h-5 w-5 text-gold" />
          </span>
          <span className="leading-tight">
            MG Enterprises
            <span className="block text-xs font-medium text-muted-foreground">Nigeria Clearing</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/quote">Get a Quote</Link>
          </Button>
          <Button asChild variant="secondary" size="icon" aria-label="Chat on WhatsApp">
            <a href={whatsappUrl("Hello MG Enterprises, I need help clearing an imported vehicle.")}>
              <MessageCircle className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen ? (
        <div className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-2xl lg:hidden">
          <div className="container-pad flex flex-col gap-6 py-6">
            <nav className="flex flex-col gap-2">
              {navItems.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-lg font-medium text-foreground transition hover:bg-muted"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="grid gap-3 pt-4 border-t">
              <Button asChild size="lg" className="w-full">
                <Link href="/quote" onClick={() => setMobileMenuOpen(false)}>
                  Get a Clearing Quote
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <a
                  href={whatsappUrl("Hello MG Enterprises, I need assistance with vehicle clearing.")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
