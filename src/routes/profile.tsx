import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Crown,
  Key,
  LocateFixed,
  LogIn,
  LogOut,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { AuthModal } from "@/components/AuthModal";
import { ProUpgradeModal } from "@/components/ProUpgradeModal";
import { RowCard } from "@/components/PlaceCard";
import { CATEGORIES, getPlace } from "@/lib/places";
import { useStore } from "@/lib/store";
import { resolveCurrentLocation } from "@/lib/location";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & Settings — Roam" },
      {
        name: "description",
        content: "Manage your interests, saved destinations, security, and VIP travel pass.",
      },
      { property: "og:title", content: "Profile & Settings — Roam" },
      { property: "og:description", content: "Personalise your Roam experience." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const {
    name,
    user,
    isPro,
    coins,
    interests,
    saved,
    stamps,
    notes,
    location,
    resolvedAddress,
    apiKey,
    setDemoLocation,
    setDeviceLocation,
    update,
    reset,
    logout,
  } = useStore();

  const [draft, setDraft] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [proOpen, setProOpen] = useState(false);
  const [keyDraft, setKeyDraft] = useState(apiKey || "");
  const [editingKey, setEditingKey] = useState(false);

  const toggleInterest = (c: string) =>
    update({
      interests: interests.includes(c) ? interests.filter((x) => x !== c) : [...interests, c],
    });

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    update({ apiKey: keyDraft.trim() || undefined });
    setEditingKey(false);
    toast.success("AI API configuration saved!");
  };

  return (
    <AppShell>
      <div className="flex items-center justify-between px-5 pt-6">
        <div className="flex items-center gap-3">
          <Link
            to="/discover"
            aria-label="Back"
            className="grid h-10 w-10 place-items-center rounded-full bg-card shadow-card"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold">Profile & Account</h1>
        </div>
        <button
          onClick={() => setAuthOpen(true)}
          className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-foreground"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          {user ? "Account" : "Sign In"}
        </button>
      </div>

      {/* Account Badge Card */}
      <div className="mx-5 mt-5 rounded-3xl bg-card border border-border/70 p-5 shadow-card">
        {user ? (
          <div>
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald font-display text-2xl font-semibold text-gold shadow-sm">
                {user.avatar ? (
                  <img src={user.avatar} className="h-full w-full rounded-full object-cover" />
                ) : (
                  (user.name || name).charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-display text-xl font-bold truncate">{user.name || name}</p>
                  {isPro ? (
                    <span className="flex items-center gap-0.5 rounded-full bg-gold/20 px-2 py-0.5 text-[9px] font-bold text-gold-foreground shrink-0">
                      <Crown className="h-2.5 w-2.5 text-gold" /> VIP
                    </span>
                  ) : (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary shrink-0">
                      Explorer
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="flex items-center gap-1 text-[10px] text-green-600 font-semibold bg-green-500/10 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="h-3 w-3" /> SHA-256 Verified
                  </span>
                  <span className="text-xs font-bold text-gold">🪙 {coins} Coins</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2 pt-3 border-t border-border">
              <button
                onClick={() => setAuthOpen(true)}
                className="flex-1 rounded-xl bg-secondary py-2 text-xs font-bold text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                Account Settings
              </button>
              <button
                onClick={() => {
                  logout();
                  toast.success("Signed out successfully");
                }}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-destructive/30 px-3 py-2 text-xs font-bold text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-2">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <LogIn className="h-6 w-6" />
            </div>
            <h2 className="font-display text-lg font-bold">Sign In to Your Account</h2>
            <p className="mx-auto mt-1 max-w-xs text-xs text-muted-foreground">
              Sign in or create an account to save favorite places, collect travel stamps, and earn VIP perks.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setAuthOpen(true)}
                className="flex-1 rounded-full bg-primary py-2.5 text-xs font-bold text-primary-foreground shadow-card hover:opacity-95"
              >
                Sign In / Register
              </button>
            </div>
          </div>
        )}

        {/* Pro Pass Callout */}
        {!isPro ? (
          <div className="mt-4 rounded-2xl border border-gold/40 bg-gold/10 p-3 text-center">
            <p className="text-xs font-bold text-gold-foreground">Upgrade to Roam Explorer Club</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Unlock unlimited voice audio tours and partner discount vouchers.
            </p>
            <button
              onClick={() => setProOpen(true)}
              className="mt-2.5 w-full rounded-full bg-gold py-2 text-xs font-bold text-gold-foreground shadow-sm hover:opacity-95"
            >
              Get VIP Pass ($4.99/mo)
            </button>
          </div>
        ) : (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-gold/10 px-3 py-2 text-xs text-gold-foreground">
            <span className="flex items-center gap-1.5 font-bold">
              <Crown className="h-3.5 w-3.5 text-gold" /> Roam VIP Club Member
            </span>
            <span className="text-[11px] opacity-80">Active</span>
          </div>
        )}
      </div>

      <div className="mx-5 mt-3 grid grid-cols-3 gap-2 text-center">
        {[
          ["Stamps", stamps.length],
          ["Saved", saved.length],
          ["Notes", notes.length],
        ].map(([l, v]) => (
          <div key={l} className="rounded-2xl bg-accent py-3">
            <p className="font-display text-2xl font-semibold">{v}</p>
            <p className="text-[11px] text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>

      <h2 className="px-5 pt-7 text-lg font-semibold">Preferred interests</h2>
      <div className="flex flex-wrap gap-2 px-5 pt-3">
        {CATEGORIES.map((c) => {
          const on = interests.includes(c);
          return (
            <button
              key={c}
              onClick={() => toggleInterest(c)}
              aria-pressed={on}
              className={`rounded-full px-4 py-2 text-xs font-bold ${
                on ? "bg-primary text-primary-foreground" : "bg-card shadow-card"
              }`}
            >
              {on && "✓ "}
              {c}
            </button>
          );
        })}
      </div>

      {/* Optional AI Custom API Key Setup */}
      <h2 className="px-5 pt-7 text-lg font-semibold">AI Assistant Settings</h2>
      <div className="mx-5 mt-3 rounded-2xl bg-card border border-border p-4 shadow-card">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs font-bold">Custom AI Key (Optional)</p>
              <p className="text-[11px] text-muted-foreground">
                Plug in an OpenAI or Gemini key for custom live LLM streaming.
              </p>
            </div>
          </div>
          <button
            onClick={() => setEditingKey(!editingKey)}
            className="text-xs font-bold text-primary hover:underline"
          >
            {editingKey ? "Cancel" : apiKey ? "Change" : "Add Key"}
          </button>
        </div>

        {editingKey ? (
          <form onSubmit={handleSaveApiKey} className="mt-3 flex gap-2">
            <input
              type="password"
              value={keyDraft}
              onChange={(e) => setKeyDraft(e.target.value)}
              placeholder="sk-... or AIzaSy..."
              className="w-full rounded-xl border bg-background px-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-sm"
            >
              Save
            </button>
          </form>
        ) : (
          <p className="mt-2 text-[11px] text-muted-foreground">
            Status: {apiKey ? "Custom Key Configured ✓" : "Using Built-in High Speed Engine"}
          </p>
        )}
      </div>

      <h2 className="px-5 pt-7 text-lg font-semibold">Location settings</h2>
      <div className="mx-5 mt-3 space-y-2">
        {/* Device GPS Location */}
        <button
          onClick={async () => {
            try {
              setLocating(true);
              const res = await resolveCurrentLocation();
              setDeviceLocation(res.coords, res.city, res.address);
              toast.success(`Current location enabled: ${res.city}`);
            } catch (err: unknown) {
              const msg = err instanceof Error ? err.message : "Could not access location";
              toast.error(msg);
            } finally {
              setLocating(false);
            }
          }}
          disabled={locating}
          className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left transition-all ${
            location === "device" ? "bg-secondary ring-2 ring-primary" : "bg-card shadow-card"
          }`}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <LocateFixed className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">
              {locating ? "Detecting location..." : "Use Current Location (GPS)"}
            </p>
            <p className="text-xs text-muted-foreground">
              {location === "device" && resolvedAddress
                ? resolvedAddress
                : "Live GPS & Reverse Geocoding"}
            </p>
          </div>
          {location === "device" && <Check className="h-4 w-4 text-primary" />}
        </button>

        {/* Demo Location */}
        <button
          onClick={() => {
            setDemoLocation();
            toast.success("Switched to Demo location: Baixa, Lisbon");
          }}
          className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left transition-all ${
            location === "demo" ? "bg-secondary ring-2 ring-primary" : "bg-card shadow-card"
          }`}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Demo location (Lisbon)</p>
            <p className="text-xs text-muted-foreground">Baixa Pombalina, Lisbon (prototype)</p>
          </div>
          {location === "demo" && <Check className="h-4 w-4 text-primary" />}
        </button>
      </div>

      <h2 className="px-5 pt-7 text-lg font-semibold">Saved places</h2>
      <div className="space-y-3 px-5 pt-3">
        {saved.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nothing saved yet — tap the bookmark on any place.
          </p>
        ) : (
          saved.map((id) => {
            const p = getPlace(id);
            return p ? <RowCard key={id} place={p} /> : null;
          })
        )}
      </div>

      <div className="p-5 pt-8">
        <button
          onClick={() => {
            if (confirm("Reset all local demo data and stamps?")) {
              reset();
              toast("Demo data reset");
            }
          }}
          className="flex w-full items-center justify-center gap-2 rounded-full border py-3 text-sm font-bold text-destructive hover:bg-destructive/10"
        >
          <RotateCcw className="h-4 w-4" /> Reset demo data
        </button>
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <ProUpgradeModal isOpen={proOpen} onClose={() => setProOpen(false)} />
    </AppShell>
  );
}
