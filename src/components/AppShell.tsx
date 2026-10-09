import { Link } from "@tanstack/react-router";
import { BookOpen, Compass, Map, Stamp } from "lucide-react";
import type { ReactNode } from "react";

const NAV = [
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/explore", label: "Explore", icon: Map },
  { to: "/passport", label: "Passport", icon: Stamp },
  { to: "/journal", label: "Journal", icon: BookOpen },
] as const;

export function AppShell({ children, nav = true }: { children: ReactNode; nav?: boolean }) {
  return (
    <div className="min-h-screen bg-muted md:py-8">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-background md:min-h-[860px] md:overflow-hidden md:rounded-[2.5rem] md:shadow-float">
        <main className={nav ? "flex-1 pb-28" : "flex-1"}>{children}</main>
        {nav && <BottomNav />}
      </div>
    </div>
  );
}

function BottomNav() {
  return (
    <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[440px] px-4 pb-4 md:absolute">
      <div className="flex items-center justify-around rounded-full bg-charcoal px-2 py-2 shadow-float">
        {NAV.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex flex-1 flex-col items-center gap-0.5 rounded-full py-2 text-[11px] font-semibold text-on-photo/60 transition-colors"
            activeProps={{ className: "!text-gold" }}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function ScreenHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <header className="flex items-end justify-between px-5 pb-4 pt-8">
      <div>
        {subtitle && <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{subtitle}</p>}
        <h1 className="mt-1 text-3xl font-semibold">{title}</h1>
      </div>
      {right}
    </header>
  );
}
