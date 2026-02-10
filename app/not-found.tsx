"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useLayoutNav } from "@/components/LayoutNavContext";

export default function NotFound() {
  const { setShowNav } = useLayoutNav();

  useEffect(() => {
    setShowNav(false);
    return () => setShowNav(true);
  }, [setShowNav]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <p className="text-6xl md:text-8xl font-bold text-primary-blue/10 mb-4 select-none">
          404
        </p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-blue mb-4">
          Página no encontrada
        </h1>
        <p className="text-gray-600 mb-8 md:mb-10 text-sm md:text-base">
          La página que buscas no existe o fue movida. Puedes volver al inicio
          y explorar las secciones disponibles.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 font-medium hover:opacity-80 transition-opacity group text-primary-green"
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
          <span className="text-sm md:text-base">Volver al inicio</span>
        </Link>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-xs md:text-sm mb-4">
            Enlaces útiles
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link
              href="/"
              className="text-primary-blue hover:text-primary-green transition-colors text-sm font-medium"
            >
              Inicio
            </Link>
            <Link
              href="/about"
              className="text-primary-blue hover:text-primary-green transition-colors text-sm font-medium"
            >
              Sobre mí
            </Link>
            <Link
              href="/properties"
              className="text-primary-blue hover:text-primary-green transition-colors text-sm font-medium"
            >
              Propiedades
            </Link>
            <Link
              href="/blog"
              className="text-primary-blue hover:text-primary-green transition-colors text-sm font-medium"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-primary-blue hover:text-primary-green transition-colors text-sm font-medium"
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
