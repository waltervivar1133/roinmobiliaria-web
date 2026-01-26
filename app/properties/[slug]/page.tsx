import { notFound } from "next/navigation";
import { getPropertyBySlug, getRelatedProperties } from "@/services/properties/properties.service";
import PropertyImageSlider from "@/components/PropertyImageSlider";
import PropertyInfo from "@/components/PropertyInfo";
import PropertyMapWrapper from "@/components/PropertyMapWrapper";
import RelatedProperties from "@/components/RelatedProperties";
import Link from "next/link";
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

    const relatedData = await getRelatedProperties(property, 3);
    relatedProperties = relatedData.products.nodes;
  } catch (error) {
    console.error("Error fetching property:", error);
    notFound();
  }

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

  return (
    <div className="min-h-screen bg-white">
      {/* Main container with max-w-7xl */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 pb-32 lg:pb-8">
        {/* Back button */}
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 font-medium hover:opacity-80 transition-opacity mb-6 md:mb-8 group text-primary-green"
        >
          <div className="w-4 h-4 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-transform group-hover:-translate-x-1 bg-primary-green">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="text-sm md:text-md">Volver a propiedades</span>
        </Link>

        {/* Image slider */}
        {images.length > 0 && (
          <PropertyImageSlider images={images} propertyName={property.name} />
        )}

        {/* Property info section */}
        <PropertyInfo property={property} />

        {/* Location map */}
        {property.productos?.ubicacion?.latitude &&
          property.productos?.ubicacion?.longitude && (
            <div className="mt-12">
              <PropertyMapWrapper
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
