import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Coffee,
  Crown,
  Gem,
  Globe,
  Hotel,
  LocateFixed,
  MapPin,
  Search,
  Sparkles,
  User,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AuthModal } from "@/components/AuthModal";
import { ProUpgradeModal } from "@/components/ProUpgradeModal";
import { FeaturedCard, RowCard } from "@/components/PlaceCard";
import { CATEGORIES, type Category } from "@/lib/places";
import { useStore } from "@/lib/store";
import { resolveCurrentLocation } from "@/lib/location";
import { toast } from "sonner";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover Places — Roam" },
      {
        name: "description",
        content: "Featured destinations, nearby attractions and hidden gems around you.",
      },
      { property: "og:title", content: "Discover Places — Roam" },
      {
        property: "og:description",
        content: "Featured destinations, nearby attractions and hidden gems.",
      },
    ],
  }),
  component: Discover,
});

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

function Discover() {
  const {
    name,
    user,
    isAuthenticated,
    location,
    city,
    resolvedAddress,
    interests,
    ready,
    setDemoLocation,
    setDeviceLocation,
    coins,
    isPro,
    quests,
    activePlaces,
    searchDestination,
  } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "All">("All");
  const [locOpen, setLocOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [proOpen, setProOpen] = useState(false);
  const [cityInput, setCityInput] = useState("");
  const [searchingCity, setSearchingCity] = useState(false);

  const handleSearchCity = async (targetCity: string) => {
    if (!targetCity.trim()) return;
    try {
      setSearchingCity(true);
      const ok = await searchDestination(targetCity.trim());
      if (ok) {
        toast.success(`Discovered spots in ${targetCity.trim()}!`);
        setLocOpen(false);
        setQ("");
      } else {
        toast.error(`Could not find spots for "${targetCity}". Try another city.`);
      }
    } catch {
      toast.error(`Error searching "${targetCity}".`);
    } finally {
      setSearchingCity(false);
    }
  };

  const filtered = useMemo(
    () =>
      activePlaces.filter(
        (p) =>
          (cat === "All" || p.category === cat) &&
          (q === "" ||
            `${p.name} ${p.area} ${p.category} ${p.tagline}`
              .toLowerCase()
              .includes(q.toLowerCase())),
      ),
    [activePlaces, q, cat],
  );

  const searching = q !== "" || cat !== "All";

  // Nearby: landmarks and heritage sites sorted by distance
  const nearby = useMemo(() => {
    const landmarksOnly = activePlaces.filter(
      (p) =>
        p.category !== "Food" &&
        p.category !== "Cafes" &&
        p.category !== "Restaurants" &&
        p.category !== "Hotels",
    );
    return (landmarksOnly.length > 0 ? landmarksOnly : activePlaces).sort(
      (a, b) => a.distanceKm - b.distanceKm,
    );
  }, [activePlaces]);

  // Cafes section
  const cafes = useMemo(() => {
    return activePlaces.filter((p) => p.category === "Cafes");
  }, [activePlaces]);

  // Restaurants section
  const restaurants = useMemo(() => {
    return activePlaces.filter((p) => p.category === "Restaurants");
  }, [activePlaces]);

  // Hotels section
  const hotels = useMemo(() => {
    return activePlaces.filter((p) => p.category === "Hotels");
  }, [activePlaces]);

  // Other Food section if any
  const otherFood = useMemo(() => {
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
      await setDeviceLocation(res.coords, res.city, res.address, res.parentCity);
      setLocOpen(false);
      toast.success(`Discovered spots near ${res.city}!`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not access location.";
      toast.error(msg);
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
          <p className="text-sm text-muted-foreground">
            {greeting()}, {name}
          </p>
          <button
            onClick={() => setLocOpen(true)}
            className="mt-0.5 flex items-center gap-1.5 font-display text-2xl font-semibold hover:opacity-80 transition-opacity"
          >
            <MapPin className="h-5 w-5 text-primary" />{" "}
            {location === "demo" ? "Lisbon" : city && city !== "Lisbon" ? city : "Kolhapur"}
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
              {location === "demo" ? "Demo" : "Live GPS"}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setProOpen(true)}
            className="flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-bold text-gold-foreground shadow-sm hover:bg-gold/20"
          >
            <span>🪙 {coins}</span>
            {isPro && <Crown className="h-3.5 w-3.5 text-gold" />}
          </button>
          <button
            onClick={() => setAuthOpen(true)}
            aria-label="Account & Auth"
            className="relative grid h-10 w-10 place-items-center rounded-full bg-emerald text-primary-foreground shadow-card hover:opacity-90 transition-transform active:scale-95"
          >
            {user ? (
              <span className="font-bold text-sm text-gold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <User className="h-5 w-5" />
            )}
            {isAuthenticated && user && (
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
            )}
          </button>
        </div>
      </header>

      {/* Exploration Quests Teaser */}
      <div className="mx-5 mt-4 flex items-center justify-between rounded-2xl border border-gold/40 bg-gradient-to-r from-card via-card to-gold/10 p-3.5 shadow-card">
        <div>
          <span className="flex items-center gap-1 text-[11px] font-bold text-gold">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Mystery Quests Active
          </span>
          <p className="mt-0.5 text-sm font-bold text-foreground">Solve Clues & Win Food Perks</p>
          <p className="text-[11px] text-muted-foreground">
            Free chai, 15% off burgers & golden stamps
          </p>
        </div>
        <Link
          to="/passport"
          className="rounded-full bg-gold px-3 py-1.5 text-xs font-bold text-gold-foreground shadow-sm hover:opacity-90 active:scale-95"
        >
          View Quests
        </Link>
      </div>

      {ready && location === "unset" && (
        <div className="mx-5 mt-4 animate-rise rounded-2xl bg-emerald p-4 text-primary-foreground shadow-card">
          <p className="flex items-center gap-2 font-semibold">
            <LocateFixed className="h-4 w-4" /> Find places around you
          </p>
          <p className="mt-1 text-xs opacity-85">
            Enable current location via GPS and Google Maps, or explore the demo set in Lisbon.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleUseCurrentLocation}
              disabled={locating}
              className="rounded-full bg-gold px-4 py-2 text-xs font-bold text-gold-foreground disabled:opacity-50"
            >
              {locating ? "Locating..." : "Use Current Location"}
            </button>
            <button
              onClick={handleUseDemoLocation}
              className="rounded-full border border-primary-foreground/40 px-4 py-2 text-xs font-bold"
            >
              Use Demo Location
            </button>
          </div>
        </div>
      )}

      <div className="px-5 pt-5">
        <label className="flex items-center gap-2 rounded-2xl bg-card px-4 py-3 shadow-card">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search landmarks, food, viewpoints…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Search places"
          />
          {q && (
            <button onClick={() => setQ("")} aria-label="Clear search">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </label>
      </div>

      {q.trim().length >= 2 && (
        <div className="px-5 pt-2.5">
          <button
            onClick={() => handleSearchCity(q.trim())}
            disabled={searchingCity}
            className="flex items-center justify-between w-full rounded-2xl bg-primary/10 border border-primary/30 p-3 text-left hover:bg-primary/15 transition-all text-xs font-bold text-primary shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span>
                {searchingCity
                  ? `Discovering spots in "${q.trim()}"...`
                  : `Search city "${q.trim()}" worldwide & load spots →`}
              </span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pt-4">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-card text-foreground shadow-card"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {searching ? (
        <section className="space-y-3 px-5 pt-6">
          <p className="text-sm text-muted-foreground">
            {filtered.length} result{filtered.length !== 1 && "s"}
          </p>
          {filtered.map((p) => (
            <RowCard key={p.id} place={p} />
          ))}
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed p-8 text-center">
              <p className="font-display text-lg">No places found</p>
              <p className="mt-1 text-sm text-muted-foreground">Try another word or category.</p>
              <button
                onClick={() => {
                  setQ("");
                  setCat("All");
                }}
                className="mt-4 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      ) : (
        <>
          {featured.length > 0 && (
            <Section title="Featured destinations">
              <div className="no-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 pb-2">
                {featured.map((p) => (
                  <FeaturedCard key={p.id} place={p} />
                ))}
              </div>
            </Section>
          )}

          <Section
            title="Nearby now"
            action={
              <Link to="/explore" className="text-xs font-bold text-primary">
                See map
              </Link>
            }
          >
            <div className="space-y-3">
              {nearby.map((p) => (
                <RowCard key={p.id} place={p} />
              ))}
            </div>
          </Section>

          {cafes.length > 0 && (
            <Section
              title="Famous Cafés ☕"
              icon={<Coffee className="h-5 w-5 text-amber-500" />}
              action={
                <button
                  onClick={() => setCat("Cafes")}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  See all ({cafes.length})
                </button>
              }
            >
              <div className="space-y-3">
                {cafes.map((p) => (
                  <RowCard key={p.id} place={p} />
                ))}
              </div>
            </Section>
          )}

          {restaurants.length > 0 && (
            <Section
              title="Top Restaurants & Dining 🍽️"
              icon={<UtensilsCrossed className="h-5 w-5 text-emerald" />}
              action={
                <button
                  onClick={() => setCat("Restaurants")}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  See all ({restaurants.length})
                </button>
              }
            >
              <div className="space-y-3">
                {restaurants.map((p) => (
                  <RowCard key={p.id} place={p} />
                ))}
              </div>
            </Section>
          )}

          {hotels.length > 0 && (
            <Section
              title="Hotels & Stays 🏨"
              icon={<Hotel className="h-5 w-5 text-blue-500" />}
              action={
                <button
                  onClick={() => setCat("Hotels")}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  See all ({hotels.length})
                </button>
              }
            >
              <div className="space-y-3">
                {hotels.map((p) => (
                  <RowCard key={p.id} place={p} />
                ))}
              </div>
            </Section>
          )}

          {otherFood.length > 0 && (
            <Section
              title="Local Delicacies & Street Food 🍜"
              icon={<UtensilsCrossed className="h-5 w-5 text-amber-600" />}
            >
              <div className="space-y-3">
                {otherFood.map((p) => (
                  <RowCard key={p.id} place={p} />
                ))}
              </div>
            </Section>
          )}

          {activePlaces.some((p) => p.hiddenGem) && (
            <Section title="Hidden gems" icon={<Gem className="h-4 w-4 text-gold" />}>
              <div className="grid grid-cols-2 gap-3">
                {activePlaces
                  .filter((p) => p.hiddenGem)
                  .map((p) => (
                    <Link
                      key={p.id}
                      to="/place/$id"
                      params={{ id: p.id }}
                      className="relative h-44 overflow-hidden rounded-2xl shadow-card last:odd:col-span-2"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-photo-fade" />
                      <p className="absolute bottom-3 left-3 right-3 font-display text-sm font-semibold leading-tight text-on-photo">
                        {p.name}
                      </p>
                    </Link>
                  ))}
              </div>
            </Section>
          )}

          {forYou.length > 0 && (
            <Section title="Picked for you" icon={<Sparkles className="h-4 w-4 text-gold" />}>
              <div className="space-y-3">
                {forYou.map((p) => (
                  <Link
                    key={p.id}
                    to="/place/$id"
                    params={{ id: p.id }}
                    className="block rounded-2xl bg-accent p-4"
                  >
                    <p className="text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
                      Because you like {p.category.toLowerCase()}
                    </p>
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
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm"
          onClick={() => setLocOpen(false)}
        >
          <div
            className="w-full max-w-[440px] animate-rise rounded-t-3xl sm:rounded-3xl bg-background p-6 shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Location"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-display">Choose Location</h2>
              <button
                onClick={() => setLocOpen(false)}
                className="rounded-full p-1 text-muted-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Select whether to use your live GPS location or explore the Lisbon demo.
            </p>

            <div className="mt-4 space-y-3">
              {/* Option 1: Live Current Location */}
              <div
                className={`rounded-2xl border p-4 transition-all ${location === "device" ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border bg-card"}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <LocateFixed className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">Use Current Location</h3>
                      <p className="text-[11px] text-muted-foreground">
                        GPS & Google Maps Geocoding
                      </p>
                    </div>
                  </div>
                  {location === "device" && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                      Active
                    </span>
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
                  {locating
                    ? "Detecting location..."
                    : location === "device"
                      ? "Refresh GPS Location"
                      : "Set Current Location"}
                </button>
              </div>

              {/* Option 2: Demo Location */}
              <div
                className={`rounded-2xl border p-4 transition-all ${location === "demo" ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border bg-card"}`}
              >
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
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-secondary-foreground">
                      Active
                    </span>
                  )}
                </div>

                <button
                  onClick={handleUseDemoLocation}
                  className="mt-3 w-full rounded-full bg-secondary py-2.5 text-xs font-bold text-secondary-foreground hover:bg-secondary/80"
                >
                  {location === "demo" ? "Using Demo Location" : "Switch to Demo Location"}
                </button>
              </div>

              {/* Option 3: Search Any City Worldwide */}
              <div className="rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">Search Any City Worldwide</h3>
                    <p className="text-[11px] text-muted-foreground">
                      Discover spots in any city or town globally
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearchCity(cityInput);
                  }}
                  className="mt-3 flex gap-2"
                >
                  <input
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    placeholder="e.g. Satara, Pune, Mumbai, Goa, Jaipur..."
                    className="flex-1 rounded-full border border-border bg-background px-3.5 py-2 text-xs outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    disabled={searchingCity || !cityInput.trim()}
                    className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    {searchingCity ? "..." : "Search"}
                  </button>
                </form>

                <div className="mt-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Popular Destinations:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Pune",
                      "Mumbai",
                      "Goa",
                      "Jaipur",
                      "Delhi",
                      "Bangalore",
                      "Kolhapur",
                      "Lisbon",
                    ].map((hub) => (
                      <button
                        key={hub}
                        type="button"
                        onClick={() => handleSearchCity(hub)}
                        className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {hub}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-muted/50 p-2.5 text-[11px] text-muted-foreground border">
                💡 <strong>iPhone Tip:</strong> If GPS is blocked, Roam automatically detects your
                city via network, or you can enable GPS by tapping the icon in your address bar →{" "}
                <em>Website Settings</em> → <em>Location: Allow</em>.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth and VIP Modals */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <ProUpgradeModal isOpen={proOpen} onClose={() => setProOpen(false)} />
    </AppShell>
  );
}

function Section({
  title,
  children,
  action,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <section className="px-5 pt-7">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          {icon}
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
