import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Compass, Send } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { demoAnswer, GENERIC_QUESTIONS, getPlace } from "@/lib/places";

export const Route = createFileRoute("/guide/$id")({
  loader: ({ params }) => {
    const p = getPlace(params.id);
    if (!p) throw notFound();
    return { id: p.id, name: p.name };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `Ask about ${loaderData.name} — Roam Guide` },
          { name: "description", content: `Chat with Roam's travel guide about ${loaderData.name}.` },
          { property: "og:title", content: `Ask about ${loaderData.name} — Roam Guide` },
          { property: "og:description", content: `Stories and tips about ${loaderData.name}.` },
        ]
      : [{ title: "Guide unavailable — Roam" }, { name: "robots", content: "noindex" }],
  }),
  component: Guide,
});

interface Msg { role: "user" | "guide"; text: string }

function Guide() {
  const { id } = Route.useLoaderData();
  const place = getPlace(id)!;
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "guide", text: `Olá! I'm your Roam guide. Ask me anything about ${place.name} — its history, the best time to visit, or something surprising.` },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const ask = (q: string) => {
    const text = q.trim();
    if (!text || typing) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "guide", text: demoAnswer(place, text) }]);
      setTyping(false);
      inputRef.current?.focus();
    }, 900);
  };

  const suggestions = [...Object.keys(place.qa), ...GENERIC_QUESTIONS];

  return (
    <AppShell nav={false}>
      <div className="flex h-screen flex-col md:h-[860px]">
        <header className="flex items-center gap-3 border-b bg-card px-4 py-3">
          <Link to="/place/$id" params={{ id }} aria-label="Back" className="grid h-9 w-9 place-items-center rounded-full bg-secondary"><ArrowLeft className="h-4 w-4" /></Link>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald text-gold"><Compass className="h-5 w-5" /></span>
          <div className="min-w-0 flex-1">
            <p className="font-display font-semibold">Roam Guide</p>
            <p className="truncate text-xs text-muted-foreground">{place.name} · demo answers</p>
          </div>
          <img src={place.image} alt="" className="h-10 w-10 rounded-xl object-cover" />
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
          {msgs.map((m, i) => (
            <div key={i} className={`flex animate-rise ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <p className={`max-w-[82%] text-sm leading-relaxed ${m.role === "user" ? "rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-primary-foreground" : "text-foreground"}`}>{m.text}</p>
            </div>
          ))}
          {typing && (
            <div className="flex gap-1 py-2" aria-label="Guide is typing">
              {[0, 1, 2].map((d) => <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: `${d * 0.15}s` }} />)}
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t bg-card px-4 pb-5 pt-3">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-3">
            {suggestions.map((s) => (
              <button key={s} onClick={() => ask(s)} disabled={typing} className="shrink-0 rounded-full border border-primary/30 bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground disabled:opacity-50">{s}</button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="flex items-center gap-2 rounded-full bg-muted py-1.5 pl-4 pr-1.5">
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Ask about ${place.name}…`} aria-label="Your question" className="flex-1 bg-transparent text-sm outline-none" />
            <button type="submit" disabled={!input.trim() || typing} aria-label="Send" className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-40"><Send className="h-4 w-4" /></button>
          </form>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">Prototype guide: answers are curated demo responses, not live AI.</p>
        </div>
      </div>
    </AppShell>
  );
}
