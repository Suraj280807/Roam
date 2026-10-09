import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, MapPin, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { RowCard } from "@/components/PlaceCard";
import { CATEGORIES, getPlace } from "@/lib/places";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & settings — Roam" },
      { name: "description", content: "Manage your interests, saved destinations and location settings." },
      { property: "og:title", content: "Profile & settings — Roam" },
      { property: "og:description", content: "Personalise your Roam experience." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const { name, interests, saved, stamps, notes, location, update, reset } = useStore();
  const [draft, setDraft] = useState<string | null>(null);

  const toggleInterest = (c: string) =>
    update({ interests: interests.includes(c) ? interests.filter((x) => x !== c) : [...interests, c] });

  return (
    <AppShell>
      <div className="flex items-center gap-3 px-5 pt-6">
        <Link to="/discover" aria-label="Back" className="grid h-10 w-10 place-items-center rounded-full bg-card shadow-card"><ArrowLeft className="h-5 w-5" /></Link>
        <h1 className="text-2xl font-semibold">Profile</h1>
      </div>

      <div className="mx-5 mt-5 flex items-center gap-4 rounded-3xl bg-card p-5 shadow-card">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald font-display text-2xl font-semibold text-gold">{name.charAt(0).toUpperCase()}</div>
        <div className="flex-1">
          {draft !== null ? (
            <form onSubmit={(e) => { e.preventDefault(); if (draft.trim()) { update({ name: draft.trim() }); toast.success("Name updated"); } setDraft(null); }} className="flex gap-2">
              <input autoFocus value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="Name" className="w-full rounded-lg border bg-background px-2 py-1 text-sm" />
              <button type="submit" aria-label="Save name" className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-4 w-4" /></button>
            </form>
          ) : (
            <>
              <p className="font-display text-xl font-semibold">{name}</p>
              <button onClick={() => setDraft(name)} className="text-xs font-bold text-primary">Edit name</button>
            </>
          )}
        </div>
      </div>
      <div className="mx-5 mt-3 grid grid-cols-3 gap-2 text-center">
        {[["Stamps", stamps.length], ["Saved", saved.length], ["Notes", notes.length]].map(([l, v]) => (
          <div key={l} className="rounded-2xl bg-accent py-3"><p className="font-display text-2xl font-semibold">{v}</p><p className="text-[11px] text-muted-foreground">{l}</p></div>
        ))}
      </div>

      <h2 className="px-5 pt-7 text-lg font-semibold">Preferred interests</h2>
      <div className="flex flex-wrap gap-2 px-5 pt-3">
        {CATEGORIES.map((c) => {
          const on = interests.includes(c);
          return <button key={c} onClick={() => toggleInterest(c)} aria-pressed={on} className={`rounded-full px-4 py-2 text-xs font-bold ${on ? "bg-primary text-primary-foreground" : "bg-card shadow-card"}`}>{on && "✓ "}{c}</button>;
        })}
      </div>

      <h2 className="px-5 pt-7 text-lg font-semibold">Location settings</h2>
      <div className="mx-5 mt-3 space-y-2">
        {([["demo", "Demo location", "Baixa, Lisbon — for the prototype"], ["device", "Device location", "Ask the browser for permission"]] as const).map(([v, t, d]) => (
          <button key={v} onClick={() => {
            if (v === "device") {
              navigator.geolocation?.getCurrentPosition(() => { update({ location: "device" }); toast.success("Device location enabled"); }, () => toast.error("Permission denied — still using demo location"));
            } else { update({ location: "demo" }); toast("Using demo location"); }
          }} className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left ${location === v ? "bg-secondary ring-2 ring-primary" : "bg-card shadow-card"}`}>
            <MapPin className="h-5 w-5 text-primary" />
            <div className="flex-1"><p className="text-sm font-semibold">{t}</p><p className="text-xs text-muted-foreground">{d}</p></div>
            {location === v && <Check className="h-4 w-4 text-primary" />}
          </button>
        ))}
      </div>

      <h2 className="px-5 pt-7 text-lg font-semibold">Saved destinations</h2>
      <div className="space-y-3 px-5 pt-3">
        {saved.length === 0 ? <p className="text-sm text-muted-foreground">Nothing saved yet — tap the bookmark on any place.</p>
          : saved.map((id) => { const p = getPlace(id); return p ? <RowCard key={id} place={p} /> : null; })}
      </div>

      <div className="px-5 pt-8">
        <button onClick={() => { if (confirm("Reset all demo data?")) { reset(); toast("Demo data reset"); } }} className="flex w-full items-center justify-center gap-2 rounded-full border py-3 text-sm font-bold text-destructive">
          <RotateCcw className="h-4 w-4" />Reset demo data
        </button>
      </div>
    </AppShell>
  );
}
