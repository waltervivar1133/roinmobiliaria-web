import RecommendationsSection from "@/components/RecommendationsSection";
import Slider from "@/components/Slider";
import { getFeaturedProperties } from "@/services/properties/properties.service";
import { getPublishedSlides } from "@/services/slider/slider.service";
import type { Slide } from "@/types/slider";

export default async function Home() {
  let slides: Slide[] = [];
  try {
    slides = await getPublishedSlides();
  } catch (error) {
    console.error("Error fetching slider slides:", error);
  }

  const featuredData = await getFeaturedProperties(3);
  const featuredProperties = featuredData.products?.nodes || [];

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
    </>
  );
}
