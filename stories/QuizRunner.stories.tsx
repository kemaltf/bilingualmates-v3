import type { Meta, StoryObj } from "@storybook/react";
import { QuizRunner } from "@/components/shared/quiz/quiz-runner";
import type { QuizQuestion, SubmitAttemptPayload } from "@/lib/quiz/types";
import * as React from "react";
import { Button } from "@/components/ui/button";

const sampleQuestions: QuizQuestion[] = [
  {
    kind: "theory",
    id: "theory-intro",
    title: "Learning Tip: Genders",
    content: "<p>In German, nouns have genders. <b>Der</b> (masculine), <b>Die</b> (feminine), and <b>Das</b> (neutral). Keep an eye out for these!</p>",
    media: [{ kind: "image", url: "https://picsum.photos/800/400", caption: "Genders illustration" }],
    audioSamples: [
      { audioUrl: "https://www.w3schools.com/html/horse.mp3", text: "Der Tisch <span class='text-neutral-400'>(The table)</span>", translation: "Masculine" },
      { audioUrl: "https://www.w3schools.com/html/horse.mp3", text: "Die Katze <span class='text-neutral-400'>(The cat)</span>", translation: "Feminine" }
    ],
    buttonLabel: "Got it!"
  },
  {
    kind: "mcq",
    id: "q-mc-1",
    prompt: { kind: "text", text: "Choose the correct translation for 'Halo'" },
    textPrompt: "Pilih jawaban (tekan 1/2/3)",
    options: [
      { id: "a", content: { kind: "text", text: "Hello" } },
      { id: "b", content: { kind: "text", text: "Goodbye" } },
      { id: "c", content: { kind: "text", text: "Thanks" } },
    ],
    correctOptionId: "a",
  },
  {
    kind: "mcq",
    id: "q-mc-audio",
    prompt: { kind: "audio", url: "https://www.w3schools.com/html/horse.mp3" },
    textPrompt: "Dengar lalu pilih (tekan 1/2/3)",
    options: [
      {
        id: "a",
        content: {
          kind: "audio",
          url: "https://www.w3schools.com/html/horse.mp3",
        },
      },
      {
        id: "b",
        content: {
          kind: "audio",
          url: "https://www.w3schools.com/html/horse.mp3",
        },
      },
      {
        id: "c",
        content: {
          kind: "audio",
          url: "https://www.w3schools.com/html/horse.mp3",
        },
      },
    ],
    correctOptionId: "a",
  },
  {
    kind: "mcq",
    id: "q-mc-image",
    prompt: {
      kind: "image",
      url: "https://picsum.photos/800/400",
      alt: "Random",
    },
    textPrompt: "Pilih kata yang cocok (tekan 1/2/3)",
    options: [
      { id: "a", content: { kind: "text", text: "Landscape" } },
      { id: "b", content: { kind: "text", text: "Portrait" } },
      { id: "c", content: { kind: "text", text: "Abstract" } },
    ],
    correctOptionId: "a",
  },
  {
    kind: "mcq",
    id: "q-mc-video",
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
    kind: "short_text",
    id: "q-st-1",
    prompt: { kind: "text", text: "Type the greeting in English" },
    textPrompt: "One word",
    correctAnswers: ["hello", "hi"],
    placeholder: "Your answer",
  },
  {
    kind: "short_text",
    id: "q-st-audio",
    prompt: { kind: "audio", url: "https://www.w3schools.com/html/horse.mp3" },
    textPrompt: "Type what you heard",
    correctAnswers: ["hello"],
    placeholder: "Transcribe here",
  },
  {
    kind: "reorder",
    id: "q-re-1",
    prompt: { kind: "text", text: "Arrange the sentence" },
    tokens: ["Learning", "a", "new", "language", "is", "fun"],
    correctSentence: "Learning a new language is fun",
  },
  {
    kind: "cloze",
    id: "q-cl-1",
    prompt: { kind: "text", text: "Complete the sentence" },
    segments: [
      { kind: "text", text: "I " },
      {
        kind: "blank",
        blank: { id: "b1", options: ["am", "is", "are"], placeholder: "_____" },
      },
      { kind: "text", text: " " },
      {
        kind: "blank",
        blank: {
          id: "b2",
          options: ["learning", "learned", "learn"],
          placeholder: "_____",
        },
      },
      { kind: "text", text: " English." },
    ],
    correctAnswers: { b1: "am", b2: "learning" },
  },
  {
    kind: "cloze",
    id: "q-cl-image",
    prompt: {
      kind: "image",
      url: "https://picsum.photos/800/400",
      alt: "Scene",
    },
    segments: [
      { kind: "text", text: "This is " },
      {
        kind: "blank",
        blank: { id: "b1", options: ["a", "an"], placeholder: "_____" },
      },
      { kind: "text", text: " " },
      {
        kind: "blank",
        blank: {
          id: "b2",
          options: ["picture", "audio"],
          placeholder: "_____",
        },
      },
      { kind: "text", text: "." },
    ],
    correctAnswers: { b1: "a", b2: "picture" },
  },
  {
    kind: "match",
    id: "q-ma-1",
    prompt: { kind: "text", text: "Match the words to their translations" },
    textPrompt: "English ↔ Indonesian",
    leftItems: [
      { id: "l-hello", content: { kind: "text", text: "Hello" } },
      { id: "l-thanks", content: { kind: "text", text: "Thanks" } },
    ],
    rightItems: [
      { id: "r-halo", content: { kind: "text", text: "Halo" } },
      { id: "r-terima-kasih", content: { kind: "text", text: "Terima kasih" } },
    ],
    correctPairs: [
      { leftId: "l-hello", rightId: "r-halo" },
      { leftId: "l-thanks", rightId: "r-terima-kasih" },
    ],
  },
  {
    kind: "match",
    id: "q-ma-mixed",
    prompt: { kind: "text", text: "Match words to images" },
    leftItems: [
      { id: "l-cat", content: { kind: "text", text: "Cat" } },
      { id: "l-dog", content: { kind: "text", text: "Dog" } },
    ],
    rightItems: [
      {
        id: "r-cat",
        content: {
          kind: "image",
          url: "https://picsum.photos/seed/cat/200/120",
          alt: "Cat",
        },
      },
      {
        id: "r-dog",
        content: {
          kind: "image",
          url: "https://picsum.photos/seed/dog/200/120",
          alt: "Dog",
        },
      },
    ],
    correctPairs: [
      { leftId: "l-cat", rightId: "r-cat" },
      { leftId: "l-dog", rightId: "r-dog" },
    ],
  },
];

