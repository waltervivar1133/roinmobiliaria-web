"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { Slide } from "@/types/slider";

interface SliderProps {
  slides: Slide[];
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  autoPlayInterval?: number;
}

export default function Slider({
  slides,
  title,
  description,
  buttonText = "DESCUBRIR",
  buttonLink = "#",
  autoPlayInterval = 5000,
}: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const hasMultipleSlides = slides.length > 1;
  const publishedSlides = slides.filter((slide) => slide.published === 1);

  // Auto-play carousel
  useEffect(() => {
    if (!hasMultipleSlides || !isAutoPlaying || publishedSlides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % publishedSlides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [publishedSlides.length, hasMultipleSlides, isAutoPlaying, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + publishedSlides.length) % publishedSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % publishedSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (publishedSlides.length === 0) {
    return null;
  }

  return (
    <section className="relative max-w-7xl mx-auto min-h-[400px] md:min-h-[600px] flex items-center bg-gray-100 rounded-lg overflow-hidden">
      {/* Texto a la izquierda */}
      {(title || description) && (
        <div className="absolute left-0 top-0 w-full h-full z-10 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-0">
            <div className="max-w-xl">
              {buttonText && (
                <a
                  href={buttonLink}
                  className="inline-block mb-4 md:mb-6 px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-colors bg-blue-50 text-primary-blue"
                >
                  {buttonText}
                </a>
              )}
              {title && (
                <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight text-primary-blue">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-sm md:text-lg lg:text-xl text-gray-600 mb-4 md:mb-8">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Carrusel de imágenes */}
      <div className="relative w-full h-full min-h-[400px] md:min-h-[600px]">
        {publishedSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100 z-0" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title || `Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Controles del carrusel - solo si hay más de 1 slide */}
        {hasMultipleSlides && publishedSlides.length > 1 && (
          <>
            {/* Botones de navegación */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 flex items-center justify-center transition-all shadow-lg"
              aria-label="Slide anterior"
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
              aria-label="Slide siguiente"
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
              {publishedSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-white w-8"
                      : "bg-white bg-opacity-50 hover:bg-opacity-75"
                  }`}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
