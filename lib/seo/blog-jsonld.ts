import type { BlogPost } from "@/types/blog";
import { absoluteUrl } from "@/lib/site";
import { stripHtml } from "./strip-html";

const DEFAULT_LOGO = "/images/logos/logo-white.png";

export function buildArticleJsonLd(post: BlogPost): Record<string, unknown> {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const image = post.featuredImage?.node?.sourceUrl;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: {
      "@type": "Person",
      name: post.author?.node?.name || "Rossana Osores",
    },
    publisher: {
      "@type": "Organization",
      name: "RO Inmobiliaria",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(DEFAULT_LOGO),
      },
    },
    description: stripHtml(post.excerpt, 300),
    image: image ? [image] : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}
