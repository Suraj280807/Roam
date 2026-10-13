import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export interface Note { id: string; placeId: string; text: string; date: string; image?: string }
export interface Stamp { placeId: string; date: string }
export interface PhotoMemory { id: string; image: string; caption?: string; placeId?: string; date: string }
interface State {
  name: string;
  saved: string[];
  stamps: Stamp[];
  notes: Note[];
  memories: PhotoMemory[];
  interests: string[];
  location: "unset" | "demo" | "device";
  city: string;
  userCoords?: { lat: number; lng: number };
  resolvedAddress?: string;
}

const DEFAULT: State = {
  name: "Traveler",
  saved: [],
  stamps: [],
  notes: [],
  memories: [],
  interests: ["History", "Viewpoints"],
  location: "device",
  city: "Kolhapur",
  userCoords: { lat: 16.746, lng: 74.372 },
  resolvedAddress: "Sanjay Ghodawat University, Kolhapur",
};
const KEY = "roam-state-v1";

interface Ctx extends State {
  ready: boolean;
  toggleSave: (id: string) => void;
  collectStamp: (id: string) => boolean;
  addNote: (placeId: string, text: string, image?: string) => void;
  deleteNote: (id: string) => void;
  addPhotoMemory: (memory: { image: string; caption?: string; placeId?: string }) => void;
  deletePhotoMemory: (id: string) => void;
  setDemoLocation: () => void;
  setDeviceLocation: (coords: { lat: number; lng: number }, city?: string, address?: string) => void;
  update: (p: Partial<State>) => void;
  reset: () => void;
}
const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(DEFAULT);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.location === "unset") {
          parsed.location = "device";
          if (parsed.city === "Lisbon") parsed.city = "Kolhapur";
        }
        setState({ ...DEFAULT, memories: [], ...parsed });
      }
    } catch { /* ignore corrupt data */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, ready]);

  const toggleSave = useCallback((id: string) =>
    setState((s) => ({ ...s, saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id] })), []);

  const collectStamp = useCallback((id: string) => {
    let added = false;
    setState((s) => {
      if (s.stamps.some((x) => x.placeId === id)) return s;
      added = true;
      return { ...s, stamps: [...s.stamps, { placeId: id, date: new Date().toISOString() }] };
    });
    return added;
  }, []);

  const addNote = useCallback((placeId: string, text: string, image?: string) =>
    setState((s) => ({ ...s, notes: [{ id: crypto.randomUUID(), placeId, text, image, date: new Date().toISOString() }, ...s.notes] })), []);
  const deleteNote = useCallback((id: string) => setState((s) => ({ ...s, notes: s.notes.filter((n) => n.id !== id) })), []);

  const addPhotoMemory = useCallback((memory: { image: string; caption?: string; placeId?: string }) =>
    setState((s) => ({
      ...s,
      memories: [
        {
          id: crypto.randomUUID(),
          image: memory.image,
          caption: memory.caption,
          placeId: memory.placeId,
          date: new Date().toISOString(),
        },
        ...(s.memories || []),
      ],
    })), []);

  const deletePhotoMemory = useCallback((id: string) =>
    setState((s) => ({
      ...s,
      memories: (s.memories || []).filter((m) => m.id !== id),
    })), []);

  const setDemoLocation = useCallback(() => {
    setState((s) => ({
      ...s,
      location: "demo",
      city: "Lisbon",
      userCoords: { lat: 38.7115, lng: -9.1395 },
      resolvedAddress: "Baixa Pombalina, Lisbon",
    }));
  }, []);

  const setDeviceLocation = useCallback((coords: { lat: number; lng: number }, city?: string, address?: string) => {
    setState((s) => ({
      ...s,
      location: "device",
      city: city || s.city || "Current Location",
      userCoords: coords,
      resolvedAddress: address || `Lat: ${coords.lat.toFixed(3)}, Lng: ${coords.lng.toFixed(3)}`,
    }));
  }, []);

  const update = useCallback((p: Partial<State>) => setState((s) => ({ ...s, ...p })), []);
  const reset = useCallback(() => setState(DEFAULT), []);

  return (
    <StoreCtx.Provider value={{ ...state, ready, toggleSave, collectStamp, addNote, deleteNote, addPhotoMemory, deletePhotoMemory, setDemoLocation, setDeviceLocation, update, reset }}>
      {children}
    </StoreCtx.Provider>
  );
}

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore outside provider");
  return c;
}

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
