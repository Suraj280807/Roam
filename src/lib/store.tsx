import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export interface Note { id: string; placeId: string; text: string; date: string }
export interface Stamp { placeId: string; date: string }
interface State {
  name: string;
  saved: string[];
  stamps: Stamp[];
  notes: Note[];
  interests: string[];
  location: "unset" | "demo" | "device";
  city: string;
}

const DEFAULT: State = {
  name: "Traveler",
  saved: [],
  stamps: [],
  notes: [],
  interests: ["History", "Viewpoints"],
  location: "unset",
  city: "Lisbon",
};
const KEY = "roam-state-v1";

interface Ctx extends State {
  ready: boolean;
  toggleSave: (id: string) => void;
  collectStamp: (id: string) => boolean;
  addNote: (placeId: string, text: string) => void;
  deleteNote: (id: string) => void;
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
      if (raw) setState({ ...DEFAULT, ...JSON.parse(raw) });
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

  const addNote = useCallback((placeId: string, text: string) =>
    setState((s) => ({ ...s, notes: [{ id: crypto.randomUUID(), placeId, text, date: new Date().toISOString() }, ...s.notes] })), []);
  const deleteNote = useCallback((id: string) => setState((s) => ({ ...s, notes: s.notes.filter((n) => n.id !== id) })), []);
  const update = useCallback((p: Partial<State>) => setState((s) => ({ ...s, ...p })), []);
  const reset = useCallback(() => setState(DEFAULT), []);

  return (
    <StoreCtx.Provider value={{ ...state, ready, toggleSave, collectStamp, addNote, deleteNote, update, reset }}>
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
