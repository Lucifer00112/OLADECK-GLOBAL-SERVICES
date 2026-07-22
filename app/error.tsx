"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-pad grid min-h-[60vh] place-items-center py-16 text-center">
      <div className="max-w-md">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Something went wrong</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal">The page could not load.</h1>
        <p className="mt-3 text-muted-foreground">Please retry. If this keeps happening, contact operations support.</p>
        <Button className="mt-6" onClick={reset}>Retry</Button>
      </div>
    </section>
  );
}
