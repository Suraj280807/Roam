/**
 * Audio Storyteller Narration Engine using Browser Speech Synthesis API.
 * Provides voice-guided walking tours for Roam landmarks.
 */

class AudioTourEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private onStateChange: ((isPlaying: boolean) => void) | null = null;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public registerListener(callback: (isPlaying: boolean) => void) {
    this.onStateChange = callback;
  }

  public speak(text: string, title?: string): boolean {
    if (!this.synth) {
      console.warn("Speech synthesis not supported on this browser.");
      return false;
    }

    this.stop();

    const cleanText = text.replace(/[*_#]/g, "").trim();
    const narration = title ? `Welcome to ${title}. ${cleanText}` : cleanText;

    const utterance = new SpeechSynthesisUtterance(narration);
    utterance.rate = 0.95; // Slightly slower, comfortable storytelling cadence
    utterance.pitch = 1.0;

    // Pick a natural, expressive voice if available
    const voices = this.synth.getVoices();
    const naturalVoice =
      voices.find(
        (v) =>
          (v.name.includes("Natural") ||
            v.name.includes("Google") ||
            v.name.includes("Samantha") ||
            v.name.includes("Daniel") ||
            v.name.includes("Karen")) &&
          v.lang.startsWith("en"),
      ) || voices.find((v) => v.lang.startsWith("en"));

    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => {
      this.onStateChange?.(true);
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      this.onStateChange?.(false);
    };

    utterance.onerror = (e) => {
      console.warn("Speech error:", e);
      this.currentUtterance = null;
      this.onStateChange?.(false);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
    return true;
  }

  public pause() {
    if (this.synth?.speaking && !this.synth.paused) {
      this.synth.pause();
      this.onStateChange?.(false);
    }
  }

  public resume() {
    if (this.synth?.paused) {
      this.synth.resume();
      this.onStateChange?.(true);
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
      this.onStateChange?.(false);
    }
  }

  public isSpeaking(): boolean {
    return !!this.synth?.speaking && !this.synth?.paused;
  }
}

export const audioTourEngine = new AudioTourEngine();
