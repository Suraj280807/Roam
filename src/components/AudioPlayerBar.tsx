import { Headphones, Pause, Play, Square, Volume2, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { getPlace } from "@/lib/places";
import { audioTourEngine } from "@/lib/audio";

export function AudioPlayerBar() {
  const { activeAudioPlaceId, isAudioPlaying, stopAudioTour } = useStore();

  if (!activeAudioPlaceId) return null;

  const place = getPlace(activeAudioPlaceId);

  const togglePlayback = () => {
    if (isAudioPlaying) {
      audioTourEngine.pause();
    } else {
      audioTourEngine.resume();
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-20 z-40 mx-auto w-full max-w-[420px] px-4 animate-slide-up">
      <div className="flex items-center gap-3 rounded-2xl border border-gold/40 bg-card/95 p-3 shadow-float backdrop-blur-md">
        {place && (
          <img
            src={place.image}
            alt=""
            className="h-10 w-10 rounded-xl object-cover ring-2 ring-gold/40"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="flex h-2 w-2 rounded-full bg-gold animate-ping" />
            <p className="text-[10px] font-bold uppercase tracking-wider text-gold">
              Audio Tour Playing
            </p>
          </div>
          <p className="truncate text-xs font-bold text-foreground">
            {place ? place.name : "Landmark Story"}
          </p>
          {/* Animated sound wave bars */}
          <div className="mt-1 flex items-center gap-0.5">
            {[40, 70, 90, 60, 80, 45, 95, 30].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-primary transition-all duration-300"
                style={{
                  height: isAudioPlaying ? `${(h / 100) * 12}px` : "3px",
                  animation: isAudioPlaying
                    ? `pulse 0.8s ease-in-out infinite alternate ${i * 0.1}s`
                    : "none",
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={togglePlayback}
            className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform active:scale-95"
            aria-label={isAudioPlaying ? "Pause audio" : "Play audio"}
          >
            {isAudioPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 fill-current ml-0.5" />
            )}
          </button>
          <button
            onClick={stopAudioTour}
            className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-muted-foreground hover:text-foreground"
            aria-label="Stop audio"
          >
            <Square className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
