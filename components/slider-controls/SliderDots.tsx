"use client";

interface SliderDotsProps {
  totalSlides: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
}

export function SliderDots({
  totalSlides,
  currentIndex,
  onDotClick,
}: SliderDotsProps) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-2 h-2 rounded-full transition-all ${
            index === currentIndex
              ? "bg-white w-8"
              : "bg-white bg-opacity-50 hover:bg-opacity-75"
          }`}
          aria-label={`Ir a imagen ${index + 1}`}
        />
      ))}
    </div>
  );
}
