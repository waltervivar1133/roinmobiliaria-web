import { absoluteUrl, getSiteUrl } from "@/lib/site";

const LOGO_PATH = "/images/logos/logo-white.png";

export function buildOrganizationJsonLd(): Record<string, unknown> {
  const url = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: "RO Inmobiliaria",
        alternateName: "Rossana Osores — Agente inmobiliaria",
        url,
        logo: absoluteUrl(LOGO_PATH),
        email: "informes@roinmobiliaria.com",
        telephone: "+51-997-896-954",
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: "RO Inmobiliaria",
        description:
          "Servicio integral en la gestión de venta y alquiler de propiedades en Perú.",
        publisher: { "@id": `${url}/#organization` },
        inLanguage: "es-PE",
      },
    ],
  };
}
