"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { PropertyLocation } from "@/types/property";

if (typeof window !== "undefined") {
  const defaultIcon = L.Icon.Default.prototype as L.Icon.Default & {
    _getIconUrl?: string;
  };
  if (defaultIcon._getIconUrl) {
    delete defaultIcon._getIconUrl;
  }
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
}

interface PropertyMapProps {
  location: PropertyLocation;
  address?: string;
}

export default function PropertyMap({ location, address }: PropertyMapProps) {
  if (!location.latitude || !location.longitude) {
    return null;
  }

  const googleMapsUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
  const coordinates = `${Math.abs(location.latitude).toFixed(6)}°${location.latitude < 0 ? "S" : "N"} ${Math.abs(location.longitude).toFixed(6)}°${location.longitude < 0 ? "W" : "E"}`;
  const zoom = parseInt(location.zoom || "14");

  return (
    <section>
      <h2 className="text-lg font-medium mb-6 text-primary-blue">Ubicación</h2>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600">
          {/* <span className="font-mono text-sm text-primary-blue">{coordinates}</span> */}
          <div className="flex gap-4">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-blue hover:underline"
            >
              Ir a google maps
            </a>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-blue hover:underline"
            >
              Cómo llegar
            </a>
          </div>
        </div>
        <div className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-200">
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={zoom}
            scrollWheelZoom={false}
            className="w-full h-full z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>
                <div className="text-center">
                  <p className="font-semibold">
                    {address || "Property location"}
                  </p>
                  <p className="text-sm text-gray-600">{coordinates}</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
