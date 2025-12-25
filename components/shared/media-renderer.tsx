"use client";
import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Volume2, Play, Pause, RotateCcw } from "lucide-react";
// removed shadcn Select; using native select for speed control
import type { MediaContent } from "@/lib/quiz/types";
import { MarkdownText } from "./markdown-text";

export interface MediaRendererProps {
  /** The media content to display (text, image, audio, video). */
  content: MediaContent;
  /** Context where this component is used: "question" (main content) or "option" (choice). */
  role?: "question" | "option";
  /** Additional CSS classes. */
  className?: string;
  /** Whether to automatically play the media on mount. Defaults to false. */
  autoPlay?: boolean;
  /** Callback when video loop starts. */
  onStartLoop?: () => void;
  /** Callback when video loop ends. */
  onEndLoop?: () => void;
  /** Callback when media starts playing. */
  onPlay?: () => void;
  /** Callback when media pauses. */
  onPause?: () => void;
  /** Callback when media is ready. */
  onReady?: () => void;
  /** Callback when media encounters an error. */
  onError?: () => void;
}

export function MediaRenderer({
  content,
  role = "question",
  className,
  autoPlay,
  onStartLoop,
  onEndLoop,
  onPlay,
  onPause,
  onReady,
  onError,
}: MediaRendererProps) {
  const isQuestion = role === "question";
  const textClasses = cn(isQuestion ? "text-xl font-semibold" : "text-base");

  switch (content.kind) {
    case "text":
      return (
        <div className={cn(textClasses, className)}>
          <MarkdownText text={content.text ?? ""} />
        </div>
      );
    case "image":
      return (
        <div className={cn("rounded-xl overflow-hidden", className)}>
          {content.url && (
            <Image
              src={content.url}
              alt={content.alt ?? ""}
              width={800}
              height={600}
              className="h-auto w-full object-contain"
              unoptimized
            />
          )}
        </div>
      );
    case "audio":
      return (
        <div
          className={cn(
            "w-full",
            !content.text && isQuestion ? "flex justify-center" : "",
            className
          )}
        >
          <AudioPlayer
            url={content.url}
            autoPlay={autoPlay}
            text={
              content.text ? <MarkdownText text={content.text} /> : undefined
            }
            translation={content.translation}
          />
        </div>
      );
    case "video":
      return (
        <div className={cn("rounded-xl overflow-hidden", className)}>
          <VideoPlayer
            content={content}
            onStartLoop={onStartLoop}
            onEndLoop={onEndLoop}
            onPlay={onPlay}
            onPause={onPause}
            onReady={onReady}
            onError={onError}
          />
        </div>
      );
    default:
      return null;
  }
}

