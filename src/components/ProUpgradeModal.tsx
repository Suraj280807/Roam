import { Check, Crown, Headphones, Map, Sparkles, Tag, X, Zap } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/lib/store";

interface ProUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProUpgradeModal({ isOpen, onClose }: ProUpgradeModalProps) {
  const { isPro, upgradeToPro } = useStore();

  if (!isOpen) return null;

  const handleUpgrade = () => {
    upgradeToPro();
    toast.success("Welcome to Roam Club VIP! All premium perks unlocked.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm overflow-hidden rounded-[2rem] bg-gradient-to-b from-card via-card to-background border-2 border-gold/40 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-secondary/80 text-muted-foreground hover:text-foreground"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/20 text-gold shadow-card ring-4 ring-gold/10">
            <Crown className="h-8 w-8" />
          </div>
          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
            Roam Explorer Club
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold">Unlock The Complete Journey</h2>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Experience landmarks with hands-free audio storytelling and exclusive local perks.
          </p>
        </div>

        <div className="mt-5 space-y-2.5">
          <PerkRow
            icon={<Headphones className="h-4 w-4 text-gold" />}
            title="Voice Audio Walking Tours"
            desc="Listen to narrated stories at every landmark like having a personal local guide."
          />
          <PerkRow
            icon={<Tag className="h-4 w-4 text-emerald" />}
            title="Merchant Perk Vouchers"
            desc="Redeem real discounts at partner cafés, tea houses, and boutique eateries."
          />
          <PerkRow
            icon={<Sparkles className="h-4 w-4 text-primary" />}
            title="Full AI Travel Concierge"
            desc="Multi-turn AI travel advice, customized itineraries, and photography spot tips."
          />
          <PerkRow
            icon={<Map className="h-4 w-4 text-gold" />}
            title="Secret Mystery Quests"
            desc="Solve clues at hidden spots, earn 2x Roam Coins, and collect rare golden stamps."
          />
        </div>

        {/* Pricing Selection */}
        <div className="mt-6 rounded-2xl border-2 border-gold/60 bg-gold/5 p-3 text-center">
          <div className="flex items-baseline justify-center gap-1">
            <span className="font-display text-3xl font-extrabold text-foreground">$4.99</span>
            <span className="text-xs text-muted-foreground">/ month</span>
          </div>
          <p className="mt-0.5 text-[11px] font-semibold text-gold">or $29/year (Save 50%)</p>
          <p className="text-[10px] text-muted-foreground">Cancel anytime with 1-click</p>
        </div>

        <button
          onClick={handleUpgrade}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3 text-sm font-bold text-gold-foreground shadow-float transition-transform active:scale-[0.98] hover:opacity-95"
        >
          <Zap className="h-4 w-4 fill-gold-foreground" />
          {isPro ? "You are already a VIP!" : "Activate VIP Pass Now"}
        </button>

        <p className="mt-3 text-center text-[10px] text-muted-foreground">
          Instant activation · 100% money-back satisfaction guarantee
        </p>
      </div>
    </div>
  );
}

function PerkRow({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-secondary/40 p-2.5 text-left">
      <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-card shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold leading-tight text-foreground">{title}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground leading-snug">{desc}</p>
      </div>
    </div>
  );
}
