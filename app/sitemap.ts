import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import {
  fetchAllPropertySlugs,
  fetchAllPostSlugs,
} from "@/lib/seo/sitemap-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/properties",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/properties" || path === "/blog" ? 0.9 : 0.8,
  }));

  let propertySlugs: string[] = [];
  let postSlugs: string[] = [];

  try {
    [propertySlugs, postSlugs] = await Promise.all([
      fetchAllPropertySlugs(),
      fetchAllPostSlugs(),
    ]);
  } catch {
    // Si GraphQL falla en build/ISR, devolvemos al menos rutas estáticas
  }

  const propertyEntries: MetadataRoute.Sitemap = propertySlugs.map((slug) => ({
    url: `${base}/properties/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const blogEntries: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...propertyEntries, ...blogEntries];
}
