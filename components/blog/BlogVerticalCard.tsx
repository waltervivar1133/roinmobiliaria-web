import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/blog";

interface BlogVerticalCardProps {
  post: BlogPost;
}

export default function BlogVerticalCard({ post }: BlogVerticalCardProps) {
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
      className="group flex flex-col  bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      {imageUrl && (
        <div className="relative w-full h-40 md:h-48 overflow-hidden shrink-0 bg-gray-100">
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={400}
            height={192}
            className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-4 md:p-6">
        <div className="text-gray-500 text-xs md:text-xs mb-2">
          {formatDate(post.date)} • {category}
        </div>
        <h3 className="text-base md:text-sm font-bold mb-2 line-clamp-2 group-hover:opacity-80 transition-opacity text-primary-blue">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-gray-600 text-xs line-clamp-2 flex-1">
            {post.excerpt.replace(/<[^>]*>/g, "")}
          </p>
        )}
      </div>
    </Link>
  );
}
