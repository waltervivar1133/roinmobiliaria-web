import type { Property } from "@/types/property";
import { absoluteUrl } from "@/lib/site";
import { preparePropertyImages } from "@/utils/property";
import { stripHtml } from "./strip-html";

function parsePrice(raw: string | null | undefined): number | undefined {
  if (!raw || raw === "null") return undefined;
  const n = parseFloat(String(raw).replace(/,/g, "").trim());
  return Number.isFinite(n) ? n : undefined;
}

export function buildPropertyJsonLd(property: Property): Record<string, unknown> {
  const url = absoluteUrl(`/properties/${property.slug}`);
  const images = preparePropertyImages(property).map((i) => i.sourceUrl);
  const desc = stripHtml(
    property.shortDescription || property.description,
    5000
  );

  const priceUsd = parsePrice(property.productos?.detalles?.dolares);
  const pricePen = parsePrice(property.productos?.detalles?.soles);
  const offer =
    priceUsd != null
      ? { priceCurrency: "USD", price: priceUsd }
      : pricePen != null
        ? { priceCurrency: "PEN", price: pricePen }
        : undefined;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.name,
    description: desc || property.name,
    url,
    sku: String(property.databaseId),
    image: images.length ? images : undefined,
  };

  if (offer) {
    schema.offers = {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: offer.priceCurrency,
      price: offer.price,
      url,
    };
  }

  return schema;
}
