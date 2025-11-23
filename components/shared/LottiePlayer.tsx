"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
};

export default function LottiePlayer({
  src,
  className,
  loop = true,
  autoplay = true,
}: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const hasLib = (window as any).lottie;
    if (!hasLib) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js";
      script.async = true;
      script.onload = () => setReady(true);
      document.body.appendChild(script);
      return () => {
        script.onload = null;
      };
    }
    setReady(true);
  }, []);

  React.useEffect(() => {
    if (!ready) return;
    const lottie = (window as any).lottie;
    if (!lottie || !ref.current) return;
    const anim = lottie.loadAnimation({
      container: ref.current,
      renderer: "svg",
      loop,
      autoplay,
      path: src,
    });
    return () => {
      try {
        anim?.destroy?.();
      } catch {}
    };
  }, [ready, src, loop, autoplay]);

  return <div ref={ref} className={cn("w-full h-40", className)} />;
}
