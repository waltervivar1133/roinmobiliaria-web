import { graphqlClient } from "../client";
import {
  GET_ALL_PROPERTIES,
  GET_FEATURED_PROPERTIES,
  GET_PROPERTY_BY_SLUG,
  GET_PROPERTY_BY_ID,
  GET_HOME_PROPERTIES,
  GET_RELATED_PROPERTIES,
} from "./properties.queries";
import type { Property } from "@/types/property";

export interface PropertiesResponse {
  products: {
    pageInfo?: {
      hasNextPage: boolean;
      endCursor?: string;
    };
    nodes: Property[];
  };
}

export interface PropertyResponse {
  product: Property;
}

/**
 * Obtiene todas las propiedades publicadas
 */
export async function getAllProperties(
  first: number = 100,
  after?: string
): Promise<PropertiesResponse> {
  return graphqlClient.request<PropertiesResponse>(GET_ALL_PROPERTIES, {
    first,
    after,
  });
}

/**
 * Obtiene propiedades destacadas
 */
export async function getFeaturedProperties(
  first: number = 6
): Promise<PropertiesResponse> {
  return graphqlClient.request<PropertiesResponse>(GET_FEATURED_PROPERTIES, {
    first,
  });
}

/**
 * Obtiene una propiedad por su slug
 */
export async function getPropertyBySlug(
  slug: string
): Promise<PropertyResponse> {
  return graphqlClient.request<PropertyResponse>(GET_PROPERTY_BY_SLUG, {
    slug,
  });
}

/**
 * Obtiene una propiedad por su ID
 */
export async function getPropertyById(
  id: number
): Promise<PropertyResponse> {
  return graphqlClient.request<PropertyResponse>(GET_PROPERTY_BY_ID, {
    id: id.toString(),
  });
}

/**
 * Obtiene propiedades optimizadas para el home
 */
export async function getHomeProperties(
  first: number = 6
): Promise<PropertiesResponse> {
  return graphqlClient.request<PropertiesResponse>(GET_HOME_PROPERTIES, {
    first,
  });
}

/**
 * Obtiene propiedades relacionadas por categoría
 * Si no hay propiedades en las mismas categorías, devuelve las últimas propiedades generales
 */
export async function getRelatedProperties(
  property: Property,
  first: number = 3
): Promise<PropertiesResponse> {
  // Obtener IDs de categorías de la propiedad actual
  const categoryIds =
    property.productCategories?.nodes.map((cat) => cat.id) || [];

  // Si hay categorías, buscar propiedades relacionadas
  if (categoryIds.length > 0) {
    try {
      const result = await graphqlClient.request<PropertiesResponse>(
        GET_RELATED_PROPERTIES,
        {
          first,
          categoryIds,
          excludeId: property.id,
        }
      );

      // Si encontramos propiedades relacionadas, las devolvemos
      if (result.products.nodes.length > 0) {
        return result;
      }
    } catch (error) {
      console.error("Error fetching related properties by category:", error);
    }
  }

  // Si no hay categorías o no se encontraron propiedades relacionadas,
  // devolver las últimas propiedades generales (excluyendo la actual)
  return graphqlClient.request<PropertiesResponse>(GET_ALL_PROPERTIES, {
    first: first + 1, // Pedimos una más para excluir la actual
  }).then((result) => {
    // Filtrar la propiedad actual
    const filteredNodes = result.products.nodes.filter(
      (p) => p.id !== property.id
    );
    return {
      ...result,
      products: {
        ...result.products,
        nodes: filteredNodes.slice(0, first),
      },
    };
  });
}
