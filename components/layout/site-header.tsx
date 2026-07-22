import Link from "next/link";
import { Menu, MessageCircle, ShipWheel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { whatsappUrl } from "@/lib/utils";

const navItems = [
  ["Services", "/#services"],
  ["How It Works", "/#process"],
  ["Gallery", "/#gallery"],
  ["Blog", "/blog"],
  ["Track", "/track"],
  ["Contact", "/contact"]
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/82 backdrop-blur-xl">
      <div className="container-pad flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-navy text-white shadow-glow">
            <ShipWheel className="h-5 w-5 text-gold" />
          </span>
          <span className="leading-tight">
            MG Enterprises
            <span className="block text-xs font-medium text-muted-foreground">Nigeria</span>
          </span>
        </Link>

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
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
