import Image from "next/image";
import type { PropertyDetails as PropertyDetailsType } from "@/types/property";

interface PropertyContactCardProps {
  details?: PropertyDetailsType | null;
  propertyName?: string;
}

export default function PropertyContactCard({
  details,
  propertyName,
}: PropertyContactCardProps) {
  const whatsappNumber = "+51997896954"; // Sin espacios ni guiones para el enlace
  const whatsappMessage = propertyName
    ? `Hola, estoy interesado/a en la propiedad: ${propertyName}. Me gustaría recibir más información.`
    : "Hola, me gustaría recibir más información sobre propiedades disponibles.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const formatPrice = (priceString: string | null | undefined): number | null => {
    if (!priceString || priceString.trim() === "" || priceString === "null") {
      return null;
    }
    const cleanPrice = priceString.replace(/,/g, "").trim();
    const numPrice = parseFloat(cleanPrice);
    return isNaN(numPrice) ? null : numPrice;
  };


  const priceInSoles = formatPrice(details?.soles);
  const priceInDollars = formatPrice(details?.dolares);

  const price = priceInSoles
    ? `S/ ${priceInSoles.toLocaleString()}`
    : priceInDollars
      ? `$${priceInDollars.toLocaleString()}`
      : "Precio no disponible";

  return (
    <>
      {/* Desktop: Sticky card */}
      <div className="hidden lg:block lg:sticky lg:top-30 z-10 space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Precio</p>
            <p className="text-3xl font-bold text-primary-blue">{price}</p>
          </div>

          {/* Contact buttons */}
          <div className="space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 bg-whatsapp-green"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contactar por WhatsApp
            </a>

            <button className="w-full py-3 px-4 rounded-lg border-2 font-semibold transition-all hover:bg-gray-50 border-primary-blue text-primary-blue">
              Agendar visita
            </button>
          </div>

          {/* Agent info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                <Image
                  src="/images/avatar/agente.png"
                  alt="Rossana Osores"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold mb-0.5">Rossana Osores</p>
                <p className="text-xs text-gray-500">Agente inmobiliario</p>
              </div>
            </div>
            <div className="pl-0 space-y-1">
              <p className="text-sm text-gray-600">+51 997 896 954</p>
              <p className="text-sm text-gray-600">informes@roinmobiliaria.com</p>
            </div>
          </div>

        
        </div>
      </div>

      {/* Mobile: Fixed card at bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div>
              <p className="text-xs text-gray-500">Precio</p>
              <p className="text-xl font-bold text-primary-blue">{price}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 bg-whatsapp-green text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <button className="flex-1 py-2.5 px-4 rounded-lg border-2 font-semibold text-sm transition-all hover:bg-gray-50 border-primary-blue text-primary-blue">
              Agendar visita
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
