import type { Meta, StoryObj } from "@storybook/react";
import { FeedbackCard } from "@/components/shared/feedback-card";

const meta: Meta<typeof FeedbackCard> = {
  title: "Quiz/FeedbackCard",
  component: FeedbackCard,
  parameters: {
    layout: "centered",
    docs: {
      source: { state: "open" },
      description: {
        component:
          "Card untuk menampilkan feedback jawaban (benar/salah/info) dengan opsi media.",
      },
    },
    controls: { expanded: true },
  },
  tags: ["autodocs"],
  args: {
    status: "info",
    title: "Explanation",
    message: "Jawaban yang diharapkan: Hello",
    explanation: "'Hello' adalah sapaan umum dalam bahasa Inggris.",
  },
  argTypes: {
    status: { control: "radio", options: ["correct", "incorrect", "info"] },
    title: { control: "text" },
    message: { control: "text" },
    explanation: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof FeedbackCard>;

export const Info: Story = {};

export const Correct: Story = {
  args: {
    status: "correct",
    title: "Jawaban benar",
    message: "Good job!",
    explanation:
      "'Halo' adalah terjemahan yang tepat untuk 'Hello' dalam konteks ini.",
  },
};

export const Incorrect: Story = {
  args: {
    status: "incorrect",
    title: "Jawaban kurang tepat",
    message: "Coba lagi",
    explanation:
      "'Goodbye' bukan terjemahan dari 'Hello'. Jawaban yang benar adalah 'Halo'.",
  },
};

export const WithAudioMedia: Story = {
  args: {
    status: "info",
    title: "Pronunciation",
    message: "Dengarkan pengucapan kata",
    media: { kind: "audio", url: "https://www.w3schools.com/html/horse.mp3" },
  },
};
