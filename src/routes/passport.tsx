import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Award,
  ChevronDown,
  Gift,
  LocateFixed,
  Lock,
  MapPin,
  Sparkles,
  Stamp as StampIcon,
  Tag,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell, ScreenHeader } from "@/components/AppShell";
import { AuthGuard } from "@/components/AuthGuard";
import { CATEGORIES } from "@/lib/places";
import { fmtDate, useStore } from "@/lib/store";
import { resolveCurrentLocation } from "@/lib/location";

export const Route = createFileRoute("/passport")({
  head: () => ({
    meta: [
      { title: "Travel Passport & Quests — Roam" },
      {
        name: "description",
        content: "Your collected destination stamps, exploration quests, and partner discounts.",
      },
      { property: "og:title", content: "Travel Passport & Quests — Roam" },
      {
        property: "og:description",
        content: "Collect stamps, solve mystery quests and earn perks.",
      },
    ],
  }),
  component: PassportPage,
});

function PassportPage() {
  return (
    <AuthGuard message="Create an account or sign in to collect official location stamps, solve mystery quests, and redeem partner discount vouchers.">
      <Passport />
    </AuthGuard>
  );
}

function Passport() {
  const {
    stamps,
    name,
    location,
    city,
    coins,
    quests,
    coupons,
    redeemCoupon,
    completeQuest,
    setDemoLocation,
    setDeviceLocation,
    activePlaces: places,
  } = useStore();
  const [tab, setTab] = useState<"stamps" | "quests" | "coupons">("stamps");
  const [locOpen, setLocOpen] = useState(false);
  const [locating, setLocating] = useState(false);

  const isLisbon = location === "demo";
  const editionTitle = isLisbon
    ? "Lisbon edition"
    : `${city && city !== "Lisbon" ? city : "Explorer"} edition`;

  // Only stamps that belong to the active edition
  const collectedInEdition = useMemo(
    () => stamps.filter((s) => places.some((p) => p.id === s.placeId)),
    [stamps, places],
  );

  const pct = places.length > 0 ? Math.round((collectedInEdition.length / places.length) * 100) : 0;

  const cats = useMemo(
    () => new Set(collectedInEdition.map((s) => places.find((p) => p.id === s.placeId)?.category)),
    [collectedInEdition, places],
  );

  // Dynamic achievements tailored to active edition
  const achievements = useMemo(() => {
    if (isLisbon) {
      return [
        {
          title: "First Steps",
          desc: "Collect your first stamp",
          done: collectedInEdition.length >= 1,
        },
        {
          title: "Curious Wanderer",
          desc: "Collect 3 stamps",
          done: collectedInEdition.length >= 3,
        },
        {
          title: "Belém Explorer",
          desc: "Visit all Belém places",
          done:
            places.filter((p) => p.area === "Belém").length > 0 &&
            places
              .filter((p) => p.area === "Belém")
              .every((p) => stamps.some((s) => s.placeId === p.id)),
        },
        {
          title: "Renaissance Traveler",
          desc: "Stamps in every category",
          done: CATEGORIES.every((c) => cats.has(c)),
        },
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
        {
          title: "First Steps",
          desc: "Collect your first stamp",
          done: collectedInEdition.length >= 1,
        },
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
        {
          title: "Curious Wanderer",
          desc: "Collect 3 stamps",
          done: collectedInEdition.length >= 3,
        },
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
      await setDeviceLocation(res.coords, res.city, res.address);
      setLocOpen(false);
      toast.success(`Switched to Current Location: ${res.city}`);
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
            <span>
              {isLisbon ? "Lisbon" : city && city !== "Lisbon" ? city : "Current Location"}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        }
      />

      {/* Passport Book Banner */}
      <div className="mx-5 rounded-3xl bg-emerald p-5 text-primary-foreground shadow-float">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] opacity-70">Explorer Passport</p>
            <p className="font-display text-xl font-semibold">{name}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gold/20 px-2.5 py-1 text-xs font-bold text-gold">
              🪙 {coins} Coins
            </span>
            <StampIcon className="h-6 w-6 text-gold" />
          </div>
        </div>
        <div className="mt-5 flex items-end justify-between">
          <p className="font-display text-5xl font-semibold">
            {collectedInEdition.length}
            <span className="text-xl opacity-60">/{places.length}</span>
          </p>
          <p className="text-sm opacity-80">{pct}% discovered</p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-primary-foreground/20">
          <div
            className="h-full rounded-full bg-gold-grad transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="mx-5 mt-5 flex rounded-2xl bg-secondary p-1">
        <button
          onClick={() => setTab("stamps")}
          className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
            tab === "stamps" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
          }`}
        >
          Stamps ({collectedInEdition.length})
        </button>
        <button
          onClick={() => setTab("quests")}
          className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
            tab === "quests" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
          }`}
        >
          Quests ({quests.filter((q) => q.isCompleted).length}/{quests.length})
        </button>
        <button
          onClick={() => setTab("coupons")}
          className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
            tab === "coupons" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
          }`}
        >
          Perk Vouchers ({coupons.length})
        </button>
      </div>

      {tab === "stamps" && (
        <>
          <h2 className="px-5 pt-6 text-lg font-bold">Collected Stamps</h2>
          <div className="grid grid-cols-3 gap-3 px-5 pt-3">
            {places.map((p, i) => {
              const s = stamps.find((x) => x.placeId === p.id);
              return (
                <Link
                  key={p.id}
                  to="/place/$id"
                  params={{ id: p.id }}
                  className="flex flex-col items-center text-center group"
                >
                  <div
                    className={`relative grid h-24 w-24 place-items-center rounded-full border-4 border-double transition-transform group-hover:scale-105 ${
                      s ? "border-primary bg-card shadow-card" : "border-border bg-muted/60"
                    }`}
                    style={{ transform: `rotate(${((i % 3) - 1) * 6}deg)` }}
                  >
                    {s ? (
                      <>
                        <img src={p.image} alt="" className="h-16 w-16 rounded-full object-cover" />
                        <span className="absolute -bottom-1 rounded-full bg-gold px-2 py-0.5 text-[9px] font-bold text-gold-foreground shadow-sm">
                          {fmtDate(s.date)}
                        </span>
                      </>
                    ) : (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <p
                    className={`mt-2 text-[11px] font-semibold leading-tight ${s ? "" : "text-muted-foreground"}`}
                  >
                    {p.name}
                  </p>
                </Link>
              );
            })}
          </div>

          {collectedInEdition.length === 0 && (
            <div className="mx-5 mt-5 rounded-2xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
              No stamps yet in this edition. Open any place and tap{" "}
              <b className="text-foreground">Collect Stamp</b> to start your collection.
              <Link to="/explore" className="mt-3 block font-bold text-primary hover:underline">
                Explore nearby landmarks →
              </Link>
            </div>
          )}

          <h2 className="px-5 pt-7 text-lg font-bold">Exploration Badges</h2>
          <div className="space-y-2 px-5 pt-3">
            {achievements.map((a) => (
              <div
                key={a.title}
                className={`flex items-center gap-3 rounded-2xl p-3 border border-border/60 ${
                  a.done ? "bg-accent" : "bg-card shadow-card"
                }`}
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full ${
                    a.done
                      ? "bg-gold-grad text-gold-foreground shadow-sm"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Award className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                </div>
                <span
                  className={`text-xs font-bold ${a.done ? "text-primary" : "text-muted-foreground"}`}
                >
                  {a.done ? "✓ Unlocked" : "Locked"}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "quests" && (
        <div className="space-y-3 px-5 pt-5">
          <p className="text-xs text-muted-foreground">
            Solve landmark riddles to earn Roam Coins and unlock real merchant discount vouchers!
          </p>
          {quests.map((q) => (
            <div
              key={q.id}
              className={`rounded-2xl border p-4 shadow-card ${
                q.isCompleted ? "border-emerald/40 bg-card" : "border-gold/50 bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs font-bold text-gold">
                  <Sparkles className="h-3.5 w-3.5 text-gold" />{" "}
                  {q.isCompleted ? "Completed" : "Active Mystery Quest"}
                </span>
                <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs font-bold text-gold-foreground">
                  🪙 +{q.rewardCoins}
                </span>
              </div>
              <h3 className="mt-1.5 text-base font-bold">{q.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{q.description}</p>
              <div className="mt-2.5 rounded-xl bg-secondary/60 p-2.5 text-xs italic text-foreground">
                🔍 "{q.riddle}"
              </div>

              <div className="mt-3 flex items-center justify-between">
                <Link
                  to="/place/$id"
                  params={{ id: q.placeId }}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Go to Landmark →
                </Link>
                {!q.isCompleted ? (
                  <button
                    onClick={() => {
                      completeQuest(q.id);
                      toast.success(`Quest solved! +${q.rewardCoins} Roam Coins!`);
                    }}
                    className="rounded-full bg-gold px-3.5 py-1.5 text-xs font-bold text-gold-foreground shadow-sm hover:opacity-95"
                  >
                    Claim Reward
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-emerald">✓ Reward Claimed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "coupons" && (
        <div className="space-y-3 px-5 pt-5">
          <p className="text-xs text-muted-foreground">
            Redeem these exclusive partner vouchers at local cafés and landmarks:
          </p>
          {coupons.map((c) => (
            <div
              key={c.id}
              className="relative overflow-hidden rounded-2xl border-2 border-dashed border-primary/40 bg-card p-4 shadow-card"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-primary">
                    {c.partnerName}
                  </span>
                  <h3 className="mt-1.5 text-base font-bold">{c.title}</h3>
                  <p className="text-xs text-muted-foreground">{c.discount}</p>
                </div>
                <Tag className="h-6 w-6 text-gold" />
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2 border">
                <div>
                  <p className="text-[10px] text-muted-foreground">VOUCHER CODE</p>
                  <p className="font-mono text-xs font-bold tracking-wider">{c.code}</p>
                </div>
                <button
                  disabled={c.isRedeemed}
                  onClick={() => {
                    redeemCoupon(c.id);
                    toast.success(`Coupon ${c.code} redeemed! Show this screen to the counter.`);
                  }}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                    c.isRedeemed
                      ? "bg-secondary text-muted-foreground"
                      : "bg-primary text-primary-foreground shadow-sm hover:opacity-95"
                  }`}
                >
                  {c.isRedeemed ? "Redeemed ✓" : "Redeem Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Location Switcher Modal */}
      {locOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-sm rounded-t-3xl bg-card p-5 sm:rounded-3xl border border-border">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Select Edition</h2>
              <button
                onClick={() => setLocOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Select your edition: current location places or Lisbon demo.
            </p>

            <div className="mt-4 space-y-2">
              <button
                onClick={handleUseCurrentLocation}
                disabled={locating}
                className="w-full rounded-2xl bg-secondary p-3.5 text-left text-xs font-bold hover:bg-secondary/80 flex items-center justify-between"
              >
                <span>📍 Current GPS Location</span>
                {!isLisbon && <span className="text-emerald">Active</span>}
              </button>
              <button
                onClick={handleUseDemoLocation}
                className="w-full rounded-2xl bg-secondary p-3.5 text-left text-xs font-bold hover:bg-secondary/80 flex items-center justify-between"
              >
                <span>🇵🇹 Lisbon Edition (Demo)</span>
                {isLisbon && <span className="text-emerald">Active</span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
