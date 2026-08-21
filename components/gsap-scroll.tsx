"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP scroll animations for the About copy.
 *
 * Both use `scrub`, so progress is bound to scroll position rather than fired
 * once on entry — scrolling back up plays them in reverse. That is the reason
 * to reach for ScrollTrigger here instead of Motion's `whileInView`, which this
 * replaces on these elements. The two must not overlap: both drive `opacity`,
 * so an element wrapped in <Reveal> AND animated by GSAP would fight itself.
 *
 * Everything runs inside `gsap.context()` and is reverted on unmount, which
 * kills the ScrollTriggers too — without that they survive navigation and keep
 * measuring detached nodes.
 */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Word-by-word wash-in, driven by scroll position. */
export function GsapWords({
  text,
  className,
  start = "top 88%",
  end = "top 48%",
}: {
  text: string;
  className?: string;
  start?: string;
  end?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-word]"),
        { opacity: 0.12, y: 12 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          // Overlapping stagger: the wash moves through the line as a soft
          // front rather than each word popping discretely.
          stagger: { each: 0.35, from: "start" },
          duration: 1,
          scrollTrigger: { trigger: el, start, end, scrub: 0.5 },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [start, end]);

  return (
    <p ref={ref} className={cn(className)}>
      {text.split(" ").map((w, i) => (
        <span key={i} data-word className="inline-block will-change-[opacity,transform]">
          {w}
          {i < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

/** Whole-block rise, for elements whose inner markup must stay intact. */
export function GsapRise({
  children,
  className,
  start = "top 90%",
  end = "top 62%",
}: {
  children: React.ReactNode;
  className?: string;
  start?: string;
  end?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start, end, scrub: 0.6 },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [start, end]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