const meta: Meta<typeof QuizRunner> = {
  title: "Quiz/QuizRunner",
  component: QuizRunner,
  parameters: {
    layout: "centered",
    docs: {
      source: { state: "open" },
      description: {
        component:
          "High-level orchestrator that renders different question types and manages quiz flow via useQuizController.",
      },
    },
    controls: { expanded: true },
  },
  tags: ["autodocs"],
  args: {
    questions: sampleQuestions,
    attemptId: "attempt-story-1",
    lessonId: "lesson-story",
  },
  argTypes: {
    questions: { description: "Array of union-typed QuizQuestion" },
    onComplete: {
      action: "completed",
      description: "Called with final payload when finishing last question",
    },
    onSubmitAnswer: {
      action: "answer_submitted",
      description: "Called on each Check with per-answer payload",
    },
    attemptId: { control: "text" },
    lessonId: { control: "text" },
    userId: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof QuizRunner>;

export const Primary: Story = {
  args: {},
};

export const WithSubmitLogger: Story = {
  args: {
    onSubmitAnswer: (payload) => {
      alert("Per-Answer\n" + JSON.stringify(payload, null, 2));
    },
    onComplete: (payload: SubmitAttemptPayload) => {
      alert("Attempt\n" + JSON.stringify(payload, null, 2));
    },
  },
};

function FinishPreview(args: React.ComponentProps<typeof QuizRunner>) {
  const [attempt, setAttempt] = React.useState<SubmitAttemptPayload | null>(
    null
  );
  if (attempt) {
    return (
      <div className="w-full max-w-[840px] mx-auto space-y-4">
        <div className="rounded-2xl border-[3px] border-neutral-300 shadow-[0_3px_0_0_#a3a3a3] p-4">
          <div className="text-lg font-semibold mb-2">Final JSON</div>
          <pre className="bg-neutral-50 rounded-xl p-3 overflow-auto text-sm">
            {JSON.stringify(attempt, null, 2)}
          </pre>
        </div>
        <div className="flex justify-end">
          <Button
            variant="blue"
            size="md"
            onClick={() => setAttempt(null)}
            label="Restart"
          />
        </div>
      </div>
    );
  }
  return (
    <QuizRunner
      {...args}
      onComplete={(payload) => {
        setAttempt(payload);
      }}
    />
  );
}

export const FinishShowsJSON: Story = {
  render: (args) => <FinishPreview {...args} />,
};
