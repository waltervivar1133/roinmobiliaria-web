import { getAllProperties } from "@/services/properties/properties.service";
import PropertiesSection from "@/components/PropertiesSection";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import type { Property } from "@/types/property";

export const metadata = {
  title: "Propiedades | RO Inmobiliaria",
  description: "Explora todas nuestras propiedades disponibles. Departamentos, terrenos y más opciones para ti.",
};

async function fetchProperties(): Promise<Property[]> {
  try {
    const data = await getAllProperties(100);
    return data.products?.nodes || [];
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export default async function PropertiesPage() {
  const properties = await fetchProperties();
  const hasProperties = properties.length > 0;

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="Todas las Propiedades"
        description="Descubre nuestra selección completa de propiedades disponibles. Encuentra el lugar perfecto para ti."
        count={properties.length}
        countLabel={{ singular: "propiedad disponible", plural: "propiedades disponibles" }}
      />

      {hasProperties ? (
        <PropertiesSection
          properties={properties}
          title=""
          description=""
          showViewMore={false}
          columns={3}
          paddingY="sm"
          paddingX="sm"
          backgroundColor="white"
        />
      ) : (
        <EmptyState
          title="Sin propiedades"
          description="No hay propiedades disponibles en este momento. Vuelve pronto para ver nuevas opciones."
        />
      )}
    </div>
  );
}
