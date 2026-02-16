import type { Property, PropertyImage } from "@/types/property";

export function preparePropertyImages(property: Property): PropertyImage[] {
  const images = property.galleryImages?.nodes || [];

  if (property.image) {
    const hasMainImage = images.some(
      (img) => img.sourceUrl === property.image?.sourceUrl
    );
    if (!hasMainImage) {
      images.unshift({
        sourceUrl: property.image.sourceUrl,
        altText: property.image.altText || property.name,
      });
    }
  }

  return images;
}

export function getPropertyLocation(property: Property): string {
  return property.productos?.direccion || "Ubicación no especificada";
}

export function hasLocation(property: Property): boolean {
  return !!(
    property.productos?.ubicacion?.latitude &&
    property.productos?.ubicacion?.longitude
  );
}
