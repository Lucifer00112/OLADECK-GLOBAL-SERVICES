import type { Metadata } from "next";
import Link from "next/link";
import { Ship } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts, portUpdates, resources } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog & Resources — OLADECK Global Services",
  description: "Vehicle import guides, customs updates, port notices, and buying advice for Nigeria."
};

export default function BlogPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-pad">
        <div className="max-w-3xl">
          <span className="accent-line" />
          <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Blog & Resources</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Clear guidance for imported vehicle owners.
          </h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Practical guides, duty calculation tips, port updates, and customs advice to help you navigate the Nigerian vehicle import process with confidence.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="service-card overflow-hidden transition hover:-translate-y-1 hover:shadow-lifted group">
              <div className="h-44 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
              </div>
              <CardContent className="p-5">
                <Badge className="bg-gold/12 text-gold border-gold/25 text-[10px] font-bold uppercase tracking-wider">{post.category}</Badge>
                <h2 className="mt-3 text-base font-bold text-navy leading-snug">{post.title}</h2>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                <p className="mt-4 text-[11px] text-muted-foreground">{post.date} · {post.readTime}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-navy">Port Announcements</h2>
              <div className="mt-5 grid gap-4">
                {portUpdates.length ? portUpdates.map((update) => (
                  <div key={update.title} className="rounded-lg border border-border p-4">
                    <p className="text-[10px] font-bold text-gold uppercase">{update.date}</p>
                    <p className="mt-1 font-bold text-sm text-navy">{update.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{update.body}</p>
                  </div>
                )) : (
                  <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground text-center">
                    No live port notices at this time.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-navy">Downloadable Guides</h2>
              <div className="mt-5 grid gap-2">
                {resources.map((resource) => (
                  <Link key={resource} href="/contact" className="flex items-center gap-3 rounded-lg border border-border bg-white p-3.5 text-sm font-medium text-navy hover:bg-muted hover:border-gold/40 transition">
                    <span className="h-8 w-8 rounded-md bg-gold/12 flex items-center justify-center text-gold text-xs font-bold shrink-0">PDF</span>
                    {resource}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
