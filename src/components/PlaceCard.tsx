import { Link } from "@tanstack/react-router";
import { Bookmark, MapPin, Star } from "lucide-react";
import type { Place } from "@/lib/places";
import { useStore } from "@/lib/store";

export function SaveButton({ id, className = "" }: { id: string; className?: string }) {
  const { saved, toggleSave } = useStore();
  const on = saved.includes(id);
  return (
    <button
      aria-label={on ? "Remove from saved" : "Save place"}
      aria-pressed={on}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSave(id); }}
      className={`grid h-9 w-9 place-items-center rounded-full bg-background/90 text-primary backdrop-blur transition-transform active:scale-90 ${className}`}
    >
      <Bookmark className={`h-4 w-4 ${on ? "fill-primary" : ""}`} />
    </button>
  );
}

export function FeaturedCard({ place }: { place: Place }) {
  return (
    <Link to="/place/$id" params={{ id: place.id }} className="relative block h-80 w-60 shrink-0 overflow-hidden rounded-3xl shadow-card">
      <img src={place.image} alt={place.name} loading="lazy" width={800} height={1008} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
      <div className="absolute inset-0 bg-photo-fade" />
      <SaveButton id={place.id} className="absolute right-3 top-3" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-on-photo">
        <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-foreground">{place.category}</span>
        <h3 className="mt-2 text-xl font-semibold leading-tight">{place.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-xs opacity-85"><MapPin className="h-3 w-3" />{place.area} · {place.distanceKm} km</p>
      </div>
    </Link>
  );
}

export function RowCard({ place }: { place: Place }) {
  return (
    <Link to="/place/$id" params={{ id: place.id }} className="flex items-center gap-3 rounded-2xl bg-card p-2.5 shadow-card transition-transform active:scale-[0.98]">
      <img src={place.image} alt={place.name} loading="lazy" width={80} height={80} className="h-20 w-20 rounded-xl object-cover" />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-wider text-primary">{place.category}</p>
        <h3 className="truncate font-display text-base font-semibold">{place.name}</h3>
        <p className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" />{place.distanceKm} km</span>
          <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-gold text-gold" />{place.rating}</span>
        </p>
      </div>
      <SaveButton id={place.id} className="bg-secondary" />
    </Link>
  );
}
