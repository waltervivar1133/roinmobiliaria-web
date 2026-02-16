"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { Slide } from "@/types/slider";

interface SliderProps {
  slides: Slide[];
  autoPlayInterval?: number;
}

function parseSlideTitle(title: string): {
  projectName: string;
  type: string | null;
} {
  const parts = title.split(/\s*\/\s*/);
  if (parts.length >= 2) {
    return { projectName: parts[0].trim(), type: parts[1].trim() };
  }
  return { projectName: title.trim(), type: null };
}

export default function Slider({
  slides,
  autoPlayInterval = 5000,
}: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const hasMultipleSlides = slides.length > 1;
  const publishedSlides = slides.filter((slide) => slide.published === 1);
  const currentSlide = publishedSlides[currentIndex];
  const { projectName, type } = currentSlide
    ? parseSlideTitle(currentSlide.title)
    : { projectName: "", type: null };

  useEffect(() => {
    if (!hasMultipleSlides || !isAutoPlaying || publishedSlides.length <= 1)
      return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % publishedSlides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [
    publishedSlides.length,
    hasMultipleSlides,
    isAutoPlaying,
    autoPlayInterval,
  ]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + publishedSlides.length) % publishedSlides.length
    );
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
    <section className="relative max-w-7xl mx-auto min-h-[400px] md:min-h-[600px] flex items-center bg-gray-100 md:rounded-b-lg overflow-hidden">
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(28, 62, 124, 0.75) 0%, rgba(28, 62, 124, 0.2) 50%, rgba(1, 128, 56, 0.15) 100%)",
        }}
      />

      <div className="absolute left-0 top-0 w-full h-full z-10 flex items-center justify-center md:justify-start pointer-events-none">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
          <div className="max-w-xl text-center md:text-left md:ml-10">
            {type && (
              <span className="inline-block mb-3 md:mb-4 px-3 py-1 rounded-full text-xs md:text-sm font-semibold bg-white text-primary-green">
                {type}
              </span>
            )}
            {projectName && (
              <h1 className="text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 md:mb-4 leading-tight text-white">
                {projectName}
              </h1>
            )}
            {currentSlide?.description && (
              <p className="flex items-center justify-center md:justify-start gap-2 text-sm md:text-base lg:text-md text-white/95 mb-4 md:mb-6">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                {currentSlide.description}
              </p>
            )}
            {currentSlide?.link && (
              <div className="pointer-events-auto mt-6 md:mt-8 flex justify-center md:justify-start">
                <Link
                  href={currentSlide.link}
                  className="inline-block px-5 md:px-6 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold text-white border-2 border-white bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Ver proyecto
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

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
              className="absolute left-2 md:left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 flex items-center justify-center transition-all shadow-lg"
              aria-label="Slide anterior"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary-blue w-5 h-5 md:w-6 md:h-6"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 md:right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 flex items-center justify-center transition-all shadow-lg"
              aria-label="Slide siguiente"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary-blue w-5 h-5 md:w-6 md:h-6"
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
