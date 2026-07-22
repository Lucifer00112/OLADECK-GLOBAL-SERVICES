import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return ["", "/quote", "/track", "/blog", "/contact", "/privacy", "/terms"].map((path) => {
    const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
      path === "" ? "weekly" : "monthly";

    return {
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority: path === "" ? 1 : 0.7
    };
  });
}
