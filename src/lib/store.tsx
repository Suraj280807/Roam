import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { audioTourEngine } from "./audio";
import type { Place } from "./places";
import { ALL_PLACES, CURRENT_PLACES, DEMO_PLACES, registerDynamicPlaces } from "./places";
import { fetchLivePlacesForLocation, searchCityAndGetPlaces } from "./dynamic-places";
import {
  registerUser,
  loginUser,
  logoutUser,
  restoreSession,
  updateUserRole,
  updateUserProfile,
  hasPermission,
  type AuthUser,
  type UserRole,
  type Permission,
} from "./auth";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "guest" | "explorer" | "pro";
  avatar?: string | undefined;
  joinedDate: string;
}

export interface Coupon {
  id: string;
  partnerName: string;
  title: string;
  discount: string;
  code: string;
  placeId: string;
  expiry: string;
  isRedeemed: boolean;
}

export interface Quest {
  id: string;
  placeId: string;
  title: string;
  description: string;
  riddle: string;
  rewardCoins: number;
  unlockedCouponId?: string | undefined;
  isCompleted: boolean;
}

export interface Note {
  id: string;
  placeId: string;
  text: string;
  date: string;
  image?: string | undefined;
}

export interface Stamp {
  placeId: string;
  date: string;
}

export interface PhotoMemory {
  id: string;
  image: string;
  caption?: string | undefined;
  placeId?: string | undefined;
  date: string;
}

interface State {
  user: User | null;
  name: string;
  saved: string[];
  stamps: Stamp[];
  notes: Note[];
  memories: PhotoMemory[];
  interests: string[];
  location: "unset" | "demo" | "device";
  city: string;
  parentCity?: string | undefined;
  userCoords?: { lat: number; lng: number } | undefined;
  resolvedAddress?: string | undefined;
  activePlaces: Place[];
  // Monetization & USP Gamification
  coins: number;
  coupons: Coupon[];
  quests: Quest[];
  isPro: boolean;
  apiKey?: string | undefined;
  // Auth
  isAuthenticated: boolean;
  sessionToken?: string | undefined;
}

const DEFAULT_COUPONS: Coupon[] = [
  {
    id: "c-tea-1",
    partnerName: "The Tea Toast Co.",
    title: "Complimentary Kulhad Chai",
    discount: "Free with any Toastie",
    code: "ROAMCHAI",
    placeId: "tea-toast-co",
    expiry: "Valid for 30 days",
    isRedeemed: false,
  },
  {
    id: "c-amigos-1",
    partnerName: "Café Amigo's",
    title: "15% Off Total Bill",
    discount: "15% Discount",
    code: "AMIGOSROAM15",
    placeId: "cafe-amigos",
    expiry: "Valid on weekends",
    isRedeemed: false,
  },
  {
    id: "c-belem-1",
    partnerName: "Pastéis de Belém",
    title: "Free Cinnamon Coffee",
    discount: "Complimentary drink",
    code: "LISBONROAM",
    placeId: "pasteis-belem",
    expiry: "Valid anytime",
    isRedeemed: false,
  },
];

const DEFAULT_QUESTS: Quest[] = [
  {
    id: "q-sgu-1",
    placeId: "sgu",
    title: "The Scholar's Trail",
    description: "Explore Sanjay Ghodawat University and discover its modern research wing.",
    riddle: "I stand tall where knowledge meets ambition, surrounded by green lawns. What am I?",
    rewardCoins: 50,
    unlockedCouponId: "c-amigos-1",
    isCompleted: false,
  },
  {
    id: "q-ramling-1",
    placeId: "ramling",
    title: "Sacred Waters of Treta Yuga",
    description: "Find the sacred perennial spring pool carved into ancient basalt stone.",
    riddle:
      "Cool water flows perpetually beneath the cliff where Lord Rama rested. Discover the kund.",
    rewardCoins: 75,
    unlockedCouponId: "c-tea-1",
    isCompleted: false,
  },
  {
    id: "q-amigos-1",
    placeId: "cafe-amigos",
    title: "The Campus Hangout",
    description: "Relax under the glowing canopy with friends after a day of journeying.",
    riddle: "Where burger aromas fill the evening air under white patio lights.",
    rewardCoins: 40,
    isCompleted: false,
  },
  {
    id: "q-belem-1",
    placeId: "belem-tower",
    title: "The Rhinoceros Guardian",
    description: "Inspect the Manueline stone carvings facing the Tagus River.",
    riddle:
      "Look close at the outer turrets: which horned beast from India is etched in limestone?",
    rewardCoins: 60,
    unlockedCouponId: "c-belem-1",
    isCompleted: false,
  },
];

