import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, Gem, LocateFixed, MapPin, Search, Sparkles, User, X } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { FeaturedCard, RowCard } from "@/components/PlaceCard";
import { CATEGORIES, PLACES, type Category } from "@/lib/places";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover Lisbon — Roam" },
      { name: "description", content: "Featured destinations, nearby attractions and hidden gems around you." },
      { property: "og:title", content: "Discover Lisbon — Roam" },
      { property: "og:description", content: "Featured destinations, nearby attractions and hidden gems." },
    ],
  }),
  component: Discover,
});

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

function Discover() {
  const { name, location, update, interests, ready } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "All">("All");
  const [locOpen, setLocOpen] = useState(false);

  const filtered = useMemo(() => PLACES.filter((p) =>
    (cat === "All" || p.category === cat) &&
    (q === "" || `${p.name} ${p.area} ${p.category} ${p.tagline}`.toLowerCase().includes(q.toLowerCase()))
  ), [q, cat]);
  const searching = q !== "" || cat !== "All";
  const nearby = [...PLACES].sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 3);
  const forYou = PLACES.filter((p) => interests.includes(p.category)).slice(0, 2);

  const useDevice = () => {
    if (!navigator.geolocation) { toast.error("Location isn't available on this device."); return; }
    navigator.geolocation.getCurrentPosition(
      () => { update({ location: "device" }); setLocOpen(false); toast.success("Location enabled — showing Lisbon demo distances."); },
      () => { toast.error("Permission denied. Using demo location instead."); update({ location: "demo" }); setLocOpen(false); },
    );
  };

  return (
    <AppShell>
      <header className="flex items-center justify-between px-5 pt-8">
        <div>
          <p className="text-sm text-muted-foreground">{greeting()}, {name}</p>
          <button onClick={() => setLocOpen(true)} className="mt-0.5 flex items-center gap-1 font-display text-2xl font-semibold">
            <MapPin className="h-5 w-5 text-primary" /> Lisbon <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <Link to="/profile" aria-label="Profile" className="grid h-11 w-11 place-items-center rounded-full bg-emerald text-primary-foreground shadow-card">
          <User className="h-5 w-5" />
        </Link>
      </header>

      {ready && location === "unset" && (
        <div className="mx-5 mt-4 animate-rise rounded-2xl bg-emerald p-4 text-primary-foreground shadow-card">
          <p className="flex items-center gap-2 font-semibold"><LocateFixed className="h-4 w-4" /> Find places around you</p>
          <p className="mt-1 text-xs opacity-85">Allow location to see nearby landmarks, or try the demo set in central Lisbon.</p>
          <div className="mt-3 flex gap-2">
            <button onClick={useDevice} className="rounded-full bg-gold px-4 py-2 text-xs font-bold text-gold-foreground">Allow location</button>
            <button onClick={() => update({ location: "demo" })} className="rounded-full border border-primary-foreground/40 px-4 py-2 text-xs font-bold">Use demo location</button>
          </div>
        </div>
      )}

      <div className="px-5 pt-5">
        <label className="flex items-center gap-2 rounded-2xl bg-card px-4 py-3 shadow-card">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search landmarks, food, viewpoints…" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" aria-label="Search places" />
          {q && <button onClick={() => setQ("")} aria-label="Clear search"><X className="h-4 w-4 text-muted-foreground" /></button>}
        </label>
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pt-4">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-card text-foreground shadow-card"}`}>
            {c}
          </button>
        ))}
      </div>

      {searching ? (
        <section className="space-y-3 px-5 pt-6">
          <p className="text-sm text-muted-foreground">{filtered.length} result{filtered.length !== 1 && "s"}</p>
          {filtered.map((p) => <RowCard key={p.id} place={p} />)}
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed p-8 text-center">
              <p className="font-display text-lg">No places found</p>
              <p className="mt-1 text-sm text-muted-foreground">Try another word or category.</p>
              <button onClick={() => { setQ(""); setCat("All"); }} className="mt-4 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">Clear filters</button>
            </div>
          )}
        </section>
      ) : (
        <>
          <Section title="Featured destinations">
            <div className="no-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 pb-2">
              {PLACES.filter((p) => p.featured).map((p) => <FeaturedCard key={p.id} place={p} />)}
            </div>
          </Section>
          <Section title="Nearby now" action={<Link to="/explore" className="text-xs font-bold text-primary">See map</Link>}>
            <div className="space-y-3">{nearby.map((p) => <RowCard key={p.id} place={p} />)}</div>
          </Section>
          <Section title="Hidden gems" icon={<Gem className="h-4 w-4 text-gold" />}>
            <div className="grid grid-cols-2 gap-3">
              {PLACES.filter((p) => p.hiddenGem).map((p) => (
                <Link key={p.id} to="/place/$id" params={{ id: p.id }} className="relative h-44 overflow-hidden rounded-2xl shadow-card last:odd:col-span-2">
                  <img src={p.image} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-photo-fade" />
                  <p className="absolute bottom-3 left-3 right-3 font-display text-sm font-semibold leading-tight text-on-photo">{p.name}</p>
                </Link>
              ))}
            </div>
          </Section>
          {forYou.length > 0 && (
            <Section title="Picked for you" icon={<Sparkles className="h-4 w-4 text-gold" />}>
              <div className="space-y-3">
                {forYou.map((p) => (
                  <Link key={p.id} to="/place/$id" params={{ id: p.id }} className="block rounded-2xl bg-accent p-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-accent-foreground">Because you like {p.category.toLowerCase()}</p>
                    <p className="mt-1 font-display text-lg font-semibold">{p.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                  </Link>
                ))}
              </div>
            </Section>
          )}
        </>
      )}

      {locOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/50" onClick={() => setLocOpen(false)}>
          <div className="w-full max-w-[440px] animate-rise rounded-t-3xl bg-background p-6" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Location">
            <h2 className="text-xl font-semibold">Your location</h2>
            <p className="mt-1 text-sm text-muted-foreground">Roam's prototype covers Lisbon. Distances are measured from Baixa (demo).</p>
            <p className="mt-3 text-xs font-semibold text-primary">Current: {location === "device" ? "Device location (demo distances)" : location === "demo" ? "Demo location — Baixa, Lisbon" : "Not set"}</p>
            <div className="mt-5 space-y-2">
              <button onClick={useDevice} className="w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground">Use my device location</button>
              <button onClick={() => { update({ location: "demo" }); setLocOpen(false); toast("Using demo location: Baixa, Lisbon"); }} className="w-full rounded-full bg-secondary py-3 text-sm font-bold text-secondary-foreground">Use demo location</button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function Section({ title, children, action, icon }: { title: string; children: React.ReactNode; action?: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <section className="px-5 pt-7">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold">{icon}{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
