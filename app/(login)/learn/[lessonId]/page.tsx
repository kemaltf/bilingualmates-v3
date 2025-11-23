"use client";
import { QuizRunner } from "@/components/shared/quiz/quiz-runner";
import type { QuizQuestion } from "@/lib/quiz/types";
import type { SubmitAttemptPayload } from "@/lib/quiz/types";
import { useParams } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LottiePlayer from "@/components/shared/LottiePlayer";
import { paths } from "@/lib/learn/mock";
import type { LessonFinishMeta } from "@/lib/learn/types";

export default function Page() {
  const params = useParams<{ lessonId: string }>();
  const lessonId = params?.lessonId ?? "lesson-demo";
  const [attempt, setAttempt] = React.useState<SubmitAttemptPayload | null>(
    null
  );
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
      <main className={cn("w-full max-w-[860px] mx-auto px-3 py-4 space-y-4")}>
        <div className="rounded-2xl overflow-hidden bg-neutral-200">
          <LottiePlayer
            src={finishMeta?.animation?.src ?? "/lottie/celebration.json"}
            className="h-40"
          />
        </div>
        <div className="text-2xl font-extrabold">
          {finishMeta?.praise ?? "Awesome!"}
        </div>
        <div className="space-y-2">
          <div className="text-sm font-bold">Statistics</div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-3 rounded-xl border">
              <div className="text-xs text-neutral-600">XP gained</div>
              <div className="text-lg font-extrabold">{stats.xp}</div>
            </div>
            <div className="p-3 rounded-xl border">
              <div className="text-xs text-neutral-600">Accuracy</div>
              <div className="text-lg font-extrabold">{stats.accuracyPct}%</div>
            </div>
            <div className="p-3 rounded-xl border">
              <div className="text-xs text-neutral-600">Time spent</div>
              <div className="text-lg font-extrabold">
                {stats.minutes}m {stats.seconds}s
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="blue"
            size="md"
            label="Review lesson"
            onClick={() => setAttempt(null)}
          />
          <Button
            variant="green"
            size="md"
            label="Continue"
            onClick={() => (window.location.href = "/learn")}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="w-full max-w-[860px] mx-auto px-3 py-4">
      <QuizRunner
        questions={sample}
        lessonId={lessonId}
        attemptId={`attempt-${lessonId}`}
        onComplete={(payload) => setAttempt(payload)}
      />
    </main>
  );
}
