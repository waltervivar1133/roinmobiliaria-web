import Link from "next/link";

interface ViewMoreLinkProps {
  href: string;
  text?: string;
}

export default function ViewMoreLink({
  href,
  text = "Ver más",
}: ViewMoreLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 font-medium hover:opacity-80 transition-opacity group text-primary-green"
    >
      <span className="text-sm md:text-md">{text}</span>
      <div className=" w-4 h-4 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1 bg-primary-green">
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
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
