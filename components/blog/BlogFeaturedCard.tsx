import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/blog";

interface BlogFeaturedCardProps {
  post: BlogPost;
}

export default function BlogFeaturedCard({ post }: BlogFeaturedCardProps) {
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
      className="group relative block h-full min-h-[300px] md:max-h-[690px]  rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {imageUrl && (
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 "
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        </div>
      )}

      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
        <div className="space-y-3">
          <div className="text-white text-sm opacity-90">
            {formatDate(post.date)} • {category}
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white line-clamp-3 group-hover:opacity-90 transition-opacity">
            {post.title}
          </h2>
        </div>
      </div>
    </Link>
  );
}
