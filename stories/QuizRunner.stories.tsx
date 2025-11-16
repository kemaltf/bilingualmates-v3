import type { Meta, StoryObj } from "@storybook/react"
import { QuizRunner } from "@/components/shared/quiz/quiz-runner"
import type { QuizQuestion } from "@/lib/quiz/types"

const sampleQuestions: QuizQuestion[] = [
  {
    kind: "mcq",
    id: "q-mc-1",
    prompt: { kind: "text", text: "Choose the correct translation for 'Halo'" },
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
    textPrompt: "Listen and choose the word",
    options: [
      { id: "a", content: { kind: "audio", url: "https://www.w3schools.com/html/horse.mp3" } },
      { id: "b", content: { kind: "audio", url: "https://www.w3schools.com/html/horse.mp3" } },
      { id: "c", content: { kind: "audio", url: "https://www.w3schools.com/html/horse.mp3" } },
    ],
    correctOptionId: "a",
  },
  {
    kind: "mcq",
    id: "q-mc-image",
    prompt: { kind: "image", url: "https://picsum.photos/800/400", alt: "Random" },
    textPrompt: "Choose the word that matches the picture",
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
    prompt: { kind: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    textPrompt: "Select the correct description",
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
      { kind: "blank", blank: { id: "b1", options: ["am", "is", "are"], placeholder: "_____" } },
      { kind: "text", text: " " },
      { kind: "blank", blank: { id: "b2", options: ["learning", "learned", "learn"], placeholder: "_____" } },
      { kind: "text", text: " English." },
    ],
    correctAnswers: { b1: "am", b2: "learning" },
  },
  {
    kind: "cloze",
    id: "q-cl-image",
    prompt: { kind: "image", url: "https://picsum.photos/800/400", alt: "Scene" },
    segments: [
      { kind: "text", text: "This is " },
      { kind: "blank", blank: { id: "b1", options: ["a", "an"], placeholder: "_____" } },
      { kind: "text", text: " " },
      { kind: "blank", blank: { id: "b2", options: ["picture", "audio"], placeholder: "_____" } },
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
      { id: "r-cat", content: { kind: "image", url: "https://picsum.photos/seed/cat/200/120", alt: "Cat" } },
      { id: "r-dog", content: { kind: "image", url: "https://picsum.photos/seed/dog/200/120", alt: "Dog" } },
    ],
    correctPairs: [
      { leftId: "l-cat", rightId: "r-cat" },
      { leftId: "l-dog", rightId: "r-dog" },
    ],
  },
]

const meta: Meta<typeof QuizRunner> = {
  title: "Quiz/QuizRunner",
  component: QuizRunner,
  parameters: {
    layout: "centered",
    docs: {
      source: { state: "open" },
      description: {
        component: "High-level orchestrator that renders different question types and manages quiz flow via useQuizController.",
      },
    },
    controls: { expanded: true },
  },
  tags: ["autodocs"],
  args: {
    questions: sampleQuestions,
  },
  argTypes: {
    questions: { description: "Array of union-typed QuizQuestion" },
    onComplete: { action: "completed", description: "Called with final score when finishing last question" },
  },
}

export default meta
type Story = StoryObj<typeof QuizRunner>

export const Primary: Story = {}