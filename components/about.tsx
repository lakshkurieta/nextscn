"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { GsapRise, GsapWords } from "@/components/gsap-scroll";
import { ScrollVideo } from "@/components/scroll-video";
import { StructureFlowCollection } from "@/components/shaders/structure-flow-collection";
import { SEGMENTS } from "@/data/segments";
import { PILLARS, WE_DO, WE_DONT, BENEFITS } from "@/data/pillars";
import type { Pillar } from "@/data/pillars";

/**
 * Publishes the pointer's position inside an element as `--mx` / `--my`, so a
 * CSS radial gradient can follow it. Same approach the hero uses for the glow
 * behind the world map: moves are coalesced into a single rAF, and the whole
 * thing is skipped where it would be pointless (touch, which has no hover) or
 * unwanted (reduced motion). The gradient's own fallbacks cover both cases.
 */
function usePointerSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let pending: { x: number; y: number } | null = null;

    const flush = () => {
      raf = 0;
      if (!pending) return;
      el.style.setProperty("--mx", `${pending.x}px`);
      el.style.setProperty("--my", `${pending.y}px`);
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

  return ref;
}

export function About() {
  const gridRef = usePointerSpotlight<HTMLDivElement>();

  return (
    <section id="about" className="relative scroll-mt-20 pt-20 sm:pt-24">
      <div aria-hidden className="bg-signature absolute inset-x-0 top-0 h-px opacity-45" />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[38vw] w-[80vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(1,0,128,0.4), rgba(1,0,128,0.12) 55%, transparent 80%)",
        }}
      />

      {/* ============ 01 — Why NEXT exists (light band) ============ */}
      <div className="on-light bg-paper relative py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <GsapRise>
                <p className="eyebrow text-deep">01 Why NEXT exists</p>
                <h2 className="mt-5 text-[clamp(2.1rem,4.6vw,3.5rem)]">
                  <span className="hover-signature cursor-default">
                    The industry that connects everything else
                  </span>{" "}
                  <span className="text-signature">forgot to connect itself.</span>
                </h2>
              </GsapRise>
            </div>

            <div className="lg:col-span-7 lg:pt-6">
              <GsapWords
                className="text-lg text-ink/70"
                text="The 3PL goes to the 3PL conference. The software company goes to the tech expo. The brand goes to the retail show. The investor goes to the private equity summit."
              />
              <GsapWords
                className="mt-5 text-lg font-bold text-ink"
                text="Four rooms. Four rosters. Four sets of business cards. And in every single one of them, the person you actually needed to meet was somewhere else entirely."
                start="top 92%"
                end="top 55%"
              />
              <GsapWords
                className="mt-5 text-ink/60"
                text="That isn't a networking problem. It's a structural failure, and the industry's own institutions built it. Segment associations serve segments. They were never designed to put your next client, your next tech partner and your next investor in the same room, because that was never the job."
                start="top 94%"
                end="top 58%"
              />
              <GsapWords
                className="mt-5 text-ink/60"
                text="NEXT was built for exactly that job. One room. Every discipline. No gatekeeping, no segment tax, no waiting three years for a committee seat before anyone takes your call."
                start="top 96%"
                end="top 60%"
              />
              <Reveal className="mt-6">
                <p className="text-lg font-black tracking-[-0.02em] text-ink">
                  We don&apos;t run a directory. We don&apos;t sell a badge. We
                  make the introduction.
                </p>
              </Reveal>
            </div>
          </div>

          {/* ---- vision / mission ---- */}
          <RevealGroup className="mt-20 grid gap-4 md:grid-cols-2">
            <Reveal className="group border-ink/10 bg-ink/[0.025] hover:border-ink/20 relative overflow-hidden rounded-2xl border p-8 transition-colors duration-500">
              <p className="eyebrow text-ink/45">Our vision</p>
              <p className="hover-signature mt-5 cursor-default text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.25] font-semibold tracking-[-0.02em]">
                A world where nobody in supply chain is more than one
                introduction away from their next breakthrough.
              </p>
            </Reveal>

            <Reveal className="group border-ink/10 bg-ink/[0.025] hover:border-ink/20 relative overflow-hidden rounded-2xl border p-8 transition-colors duration-500">
              <p className="eyebrow text-ink/45">Our mission</p>
              <p className="hover-signature mt-5 cursor-default text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.25] font-semibold tracking-[-0.02em]">
                To connect the people, ideas, businesses and opportunities
                shaping the next generation of supply chain.
              </p>
            </Reveal>
          </RevealGroup>

          {/* ---- pull quote, its own band ---- */}
          {/*
            The deck puts this quote in place of Our purpose's BODY text, so the
            label stays and the quote becomes its statement.

            It must hold one line. The size is fluid but capped: past ~2.35rem
            the 53 characters stop fitting the card once max-w-7xl stops the
            container growing, so a larger cap would overflow on wide screens.
            Below sm there is no readable size that fits, so it wraps there.
          */}
          <Reveal className="bg-signature relative mt-4 overflow-hidden rounded-2xl p-8 sm:p-12">
            <div aria-hidden className="noise absolute inset-0 opacity-[0.09] mix-blend-overlay" />
            <div className="relative text-center">
              <p className="eyebrow text-paper/60">Our purpose</p>
              <p className="mt-5 text-[clamp(1.15rem,2.2vw,2.35rem)] font-black tracking-[-0.03em] text-paper sm:whitespace-nowrap">
                “We connect the industry that connects everything else.”
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ============ 02 — What makes NEXT different ============ */}
      <div className="relative overflow-hidden py-20 sm:py-24">
        {/*
          ThreeUI StructureFlowCollection, emerald-horizon variant, recoloured
          to the NEXT palette. The shader paints its own Ink Black ground, so it
          fills the section rather than sitting on top of it; the content above
          keeps its own stacking context via `relative`.

          The component self-manages cost: an IntersectionObserver stops the rAF
          loop whenever the section is off screen, so it is not rendering while
          the visitor is up in the hero.
        */}
        <div className="shader-frame pointer-events-none absolute inset-0 -z-10">
          <StructureFlowCollection
            variant="emerald-horizon"
            speed={1.0}
            waveScale={1.0}
            variation={1.0}
            hue={0}
            glow={1.0}
            vignette={1.0}
          />
          {/*
            Scrim. The horizon glow peaks at #3AC9FF right where the WE DO /
            WE DON'T columns sit, which measured 1.16:1 against the teal text
            and 1.91:1 against white. Sampling the shader under every text node
            across a full animation cycle, ink at 55% rising to 80% at the
            bottom (where the glow lives) is the lightest scrim that clears
            4.5:1 everywhere: white 12.9, teal 7.9, muted 5.1. One layer, not
            two stacked, so the alpha ramp is exactly the measured one.
          */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/55 to-ink/80" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-teal">02 What makes NEXT different</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 max-w-[24ch] text-[clamp(1.9rem,4.2vw,3.1rem)]">
              <span className="hover-signature cursor-default">
                Most organizations tell you what they believe.
              </span>{" "}
              <span className="text-signature">Here&apos;s what we do.</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {/* WE DO — the loud column */}
            <RevealGroup className="flex flex-col gap-3">
              <Reveal>
                <p className="eyebrow text-teal">We do</p>
              </Reveal>
              {WE_DO.map((item) => (
                <Reveal
                  key={item.title}
                  className="border-teal/25 bg-teal/[0.04] hover:border-teal/50 rounded-2xl border p-6 transition-colors duration-500"
                >
                  <p className="flex items-start gap-3 font-semibold text-paper">
                    <Check size={17} className="text-teal mt-1 shrink-0" />
                    {item.title}
                  </p>
                  <p className="mt-2 pl-8 text-[0.9375rem] leading-relaxed text-paper/55">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </RevealGroup>

            {/* WE DON'T — deliberately muted */}
            <RevealGroup className="flex flex-col gap-3">
              <Reveal>
                <p className="eyebrow text-paper/35">We don&apos;t</p>
              </Reveal>
              {WE_DONT.map((item) => (
                <Reveal
                  key={item.title}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6"
                >
                  <p className="flex items-start gap-3 font-semibold text-paper/45">
                    <X size={17} className="mt-1 shrink-0 text-paper/25" />
                    {item.title}
                  </p>
                  <p className="mt-2 pl-8 text-[0.9375rem] leading-relaxed text-paper/30">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </RevealGroup>
          </div>

          <Reveal className="mt-12">
            <p className="mx-auto max-w-[46ch] text-center text-[clamp(1.1rem,2.2vw,1.5rem)] font-bold tracking-[-0.02em] text-balance text-paper/80">
              Every other organization in this industry can copy the first list.
              None of them can copy the second.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ============ 03 — Who it's for (light band) ============ */}
      <div className="on-light bg-paper relative py-20 sm:py-24">
        <div aria-hidden className="bg-ink/10 absolute inset-x-0 top-0 h-px" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <GsapRise>
            <p className="eyebrow text-deep">03 Who it&apos;s for</p>
            {/*
              "Possibly" is on the permanent banned-word list, and this headline
              is a deliberate exception: it was specified verbatim after that
              list was set, so the later instruction wins. Capitalisation is the
              one given, not the site's usual sentence case.
            */}
            <h2 className="mt-5 max-w-[18ch] text-[clamp(2.1rem,4.6vw,3.5rem)]">
              <span className="hover-signature cursor-default">Possibly Anyone</span>
              <br />
              <span className="text-signature">and Everyone</span>
            </h2>
          </GsapRise>

          <Reveal className="mt-6">
            <p className="text-lg font-bold text-ink">
              Six pillars. One room. Every gathering draws from all of them.
            </p>
          </Reveal>
          <GsapWords
            className="mt-4 max-w-[62ch] text-ink/60"
            text="“Supply chain” usually means logistics. Here it means everyone the chain depends on, including the people the industry keeps leaving off the invite list."
            start="top 94%"
            end="top 58%"
          />

          {/*
            The pillars are pills. Each one holds only its name until it is
            hovered or focused, at which point it opens into a card carrying the
            members and what that pillar comes here to find.
          */}
          <RevealGroup className="mt-12 flex flex-wrap gap-3">
            {PILLARS.map((p) => (
              <Reveal key={p.index}>
                <PillarPill pillar={p} />
              </Reveal>
            ))}
          </RevealGroup>

          <Reveal className="mt-12">
            {/*
              Set as two blocks rather than one balanced paragraph. `text-balance`
              was evening out the line lengths, which pushed "here." onto line
              two and split the clause across the break.
            */}
            <p className="text-signature text-[clamp(1.4rem,3.2vw,2.4rem)] font-black tracking-[-0.03em]">
              <span className="block">
                If your work moves the world, you belong here.
              </span>
              <span className="block">That&apos;s the whole eligibility test.</span>
            </p>
          </Reveal>
        </div>
      </div>

      {/* ============ 04 — What's in it for you ============ */}
      <div ref={gridRef} className="relative overflow-hidden py-20 sm:py-24">
        {/* The animated lattice this section sits on. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/*
            The lattice itself, panning one cell diagonally on a loop. Masked to
            a soft oval so it dissolves before the section edges instead of
            butting into the bands above and below.
          */}
          <div className="grid-lines animate-grid-pan absolute -inset-[68px] [-webkit-mask-image:radial-gradient(78%_66%_at_50%_45%,#000_22%,transparent_82%)] [mask-image:radial-gradient(78%_66%_at_50%_45%,#000_22%,transparent_82%)]" />
          {/* Deep Blue wash, so the lattice reads as brand rather than grey. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 82% at 50% 0%, rgba(1,0,128,0.30), transparent 68%)",
            }}
          />
          {/* The grid lighting up under the cursor, as the hero's map does. */}
          <div
            className="absolute inset-0 mix-blend-screen"
            style={{
              background:
                "radial-gradient(360px circle at var(--mx, 50%) var(--my, 38%), rgba(63,224,208,0.20), rgba(165,55,200,0.12) 45%, transparent 72%)",
            }}
          />
          {/* A beam crossing the lattice on a slow cycle. */}
          <div className="animate-grid-sweep via-teal/[0.055] absolute inset-y-0 -left-1/4 w-1/3 bg-gradient-to-r from-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-teal">04 What&apos;s in it for you</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-[clamp(2.1rem,4.6vw,3.4rem)]">
              <span className="hover-signature cursor-default">Six things.</span>{" "}
              <span className="text-signature">All of them concrete.</span>
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] md:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <Reveal
                key={b.index}
                className="group bg-ink/72 hover:bg-ink/50 relative p-8 backdrop-blur-[2px] transition-colors duration-500"
              >
                {/*
                  Cells are translucent so the lattice moves behind the copy
                  rather than being boxed out by it. The hairline picks up the
                  signature gradient on hover, matching the rule at the top of
                  the section.
                */}
                <div
                  aria-hidden
                  className="bg-signature absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-70"
                />
                <p className="eyebrow text-teal">{b.index}</p>
                <p className="hover-signature mt-4 text-[1.0625rem] font-bold tracking-[-0.01em]">
                  {b.title}
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper/45">
                  {b.body}
                </p>
              </Reveal>
            ))}
          </RevealGroup>

          <Reveal className="mt-12">
            <p className="mx-auto max-w-[44ch] text-center text-[clamp(1.1rem,2.2vw,1.5rem)] font-bold tracking-[-0.02em] text-balance text-paper/80">
              Every one of these is a thing that happens to you. Not a value we
              hold.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative overflow-hidden pt-16 pb-2 sm:pb-4">
        {/* ---- Who's inside — hazard tape ---- */}
        <div id="network" className="relative scroll-mt-24 py-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="-rotate-[2.5deg]"
          >
            <div className="caution-tape relative -ml-[6%] w-[112%] overflow-hidden py-3.5 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)]">
              <div className="flex w-max animate-marquee items-center gap-7">
                {[...SEGMENTS, ...SEGMENTS].map((m, idx) => (
                  <span
                    key={`${m}-${idx}`}
                    className="flex items-center gap-7 text-[0.9375rem] font-extrabold tracking-[0.16em] whitespace-nowrap text-paper uppercase"
                  >
                    {m}
                    <span aria-hidden className="bg-paper/70 inline-block h-1.5 w-1.5 rotate-45" />
                  </span>
                ))}
              </div>
            </div>

            {/*
              The slanted black wedge that used to sit here cut the white band
              off on the tape's own angle. With the band black there is nothing
              left to cut, so it is gone rather than painting ink onto ink.
            */}
          </motion.div>
        </div>

        {/*
          The logo animation, scrubbed by scroll position rather than played on
          its own clock. It sits below the tape in normal flow, not absolutely
          behind it, so "below the tape" holds at every breakpoint without any
          offset to keep in sync. This wrapper is also what ScrollVideo uses as
          its ScrollTrigger target, so the scrub range is this box rather than
          the whole band.

          The box is deliberately shorter than the clip's own 832x468 and uses
          `object-cover`, cropping about 15% off the top and bottom. Measured at
          the parked frame, the mask fades the logo out by 65% of the frame's
          height, so a full-height box carried ~95px of dead space underneath
          the visible logo and read as a gap. Cropping is safe here: the only
          thing out at those extremes is the outer fringe of the particle burst.
          The mask stays a `closest-side` ellipse touching all four edges and
          fading out well before them. That matters because the
          clip has no true black anywhere: its darkest pixel is 28 and its mean
          47, so `screen` was lifting the entire rectangle above the page's
          #080808 and the frame's own edges showed as a lit box. The filter
          fixes the cause, remapping the tonal floor to 0: 64% of frame one
          becomes true black, 98% of the last frame, while the logo still peaks
          at 125. The mask covers whatever survives at the corners.

          The order of those two functions is not free. Tailwind always emits
          `filter: ... brightness() contrast() ...` in that fixed order, so the
          constants are solved for brightness-then-contrast. Solved the other
          way round they map the clip's darkest pixel to 39 instead of 0, which
          lifts the ground rather than crushing it and puts the lit rectangle
          straight back.
        */}
        <div className="pointer-events-none relative mx-auto mt-8 aspect-[832/280] w-[min(78vw,480px)] sm:mt-10">
          <ScrollVideo
            src="/next-logo-loop.mp4"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.12] brightness-[1.6] contrast-[2.7] mix-blend-screen [-webkit-mask-image:radial-gradient(closest-side,#000_0%,#000_34%,transparent_88%)] [mask-image:radial-gradient(closest-side,#000_0%,#000_34%,transparent_88%)]"
          />
        </div>
      </div>
    </section>
  );
}

/**
 * One pillar, collapsed to a pill.
 *
 * The open card is absolutely positioned rather than expanding in flow: the
 * pills sit in a wrapping flex row, and growing one in place would re-wrap the
 * whole row mid-transition, throwing the other pills onto different lines.
 * Taking the card out of flow means the row never moves.
 *
 * What CSS cannot do on its own is keep that card on screen. It wants to sit at
 * its pill's left edge, but a pill near the right edge would push it past the
 * viewport and give the page a horizontal scrollbar. A left/right flip is not
 * enough either: on a phone the card is nearly as wide as the screen, so
 * right-aligning simply moves the overflow to the other side. Instead the card
 * is placed at its pill's left edge and then clamped into the viewport, which
 * degrades correctly at every width.
 */
function PillarPill({ pillar }: { pillar: Pillar }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);

  const place = (pillEl: HTMLElement) => {
    const pill = pillEl.getBoundingClientRect();
    const width = panelRef.current?.offsetWidth ?? 352;
    const margin = 16;
    // `left` is relative to the pill, so convert the clamped viewport position
    // back into an offset from the pill's own left edge.
    const clamped = Math.max(
      margin,
      Math.min(pill.left, window.innerWidth - margin - width),
    );
    setLeft(Math.round(clamped - pill.left));
  };

  return (
    <div
      tabIndex={0}
      onMouseEnter={(e) => place(e.currentTarget)}
      onFocus={(e) => place(e.currentTarget)}
      className="group relative z-0 outline-none focus-visible:z-30 hover:z-30"
    >
      <div className="border-ink/15 bg-ink/[0.03] group-hover:border-deep/45 group-hover:bg-deep/[0.06] group-focus-visible:border-deep/60 flex cursor-default items-center gap-2.5 rounded-full border px-5 py-2.5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_28px_-14px_rgba(1,0,128,0.45)] group-focus-visible:-translate-y-0.5">
        <span className="text-deep/45 text-[0.75rem] font-bold tabular-nums">
          {pillar.index}
        </span>
        <span className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink">
          {pillar.name}
        </span>
      </div>

      {/*
        Only opacity and scale transition. `left` is set the moment the pointer
        arrives and must land instantly, or the card would visibly slide across
        from wherever it was clamped to last time.
      */}
      <div
        ref={panelRef}
        style={{ left }}
        className="pointer-events-none absolute top-full z-30 w-[22rem] max-w-[calc(100vw-2.5rem)] origin-top scale-[0.97] pt-2 opacity-0 transition-[opacity,scale] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 group-focus-visible:pointer-events-auto group-focus-visible:scale-100 group-focus-visible:opacity-100"
      >
        <div className="border-ink/10 bg-paper rounded-2xl border p-5 shadow-[0_28px_60px_-28px_rgba(0,0,0,0.4)]">
          <p className="text-[0.875rem] leading-relaxed text-ink/65">
            {pillar.members}
          </p>
          <p className="border-ink/10 mt-4 border-t pt-4 text-[0.9375rem] leading-relaxed text-ink">
            <span className="font-bold">Here to find: </span>
            {pillar.seeking}
          </p>
          {pillar.note && (
            <p className="text-deep mt-2 text-[0.875rem] font-semibold">
              {pillar.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
