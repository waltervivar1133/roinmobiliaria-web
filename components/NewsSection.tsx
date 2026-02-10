import ViewMoreLink from "@/components/ViewMoreLink";
import BlogVerticalCard from "@/components/blog/BlogVerticalCard";
import type { BlogPost } from "@/types/blog";

interface NewsSectionProps {
  posts: BlogPost[];
}

export default function NewsSection({ posts }: NewsSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-8 md:mb-10">
          <div>
            <h2 className="text-2xl md:text-xl font-bold text-primary-blue mb-3">
              Noticias Inmobiliarias
            </h2>
            <p className="text-sm md:text-sm text-gray-700 max-w-5xl">
              Mantente al día con las noticias inmobiliarias más relevantes.
              Oportunidades, tendencias y datos clave para invertir con
              inteligencia.
            </p>
          </div>
          <div className="shrink-0">
            <ViewMoreLink href="/blog" text="Ver más" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <BlogVerticalCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
