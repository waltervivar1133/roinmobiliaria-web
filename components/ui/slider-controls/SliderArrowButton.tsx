"use client";

interface SliderArrowButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  ariaLabel: string;
}

export function SliderArrowButton({
  direction,
  onClick,
  ariaLabel,
}: SliderArrowButtonProps) {
  const pathD = direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6";
  const positionClass = direction === "left" ? "left-4" : "right-4";

  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 flex items-center justify-center transition-all shadow-lg ${positionClass}`}
      aria-label={ariaLabel}
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
        <path d={pathD} />
      </svg>
    </button>
  );
}
