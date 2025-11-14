import type { Meta, StoryObj } from "@storybook/react";
import { MediaRenderer } from "@/components/mcq/media-renderer";

type Args = {
  role: "question" | "option";
  kind: "text" | "audio" | "image" | "video";
  text?: string;
  url?: string;
  alt?: string;
  transcript?: string;
}

function Demo(args: Args) {
  const { role, kind, text, url, alt, transcript } = args;
  return (
    <MediaRenderer
      role={role}
      content={{ kind, text, url, alt, transcript }}
    />
  );
}

const meta: Meta<typeof Demo> = {
  title: "Quiz/MediaRenderer",
  component: Demo,
  args: {
    role: "question",
    kind: "text",
    text: "Listen and choose the correct translation.",
    url: "",
    alt: "",
    transcript: "",
  },
  argTypes: {
    role: { control: "radio", options: ["question", "option"] },
    kind: { control: "radio", options: ["text", "audio", "image", "video"] },
  },
  parameters: {
    docs: { source: { state: "open" } },
  },
};

export default meta;
type Story = StoryObj<typeof Demo>;

export const TextQuestion: Story = { args: { role: "question", kind: "text", text: "Listen and choose the correct translation." } };

export const TextOption: Story = { args: { role: "option", kind: "text", text: "Hello" } };

export const Image: Story = { args: { role: "question", kind: "image", url: "https://picsum.photos/seed/duo/800/600", alt: "Sample" } };

export const Audio: Story = { args: { role: "question", kind: "audio", url: "https://www.w3schools.com/html/horse.mp3" } };

export const Video: Story = { args: { role: "question", kind: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" } };

export const OptionImage: Story = { args: { role: "option", kind: "image", url: "https://picsum.photos/seed/duo-option/400/300", alt: "Option" } };

export const OptionAudio: Story = { args: { role: "option", kind: "audio", url: "https://www.w3schools.com/html/horse.mp3" } };

export const OptionVideo: Story = { args: { role: "option", kind: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" } };
