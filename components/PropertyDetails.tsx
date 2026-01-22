import type { PropertyDetails as PropertyDetailsType } from "@/types/property";

interface PropertyDetailsProps {
  details?: PropertyDetailsType | null;
  characteristics?: string | null;
}

export default function PropertyDetails({
  details,
  characteristics,
}: PropertyDetailsProps) {
  if (!details && !characteristics) {
    return null;
  }

  const formatValue = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined || value === "") {
      return "No especificado";
    }
    return String(value);
  };

  const detailItems = [
    {
      label: "Área total",
      value: details?.areaTotal ? `${details.areaTotal} m²` : null,
      icon: "📐",
    },
    {
      label: "Área construida",
      value: details?.areaConstruida ? `${details.areaConstruida} m²` : null,
      icon: "🏗️",
    },
    {
      label: "Habitaciones",
      value: details?.numeroDeHabitaciones
        ? formatValue(details.numeroDeHabitaciones)
        : null,
      icon: "🛏️",
    },
    {
      label: "Baños",
      value: details?.banos ? formatValue(details.banos) : null,
      icon: "🛁",
    },
    {
      label: "Estacionamientos",
      value: details?.estacionamiento
        ? formatValue(details.estacionamiento)
        : null,
      icon: "🚗",
    },
    {
      label: "$ Dólares",
      value: details?.dolares ? `USD ${details.dolares}` : null,
      icon: "💵",
    },
    {
      label: "S/ Precio en soles",
      value: details?.soles ? `S/ ${details.soles}` : null,
      icon: "💰",
    },
    {
      label: "Número de piso",
      value: details?.numeroDePiso
        ? formatValue(details.numeroDePiso)
        : null,
      icon: "🏢",
    },
    {
      label: "Pisos totales",
      value: details?.pisosTotales
        ? formatValue(details.pisosTotales)
        : null,
      icon: "🏗️",
    },
    {
      label: "Inmuebles por piso",
      value: details?.inmueblesPorPiso
        ? formatValue(details.inmueblesPorPiso)
        : null,
      icon: "🏘️",
    },
    {
      label: "Ascensores",
      value: details?.ascensores ? formatValue(details.ascensores) : null,
      icon: "🛗",
    },
    {
      label: "Estado",
      value: details?.estado ? formatValue(details.estado) : null,
      icon: "✅",
    },
  ].filter((item) => item.value !== null);

  return (
    <div className="space-y-8">
      {/* Detalles */}
      {detailItems.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6 text-primary-blue">
            Detalles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {detailItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                  <p className="font-semibold text-gray-900">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Características Generales */}
      {characteristics && (
        <section>
          <h2 className="text-3xl font-bold mb-6 text-primary-blue">
            Características Generales
          </h2>
          <div
            className="prose prose-lg max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: characteristics }}
          />
        </section>
      )}
    </div>
  );
}
