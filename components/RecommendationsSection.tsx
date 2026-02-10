import PropertiesSection from "./PropertiesSection";
import type { Property } from "@/types/property";

interface RecommendationsSectionProps {
  properties: Property[];
  title?: string;
  description?: string;
  showViewMore?: boolean;
  viewMoreLink?: string;
}

export default function RecommendationsSection({
  properties,
  title = "",
  description = "",
  showViewMore = true,
  viewMoreLink = "/properties",
}: RecommendationsSectionProps) {
  return (
    <PropertiesSection
      properties={properties}
      title={title}
      description={description}
      showViewMore={showViewMore}
      viewMoreLink={viewMoreLink}
      columns={3}
      paddingY="lg"
      paddingX="md"
      backgroundColor="white"
    />
  );
}
