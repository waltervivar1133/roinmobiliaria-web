import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <body
        className={`${poppins.variable} font-sans antialiased`}
      >
        <Header />
        <main className="min-h-screen pt-[100.34px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
