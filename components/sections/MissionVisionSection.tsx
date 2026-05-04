import Image from "next/image";

const MISSION_TEXT =
  "Proporcionar un asesoramiento integral, a personas y empresas, que permita solucionar todas sus necesidades relacionadas con el mercado inmobiliario.";

const VISION_TEXT =
  "Convertirme en la agente inmobiliaria en la cual, las personas que intervienen en este mercado piensen en mí como primera opción en el momento de vender, comprar o alquilar una vivienda.";

export default function MissionVisionSection() {
  return (
    <section className="relative w-full min-h-[130px] md:min-h-[150px] overflow-hidden">
      {/* Fondo a todo ancho */}
      <div className="absolute bottom-0 inset-0">
        <Image
          src="/images/home/bg-mision.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3  items-center">
          {/* Misión */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <h2 className="text-lg md:text-2xl font-bold text-primary-blue mt-5 md:mt-0 mb-10">
              MISIÓN
            </h2>
            <p className="text-sm md:text-base lg:text-md text-gray-700 leading-relaxed">
              {MISSION_TEXT}
            </p>
          </div>

          {/* Imagen central - Rossana (pegada al borde inferior) */}
          <div className="order-1 md:order-2 flex justify-center self-end">
            <div className="relative w-full max-w-xs md:max-w-sm aspect-3/4 md:h-[320px]">
              <Image
                src="/images/home/rossana-foto-1.png"
                alt="Rossana Osores - Agente Inmobiliaria"
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 768px) 280px, 380px"
              />
            </div>
          </div>

          {/* Visión */}
          <div className="order-3 text-center md:text-right mt-5 md:mt-0">
            <h2 className="text-lg md:text-2xl font-bold text-primary-blue mb-10">
              VISIÓN
            </h2>
            <p className="text-sm md:text-base lg:text-md text-gray-700 leading-relaxed mb-5 md:mb-0">
              {VISION_TEXT}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
