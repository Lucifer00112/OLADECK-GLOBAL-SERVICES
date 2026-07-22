import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts, portUpdates, resources } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resource Center",
  description: "Vehicle import guides, customs updates, port notices, and buying advice for Nigeria."
};

export default function BlogPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-pad">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Blog & Resources</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
            Clear guidance for imported vehicle owners.
          </h1>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="transition hover:-translate-y-1 hover:shadow-glow">
              <CardContent className="p-6">
                <Badge>{post.category}</Badge>
                <h2 className="mt-4 text-xl font-semibold">{post.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                <p className="mt-5 text-xs text-muted-foreground">{post.date} · {post.readTime}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Port Announcements</h2>
              <div className="mt-5 grid gap-4">
                {portUpdates.length ? portUpdates.map((update) => (
                  <div key={update.title} className="rounded-lg border p-4">
                    <p className="text-xs font-semibold text-gold">{update.date}</p>
                    <p className="mt-2 font-semibold">{update.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{update.body}</p>
                  </div>
                )) : (
                  <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                    No live port notice has been posted yet.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Downloadable Guides</h2>
              <div className="mt-5 grid gap-3">
                {resources.map((resource) => (
                  <a key={resource} href="/contact" className="rounded-lg border p-4 text-sm font-medium transition hover:bg-muted">
                    {resource}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
