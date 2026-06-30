import type { MetadataRoute } from "next";
import { allRoutes, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes
    .filter((route) => !route.noindex)
    .map((route) => ({
      url: new URL(route.path, site.url).toString(),
      lastModified: route.lastModified ? new Date(route.lastModified) : new Date(),
      changeFrequency: route.type === "post" ? "monthly" : "weekly",
      priority:
        route.path === "/"
          ? 1
          : route.type === "product"
            ? 0.9
            : route.type === "post"
              ? 0.7
              : 0.8,
    }));
}
