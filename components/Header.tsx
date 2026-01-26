"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ease-in-out ${isScrolled ? "shadow-lg" : "shadow-sm"
        }`}
    >
      <div className="w-full py-2 px-4 bg-gradient-primary">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-white text-sm">
          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="text-xs md:text-sm">+51 997 896 954</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span className="text-xs md:text-sm">informes@roinmobiliaria.com</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/images/logos/logo-oficial.png" alt="Logo" width={180} height={100} />
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link
              href="/"
              className="font-semibold hover:opacity-80 transition-opacity text-primary-blue"
            >
              INICIO
            </Link>
            <Link
              href="/sobre-mi"
              className="font-semibold hover:opacity-80 transition-opacity text-primary-blue"
            >
              SOBRE MÍ
            </Link>
            <Link
              href="/properties"
              className="font-semibold hover:opacity-80 transition-opacity text-primary-blue"
            >
              PROPIEDADES
            </Link>
            <Link
              href="/blog"
              className="font-semibold hover:opacity-80 transition-opacity text-primary-blue"
            >
              BLOG
            </Link>
          </div>

          {/* Contact Button - Desktop */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="text-sm px-6 py-2 border-2 font-semibold hover:bg-primary-blue hover:text-white rounded-full hover:bg-opacity-10 transition-colors border-primary-blue text-primary-blue"
            >
              CONTÁCTAME
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-primary-blue"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Fullscreen */}
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-60 md:hidden animate-fade-in"
              onClick={() => setIsMenuOpen(false)}
            />
            {/* Menu Panel */}
            <div className="fixed inset-y-0 right-0 w-full bg-white shadow-2xl z-70 md:hidden animate-slide-in-right">
              <div className="flex flex-col h-full">
                {/* Header del menú */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-primary-blue">Menú</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-600 hover:text-primary-blue transition-colors"
                    aria-label="Cerrar menú"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-6 px-4">
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/"
                      className="font-semibold py-4 px-4 rounded-lg text-primary-blue hover:bg-gray-50 transition-colors text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      INICIO
                    </Link>
                    <Link
                      href="/sobre-mi"
                      className="font-semibold py-4 px-4 rounded-lg text-primary-blue hover:bg-gray-50 transition-colors text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      SOBRE MÍ
                    </Link>
                    <Link
                      href="/properties"
                      className="font-semibold py-4 px-4 rounded-lg text-primary-blue hover:bg-gray-50 transition-colors text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      PROPIEDADES
                    </Link>
                    <Link
                      href="/blog"
                      className="font-semibold py-4 px-4 rounded-lg text-primary-blue hover:bg-gray-50 transition-colors text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      BLOG
                    </Link>
                  </div>
                </nav>

                {/* Footer del menú con botón de contacto */}
                <div className="p-4 border-t border-gray-200">
                  <Link
                    href="/contact"
                    className="w-full block px-6 py-3 border-2 font-semibold text-center rounded-lg border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    CONTÁCTAME
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
