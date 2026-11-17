import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  Check,
  Clock,
  Crown,
  Headphones,
  HelpCircle,
  Landmark,
  Lightbulb,
  MapPin,
  MessageCircle,
  Navigation,
  Sparkles,
  Stamp,
  Star,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { ProUpgradeModal } from "@/components/ProUpgradeModal";
import { getPlace } from "@/lib/places";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/place/$id")({
  loader: ({ params }) => {
    const place = getPlace(params.id);
    if (!place) throw notFound();
    return { id: place.id, name: place.name, tagline: place.tagline };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Place not found — Roam" }, { name: "robots", content: "noindex" }],
      };
    return {
      meta: [
        { title: `${loaderData.name} — Roam` },
        { name: "description", content: loaderData.tagline },
        { property: "og:title", content: `${loaderData.name} — Roam` },
        { property: "og:description", content: loaderData.tagline },
      ],
    };
  },
  component: PlaceDetail,
});

function PlaceDetail() {
  const { id } = Route.useLoaderData();
  const place = getPlace(id)!;
  const router = useRouter();
  const {
    saved,
    toggleSave,
    stamps,
    collectStamp,
    quests,
    completeQuest,
    playAudioTour,
    activeAudioPlaceId,
    isAudioPlaying,
    isPro,
  } = useStore();

  const isSaved = saved.includes(id);
  const hasStamp = stamps.some((s) => s.placeId === id);
  const [visiting, setVisiting] = useState(false);
  const [justStamped, setJustStamped] = useState(false);
  const [proModalOpen, setProModalOpen] = useState(false);
  const [solvingQuest, setSolvingQuest] = useState(false);

  const placeQuest = quests.find((q) => q.placeId === place.id);

  const startVisit = () => {
    setVisiting(true);
    toast("Checking into " + place.name + "…");
    setTimeout(() => {
      collectStamp(id);
      setVisiting(false);
      setJustStamped(true);
      toast.success(`Stamp collected: ${place.name} (+25 Roam Coins)`);
    }, 1500);
  };

  const handleAudioTour = () => {
    playAudioTour(
      place.id,
      place.name,
      `${place.tagline}. ${place.history} In local culture, ${place.culture}.`,
    );
    toast.success(`Playing voice audio tour for ${place.name}`);
  };

  const handleSolveQuest = () => {
    if (!placeQuest) return;
    setSolvingQuest(true);
    setTimeout(() => {
      completeQuest(placeQuest.id);
      setSolvingQuest(false);
      toast.success(
        `Quest Completed! You earned 🪙 ${placeQuest.rewardCoins} Roam Coins and unlocked a partner perk voucher!`,
      );
    }, 1000);
  };

  return (
    <AppShell>
      <div className="relative h-[420px] overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          width={800}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-photo-fade" />
        <div className="absolute inset-x-0 top-0 flex justify-between p-5">
          <button
            onClick={() =>
              router.history.length > 1
                ? router.history.back()
                : router.navigate({ to: "/discover" })
            }
            aria-label="Back"
            className="grid h-10 w-10 place-items-center rounded-full bg-background/90 shadow-card backdrop-blur hover:bg-background"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              toggleSave(id);
              toast(isSaved ? "Removed from saved" : "Saved to your journal");
            }}
            aria-label="Save"
            className="grid h-10 w-10 place-items-center rounded-full bg-background/90 text-primary shadow-card backdrop-blur hover:bg-background"
          >
            <Bookmark className={`h-5 w-5 ${isSaved ? "fill-primary" : ""}`} />
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 pb-10 text-on-photo">
          <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-foreground">
            {place.category}
          </span>
          <h1 className="mt-3 text-4xl font-semibold leading-tight">{place.name}</h1>
          <p className="mt-2 text-sm opacity-90">{place.tagline}</p>
        </div>
      </div>

      <div className="relative -mt-6 rounded-t-3xl bg-background px-5 pt-6 pb-6">
        {/* Voice Audio Tour Banner (USP) */}
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-gold/40 bg-gradient-to-r from-gold/15 to-emerald/10 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gold text-gold-foreground shadow-sm">
              <Headphones className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gold">
                Voice Storyteller
              </p>
              <p className="text-sm font-semibold">Narrated Walking Tour</p>
            </div>
          </div>
          <button
            onClick={handleAudioTour}
            className="flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-xs font-bold text-gold-foreground shadow-card hover:opacity-95 active:scale-95"
          >
            {isAudioPlaying && activeAudioPlaceId === place.id ? "Playing..." : "Listen Now"}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <Stat
            icon={<MapPin className="h-4 w-4" />}
            label="Distance"
            value={`${place.distanceKm} km`}
          />
          <Stat icon={<Clock className="h-4 w-4" />} label="Visit" value={place.duration} />
          <Stat icon={<Star className="h-4 w-4" />} label="Rating" value={String(place.rating)} />
        </div>

        {/* Secret Quest Card (Gamified USP) */}
        {placeQuest && (
          <div className="mt-6 rounded-2xl border-2 border-gold/40 bg-card p-4 shadow-card">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-gold">
                <Sparkles className="h-4 w-4 text-gold" /> Mystery Exploration Quest
              </span>
              <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-bold text-gold-foreground">
                🪙 +{placeQuest.rewardCoins} Coins
              </span>
            </div>
            <h3 className="mt-2 text-base font-bold">{placeQuest.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{placeQuest.description}</p>
            <div className="mt-3 rounded-xl bg-secondary/50 p-3 text-xs italic text-foreground">
              🔍 "{placeQuest.riddle}"
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-[11px] text-muted-foreground">
                {placeQuest.isCompleted
                  ? "✓ Completed & Perks Claimed"
                  : "Solve clue to earn perks"}
              </p>
              {!placeQuest.isCompleted && (
                <button
                  disabled={solvingQuest}
                  onClick={handleSolveQuest}
                  className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-sm hover:opacity-95 disabled:opacity-50"
                >
                  {solvingQuest ? "Verifying..." : "I Found It! Claim Coins"}
                </button>
              )}
            </div>
          </div>
        )}

        <Block icon={<Landmark className="h-4 w-4" />} title="Historical background">
          {place.history}
        </Block>
        <Block icon={<Users className="h-4 w-4" />} title="Cultural significance">
          {place.culture}
        </Block>

        <h2 className="mt-7 flex items-center gap-2 text-lg font-semibold">
          <Lightbulb className="h-4 w-4 text-gold" />
          Interesting facts
        </h2>
        <ul className="mt-3 space-y-2">
          {place.facts.map((f, i) => (
            <li key={i} className="flex gap-3 rounded-2xl bg-accent p-3 text-sm">
              <span className="font-display text-lg font-semibold text-accent-foreground">
                {i + 1}
              </span>
              {f}
            </li>
          ))}
        </ul>

        {/* AI Guide Link */}
        <Link
          to="/guide/$id"
          params={{ id }}
          className="mt-6 flex items-center gap-3 rounded-2xl bg-emerald p-4 text-primary-foreground shadow-card hover:opacity-95"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-gold-foreground">
            <MessageCircle className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="font-semibold">Ask your AI travel guide</p>
            <p className="text-xs opacity-80">
              Interactive advice, stories and tips about {place.name}
            </p>
          </div>
        </Link>

        {justStamped && (
          <div className="mt-6 flex items-center gap-4 rounded-2xl border-2 border-dashed border-gold p-4 animate-scale-in">
            <div className="grid h-16 w-16 animate-stamp place-items-center rounded-full border-4 border-double border-primary text-primary">
              <Stamp className="h-7 w-7" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold">Stamp collected!</p>
              <Link to="/passport" className="text-sm font-bold text-primary hover:underline">
                View passport & rewards →
              </Link>
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-3 gap-2 pb-4">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name}, ${place.area}`)}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-1 rounded-2xl bg-card py-3 text-xs font-bold shadow-card hover:bg-secondary/40"
          >
            <Navigation className="h-5 w-5 text-primary" />
            Directions
          </a>
          <button
            onClick={() => {
              toggleSave(id);
              toast(isSaved ? "Removed from saved" : "Saved to your journal");
            }}
            className="flex flex-col items-center gap-1 rounded-2xl bg-card py-3 text-xs font-bold shadow-card hover:bg-secondary/40"
          >
            <Bookmark className={`h-5 w-5 text-primary ${isSaved ? "fill-primary" : ""}`} />
            {isSaved ? "Saved" : "Save"}
          </button>
          <button
            disabled={hasStamp || visiting}
            onClick={startVisit}
            className="flex flex-col items-center gap-1 rounded-2xl bg-gold-grad py-3 text-xs font-bold text-gold-foreground shadow-card disabled:opacity-70"
          >
            {hasStamp ? (
              <Check className="h-5 w-5" />
            ) : (
              <Stamp className={`h-5 w-5 ${visiting ? "animate-spin" : ""}`} />
            )}
            {hasStamp ? "Collected" : visiting ? "Visiting…" : "Collect Stamp"}
          </button>
        </div>

        {/* Roam VIP Banner */}
        {!isPro && (
          <div
            onClick={() => setProModalOpen(true)}
            className="cursor-pointer mt-3 flex items-center justify-between rounded-2xl border border-gold/50 bg-gold/10 p-3.5 text-xs text-gold-foreground shadow-sm hover:bg-gold/15"
          >
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-gold" />
              <span>Unlock all audio guides & secret food vouchers</span>
            </div>
            <span className="font-bold underline">Learn More</span>
          </div>
        )}
      </div>

      <ProUpgradeModal isOpen={proModalOpen} onClose={() => setProModalOpen(false)} />
    </AppShell>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-card p-3 shadow-card">
      <div className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-secondary text-primary">
        {icon}
      </div>
      <p className="mt-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
}

function Block({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <span className="text-primary">{icon}</span>
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </section>
  );
}
