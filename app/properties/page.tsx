import { getAllProperties } from "@/services/properties/properties.service";
import PropertiesSection from "@/components/PropertiesSection";
import type { Property } from "@/types/property";

export const metadata = {
  title: "Propiedades | RO Inmobiliaria",
  description: "Explora todas nuestras propiedades disponibles. Departamentos, terrenos y más opciones para ti.",
};

export default async function PropertiesPage() {
  let properties: Property[] = [];

  try {
    const propertiesData = await getAllProperties(100);
    properties = propertiesData.products?.nodes || [];
  } catch (error) {
    console.error("Error fetching properties:", error);
  }

  return (
    <div className=" bg-white">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <h1 className="text-md md:text-xl lg:text-2xl font-bold mb-4 text-primary-blue">
            Todas las Propiedades
          </h1>
          <p className="text-sm md:text-base lg:text-base text-gray-600 max-w-2xl">
            Descubre nuestra selección completa de propiedades disponibles.
            Encuentra el lugar perfecto para ti.
          </p>
          {properties.length > 0 && (
            <p className="text-sm md:text-sm lg:text-sm text-gray-500 mt-2">
              {properties.length} {properties.length === 1 ? "propiedad disponible" : "propiedades disponibles"}
            </p>
          )}
        </div>
      </div>

      {properties.length > 0 ? (
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
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No hay propiedades disponibles en este momento.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
