"use client";
import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Volume2, Play, Pause, RotateCcw } from "lucide-react";
// removed shadcn Select; using native select for speed control
import type { MediaContent } from "@/lib/quiz/types";

export interface MediaRendererProps {
  content: MediaContent;
  role?: "question" | "option";
  className?: string;
  autoPlayTrigger?: number;
  onStartLoop?: () => void;
  onEndLoop?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onReady?: () => void;
  onError?: () => void;
}

export function MediaRenderer({
  content,
  role = "question",
  className,
  autoPlayTrigger,
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
      return <p className={cn(textClasses, className)}>{content.text}</p>;
    case "image":
      return (
        <div className={cn("rounded-xl overflow-hidden", className)}>
          {content.url && (
            <Image
              src={content.url}
              alt={content.alt ?? ""}
              width={800}
              height={600}
              className="h-auto w-full object-cover"
              unoptimized
            />
          )}
        </div>
      );
    case "audio":
      return (
        <div
          className={cn(
            isQuestion ? "w-full flex justify-center" : "",
            className
          )}
        >
          <AudioPlayer url={content.url} autoPlayTrigger={autoPlayTrigger} />
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
  autoPlayTrigger,
}: {
  url?: string;
  className?: string;
  autoPlayTrigger?: number;
}) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [barCount, setBarCount] = React.useState(18);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
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
  }, []);

  const bars = React.useMemo(() => {
    return Array.from({ length: barCount }, (_, i) => {
      const t = i / barCount;
      const v = 8 + Math.round(22 * Math.abs(Math.sin(t * Math.PI)));
      return v;
    });
  }, [barCount]);

  const toggle = () => {
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
    if (!audioRef.current || !autoPlayTrigger) return;
    audioRef.current.play();
    setPlaying(true);
  }, [autoPlayTrigger]);

  const onTimeUpdate = () => {
    const a = audioRef.current;
    if (!a || !a.duration || Number.isNaN(a.duration)) return;
    setProgress(a.currentTime / a.duration);
  };

  const activeBars = Math.max(
    0,
    Math.min(bars.length, Math.round(progress * bars.length))
  );

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

function VideoPlayer({
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

  const start = Math.max(0, content.startTimeSec ?? 0);
  const end = Math.max(start + 0.1, content.endTimeSec ?? 0);

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
            playerRef.current.seekTo(start, true);
            onReady?.();
          },
          onStateChange: (e: { data: number }) => {
            if (e.data === 1) setPlaying(true);
            if (e.data === 2) setPlaying(false);
            if (e.data === 0) {
              const p = playerRef.current;
              if (p) {
                p.seekTo(start, true);
                p.playVideo?.();
              }
            }
            if (e.data === 1) onPlay?.();
            if (e.data === 2) onPause?.();
          },
          onError: () => {
            onError?.();
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
          const segLen =
            end > start
              ? end - start
              : Math.max(0.1, (p.getDuration?.() ?? 0) - start);
          const clamped = Math.max(0, Math.min(1, (t - start) / segLen));
          setProgress(clamped);
          if (end > start && t >= end) {
            onEndLoop?.();
            p.seekTo(start, true);
            p.playVideo?.();
            onStartLoop?.();
          }
        }
      } else {
        const v = htmlRef.current;
        if (v && ready) {
          const t = v.currentTime ?? 0;
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
          p.seekTo(start, true);
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
      p.seekTo(start, true);
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
      p.seekTo(t, true);
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

  return (
    <div className="relative">
      <div className="relative aspect-video overflow-hidden">
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
            className="absolute inset-0 w-full h-full object-cover"
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
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/70 to-transparent" />
        {!playing && <div className="absolute inset-0 bg-black" />}
        {content.transcript && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 max-w-[85%] rounded-xl bg-black/30 backdrop-blur px-3 py-2 text-white text-sm">
            {content.transcript}
          </div>
        )}
        <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-3">
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
          <div className="flex items-center gap-2">
            <div
              className="relative h-2 w-[240px] rounded-full bg-white/40 overflow-hidden"
              onClick={onScrub}
            >
              <div
                className="absolute inset-y-0 left-0 bg-emerald-500"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <Button
              variant="outline-amber"
              size="icon"
              aria-label="Replay"
              onClick={replay}
            >
              <RotateCcw className="size-5" />
            </Button>
            <select
              value={speed}
              onChange={(e) => changeSpeed(e.target.value)}
              className="h-8 rounded-full bg-white/80 text-sm px-2"
            >
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
