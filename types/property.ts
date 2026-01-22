export interface PropertyImage {
  sourceUrl: string;
  altText?: string;
}

export interface PropertyLocation {
  city?: string;
  country?: string;
  zoom?: string;
  latitude?: number;
  longitude?: number;
}

export interface PropertyDetails {
  ambientes?: string | null;
  areaConstruida?: string | null;
  areaTotal?: string | null;
  ascensores?: number | null;
  banos?: number | null;
  dolares?: string | null;
  estacionamiento?: string | null;
  estado?: string | null;
  inmueblesPorPiso?: number | null;
  numeroDeHabitaciones?: number | null;
  numeroDePiso?: number | null;
  pisosTotales?: number | null;
  soles?: string | null;
}

export interface PropertyProductos {
  caracteristicas?: string | null;
  direccion?: string;
  dolares?: string;
  detalles?: PropertyDetails;
  ubicacion?: PropertyLocation;
}

export interface PropertyCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Property {
  id: string;
  databaseId: number;
  slug: string;
  name: string;
  description?: string;
  shortDescription?: string;
  price?: string | null;
  regularPrice?: string | null;
  onSale?: boolean;
  featured?: boolean;
  image?: PropertyImage;
  galleryImages?: {
    nodes: PropertyImage[];
  };
  productCategories?: {
    nodes: PropertyCategory[];
  };
  productos?: PropertyProductos;
}

export interface PropertiesResponse {
  products: {
    nodes: Property[];
  };
}
