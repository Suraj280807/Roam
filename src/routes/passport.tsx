import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Award, ChevronDown, LocateFixed, Lock, MapPin, Stamp as StampIcon, X } from "lucide-react";
import { toast } from "sonner";
import { AppShell, ScreenHeader } from "@/components/AppShell";
import { CATEGORIES, getPlacesForLocation } from "@/lib/places";
import { fmtDate, useStore } from "@/lib/store";
import { resolveCurrentLocation } from "@/lib/location";

export const Route = createFileRoute("/passport")({
  head: () => ({
    meta: [
      { title: "Travel Passport — Roam" },
      { name: "description", content: "Your collected destination stamps, progress and achievements." },
      { property: "og:title", content: "Travel Passport — Roam" },
      { property: "og:description", content: "Collect a stamp for every place you explore." },
    ],
  }),
  component: Passport,
});

function Passport() {
  const { stamps, name, location, city, resolvedAddress, setDemoLocation, setDeviceLocation } = useStore();
  const [locOpen, setLocOpen] = useState(false);
  const [locating, setLocating] = useState(false);

  const isLisbon = location === "demo";
  const editionTitle = isLisbon ? "Lisbon edition" : `${city && city !== "Lisbon" ? city : "Kolhapur"} edition`;

  // Dynamically load places based on current location mode
  const places = useMemo(() => getPlacesForLocation(location), [location]);

  // Only stamps that belong to the active edition
  const collectedInEdition = useMemo(
    () => stamps.filter((s) => places.some((p) => p.id === s.placeId)),
    [stamps, places]
  );

  const pct = places.length > 0 ? Math.round((collectedInEdition.length / places.length) * 100) : 0;
  const cats = new Set(collectedInEdition.map((s) => places.find((p) => p.id === s.placeId)?.category));

  // Dynamic achievements tailored to active edition
  const achievements = useMemo(() => {
    if (isLisbon) {
      return [
        { title: "First Steps", desc: "Collect your first stamp", done: collectedInEdition.length >= 1 },
        { title: "Curious Wanderer", desc: "Collect 3 stamps", done: collectedInEdition.length >= 3 },
        {
          title: "Belém Explorer",
          desc: "Visit all Belém places",
          done:
            places.filter((p) => p.area === "Belém").length > 0 &&
            places.filter((p) => p.area === "Belém").every((p) => stamps.some((s) => s.placeId === p.id)),
        },
        { title: "Renaissance Traveler", desc: "Stamps in every category", done: CATEGORIES.every((c) => cats.has(c)) },
        {
          title: "Lisbon Master",
          desc: "Collect every stamp in Lisbon",
          done: places.length > 0 && collectedInEdition.length === places.length,
        },
      ];
    } else {
      const hasSgu = stamps.some((s) => s.placeId === "sgu");
      const hasRamling = stamps.some((s) => s.placeId === "ramling");
      const hasCafeAmigos = stamps.some((s) => s.placeId === "cafe-amigos");
      const hasTeaToast = stamps.some((s) => s.placeId === "tea-toast-co");

      return [
        { title: "First Steps", desc: "Collect your first stamp", done: collectedInEdition.length >= 1 },
        {
          title: "Campus & Heritage",
          desc: "Visit Sanjay Ghodawat University & Ramling Temple",
          done: hasSgu && hasRamling,
        },
        {
          title: "Foodie Connoisseur",
          desc: "Visit Café Amigo's & The Tea Toast Co.",
          done: hasCafeAmigos && hasTeaToast,
        },
        { title: "Curious Wanderer", desc: "Collect 3 stamps", done: collectedInEdition.length >= 3 },
        {
          title: `${city && city !== "Lisbon" ? city : "Local"} Master`,
          desc: "Collect all stamps in this edition",
          done: places.length > 0 && collectedInEdition.length === places.length,
        },
      ];
    }
  }, [isLisbon, collectedInEdition, places, stamps, cats, city]);

  const handleUseCurrentLocation = async () => {
    try {
      setLocating(true);
      const res = await resolveCurrentLocation();
      setDeviceLocation(res.coords, res.city, res.address);
      setLocOpen(false);
      toast.success(`Switched to Current Location: ${res.city}`);
    } catch (err: any) {
      toast.error(err?.message || "Could not access location.");
    } finally {
      setLocating(false);
    }
  };

  const handleUseDemoLocation = () => {
    setDemoLocation();
    setLocOpen(false);
    toast.success("Switched to Lisbon edition (Demo)");
  };

  return (
    <AppShell>
      <ScreenHeader
        title="Passport"
        subtitle={editionTitle}
        right={
          <button
            onClick={() => setLocOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold shadow-card hover:bg-muted transition-colors"
          >
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>{isLisbon ? "Lisbon" : (city && city !== "Lisbon" ? city : "Current Location")}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        }
      />

      <div className="mx-5 rounded-3xl bg-emerald p-5 text-primary-foreground shadow-float">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] opacity-70">Holder</p>
            <p className="font-display text-xl font-semibold">{name}</p>
          </div>
          <StampIcon className="h-8 w-8 text-gold" />
        </div>
        <div className="mt-5 flex items-end justify-between">
          <p className="font-display text-5xl font-semibold">
            {collectedInEdition.length}
            <span className="text-xl opacity-60">/{places.length}</span>
          </p>
          <p className="text-sm opacity-80">{pct}% discovered</p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-primary-foreground/20">
          <div className="h-full rounded-full bg-gold-grad transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <h2 className="px-5 pt-7 text-xl font-semibold">Stamps</h2>
      <div className="grid grid-cols-3 gap-3 px-5 pt-3">
        {places.map((p, i) => {
          const s = stamps.find((x) => x.placeId === p.id);
          return (
            <Link key={p.id} to="/place/$id" params={{ id: p.id }} className="flex flex-col items-center text-center">
              <div
                className={`relative grid h-24 w-24 place-items-center rounded-full border-4 border-double ${
                  s ? "border-primary bg-card" : "border-border bg-muted"
                }`}
                style={{ transform: `rotate(${((i % 3) - 1) * 6}deg)` }}
              >
                {s ? (
                  <>
                    <img src={p.image} alt="" className="h-16 w-16 rounded-full object-cover" />
                    <span className="absolute -bottom-1 rounded-full bg-gold px-2 text-[9px] font-bold text-gold-foreground">
                      {fmtDate(s.date)}
                    </span>
                  </>
                ) : (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <p className={`mt-2 text-[11px] font-semibold leading-tight ${s ? "" : "text-muted-foreground"}`}>
                {p.name}
              </p>
            </Link>
          );
        })}
      </div>

      {collectedInEdition.length === 0 && (
        <div className="mx-5 mt-5 rounded-2xl border border-dashed p-5 text-center text-sm text-muted-foreground">
          No stamps yet in this edition. Open a place and tap <b className="text-foreground">Collect Stamp</b> to complete a visit.
          <Link to="/explore" className="mt-3 block font-bold text-primary">
            Find a place →
          </Link>
        </div>
      )}

      <h2 className="px-5 pt-7 text-xl font-semibold">Achievements</h2>
      <div className="space-y-2 px-5 pt-3">
        {achievements.map((a) => (
          <div key={a.title} className={`flex items-center gap-3 rounded-2xl p-3 ${a.done ? "bg-accent" : "bg-card shadow-card"}`}>
            <span
              className={`grid h-10 w-10 place-items-center rounded-full ${
                a.done ? "bg-gold-grad text-gold-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              <Award className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="font-semibold">{a.title}</p>
              <p className="text-xs text-muted-foreground">{a.desc}</p>
            </div>
            <span className={`text-xs font-bold ${a.done ? "text-primary" : "text-muted-foreground"}`}>
              {a.done ? "Unlocked" : "Locked"}
            </span>
          </div>
        ))}
      </div>

      {/* Location Switcher Modal */}
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
              <h2 className="text-xl font-bold font-display">Switch Passport Edition</h2>
              <button onClick={() => setLocOpen(false)} className="rounded-full p-1 text-muted-foreground hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Select your edition: current location places or Lisbon demo.
            </p>

            <div className="mt-4 space-y-3">
              {/* Option 1: Live Current Location */}
              <div
                className={`rounded-2xl border p-4 transition-all ${
                  !isLisbon ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border bg-card"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <LocateFixed className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">Current Location Edition</h3>
                      <p className="text-[11px] text-muted-foreground">
                        SGU, Ramling, Café Amigo's & Tea Toast Co.
                      </p>
                    </div>
                  </div>
                  {!isLisbon && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                      Active
                    </span>
                  )}
                </div>

                {!isLisbon && resolvedAddress && (
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
                  {locating ? "Detecting location..." : !isLisbon ? "Refresh GPS Location" : "Switch to Current Location"}
                </button>
              </div>

              {/* Option 2: Lisbon Demo */}
              <div
                className={`rounded-2xl border p-4 transition-all ${
                  isLisbon ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border bg-card"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">Lisbon Demo Edition</h3>
                      <p className="text-[11px] text-muted-foreground">7 Historic Lisbon spots & Belém</p>
                    </div>
                  </div>
                  {isLisbon && (
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-secondary-foreground">
                      Active
                    </span>
                  )}
                </div>

                <button
                  onClick={handleUseDemoLocation}
                  className="mt-3 w-full rounded-full bg-secondary py-2.5 text-xs font-bold text-secondary-foreground hover:bg-secondary/80"
                >
                  {isLisbon ? "Using Lisbon Edition" : "Switch to Lisbon Edition"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
