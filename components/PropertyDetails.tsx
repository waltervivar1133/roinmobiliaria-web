import type { PropertyDetails as PropertyDetailsType } from "@/types/property";

interface PropertyDetailsProps {
  details?: PropertyDetailsType | null;
}

export default function PropertyDetails({
  details,
}: PropertyDetailsProps) {
  if (!details) {
    return null;
  }

  const formatValue = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined || value === "") {
      return "No especificado";
    }
    return String(value);
  };

  const formatPrice = (priceString: string | null | undefined): string | null => {
    if (!priceString || priceString.trim() === "" || priceString === "null") {
      return null;
    }
    const cleanPrice = priceString.replace(/,/g, "").trim();
    const numPrice = parseFloat(cleanPrice);
    return isNaN(numPrice) ? null : numPrice.toLocaleString();
  };

  const detailItems = [
    {
      label: "Área total:",
      value: details?.areaTotal ? `${details.areaTotal} m²` : null,
      icon: (
        <svg
          className="w-5 h-5 text-primary-green"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
      ),
    },
    {
      label: "Área construida:",
      value: details?.areaConstruida ? `${details.areaConstruida} m²` : null,
      icon: (
        <svg
          className="w-5 h-5 text-primary-green"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      label: "Estacionamientos:",
      value: details?.estacionamiento
        ? formatValue(details.estacionamiento)
        : null,
      icon: (
        <svg
          className="w-5 h-5 text-primary-green"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
    },
    {
      label: "Precio en soles:",
      value: details?.soles
        ? `S/ ${formatPrice(details.soles) || details.soles}`
        : null,
      icon: (
        <svg
          className="w-5 h-5 text-primary-green"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "Dólares:",
      value: details?.dolares
        ? `USD ${formatPrice(details.dolares) || details.dolares}`
        : null,
      icon: (
        <svg
          className="w-5 h-5 text-primary-green"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "Estado:",
      value: details?.estado ? formatValue(details.estado) : null,
      icon: (
        <svg
          className="w-5 h-5 text-primary-green"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "Habitaciones:",
      value: details?.numeroDeHabitaciones
        ? formatValue(details.numeroDeHabitaciones)
        : null,
      icon: (
        <svg
          className="w-5 h-5 text-primary-green"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      label: "Baños:",
      value: details?.banos ? formatValue(details.banos) : null,
      icon: (
        <svg
          className="w-5 h-5 text-primary-green"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      label: "Número de piso:",
      value: details?.numeroDePiso
        ? formatValue(details.numeroDePiso)
        : null,
      icon: (
        <svg
          className="w-5 h-5 text-primary-green"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      label: "Pisos totales:",
      value: details?.pisosTotales
        ? formatValue(details.pisosTotales)
        : null,
      icon: (
        <svg
          className="w-5 h-5 text-primary-green"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      label: "Inmuebles por piso:",
      value: details?.inmueblesPorPiso
        ? formatValue(details.inmueblesPorPiso)
        : null,
      icon: (
        <svg
          className="w-5 h-5 text-primary-green"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      label: "Ascensores:",
      value: details?.ascensores ? formatValue(details.ascensores) : null,
      icon: (
        <svg
          className="w-5 h-5 text-primary-green"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
    },
  ].filter((item) => item.value !== null);

  return (
    <div className="space-y-8">
      {/* Detalles */}
      {detailItems.length > 0 && (
        <section>
          <h2 className="text-lg font-medium mb-6 text-primary-blue">Detalles</h2>
          <div className="grid grid-cols-2 gap-4">
            {detailItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                {item.icon}
                <div>
                  <p className="text-sm text-gray-600">{item.label}</p>
                  <p className="font-semibold text-gray-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
