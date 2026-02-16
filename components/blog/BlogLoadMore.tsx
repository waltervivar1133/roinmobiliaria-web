"use client";

import { useState } from "react";
import BlogVerticalCard from "./BlogVerticalCard";
import type { BlogPost } from "@/types/blog";

interface BlogLoadMoreProps {
  posts: BlogPost[];
  initialCount?: number;
}

export default function BlogLoadMore({
  posts,
  initialCount = 15,
}: BlogLoadMoreProps) {
  const [displayedCount, setDisplayedCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);

  const hasMore = posts.length > displayedCount;
  const displayedPosts = posts.slice(0, displayedCount);

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayedCount((prev) => Math.min(prev + 9, posts.length));
      setIsLoading(false);
    }, 300);
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No se encontraron artículos.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedPosts.map((post) => (
          <BlogVerticalCard key={post.id} post={post} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="px-8 py-3 bg-primary-blue text-white font-semibold rounded-lg hover:bg-primary-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Cargando...
              </>
            ) : (
              <>
                Cargar más artículos
                <span className="text-sm ">
                  ({posts.length - displayedCount} restantes)
                </span>
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
}
