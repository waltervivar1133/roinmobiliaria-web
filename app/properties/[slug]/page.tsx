import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPropertyBySlugCached,
  getRelatedProperties,
} from "@/services/properties/properties.service";
import PropertyImageSlider from "@/components/properties/PropertyImageSlider";
import PropertyInfo from "@/components/properties/PropertyInfo";
import PropertyMapWrapper from "@/components/properties/PropertyMapWrapper";
import RelatedProperties from "@/components/properties/RelatedProperties";
import BackButton from "@/components/ui/BackButton";
import JsonLd from "@/components/seo/JsonLd";
import { preparePropertyImages, hasLocation } from "@/utils/property";
import { absoluteUrl } from "@/lib/site";
import { stripHtml } from "@/lib/seo/strip-html";
import { buildPropertyJsonLd } from "@/lib/seo/property-jsonld";
import type { Property } from "@/types/property";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { product } = await getPropertyBySlugCached(slug);
    if (!product) {
      return { title: "Propiedad no encontrada" };
    }

    const description =
      stripHtml(product.shortDescription || product.description, 155) ||
      `${product.name} — Propiedad en venta o alquiler. RO Inmobiliaria, Perú.`;

    const url = absoluteUrl(`/properties/${slug}`);
    const ogImage = product.image?.sourceUrl;

    return {
      title: product.name,
      description,
      alternates: { canonical: url },
      openGraph: {
        title: product.name,
        description,
        url,
        type: "website",
        images: ogImage ? [{ url: ogImage, alt: product.image?.altText || product.name }] : undefined,
      },
      twitter: {
        card: ogImage ? "summary_large_image" : "summary",
        title: product.name,
        description,
        images: ogImage ? [ogImage] : undefined,
      },
    };
  } catch {
    return { title: "Propiedad no encontrada" };
  }
}

async function fetchPropertyData(slug: string): Promise<{
  property: Property;
  relatedProperties: Property[];
}> {
  const propertyData = await getPropertyBySlugCached(slug);
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
      <JsonLd data={buildPropertyJsonLd(property)} />

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
