"use client";
/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { cn } from "@/lib/utils";

type LottieRenderer = "svg" | "canvas" | "html";

interface LottieLoadOptions {
  container: Element;
  renderer: LottieRenderer;
  loop?: boolean | number;
  autoplay?: boolean;
  animationData?: unknown;
}

interface LottieAnimation {
  destroy(): void;
  addEventListener(eventName: string, callback: () => void): void;
}

interface Lottie {
  loadAnimation(options: LottieLoadOptions): LottieAnimation;
}

declare global {
  interface Window {
    lottie?: Lottie;
  }
}

type DotLottieProps = {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
};

type Props = {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  fallbackSrc?: string;
  fitWidth?: boolean;
};

export default function LottiePlayer({
  src,
  className,
  loop = true,
  autoplay = true,
  fallbackSrc,
  fitWidth = false,
}: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = React.useState(false);
  const [dotReady, setDotReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [aspect, setAspect] = React.useState<string | null>(null);
  const isDot = src?.toLowerCase().endsWith(".lottie");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (isDot) {
      const defined = window.customElements?.get?.("dotlottie-player");
      if (defined) {
        setDotReady(true);
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-player@latest/dist/dotlottie-player.js";
      script.async = true;
      script.onload = () => setDotReady(true);
      script.onerror = () => setFailed(true);
      document.body.appendChild(script);
      return () => {
        script.onload = null;
      };
    }
    const hasLib = window.lottie;
    if (!hasLib) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js";
      script.async = true;
      script.onload = () => setReady(true);
      script.onerror = () => setFailed(true);
      document.body.appendChild(script);
      return () => {
        script.onload = null;
      };
    }
    setReady(true);
  }, [isDot]);

  React.useEffect(() => {
    if (isDot) return;
    if (!ready) return;
    const lottie = window.lottie;
    if (!lottie || !ref.current) return;
    let anim: LottieAnimation | null = null;
    (async () => {
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
        const data: unknown = await res.json();
        const dim = data as { w?: number; h?: number };
        if (
          typeof dim.w === "number" &&
          typeof dim.h === "number" &&
          dim.w > 0 &&
          dim.h > 0
        ) {
          setAspect(`${dim.w} / ${dim.h}`);
        }
        anim = lottie.loadAnimation({
          container: ref.current!,
          renderer: "svg",
          loop,
          autoplay,
          animationData: data,
        });
        anim.addEventListener("DOMLoaded", () => {
          const svg = ref.current?.querySelector("svg") as SVGSVGElement | null;
          if (svg) {
            svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
            svg.style.width = "100%";
            svg.style.height = "100%";
          }
        });
      } catch {
        setFailed(true);
      }
    })();
    return () => {
      try {
        anim?.destroy?.();
      } catch {}
    };
  }, [isDot, ready, src, loop, autoplay]);

  if (failed && fallbackSrc) {
    return (
      <img
        src={fallbackSrc}
        alt="animation"
        className={cn("w-full h-40 object-cover", className)}
      />
    );
  }
  if (isDot) {
    if (!dotReady) return <div className={cn("w-full h-40", className)} />;
    return React.createElement("dotlottie-player", {
      src,
      loop,
      autoplay,
      style: { width: "100%", height: "10rem" },
    } as DotLottieProps);
  }
  const style: React.CSSProperties | undefined =
    fitWidth && aspect
      ? { width: "100%", height: "auto", aspectRatio: aspect }
      : undefined;
  return <div ref={ref} className={cn("w-full", className)} style={style} />;
}
