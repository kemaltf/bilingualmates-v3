"use client";
import { QuizRunner } from "@/components/shared/quiz/quiz-runner";
import type { QuizQuestion } from "@/lib/quiz/types";
import type { SubmitAttemptPayload } from "@/lib/quiz/types";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/utils";
import LottiePlayer from "@/components/shared/LottiePlayer";
import { paths } from "@/lib/learn/mock";
import type { LessonFinishMeta } from "@/lib/learn/types";
import FinishSummary from "@/components/learn/FinishSummary";
import MemoryCardStack, {
  type MemoryItem,
} from "@/components/learn/MemoryCardStack";
import { getBrandColorByIndex } from "@/lib/ui/design-tokens";
import ReadingRunner, {
  type ReadingSection,
} from "@/components/shared/reading/ReadingRunner";
import { Button } from "@/components/ui/button";

export default function Page() {
  const params = useParams<{ lessonId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const lessonId = params?.lessonId ?? "lesson-demo";
  const isSample = searchParams.get("sample") === "true";
  const pathId = searchParams.get("pathId");

  const [attempt, setAttempt] = React.useState<SubmitAttemptPayload | null>(
    null
  );
  const [memDone, setMemDone] = React.useState(false);
  const [readDone, setReadDone] = React.useState(false);
  const [entering, setEntering] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setEntering(false), 800);
    return () => clearTimeout(t);
  }, []);
  const questions: QuizQuestion[] = React.useMemo(() => {
    // 1. Try to find the node in mock paths
    let foundNode = null;
    for (const p of paths) {
      for (const s of p.sections) {
        for (const u of s.units) {
          for (const n of u.nodes) {
            if (n.id === lessonId) {
              foundNode = n;
              break;
            }
          }
        }
      }
    }

    if (foundNode?.quizQuestions && foundNode.quizQuestions.length > 0) {
      return isSample
        ? foundNode.quizQuestions.slice(0, 2)
        : foundNode.quizQuestions;
    }

    // 2. Fallback to sample questions if not found in mock
    const all: QuizQuestion[] = [
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
    return isSample ? all.slice(0, 2) : all;
  }, [lessonId, isSample]);

  const memoryItems: MemoryItem[] = React.useMemo(() => {
    return questions
      .filter(
        (q): q is Extract<QuizQuestion, { kind: "mcq" }> => q.kind === "mcq"
      )
      .map((q, idx) => ({
        id: q.id,
        title: "New Word",
        content: {
          kind: q.prompt.kind,
          text: q.prompt.text ?? "",
          pronunciationUrl: q.prompt.pronunciationUrl,
        },
        translation: q.options?.[0]?.content?.text ?? "Translation",
        phonetic: "/.../",
        examples: ["Example sentence 1", "Example sentence 2"],
        color: getBrandColorByIndex(idx),
      }));
  }, [questions]);

  const readingSections: ReadingSection[] = [
    {
      kind: "text",
      id: `${lessonId}-p1`,
      content: { kind: "text", text: "John pergi ke pasar setiap pagi." },
    },
    {
      kind: "text",
      id: `${lessonId}-p2`,
      content: {
        kind: "text",
        text: "Ia membeli buah dan sayur segar untuk sarapan.",
      },
    },
    {
      kind: "quiz",
      id: `${lessonId}-q1`,
      question: {
        kind: "cloze",
        id: `${lessonId}-cloze-1`,
        prompt: { kind: "text", text: "Lengkapi kalimat" },
        segments: [
          { kind: "text", text: "John pergi ke " },
          { kind: "blank", blank: { id: "b1", options: ["pasar", "sekolah"] } },
          { kind: "text", text: " setiap pagi." },
        ],
        correctAnswers: { b1: "pasar" },
      },
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

  const computeStats = (payload: SubmitAttemptPayload | null) => {
    const ansById = new Map(
      (payload?.answers ?? []).map((a) => [a.questionId, a.rawAnswer])
    );
    let correct = 0;
    for (const q of questions) {
      const raw = ansById.get(q.id);
      if (evaluate(q, raw)) correct++;
    }
    const total = questions.length;
    const accuracyPct = Math.round((correct / Math.max(1, total)) * 100);
    const xp = correct * 10;
    const ms = payload?.clientTotalTimeMs ?? 0;
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return { xp, accuracyPct, minutes, seconds };
  };

  function getFinishMeta(id: string): LessonFinishMeta | undefined {
    for (const p of paths) {
      for (const s of p.sections) {
        for (const u of s.units) {
          const n = u.nodes.find((x) => x.id === id);
          if (n?.finish) return n.finish;
        }
      }
    }
    return undefined;
  }

  if (attempt || memDone || readDone) {
    if (isSample) {
      return (
        <main
          className={cn(
            "w-full max-w-[860px] mx-auto px-6 py-4 flex flex-col items-center justify-center min-h-[60vh]"
          )}
        >
          <div className="text-6xl mb-6 animate-bounce">🔒</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2 text-center">
            Sample Completed!
          </h1>
          <p className="text-slate-600 text-center mb-8 max-w-md">
            You&apos;ve completed the sample lesson. Unlock the full course to
            continue your journey and access all lessons.
          </p>
          <div className="w-full max-w-sm space-y-4">
            <Button
              variant="green"
              size="lg"
              className="w-full text-lg h-12 font-bold shadow-lg shadow-green-200"
              onClick={() =>
                router.push(pathId ? `/path/${pathId}/checkout` : "/path")
              }
            >
              Unlock Full Course
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-slate-500"
              onClick={() => router.push(pathId ? `/path/${pathId}` : "/path")}
            >
              Back to Details
            </Button>
          </div>
        </main>
      );
    }

    const stats = computeStats(attempt);
    const finishMeta = getFinishMeta(lessonId);
    return (
      <main className={cn("w-full max-w-[860px] mx-auto px-0 py-4")}>
        <FinishSummary
          animationSrc={finishMeta?.animation?.src ?? "/medals.json"}
          fallbackSrc={finishMeta?.animation?.fallbackSrc ?? "/window.svg"}
          stats={stats}
          praise={finishMeta?.praise ?? "Awesome!"}
          onReview={() => {
            setAttempt(null);
            setMemDone(false);
            setReadDone(false);
          }}
          onContinue={() => (window.location.href = "/learn")}
        />
      </main>
    );
  }

  return (
    <main className="w-full max-w-[860px] mx-auto px-0">
      {entering ? (
        <div className="flex min-h-[80vh] items-center justify-center flex-col gap-2 text-center">
          <LottiePlayer src="/manrunning.json" className="h-52 w-52" />
          <div className="text-sm font-extrabold tracking-wider">
            LOADING....
          </div>
        </div>
      ) : lessonId.includes("vocab") ? (
        <MemoryCardStack
          items={memoryItems}
          footerVariant="sticky"
          onKnow={() => {}}
          onLearn={() => {}}
          onComplete={() => setMemDone(true)}
        />
      ) : lessonId.includes("reading") ? (
        <ReadingRunner
          sections={readingSections}
          onComplete={() => setReadDone(true)}
        />
      ) : (
        <QuizRunner
          questions={questions}
          lessonId={lessonId}
          attemptId={`attempt-${lessonId}`}
          onComplete={(payload) => setAttempt(payload)}
          footerVariant="sticky"
          onClose={() => router.push("/learn")}
        />
      )}
    </main>
  );
}
