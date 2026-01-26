import { getPostBySlug, getRecentPosts } from "@/services/blog/blog.service";
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

  // Función para remover enlaces de las imágenes en el contenido
  const processContent = (html: string): string => {
    let processed = html;
    
    // Caso 1: <a> que contiene <figure> con <img> (bloques de WordPress Gutenberg)
    // Maneja casos como: <a><figure class="wp-block-image"><img></figure></a>
    processed = processed.replace(
      /<a[^>]*href=["'][^"']*["'][^>]*>(\s*<figure[^>]*>[\s\S]*?<img[^>]*>[\s\S]*?<\/figure>)\s*<\/a>/gi,
      '$1'
    );
    
    // Caso 2: <a> que contiene directamente <img> (sin figure)
    processed = processed.replace(
      /<a[^>]*href=["'][^"']*["'][^>]*>(\s*<img[^>]*>)\s*<\/a>/gi,
      '$1'
    );
    
    // Caso 3: <a> que contiene <figure> completo (cualquier estructura)
    processed = processed.replace(
      /<a[^>]*href=["'][^"']*["'][^>]*>(\s*<figure[^>]*>[\s\S]*?<\/figure>)\s*<\/a>/gi,
      '$1'
    );
    
    // Caso 4: <a> sin href pero que contiene imágenes (por si acaso)
    processed = processed.replace(
      /<a[^>]*>(\s*(?:<figure[^>]*>[\s\S]*?<img[^>]*>[\s\S]*?<\/figure>|<img[^>]*>))\s*<\/a>/gi,
      '$1'
    );
    
    return processed;
  };

  const processedContent = processContent(post.content);

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-medium hover:opacity-80 transition-opacity mb-4 md:mb-6 group text-primary-green"
          >
            <div className="w-4 h-4 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-transform group-hover:-translate-x-1 bg-primary-green">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="text-sm md:text-md">Volver al blog</span>
          </Link>
          <div className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">
            {formatDate(post.date)} • {category}
          </div>

        </div>
      </div>



      {/* Content */}
      <article className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-0">
        <div
          className="prose prose-sm md:prose-base lg:prose-lg max-w-none  prose-headings:text-primary-blue prose-a:text-primary-green prose-strong:text-primary-blue prose-p:text-gray-700 prose-img:rounded-lg prose-img:w-full [&_a>img]:pointer-events-none [&_a>img]:cursor-default [&_a>figure]:pointer-events-none [&_a>figure]:cursor-default [&_figure>img]:pointer-events-none [&_figure>img]:cursor-default"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
            <h2 className="text-md md:text-xl lg:text-xl xl:text-xl font-bold mb-6 md:mb-8 text-primary-blue">Artículos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
