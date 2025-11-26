"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Lead } from "@/lib/api";
import L from "leaflet";

// Fix Leaflet icon issue in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LeadsMapProps {
  leads: Lead[];
}

export default function LeadsMap({ leads }: LeadsMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-[400px] w-full bg-slate-100 rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Loading Map...</p>
      </div>
    );
  }

  // Default center (Accra)
  const center: [number, number] = [5.6037, -0.1870];

  // Filter leads with valid coordinates (mocking for now if missing)
  const validLeads = leads.map(lead => ({
    ...lead,
    // Mock coordinates around Accra if missing, for demo purposes
    lat: 5.6037 + (Math.random() - 0.5) * 0.1,
    lng: -0.1870 + (Math.random() - 0.5) * 0.1,
  }));

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border z-0 relative">
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {validLeads.map((lead) => (
          <Marker key={lead.id} position={[lead.lat, lead.lng]} icon={icon}>
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-sm">{lead.businessName}</h3>
                <p className="text-xs text-muted-foreground">{lead.category}</p>
                <p className="text-xs">{lead.phoneNumber}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
