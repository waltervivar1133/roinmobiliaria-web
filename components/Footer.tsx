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
              href="https://www.tiktok.com/@rossana.inmobiliaria?lang=es"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white transition-all duration-200 hover:bg-white hover:text-primary-blue hover:scale-110 hover:shadow-lg"
              aria-label="Tiktok"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/rossana.inmobiliaria"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white transition-all duration-200 hover:bg-white hover:text-primary-blue hover:scale-110 hover:shadow-lg"
              aria-label="Facebook"
            >
              <span className="text-sm font-bold">f</span>
            </a>
            <a
              href="https://www.instagram.com/rossana.inmobiliaria/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white transition-all duration-200 hover:bg-white hover:text-primary-blue hover:scale-110 hover:shadow-lg"
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
