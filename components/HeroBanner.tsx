"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

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
}

export default function HeroBanner({
  images,
  title,
  description,
}: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, hasMultipleImages, isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full min-h-[600px] flex items-center bg-gray-100">

      <div className="absolute left-0 top-0 w-full h-full z-10 flex items-center">
        <div className="max-w-7xl mx-auto w-full  ">
          <div className="max-w-[500px]">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-black"
            >
              {title}
            </h1>
            <p className="text-lg md:text-lg text-gray-600 mb-8">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-full h-full min-h-[600px]">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100 z-0" : "opacity-0 z-0"
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

        {/* Controles del carrusel - solo si hay más de 1 imagen */}
        {hasMultipleImages && (
          <>
            {/* Botones de navegación */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 flex items-center justify-center transition-all shadow-lg"
              aria-label="Imagen anterior"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary-blue"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 flex items-center justify-center transition-all shadow-lg"
              aria-label="Imagen siguiente"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary-blue"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                      ? "bg-white w-8"
                      : "bg-white bg-opacity-50 hover:bg-opacity-75"
                    }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
