import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Lock, Stamp as StampIcon } from "lucide-react";
import { AppShell, ScreenHeader } from "@/components/AppShell";
import { CATEGORIES, PLACES } from "@/lib/places";
import { fmtDate, useStore } from "@/lib/store";

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
  const { stamps, name } = useStore();
  const pct = Math.round((stamps.length / PLACES.length) * 100);
  const cats = new Set(stamps.map((s) => PLACES.find((p) => p.id === s.placeId)?.category));
  const achievements = [
    { title: "First Steps", desc: "Collect your first stamp", done: stamps.length >= 1 },
    { title: "Curious Wanderer", desc: "Collect 3 stamps", done: stamps.length >= 3 },
    { title: "Belém Explorer", desc: "Visit all Belém places", done: PLACES.filter((p) => p.area === "Belém").every((p) => stamps.some((s) => s.placeId === p.id)) },
    { title: "Renaissance Traveler", desc: "Stamps in every category", done: CATEGORIES.every((c) => cats.has(c)) },
    { title: "Lisbon Master", desc: "Collect every stamp", done: stamps.length === PLACES.length },
  ];

  return (
    <AppShell>
      <ScreenHeader title="Passport" subtitle="Lisbon edition" />
      <div className="mx-5 rounded-3xl bg-emerald p-5 text-primary-foreground shadow-float">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] opacity-70">Holder</p>
            <p className="font-display text-xl font-semibold">{name}</p>
          </div>
          <StampIcon className="h-8 w-8 text-gold" />
        </div>
        <div className="mt-5 flex items-end justify-between">
          <p className="font-display text-5xl font-semibold">{stamps.length}<span className="text-xl opacity-60">/{PLACES.length}</span></p>
          <p className="text-sm opacity-80">{pct}% discovered</p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-primary-foreground/20">
          <div className="h-full rounded-full bg-gold-grad transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <h2 className="px-5 pt-7 text-xl font-semibold">Stamps</h2>
      <div className="grid grid-cols-3 gap-3 px-5 pt-3">
        {PLACES.map((p, i) => {
          const s = stamps.find((x) => x.placeId === p.id);
          return (
            <Link key={p.id} to="/place/$id" params={{ id: p.id }} className="flex flex-col items-center text-center">
              <div className={`relative grid h-24 w-24 place-items-center rounded-full border-4 border-double ${s ? "border-primary bg-card" : "border-border bg-muted"}`} style={{ transform: `rotate(${(i % 3 - 1) * 6}deg)` }}>
                {s ? (
                  <>
                    <img src={p.image} alt="" className="h-16 w-16 rounded-full object-cover" />
                    <span className="absolute -bottom-1 rounded-full bg-gold px-2 text-[9px] font-bold text-gold-foreground">{fmtDate(s.date)}</span>
                  </>
                ) : <Lock className="h-5 w-5 text-muted-foreground" />}
              </div>
              <p className={`mt-2 text-[11px] font-semibold leading-tight ${s ? "" : "text-muted-foreground"}`}>{p.name}</p>
            </Link>
          );
        })}
      </div>
      {stamps.length === 0 && (
        <div className="mx-5 mt-5 rounded-2xl border border-dashed p-5 text-center text-sm text-muted-foreground">
          No stamps yet. Open a place and tap <b className="text-foreground">Collect Stamp</b> to complete a demo visit.
          <Link to="/explore" className="mt-3 block font-bold text-primary">Find a place →</Link>
        </div>
      )}

      <h2 className="px-5 pt-7 text-xl font-semibold">Achievements</h2>
      <div className="space-y-2 px-5 pt-3">
        {achievements.map((a) => (
          <div key={a.title} className={`flex items-center gap-3 rounded-2xl p-3 ${a.done ? "bg-accent" : "bg-card shadow-card"}`}>
            <span className={`grid h-10 w-10 place-items-center rounded-full ${a.done ? "bg-gold-grad text-gold-foreground" : "bg-muted text-muted-foreground"}`}><Award className="h-5 w-5" /></span>
            <div className="flex-1">
              <p className="font-semibold">{a.title}</p>
              <p className="text-xs text-muted-foreground">{a.desc}</p>
            </div>
            <span className={`text-xs font-bold ${a.done ? "text-primary" : "text-muted-foreground"}`}>{a.done ? "Unlocked" : "Locked"}</span>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
