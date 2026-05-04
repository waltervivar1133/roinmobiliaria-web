import Link from "next/link";

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
}

export default function ContactSection({
  title = "CONTÁCTANOS",
  subtitle = "Sabemos lo que necesitas",
  buttonText = "Enviar un mensaje",
  buttonLink = "/contact",
  backgroundImage = "/images/about/image-about.png",
}: ContactSectionProps) {
  return (
    <section className="relative py-10 md:py-14 lg:py-20 overflow-hidden">
      {backgroundImage && (
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
        </div>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-blue mb-3 md:mb-4 lg:mb-6">
          {title}
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-8 lg:mb-10">
          {subtitle}
        </p>
        <Link
          href={buttonLink}
          className="inline-block px-6 md:px-8 py-2.5 md:py-3 lg:py-4 bg-primary-blue text-white font-semibold rounded-full hover:bg-primary-blue/90 transition-colors border-2 border-primary-blue text-sm md:text-base"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
