import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <section className="container-pad py-16">
      <Card>
        <CardContent className="grid gap-4 p-6">
          <div className="h-8 w-1/2 animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded-lg bg-muted" />
          <div className="h-56 animate-pulse rounded-lg bg-muted" />
        </CardContent>
      </Card>
    </section>
  );
}
