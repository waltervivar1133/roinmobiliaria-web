import { gql } from "graphql-request";

export const MEDIA_FIELDS = gql`
  fragment MediaFields on MediaItem {
    id
    databaseId
    title
    altText
    caption
    description
    mediaType
    mimeType
    sourceUrl
    mediaDetails {
      width
      height
      file
      sizes {
        name
        file
        width
        height
        mimeType
        sourceUrl
      }
    }
    fileSize
    date
    modified
  }
`;

export const GET_ALL_MEDIA = gql`
  ${MEDIA_FIELDS}
  query GetAllMedia($first: Int = 50, $after: String) {
    mediaItems(
      first: $first
      after: $after
      where: { orderby: { field: DATE, order: DESC } }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...MediaFields
      }
    }
  }
`;

export const GET_MEDIA_ITEM_BY_ID = gql`
  ${MEDIA_FIELDS}
  query GetMediaItemById($id: ID!) {
    mediaItem(id: $id, idType: DATABASE_ID) {
      ...MediaFields
    }
  }
`;

export const GET_MEDIA_ITEM_BY_SLUG = gql`
  ${MEDIA_FIELDS}
  query GetMediaItemBySlug($slug: ID!) {
    mediaItem(id: $slug, idType: SLUG) {
      ...MediaFields
    }
  }
`;

export const GET_IMAGES_BY_MIME_TYPE = gql`
  ${MEDIA_FIELDS}
  query GetImagesByMimeType($mimeType: MimeTypeEnum!, $first: Int = 20) {
    mediaItems(first: $first, where: { mimeType: $mimeType, status: INHERIT }) {
      nodes {
        ...MediaFields
      }
    }
  }
`;
