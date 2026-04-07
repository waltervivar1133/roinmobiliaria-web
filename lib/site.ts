const DEFAULT_SITE_URL = "https://roinmobiliaria.com";

/**
 * URL canónica del sitio (SEO, Open Graph, sitemap).
 * Definir NEXT_PUBLIC_SITE_URL en producción si el dominio cambia.
 */
export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;
  return url.replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
