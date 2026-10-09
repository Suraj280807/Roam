import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, List, Map as MapIcon, MapPin, Navigation } from "lucide-react";
import { AppShell, ScreenHeader } from "@/components/AppShell";
import { RowCard } from "@/components/PlaceCard";
import { PLACES } from "@/lib/places";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore the map — Roam" },
      { name: "description", content: "Browse landmarks on an interactive map of Lisbon and pick your next stop." },
      { property: "og:title", content: "Explore the map — Roam" },
      { property: "og:description", content: "An interactive map of Lisbon's landmarks." },
    ],
  }),
  component: Explore,
});

function Explore() {
  const [view, setView] = useState<"map" | "list">("map");
  const [sel, setSel] = useState(PLACES[2].id);
  const { stamps } = useStore();
  const place = PLACES.find((p) => p.id === sel)!;

  return (
    <AppShell>
      <ScreenHeader title="Explore" subtitle="Lisbon · demo map"
        right={
          <div role="tablist" className="flex rounded-full bg-card p-1 shadow-card">
            {(["map", "list"] as const).map((v) => (
              <button key={v} role="tab" aria-selected={view === v} onClick={() => setView(v)}
                className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold capitalize ${view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                {v === "map" ? <MapIcon className="h-3.5 w-3.5" /> : <List className="h-3.5 w-3.5" />}{v}
              </button>
            ))}
          </div>
        } />

      {view === "map" ? (
        <div className="px-5">
          <div className="relative h-[430px] overflow-hidden rounded-3xl bg-map-land shadow-card">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
              <path d="M0 82 C 20 78, 35 84, 55 76 S 85 66, 100 70 L100 100 L0 100 Z" className="fill-map-water" />
              <ellipse cx="40" cy="30" rx="14" ry="9" className="fill-map-park" />
              <ellipse cx="85" cy="20" rx="10" ry="7" className="fill-map-park" />
              {[15, 30, 45, 60].map((y) => <path key={y} d={`M0 ${y} Q 50 ${y - 6} 100 ${y + 4}`} className="stroke-border" strokeWidth="0.6" fill="none" />)}
              {[20, 45, 70].map((x) => <path key={x} d={`M${x} 0 Q ${x + 6} 50 ${x - 4} 80`} className="stroke-border" strokeWidth="0.6" fill="none" />)}
              <path d="M5 70 L 95 40" className="stroke-gold" strokeWidth="0.5" strokeDasharray="1.5 1" fill="none" />
            </svg>
            <span className="absolute bottom-3 left-3 rounded-full bg-background/80 px-2 py-1 text-[10px] font-semibold text-muted-foreground">Tagus River</span>
            <div className="absolute" style={{ left: "52%", top: "55%" }} aria-label="You are here (demo)">
              <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-primary/40 animate-pulse-ring" />
              <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full border-2 border-background bg-primary" />
            </div>
            {PLACES.map((p) => {
              const active = p.id === sel;
              const done = stamps.some((s) => s.placeId === p.id);
              return (
                <button key={p.id} onClick={() => setSel(p.id)} aria-label={p.name} aria-pressed={active}
                  className="absolute -translate-x-1/2 -translate-y-full transition-transform"
                  style={{ left: `${p.map.x}%`, top: `${p.map.y}%`, zIndex: active ? 10 : 1 }}>
                  <span className={`flex items-center gap-1 rounded-full py-1 pl-1 pr-2 text-[10px] font-bold shadow-card ${active ? "scale-110 bg-charcoal text-gold" : "bg-card text-foreground"}`}>
                    <img src={p.image} alt="" className="h-6 w-6 rounded-full object-cover" />
                    {active || done ? p.name.split(" ")[0] : ""}
                    {done && "✓"}
                  </span>
                </button>
              );
            })}
          </div>

          <div key={place.id} className="relative z-10 -mt-14 mx-2 animate-rise rounded-3xl bg-card p-3 shadow-float">
            <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-border" />
            <div className="flex gap-3">
              <img src={place.image} alt={place.name} className="h-24 w-24 rounded-2xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary">{place.category}</p>
                <h2 className="text-lg font-semibold leading-tight">{place.name}</h2>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{place.distanceKm} km · {place.duration}</p>
                <div className="mt-2 flex gap-2">
                  <Link to="/place/$id" params={{ id: place.id }} className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">Details <ArrowRight className="h-3 w-3" /></Link>
                  <Link to="/guide/$id" params={{ id: place.id }} className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-xs font-bold text-secondary-foreground"><Navigation className="h-3 w-3" />Ask guide</Link>
                </div>
              </div>
            </div>
          </div>
          <h2 className="mt-6 mb-3 text-lg font-semibold">Nearby places</h2>
          <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-2">
            {[...PLACES].sort((a, b) => a.distanceKm - b.distanceKm).map((p) => (
              <button key={p.id} onClick={() => setSel(p.id)} className={`w-36 shrink-0 overflow-hidden rounded-2xl bg-card text-left shadow-card ${p.id === sel ? "ring-2 ring-primary" : ""}`}>
                <img src={p.image} alt="" loading="lazy" className="h-20 w-full object-cover" />
                <p className="truncate px-2 pt-2 text-xs font-bold">{p.name}</p>
                <p className="px-2 pb-2 text-[11px] text-muted-foreground">{p.distanceKm} km</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-3 px-5">
          {[...PLACES].sort((a, b) => a.distanceKm - b.distanceKm).map((p) => <RowCard key={p.id} place={p} />)}
        </div>
      )}
    </AppShell>
  );
}