function AudioPlayer({
  url,
  className,
  autoPlay,
  text,
  translation,
}: {
  url?: string;
  className?: string;
  autoPlay?: boolean;
  text?: React.ReactNode;
  translation?: React.ReactNode;
}) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [barCount, setBarCount] = React.useState(18);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (text) return; // Skip resize observer if in text mode

    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width ?? 0;
      const step = 7;
      const count = Math.max(8, Math.floor(w / step));
      setBarCount(count);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [text]);

  const bars = React.useMemo(() => {
    return Array.from({ length: barCount }, (_, i) => {
      const t = i / barCount;
      const v = 8 + Math.round(22 * Math.abs(Math.sin(t * Math.PI)));
      return v;
    });
  }, [barCount]);

  const toggle = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  React.useEffect(() => {
    if (!audioRef.current || !autoPlay) return;
    audioRef.current.play();
    setPlaying(true);
  }, [autoPlay]);

  const onTimeUpdate = () => {
    const a = audioRef.current;
    if (!a || !a.duration || Number.isNaN(a.duration)) return;
    setProgress(a.currentTime / a.duration);
  };

  const activeBars = Math.max(
    0,
    Math.min(bars.length, Math.round(progress * bars.length))
  );

  if (text && translation) {
    return (
      <button
        type="button"
        className={cn(
          "flex items-start gap-4 p-3 w-full text-left rounded-xl transition-all duration-200",
          "hover:bg-neutral-100 dark:hover:bg-neutral-800",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
          playing && "bg-sky-50 dark:bg-sky-900/20",
          className
        )}
        onClick={toggle}
      >
        <div className="flex-shrink-0 mt-0.5">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm",
              playing
                ? "bg-sky-500 text-white"
                : "bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-400"
            )}
          >
            <Volume2 className={cn("size-5", playing && "animate-pulse")} />
          </div>
        </div>
        <div className="flex-1 space-y-1">
          <div className="text-lg font-medium text-neutral-900 dark:text-neutral-100 leading-snug">
            {text}
          </div>
          {translation && (
            <div className="text-base text-neutral-500 dark:text-neutral-400 font-normal">
              {translation}
            </div>
          )}
        </div>
        <audio
          ref={audioRef}
          src={url}
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
        />
      </button>
    );
  }

  return (
    <div className={cn("flex items-center gap-3 w-full", className)}>
      <Button
        onClick={toggle}
        variant="primary"
        size="default"
        aria-pressed={playing}
        className="h-10 w-10 p-0 rounded-full flex items-center justify-center"
      >
        <Volume2 className="size-5" />
      </Button>
      <div
        ref={containerRef}
        className="flex-1 min-w-0 flex items-center gap-[3px] h-10"
      >
        {bars.map((h, i) => (
          <span
            key={i}
            className={cn(
              "w-1 rounded-full transition-colors",
              playing ? "animate-pulse" : "",
              i <= activeBars ? "bg-sky-500" : "bg-sky-300"
            )}
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
        }}
        onPause={() => setPlaying(false)}
      />
    </div>
  );
}

type YTPlayer = {
  playVideo?: () => void;
  pauseVideo?: () => void;
  seekTo?: (t: number, allowSeekAhead?: boolean) => void;
  getCurrentTime?: () => number;
  getDuration?: () => number;
  setPlaybackRate?: (rate: number) => void;
  destroy?: () => void;
};

type YTGlobal = {
  Player: new (el: HTMLElement, opts: unknown) => YTPlayer;
};

