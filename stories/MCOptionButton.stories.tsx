import { MCOptionButton } from "@/components/shared/quiz/mcq/mc-option-button";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

type Args = {
  contentKind: "text" | "audio" | "image" | "video";
  text?: string;
  url?: string;
  alt?: string;
  selected?: boolean;
  disabled?: boolean;
  label?: string;
  showLabel?: boolean;
};

function OptionButtonDemo(args: Args) {
  const [selected, setSelected] = useState(!!args.selected);
  const option = {
    id: "a",
    content: {
      kind: args.contentKind,
      text: args.text,
      url: args.url,
      alt: args.alt,
    },
  } as const;
  return (
    <div className="w-[480px]">
      <MCOptionButton
        option={option}
        isSelected={selected}
        disabled={args.disabled}
        label={args.label}
        showLabel={args.showLabel}
        onSelect={() => setSelected((s) => !s)}
      />
    </div>
  );
}

const meta: Meta<typeof OptionButtonDemo> = {
  title: "Quiz/MCOptionButton",
  component: OptionButtonDemo,
  args: {
    contentKind: "text",
    text: "Hello",
    url: "",
    alt: "",
    selected: false,
    disabled: false,
    label: "A",
    showLabel: true,
  },
  argTypes: {
    contentKind: {
      control: "radio",
      options: ["text", "audio", "image", "video"],
    },
  },
  parameters: {
    docs: { source: { state: "open" } },
  },
};

export default meta;
type Story = StoryObj<typeof OptionButtonDemo>;

export const Text: Story = { args: { contentKind: "text", text: "Hello" } };
export const Image: Story = {
  args: {
    contentKind: "image",
    url: "https://picsum.photos/seed/opt/400/300",
    alt: "Option image",
  },
};
export const Audio: Story = {
  args: {
    contentKind: "audio",
    url: "https://www.w3schools.com/html/horse.mp3",
  },
};
export const Video: Story = {
  args: {
    contentKind: "video",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
};
