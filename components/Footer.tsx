import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-4 text-white bg-gradient-primary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          {/* Logo */}
          <Image src="/images/logos/logo-white.png" alt="Logo" width={180} height={100} />

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/"
              className="hover:opacity-80 transition-opacity"
            >
              Inicio
            </Link>
            <Link
              href="/about"
              className="hover:opacity-80 transition-opacity"
            >
              Sobre mí
            </Link>
            <Link
              href="/properties"
              className="hover:opacity-80 transition-opacity"
            >
              Propiedades
            </Link>
            <Link
              href="/blog"
              className="hover:opacity-80 transition-opacity"
            >
              Blog
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-colors"
              aria-label="LinkedIn"
            >
              <span className="text-sm font-bold">in</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-colors"
              aria-label="Facebook"
            >
              <span className="text-sm font-bold">f</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-colors"
              aria-label="Instagram"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-colors"
              aria-label="YouTube"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white border-opacity-20 pt-8 text-center">
          <p className="text-sm">
            Copyright © 2025, RO Inmobiliaria. Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
