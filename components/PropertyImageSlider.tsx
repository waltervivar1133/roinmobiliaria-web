"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { PropertyImage } from "@/types/property";

interface PropertyImageSliderProps {
  images: PropertyImage[];
  propertyName: string;
}

export default function PropertyImageSlider({
  images,
  propertyName,
}: PropertyImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const hasMultipleImages = images.length > 1;

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + images.length) % images.length
    );
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] bg-gray-100">
      {/* Imagen principal */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100 z-0" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={image.sourceUrl}
              alt={image.altText || `${propertyName} - Imagen ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Controles - solo si hay más de 1 imagen */}
        {hasMultipleImages && (
          <>
            {/* Botones de navegación */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 flex items-center justify-center transition-all shadow-lg"
              aria-label="Imagen anterior"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary-blue md:w-6 md:h-6"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 flex items-center justify-center transition-all shadow-lg"
              aria-label="Imagen siguiente"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary-blue md:w-6 md:h-6"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 md:h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-white w-6 md:w-8"
                      : "bg-white bg-opacity-50 hover:bg-opacity-75 w-1.5 md:w-2"
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>

            {/* Miniaturas - ocultas en mobile */}
            <div className="hidden md:flex absolute bottom-20 left-1/2 -translate-x-1/2 z-20 gap-2 max-w-full overflow-x-auto px-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    index === currentIndex
                      ? "border-white shadow-lg"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Ver imagen ${index + 1}`}
                >
                  <Image
                    src={image.sourceUrl}
                    alt={image.altText || `Miniatura ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
