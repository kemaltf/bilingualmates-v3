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
  subtitles?: { start: number; end: number; text: string }[];
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
    subtitles,
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
        subtitles,
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
    subtitles: { control: "object" },
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

export const TextOnly: Story = {
  args: {
    kind: "text",
  },
};

export const ImageContent: Story = {
  args: {
    kind: "image",
    url: "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?q=80&w=2070&auto=format&fit=crop",
    alt: "A cute puppy",
  },
};

export const AudioContent: Story = {
  args: {
    role: "question",
    kind: "audio",
    url: "https://www.w3schools.com/html/horse.mp3",
    text: "Horse sound",
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

export const AudioWithTranslation: Story = {
  args: {
    role: "question",
    kind: "audio",
    url: "https://www.w3schools.com/html/horse.mp3",
    text: "What sound is this?",
    translation: "Suara apa ini?",
  },
};

export const VideoContent: Story = {
  args: {
    kind: "video",
    url: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    startTimeSec: 10,
    endTimeSec: 20,
  },
};

export const VideoWithSubtitles: Story = {
  args: {
    kind: "video",
    url: "https://www.youtube.com/watch?v=LXb3EKWsInQ", // 4K Video
    startTimeSec: 0,
    endTimeSec: 0,
    subtitles: [
      { start: 0, end: 5, text: "This is a stunning view of nature." },
      { start: 5, end: 10, text: "Look at the vibrant colors." },
      {
        start: 10,
        end: 15,
        text: "Press and hold this text to pause the video!",
      },
      { start: 15, end: 20, text: "Release to resume playing." },
    ],
  },
};
