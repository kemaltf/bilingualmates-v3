"use client";
import { QuizRunner } from "@/components/shared/quiz/quiz-runner";
import type { QuizQuestion } from "@/lib/quiz/types";
import type { SubmitAttemptPayload } from "@/lib/quiz/types";
import { useParams } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/utils";
import LottiePlayer from "@/components/shared/LottiePlayer";
import { paths } from "@/lib/learn/mock";
import type { LessonFinishMeta } from "@/lib/learn/types";
import FinishSummary from "@/components/learn/FinishSummary";

export default function Page() {
  const params = useParams<{ lessonId: string }>();
  const lessonId = params?.lessonId ?? "lesson-demo";
  const [attempt, setAttempt] = React.useState<SubmitAttemptPayload | null>(
    null
  );
  const [entering, setEntering] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setEntering(false), 800);
    return () => clearTimeout(t);
  }, []);
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
      prompt: {
        kind: "text",
        text: "Choose the correct translation for 'Halo'",
      },
      textPrompt: "Pilih jawaban (tekan 1/2/3)",
      options: [
        { id: "a", content: { kind: "text", text: "Hello" } },
        { id: "b", content: { kind: "text", text: "Goodbye" } },
        { id: "c", content: { kind: "text", text: "Thanks" } },
      ],
      correctOptionId: "a",
    },
  ];

  const evaluate = (q: QuizQuestion, val: unknown): boolean => {
    if (q.kind === "mcq") return val === q.correctOptionId;
    if (q.kind === "short_text") {
      const v = typeof val === "string" ? vNormalize(val) : "";
      const keys = (q.correctAnswers ?? []).map(vNormalize);
      return keys.includes(v);
    }
    if (q.kind === "reorder") {
      const ans = Array.isArray(val) ? (val as string[]).join(" ") : "";
      const normalizedAns = vNormalize(ans);
      const correct = q.correctSentence
        ? vNormalize(q.correctSentence)
        : vNormalize((q.correctOrder ?? []).join(" "));
      return normalizedAns === correct;
    }
    if (q.kind === "cloze") {
      const user = (val as Record<string, string>) || {};
      const correct = q.correctAnswers || {};
      const keys = Object.keys(correct);
      if (keys.length === 0) return false;
      for (const k of keys) {
        if ((user[k] ?? "") !== correct[k]) return false;
      }
      return true;
    }
    if (q.kind === "match") {
      const pairs = Array.isArray(val)
        ? (val as { leftId: string; rightId: string }[])
        : [];
      const correct = q.correctPairs ?? [];
      if (correct.length === 0) return false;
      if (pairs.length !== correct.length) return false;
      const set = new Set(correct.map((p) => `${p.leftId}:${p.rightId}`));
      for (const p of pairs) {
        if (!set.has(`${p.leftId}:${p.rightId}`)) return false;
      }
      return true;
    }
    return false;
  };

  function vNormalize(s: string) {
    return s.trim().toLowerCase().replace(/\s+/g, " ");
  }

  const computeStats = (payload: SubmitAttemptPayload) => {
    const ansById = new Map(
      payload.answers.map((a) => [a.questionId, a.rawAnswer])
    );
    let correct = 0;
    for (const q of sample) {
      const raw = ansById.get(q.id);
      if (evaluate(q, raw)) correct++;
    }
    const total = sample.length;
    const accuracyPct = Math.round((correct / Math.max(1, total)) * 100);
    const xp = correct * 10;
    const ms = payload.clientTotalTimeMs ?? 0;
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return { xp, accuracyPct, minutes, seconds };
  };

  function getFinishMeta(id: string): LessonFinishMeta | undefined {
    for (const p of paths) {
      for (const u of p.units) {
        const n = u.nodes.find((x) => x.id === id);
        if (n?.finish) return n.finish;
      }
    }
    return undefined;
  }

  if (attempt) {
    const stats = computeStats(attempt);
    const finishMeta = getFinishMeta(lessonId);
    return (
      <main className={cn("w-full max-w-[860px] mx-auto px-3 py-4")}>
        <FinishSummary
          animationSrc={finishMeta?.animation?.src ?? "/medals.json"}
          fallbackSrc={finishMeta?.animation?.fallbackSrc ?? "/window.svg"}
          stats={stats}
          praise={finishMeta?.praise ?? "Awesome!"}
          onReview={() => setAttempt(null)}
          onContinue={() => (window.location.href = "/learn")}
        />
      </main>
    );
  }

  return (
    <main className="w-full max-w-[860px] mx-auto px-3 py-4">
      {entering ? (
        <div className="flex min-h-[80vh] items-center justify-center flex-col gap-2 text-center">
          <LottiePlayer src="/manrunning.json" className="h-52 w-52" />
          <div className="text-sm font-extrabold tracking-wider">
            LOADING....
          </div>
        </div>
      ) : (
        <QuizRunner
          questions={sample}
          lessonId={lessonId}
          attemptId={`attempt-${lessonId}`}
          onComplete={(payload) => setAttempt(payload)}
          footerVariant="sticky"
        />
      )}
    </main>
  );
}
