import { gql } from "graphql-request";

export const PRODUCT_FIELDS = gql`
  fragment ProductFields on SimpleProduct {
    id
    databaseId
    name
    slug
    description
    shortDescription
    price
    regularPrice
    onSale
    featured
    image {
      sourceUrl
      altText
    }
    galleryImages {
      nodes {
        sourceUrl
        altText
      }
    }
    totalSales
    productCategories {
      nodes {
        id
        name
        slug
      }
    }
    productos {
      caracteristicas
      detalles {
        ambientes
        areaConstruida
        areaTotal
        ascensores
        banos
        dolares
        estacionamiento
        estado
        inmueblesPorPiso
        numeroDeHabitaciones
        numeroDePiso
        pisosTotales
        soles
      }
      direccion
      ubicacion {
        city
        country
        zoom
        latitude
        longitude
      }
    }
  }
`;

export const GET_ALL_PROPERTIES = gql`
  ${PRODUCT_FIELDS}
  query GetAllProperties($first: Int = 100) {
    products(first: $first, where: { status: "publish" }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...ProductFields
      }
    }
  }
`;

export const GET_PROPERTY_BY_SLUG = gql`
  ${PRODUCT_FIELDS}
  query GetPropertyBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      ...ProductFields
    }
  }
`;

export const GET_PROPERTY_BY_ID = gql`
  ${PRODUCT_FIELDS}
  query GetPropertyById($id: ID!) {
    product(id: $id, idType: DATABASE_ID) {
      ...ProductFields
    }
  }
`;

export const GET_FEATURED_PROPERTIES = gql`
  ${PRODUCT_FIELDS}
  query GetFeaturedProperties($first: Int = 6) {
    products(first: $first, where: { status: "publish", featured: true }) {
      nodes {
        ...ProductFields
      }
    }
  }
`;

export const PRODUCT_HOME_FIELDS = gql`
  fragment ProductHomeFields on SimpleProduct {
    id
    databaseId
    slug
    name
    image {
      sourceUrl
      altText
    }
    productos {
      direccion
      detalles {
        areaTotal
        dolares
        soles
      }
      ubicacion {
        city
        country
      }
    }
  }
`;

export const GET_HOME_PROPERTIES = gql`
  ${PRODUCT_HOME_FIELDS}
  query GetHomeProperties($first: Int = 6) {
    products(first: $first, where: { status: "publish" }) {
      nodes {
        ...ProductHomeFields
      }
    }
  }
`;

export const GET_RELATED_PROPERTIES = gql`
  ${PRODUCT_FIELDS}
  query GetRelatedProperties($first: Int = 3, $categoryIds: [ID!], $excludeId: ID!) {
    products(
      first: $first
      where: { 
        status: "publish"
        categoryIn: $categoryIds
        notIn: [$excludeId]
      }
    ) {
      nodes {
        ...ProductFields
      }
    }
  }
`;