const DEFAULT: State = {
  user: null,
  name: "Guest Explorer",
  saved: [],
  stamps: [],
  notes: [],
  memories: [],
  interests: ["History", "Viewpoints"],
  location: "device",
  city: "Kolhapur",
  userCoords: { lat: 16.746, lng: 74.372 },
  resolvedAddress: "Sanjay Ghodawat University, Kolhapur",
  activePlaces: CURRENT_PLACES,
  coins: 0,
  coupons: DEFAULT_COUPONS,
  quests: DEFAULT_QUESTS,
  isPro: false,
  apiKey: undefined,
  isAuthenticated: false,
  sessionToken: undefined,
};

const KEY = "roam-state-v3";

interface Ctx extends State {
  ready: boolean;
  toggleSave: (id: string) => void;
  collectStamp: (id: string) => boolean;
  addNote: (placeId: string, text: string, image?: string | undefined) => void;
  deleteNote: (id: string) => void;
  addPhotoMemory: (memory: {
    image: string;
    caption?: string | undefined;
    placeId?: string | undefined;
  }) => void;
  deletePhotoMemory: (id: string) => void;
  setDemoLocation: () => void;
  setDeviceLocation: (
    coords: { lat: number; lng: number },
    city?: string,
    address?: string,
    parentCity?: string,
  ) => Promise<void>;
  update: (p: Partial<State>) => void;
  reset: () => void;
  // Auth & Roles (real auth integration)
  login: (name: string, email: string, role?: "guest" | "explorer" | "pro") => void;
  logout: () => void;
  upgradeToPro: () => void;
  // Real auth methods
  authRegister: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  authLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  authLogout: () => void;
  checkPermission: (permission: Permission) => boolean;
  // Quests & Monetized Rewards
  completeQuest: (questId: string) => void;
  redeemCoupon: (couponId: string) => void;
  // Dynamic Places & Search
  setActivePlaces: (places: Place[]) => void;
  searchDestination: (query: string) => Promise<boolean>;
  // Audio Narrator Tour
  activeAudioPlaceId: string | null;
  isAudioPlaying: boolean;
  playAudioTour: (placeId: string, title: string, text: string) => void;
  stopAudioTour: () => void;
}

