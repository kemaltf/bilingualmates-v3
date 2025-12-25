import { useCallback, useEffect, useRef } from "react";

const SOUNDS = {
  correct: ["/sfx/CORRECT 2_01.mp3", "/sfx/CORRECT 5_01.mp3"],
  pop: "/sfx/POP.mp3",
  incorrect: "/sfx/INCORRECT 8_01.mp3",
  transition: "/sfx/TRANSITION_01.mp3",
  celebration: "/sfx/SUCCESS 5_01.mp3",
};

export function useQuizSound() {
  const audioCache = useRef<Record<string, HTMLAudioElement>>({});

  // Preload sounds on mount
  useEffect(() => {
    const preload = (src: string) => {
      if (!audioCache.current[src]) {
        const audio = new Audio(src);
        audio.preload = "auto";
        audioCache.current[src] = audio;
      }
    };

    SOUNDS.correct.forEach(preload);
    preload(SOUNDS.pop);
    preload(SOUNDS.incorrect);
    preload(SOUNDS.transition);
    preload(SOUNDS.celebration);
  }, []);

  const playSound = useCallback((src: string) => {
    let audio = audioCache.current[src];

    // Fallback if not cached
    if (!audio) {
      audio = new Audio(src);
      audioCache.current[src] = audio;
    }

    // Clone audio to allow overlapping sounds and avoid mutating the cached object
    // This resolves the eslint immutability error
    const audioEl = audio.cloneNode() as HTMLAudioElement;
    audioEl.play().catch((err) => {
      console.warn("Audio playback failed:", err);
    });
  }, []);

  const playCorrect = useCallback(() => {
    const src =
      SOUNDS.correct[Math.floor(Math.random() * SOUNDS.correct.length)];
    playSound(src);
  }, [playSound]);

  const playPop = useCallback(() => {
    playSound(SOUNDS.pop);
  }, [playSound]);

  const playIncorrect = useCallback(() => {
    playSound(SOUNDS.incorrect);
  }, [playSound]);

  const playTransition = useCallback(() => {
    playSound(SOUNDS.transition);
  }, [playSound]);

  const playCelebration = useCallback(() => {
    playSound(SOUNDS.celebration);
  }, [playSound]);

  return {
    playCorrect,
    playPop,
    playIncorrect,
    playTransition,
    playCelebration,
  };
}
