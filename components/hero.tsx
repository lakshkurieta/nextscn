"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DisperseText } from "@/components/disperse-text";
import dynamic from "next/dynamic";
import { mapLanes } from "@/data/arcs";

/**
 * 02 MESSAGING — Hero Headline Formula:
 * "Meet your next partner / client / lead / investor / opportunity / breakthrough"
 * One variant per placement; here the homepage cycles the full set.
 */
const NOUNS = [
  "client",
  "lead",
  "partner",
  "investor",
  "hire",
  "breakthrough",
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

/** Decorative background: client-only, and the dot grid is costly to build. */
const WorldMap = dynamic(() => import("@/components/ui/world-map"), {
  ssr: false,
});

export function Hero() {
  const [i, setI] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % NOUNS.length), 1500);
    return () => clearInterval(t);
  }, []);

  /**
   * Cursor glow + map parallax. Written straight to CSS custom properties on
   * the section rather than through state — this fires on every pointer move,
   * and re-rendering the hero that often would be wasteful. rAF-coalesced so
   * we touch the DOM at most once per frame.
   */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    // Nothing to follow on touch devices, and hover styles do not apply there.
    if (window.matchMedia("(pointer: coarse)").matches) return;
    // Cursor-tracked parallax is motion; honour the user's preference.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let pending: { x: number; y: number } | null = null;

    const flush = () => {
      raf = 0;
      if (!pending) return;
      const { x, y } = pending;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      el.style.setProperty("--px", `${(x / r.width - 0.5) * -22}px`);
      el.style.setProperty("--py", `${(y / r.height - 0.5) * -14}px`);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pending = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (!raf) raf = requestAnimationFrame(flush);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="group/hero relative flex min-h-[100svh] items-center overflow-hidden pt-20"
    >
      {/* ---- Background stack: gradient stays a highlight, not wallpaper ---- */}
      <div aria-hidden className="absolute inset-0 -z-30 bg-ink" />
      <div aria-hidden className="grid-lines absolute inset-0 -z-20" />

      {/* Signature gradient bloom, heavily blurred and masked */}
      <div
        aria-hidden
        /* A radial gradient, not a blurred block: a gradient is rasterised once as a normal paint, while `filter: blur()` allocates a large offscreen buffer and re-runs on every change. This one also drifts,
           which made the blur re-rasterise continuously. */
        className="animate-drift pointer-events-none absolute -top-[28%] left-1/2 -z-20 h-[70vw] max-h-[820px] w-[110vw] max-w-[1500px] opacity-[0.55]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(229,69,126,0.5), rgba(165,55,200,0.3) 44%, rgba(75,47,214,0.14) 68%, transparent 84%)",
        }}
      />
      {/* Deep Blue floor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[38%] left-1/2 -z-20 h-[55vw] w-[95vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(1,0,128,0.55), rgba(1,0,128,0.18) 55%, transparent 80%)",
        }}
      />

      {/* Cursor glow. Same -z-10 band as the map but earlier in the DOM, so it
          paints behind it and the dots light up as it passes underneath. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/hero:opacity-100"
        style={{
          background:
            "radial-gradient(460px circle at var(--mx, 70%) var(--my, 45%), rgba(63,224,208,0.22), rgba(165,55,200,0.14) 42%, transparent 72%)",
        }}
      />

      {/* Trade lanes across a dotted world — the network, literally. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
        style={{
          transform: "translate3d(var(--px, 0px), var(--py, 0px), 0)",
          transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <WorldMap
          dots={mapLanes}
          lineColor="#3FE0D0"
          dotColor="rgba(63,224,208,0.38)"
          className="w-[128%] max-w-none translate-y-[4%] opacity-[0.72]"
        />
      </div>
      {/*
        Scrim over the headline side.

        It used to run from fully opaque Ink Black, which blacked the map out
        entirely behind the text. Now it only knocks the map back rather than
        hiding it: the dots stay visible on the left, just dimmer than the open
        right-hand side, so the map reads as one continuous field across the
        hero instead of stopping halfway.
      */}
      <div
        aria-hidden
        className="from-ink/72 via-ink/40 pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r to-transparent"
      />
      <div
        aria-hidden
        className="noise pointer-events-none absolute inset-0 -z-10 opacity-[0.16] mix-blend-overlay"
      />

      {/* ---- Content ---- */}
      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="glass mb-8 inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5"
        >
          <span className="px-2.5 text-[0.8125rem] font-medium text-paper/70">
            The supply chain network that refuses to pick a side.
          </span>
        </motion.div>

        <h1 className="max-w-[19ch] text-[clamp(2.9rem,8.2vw,6.4rem)] font-black">
          <motion.span
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.06 }}
            /*
              `hover-signature` is gone from this line on purpose. Splitting the
              headline into transformed glyphs breaks `background-clip: text` —
              a transformed child paints in its own context and never receives
              the parent's clipped background, so every scattered letter would
              render invisible. The disperse *is* this line's hover treatment
              now; the gradient hover stays on every other heading.
            */
            className="block cursor-default text-paper"
          >
            <DisperseText text="Meet your next" radiusEm={0.85} strengthEm={0.26} />
          </motion.span>

          {/* The mask box must clear the glyph ascender AND descender, which
              overflow the line box at the h1's 0.98 line-height — otherwise the
              sliding word gets clipped. Give it 1.28em of room, match the
              word's leading to it, then pull the extra leading back off the top
              so the two lines keep their tight optical rhythm. */}
          <span className="relative -mt-[0.14em] block h-[1.28em] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={NOUNS[i]}
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-105%", opacity: 0 }}
                transition={{ duration: 0.42, ease }}
                className="text-signature absolute inset-x-0 block leading-[1.28] will-change-transform"
              >
                {NOUNS[i]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.22 }}
          className="mt-9 max-w-xl text-lg text-paper/65 sm:text-xl"
        >
          One industry. No walls. One introduction away.
          <span className="mt-3 block text-base text-paper/45">
            Supply chain moves the world&apos;s goods, capital and data, and
            still can&apos;t get a 3PL, a software founder, a brand or an
            investor into the same room. NEXT is that room for you. We bring
            together the operators, technology, brands, manufacturers and
            capital who are shaping the modern supply chain network, so
            opportunity moves at the speed of relationships, not gatekeepers.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.32 }}
          className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Button href="#about" size="lg" variant="signature">
            Learn more
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Button>
          <Button href="/become-a-member" size="lg" variant="glass">
            Become a Member
          </Button>
        </motion.div>

      </div>
      {/*
        Founding-membership scarcity, pinned to the hero rather than the
        viewport: it belongs to this section and should scroll away with it, not
        follow the reader down the page like an ad.
      */}
      <motion.a
        href="/become-a-member"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.9 }}
        className="glass glass-hover absolute right-5 bottom-24 z-10 hidden max-w-[15rem] rounded-2xl px-5 py-4 sm:right-8 sm:bottom-28 sm:block"
      >
        <p className="text-[0.6875rem] font-black tracking-[0.18em] text-teal uppercase">
          Hurry!
        </p>
        <p className="mt-1.5 text-[0.875rem] leading-snug font-semibold text-paper">
          Founding membership is capped at 50.
        </p>
        <p className="mt-1 text-[0.875rem] leading-snug text-paper/60">
          Only 20 seats remaining.
        </p>
      </motion.a>
    </section>
  );
}
