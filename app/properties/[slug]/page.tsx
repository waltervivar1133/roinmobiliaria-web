import { notFound } from "next/navigation";
import { getPropertyBySlug, getRelatedProperties } from "@/services/properties/properties.service";
import PropertyImageSlider from "@/components/PropertyImageSlider";
import PropertyDescription from "@/components/PropertyDescription";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyMap from "@/components/PropertyMap";
import RelatedProperties from "@/components/RelatedProperties";
import type { Property } from "@/types/property";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let property: Property | null = null;
  let relatedProperties: Property[] = [];

  try {
    const propertyData = await getPropertyBySlug(slug);
    property = propertyData.product;

    if (!property) {
      notFound();
    }

    // Get related properties
    const relatedData = await getRelatedProperties(property, 3);
    relatedProperties = relatedData.products.nodes;
  } catch (error) {
    console.error("Error fetching property:", error);
    notFound();
  }

  // Prepare images for slider
  const images = property.galleryImages?.nodes || [];
  if (property.image) {
    // Add main image at the beginning if not in gallery
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

  // Get property type (tag)
  const propertyType = property.productCategories?.nodes[0]?.name || "Property";

  return (
    <div className="min-h-screen bg-white">
      {/* Header with title and tag */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h1
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ color: "#1C3E7C" }}
              >
                {property.name}
              </h1>
              <p className="text-gray-600">
                {property.productos?.direccion || "Location not specified"}
              </p>
            </div>
            <div
              className="px-6 py-2 rounded text-white font-semibold"
              style={{ backgroundColor: "#1C3E7C" }}
            >
              {propertyType}
            </div>
          </div>
        </div>
      </div>

      {/* Image slider */}
      {images.length > 0 && (
        <PropertyImageSlider images={images} propertyName={property.name} />
      )}

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="space-y-8">
          {/* Description */}
          {property.description && (
            <PropertyDescription
              description={property.description}
              shortDescription={property.shortDescription}
            />
          )}

          {/* Details and Characteristics */}
          <PropertyDetails
            details={property.productos?.detalles}
            characteristics={property.productos?.caracteristicas}
          />
        </div>

        {/* Location map */}
        {property.productos?.ubicacion?.latitude &&
          property.productos?.ubicacion?.longitude && (
            <div className="mt-12">
              <PropertyMap
                location={property.productos.ubicacion}
                address={property.productos.direccion}
              />
            </div>
          )}

        {/* Related properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-16">
            <RelatedProperties properties={relatedProperties} />
          </div>
        )}
      </div>
    </div>
  );
}
