import { useState, useEffect } from "react";
import {
  Check,
  Crown,
  Eye,
  EyeOff,
  LogIn,
  LogOut,
  Shield,
  ShieldCheck,
  Sparkles,
  User as UserIcon,
  UserPlus,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import {
  getPasswordStrength,
  validateEmail,
  validateName,
  validatePassword,
} from "@/lib/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { user, isPro, coins, authRegister, authLogin, authLogout, upgradeToPro, login } =
    useStore();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when mode changes
  useEffect(() => {
    setErrors({});
    setPassword("");
    setConfirmPassword("");
  }, [mode]);

  if (!isOpen) return null;

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (mode === "signup") {
      const nameErr = validateName(name);
      if (nameErr) newErrors.name = nameErr;
    }

    const emailErr = validateEmail(email);
    if (emailErr) newErrors.email = emailErr;

    if (mode === "signup") {
      const passErr = validatePassword(password);
      if (passErr) newErrors.password = passErr;

      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    } else {
      if (!password) newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      if (mode === "signup") {
        const result = await authRegister(name, email, password);
        if (result.success) {
          toast.success(`Welcome to Roam, ${name.trim()}! 🎉 You earned 50 welcome coins.`);
          onClose();
          resetForm();
        } else {
          setErrors({ general: result.error || "Registration failed" });
        }
      } else {
        const result = await authLogin(email, password);
        if (result.success) {
          toast.success("Welcome back! 🌍");
          onClose();
          resetForm();
        } else {
          setErrors({ general: result.error || "Login failed" });
        }
      }
    } catch {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = (role: "explorer" | "pro") => {
    if (role === "pro") {
      login("Alex Vance (VIP)", "alex@roam.travel", "pro");
      toast.success("Signed in as Roam Club VIP Member!");
    } else {
      login("Maya Chen", "maya@roam.travel", "explorer");
      toast.success("Signed in as Explorer!");
    }
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
    setShowPassword(false);
    setShowConfirm(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      style={{ animation: "fadeIn 0.2s ease-out" }}
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-card border border-border/80 shadow-2xl"
        style={{ animation: "scaleIn 0.25s ease-out" }}
      >
        {/* Close button */}
        <button
          onClick={() => {
            onClose();
            resetForm();
          }}
          className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="max-h-[85vh] overflow-y-auto p-6">
          {user ? (
            // ─── Logged-in State ────────────────────────────────────
            <div className="text-center">
              <div className="relative mx-auto w-fit">
                <div className="flex h-18 w-18 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-primary text-gold font-display text-2xl font-bold shadow-lg"
                  style={{ width: 72, height: 72 }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {isPro && (
                  <div className="absolute -right-1 -bottom-1 grid h-7 w-7 place-items-center rounded-full bg-gold text-gold-foreground shadow-sm">
                    <Crown className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-center justify-center gap-1.5">
                <h2 className="text-xl font-bold">{user.name}</h2>
                {isPro && (
                  <span className="flex items-center gap-0.5 rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold text-gold-foreground">
                    <Crown className="h-3 w-3 text-gold" /> PRO
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{user.email}</p>

              {/* Account Security Badge */}
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-600">
                <ShieldCheck className="h-3 w-3" />
                Account Secured · SHA-256 Encrypted
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-secondary/60 p-3 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Roam Coins</p>
                  <p className="font-display text-xl font-bold text-gold">🪙 {coins}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tier</p>
                  <p className="text-sm font-bold text-primary">
                    {isPro ? "Club VIP" : "Free Explorer"}
                  </p>
                </div>
              </div>

              {!isPro && (
                <button
                  onClick={() => {
                    upgradeToPro();
                    toast.success("Upgraded to Roam Club VIP! Enjoy all benefits.");
                  }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gold py-2.5 text-xs font-bold text-gold-foreground shadow-card hover:opacity-95 transition-opacity"
                >
                  <Crown className="h-4 w-4" /> Upgrade to VIP ($4.99/mo)
                </button>
              )}

              <button
                onClick={() => {
                  authLogout();
                  toast.info("Logged out securely.");
                  onClose();
                  resetForm();
                }}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-border py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" /> Log Out
              </button>
            </div>
          ) : (
            // ─── Auth Form (Sign In / Sign Up) ──────────────────────
            <div>
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-gold/20 text-primary shadow-sm">
                  <Shield className="h-7 w-7" />
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold">
                  {mode === "signin" ? "Welcome Back" : "Join Roam"}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {mode === "signin"
                    ? "Sign in to sync your stamps, quests & travel data."
                    : "Create a secure account to start your adventure."}
                </p>
              </div>

              {/* General error */}
              {errors.general && (
                <div className="mt-4 rounded-xl bg-destructive/10 border border-destructive/30 px-3 py-2.5 text-xs font-medium text-destructive">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                {/* Name (sign up only) */}
                {mode === "signup" && (
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground">
                      Full Name
                    </label>
                    <div className="relative mt-1">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((p) => ({ ...p, name: "" }));
                        }}
                        placeholder="Your traveler name"
                        className={`w-full rounded-xl border bg-background pl-9 pr-3 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/40 ${
                          errors.name ? "border-destructive" : "border-border"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-[11px] text-destructive">{errors.name}</p>
                    )}
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((p) => ({ ...p, email: "" }));
                    }}
                    placeholder="explorer@travel.com"
                    className={`mt-1 w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/40 ${
                      errors.email ? "border-destructive" : "border-border"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground">
                    Password
                  </label>
                  <div className="relative mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors((p) => ({ ...p, password: "" }));
                      }}
                      placeholder="••••••••"
                      className={`w-full rounded-xl border bg-background px-3 py-2.5 pr-10 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/40 ${
                        errors.password ? "border-destructive" : "border-border"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-[11px] text-destructive">{errors.password}</p>
                  )}

                  {/* Password strength indicator (sign up only) */}
                  {mode === "signup" && password.length > 0 && (
                    <div className="mt-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                              level <= passwordStrength.score
                                ? passwordStrength.color
                                : "bg-border"
                            }`}
                          />
                        ))}
                      </div>
                      <p
                        className={`mt-1 text-[10px] font-bold ${
                          passwordStrength.score <= 2
                            ? "text-red-500"
                            : passwordStrength.score <= 3
                              ? "text-amber-500"
                              : "text-emerald-500"
                        }`}
                      >
                        {passwordStrength.label}
                        {passwordStrength.score <= 2 &&
                          " — Use 8+ chars, uppercase, number & special char"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password (sign up only) */}
                {mode === "signup" && (
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground">
                      Confirm Password
                    </label>
                    <div className="relative mt-1">
                      <input
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (errors.confirmPassword)
                            setErrors((p) => ({ ...p, confirmPassword: "" }));
                        }}
                        placeholder="Re-enter password"
                        className={`w-full rounded-xl border bg-background px-3 py-2.5 pr-10 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/40 ${
                          errors.confirmPassword ? "border-destructive" : "border-border"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showConfirm ? "Hide password" : "Show password"}
                      >
                        {showConfirm ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-[11px] text-destructive">
                        {errors.confirmPassword}
                      </p>
                    )}
                    {/* Match indicator */}
                    {confirmPassword && password === confirmPassword && (
                      <p className="mt-1 flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                        <Check className="h-3 w-3" /> Passwords match
                      </p>
                    )}
                  </div>
                )}

                {/* Remember me & Forgot */}
                {mode === "signin" && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-3.5 w-3.5 rounded border-border accent-primary"
                      />
                      Remember me
                    </label>
                    <button
                      type="button"
                      className="text-[11px] font-semibold text-primary hover:underline"
                      onClick={() =>
                        toast.info(
                          "Password reset is not yet available in this version.",
                        )
                      }
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground shadow-card hover:opacity-95 disabled:opacity-50 transition-all"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      {mode === "signin" ? "Signing in..." : "Creating account..."}
                    </span>
                  ) : (
                    <>
                      {mode === "signin" ? (
                        <LogIn className="h-4 w-4" />
                      ) : (
                        <UserPlus className="h-4 w-4" />
                      )}
                      {mode === "signin" ? "Sign In" : "Create Account"}
                    </>
                  )}
                </button>
              </form>

              {/* Security badge */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                SHA-256 encrypted · Secure session · 7-day token
              </div>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <span className="relative bg-card px-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                  Or Quick Demo
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleQuickDemoLogin("explorer")}
                  className="rounded-xl border border-border bg-secondary/50 py-2 text-xs font-semibold hover:bg-secondary text-foreground transition-colors"
                >
                  ⚡ Free Explorer
                </button>
                <button
                  onClick={() => handleQuickDemoLogin("pro")}
                  className="rounded-xl border border-gold/40 bg-gold/10 py-2 text-xs font-bold text-gold-foreground hover:bg-gold/20 transition-colors"
                >
                  👑 Roam VIP
                </button>
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                {mode === "signin" ? "New to Roam? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                  className="font-bold text-primary hover:underline"
                >
                  {mode === "signin" ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px) }
          to { opacity: 1; transform: scale(1) translateY(0) }
        }
      `}</style>
    </div>
  );
}
