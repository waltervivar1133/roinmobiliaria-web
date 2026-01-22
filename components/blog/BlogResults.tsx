"use client";

import { useState, useEffect } from "react";
import BlogFeaturedCard from "./BlogFeaturedCard";
import BlogVerticalCard from "./BlogVerticalCard";
import BlogHorizontalCard from "./BlogHorizontalCard";
import type { BlogPost } from "@/types/blog";

interface BlogResultsProps {
  posts: BlogPost[];
  showFeatured?: boolean;
}

export default function BlogResults({ posts, showFeatured = false }: BlogResultsProps) {
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>(posts);

  useEffect(() => {
    setDisplayedPosts(posts);
  }, [posts]);

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">
          No se encontraron artículos con los filtros seleccionados.
        </p>
      </div>
    );
  }

  if (showFeatured && posts.length > 0) {
    const featuredPost = posts[0];
    const recentPosts = posts.slice(1, 4);

    return (
      <>
        {/* Featured Article + Recent Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Featured Article */}
          <div className="lg:col-span-2">
            <BlogFeaturedCard post={featuredPost} />
          </div>

          {/* Recent Articles */}
          <div className="space-y-4 lg:col-span-1">
            {recentPosts.map((post) => (
              <BlogHorizontalCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Remaining Posts */}
        {posts.length > 4 && (
          <section>
            <h2 className="text-3xl font-bold mb-8 text-primary-blue">Más Artículos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.slice(4).map((post) => (
                <BlogVerticalCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}
      </>
    );
  }

  // Grid view for search/filter results
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedPosts.map((post) => (
          <BlogVerticalCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
