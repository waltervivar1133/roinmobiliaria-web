"use client";

import { useState, useEffect, useCallback } from "react";

interface UseSliderOptions {
  totalSlides: number;
  autoplayInterval?: number;
  resumeDelay?: number;
}

interface UseSliderReturn {
  currentIndex: number;
  isAutoPlaying: boolean;
  goToSlide: (index: number) => void;
  goToPrevious: () => void;
  goToNext: () => void;
}

export function useSlider({
  totalSlides,
  autoplayInterval = 5000,
  resumeDelay = 10000,
}: UseSliderOptions): UseSliderReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const hasMultipleSlides = totalSlides > 1;

  const pauseAutoplay = useCallback(() => {
    setIsAutoPlaying(false);
    const timeout = setTimeout(() => setIsAutoPlaying(true), resumeDelay);
    return () => clearTimeout(timeout);
  }, [resumeDelay]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      pauseAutoplay();
    },
    [pauseAutoplay]
  );

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    pauseAutoplay();
  }, [totalSlides, pauseAutoplay]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    pauseAutoplay();
  }, [totalSlides, pauseAutoplay]);

  useEffect(() => {
    if (!hasMultipleSlides || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [totalSlides, hasMultipleSlides, isAutoPlaying, autoplayInterval]);

  return {
    currentIndex,
    isAutoPlaying,
    goToSlide,
    goToPrevious,
    goToNext,
  };
}
