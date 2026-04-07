import { getAllProperties } from "@/services/properties/properties.service";
import { getAllPosts } from "@/services/blog/blog.service";

const PAGE_SIZE = 100;

export async function fetchAllPropertySlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let after: string | undefined;
  let hasNext = true;

  while (hasNext) {
    const data = await getAllProperties(PAGE_SIZE, after);
    const nodes = data.products?.nodes ?? [];
    for (const p of nodes) {
      if (p.slug) slugs.push(p.slug);
    }
    hasNext = data.products?.pageInfo?.hasNextPage ?? false;
    after = data.products?.pageInfo?.endCursor ?? undefined;
  }

  return slugs;
}

export async function fetchAllPostSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let after: string | undefined;
  let hasNext = true;

  while (hasNext) {
    const data = await getAllPosts(PAGE_SIZE, after);
    const nodes = data.posts?.nodes ?? [];
    for (const p of nodes) {
      if (p.slug) slugs.push(p.slug);
    }
    hasNext = data.posts?.pageInfo?.hasNextPage ?? false;
    after = data.posts?.pageInfo?.endCursor ?? undefined;
  }

  return slugs;
}