const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(DEFAULT);
  const [ready, setReady] = useState(false);
  const [activeAudioPlaceId, setActiveAudioPlaceId] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  useEffect(() => {
    audioTourEngine.registerListener((playing) => {
      setIsAudioPlaying(playing);
      if (!playing) {
        setActiveAudioPlaceId(null);
      }
    });
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY) || localStorage.getItem("roam-state-v2");
      if (raw) {
        const parsed = JSON.parse(raw);
        const places = parsed.activePlaces?.length ? parsed.activePlaces : CURRENT_PLACES;
        registerDynamicPlaces(places);

        // Restore session from auth system
        const restoredUser = restoreSession();
        const isAuth = !!restoredUser;

        setState({
          ...DEFAULT,
          ...parsed,
          activePlaces: places,
          coupons: parsed.coupons?.length ? parsed.coupons : DEFAULT_COUPONS,
          quests: parsed.quests?.length ? parsed.quests : DEFAULT_QUESTS,
          // Restore auth state from real session
          isAuthenticated: isAuth,
          user: isAuth && restoredUser
            ? {
                id: restoredUser.id,
                name: restoredUser.name,
                email: restoredUser.email,
                role: restoredUser.role,
                avatar: restoredUser.avatar,
                joinedDate: restoredUser.joinedDate,
              }
            : parsed.user || null,
          isPro: isAuth ? restoredUser!.role === "pro" : parsed.isPro || false,
          name: isAuth ? restoredUser!.name : parsed.name || "Guest Explorer",
        });

        const hasFakeOrStalePlaces =
          !parsed.activePlaces?.length ||
          parsed.activePlaces.some(
            (p: { id?: string; name?: string }) =>
              p.id === "sgu" ||
              p.id === "ramling" ||
              p.id?.includes("venue-fb-") ||
              p.id?.includes("local-") ||
              p.name?.includes("Heritage Landmark") ||
              p.name?.includes("Scenic Viewpoint") ||
              p.name?.includes("Cultural Bazaar") ||
              p.name?.includes("Heritage Coffee House") ||
              p.name?.includes("The Grand Heritage Hotel"),
          );

        if (
          parsed.city &&
          parsed.city !== "Lisbon" &&
          parsed.userCoords &&
          hasFakeOrStalePlaces
        ) {
          fetchLivePlacesForLocation(
            parsed.userCoords.lat,
            parsed.userCoords.lng,
            parsed.city,
            parsed.parentCity,
          ).then((liveSpots) => {
            registerDynamicPlaces(liveSpots);
            setState((s) => ({ ...s, activePlaces: liveSpots }));
          });
        }
      } else {
        registerDynamicPlaces(CURRENT_PLACES);

        // Try restoring session even without stored state
        const restoredUser = restoreSession();
        if (restoredUser) {
          setState((s) => ({
            ...s,
            isAuthenticated: true,
            user: {
              id: restoredUser.id,
              name: restoredUser.name,
              email: restoredUser.email,
              role: restoredUser.role,
              avatar: restoredUser.avatar,
              joinedDate: restoredUser.joinedDate,
            },
            name: restoredUser.name,
            isPro: restoredUser.role === "pro",
          }));
        }
      }
    } catch {
      /* ignore corrupt data */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem(KEY, JSON.stringify(state));
      } catch (err) {
        console.warn("Storage warning (exceeded or blocked):", err);
      }
    }
  }, [state, ready]);

  const toggleSave = useCallback(
    (id: string) =>
      setState((s) => ({
        ...s,
        saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id],
      })),
    [],
  );

  const collectStamp = useCallback((id: string) => {
    let added = false;
    setState((s) => {
      if (s.stamps.some((x) => x.placeId === id)) return s;
      added = true;
      const updatedCoins = s.coins + 25;
      return {
        ...s,
        coins: updatedCoins,
        stamps: [...s.stamps, { placeId: id, date: new Date().toISOString() }],
      };
    });
    return added;
  }, []);

  const addNote = useCallback(
    (placeId: string, text: string, image?: string | undefined) =>
      setState((s) => {
        const newNote: Note = {
          id: crypto.randomUUID(),
          placeId,
          text,
          date: new Date().toISOString(),
          ...(image ? { image } : {}),
        };
        return {
          ...s,
          notes: [newNote, ...s.notes],
        };
      }),
    [],
  );

  const deleteNote = useCallback(
    (id: string) => setState((s) => ({ ...s, notes: s.notes.filter((n) => n.id !== id) })),
    [],
  );

  const addPhotoMemory = useCallback(
    (memory: { image: string; caption?: string | undefined; placeId?: string | undefined }) =>
      setState((s) => {
        const newMemory: PhotoMemory = {
          id: crypto.randomUUID(),
          image: memory.image,
          date: new Date().toISOString(),
          ...(memory.caption ? { caption: memory.caption } : {}),
          ...(memory.placeId ? { placeId: memory.placeId } : {}),
        };
        return {
          ...s,
          memories: [newMemory, ...(s.memories || [])],
        };
      }),
    [],
  );

  const deletePhotoMemory = useCallback(
    (id: string) =>
      setState((s) => ({
        ...s,
        memories: (s.memories || []).filter((m) => m.id !== id),
      })),
    [],
  );

  const setDemoLocation = useCallback(() => {
    registerDynamicPlaces(DEMO_PLACES);
    setState((s) => ({
      ...s,
      location: "demo",
      city: "Lisbon",
      userCoords: { lat: 38.7115, lng: -9.1395 },
      resolvedAddress: "Baixa Pombalina, Lisbon",
      activePlaces: DEMO_PLACES,
    }));
  }, []);

  const setDeviceLocation = useCallback(
    async (
      coords: { lat: number; lng: number },
      city?: string,
      address?: string,
      parentCity?: string,
    ) => {
      const activeCity = city || "Current Location";
      // Fetch dynamic spots for this actual detected location!
      const dynamicPlaces = await fetchLivePlacesForLocation(
        coords.lat,
        coords.lng,
        activeCity,
        parentCity,
      );
      registerDynamicPlaces(dynamicPlaces);

      setState((s) => ({
        ...s,
        location: "device",
        city: activeCity,
        parentCity: parentCity || activeCity,
        userCoords: coords,
        resolvedAddress: address || `Lat: ${coords.lat.toFixed(3)}, Lng: ${coords.lng.toFixed(3)}`,
        activePlaces: dynamicPlaces,
      }));
    },
    [],
  );

  const setActivePlaces = useCallback((places: Place[]) => {
    registerDynamicPlaces(places);
    setState((s) => ({ ...s, activePlaces: places }));
  }, []);

  const searchDestination = useCallback(async (query: string): Promise<boolean> => {
    const res = await searchCityAndGetPlaces(query);
    if (!res) return false;
    registerDynamicPlaces(res.places);

    setState((s) => ({
      ...s,
      location: "device",
      city: res.city,
      parentCity: res.parentCity || res.city,
      userCoords: res.coords,
      resolvedAddress: res.address,
      activePlaces: res.places,
    }));
    return true;
  }, []);

  const update = useCallback((p: Partial<State>) => setState((s) => ({ ...s, ...p })), []);
  const reset = useCallback(() => {
    registerDynamicPlaces(CURRENT_PLACES);
    setState(DEFAULT);
  }, []);

  // Legacy Auth (quick demo login — kept for backward compatibility)
  const login = useCallback(
    (name: string, email: string, role: "guest" | "explorer" | "pro" = "explorer") => {
      const newUser: User = {
        id: crypto.randomUUID(),
        name,
        email,
        role,
        joinedDate: new Date().toISOString(),
      };
      setState((s) => ({
        ...s,
        user: newUser,
        name: newUser.name,
        isPro: role === "pro",
        isAuthenticated: true,
      }));
    },
    [],
  );

  const logout = useCallback(() => {
    logoutUser();
    setState((s) => ({
      ...s,
      user: null,
      name: "Guest Explorer",
      isPro: false,
      isAuthenticated: false,
      sessionToken: undefined,
    }));
  }, []);

  const upgradeToPro = useCallback(() => {
    setState((s) => {
      // Also update the stored user record if authenticated
      if (s.user?.id) {
        updateUserRole(s.user.id, "pro");
      }
      return {
        ...s,
        isPro: true,
        coins: s.coins + 200,
        user: s.user ? { ...s.user, role: "pro" as const } : null,
      };
    });
  }, []);

  // ─── Real Auth Methods ────────────────────────────────────────

  const authRegister = useCallback(
    async (
      name: string,
      email: string,
      password: string,
    ): Promise<{ success: boolean; error?: string }> => {
      const result = await registerUser(name, email, password, "explorer");
      if (result.success && result.user) {
        setState((s) => ({
          ...s,
          user: {
            id: result.user!.id,
            name: result.user!.name,
            email: result.user!.email,
            role: result.user!.role,
            avatar: result.user!.avatar,
            joinedDate: result.user!.joinedDate,
          },
          name: result.user!.name,
          isPro: result.user!.role === "pro",
          isAuthenticated: true,
          sessionToken: result.token,
          coins: 50, // Welcome bonus
        }));
        return { success: true };
      }
      return { success: false, error: result.error };
    },
    [],
  );

  const authLogin = useCallback(
    async (
      email: string,
      password: string,
    ): Promise<{ success: boolean; error?: string }> => {
      const result = await loginUser(email, password);
      if (result.success && result.user) {
        setState((s) => ({
          ...s,
          user: {
            id: result.user!.id,
            name: result.user!.name,
            email: result.user!.email,
            role: result.user!.role,
            avatar: result.user!.avatar,
            joinedDate: result.user!.joinedDate,
          },
          name: result.user!.name,
          isPro: result.user!.role === "pro",
          isAuthenticated: true,
          sessionToken: result.token,
        }));
        return { success: true };
      }
      return { success: false, error: result.error };
    },
    [],
  );

  const authLogout = useCallback(() => {
    logoutUser();
    setState((s) => ({
      ...s,
      user: null,
      name: "Guest Explorer",
      isPro: false,
      isAuthenticated: false,
      sessionToken: undefined,
    }));
  }, []);

  const checkPermission = useCallback(
    (permission: Permission): boolean => {
      const role: UserRole = state.user?.role || "guest";
      return hasPermission(role, permission);
    },
    [state.user?.role],
  );

  // Quests & Rewards
  const completeQuest = useCallback((questId: string) => {
    setState((s) => {
      const q = s.quests.find((item) => item.id === questId);
      if (!q || q.isCompleted) return s;
      return {
        ...s,
        coins: s.coins + q.rewardCoins,
        quests: s.quests.map((item) =>
          item.id === questId ? { ...item, isCompleted: true } : item,
        ),
      };
    });
  }, []);

  const redeemCoupon = useCallback((couponId: string) => {
    setState((s) => ({
      ...s,
      coupons: s.coupons.map((c) => (c.id === couponId ? { ...c, isRedeemed: true } : c)),
    }));
  }, []);

  // Audio Tour Controls
  const playAudioTour = useCallback((placeId: string, title: string, text: string) => {
    setActiveAudioPlaceId(placeId);
    audioTourEngine.speak(text, title);
  }, []);

  const stopAudioTour = useCallback(() => {
    audioTourEngine.stop();
    setActiveAudioPlaceId(null);
    setIsAudioPlaying(false);
  }, []);

  return (
    <StoreCtx.Provider
      value={{
        ...state,
        ready,
        toggleSave,
        collectStamp,
        addNote,
        deleteNote,
        addPhotoMemory,
        deletePhotoMemory,
        setDemoLocation,
        setDeviceLocation,
        setActivePlaces,
        searchDestination,
        update,
        reset,
        login,
        logout,
        upgradeToPro,
        authRegister,
        authLogin,
        authLogout,
        checkPermission,
        completeQuest,
        redeemCoupon,
        activeAudioPlaceId,
        isAudioPlaying,
        playAudioTour,
        stopAudioTour,
      }}
    >
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
