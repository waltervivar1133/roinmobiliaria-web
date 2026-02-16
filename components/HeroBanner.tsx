"use client";

import Image from "next/image";
import { useSlider } from "@/hooks/useSlider";
import { SliderArrowButton, SliderDots } from "@/components/slider-controls";

interface BannerImage {
  sourceUrl: string;
  altText?: string;
}

interface HeroBannerProps {
  images: BannerImage[];
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  autoplayInterval?: number;
}

export default function HeroBanner({
  images,
  title,
  description,
  autoplayInterval = 5000,
}: HeroBannerProps) {
  const { currentIndex, goToSlide, goToPrevious, goToNext } = useSlider({
    totalSlides: images.length,
    autoplayInterval,
  });

  const hasMultipleImages = images.length > 1;

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full min-h-[600px] flex items-center bg-gray-100">
      {/* Contenido textual */}
      <div className="absolute left-0 top-0 w-full h-full z-10 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-[500px]">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-black">
              {title}
            </h1>
            <p className="text-lg md:text-lg text-gray-600 mb-8">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Slider de imágenes */}
      <div className="relative w-full h-full min-h-[600px]">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100 z-0" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={image.sourceUrl}
              alt={image.altText || `Banner ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Controles del carrusel */}
        {hasMultipleImages && (
          <>
            <SliderArrowButton
              direction="left"
              onClick={goToPrevious}
              ariaLabel="Imagen anterior"
            />
            <SliderArrowButton
              direction="right"
              onClick={goToNext}
              ariaLabel="Imagen siguiente"
            />
            <SliderDots
              totalSlides={images.length}
              currentIndex={currentIndex}
              onDotClick={goToSlide}
            />
          </>
        )}
      </div>
    </section>
  );
}
