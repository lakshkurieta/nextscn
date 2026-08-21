"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * A thin reading-progress bar across the top, in the signature gradient, in
 * place of the browser's scrollbar (hidden in globals.css).
 *
 * `useScroll` reports 0 at the very top and 1 when the document is scrolled all
 * the way down — which is the footer — so full width lands exactly where the
 * brief asks.
 *
 * The value goes through a spring rather than driving scaleX directly: raw
 * scroll deltas arrive unevenly, especially with trackpad momentum, and a bar
 * pinned straight to them looks jittery. `restDelta` lets it settle instead of
 * animating forever over imperceptible fractions.
 *
 * scaleX on a full-width element keeps this on the compositor; animating
 * `width` would force layout on every frame.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="bg-signature pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left"
    />
  );
}
