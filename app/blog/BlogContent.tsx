"use client";

import { useState } from "react";
import BlogFeaturedCard from "@/components/blog/BlogFeaturedCard";
import BlogVerticalCard from "@/components/blog/BlogVerticalCard";
import BlogHorizontalCard from "@/components/blog/BlogHorizontalCard";
import BlogSearchAndFilters from "@/components/blog/BlogSearchAndFilters";
import BlogResults from "@/components/blog/BlogResults";
import BlogLoadMore from "@/components/blog/BlogLoadMore";
import type { BlogPost } from "@/types/blog";

interface BlogContentProps {
  initialPosts: BlogPost[];
  recentPosts: BlogPost[];
  popularPosts: BlogPost[];
  categories: string[];
}

export default function BlogContent({
  initialPosts,
  recentPosts,
  popularPosts,
  categories,
}: BlogContentProps) {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(initialPosts);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleFilterChange = (posts: BlogPost[]) => {
    setFilteredPosts(posts);
    setIsFiltered(
      posts.length !== initialPosts.length ||
        posts.some((p, i) => p.id !== initialPosts[i]?.id)
    );
  };

  const featuredPost = initialPosts[0] || null;

  return (
    <>
      {/* Header Section */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <h1 className="text-xl md:text-2xl font-bold mb-6 text-primary-blue">
            Blog
          </h1>

          <BlogSearchAndFilters
            posts={initialPosts}
            categories={categories}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {isFiltered ? (
          /* Search/Filter Results */
          <div>
            <h2 className="text-lg md:text-xl font-bold mb-8 text-primary-blue">
              Resultados de búsqueda ({filteredPosts.length})
            </h2>
            {filteredPosts.length > 15 ? (
              <BlogLoadMore posts={filteredPosts} />
            ) : (
              <BlogResults posts={filteredPosts} />
            )}
          </div>
        ) : (
          <>
            {/* Featured Article + Recent Articles */}
            {featuredPost && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
                {/* Featured Article */}
                <div className="lg:col-span-2">
                  <BlogFeaturedCard post={featuredPost} />
                </div>

                {/* Recent Articles */}
                <div className="space-y-4 lg:col-span-2">
                  {recentPosts.map((post) => (
                    <BlogHorizontalCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}

            {/* Popular Articles */}
            {popularPosts.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-md md:text-xl lg:text-xl xl:text-xl font-bold text-primary-blue">
                    Artículos Populares
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {popularPosts.map((post) => (
                    <BlogHorizontalCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}

            {/* Recent Articles Section */}
            {initialPosts.length > 1 && (
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-md md:text-xl lg:text-xl xl:text-xl font-bold text-primary-blue">
                    Artículos Recientes
                  </h2>
                </div>
                {initialPosts.length > 15 ? (
                  <BlogLoadMore
                    posts={initialPosts.slice(1)}
                    initialCount={9}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {initialPosts.slice(1, 4).map((post) => (
                      <BlogVerticalCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
}
