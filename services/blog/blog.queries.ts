import { gql } from 'graphql-request'

export const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    databaseId
    title
    slug
    excerpt
    content
    date
    modified
    author {
      node {
        name
        avatar {
          url
        }
      }
    }
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    categories {
      nodes {
        name
        slug
      }
    }
    tags {
      nodes {
        name
        slug
      }
    }
  }
`

export const GET_ALL_POSTS = gql`
  ${POST_FIELDS}
  query GetAllPosts($first: Int = 10, $after: String) {
    posts(
      first: $first
      after: $after
      where: { status: PUBLISH }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...PostFields
      }
    }
  }
`

export const GET_POST_BY_SLUG = gql`
  ${POST_FIELDS}
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...PostFields
    }
  }
`

export const GET_POST_BY_ID = gql`
  ${POST_FIELDS}
  query GetPostById($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
      ...PostFields
    }
  }
`

export const GET_RECENT_POSTS = gql`
  ${POST_FIELDS}
  query GetRecentPosts($first: Int = 5) {
    posts(
      first: $first
      where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }
    ) {
      nodes {
        ...PostFields
      }
    }
  }
`

export const GET_POSTS_BY_CATEGORY = gql`
  ${POST_FIELDS}
  query GetPostsByCategory($category: String!, $first: Int = 10) {
    posts(
      first: $first
      where: { 
        status: PUBLISH
        categoryName: $category
      }
    ) {
      nodes {
        ...PostFields
      }
    }
  }
`
