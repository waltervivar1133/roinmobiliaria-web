import { getAllPosts, getRecentPosts, getPopularPosts } from "@/services/blog/blog.service";
import BlogContent from "./BlogContent";
import type { BlogPost } from "@/types/blog";

export const metadata = {
  title: "Blog | RO Inmobiliaria",
  description: "Consejos, tips y noticias sobre el mercado inmobiliario en Perú.",
};

export default async function BlogPage() {
  let recentPosts: BlogPost[] = [];
  let popularPosts: BlogPost[] = [];
  let allPosts: BlogPost[] = [];

  try {
    const [allPostsData, recentPostsData, popularPostsData] = await Promise.all([
      getAllPosts(100),
      getRecentPosts(3),
      getPopularPosts(2),
    ]);

    allPosts = allPostsData.posts?.nodes || [];
    recentPosts = recentPostsData.posts?.nodes || [];
    popularPosts = popularPostsData.posts?.nodes || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  const allCategories = new Set<string>();
  allPosts.forEach((post) => {
    post.categories?.nodes.forEach((cat) => {
      allCategories.add(cat.name);
    });
  });
  const categories = Array.from(allCategories).sort();

  return (
    <div className="bg-white">
      <BlogContent
        initialPosts={allPosts}
        recentPosts={recentPosts}
        popularPosts={popularPosts}
        categories={categories}
      />
    </div>
  );
}
