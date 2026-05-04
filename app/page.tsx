import type { Metadata } from "next";
import RecommendationsSection from "@/components/sections/RecommendationsSection";
import Slider from "@/components/ui/Slider";
import MissionVisionSection from "@/components/sections/MissionVisionSection";
import NewsSection from "@/components/sections/NewsSection";
import ContactSection from "@/components/sections/ContactSection";
import { getSiteUrl } from "@/lib/site";
import { getFeaturedProperties } from "@/services/properties/properties.service";
import { getPublishedSlides } from "@/services/slider/slider.service";
import { getRecentPosts } from "@/services/blog/blog.service";
import type { Slide } from "@/types/slider";
import type { BlogPost } from "@/types/blog";

export const metadata: Metadata = {
  title: { absolute: "RO Inmobiliaria - Rossana Osores" },
  description:
    "Inmobiliaria en Perú: venta y alquiler de departamentos, terrenos y más. Asesoría profesional con Rossana Osores.",
  alternates: { canonical: getSiteUrl() },
  openGraph: {
    title: "RO Inmobiliaria - Rossana Osores",
    description:
      "Inmobiliaria en Perú: venta y alquiler de departamentos, terrenos y más.",
    url: getSiteUrl(),
  },
};

export default async function Home() {
  let slides: Slide[] = [];
  try {
    slides = await getPublishedSlides();
  } catch (error) {
    console.error("Error fetching slider slides:", error);
  }

  const featuredData = await getFeaturedProperties(3);
  const featuredProperties = featuredData.products?.nodes || [];

  let recentPosts: BlogPost[] = [];
  try {
    const postsData = await getRecentPosts(3);
    recentPosts = postsData.posts?.nodes ?? [];
  } catch (error) {
    console.error("Error fetching recent posts:", error);
  }

  return (
    <>
      <div>
        <Slider slides={slides} />
      </div>

      <div id="recomendaciones">
        <RecommendationsSection
          properties={featuredProperties}
          title="Recomendaciones"
          description="Conoce mi selección de departamentos y terrenos, ideales para invertir o vivir como siempre soñaste."
          showViewMore={true}
          viewMoreLink="/properties"
        />
      </div>

      <MissionVisionSection />

      <NewsSection posts={recentPosts} />

      <ContactSection />
    </>
  );
}
