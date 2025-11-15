import type { Meta, StoryObj } from "@storybook/react";
import { MCQuestionCard } from "@/components/mcq/mc-question-card";

const meta: Meta<typeof MCQuestionCard> = {
  title: "Quiz/MCQuestionCard",
  component: MCQuestionCard,
  parameters: {
    layout: "centered",
    docs: {
      source: { state: "open" },
      description: {
        component:
          "A specialized audio-based question component for listening exercises. All options are audio-based with optional text descriptions, similar to Duolingo's listening comprehension exercises.",
      },
    },
    controls: { expanded: true },
  },
  tags: ["autodocs"],
  args: {
    showOptionLabel: true,
    questionClassName: "max-w-[720px]",
    question: {
      id: "q1",
      prompt: { kind: "text", text: "Choose the correct translation for 'Hello'" },
      options: [
        { id: "a", content: { kind: "text", text: "Hello" } },
        { id: "b", content: { kind: "text", text: "Goodbye" } },
        { id: "c", content: { kind: "text", text: "Thanks" } },
        { id: "d", content: { kind: "text", text: "Please" } },
      ],
      correctOptionId: "a",
    },
    selectedOptionId: null,
  },
  argTypes: {
    question: {
      description: "The question object containing prompt and options",
    },
    selectedOptionId: {
      control: "text",
      description: "The selected option ID",
    },
    onSelectOption: {
      action: "answered",
      description: "Callback when an option is selected",
    },
    showOptionLabel: { control: "boolean", description: "Show or hide option label (A/B/C)" },
    questionClassName: { control: "text", description: "Tailwind classes to style the question area" },
  },
};

export default meta;
type Story = StoryObj<typeof MCQuestionCard>;

export const Basic: Story = {};

export const AudioQuestionTextOptions: Story = {
  args: {
    question: {
      id: "q-audio",
      prompt: { kind: "audio", url: "https://www.w3schools.com/html/horse.mp3" },
      options: [
        { id: "a", content: { kind: "text", text: "Hello" } },
        { id: "b", content: { kind: "text", text: "Goodbye" } },
      ],
      correctOptionId: "a",
    },
    questionClassName: "max-w-[420px] mx-auto",
  },
};

export const TextQuestionImageOptions: Story = {
  args: {
    question: {
      id: "q-image",
      prompt: { kind: "text", text: "Choose the image for 'Dog'" },
      options: [
        { id: "a", content: { kind: "image", url: "https://picsum.photos/seed/dog/400/300", alt: "Dog" } },
        { id: "b", content: { kind: "image", url: "https://picsum.photos/seed/cat/400/300", alt: "Cat" } },
      ],
      correctOptionId: "a",
    },
  },
};

export const VideoQuestionTextOptions: Story = {
  args: {
    question: {
      id: "q-video",
      prompt: { kind: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
      options: [
        { id: "a", content: { kind: "text", text: "Hello" } },
        { id: "b", content: { kind: "text", text: "Goodbye" } },
      ],
      correctOptionId: "a",
    },
  },
};

export const ImageQuestionTextOptions: Story = {
  args: {
    question: {
      id: "q-image-prompt",
      prompt: { kind: "image", url: "https://picsum.photos/seed/prompt/800/600", alt: "Prompt image" },
      options: [
        { id: "a", content: { kind: "text", text: "Hello" } },
        { id: "b", content: { kind: "text", text: "Goodbye" } },
      ],
      correctOptionId: "a",
    },
    questionClassName: "max-w-[720px] mx-auto",
  },
};
