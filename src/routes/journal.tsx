import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bookmark, PenLine, Trash2, Camera } from "lucide-react";
import { toast } from "sonner";
import { AppShell, ScreenHeader } from "@/components/AppShell";
import { RowCard } from "@/components/PlaceCard";
import { getPlace, PLACES } from "@/lib/places";
import { fmtDate, useStore } from "@/lib/store";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Travel Journal — Roam" },
      { name: "description", content: "Your saved places, visits and travel memories in one journal." },
      { property: "og:title", content: "Travel Journal — Roam" },
      { property: "og:description", content: "Keep notes and memories from every place you explore." },
    ],
  }),
  component: Journal,
});

function Journal() {
  const { saved, stamps, notes, addNote, deleteNote } = useStore();
  const [tab, setTab] = useState<"memories" | "saved">("memories");
  const [placeId, setPlaceId] = useState(PLACES[0].id);
  const [text, setText] = useState("");
  const [writing, setWriting] = useState(false);

  const visited = [...stamps].sort((a, b) => b.date.localeCompare(a.date));

  const submit = () => {
    if (!text.trim()) { toast.error("Write something first"); return; }
    addNote(placeId, text.trim());
    setText(""); setWriting(false);
    toast.success("Memory saved");
  };

  return (
    <AppShell>
      <ScreenHeader title="My Story" subtitle="Journal"
        right={
          <div className="flex gap-2">
            <label className="flex cursor-pointer items-center gap-1 rounded-full bg-secondary px-4 py-2 text-xs font-bold text-secondary-foreground hover:bg-secondary/80">
              <Camera className="h-3.5 w-3.5" /> Capture
              <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  toast.success("Photo captured!");
                }
              }} />
            </label>
            <button onClick={() => { setTab("memories"); setWriting(true); }} className="flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90">
              <PenLine className="h-3.5 w-3.5" /> New note
            </button>
          </div>
        } />

      <div className="mx-5 flex rounded-full bg-card p-1 shadow-card" role="tablist">
        {(["memories", "saved"] as const).map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`flex-1 rounded-full py-2 text-xs font-bold capitalize ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
            {t === "saved" ? `Saved (${saved.length})` : `Memories (${notes.length + visited.length})`}
          </button>
        ))}
      </div>

      {tab === "memories" ? (
        <div className="px-5 pt-5">
          {writing && (
            <div className="mb-5 animate-rise rounded-2xl bg-card p-4 shadow-card">
              <label className="text-xs font-bold uppercase tracking-wider text-primary" htmlFor="note-place">Place</label>
              <select id="note-place" value={placeId} onChange={(e) => setPlaceId(e.target.value)} className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm">
                {PLACES.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} autoFocus placeholder="What did you discover? How did it feel?" aria-label="Note" className="mt-3 w-full resize-none rounded-xl border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              <div className="mt-3 flex justify-end gap-2">
                <button onClick={() => setWriting(false)} className="rounded-full px-4 py-2 text-xs font-bold text-muted-foreground">Cancel</button>
                <button onClick={submit} className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">Save memory</button>
              </div>
            </div>
          )}

          {notes.length === 0 && visited.length === 0 && !writing && (
            <div className="rounded-2xl border border-dashed p-8 text-center">
              <p className="font-display text-lg">Your journal is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">Collect a stamp or write your first note.</p>
              <button onClick={() => setWriting(true)} className="mt-4 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">Write a note</button>
            </div>
          )}

          <ol className="relative space-y-4 border-l-2 border-border pl-5">
            {notes.map((n) => {
              const p = getPlace(n.placeId);
              return (
                <li key={n.id} className="relative">
                  <span className="absolute -left-[27px] top-3 h-3 w-3 rounded-full border-2 border-background bg-gold" />
                  <div className="rounded-2xl bg-card p-4 shadow-card">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{fmtDate(n.date)}</p>
                      <button onClick={() => { deleteNote(n.id); toast("Note deleted"); }} aria-label="Delete note" className="text-muted-foreground"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    {p && <Link to="/place/$id" params={{ id: p.id }} className="font-display text-base font-semibold text-primary">{p.name}</Link>}
                    <p className="mt-1 whitespace-pre-wrap text-sm">{n.text}</p>
                  </div>
                </li>
              );
            })}
            {visited.map((s) => {
              const p = getPlace(s.placeId);
              if (!p) return null;
              return (
                <li key={s.placeId} className="relative">
                  <span className="absolute -left-[27px] top-3 h-3 w-3 rounded-full border-2 border-background bg-primary" />
                  <Link to="/place/$id" params={{ id: p.id }} className="flex gap-3 rounded-2xl bg-accent p-3">
                    <img src={p.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-accent-foreground">Visited · {fmtDate(s.date)}</p>
                      <p className="font-display font-semibold">{p.name}</p>
                      <p className="text-xs text-muted-foreground">Stamp collected</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      ) : (
        <div className="space-y-3 px-5 pt-5">
          {saved.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-8 text-center">
              <Bookmark className="mx-auto h-6 w-6 text-muted-foreground" />
              <p className="mt-2 font-display text-lg">No saved places yet</p>
              <Link to="/discover" className="mt-3 inline-block rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">Discover places</Link>
            </div>
          ) : saved.map((id) => { const p = getPlace(id); return p ? <RowCard key={id} place={p} /> : null; })}
        </div>
      )}
    </AppShell>
  );
}
