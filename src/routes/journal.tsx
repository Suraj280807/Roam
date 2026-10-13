import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useMemo, useEffect } from "react";
import { Bookmark, PenLine, Trash2, Camera, Plus, X, Image as ImageIcon, MapPin, Maximize2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell, ScreenHeader } from "@/components/AppShell";
import { RowCard } from "@/components/PlaceCard";
import { getPlace, getPlacesForLocation } from "@/lib/places";
import { fmtDate, useStore, type PhotoMemory } from "@/lib/store";
import { compressImage } from "@/lib/image";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Travel Journal & Memories — Roam" },
      { name: "description", content: "Your saved places, visits and travel photo memories in one journal." },
      { property: "og:title", content: "Travel Journal & Memories — Roam" },
      { property: "og:description", content: "Store photo memories, notes and stamps from every place you explore." },
    ],
  }),
  component: Journal,
});

function Journal() {
  const { saved, stamps, notes, memories = [], location, addNote, deleteNote, addPhotoMemory, deletePhotoMemory } = useStore();
  const places = useMemo(() => getPlacesForLocation(location), [location]);
  const [tab, setTab] = useState<"memories" | "saved">("memories");

  // New Note state
  const [writing, setWriting] = useState(false);
  const [notePlaceId, setNotePlaceId] = useState(places[0]?.id || "sgu");
  const [noteText, setNoteText] = useState("");
  const [noteImage, setNoteImage] = useState<string | null>(null);

  // New Photo Memory Modal state
  const [addingPhoto, setAddingPhoto] = useState(false);
  const [photoImage, setPhotoImage] = useState<string | null>(null);
  const [photoCaption, setPhotoCaption] = useState("");
  const [photoPlaceId, setPhotoPlaceId] = useState(places[0]?.id || "sgu");
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  useEffect(() => {
    if (!places.some((p) => p.id === notePlaceId)) {
      setNotePlaceId(places[0]?.id || "");
    }
    if (!places.some((p) => p.id === photoPlaceId)) {
      setPhotoPlaceId(places[0]?.id || "");
    }
  }, [places]);

  // Active Lightbox Photo
  const [viewingPhoto, setViewingPhoto] = useState<PhotoMemory | null>(null);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const notePhotoInputRef = useRef<HTMLInputElement>(null);

  const visited = [...stamps].sort((a, b) => b.date.localeCompare(a.date));

  // Handle image upload for Photo Memory
  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingImage(true);
      const compressed = await compressImage(file);
      setPhotoImage(compressed);
      setAddingPhoto(true);
      toast.success("Photo loaded!");
    } catch (err: any) {
      console.error("Photo selection error:", err);
      toast.error(err?.message || "Could not load this photo. Please try another image.");
    } finally {
      setIsProcessingImage(false);
      if (e.target) e.target.value = "";
    }
  };

  // Handle image upload for Note
  const handleNotePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingImage(true);
      const compressed = await compressImage(file);
      setNoteImage(compressed);
      toast.success("Photo attached to note!");
    } catch (err: any) {
      console.error("Note photo error:", err);
      toast.error(err?.message || "Could not load this photo. Please try another image.");
    } finally {
      setIsProcessingImage(false);
      if (e.target) e.target.value = "";
    }
  };

  // Submit Note
  const submitNote = () => {
    if (!noteText.trim()) {
      toast.error("Write something first");
      return;
    }
    addNote(notePlaceId, noteText.trim(), noteImage || undefined);
    setNoteText("");
    setNoteImage(null);
    setWriting(false);
    toast.success("Memory note saved!");
  };

  // Submit Photo Memory
  const submitPhotoMemory = () => {
    if (!photoImage) {
      toast.error("Please choose a photo first");
      return;
    }
    addPhotoMemory({
      image: photoImage,
      caption: photoCaption.trim() || undefined,
      placeId: photoPlaceId,
    });
    setPhotoImage(null);
    setPhotoCaption("");
    setAddingPhoto(false);
    toast.success("Photo memory stored!");
  };

  return (
    <AppShell>
      <ScreenHeader
        title="My Story"
        subtitle="Journal"
        right={
          <div className="flex gap-2">
            <button
              onClick={() => photoInputRef.current?.click()}
              disabled={isProcessingImage}
              className="flex items-center gap-1 rounded-full bg-secondary px-3.5 py-2 text-xs font-bold text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50"
            >
              <Camera className="h-3.5 w-3.5" />
              {isProcessingImage ? "Loading..." : "Add Photo"}
            </button>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoSelect}
            />

            <button
              onClick={() => {
                setTab("memories");
                setWriting(true);
              }}
              className="flex items-center gap-1 rounded-full bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90"
            >
              <PenLine className="h-3.5 w-3.5" /> New note
            </button>
          </div>
        }
      />

      {/* Tabs */}
      <div className="mx-5 flex rounded-full bg-card p-1 shadow-card" role="tablist">
        {(["memories", "saved"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-full py-2 text-xs font-bold capitalize transition-colors ${
              tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {t === "saved"
              ? `Saved (${saved.length})`
              : `Memories (${memories.length + notes.length + visited.length})`}
          </button>
        ))}
      </div>

      {tab === "memories" ? (
        <div className="px-5 pt-5 pb-8 space-y-6">
          {/* Note Creator Form */}
          {writing && (
            <div className="animate-rise rounded-2xl bg-card p-4 shadow-card border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Write Note</span>
                <button onClick={() => setWriting(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground" htmlFor="note-place">
                Place
              </label>
              <select
                id="note-place"
                value={notePlaceId}
                onChange={(e) => setNotePlaceId(e.target.value)}
                className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm"
              >
                {places.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={3}
                autoFocus
                placeholder="What did you discover? How did it feel?"
                aria-label="Note"
                className="mt-3 w-full resize-none rounded-xl border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />

              {/* Attached Note Image Preview */}
              {noteImage && (
                <div className="relative mt-2 inline-block">
                  <img src={noteImage} alt="Attachment" className="h-20 w-20 rounded-xl object-cover border" />
                  <button
                    onClick={() => setNoteImage(null)}
                    className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white shadow-sm"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}

              <div className="mt-3 flex items-center justify-between">
                <div>
                  <button
                    type="button"
                    onClick={() => notePhotoInputRef.current?.click()}
                    className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted"
                  >
                    <Camera className="h-3.5 w-3.5" />
                    {noteImage ? "Change photo" : "Attach photo"}
                  </button>
                  <input
                    ref={notePhotoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleNotePhotoSelect}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setWriting(false)}
                    className="rounded-full px-4 py-2 text-xs font-bold text-muted-foreground hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitNote}
                    className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                  >
                    Save memory
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PHOTO MEMORIES SECTION */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-primary" />
                <h2 className="font-display text-base font-bold text-foreground">Photo Memories</h2>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
                  {memories.length}
                </span>
              </div>
              <button
                onClick={() => {
                  setPhotoImage(null);
                  setPhotoCaption("");
                  photoInputRef.current?.click();
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                <Plus className="h-3.5 w-3.5" /> Add photo
              </button>
            </div>

            {memories.length === 0 ? (
              <div
                onClick={() => photoInputRef.current?.click()}
                className="group cursor-pointer rounded-2xl border-2 border-dashed border-border/80 bg-card/50 p-6 text-center transition-all hover:border-primary/50 hover:bg-card"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <Camera className="h-6 w-6" />
                </div>
                <p className="mt-3 font-display text-sm font-semibold text-foreground">Store your travel photos</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Tap to capture or upload photos from your adventures into this album.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {memories.map((m) => {
                  const place = m.placeId ? getPlace(m.placeId) : null;
                  return (
                    <div
                      key={m.id}
                      className="group relative aspect-square overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:shadow-lg"
                    >
                      <img
                        src={m.image}
                        alt={m.caption || "Travel memory"}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                      {/* Top Action Buttons */}
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePhotoMemory(m.id);
                            toast("Photo memory deleted");
                          }}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-destructive"
                          aria-label="Delete photo"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Bottom Details (clickable to open lightbox) */}
                      <div
                        onClick={() => setViewingPhoto(m)}
                        className="absolute inset-0 flex flex-col justify-end p-2.5 cursor-pointer text-white"
                      >
                        {place && (
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-300 drop-shadow">
                            <MapPin className="h-2.5 w-2.5" /> {place.name}
                          </span>
                        )}
                        {m.caption && (
                          <p className="mt-0.5 line-clamp-1 text-xs font-medium text-white drop-shadow">
                            {m.caption}
                          </p>
                        )}
                        <p className="text-[9px] text-white/70 drop-shadow">{fmtDate(m.date)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* TIMELINE SECTION (NOTES & STAMPS) */}
          <section className="pt-2">
            <h3 className="mb-3 font-display text-sm font-bold text-foreground">Timeline & Notes</h3>

            {notes.length === 0 && visited.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border p-6 text-center">
                <p className="font-display text-sm font-semibold">No notes or stamps yet</p>
                <p className="mt-1 text-xs text-muted-foreground">Collect a stamp while exploring or write your first note.</p>
                <button
                  onClick={() => setWriting(true)}
                  className="mt-3 rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground"
                >
                  Write a note
                </button>
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
                        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          {fmtDate(n.date)}
                        </p>
                        <button
                          onClick={() => {
                            deleteNote(n.id);
                            toast("Note deleted");
                          }}
                          aria-label="Delete note"
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {p && (
                        <Link
                          to="/place/$id"
                          params={{ id: p.id }}
                          className="font-display text-base font-semibold text-primary hover:underline"
                        >
                          {p.name}
                        </Link>
                      )}

                      <p className="mt-1 whitespace-pre-wrap text-sm text-foreground">{n.text}</p>

                      {/* Display attached photo if present */}
                      {n.image && (
                        <div className="mt-3">
                          <img
                            src={n.image}
                            alt="Note memory"
                            onClick={() =>
                              setViewingPhoto({
                                id: n.id,
                                image: n.image!,
                                caption: n.text,
                                placeId: n.placeId,
                                date: n.date,
                              })
                            }
                            className="max-h-48 w-full cursor-pointer rounded-xl object-cover hover:opacity-95"
                          />
                        </div>
                      )}
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
                        <p className="text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
                          Visited · {fmtDate(s.date)}
                        </p>
                        <p className="font-display font-semibold text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground">Stamp collected</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      ) : (
        /* SAVED PLACES TAB */
        <div className="space-y-3 px-5 pt-5 pb-8">
          {saved.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-8 text-center">
              <Bookmark className="mx-auto h-6 w-6 text-muted-foreground" />
              <p className="mt-2 font-display text-lg">No saved places yet</p>
              <Link
                to="/discover"
                className="mt-3 inline-block rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
              >
                Discover places
              </Link>
            </div>
          ) : (
            saved.map((id) => {
              const p = getPlace(id);
              return p ? <RowCard key={id} place={p} /> : null;
            })
          )}
        </div>
      )}

      {/* ADD PHOTO MEMORY MODAL */}
      {addingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-card p-5 shadow-2xl border border-border animate-rise">
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                <h3 className="font-display text-base font-bold">New Photo Memory</h3>
              </div>
              <button
                onClick={() => setAddingPhoto(false)}
                className="rounded-full p-1 text-muted-foreground hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {photoImage ? (
                <div className="relative overflow-hidden rounded-2xl bg-muted">
                  <img src={photoImage} alt="Preview" className="h-48 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    className="absolute bottom-2 right-2 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm hover:bg-black/80"
                  >
                    Change photo
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => photoInputRef.current?.click()}
                  className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/40 p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <Camera className="h-8 w-8 text-primary mb-2" />
                  <span className="text-xs font-semibold text-foreground">Tap to select or take photo</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">JPG, PNG, WebP supported</span>
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Location / Place
                </label>
                <select
                  value={photoPlaceId}
                  onChange={(e) => setPhotoPlaceId(e.target.value)}
                  className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm"
                >
                  {places.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Memory Caption (Optional)
                </label>
                <textarea
                  value={photoCaption}
                  onChange={(e) => setPhotoCaption(e.target.value)}
                  rows={2}
                  placeholder="What made this moment unforgettable?"
                  className="mt-1 w-full resize-none rounded-xl border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setAddingPhoto(false)}
                  className="flex-1 rounded-full border border-border py-2 text-xs font-bold text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  onClick={submitPhotoMemory}
                  className="flex-1 rounded-full bg-primary py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                >
                  Save to Album
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN PHOTO LIGHTBOX MODAL */}
      {viewingPhoto && (
        <div
          onClick={() => setViewingPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-card shadow-2xl border border-border/40"
          >
            <button
              onClick={() => setViewingPhoto(null)}
              className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/90"
            >
              <X className="h-4 w-4" />
            </button>

            <img
              src={viewingPhoto.image}
              alt={viewingPhoto.caption || "Travel memory"}
              className="max-h-[60vh] w-full object-contain bg-black"
            />

            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                {viewingPhoto.placeId && (
                  <span className="flex items-center gap-1 text-xs font-bold text-primary">
                    <MapPin className="h-3.5 w-3.5" /> {getPlace(viewingPhoto.placeId)?.name}
                  </span>
                )}
                <span className="text-[11px] text-muted-foreground">{fmtDate(viewingPhoto.date)}</span>
              </div>

              {viewingPhoto.caption && (
                <p className="text-sm font-medium text-foreground">{viewingPhoto.caption}</p>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    deletePhotoMemory(viewingPhoto.id);
                    setViewingPhoto(null);
                    toast("Photo memory deleted");
                  }}
                  className="flex items-center gap-1 text-xs font-bold text-destructive hover:underline"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
