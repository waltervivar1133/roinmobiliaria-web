import PropertiesSection from "@/components/PropertiesSection";
import type { Property } from "@/types/property";

interface RelatedPropertiesProps {
  properties: Property[];
}

export default function RelatedProperties({
  properties,
}: RelatedPropertiesProps) {
  if (properties.length === 0) {
    return null;
  }

  return (
    <PropertiesSection
      properties={properties}
      title="Propiedades Relacionadas"
      description="Descubre otras propiedades que podrían interesarte"
      showViewMore={false}
    />
  );
}
