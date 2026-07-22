import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-pad grid min-h-[60vh] place-items-center py-16 text-center">
      <div className="max-w-md">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal">This page is not available.</h1>
        <p className="mt-3 text-muted-foreground">Head back to the clearing platform or start a quote request.</p>
        <Button className="mt-6" asChild><Link href="/">Go Home</Link></Button>
      </div>
    </section>
  );
}
