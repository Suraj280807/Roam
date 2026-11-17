import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import type { Place } from "@/lib/places";
import { useStore } from "@/lib/store";
import { Layers, Locate, Navigation, Sparkles } from "lucide-react";

interface DynamicMapProps {
  places: Place[];
  selectedPlaceId: string;
  onSelectPlace: (id: string) => void;
  centerCoords?: { lat: number; lng: number } | undefined;
}

export function DynamicMap({
  places,
  selectedPlaceId,
  onSelectPlace,
  centerCoords,
}: DynamicMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const userMarkerRef = useRef<L.CircleMarker | null>(null);
  const [mapType, setMapType] = useState<"streets" | "satellite">("streets");
  const { userCoords, location } = useStore();

  const defaultCenter: [number, number] =
    location === "demo"
      ? [38.7115, -9.1395] // Lisbon Baixa
      : [16.746, 74.3725]; // Kolhapur SGU

  const targetCenter: [number, number] = centerCoords
    ? [centerCoords.lat, centerCoords.lng]
    : defaultCenter;

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: targetCenter,
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    // Street Tile Layer (OpenStreetMap / CartoDB Voyager)
    const streetLayer = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
        subdomains: "abcd",
      },
    );

    streetLayer.addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Map Type Switching
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (mapType === "satellite") {
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 19 },
      ).addTo(map);
    } else {
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        subdomains: "abcd",
      }).addTo(map);
    }
  }, [mapType]);

  // Update Center when location changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.setView(targetCenter, 14, { animate: true });
  }, [targetCenter[0], targetCenter[1]]);

  // Place markers for landmarks
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    places.forEach((place) => {
      const coords: [number, number] = place.coords
        ? [place.coords.lat, place.coords.lng]
        : defaultCenter;

      const isSelected = place.id === selectedPlaceId;

      const customIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: `
          <div class="relative group cursor-pointer transition-transform duration-200 ${
            isSelected ? "scale-125 z-50" : "scale-100 hover:scale-110"
          }">
            <div class="flex items-center gap-1.5 rounded-full px-2 py-1 shadow-lg border-2 ${
              isSelected
                ? "bg-charcoal text-gold border-gold ring-4 ring-gold/30"
                : "bg-white text-gray-900 border-white"
            }">
              <img src="${place.image}" class="h-6 w-6 rounded-full object-cover" />
              <span class="text-[11px] font-bold max-w-[80px] truncate">${place.name.split(" ")[0]}</span>
            </div>
            <div class="mx-auto w-0 h-0 border-x-4 border-x-transparent border-t-6 ${
              isSelected ? "border-t-charcoal" : "border-t-white"
            }"></div>
          </div>
        `,
        iconSize: [100, 36],
        iconAnchor: [50, 36],
      });

      const marker = L.marker(coords, { icon: customIcon });
      marker.on("click", () => {
        onSelectPlace(place.id);
        map.panTo(coords, { animate: true });
      });

      marker.addTo(map);
      markersRef.current[place.id] = marker;
    });

    // Add / Update User GPS marker
    if (userCoords) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([userCoords.lat, userCoords.lng]);
      } else {
        const userDot = L.circleMarker([userCoords.lat, userCoords.lng], {
          radius: 8,
          fillColor: "#2563eb",
          fillOpacity: 1,
          color: "#ffffff",
          weight: 3,
        });
        userDot.addTo(map);
        userMarkerRef.current = userDot;
      }
    }
  }, [places, selectedPlaceId, userCoords]);

  // Recenter map on user
  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    if (userCoords) {
      mapInstanceRef.current.setView([userCoords.lat, userCoords.lng], 15, { animate: true });
    } else {
      mapInstanceRef.current.setView(defaultCenter, 14, { animate: true });
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-card">
      <div ref={mapContainerRef} className="h-full w-full z-0" />

      {/* Map Control Buttons */}
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
        <button
          onClick={() => setMapType(mapType === "streets" ? "satellite" : "streets")}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-foreground shadow-card backdrop-blur-sm hover:bg-card"
          title="Toggle Satellite / Street Map"
          aria-label="Toggle map view"
        >
          <Layers className="h-4 w-4" />
        </button>
        <button
          onClick={handleRecenter}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-primary shadow-card backdrop-blur-sm hover:bg-card"
          title="Recenter on current location"
          aria-label="Recenter map"
        >
          <Locate className="h-4 w-4" />
        </button>
      </div>

      {/* Map Attribution Tag */}
      <div className="absolute bottom-2 right-2 z-10 rounded-full bg-background/80 px-2 py-0.5 text-[9px] text-muted-foreground backdrop-blur-sm">
        © OpenStreetMap · CartoDB
      </div>
    </div>
  );
}
