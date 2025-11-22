"use client";
import { QuizRunner } from "@/components/shared/quiz/quiz-runner";
import type { QuizQuestion } from "@/lib/quiz/types";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ lessonId: string }>();
  const lessonId = params?.lessonId ?? "lesson-demo";
  const sample: QuizQuestion[] = [
    {
      kind: "mcq",
      id: `${lessonId}-video-mcq`,
      prompt: {
        kind: "video",
        url: "https://www.youtube.com/watch?v=0lStodgghOc",
        startTimeSec: 5,
        endTimeSec: 15,
        transcript: "Alasan Terbesar 90% Anak Muda Gagal Usaha",
      },
      textPrompt: "Pilih deskripsi (tekan 1/2/3)",
      options: [
        { id: "a", content: { kind: "text", text: "A short video clip" } },
        { id: "b", content: { kind: "text", text: "An audio sample" } },
        { id: "c", content: { kind: "text", text: "A static image" } },
      ],
      correctOptionId: "a",
    },
    {
      kind: "mcq",
      id: `${lessonId}-text-mcq`,
      prompt: { kind: "text", text: "Choose the correct translation for 'Halo'" },
      textPrompt: "Pilih jawaban (tekan 1/2/3)",
      options: [
        { id: "a", content: { kind: "text", text: "Hello" } },
        { id: "b", content: { kind: "text", text: "Goodbye" } },
        { id: "c", content: { kind: "text", text: "Thanks" } },
      ],
      correctOptionId: "a",
    },
  ];

  return (
    <main className="w-full max-w-[860px] mx-auto px-3 py-4">
      <QuizRunner questions={sample} lessonId={lessonId} attemptId={`attempt-${lessonId}`} />
    </main>
  );
}