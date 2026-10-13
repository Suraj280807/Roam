export const GOOGLE_MAPS_API_KEY = "AIzaSyAtNv_a35ZYkYKrgYaOzNvtxpllq7bZg50";

export const DEMO_LOCATION = {
  city: "Lisbon",
  area: "Baixa",
  address: "Baixa Pombalina, Lisbon, Portugal",
  coords: { lat: 38.7115, lng: -9.1395 },
};

export interface LocationResult {
  city: string;
  address: string;
  coords: { lat: number; lng: number };
  source: "google" | "fallback" | "demo";
}

/**
 * Request real device GPS coordinates via HTML5 Geolocation.
 */
export async function fetchCurrentPosition(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      return reject(new Error("Geolocation is not supported on this device."));
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        let msg = "Could not obtain location.";
        if (err.code === err.PERMISSION_DENIED) {
          msg = "Location permission was denied.";
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          msg = "Location position unavailable.";
        } else if (err.code === err.TIMEOUT) {
          msg = "Location request timed out.";
        }
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  });
}

/**
 * Reverse-geocode latitude and longitude using Google Maps Geocoding API.
 */
export async function reverseGeocodeWithGoogle(
  lat: number,
  lng: number
): Promise<{ city: string; address: string } | null> {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    );
    if (!res.ok) return null;
    const data = await res.json();

    if (data.status === "OK" && data.results && data.results.length > 0) {
      const result = data.results[0];
      const address = result.formatted_address || "Current Location";

      let city = "";
      for (const comp of result.address_components || []) {
        if (comp.types.includes("locality")) {
          city = comp.long_name;
          break;
        } else if (
          !city &&
          (comp.types.includes("administrative_area_level_2") ||
            comp.types.includes("administrative_area_level_1"))
        ) {
          city = comp.long_name;
        }
      }

      return {
        city: city || "Current Location",
        address,
      };
    }
    return null;
  } catch (e) {
    console.warn("Google Maps reverse geocoding notice:", e);
    return null;
  }
}

/**
 * Free reverse geocoding fallback in case Google Maps billing is pending.
 */
export async function reverseGeocodeFallback(
  lat: number,
  lng: number
): Promise<{ city: string; address: string }> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14`,
      { headers: { "Accept-Language": "en" } }
    );
    if (res.ok) {
      const data = await res.json();
      const city =
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        data.address?.suburb ||
        data.address?.state ||
        "Nearby";
      const address = data.display_name || `Lat: ${lat.toFixed(3)}, Lng: ${lng.toFixed(3)}`;
      return { city, address };
    }
  } catch (e) {
    console.warn("Fallback geocoding notice:", e);
  }

  return {
    city: "Current Location",
    address: `GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
  };
}

/**
 * Resolves current user location: GPS -> Google Maps Geocoding -> Fallback
 */
export async function resolveCurrentLocation(): Promise<LocationResult> {
  const coords = await fetchCurrentPosition();

  // Try Google Maps Geocoding first
  const googleResult = await reverseGeocodeWithGoogle(coords.lat, coords.lng);
  if (googleResult) {
    return {
      coords,
      city: googleResult.city,
      address: googleResult.address,
      source: "google",
    };
  }

  // Fallback to OSM/Coordinates
  const fallbackResult = await reverseGeocodeFallback(coords.lat, coords.lng);
  return {
    coords,
    city: fallbackResult.city,
    address: fallbackResult.address,
    source: "fallback",
  };
}
