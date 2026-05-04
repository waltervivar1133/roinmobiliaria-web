import ViewMoreLink from "./ViewMoreLink";

interface SectionHeaderProps {
  badge?: string;
  badgeColor?: string;
  title: string;
  description?: string;
  showViewMore?: boolean;
  viewMoreLink?: string;
  viewMoreText?: string;
}

export default function SectionHeader({
  badge,
  badgeColor = "#E3F2FD",
  title,
  description,
  showViewMore = true,
  viewMoreLink = "#",
  viewMoreText = "Ver más",
}: SectionHeaderProps) {
  return (
    <div className="">
      {badge && (
        <div
          className="inline-block mb-4 px-6 py-2 rounded-full text-sm font-semibold transition-colors text-primary-blue"
          style={{ backgroundColor: badgeColor }}
        >
          {badge}
        </div>
      )}
      <h2 className="text-lg md:text-xl font-bold mb-4 text-primary-blue">
        {title}
      </h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {description && (
          <p className="text-sm text-gray-600 max-w-2xl flex-1">
            {description}
          </p>
        )}
        {showViewMore && (
          <div className="flex items-center">
            <ViewMoreLink href={viewMoreLink} text={viewMoreText} />
          </div>
        )}
      </div>
    </div>
  );
}
