import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MCQuestionCard } from "@/components/mcq/mc-question-card";
import type { MCQuestion } from "@/lib/quiz/types";

type Args = { showOptionLabel: boolean };

function QuestionDemo({ showOptionLabel }: Args) {
  const [selected, setSelected] = useState<string | null>(null);
  const question: MCQuestion = {
    id: "q1",
    prompt: {
      kind: "text",
      text: "Choose the correct translation for 'Hello'",
    },
    options: [
      { id: "a", content: { kind: "text", text: "Hello" } },
      { id: "b", content: { kind: "text", text: "Goodbye" } },
      { id: "c", content: { kind: "text", text: "Thanks" } },
      { id: "d", content: { kind: "text", text: "Please" } },
    ],
    correctOptionId: "a",
  };

  return (
    <div className="max-w-[720px]">
      <MCQuestionCard
        question={question}
        selectedOptionId={selected}
        onSelectOption={setSelected}
        showOptionLabel={showOptionLabel}
      />
      <p className="text-xs text-muted-foreground mt-2">
        Selected: {selected ?? "none"}
      </p>
    </div>
  );
}

const meta: Meta<typeof QuestionDemo> = {
  title: "Quiz/MCQuestionCard",
  component: QuestionDemo,
  parameters: {
    docs: { source: { state: "open" } },
    controls: { expanded: true },
  },
  args: {
    showOptionLabel: true,
  },
  argTypes: {
    showOptionLabel: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof QuestionDemo>;

export const Basic: Story = {};

function AudioQuestionTextOptionsDemo({ showOptionLabel = true }: Partial<Args>) {
  const [selected, setSelected] = useState<string | null>(null);
  const question: MCQuestion = {
    id: "q-audio",
    prompt: { kind: "audio", url: "https://www.w3schools.com/html/horse.mp3" },
    options: [
      { id: "a", content: { kind: "text", text: "Hello" } },
      { id: "b", content: { kind: "text", text: "Goodbye" } },
    ],
    correctOptionId: "a",
  };
  return (
    <div className="max-w-[720px]">
      <MCQuestionCard
        question={question}
        selectedOptionId={selected}
        onSelectOption={setSelected}
        showOptionLabel={showOptionLabel}
      />
    </div>
  );
}

export const AudioQuestionTextOptions: StoryObj<typeof AudioQuestionTextOptionsDemo> = {
  render: (args) => <AudioQuestionTextOptionsDemo {...args} />,
  parameters: { docs: { source: { state: "open" } } },
};

function TextQuestionImageOptionsDemo({ showOptionLabel = true }: Partial<Args>) {
  const [selected, setSelected] = useState<string | null>(null);
  const question: MCQuestion = {
    id: "q-image",
    prompt: { kind: "text", text: "Choose the image for 'Dog'" },
    options: [
      {
        id: "a",
        content: {
          kind: "image",
          url: "https://picsum.photos/seed/dog/400/300",
          alt: "Dog",
        },
      },
      {
        id: "b",
        content: {
          kind: "image",
          url: "https://picsum.photos/seed/cat/400/300",
          alt: "Cat",
        },
      },
    ],
    correctOptionId: "a",
  };
  return (
    <div className="max-w-[720px]">
      <MCQuestionCard
        question={question}
        selectedOptionId={selected}
        onSelectOption={setSelected}
        showOptionLabel={showOptionLabel}
      />
    </div>
  );
}

export const TextQuestionImageOptions: StoryObj<typeof TextQuestionImageOptionsDemo> = {
  render: (args) => <TextQuestionImageOptionsDemo {...args} />,
  parameters: { docs: { source: { state: "open" } } },
};

function VideoQuestionTextOptionsDemo({ showOptionLabel = true }: Partial<Args>) {
  const [selected, setSelected] = useState<string | null>(null);
  const question: MCQuestion = {
    id: "q-video",
    prompt: {
      kind: "video",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    options: [
      { id: "a", content: { kind: "text", text: "Hello" } },
      { id: "b", content: { kind: "text", text: "Goodbye" } },
    ],
    correctOptionId: "a",
  };
  return (
    <div className="max-w-[720px]">
      <MCQuestionCard
        question={question}
        selectedOptionId={selected}
        onSelectOption={setSelected}
        showOptionLabel={showOptionLabel}
      />
    </div>
  );
}

export const VideoQuestionTextOptions: StoryObj<typeof VideoQuestionTextOptionsDemo> = {
  render: (args) => <VideoQuestionTextOptionsDemo {...args} />,
  parameters: { docs: { source: { state: "open" } } },
};
