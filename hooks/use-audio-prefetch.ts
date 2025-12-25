import { useEffect, useRef } from "react";
import type { QuizQuestion, MediaContent } from "@/lib/quiz/types";

const CACHE_NAME = "bilingualmates-audio-v1";

export function useAudioPrefetch(questions: QuizQuestion[]) {
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current || !questions || questions.length === 0) return;
    processedRef.current = true;

    const urlsToPrefetch = new Set<string>();

    const collectFromMedia = (media?: MediaContent) => {
      if (!media) return;
      if (media.kind === "audio" && media.url) urlsToPrefetch.add(media.url);
      if (media.pronunciationUrl) urlsToPrefetch.add(media.pronunciationUrl);
    };

    questions.forEach((q) => {
      // 1. Prompt (Skip for theory as it has no prompt)
      if (q.kind !== "theory") {
        collectFromMedia(q.prompt);
      }

      // 2. Options (MCQ)
      if (q.kind === "mcq") {
        q.options.forEach((opt) => {
          collectFromMedia(opt.content);
          if (opt.clickSoundUrl) urlsToPrefetch.add(opt.clickSoundUrl);
        });
      }

      // 3. Match items
      if (q.kind === "match") {
        q.leftItems.forEach((item) => {
          collectFromMedia(item.content);
          if (item.clickSoundUrl) urlsToPrefetch.add(item.clickSoundUrl);
        });
        q.rightItems.forEach((item) => {
          collectFromMedia(item.content);
          if (item.clickSoundUrl) urlsToPrefetch.add(item.clickSoundUrl);
        });
      }

      // 4. Cloze segments (rarely have audio directly, but good to check structure)
      // Usually text-based.
    });

    const prefetch = async () => {
      if (!("caches" in window)) return;

      try {
        const cache = await caches.open(CACHE_NAME);
        const urls = Array.from(urlsToPrefetch);

        // Check which ones are already cached
        const uncachedUrls = [];
        for (const url of urls) {
          const match = await cache.match(url);
          if (!match) {
            uncachedUrls.push(url);
          }
        }

        if (uncachedUrls.length > 0) {
          console.log(
            `[AudioPrefetch] Prefetching ${uncachedUrls.length} files...`
          );
          // If addAll fails (e.g. one 404), it fails entirely.
          // Better to try one by one or filter valid URLs first.
          // For now, let's just log individual errors but try to cache all.
          await Promise.allSettled(
            uncachedUrls.map((url) =>
              cache
                .add(url)
                .catch((e) => console.warn(`Failed to cache ${url}`, e))
            )
          );
          console.log(`[AudioPrefetch] Finished prefetching.`);
        } else {
          console.log(`[AudioPrefetch] All audio files already cached.`);
        }
      } catch (err) {
        console.error("[AudioPrefetch] Error caching audio:", err);
      }
    };

    prefetch();
  }, [questions]);
}
