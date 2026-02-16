import { notFound } from "next/navigation";
import { getPropertyBySlug, getRelatedProperties } from "@/services/properties/properties.service";
import PropertyImageSlider from "@/components/PropertyImageSlider";
import PropertyInfo from "@/components/PropertyInfo";
import PropertyMapWrapper from "@/components/PropertyMapWrapper";
import RelatedProperties from "@/components/RelatedProperties";
import BackButton from "@/components/BackButton";
import { preparePropertyImages, hasLocation } from "@/utils/property";
import type { Property } from "@/types/property";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function fetchPropertyData(slug: string): Promise<{
  property: Property;
  relatedProperties: Property[];
}> {
  const propertyData = await getPropertyBySlug(slug);
  const property = propertyData.product;

  if (!property) {
    notFound();
  }

  const relatedData = await getRelatedProperties(property, 3);
  
  return {
    property,
    relatedProperties: relatedData.products.nodes,
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let property: Property;
  let relatedProperties: Property[] = [];

  try {
    const data = await fetchPropertyData(slug);
    property = data.property;
    relatedProperties = data.relatedProperties;
  } catch (error) {
    console.error("Error fetching property:", error);
    notFound();
  }

  const images = preparePropertyImages(property);
  const showMap = hasLocation(property);
  const showRelated = relatedProperties.length > 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 pb-32 lg:pb-8">
        <BackButton />

        {images.length > 0 && (
          <PropertyImageSlider images={images} propertyName={property.name} />
        )}

        <PropertyInfo property={property} />

        {showMap && (
          <div className="mt-12">
            <PropertyMapWrapper
              location={property.productos!.ubicacion!}
              address={property.productos?.direccion}
            />
          </div>
        )}

        {showRelated && (
          <div className="mt-16">
            <RelatedProperties properties={relatedProperties} />
          </div>
        )}
      </div>
    </div>
  );
}
