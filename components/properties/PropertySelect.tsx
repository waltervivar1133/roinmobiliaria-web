"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import type { Property } from "@/types/property";

interface PropertySelectProps {
  properties: Property[];
  value?: string;
  onChange: (propertyName: string) => void;
  placeholder?: string;
}

export default function PropertySelect({
  properties,
  value,
  onChange,
  placeholder = "Selecciona una propiedad",
}: PropertySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedProperty = properties.find((p) => p.name === value);

  const formatPrice = (property: Property): string => {
    const soles = property.productos?.detalles?.soles;
    const dolares = property.productos?.detalles?.dolares;

    if (soles && soles.trim() !== "" && soles !== "null") {
      const cleanPrice = soles.replace(/,/g, "").trim();
      const numPrice = parseFloat(cleanPrice);
      if (!isNaN(numPrice)) {
        return `S/ ${numPrice.toLocaleString()}`;
      }
    }
    if (dolares && dolares.trim() !== "" && dolares !== "null") {
      const cleanPrice = dolares.replace(/,/g, "").trim();
      const numPrice = parseFloat(cleanPrice);
      if (!isNaN(numPrice)) {
        return `$${numPrice.toLocaleString()}`;
      }
    }
    return "Consultar precio";
  };

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all text-left bg-white flex items-center gap-3"
      >
        {selectedProperty ? (
          <>
            {selectedProperty.image && (
              <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={selectedProperty.image.sourceUrl}
                  alt={selectedProperty.image.altText || selectedProperty.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">
                {selectedProperty.name}
              </p>
              <p className="text-sm text-primary-blue">
                {formatPrice(selectedProperty)}
              </p>
            </div>
          </>
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-hidden">
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="Buscar propiedad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="overflow-y-auto max-h-80">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <button
                  key={property.id}
                  type="button"
                  onClick={() => {
                    onChange(property.name);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className="w-full px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3 text-left border-b border-gray-100 last:border-b-0"
                >
                  {property.image && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={property.image.sourceUrl}
                        alt={property.image.altText || property.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {property.name}
                    </p>
                    <p className="text-sm text-primary-blue">
                      {formatPrice(property)}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                No se encontraron propiedades
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
