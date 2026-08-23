"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { createWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/utils/whatsapp";

const WHATSAPP_URL = createWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.5 0 .16 5.34.16 11.92c0 2.1.55 4.15 1.6 5.96L.06 24l6.26-1.64a11.9 11.9 0 0 0 5.76 1.47h.01C18.66 23.83 24 18.49 24 11.91c0-3.18-1.24-6.17-3.48-8.43ZM12.09 21.82h-.01a9.87 9.87 0 0 1-5.04-1.38l-.36-.21-3.71.98.99-3.62-.23-.37a9.88 9.88 0 0 1-1.52-5.3c0-5.45 4.43-9.88 9.89-9.88a9.8 9.8 0 0 1 6.98 2.9 9.8 9.8 0 0 1 2.89 6.98c-.01 5.46-4.44 9.9-9.88 9.9Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47a8.9 8.9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.51.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.21 5.1 4.5.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.31.17-1.44-.07-.12-.27-.2-.57-.34Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export default function WhatsAppFloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const triggerElement = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerElement?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <div className="fixed bottom-5 right-4 z-40 flex items-center gap-3 sm:bottom-7 sm:right-7">
        <div className="hidden rounded-2xl bg-primary-blue px-5 py-3 text-right text-sm text-white shadow-xl md:block">
          <p className="font-semibold">¡Hola! Soy Rossana</p>
          <p>¿En qué puedo ayudarte?</p>
        </div>

        <button
          ref={triggerRef}
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label="Abrir contacto por WhatsApp"
          onClick={() => setIsOpen(true)}
          className="group flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-whatsapp-green text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-105 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-primary-blue active:scale-95"
        >
          <WhatsAppIcon className="h-8 w-8 transition-transform duration-200 group-hover:rotate-6" />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/55 p-4 backdrop-blur-[3px] sm:justify-end sm:p-7"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="w-full max-w-sm animate-contact-panel-in rounded-2xl bg-white p-5 shadow-2xl"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2
                  id={titleId}
                  className="text-lg font-bold leading-tight text-primary-blue"
                >
                  Chatea con nosotros vía WhatsApp
                </h2>
                <p id={descriptionId} className="mt-1.5 text-sm text-gray-600">
                  Te responderemos lo antes posible.
                </p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar ventana de contacto"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-primary-blue transition-colors hover:bg-slate-200 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
              >
                <CloseIcon />
              </button>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl border-2 border-primary-green px-3 py-2.5 transition-all hover:bg-green-50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
              aria-label="Contactar a Rossana Osores por WhatsApp al 997 896 954"
            >
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-green-50">
                <Image
                  src="/images/avatar/agente.png"
                  alt="Rossana Osores"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block font-bold text-primary-green">
                  Rossana Osores
                </span>
                <span className="block text-sm text-gray-600">
                  +51 997 896 954
                </span>
              </span>

              <WhatsAppIcon className="h-6 w-6 shrink-0 text-primary-green transition-transform group-hover:scale-110" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