export function VideoPlayer({
  content,
  onStartLoop,
  onEndLoop,
  onPlay,
  onPause,
  onReady,
  onError,
}: {
  content: MediaContent;
  onStartLoop?: () => void;
  onEndLoop?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onReady?: () => void;
  onError?: () => void;
}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const playerRef = React.useRef<YTPlayer | null>(null);
  const htmlRef = React.useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [speed, setSpeed] = React.useState<string>("1");
  const [currentTime, setCurrentTime] = React.useState(0);
  const [wasPlayingBeforeHold, setWasPlayingBeforeHold] = React.useState(false);

  const start = Math.max(0, content.startTimeSec ?? 0);
  const end = content.endTimeSec ?? 0;
  const thumbnailUrl = content.thumbnailUrl;

  const parseYouTubeId = (url?: string) => {
    if (!url) return null;
    const m1 = url.match(/v=([a-zA-Z0-9_-]{11})/);
    if (m1) return m1[1];
    const m2 = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (m2) return m2[1];
    const m3 = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    if (m3) return m3[1];
    return null;
  };

  const videoId = parseYouTubeId(content.url);
  const onReadyRef = React.useRef(onReady);
  const onPlayRef = React.useRef(onPlay);
  const onPauseRef = React.useRef(onPause);
  const onErrorRef = React.useRef(onError);

  React.useEffect(() => {
    onReadyRef.current = onReady;
    onPlayRef.current = onPlay;
    onPauseRef.current = onPause;
    onErrorRef.current = onError;
  });

  React.useEffect(() => {
    if (!containerRef.current || !videoId) return;
    const initialize = () => {
      const YT = (window as unknown as { YT?: YTGlobal }).YT;
      if (!YT || !YT.Player) return;
      playerRef.current = new YT.Player(containerRef.current!, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
          fs: 0,
          disablekb: 1,
          iv_load_policy: 3,
          playsinline: 1,
          start: Math.floor(start),
          enablejsapi: 1,
        },
        host: "https://www.youtube-nocookie.com",
        events: {
          onReady: () => {
            setReady(true);
            playerRef.current?.seekTo?.(start, true);
            onReadyRef.current?.();
          },
          onStateChange: (e: { data: number }) => {
            if (e.data === 1) setPlaying(true);
            if (e.data === 2) setPlaying(false);
            if (e.data === 0) {
              const p = playerRef.current;
              if (p) {
                p.seekTo?.(start, true);
                p.playVideo?.();
              }
            }
            if (e.data === 1) onPlayRef.current?.();
            if (e.data === 2) onPauseRef.current?.();
          },
          onError: () => {
            onErrorRef.current?.();
          },
        },
      });
    };
    if (!(window as unknown as { YT?: YTGlobal }).YT) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.async = true;
      s.onload = () => initialize();
      document.body.appendChild(s);
      (
        window as unknown as { onYouTubeIframeAPIReady?: () => void }
      ).onYouTubeIframeAPIReady = () => initialize();
    } else {
      initialize();
    }
    return () => {
      if (playerRef.current && playerRef.current.destroy)
        playerRef.current.destroy();
    };
  }, [videoId, start]);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      if (videoId) {
        const p = playerRef.current;
        if (p && ready) {
          const t = p.getCurrentTime?.() ?? 0;
          setCurrentTime(t);
          const segLen =
            end > start
              ? end - start
              : Math.max(0.1, (p.getDuration?.() ?? 0) - start);
          const clamped = Math.max(0, Math.min(1, (t - start) / segLen));
          setProgress(clamped);
          if (end > start && t >= end) {
            onEndLoop?.();
            p.seekTo?.(start, true);
            p.playVideo?.();
            onStartLoop?.();
          }
        }
      } else {
        const v = htmlRef.current;
        if (v && ready) {
          const t = v.currentTime ?? 0;
          setCurrentTime(t);
          const segLen =
            end > start
              ? end - start
              : Math.max(0.1, (v.duration || 0) - start);
          const clamped = Math.max(0, Math.min(1, (t - start) / segLen));
          setProgress(clamped);
          if (end > start && t >= end) {
            onEndLoop?.();
            v.currentTime = start;
            v.play().catch(() => {});
            onStartLoop?.();
          }
        }
      }
    }, 250);
    return () => {
      window.clearInterval(interval);
    };
  }, [ready, start, end, videoId, onEndLoop, onStartLoop]);

  const toggle = () => {
    if (videoId) {
      const p = playerRef.current;
      if (!p) return;
      if (playing) {
        p.pauseVideo?.();
        setPlaying(false);
      } else {
        if (end > start && (p.getCurrentTime?.() ?? 0) >= end)
          p.seekTo?.(start, true);
        p.playVideo?.();
        setPlaying(true);
      }
    } else {
      const v = htmlRef.current;
      if (!v) return;
      if (playing) {
        v.pause();
        setPlaying(false);
      } else {
        if (end > start && (v.currentTime ?? 0) >= end) v.currentTime = start;
        v.play().catch(() => {});
        setPlaying(true);
      }
    }
  };

  const replay = () => {
    if (videoId) {
      const p = playerRef.current;
      if (!p) return;
      p.seekTo?.(start, true);
      p.playVideo?.();
      setPlaying(true);
    } else {
      const v = htmlRef.current;
      if (!v) return;
      v.currentTime = start;
      v.play().catch(() => {});
      setPlaying(true);
    }
  };

  const onScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const ratio = x / rect.width;
    if (videoId) {
      const p = playerRef.current;
      if (!p) return;
      const baseLen =
        end > start
          ? end - start
          : Math.max(0.1, (p.getDuration?.() ?? 0) - start);
      const t = start + ratio * baseLen;
      p.seekTo?.(t, true);
    } else {
      const v = htmlRef.current;
      if (!v) return;
      const baseLen =
        end > start ? end - start : Math.max(0.1, (v.duration || 0) - start);
      const t = start + ratio * baseLen;
      v.currentTime = t;
    }
  };

  const changeSpeed = (val: string) => {
    setSpeed(val);
    const rate = parseFloat(val);
    if (videoId) {
      const p = playerRef.current;
      p?.setPlaybackRate?.(rate);
    } else {
      const v = htmlRef.current;
      if (v) v.playbackRate = rate;
    }
  };

  const activeSubtitle = content.subtitles?.find(
    (s) => currentTime >= s.start && currentTime <= s.end
  );

  const handleSubtitlePress = (e: React.PointerEvent) => {
    e.preventDefault();
    if (playing) {
      setWasPlayingBeforeHold(true);
      if (videoId) {
        playerRef.current?.pauseVideo?.();
      } else {
        htmlRef.current?.pause();
      }
      setPlaying(false);
    }
  };

  const handleSubtitleRelease = (e: React.PointerEvent) => {
    e.preventDefault();
    if (wasPlayingBeforeHold) {
      if (videoId) {
        playerRef.current?.playVideo?.();
      } else {
        htmlRef.current?.play().catch(() => {});
      }
      setPlaying(true);
      setWasPlayingBeforeHold(false);
    }
  };

  return (
    <div className="relative">
      <div
        className={cn(
          "relative overflow-hidden bg-black",
          videoId ? "aspect-video" : ""
        )}
      >
        {videoId ? (
          <div className="ytmb-holder absolute inset-0">
            <div ref={containerRef} className="absolute inset-0" />
          </div>
        ) : (
          <video
            ref={htmlRef}
            src={content.url}
            playsInline
            controls={false}
            className="w-full h-auto block"
            onLoadedMetadata={() => {
              setReady(true);
              if (htmlRef.current) {
                htmlRef.current.currentTime = start;
                onReady?.();
              }
            }}
            onPlay={() => {
              setPlaying(true);
              onPlay?.();
            }}
            onPause={() => {
              setPlaying(false);
              onPause?.();
            }}
            onError={() => onError?.()}
          />
        )}
        {!playing && !wasPlayingBeforeHold && (
          <div
            className="absolute inset-0 z-10 bg-black cursor-pointer"
            onClick={toggle}
          >
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt="Video thumbnail"
                fill
                className="object-cover opacity-80"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-black" />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm transition-transform hover:scale-110">
                <Play className="fill-white text-white size-8" />
              </div>
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20" />
        {content.transcript && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 max-w-[85%] rounded-xl bg-black/40 backdrop-blur-md px-4 py-2 text-white text-sm z-20 shadow-lg border border-white/10">
            {content.transcript}
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 pb-4 pt-10 px-4 flex flex-wrap items-center gap-3 z-30">
          <div className="order-1">
            <Button
              variant="blue"
              size="icon"
              aria-label={playing ? "Pause" : "Play"}
              onClick={toggle}
            >
              {playing ? (
                <Pause className="size-5" />
              ) : (
                <Play className="size-5" />
              )}
            </Button>
          </div>
          <div className="order-2 min-w-0 flex-1 w-full">
            <div
              className="relative h-2 w-full rounded-full bg-foreground/20 dark:bg-foreground/15 overflow-hidden"
              onClick={onScrub}
            >
              <div
                className="absolute inset-y-0 left-0 bg-emerald-500"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>
          <div className="order-3 ml-auto flex items-center gap-2">
            <Button
              variant="outline-amber"
              size="icon"
              aria-label="Replay"
              onClick={replay}
            >
              <RotateCcw className="size-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline-blue"
                  size="sm"
                  aria-label="Playback Speed"
                >
                  {speed}x
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup
                  value={speed}
                  onValueChange={(v) => changeSpeed(v)}
                >
                  <DropdownMenuRadioItem value="0.5">
                    0.5x
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="0.75">
                    0.75x
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="1">1x</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="1.25">
                    1.25x
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="1.5">
                    1.5x
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="2">2x</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {activeSubtitle && (
        <div
          className="mt-4 p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 text-center cursor-pointer select-none active:scale-[0.98] transition-transform"
          onPointerDown={handleSubtitlePress}
          onPointerUp={handleSubtitleRelease}
          onPointerLeave={handleSubtitleRelease}
        >
          <p className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
            {activeSubtitle.text}
          </p>
        </div>
      )}
    </div>
  );
}
