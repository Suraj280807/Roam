import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, Gem, LocateFixed, MapPin, Search, Sparkles, User, Utensils, X } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { FeaturedCard, RowCard } from "@/components/PlaceCard";
import { CATEGORIES, getPlacesForLocation, type Category } from "@/lib/places";
import { useStore } from "@/lib/store";
import { resolveCurrentLocation } from "@/lib/location";
import { toast } from "sonner";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover Places — Roam" },
      { name: "description", content: "Featured destinations, nearby attractions and hidden gems around you." },
      { property: "og:title", content: "Discover Places — Roam" },
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
  const { name, location, city, resolvedAddress, interests, ready, setDemoLocation, setDeviceLocation } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "All">("All");
  const [locOpen, setLocOpen] = useState(false);
  const [locating, setLocating] = useState(false);

  const activePlaces = useMemo(() => {
    return getPlacesForLocation(location);
  }, [location]);

  const filtered = useMemo(() => activePlaces.filter((p) =>
    (cat === "All" || p.category === cat) &&
    (q === "" || `${p.name} ${p.area} ${p.category} ${p.tagline}`.toLowerCase().includes(q.toLowerCase()))
  ), [activePlaces, q, cat]);

  const searching = q !== "" || cat !== "All";

  // Nearby: non-food landmarks sorted by distance (SGU first, Ramling second in current location)
  const nearby = useMemo(() => {
    const nonFood = activePlaces.filter((p) => p.category !== "Food");
    return (nonFood.length > 0 ? nonFood : activePlaces).sort((a, b) => a.distanceKm - b.distanceKm);
  }, [activePlaces]);

  // Food section: Cafe Amigo's & The Tea Toast Co.
  const foodPlaces = useMemo(() => {
    return activePlaces.filter((p) => p.category === "Food");
  }, [activePlaces]);

  const featured = useMemo(() => {
    return activePlaces.filter((p) => p.featured);
  }, [activePlaces]);

  const forYou = useMemo(() => {
    return activePlaces.filter((p) => interests.includes(p.category)).slice(0, 2);
  }, [activePlaces, interests]);

  const handleUseCurrentLocation = async () => {
    try {
      setLocating(true);
      const res = await resolveCurrentLocation();
      setDeviceLocation(res.coords, res.city, res.address);
      setLocOpen(false);
      if (res.source === "ip") {
        toast.info(`Location set: ${res.city} (Network Estimated).`);
      } else {
        toast.success(`Current location set: ${res.city}`);
      }
    } catch (err: any) {
      toast.error(err?.message || "Could not access location.");
    } finally {
      setLocating(false);
    }
  };

  const handleUseDemoLocation = () => {
    setDemoLocation();
    setLocOpen(false);
    toast.success("Switched to Demo location: Baixa, Lisbon");
  };

  return (
    <AppShell>
      <header className="flex items-center justify-between px-5 pt-8">
        <div>
          <p className="text-sm text-muted-foreground">{greeting()}, {name}</p>
          <button onClick={() => setLocOpen(true)} className="mt-0.5 flex items-center gap-1.5 font-display text-2xl font-semibold hover:opacity-80 transition-opacity">
            <MapPin className="h-5 w-5 text-primary" /> {location === "demo" ? "Lisbon" : (city && city !== "Lisbon" ? city : "Kolhapur")}
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
              {location === "demo" ? "Demo" : "Live GPS"}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <Link to="/profile" aria-label="Profile" className="grid h-11 w-11 place-items-center rounded-full bg-emerald text-primary-foreground shadow-card">
          <User className="h-5 w-5" />
        </Link>
      </header>

      {ready && location === "unset" && (
        <div className="mx-5 mt-4 animate-rise rounded-2xl bg-emerald p-4 text-primary-foreground shadow-card">
          <p className="flex items-center gap-2 font-semibold"><LocateFixed className="h-4 w-4" /> Find places around you</p>
          <p className="mt-1 text-xs opacity-85">Enable current location via GPS and Google Maps, or explore the demo set in Lisbon.</p>
          <div className="mt-3 flex gap-2">
            <button onClick={handleUseCurrentLocation} disabled={locating} className="rounded-full bg-gold px-4 py-2 text-xs font-bold text-gold-foreground disabled:opacity-50">
              {locating ? "Locating..." : "Use Current Location"}
            </button>
            <button onClick={handleUseDemoLocation} className="rounded-full border border-primary-foreground/40 px-4 py-2 text-xs font-bold">
              Use Demo Location
            </button>
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
          {featured.length > 0 && (
            <Section title="Featured destinations">
              <div className="no-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 pb-2">
                {featured.map((p) => <FeaturedCard key={p.id} place={p} />)}
              </div>
            </Section>
          )}

          <Section title="Nearby now" action={<Link to="/explore" className="text-xs font-bold text-primary">See map</Link>}>
            <div className="space-y-3">{nearby.map((p) => <RowCard key={p.id} place={p} />)}</div>
          </Section>

          {foodPlaces.length > 0 && (
            <Section title="Food & Cafés" icon={<Utensils className="h-4 w-4 text-primary" />}>
              <div className="space-y-3">{foodPlaces.map((p) => <RowCard key={p.id} place={p} />)}</div>
            </Section>
          )}

          {activePlaces.some((p) => p.hiddenGem) && (
            <Section title="Hidden gems" icon={<Gem className="h-4 w-4 text-gold" />}>
              <div className="grid grid-cols-2 gap-3">
                {activePlaces.filter((p) => p.hiddenGem).map((p) => (
                  <Link key={p.id} to="/place/$id" params={{ id: p.id }} className="relative h-44 overflow-hidden rounded-2xl shadow-card last:odd:col-span-2">
                    <img src={p.image} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-photo-fade" />
                    <p className="absolute bottom-3 left-3 right-3 font-display text-sm font-semibold leading-tight text-on-photo">{p.name}</p>
                  </Link>
                ))}
              </div>
            </Section>
          )}

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
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm" onClick={() => setLocOpen(false)}>
          <div className="w-full max-w-[440px] animate-rise rounded-t-3xl sm:rounded-3xl bg-background p-6 shadow-2xl border border-border" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Location">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-display">Choose Location</h2>
              <button onClick={() => setLocOpen(false)} className="rounded-full p-1 text-muted-foreground hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Select whether to use your live GPS location or explore the Lisbon demo.</p>

            <div className="mt-4 space-y-3">
              {/* Option 1: Live Current Location */}
              <div className={`rounded-2xl border p-4 transition-all ${location === "device" ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border bg-card"}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <LocateFixed className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">Use Current Location</h3>
                      <p className="text-[11px] text-muted-foreground">GPS & Google Maps Geocoding</p>
                    </div>
                  </div>
                  {location === "device" && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">Active</span>
                  )}
                </div>

                {location === "device" && resolvedAddress && (
                  <div className="mt-2.5 rounded-xl bg-background/80 p-2.5 text-xs text-foreground border">
                    <span className="font-semibold text-primary block">Detected Address:</span>
                    <span className="text-muted-foreground">{resolvedAddress}</span>
                  </div>
                )}

                <button
                  onClick={handleUseCurrentLocation}
                  disabled={locating}
                  className="mt-3 w-full rounded-full bg-primary py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {locating ? "Detecting location..." : location === "device" ? "Refresh GPS Location" : "Set Current Location"}
                </button>
              </div>

              {/* Option 2: Demo Location */}
              <div className={`rounded-2xl border p-4 transition-all ${location === "demo" ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border bg-card"}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">Demo Location</h3>
                      <p className="text-[11px] text-muted-foreground">Baixa Pombalina, Lisbon</p>
                    </div>
                  </div>
                  {location === "demo" && (
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-secondary-foreground">Active</span>
                  )}
                </div>

                <button
                  onClick={handleUseDemoLocation}
                  className="mt-3 w-full rounded-full bg-secondary py-2.5 text-xs font-bold text-secondary-foreground hover:bg-secondary/80"
                >
                  {location === "demo" ? "Using Demo Location" : "Switch to Demo Location"}
                </button>
              </div>

              <div className="rounded-xl bg-muted/50 p-2.5 text-[11px] text-muted-foreground border">
                💡 <strong>iPhone Tip:</strong> If GPS is blocked, Roam automatically detects your city via network, or you can enable GPS by tapping the icon in your address bar → <em>Website Settings</em> → <em>Location: Allow</em>.
              </div>
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
