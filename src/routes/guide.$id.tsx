import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Camera,
  Clock,
  Compass,
  Headphones,
  RotateCcw,
  Send,
  Sparkles,
  Utensils,
  Volume2,
  VolumeX,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { getPlace, type Place } from "@/lib/places";
import { useStore } from "@/lib/store";
import { audioTourEngine } from "@/lib/audio";
import { toast } from "sonner";

export const Route = createFileRoute("/guide/$id")({
  loader: ({ params }) => {
    const p = getPlace(params.id);
    if (!p) throw notFound();
    return { id: p.id, name: p.name };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `Ask about ${loaderData.name} — Roam AI Concierge` },
          {
            name: "description",
            content: `Chat with Roam's intelligent travel guide about ${loaderData.name}.`,
          },
          { property: "og:title", content: `Ask about ${loaderData.name} — Roam Guide` },
          {
            property: "og:description",
            content: `Stories, photo spots and tips for ${loaderData.name}.`,
          },
        ]
      : [{ title: "Guide unavailable — Roam" }, { name: "robots", content: "noindex" }],
  }),
  component: Guide,
});

interface Msg {
  id: string;
  role: "user" | "guide";
  text: string;
  category?: "history" | "photo" | "food" | "tips" | "itinerary" | undefined;
}

function generateIntelligentResponse(
  place: Place,
  query: string,
): { text: string; category?: Msg["category"] } {
  const q = query.toLowerCase().trim();

  // Check direct exact Q&A first
  if (place.qa[query]) {
    return { text: place.qa[query], category: "tips" };
  }
  for (const [key, val] of Object.entries(place.qa)) {
    if (q.includes(key.toLowerCase()) || key.toLowerCase().includes(q)) {
      return { text: val, category: "tips" };
    }
  }

  // Photography & Instagram
  if (
    q.includes("photo") ||
    q.includes("picture") ||
    q.includes("camera") ||
    q.includes("instagram") ||
    q.includes("view")
  ) {
    const photoTips =
      place.category === "Viewpoints"
        ? `For stunning photos at ${place.name}, arrive 40 minutes before golden hour sunset. Use a wide-angle lens to capture the horizon and backlight your portraits against the glowing sky. Watch for the famous viewpoint pines!`
        : `Top photo spot for ${place.name}: Shoot from the outer courtyard angles to capture the grand architecture. Early mornings (8:30–10:00 AM) provide soft natural light and zero photo bombers!`;
    return { text: photoTips, category: "photo" };
  }

  // Timing, Crowds & Hours
  if (
    q.includes("time") ||
    q.includes("when") ||
    q.includes("crowd") ||
    q.includes("hour") ||
    q.includes("rush") ||
    q.includes("busy")
  ) {
    return {
      text: `Best time to visit ${place.name}: Plan for ${place.duration}. Weekday mornings or late afternoons (after 4:30 PM) offer the pleasantest weather and easiest parking/entry. Weekends tend to see energetic crowds.`,
      category: "tips",
    };
  }

  // Food & Dining
  if (
    q.includes("food") ||
    q.includes("eat") ||
    q.includes("cafe") ||
    q.includes("restaurant") ||
    q.includes("snack") ||
    q.includes("drink") ||
    q.includes("coffee") ||
    q.includes("tea")
  ) {
    if (place.area.includes("Kolhapur") || place.area.includes("Atigre")) {
      return {
        text: `Near ${place.name}, head over to Café Amigo's for signature burgers and loaded peri-peri fries, or visit The Tea Toast Co. for steaming authentic Kulhad Chai and cheese chilli toasties!`,
        category: "food",
      };
    }
    return {
      text: `Around ${place.name}, do not miss the freshly baked custard pastéis dusted with cinnamon, paired with a robust bica espresso at the heritage taverns nearby!`,
      category: "food",
    };
  }

  // History & Origin
  if (
    q.includes("history") ||
    q.includes("story") ||
    q.includes("who built") ||
    q.includes("origin") ||
    q.includes("old") ||
    q.includes("ancient") ||
    q.includes("past")
  ) {
    return {
      text: `${place.history} Culturally, ${place.culture}`,
      category: "history",
    };
  }

  // Itinerary & What to do
  if (
    q.includes("itinerary") ||
    q.includes("plan") ||
    q.includes("route") ||
    q.includes("how to spend") ||
    q.includes("what to do")
  ) {
    return {
      text: `Here is a curated 1-hour walk at ${place.name}:\n1. First 15 min: Marvel at the central façade and take your landmark wide shots.\n2. Next 30 min: Explore the inner grounds, read the historic markers, and discover the hidden angles.\n3. Final 15 min: Grab a refreshing drink at the nearby café patio and stamp your digital Roam passport!`,
      category: "itinerary",
    };
  }

  // Tickets, Cost & Dress Code
  if (
    q.includes("ticket") ||
    q.includes("price") ||
    q.includes("cost") ||
    q.includes("fee") ||
    q.includes("free") ||
    q.includes("dress") ||
    q.includes("wear")
  ) {
    return {
      text: `Visitor tip for ${place.name}: Most exterior viewpoints and campus grounds are free to explore. Wear comfortable walking sneakers as there are scenic cobblestone paths and steps. If entering temple sanctuaries, modest clothing covering shoulders and knees is recommended.`,
      category: "tips",
    };
  }

  // Facts & Surprises
  if (
    q.includes("fact") ||
    q.includes("secret") ||
    q.includes("interesting") ||
    q.includes("surpris")
  ) {
    const randomFact = place.facts[Math.floor(Math.random() * place.facts.length)] || place.tagline;
    return {
      text: `Surprising fact about ${place.name}: ${randomFact}`,
      category: "tips",
    };
  }

  // Fallback enriched conversational answer
  return {
    text: `About ${place.name}: ${place.tagline}\n\n${place.history}\n\nFeel free to ask me for photography spots, nearby food joints, or a custom 1-hour walking route!`,
    category: "tips",
  };
}

