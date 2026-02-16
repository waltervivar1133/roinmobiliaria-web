import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/blog";

interface BlogHorizontalCardProps {
  post: BlogPost;
}

export default function BlogHorizontalCard({ post }: BlogHorizontalCardProps) {
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
  const imageAlt = post.featuredImage?.node?.altText || post.title;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 md:max-h-[160px]"
    >
      {imageUrl && (
        <div className="relative w-full h-48 md:w-48 md:h-[160px] shrink-0 overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={192}
            height={160}
            className="w-full h-48 md:w-full md:h-[160px] object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-4 md:p-4 md:justify-center min-w-0">
        <div className="text-gray-500 text-xs mb-2 md:mb-1">
          {formatDate(post.date)} • {category}
        </div>
        <h3 className="text-base md:text-sm font-bold line-clamp-2 group-hover:opacity-80 transition-opacity text-primary-blue mb-1">
          {post.title}
        </h3>
        {post.excerpt && (
          <p
            className="text-gray-600 text-xs mt-1 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: "1.4",
              maxHeight: "2.8em",
            }}
          >
            {post.excerpt.replace(/<[^>]*>/g, "")}
          </p>
        )}
      </div>
    </Link>
  );
}
