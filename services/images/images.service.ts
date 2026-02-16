import { graphqlClient } from "../client";
import {
  GET_ALL_MEDIA,
  GET_MEDIA_ITEM_BY_ID,
  GET_MEDIA_ITEM_BY_SLUG,
  GET_IMAGES_BY_MIME_TYPE,
} from "./images.queries";

export interface MediaItem {
  id: string;
  databaseId: number;
  title: string;
  altText?: string;
  sourceUrl: string;
  mediaDetails?: {
    width?: number;
    height?: number;
    file?: string;
  };
  mimeType?: string;
  slug?: string;
}

export interface MediaItemsResponse {
  mediaItems: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor?: string;
    };
    nodes: MediaItem[];
  };
}

export interface MediaItemResponse {
  mediaItem: MediaItem;
}

/**
 * Obtiene todos los items de media (imágenes) de WordPress
 */
export async function getMediaItems(
  first: number = 20,
  after?: string
): Promise<MediaItemsResponse> {
  return graphqlClient.request<MediaItemsResponse>(GET_ALL_MEDIA, {
    first,
    after,
  });
}

/**
 * Alias para getMediaItems - mantiene compatibilidad
 */
export const getAllMediaItems = getMediaItems;

/**
 * Obtiene un item de media por su ID
 */
export async function getMediaItemById(id: number): Promise<MediaItemResponse> {
  return graphqlClient.request<MediaItemResponse>(GET_MEDIA_ITEM_BY_ID, {
    id: id.toString(),
  });
}

/**
 * Obtiene un item de media por su slug
 */
export async function getMediaItemBySlug(
  slug: string
): Promise<MediaItemResponse> {
  return graphqlClient.request<MediaItemResponse>(GET_MEDIA_ITEM_BY_SLUG, {
    slug,
  });
}

export async function getImagesByMimeType(
  mimeType:
    | "IMAGE_JPEG"
    | "IMAGE_PNG"
    | "IMAGE_GIF"
    | "IMAGE_WEBP" = "IMAGE_JPEG",
  first: number = 20
): Promise<{ mediaItems: { nodes: MediaItem[] } }> {
  return graphqlClient.request<{ mediaItems: { nodes: MediaItem[] } }>(
    GET_IMAGES_BY_MIME_TYPE,
    {
      mimeType,
      first,
    }
  );
}

/**
 * Obtiene todas las URLs de imágenes disponibles
 */
export async function getAllImageUrls(): Promise<string[]> {
  try {
    const response = await getMediaItems(100);
    return response.mediaItems.nodes
      .filter((item) => item.mimeType?.startsWith("image/"))
      .map((item) => item.sourceUrl);
  } catch (error) {
    console.error("Error fetching image URLs:", error);
    return [];
  }
}
