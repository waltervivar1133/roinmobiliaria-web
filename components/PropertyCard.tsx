import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  imageAlt?: string;
  location: string;
  dolares?: string | null;
  soles?: string | null;
  areaTotal?: number;
  tag?: string;
  category?: string;
}

export default function PropertyCard({
  slug,
  name,
  imageUrl,
  imageAlt,
  location,
  dolares,
  soles,
  areaTotal,
  tag,
  category,
}: PropertyCardProps) {
  const displayTag = tag || category || null;

  const formatPrice = (price: string, currency: "USD" | "PEN") => {
    if (!price) return "Consultar precio";

    const cleanPrice = price.replace(/,/g, "").trim();
    const numPrice = parseFloat(cleanPrice);

    if (isNaN(numPrice)) return price;

    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: numPrice % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(numPrice);
  };

  const getDisplayPrice = () => {
    if (dolares && dolares.trim() !== "" && dolares !== "null") {
      return formatPrice(dolares, "USD");
    }
    if (soles && soles.trim() !== "" && soles !== "null") {
      return formatPrice(soles, "PEN");
    }
    return "Consultar precio";
  };

  return (
    <Link
      href={`/properties/${slug}`}
      className="group flex flex-col h-full border border-gray-200 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-3 md:p-4">
        <div className="relative h-48 md:h-64 w-full overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={imageAlt || name}
            fill
            className="object-cover"
          />
          {displayTag && (
            <div className="absolute top-3 md:top-5 right-0 px-3 md:px-4 py-1 md:py-1.5 rounded-l-xl bg-white text-primary-green text-xs md:text-sm font-semibold shadow-md">
              {displayTag}
            </div>
          )}
        </div>
      </div>
      <div className="p-4 md:p-6 flex flex-col grow">
        <h3 className="text-base md:text-lg font-bold mb-2 line-clamp-2 group-hover:opacity-80 transition-opacity text-primary-blue">
          {name}
        </h3>
        <p className="text-gray-600 text-xs md:text-sm mb-3">{location}</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
          <div className="text-lg md:text-xl font-bold text-primary-blue">
            {getDisplayPrice()}
          </div>
          {areaTotal && (
            <span className="inline-block px-2 md:px-3 py-1 bg-gray-100 rounded-full text-gray-600 text-xs md:text-sm whitespace-nowrap self-start sm:self-auto">
              Área total {areaTotal}m²
            </span>
          )}
        </div>
        <div className="mt-auto">
          <div className="w-full py-2 px-3 border rounded-full text-center text-sm md:text-base font-normal transition-all duration-300 group-hover:bg-green-50 group-hover:shadow-lg group-hover:scale-105 border-primary-green text-primary-green">
            Ver detalles
          </div>
        </div>
      </div>
    </Link>
  );
}
