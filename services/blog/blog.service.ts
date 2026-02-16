import { graphqlClient } from "@/services/client";
import {
  GET_ALL_POSTS,
  GET_POST_BY_SLUG,
  GET_POST_BY_ID,
  GET_RECENT_POSTS,
  GET_POSTS_BY_CATEGORY,
} from "./blog.queries";
import type { PostsResponse, PostResponse, BlogPost } from "@/types/blog";

export async function getAllPosts(
  first: number = 10,
  after?: string
): Promise<PostsResponse> {
  return graphqlClient.request(GET_ALL_POSTS, { first, after });
}

export async function getPostBySlug(slug: string): Promise<PostResponse> {
  return graphqlClient.request(GET_POST_BY_SLUG, { slug });
}

export async function getPostById(id: number): Promise<PostResponse> {
  return graphqlClient.request(GET_POST_BY_ID, { id: id.toString() });
}

export async function getRecentPosts(
  first: number = 5
): Promise<{ posts: { nodes: BlogPost[] } }> {
  return graphqlClient.request(GET_RECENT_POSTS, { first });
}

export async function getPostsByCategory(
  category: string,
  first: number = 10
): Promise<{ posts: { nodes: BlogPost[] } }> {
  return graphqlClient.request(GET_POSTS_BY_CATEGORY, { category, first });
}

export async function getPopularPosts(
  first: number = 6
): Promise<{ posts: { nodes: BlogPost[] } }> {
  // Popular posts can be based on views, comments, or just recent posts
  // For now, we'll use recent posts as popular
  return getRecentPosts(first);
}
