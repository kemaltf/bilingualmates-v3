"use client";

import * as React from "react";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalDescription,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useQuizSound } from "@/hooks/use-quiz-sound";

interface QuizExitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function QuizExitModal({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
}: QuizExitModalProps) {
  const sounds = useQuizSound();

  const handleConfirm = () => {
    sounds.playFailed();
    onConfirm();
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-[90vw] sm:max-w-sm w-full p-6 flex flex-col items-center text-center gap-6 border-none rounded-3xl z-[200] bg-white dark:bg-neutral-900">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 mt-2">
          <Image
            src="/mascot-sad.svg"
            alt="Sad Mascot"
            fill
            className="object-contain"
          />
        </div>

        <div className="space-y-2 w-full">
          <ModalTitle className="text-xl sm:text-2xl font-black text-neutral-700 dark:text-neutral-200">
            Wait, don&apos;t go!
          </ModalTitle>
          <ModalDescription className="text-base sm:text-lg font-bold text-neutral-500 dark:text-neutral-400">
            😱 You’re losing your progress!!!
          </ModalDescription>
        </div>

        <div className="w-full space-y-3">
          <Button
            variant="blue"
            size="lg"
            className="w-full uppercase tracking-widest font-bold border-b-4 active:border-b-0 text-sm sm:text-base"
            onClick={onCancel}
            label="KEEP LEARNING"
          />
          <Button
            variant="text"
            size="lg"
            className="w-full uppercase tracking-widest font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-sm sm:text-base"
            onClick={handleConfirm}
            label="END SESSION"
          />
        </div>
      </ModalContent>
    </Modal>
  );
}
