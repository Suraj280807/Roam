export const GOOGLE_MAPS_API_KEY =
  (import.meta as unknown as { env: Record<string, string> }).env?.["VITE_MAPS_API_KEY"] ||
  "AIzaSyAtNv_a35ZYkYKrgYaOzNvtxpllq7bZg50";

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
  source: "google" | "fallback" | "demo" | "ip";
  parentCity?: string;
  locality?: string;
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
        timeout: 8000,
        maximumAge: 30000,
      },
    );
  });
}

/**
 * Reverse-geocode latitude and longitude using Google Maps Geocoding API.
 */
export async function reverseGeocodeWithGoogle(
  lat: number,
  lng: number,
): Promise<{ city: string; address: string; parentCity?: string; locality?: string } | null> {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`,
    );
    if (!res.ok) return null;
    const data = await res.json();

    if (data.status === "OK" && data.results && data.results.length > 0) {
      const result = data.results[0];
      const address = result.formatted_address || "Current Location";

      let locality = "";
      let primaryCity = "";

      for (const comp of result.address_components || []) {
        if (comp.types.includes("sublocality") || comp.types.includes("neighborhood")) {
          locality = comp.long_name;
        } else if (comp.types.includes("locality")) {
          primaryCity = comp.long_name;
        } else if (
          !primaryCity &&
          (comp.types.includes("administrative_area_level_2") ||
            comp.types.includes("administrative_area_level_1"))
        ) {
          primaryCity = comp.long_name;
        }
      }

      const displayCity =
        locality && primaryCity && locality.toLowerCase() !== primaryCity.toLowerCase()
          ? `${locality}, ${primaryCity}`
          : primaryCity || locality || "Current Location";

      return {
        city: displayCity,
        address,
        parentCity: primaryCity || locality,
        locality: locality || primaryCity,
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
 * Intelligent extraction of locality (e.g. Pirwadi) and main city/district (e.g. Satara).
 */
export async function reverseGeocodeFallback(
  lat: number,
  lng: number,
): Promise<{ city: string; address: string; parentCity?: string; locality?: string }> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14`,
      { headers: { "Accept-Language": "en", "User-Agent": "RoamTravelCompanion/2.0" } },
    );
    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};

      const locality =
        addr.suburb ||
        addr.neighbourhood ||
        addr.village ||
        addr.residential ||
        addr.hamlet ||
        "";

      const primaryCity =
        addr.city ||
        addr.town ||
        addr.municipality ||
        addr.county ||
        addr.state_district ||
        addr.district ||
        "";

      const state = addr.state || "";

      let displayCity = "";
      if (locality && primaryCity && locality.toLowerCase() !== primaryCity.toLowerCase()) {
        displayCity = `${locality}, ${primaryCity}`;
      } else {
        displayCity = primaryCity || locality || state || "Current Location";
      }

      const address = data.display_name || `Lat: ${lat.toFixed(3)}, Lng: ${lng.toFixed(3)}`;
      return {
        city: displayCity,
        address,
        parentCity: primaryCity || locality || state,
        locality: locality || primaryCity,
      };
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
 * IP-based geolocation fallback when GPS permission is denied on mobile devices.
 */
export async function resolveIpLocation(): Promise<LocationResult | null> {
  try {
    const res = await fetch("https://api.bigdatacloud.net/data/reverse-geocode-client");
    if (res.ok) {
      const data = await res.json();
      const locality = data.locality || "";
      const primaryCity = data.city || data.principalSubdivision || "Current Area";
      const country = data.countryName || "";
      const displayCity =
        locality && primaryCity && locality.toLowerCase() !== primaryCity.toLowerCase()
          ? `${locality}, ${primaryCity}`
          : primaryCity;
      const address = `${displayCity}${country ? `, ${country}` : ""} (Network Location)`;
      const lat = Number(data.latitude) || 0;
      const lng = Number(data.longitude) || 0;
      if (lat !== 0 || lng !== 0) {
        return {
          city: displayCity,
          parentCity: primaryCity,
          locality,
          address,
          coords: { lat, lng },
          source: "ip",
        };
      }
    }
  } catch (e) {
    console.warn("IP Geolocation 1 failed:", e);
  }

  try {
    const res = await fetch("https://ipapi.co/json/");
    if (res.ok) {
      const data = await res.json();
      const city = data.city || data.region || "Current Area";
      const country = data.country_name || "";
      const address = `${city}${country ? `, ${country}` : ""} (Network Location)`;
      return {
        city,
        parentCity: city,
        address,
        coords: { lat: Number(data.latitude), lng: Number(data.longitude) },
        source: "ip",
      };
    }
  } catch (e) {
    console.warn("IP Geolocation 2 failed:", e);
  }

  return null;
}

/**
 * Resolves current user location: GPS -> Google Maps / OSM -> Automatic IP fallback if GPS is denied
 */
export async function resolveCurrentLocation(): Promise<LocationResult> {
  try {
    const coords = await fetchCurrentPosition();

    // Try Google Maps Geocoding first
    const googleResult = await reverseGeocodeWithGoogle(coords.lat, coords.lng);
    if (googleResult) {
      return {
        coords,
        city: googleResult.city,
        parentCity: googleResult.parentCity,
        locality: googleResult.locality,
        address: googleResult.address,
        source: "google",
      };
    }

    // Fallback to OSM/Coordinates
    const fallbackResult = await reverseGeocodeFallback(coords.lat, coords.lng);
    return {
      coords,
      city: fallbackResult.city,
      parentCity: fallbackResult.parentCity,
      locality: fallbackResult.locality,
      address: fallbackResult.address,
      source: "fallback",
    };
  } catch (gpsError: unknown) {
    console.warn("GPS unavailable or permission denied, using IP fallback:", gpsError);

    // If GPS was blocked or failed, try IP Geolocation so mobile users still get their location!
    const ipResult = await resolveIpLocation();
    if (ipResult) {
      return ipResult;
    }

    throw gpsError;
  }
}
