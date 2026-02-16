import Link from "next/link";

interface BackButtonProps {
  href?: string;
  label?: string;
  className?: string;
}

export default function BackButton({
  href = "/properties",
  label = "Volver a propiedades",
  className = "",
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 font-medium hover:opacity-80 transition-opacity mb-6 md:mb-8 group text-primary-green ${className}`}
    >
      <div className="w-4 h-4 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-transform group-hover:-translate-x-1 bg-primary-green">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </div>
      <span className="text-sm md:text-md">{label}</span>
    </Link>
  );
}