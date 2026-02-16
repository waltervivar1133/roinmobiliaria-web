interface PageHeaderProps {
  title: string;
  description?: string;
  count?: number;
  countLabel?: {
    singular: string;
    plural: string;
  };
  className?: string;
}

export default function PageHeader({
  title,
  description,
  count,
  countLabel = {
    singular: "propiedad disponible",
    plural: "propiedades disponibles",
  },
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`bg-gray-50 border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <h1 className="text-md md:text-xl lg:text-2xl font-bold mb-4 text-primary-blue">
          {title}
        </h1>
        {description && (
          <p className="text-sm md:text-base lg:text-base text-gray-600 max-w-2xl">
            {description}
          </p>
        )}
        {count !== undefined && count > 0 && (
          <p className="text-sm md:text-sm lg:text-sm text-gray-500 mt-2">
            {count} {count === 1 ? countLabel.singular : countLabel.plural}
          </p>
        )}
      </div>
    </div>
  );
}
