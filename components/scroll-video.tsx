"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * A video scrubbed by scroll position rather than played on its own clock.
 *
 * The element is deliberately NOT autoplay/loop — it stays paused and we set
 * `currentTime` from scroll progress, so the animation advances only as the
 * user moves and reverses when they scroll back up.
 *
 * Smoothness comes from four things, and all four are needed:
 *
 *   1. The file is encoded ALL-INTRA (every frame a keyframe, see mkloop notes).
 *      A normal encode carries a handful of keyframes, so an arbitrary seek has
 *      to decode forward from a distant one — that is what makes scrubbed video
 *      look chunky. Nothing on this side can compensate for it.
 *
 *   2. GSAP tweens a plain proxy number and we copy that across. Writing scroll
 *      deltas straight to `currentTime` lands on whatever values the scroll
 *      events happen to emit; letting GSAP interpolate with `scrub` turns them
 *      into a continuous ramp.
 *
 *   3. Seeks are serialised. Assigning `currentTime` while an earlier seek is
 *      still in flight queues requests the decoder services out of order, which
 *      reads as judder. We keep only the newest target and apply it when the
 *      previous seek reports back.
 *
 *   4. Sub-frame seeks are dropped. Below one frame's duration the picture
 *      cannot change, so issuing the seek is pure decoder churn.
 *
 * `preload="auto"` matters too: seeking needs frames buffered ahead, which a
 * metadata-only preload will not have.
 */
export function ScrollVideo({
  src,
  className,
  /** Where in the clip to park when motion is reduced. */
  staticFrame = 0.62,
}: {
  src: string;
  className?: string;
  staticFrame?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let ctx: gsap.Context | undefined;
    let cleanupSeek: (() => void) | undefined;

    const setup = () => {
      const duration = video.duration;
      if (!duration || !Number.isFinite(duration)) return;

      video.pause();

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        video.currentTime = duration * staticFrame;
        return;
      }

      const target = video.parentElement ?? video;
      const frame = 1 / 24;

      let desired = 0;
      let inFlight = false;

      const applySeek = () => {
        if (inFlight) return;
        if (Math.abs(video.currentTime - desired) < frame) return;
        inFlight = true;
        // fastSeek skips the exact-frame search; with an all-intra file the
        // nearest keyframe IS the frame asked for, so it stays accurate.
        if (typeof video.fastSeek === "function") video.fastSeek(desired);
        else video.currentTime = desired;
      };

      const onSeeked = () => {
        inFlight = false;
        applySeek(); // apply whatever the newest target became mid-seek
      };
      video.addEventListener("seeked", onSeeked);
      cleanupSeek = () => video.removeEventListener("seeked", onSeeked);

      ctx = gsap.context(() => {
        const proxy = { t: 0 };
        gsap.to(proxy, {
          t: duration,
          ease: "none",
          scrollTrigger: {
            trigger: target,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          onUpdate: () => {
            if (video.readyState < 2) return; // HAVE_CURRENT_DATA
            desired = proxy.t;
            applySeek();
          },
        });
      }, target);
    };

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener("loadedmetadata", setup, { once: true });
    }

    return () => {
      video.removeEventListener("loadedmetadata", setup);
      cleanupSeek?.();
      ctx?.revert();
    };
  }, [staticFrame]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      className={cn("select-none", className)}
    />
  );
}