const SMART_PROMPTS = [
  { label: "📸 Best photo angle?", query: "Where is the best photo spot?" },
  { label: "⏰ When to visit?", query: "What is the best time to visit to avoid crowds?" },
  { label: "🍔 Nearby food spots?", query: "What should I eat nearby?" },
  { label: "🗺️ 1-Hour Itinerary", query: "Can you give me a 1-hour walking itinerary?" },
  { label: "🎟️ Tickets & Dress code", query: "Are there tickets and what should I wear?" },
];

function Guide() {
  const { id } = Route.useLoaderData();
  const place = getPlace(id)!;
  const { isPro } = useStore();

  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: "intro",
      role: "guide",
      text: `Namaste & Olá! I'm your Roam AI travel concierge. I have complete knowledge on ${place.name}. Ask me about secret history, photography angles, the best time to visit, or where to grab delicious bites nearby!`,
      category: "tips",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSpeak = (msgId: string, text: string) => {
    if (speakingMsgId === msgId) {
      audioTourEngine.stop();
      setSpeakingMsgId(null);
    } else {
      audioTourEngine.stop();
      setSpeakingMsgId(msgId);
      audioTourEngine.speak(text, place.name);
      audioTourEngine.registerListener((playing) => {
        if (!playing) setSpeakingMsgId(null);
      });
    }
  };

  const ask = (q: string) => {
    const text = q.trim();
    if (!text || typing) return;

    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text };
    setMsgs((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = generateIntelligentResponse(place, text);
      const guideMsg: Msg = {
        id: crypto.randomUUID(),
        role: "guide",
        text: response.text,
        category: response.category,
      };
      setMsgs((m) => [...m, guideMsg]);
      setTyping(false);
    }, 600);
  };

  const clearChat = () => {
    setMsgs([
      {
        id: "intro-reset",
        role: "guide",
        text: `Chat reset! What else would you like to discover about ${place.name}?`,
      },
    ]);
    audioTourEngine.stop();
    setSpeakingMsgId(null);
  };

  return (
    <AppShell nav={false}>
      <div className="flex h-screen flex-col bg-background md:h-[860px]">
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-border/80 bg-card/95 px-4 py-3 backdrop-blur-md">
          <Link
            to="/place/$id"
            params={{ id }}
            aria-label="Back"
            className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground hover:bg-secondary/80"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald text-gold shadow-sm">
            <Compass className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="font-display font-bold leading-tight">Roam AI Concierge</p>
              <span className="rounded-full bg-emerald/15 px-1.5 py-0.2 text-[9px] font-bold text-emerald">
                LIVE
              </span>
            </div>
            <p className="truncate text-xs text-muted-foreground">
              {place.name} · Local Intelligence
            </p>
          </div>
          <button
            onClick={clearChat}
            className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-muted-foreground hover:text-foreground"
            title="Reset conversation"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </header>

        {/* Messages Stream */}
        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
          {msgs.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col animate-rise ${
                m.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-sm ${
                  m.role === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground font-medium"
                    : "rounded-bl-sm bg-card border border-border/80 text-foreground"
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>

                {m.role === "guide" && (
                  <div className="mt-2.5 flex items-center justify-between border-t border-border/40 pt-2 text-[11px] text-muted-foreground">
                    <button
                      onClick={() => handleSpeak(m.id, m.text)}
                      className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 font-semibold text-primary hover:bg-secondary/80"
                    >
                      {speakingMsgId === m.id ? (
                        <>
                          <VolumeX className="h-3 w-3 text-destructive" /> Stop
                        </>
                      ) : (
                        <>
                          <Volume2 className="h-3 w-3" /> Listen
                        </>
                      )}
                    </button>
                    <span className="text-[10px] opacity-75">AI Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex items-center gap-1.5 py-2 pl-2" aria-label="Guide is thinking">
              <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0.3s]" />
              <span className="ml-1 text-xs text-muted-foreground">Concierge is writing…</span>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input & Quick Chips */}
        <div className="border-t border-border/80 bg-card/95 px-4 pb-5 pt-3 backdrop-blur-md">
          <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-2.5">
            {SMART_PROMPTS.map((p) => (
              <button
                key={p.label}
                onClick={() => ask(p.query)}
                disabled={typing}
                className="shrink-0 rounded-full border border-border bg-secondary/80 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary disabled:opacity-50"
              >
                {p.label}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2 rounded-full bg-muted border border-border/60 py-1.5 pl-4 pr-1.5 shadow-inner"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask anything about ${place.name}…`}
              aria-label="Your question"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Send"
              className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform active:scale-95 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            Roam Smart Concierge · Tap "Listen" to hear answers narrated aloud.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
