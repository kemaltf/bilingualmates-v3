import type { Meta, StoryObj } from "@storybook/react";
import { TextAudioPlayer } from "@/components/shared/quiz/text-audio-player";

const meta: Meta<typeof TextAudioPlayer> = {
  title: "Quiz/TextAudioPlayer",
  component: TextAudioPlayer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    audioUrl: "https://www.w3schools.com/html/horse.mp3",
    text: "This is a sample text",
    translation: "Ini adalah contoh teks",
  },
};

export default meta;
type Story = StoryObj<typeof TextAudioPlayer>;

export const Default: Story = {};

export const WithRichText: Story = {
  args: {
    text: (
      <span>
        Ich treffe meine Freunde <span className="text-sky-500 font-bold">jede</span> Woche.
      </span>
    ),
    translation: "I meet my friends every week.",
  },
};

export const WithoutTranslation: Story = {
  args: {
    translation: undefined,
  },
};
