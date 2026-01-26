"use client";

import Image from "next/image";
import { useState } from "react";
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

  const hasMultipleImages = images.length > 1;

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Slider principal */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] bg-gray-100 rounded-lg overflow-hidden">
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
                className="md:w-6 md:h-6 text-primary-blue"
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
                className="md:w-6 md:h-6 text-primary-blue"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Miniaturas - debajo del slider principal */}
      {hasMultipleImages && (
        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 p-2">
          {images.slice(0, 5).map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                index === currentIndex
                  ? "border-primary-green shadow-lg scale-105"
                  : "border-gray-200 hover:border-gray-400"
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
      )}
    </div>
  );
}
