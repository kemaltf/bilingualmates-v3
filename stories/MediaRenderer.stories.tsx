import { MediaRenderer } from "@/components/shared/media-renderer";
import type { Meta, StoryObj } from "@storybook/react";

type Args = {
  role: "question" | "option";
  kind: "text" | "audio" | "image" | "video";
  text?: string;
  translation?: string;
  url?: string;
  alt?: string;
  transcript?: string;
  startTimeSec?: number;
  endTimeSec?: number;
  autoPlay?: boolean;
  className?: string;
  onStartLoop?: () => void;
  onEndLoop?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onReady?: () => void;
  onError?: () => void;
};

function Demo(args: Args) {
  const {
    role,
    kind,
    text,
    translation,
    url,
    alt,
    transcript,
    startTimeSec,
    endTimeSec,
    autoPlay,
    className,
    onStartLoop,
    onEndLoop,
    onPlay,
    onPause,
    onReady,
    onError,
  } = args;
  return (
    <MediaRenderer
      role={role}
      className={className}
      autoPlay={autoPlay}
      onStartLoop={onStartLoop}
      onEndLoop={onEndLoop}
      onPlay={onPlay}
      onPause={onPause}
      onReady={onReady}
      onError={onError}
      content={{
        kind,
        text,
        translation,
        url,
        alt,
        transcript,
        startTimeSec,
        endTimeSec,
      }}
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
    autoPlay: false,
    className: "",
  },
  argTypes: {
    role: { control: "radio", options: ["question", "option"] },
    kind: { control: "radio", options: ["text", "audio", "image", "video"] },
    startTimeSec: { control: "number" },
    endTimeSec: { control: "number" },
    autoPlay: { control: "boolean" },
    className: { control: "text" },
    onStartLoop: { action: "startLoop" },
    onEndLoop: { action: "endLoop" },
    onPlay: { action: "play" },
    onPause: { action: "pause" },
    onReady: { action: "ready" },
    onError: { action: "error" },
  },
  parameters: {
    docs: { source: { state: "open" } },
  },
};

export default meta;
type Story = StoryObj<typeof Demo>;

export const TextQuestion: Story = {
  args: {
    role: "question",
    kind: "text",
    text: "Listen and choose the correct translation.",
  },
};

export const TextOption: Story = {
  args: { role: "option", kind: "text", text: "Hello" },
};

export const Image: Story = {
  args: {
    role: "question",
    kind: "image",
    url: "https://picsum.photos/seed/duo/800/600",
    alt: "Sample",
  },
};

export const Audio: Story = {
  args: {
    role: "question",
    kind: "audio",
    url: "https://www.w3schools.com/html/horse.mp3",
  },
};

export const AudioWithText: Story = {
  args: {
    role: "question",
    kind: "audio",
    url: "https://www.w3schools.com/html/horse.mp3",
    text: "Ich treffe meine Freunde <span class='text-sky-500 font-bold'>jede</span> Woche.",
    translation: "I meet my friends every week.",
  },
};

export const AutoPlayAudio: Story = {
  args: {
    role: "question",
    kind: "audio",
    url: "https://www.w3schools.com/html/horse.mp3",
    autoPlay: true,
  },
};

export const Video: Story = {
  args: {
    role: "question",
    kind: "video",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
};

export const SegmentLoop: Story = {
  args: {
    role: "question",
    kind: "video",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    transcript: "Looping a short segment.",
    startTimeSec: 2,
    endTimeSec: 5,
  },
};

export const OptionImage: Story = {
  args: {
    role: "option",
    kind: "image",
    url: "https://picsum.photos/seed/duo-option/400/300",
    alt: "Option",
  },
};

export const OptionAudio: Story = {
  args: {
    role: "option",
    kind: "audio",
    url: "https://www.w3schools.com/html/horse.mp3",
  },
};

export const OptionVideo: Story = {
  args: {
    role: "option",
    kind: "video",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
};
