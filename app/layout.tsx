import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { LayoutNavProvider } from "@/components/LayoutNavContext";
import JsonLd from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/site";
import { buildOrganizationJsonLd } from "@/lib/seo/organization-jsonld";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RO Inmobiliaria - Rossana Osores",
    template: "%s | RO Inmobiliaria",
  },
  description:
    "Servicio integral en la gestión de venta y alquiler de propiedades en Perú. Asesoría inmobiliaria profesional con Rossana Osores.",
  keywords: [
    "inmobiliaria",
    "Perú",
    "Lima",
    "venta de propiedades",
    "alquiler",
    "terrenos",
    "departamentos",
    "Rossana Osores",
  ],
  authors: [{ name: "Rossana Osores", url: siteUrl }],
  creator: "RO Inmobiliaria",
  publisher: "RO Inmobiliaria",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: siteUrl,
    siteName: "RO Inmobiliaria",
    title: "RO Inmobiliaria - Rossana Osores",
    description:
      "Servicio integral en la gestión de venta y alquiler de propiedades en Perú.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RO Inmobiliaria - Rossana Osores",
    description:
      "Servicio integral en la gestión de venta y alquiler de propiedades en Perú.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <JsonLd data={buildOrganizationJsonLd()} />
        <LayoutNavProvider>{children}</LayoutNavProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
