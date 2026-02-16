import Image from "next/image";
import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Sobre Mí | RO Inmobiliaria - Rossana Osores",
  description:
    "Más de 13 años brindando asesoría inmobiliaria segura, profesional y con garantía. Experiencia y compromiso para cuidar de ti y tu familia.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Banner Section */}
      <section className="relative max-w-7xl mx-auto rounded-lg overflow-hidden min-h-[300px] md:min-h-[320px] lg:min-h-[300px] hidden md:flex">
        <Image
          src="/images/about/about-me-slider.png"
          alt="Agente Inmobiliaria Rossana Osores"
          fill
          className="object-scale-down rounded-lg"
        />
      </section>

      {/* About Me Section with Image */}
      <section className="bg-white py-6 md:py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-12 items-center">
            {/* Image */}
            <div className="flex justify-center lg:justify-start order-1">
              <div className="relative w-full max-w-md aspect-3/4">
                <Image
                  src="/images/about/about-me-image.png"
                  alt="Rossana Osores - Agente Inmobiliaria"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-4 md:space-y-6 lg:space-y-8 order-2">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold italic text-primary-blue leading-tight">
                Más de 13 años brindando asesoría inmobiliaria segura,
                profesional y con garantía
              </h3>

              <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                Soy una Agente Inmobiliaria comprometida con mis clientes,
                dedicada a garantizar un proceso seguro y responsable de compra,
                venta y alquiler de propiedades, minimizando riesgos e
                inconvenientes. Con más de 13 años de experiencia en el rubro
                inmobiliario, me encargo de la comercialización del inmueble,
                valoración comercial y asesoramiento para regularizar la
                documentación.
              </p>

              <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                Mi objetivo principal es brindar calidad y excelencia en el
                servicio de asesoría al cliente en todo lo relacionado al ámbito
                inmobiliario. Me distingo por mi profesionalismo y garantía,
                siempre buscando interpretar y satisfacer las necesidades reales
                de mis clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Title Section */}
      <section className="bg-white py-6 md:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-primary-blue text-center italic">
            &quot;Experiencia y compromiso para cuidar de ti y tu familia&quot;
          </h2>
        </div>
      </section>

      {/* Biography Section */}
      <section className="bg-white py-6 md:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
              <p className="text-sm md:text-base lg:text-base text-gray-700 leading-relaxed">
                Actualmente cuento con más de 13 años de experiencia en el rubro
                de seguros de vida, tanto en ventas como en servicio al cliente.
                En mi rol como Ejecutiva de Mantenimiento de Cartera en InVita
                Seguros de Vida (Sura), me dediqué a brindar un servicio
                minucioso y personalizado de forma constante a los clientes. Mi
                enfoque principal era asesorar y satisfacer sus necesidades,
                proporcionando soluciones de manera rápida y convirtiéndome en
                su aliada y amiga.
              </p>
              <p className="text-sm md:text-base lg:text-base text-gray-700 leading-relaxed">
                Mi trayectoria laboral comenzó en Minero Perú Comercial
                (MINPECO), una empresa de comercialización de productos mineros,
                donde empecé como Asistente en la Biblioteca de la Oficina de
                Planificación y Estadística. Permanecí allí durante 3 años,
                tiempo en el que también estudié Secretariado Comercial. Luego,
                pasé a ser Secretaria en la División de Programación y
                Evaluación Comercial - OPE (1975-1982).
              </p>
              <p className="text-sm md:text-base lg:text-base text-gray-700 leading-relaxed">
                Posteriormente, entre 1982 y 1986, trabajé como Secretaria de
                Gerencia en CONSTRUCTORA SABRE S.A. Luego, durante el período de
                1986 a 1990, desempeñé el cargo de Secretaria de Gerencia en
                Peruana de Pesca S.A, en Liquidación (PEPESCA).
              </p>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[370px] aspect-370/600">
                <Image
                  src="/images/about/about-me-image-2.png"
                  alt="Rossana Osores"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Objective Section */}
      <section className="bg-gradient-primary my-8 md:my-12 lg:my-20 py-8 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {/* Misión */}
            <div className="bg-white shadow-md overflow-hidden rounded-lg">
              <div className="p-4 md:p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-green flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary-blue">
                    Misión
                  </h3>
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Proporcionar un asesoramiento integral, a personas y empresas,
                  que permita solucionar todas sus necesidades relacionadas con
                  el mercado inmobiliario.
                </p>
              </div>
            </div>

            {/* Visión */}
            <div className="bg-white shadow-md overflow-hidden rounded-lg">
              <div className="p-4 md:p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-green flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary-blue">
                    Visión
                  </h3>
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Convertirme en la agente inmobiliaria en la cual, las personas
                  que intervienen en este mercado piensen en mí como primera
                  opción en el momento de vender, comprar o alquilar una
                  vivienda.
                </p>
              </div>
            </div>

            {/* Objetivo */}
            <div className="bg-white shadow-md overflow-hidden rounded-lg">
              <div className="p-4 md:p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-green flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary-blue">
                    Objetivo
                  </h3>
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Posicionarme como agente inmobiliaria y seguir ofreciendo
                  soluciones factibles que cumplan con las expectativas y
                  necesidades de mis clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
