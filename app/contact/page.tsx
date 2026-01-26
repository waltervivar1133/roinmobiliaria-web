import { getAllProperties } from "@/services/properties/properties.service";
import ContactForm from "@/components/ContactForm";
import type { Property } from "@/types/property";

export default async function ContactPage() {
  let properties: Property[] = [];

  try {
    const propertiesData = await getAllProperties(100);
    properties = (propertiesData.products?.nodes || []) as Property[];
  } catch (error) {
    console.error("Error fetching properties:", error);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-primary text-white py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-md md:text-xl lg:text-2xl font-bold mb-3 md:mb-4">
              Contáctame
            </h1>
            <p className="text-sm md:text-base lg:text-base opacity-90 px-2">
              Estoy aquí para ayudarte a encontrar la propiedad perfecta. 
              No dudes en escribirme, responderé lo antes posible.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {/* Contact Form - Takes 2 columns on desktop */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-4 md:p-6 lg:p-8 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-primary-blue mb-3 md:mb-4">
              Envíame un mensaje
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
              Completa el formulario y te contactaré por WhatsApp con toda la información.
            </p>

            <ContactForm properties={properties} />
          </div>

          {/* Contact Information - Takes 1 column on desktop */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm">
              <h3 className="text-lg md:text-xl font-bold text-primary-blue mb-4 md:mb-6">
                Información de contacto
              </h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-primary-blue"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Teléfono</p>
                    <a
                      href="tel:+51997896954"
                      className="text-primary-blue hover:underline text-sm md:text-base"
                    >
                      +51 997 896 954
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-primary-blue"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Email</p>
                    <a
                      href="mailto:informes@roinmobiliaria.com"
                      className="text-primary-blue hover:underline text-sm md:text-base break-all"
                    >
                      informes@roinmobiliaria.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-bold text-primary-blue mb-3 md:mb-4">
                Horario de atención
              </h3>
              <div className="space-y-2 text-gray-700 text-sm md:text-base">
                <div className="flex justify-between">
                  <span className="font-medium">Lunes - Viernes</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sábados</span>
                  <span>9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Domingos</span>
                  <span>Cerrado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
