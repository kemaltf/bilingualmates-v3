import { useCallback } from "react";

const SOUNDS = {
  correct: ["/sfx/CORRECT 2_01.mp3", "/sfx/CORRECT 5_01.mp3"],
  incorrect: "/sfx/INCORRECT 8_01.mp3",
  transition: "/sfx/TRANSITION_01.mp3",
  celebration: "/sfx/SUCCESS 5_01.mp3",
};

export function useQuizSound() {
  const playSound = useCallback((src: string) => {
    const audio = new Audio(src);
    audio.play().catch((err) => {
      console.warn("Audio playback failed:", err);
    });
  }, []);

  const playCorrect = useCallback(() => {
    const src =
      SOUNDS.correct[Math.floor(Math.random() * SOUNDS.correct.length)];
    playSound(src);
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
    playIncorrect,
    playTransition,
    playCelebration,
  };
}
