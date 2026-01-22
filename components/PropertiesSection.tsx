import PropertyCard from "./PropertyCard";
import SectionHeader from "./SectionHeader";
import type { Property } from "@/types/property";

interface PropertiesSectionProps {
  properties: Property[];
  title: string;
  description?: string;
  badge?: string;
  badgeColor?: string;
  showViewMore?: boolean;
  viewMoreLink?: string;
  viewMoreText?: string;
  columns?: 1 | 2 | 3 | 4;
  paddingY?: "sm" | "md" | "lg" | "xl";
  paddingX?: "sm" | "md" | "lg" | "xl";
  backgroundColor?: "white" | "gray" | "transparent";
}

export default function PropertiesSection({
  properties,
  title,
  description,
  badge,
  badgeColor,
  showViewMore = true,
  viewMoreLink = "/properties",
  viewMoreText = "Ver más",
  columns = 3,
  paddingY = "md",
  paddingX = "md",
  backgroundColor = "white",
}: PropertiesSectionProps) {
  if (properties.length === 0) {
    return null;
  }

  const getLocation = (property: Property): string => {
    const { ubicacion, direccion } = property.productos || {};
    if (ubicacion?.city) {
      return ubicacion.country
        ? `${ubicacion.city}, ${ubicacion.country}`
        : ubicacion.city;
    }
    return direccion || "Ubicación no especificada";
  };

  const getAreaTotal = (property: Property): number | undefined => {
    const areaTotal = property.productos?.detalles?.areaTotal;
    if (areaTotal === null || areaTotal === undefined) {
      return undefined;
    }
    if (typeof areaTotal === "string") {
      return parseFloat(areaTotal);
    }
    return areaTotal;
  };

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const paddingYClasses = {
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
    xl: "py-20",
  };

  const paddingXClasses = {
    sm: "px-4",
    md: "px-4 md:px-8",
    lg: "px-6 md:px-12",
    xl: "px-8 md:px-16",
  };

  const backgroundColorClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    transparent: "bg-transparent",
  };

  return (
    <section className={`${paddingYClasses[paddingY]} ${paddingXClasses[paddingX]} ${backgroundColorClasses[backgroundColor]}`}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge={badge}
          badgeColor={badgeColor}
          title={title}
          description={description}
          showViewMore={showViewMore}
          viewMoreLink={viewMoreLink}
          viewMoreText={viewMoreText}
        />

        <div className={`grid ${gridCols[columns]} gap-8`}>
          {properties.map((property) => {
            const category = property.productCategories?.nodes[0]?.name;
            return (
              <PropertyCard
                key={property.id}
                id={property.id}
                slug={property.slug}
                name={property.name}
                imageUrl={property.image?.sourceUrl || ""}
                imageAlt={property.image?.altText || property.name}
                location={getLocation(property)}
                dolares={property.productos?.detalles?.dolares || property.productos?.dolares}
                soles={property.productos?.detalles?.soles}
                areaTotal={getAreaTotal(property)}
                category={category}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
