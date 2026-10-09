import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass } from "lucide-react";
import welcome from "@/assets/welcome.jpg";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Screen Capture Magic" },
      { name: "description", content: "Easily capture and share your screen with Screen Capture Magic." },
      { property: "og:title", content: "Screen Capture Magic" },
      { property: "og:description", content: "The magical way to capture your screen, share recordings, and annotate instantly." },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  return (
    <AppShell nav={false}>
      <div className="relative flex min-h-screen flex-col justify-end overflow-hidden md:min-h-[860px]">
        <img src={welcome} alt="Traveler overlooking Lisbon at sunrise" width={864} height={1536} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-photo-fade" />
        <div className="absolute left-6 top-10 flex items-center gap-2 text-on-photo">
          <span className="font-display text-2xl font-semibold">Screen Capture Magic</span>
        </div>
        <div className="relative z-10 animate-rise p-6 pb-12 text-on-photo">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Screen Recording Tool</p>
          <h1 className="mt-3 text-5xl font-semibold leading-[1.05]">Capture your<br />screen easily.</h1>
          <p className="mt-4 max-w-xs text-sm opacity-85">Record, annotate, and share your screen in seconds. Magical simplicity for your daily workflow.</p>
          <Link to="/discover" className="mt-8 flex items-center justify-between rounded-full bg-gold py-2 pl-6 pr-2 font-bold text-gold-foreground shadow-float transition-transform active:scale-[0.98]">
            Start Capturing
            <span className="grid h-11 w-11 place-items-center rounded-full bg-charcoal text-gold"><ArrowRight className="h-5 w-5" /></span>
          </Link>
          <p className="mt-4 text-center text-[11px] opacity-60">Prototype · demo city Lisbon · no sign-up needed</p>
        </div>
      </div>
    </AppShell>
  );
}
