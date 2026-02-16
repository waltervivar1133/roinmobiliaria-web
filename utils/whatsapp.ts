import type { ContactFormData } from "@/types/contact";

const WHATSAPP_NUMBER = "+51997896954";

export function buildWhatsAppMessage(data: ContactFormData): string {
  let message = `Hola, soy ${data.name || "un cliente interesado"}`;

  if (data.email) {
    message += `\n*Email:* ${data.email}`;
  }

  if (data.phone) {
    message += `\n*Teléfono:* ${data.phone}`;
  }

  if (data.propertyInterest) {
    message += `\n\n*Propiedad de interés:*\n${data.propertyInterest}`;
  }

  if (data.message) {
    message += `\n\n*Mensaje:*\n${data.message}`;
  }

  if (!data.propertyInterest && !data.message) {
    message +=
      "\n\nMe gustaría recibir más información sobre propiedades disponibles.";
  }

  return message;
}

export function createWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function sendWhatsAppMessage(data: ContactFormData): void {
  const message = buildWhatsAppMessage(data);
  const url = createWhatsAppUrl(message);
  window.open(url, "_blank");
}
