import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Compass,
  Headphones,
  List,
  Map as MapIcon,
  MapPin,
  Navigation,
  Sparkles,
} from "lucide-react";
import { AppShell, ScreenHeader } from "@/components/AppShell";
import { RowCard } from "@/components/PlaceCard";
import { DynamicMap } from "@/components/DynamicMap";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore the Map — Roam" },
      {
        name: "description",
        content: "Browse landmarks on an interactive map with live audio tour and directions.",
      },
      { property: "og:title", content: "Explore the Map — Roam" },
      { property: "og:description", content: "An interactive real-world map of landmarks." },
    ],
  }),
  component: Explore,
});

function Explore() {
  const [view, setView] = useState<"map" | "list">("map");
  const {
    stamps,
    location,
    city,
    playAudioTour,
    isAudioPlaying,
    activeAudioPlaceId,
    quests,
    activePlaces: places,
    searchDestination,
  } = useStore();
  const [sel, setSel] = useState<string>(places[0]?.id || "");

  useEffect(() => {
    if (!places.some((p) => p.id === sel)) {
      setSel(places[0]?.id || "");
    }
  }, [places, sel]);

  const place = places.find((p) => p.id === sel) || places[0];
  const placeQuest = quests.find((q) => q.placeId === place?.id && !q.isCompleted);

  const handleStartAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!place) return;
    playAudioTour(place.id, place.name, `${place.tagline}. ${place.history} ${place.culture}`);
    toast.success(`Audio tour started for ${place.name}`);
  };

  return (
    <AppShell>
      <ScreenHeader
        title="Explore"
        subtitle={
          location === "demo"
            ? "Lisbon · Interactive Map"
            : `${city && city !== "Lisbon" ? city : "Live Location"} · ${places.length} Landmarks`
        }
        right={
          <div role="tablist" className="flex rounded-full bg-card p-1 shadow-card">
            {(["map", "list"] as const).map((v) => (
              <button
                key={v}
                role="tab"
                aria-selected={view === v}
                onClick={() => setView(v)}
                className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold capitalize transition-all ${
                  view === v
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {v === "map" ? (
                  <MapIcon className="h-3.5 w-3.5" />
                ) : (
                  <List className="h-3.5 w-3.5" />
                )}
                {v}
              </button>
            ))}
          </div>
        }
      />

      {/* Quick City Switcher Chips */}
      <div className="no-scrollbar flex gap-1.5 overflow-x-auto px-5 pb-3">
        {["Satara", "Pune", "Mumbai", "Goa", "Jaipur", "Delhi", "Bangalore", "Kolhapur", "Lisbon"].map(
          (c) => (
            <button
              key={c}
              onClick={async () => {
                const ok = await searchDestination(c);
                if (ok) toast.success(`Exploration map moved to ${c}`);
              }}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                (city || "").toLowerCase().includes(c.toLowerCase())
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card text-muted-foreground border border-border hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ),
        )}
      </div>

      {view === "map" ? (
        <div className="px-5">
          {/* Real Leaflet OpenStreetMap View */}
          <div className="h-[430px] w-full">
            <DynamicMap
              places={places}
              selectedPlaceId={sel}
              onSelectPlace={(id) => setSel(id)}
              centerCoords={place?.coords}
            />
          </div>

          {/* Place Preview Card */}
          {place && (
            <div
              key={place.id}
              className="relative z-10 -mt-10 mx-1 animate-rise rounded-3xl bg-card border border-border/80 p-3.5 shadow-float backdrop-blur-md"
            >
              <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-border" />
              <div className="flex gap-3">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-24 w-24 rounded-2xl object-cover shadow-sm"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                      {place.category}
                    </p>
                    {placeQuest && (
                      <span className="flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold text-gold-foreground">
                        <Sparkles className="h-2.5 w-2.5 text-gold" /> Quest
                      </span>
                    )}
                  </div>
                  <h2 className="text-base font-bold leading-tight truncate">{place.name}</h2>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    {place.distanceKm} km · {place.duration}
                  </p>

                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <button
                      onClick={handleStartAudio}
                      className="flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-gold-foreground shadow-sm hover:opacity-90 active:scale-95"
                    >
                      <Headphones className="h-3 w-3" />
                      {isAudioPlaying && activeAudioPlaceId === place.id ? "Playing" : "Audio Tour"}
                    </button>
                    <Link
                      to="/guide/$id"
                      params={{ id: place.id }}
                      className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-bold text-secondary-foreground hover:bg-secondary/80"
                    >
                      <Navigation className="h-3 w-3" />
                      Ask Guide
                    </Link>
                    <Link
                      to="/place/$id"
                      params={{ id: place.id }}
                      className="flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground hover:opacity-95"
                    >
                      Details <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Landmark Carousel */}
          <h2 className="mt-6 mb-3 text-base font-bold">Discover Landmarks Nearby</h2>
          <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-2">
            {[...places]
              .sort((a, b) => a.distanceKm - b.distanceKm)
              .map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSel(p.id)}
                  className={`w-36 shrink-0 overflow-hidden rounded-2xl bg-card text-left border border-border shadow-card transition-all ${
                    p.id === sel
                      ? "ring-2 ring-primary scale-[1.02]"
                      : "opacity-90 hover:opacity-100"
                  }`}
                >
                  <img src={p.image} alt="" loading="lazy" className="h-20 w-full object-cover" />
                  <div className="p-2">
                    <p className="truncate text-xs font-bold">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground">{p.distanceKm} km away</p>
                  </div>
                </button>
              ))}
          </div>
        </div>
      ) : (
        <div className="space-y-3 px-5">
          {[...places]
            .sort((a, b) => a.distanceKm - b.distanceKm)
            .map((p) => (
              <RowCard key={p.id} place={p} />
            ))}
        </div>
      )}
    </AppShell>
  );
}
