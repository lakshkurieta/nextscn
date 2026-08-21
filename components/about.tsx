"use client";

import { motion } from "motion/react";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { GsapRise, GsapWords } from "@/components/gsap-scroll";
import { ScrollVideo } from "@/components/scroll-video";
import { SEGMENTS } from "@/data/segments";

/** The slice of the industry section 02 speaks to. */
const ECOSYSTEM = [
  "Brands",
  "3PLs",
  "Manufacturers",
  "E-commerce experts",
  "Distributors",
  "Traders",
  "Technology companies",
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 pt-20 pb-16 sm:pt-24 sm:pb-20">
      {/* a single restrained gradient seam marks the section change */}
      <div
        aria-hidden
        className="bg-signature absolute inset-x-0 top-0 h-px opacity-45"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[38vw] w-[80vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(1,0,128,0.4), rgba(1,0,128,0.12) 55%, transparent 80%)",
        }}
      />

      {/* ---- 01 — About NEXT, on a light ground ----
             Full-bleed white band. Everything inside is scoped by `on-light`,
             which flips the gradient-on-hover utilities from a white resting
             colour to Ink Black — see globals.css. ---- */}
      <div className="on-light bg-paper relative py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* ---- Heading ---- */}
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            {/* GSAP ScrollTrigger drives this block — see components/gsap-scroll.
                The heading rises as one piece so its gradient spans survive; the
                body copy washes in word by word. */}
            <div className="lg:col-span-5">
              <GsapRise>
                {/* Signature Teal is too light to sit on white; Deep Blue is the
                    palette's readable accent on a light ground. */}
                <p className="eyebrow text-deep">01 About NEXT</p>
                <h2 className="mt-5 text-[clamp(2.1rem,4.6vw,3.5rem)]">
                  <span className="hover-signature cursor-default">
                    Bringing Supply Chain
                  </span>
                  <br />
                  <span className="text-signature">Minds together</span>
                </h2>
              </GsapRise>
            </div>

            <div className="lg:col-span-7 lg:pt-14">
              <GsapWords
                className="text-lg text-ink/70"
                text="NEXT is the supply chain network built on one idea. Where the industry has traditionally been a maze of closed circles, cold outreach and missed timing, NEXT is designed to remove the walls."
              />
              <GsapWords
                className="mt-5 text-ink/55"
                text="It exists for the people who move goods, ideas and capital through global supply chain, and who know that their next breakthrough is rarely a stranger's cold email. It's usually one degree away."
                start="top 92%"
                end="top 55%"
              />
              <GsapWords
                className="mt-5 font-bold text-ink"
                text="We aim to create a space wherein people connect, grow, and nurture beyond just another meeting."
                start="top 94%"
                end="top 58%"
              />
            </div>
          </div>

          {/* ---- Vision / Mission / Purpose ----
               Vision leads and Mission follows, per the brief, and the two
               share one card treatment so neither reads as subordinate. */}
          <RevealGroup className="mt-20 grid gap-4 md:grid-cols-2">
            <Reveal className="group border-ink/10 bg-ink/[0.025] hover:border-ink/20 relative overflow-hidden rounded-2xl border p-8 transition-colors duration-500">
              <div
                aria-hidden
                className="absolute -top-24 -right-24 h-56 w-56 opacity-0 transition-opacity duration-700 group-hover:opacity-25"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(229,69,126,0.55), transparent 78%)",
                }}
              />
              <p className="eyebrow text-ink/45">Our vision</p>
              <p className="hover-signature mt-5 cursor-default text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.25] font-semibold tracking-[-0.02em]">
                A world where nobody in supply chain is more than one
                introduction away from their next breakthrough.
              </p>
            </Reveal>

            <Reveal className="group border-ink/10 bg-ink/[0.025] hover:border-ink/20 relative overflow-hidden rounded-2xl border p-8 transition-colors duration-500">
              <div
                aria-hidden
                className="absolute -top-24 -right-24 h-56 w-56 opacity-0 transition-opacity duration-700 group-hover:opacity-25"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(229,69,126,0.55), transparent 78%)",
                }}
              />
              <p className="eyebrow text-ink/45">Our mission</p>
              <p className="hover-signature mt-5 cursor-default text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.25] font-semibold tracking-[-0.02em]">
                To connect the people, ideas, businesses and opportunities
                shaping the next generation of supply chain.
              </p>
            </Reveal>

            <Reveal className="bg-signature relative overflow-hidden rounded-2xl p-8 md:col-span-2">
              <div
                aria-hidden
                className="noise absolute inset-0 opacity-[0.09] mix-blend-overlay"
              />
              <div className="relative">
                <p className="eyebrow text-paper/60">Our purpose</p>
                <p className="mt-4 text-[clamp(1.25rem,3vw,2.1rem)] font-bold tracking-[-0.03em] text-paper">
                  Connecting people. Creating opportunities. Shaping what&apos;s
                  next.
                </p>
              </div>
            </Reveal>
          </RevealGroup>
        </div>
      </div>

      {/* ---- 02 Who will be the part of NEXT, on a light ground ----
             A second white band. Its own inner rhythm keeps it from reading as
             one continuous slab with section 01 above. ---- */}
      <div className="on-light bg-paper relative py-20 sm:py-24">
        <div aria-hidden className="bg-ink/10 absolute inset-x-0 top-0 h-px" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <GsapRise>
            <p className="eyebrow text-deep">02 Who will be the part of NEXT</p>
            <h2 className="mt-5 max-w-[18ch] text-[clamp(2.1rem,4.6vw,3.5rem)]">
              <span className="hover-signature cursor-default">Possibly anyone</span>
              <br />
              <span className="text-signature">and everyone.</span>
            </h2>
          </GsapRise>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <GsapWords
                className="text-lg text-ink/70"
                text="Possibly anyone and everyone from the supply chain niche."
              />
              <GsapWords
                className="mt-5 text-lg font-bold text-ink"
                text="From brands and 3PLs to manufacturers, e-commerce experts, distributors, traders, and technology companies; we bring the entire supply chain ecosystem together."
                start="top 92%"
                end="top 55%"
              />
              <GsapWords
                className="mt-5 text-ink/70"
                text="NEXT SCN is more than events. It's a shared space to connect, exchange ideas, learn from each other, and create opportunities."
                start="top 94%"
                end="top 58%"
              />
            </div>

            {/* The ecosystem, stacked in as a staggered column. */}
            <RevealGroup className="flex flex-wrap content-start gap-2.5 lg:col-span-5">
              {ECOSYSTEM.map((label) => (
                <Reveal
                  key={label}
                  className="border-ink/15 bg-ink/[0.03] hover:border-deep/40 rounded-full border px-4 py-2 text-[0.875rem] font-semibold text-ink/75 transition-colors duration-300"
                >
                  {label}
                </Reveal>
              ))}
            </RevealGroup>
          </div>

          <Reveal className="mt-14">
            <p className="text-signature text-[clamp(1.5rem,3.4vw,2.6rem)] font-black tracking-[-0.03em]">
              Learn with you. Nurture with you. Grow with you.
            </p>
          </Reveal>
        </div>
      </div>

      {/*
        The logo animation, sitting behind the hazard tape,
        scrubbed by scroll position rather than playing on its own clock.

        The band is white, so the blend mode is `multiply`, not `screen`:
        screen against white returns white, which would erase the clip outright.
        Multiply keeps its dark particle field visible on the light ground.

        Masked to an ellipse for the same reason the globe is masked: an
        un-masked video is a hard rectangle, and its edges would show as a seam
        against the section background.
      */}
      {/* `on-light` is what the navbar scans for to decide when to flip to
          its dark treatment — any light band must carry it or the white nav
          text disappears over this one. */}
      {/* pt-16 rather than mt-16 on the tape inside: with no padding or
          border on this wrapper the child margin collapses straight through
          it, pushing the white band down and leaving a dark strip above. */}
      {/* pb-12 is not decoration: tilting a full-bleed strip by 2.5deg swings
          its corners about 31px above and below its own box, so the band has
          to be tall enough to contain that. Without the padding the band's
          overflow-hidden — which is there to trim the wedge — clips the ends
          of the tape itself. */}
      <div className="on-light bg-paper relative overflow-hidden pt-16 pb-12">
        <ScrollVideo
          src="/next-logo-loop.mp4"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.10] mix-blend-multiply [-webkit-mask-image:radial-gradient(72%_58%_at_50%_50%,#000_32%,transparent_86%)] [mask-image:radial-gradient(72%_58%_at_50%_50%,#000_32%,transparent_86%)]"
        />

        {/* ---- Who's inside — hazard tape ---- */}
      <div id="network" className="relative scroll-mt-24 py-6">
        {/* The tilt sits on the motion element itself. Tailwind v4 emits the
            standalone `rotate:` property, which composes with the inline
            `transform` Motion writes for the entry animation instead of being
            replaced by it — so the two coexist without a wrapper. */}
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
                  {/* the separator between runs */}
                  <span
                    aria-hidden
                    className="bg-paper/70 inline-block h-1.5 w-1.5 rotate-45"
                  />
                </span>
              ))}
            </div>
          </div>

          {/*
            Everything below the tape turns black, cut on the tape's own angle,
            so the strip reads as a slanted page border.

            It lives inside the rotated element rather than being tilted
            separately — that guarantees the edge is exactly parallel to the
            tape instead of relying on two rotations staying in sync. Absolute
            positioning keeps it out of layout, so it adds no height; the band's
            `overflow-hidden` trims it, and the page below is already Ink Black,
            so the two meet seamlessly.
          */}
          <div
            aria-hidden
            className="bg-ink pointer-events-none absolute top-full -left-[6%] h-[60vh] w-[112%]"
          />
        </motion.div>
      </div>
      </div>
    </section>
  );
}
