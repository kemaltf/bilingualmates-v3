import type { Meta, StoryObj } from "@storybook/react";
import MemoryCardStack, {
  type MemoryItem,
} from "@/components/learn/MemoryCardStack";

const sampleItems: MemoryItem[] = [
  {
    id: "mem-hello",
    title: "Hello",
    content: {
      kind: "text",
      text: "Hello",
      pronunciationUrl: "/audio/hello.mp3",
    },
    phonetic: "ˈhɛləʊ",
    translation: "Halo",
    examples: ["Hello everyone", "Hello there"],
  },
  {
    id: "mem-thanks",
    title: "Thanks",
    content: {
      kind: "text",
      text: "Thanks",
      pronunciationUrl: "/audio/thanks.mp3",
    },
    phonetic: "θæŋks",
    translation: "Terima kasih",
    examples: ["Thanks a lot", "Thanks for coming"],
  },
];

const meta = {
  title: "Learn/MemoryCardStack",
  component: MemoryCardStack,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MemoryCardStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InlineFooter: Story = {
  args: {
    items: sampleItems,
    footerVariant: "inline",
    onKnow: (id: string) => console.log("know", id),
    onLearn: (id: string) => console.log("learn", id),
  },
};

export const StickyFooter: Story = {
  args: {
    items: sampleItems,
    footerVariant: "sticky",
    onKnow: (id: string) => console.log("know", id),
    onLearn: (id: string) => console.log("learn", id),
  },
};
