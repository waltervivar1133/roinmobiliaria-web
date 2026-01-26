"use client";

import dynamic from "next/dynamic";
import type { PropertyLocation } from "@/types/property";

const PropertyMap = dynamic(() => import("@/components/PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] rounded-lg border border-gray-200 bg-gray-100 flex items-center justify-center">
      <p className="text-gray-500">Cargando mapa...</p>
    </div>
  ),
});

interface PropertyMapWrapperProps {
  location: PropertyLocation;
  address?: string;
}

export default function PropertyMapWrapper({
  location,
  address,
}: PropertyMapWrapperProps) {
  return <PropertyMap location={location} address={address} />;
}
