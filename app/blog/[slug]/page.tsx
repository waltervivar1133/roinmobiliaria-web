import { getPostBySlug, getRecentPosts } from "@/services/blog/blog.service";
import Image from "next/image";
import Link from "next/link";
import BlogVerticalCard from "@/components/blog/BlogVerticalCard";
import type { BlogPost } from "@/types/blog";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const { post } = await getPostBySlug(slug);
    return {
      title: `${post.title} | RO Inmobiliaria Blog`,
      description: post.excerpt.replace(/<[^>]*>/g, ""),
    };
  } catch {
    return {
      title: "Artículo no encontrado | RO Inmobiliaria Blog",
    };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  let post: BlogPost | null = null;
  let relatedPosts: BlogPost[] = [];

  try {
    const postData = await getPostBySlug(slug);
    post = postData.post;

    if (!post) {
      notFound();
    }

    // Get related posts (same category or recent)
    const category = post.categories?.nodes[0]?.slug;
    const postId = post.id;
    
    if (category) {
      try {
        const relatedData = await getRecentPosts(3);
        relatedPosts = relatedData.posts?.nodes.filter((p) => p.id !== postId).slice(0, 3);
      } catch {
        // If category fetch fails, use recent posts
        const recentData = await getRecentPosts(4);
        relatedPosts = recentData.posts?.nodes.filter((p) => p.id !== postId).slice(0, 3);
      }
    } else {
      const recentData = await getRecentPosts(4);
      relatedPosts = recentData.posts?.nodes.filter((p) => p.id !== postId).slice(0, 3);
    }
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-PE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const category = post.categories?.nodes[0]?.name || "Sin categoría";
  const imageUrl = post.featuredImage?.node?.sourceUrl || "";

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary-blue hover:opacity-80 transition-opacity mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver al blog
          </Link>
          <div className="text-gray-600 text-sm mb-2">
            {formatDate(post.date)} • {category}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-blue">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Featured Image */}
      {imageUrl && (
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
          <Image
            src={imageUrl}
            alt={post.featuredImage?.node?.altText || post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div
          className="prose prose-lg max-w-none prose-headings:text-primary-blue prose-a:text-primary-green prose-strong:text-primary-blue"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 text-primary-blue">Artículos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogVerticalCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
