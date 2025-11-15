import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ShortTextQuestionCard } from "@/components/mcq/short-text-question-card";

const meta: Meta<typeof ShortTextQuestionCard> = {
  title: "Quiz/ShortTextQuestionCard",
  component: ShortTextQuestionCard,
  parameters: {
    layout: "centered",
    docs: {
      source: { state: "open" },
      description: {
        component:
          "Short text question card with mixed-media prompt and a single-line text input answer.",
      },
    },
    controls: { expanded: true },
  },
  tags: ["autodocs"],
  args: {
    question: {
      id: "st-basic",
      prompt: { kind: "text", text: "Type the translation for 'Hello'" },
      textPrompt: "Answer in English",
      placeholder: "Type your answer…",
    },
    value: "",
    status: "idle",
    questionClassName: "max-w-[720px]",
  },
  argTypes: {
    question: { description: "Short text question with media prompt" },
    value: { control: "text", description: "Current input value" },
    onChange: { action: "change", description: "Change handler for input" },
    onSubmit: { action: "submit", description: "Submit handler" },
    placeholder: { control: "text", description: "Input placeholder override" },
    status: {
      control: { type: "radio" },
      options: ["idle", "correct", "incorrect"],
      description: "Visual status of input",
    },
    questionClassName: { control: "text" },
    inputClassName: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ShortTextQuestionCard>;

function ControlledShortText(args: React.ComponentProps<typeof ShortTextQuestionCard>) {
  const [val, setVal] = React.useState(args.value ?? "");
  return (
    <ShortTextQuestionCard
      {...args}
      value={val}
      onChange={(v) => setVal(v)}
    />
  );
}

export const Basic: Story = {
  render: (args) => <ControlledShortText {...args} />,
};

export const AudioPrompt: Story = {
  args: {
    question: {
      id: "st-audio",
      prompt: {
        kind: "audio",
        url: "https://www.w3schools.com/html/horse.mp3",
      },
      textPrompt: "Type the word you heard",
      placeholder: "Your answer",
    },
    questionClassName: "max-w-[420px] mx-auto",
  },
};

export const ImagePrompt: Story = {
  args: {
    question: {
      id: "st-image",
      prompt: {
        kind: "image",
        url: "https://picsum.photos/seed/prompt-st/800/600",
        alt: "Prompt",
      },
      textPrompt: "Describe the image in one word",
    },
    questionClassName: "max-w-[720px] mx-auto",
  },
};

export const VideoPrompt: Story = {
  args: {
    question: {
      id: "st-video",
      prompt: {
        kind: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      textPrompt: "Watch the video and type the greeting",
    },
  },
};

export const StatusCorrect: Story = {
  args: {
    status: "correct",
    value: "Hello",
  },
};

export const StatusIncorrect: Story = {
  args: {
    status: "incorrect",
    value: "Goodbye",
  },
};
