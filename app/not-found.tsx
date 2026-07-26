import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-16 px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-navy/8">
          <span className="text-5xl font-extrabold text-navy">404</span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-navy">Page Not Found</h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved. Head back to our homepage or track your shipment.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy/90 transition"
          >
            <Home className="h-4 w-4" /> Go to Homepage
          </Link>
          <Link
            href="/track"
            className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-navy hover:bg-muted transition"
          >
            <Search className="h-4 w-4" /> Track Shipment
          </Link>
        </div>
      </div>
    </section>
  );
}
