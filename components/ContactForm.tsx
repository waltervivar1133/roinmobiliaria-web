"use client";

import { useState } from "react";
import PropertySelect from "@/components/PropertySelect";
import type { Property } from "@/types/property";

interface ContactFormProps {
  properties: Property[];
}

export default function ContactForm({ properties }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    propertyInterest: "",
  });

  const whatsappNumber = "+51997896954";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePropertyChange = (propertyName: string) => {
    setFormData((prev) => ({ ...prev, propertyInterest: propertyName }));
  };

  const buildWhatsAppMessage = (): string => {
    let message = `Hola, soy ${formData.name || "un cliente interesado"}`;

    if (formData.email) {
      message += `\n*Email:* ${formData.email}`;
    }

    if (formData.phone) {
      message += `\n*Teléfono:* ${formData.phone}`;
    }

    if (formData.propertyInterest) {
      message += `\n\n*Propiedad de interés:*\n${formData.propertyInterest}`;
    }

    if (formData.message) {
      message += `\n\n*Mensaje:*\n${formData.message}`;
    }

    if (!formData.propertyInterest && !formData.message) {
      message += "\n\nMe gustaría recibir más información sobre propiedades disponibles.";
    }

    return message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos requeridos
    if (!formData.name || !formData.message) {
      return;
    }

    const whatsappMessage = buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm md:text-base font-semibold text-gray-700 mb-2"
        >
          Nombre completo *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-all outline-none"
          placeholder="Tu nombre"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm md:text-base font-semibold text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-all outline-none"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm md:text-base font-semibold text-gray-700 mb-2"
          >
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-all outline-none"
            placeholder="+51 999 999 999"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="propertyInterest"
          className="block text-sm md:text-base font-semibold text-gray-700 mb-2"
        >
          Propiedad de interés
        </label>
        <PropertySelect
          properties={properties}
          value={formData.propertyInterest}
          onChange={handlePropertyChange}
          placeholder="Selecciona una propiedad (opcional)"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm md:text-base font-semibold text-gray-700 mb-2"
        >
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleInputChange}
          className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-all resize-none outline-none"
          placeholder="Cuéntame qué estás buscando..."
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 md:py-3.5 px-6 rounded-lg font-semibold text-sm md:text-base text-white bg-primary-blue hover:bg-opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Enviar por WhatsApp
      </button>
    </form>
  );
}
