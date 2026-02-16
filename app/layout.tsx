import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { LayoutNavProvider } from "@/components/LayoutNavContext";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "RO Inmobiliaria - Rossana Osores",
  description:
    "Servicio integral en la gestión de venta y alquiler de propiedades",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <LayoutNavProvider>{children}</LayoutNavProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
