import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Lock, LogIn, Shield, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";
import { AuthModal } from "./AuthModal";

interface AuthGuardProps {
  children: ReactNode;
  /** Minimum role required. "explorer" = must be logged in. "pro" = must be pro. */
  requiredRole?: "explorer" | "pro";
  /** Custom message shown on the lock screen */
  message?: string;
  /** If true, shows a subtle banner instead of blocking the entire page */
  softBlock?: boolean;
}

/**
 * Route protection component.
 * Wraps protected pages and shows a login prompt if the user is not authenticated
 * or doesn't have the required role.
 */
export function AuthGuard({
  children,
  requiredRole = "explorer",
  message,
  softBlock = false,
}: AuthGuardProps) {
  const { user, isAuthenticated, isPro } = useStore();
  const [authOpen, setAuthOpen] = useState(false);

  // Check authentication
  const isLoggedIn = isAuthenticated && user;
  const hasRequiredRole =
    requiredRole === "pro"
      ? isPro
      : isLoggedIn;

  if (hasRequiredRole) {
    return <>{children}</>;
  }

  if (softBlock) {
    return (
      <>
        {children}
        {/* Soft overlay banner */}
        {!isLoggedIn && (
          <div className="fixed inset-x-0 bottom-20 z-50 mx-auto w-full max-w-[440px] px-4">
            <div className="flex items-center justify-between rounded-2xl border border-primary/30 bg-card/95 p-3.5 shadow-float backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold">Sign in to unlock all features</p>
                  <p className="text-[10px] text-muted-foreground">
                    Save places, collect stamps & more
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAuthOpen(true)}
                className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-sm hover:opacity-90"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      </>
    );
  }

  // Full block — show login gate
  return (
    <div className="min-h-screen bg-muted md:py-8">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[440px] flex-col items-center justify-center bg-background px-6 md:min-h-[860px] md:overflow-hidden md:rounded-[2.5rem] md:shadow-float">
        <div className="text-center">
          {/* Animated lock icon */}
          <div className="relative mx-auto mb-6">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-primary/20 to-gold/20 shadow-lg">
              <Lock className="h-9 w-9 text-primary animate-pulse" />
            </div>
            <div className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-gold text-gold-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
          </div>

          <h1 className="font-display text-3xl font-bold text-foreground">
            {requiredRole === "pro" ? "VIP Access Only" : "Sign In Required"}
          </h1>

          <p className="mx-auto mt-3 max-w-xs text-sm text-muted-foreground leading-relaxed">
            {message ||
              (requiredRole === "pro"
                ? "This feature is exclusive to Roam VIP members. Upgrade to unlock unlimited access."
                : "Create an account or sign in to access your travel journal, passport stamps, and personalized features.")}
          </p>

          <div className="mt-8 space-y-3">
            <button
              onClick={() => setAuthOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground shadow-card hover:opacity-95 transition-opacity"
            >
              <LogIn className="h-4 w-4" />
              {requiredRole === "pro" ? "Sign In & Upgrade" : "Sign In / Create Account"}
            </button>

            <Link
              to="/discover"
              className="flex w-full items-center justify-center rounded-full border border-border py-3 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            >
              Continue Browsing
            </Link>
          </div>

          {/* Feature preview cards */}
          <div className="mt-10 grid grid-cols-2 gap-3 text-left">
            {[
              { emoji: "🗺️", title: "Travel Journal", desc: "Private notes & memories" },
              { emoji: "🛂", title: "Passport Stamps", desc: "Collect & showcase" },
              { emoji: "🎧", title: "Audio Tours", desc: "Voice-guided stories" },
              { emoji: "🎟️", title: "VIP Perks", desc: "Partner discounts" },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border/60 bg-card p-3 opacity-70"
              >
                <span className="text-lg">{f.emoji}</span>
                <p className="mt-1 text-xs font-bold">{f.title}</p>
                <p className="text-[10px] text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
    </div>
  );
}
