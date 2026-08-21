"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import DottedMap from "dotted-map";

/**
 * Aceternity UI — World Map (`npx shadcn@latest add @aceternity/world-map`),
 * adapted to the NEXT palette (05 COLOR).
 *
 * Changes from the registry source:
 *   1. dropped `next-themes` — this site is dark-only, so the dark treatment is
 *      the only one, and the map background is transparent rather than solid
 *      black so the hero's signature gradient reads through it;
 *   2. the generated dot-grid SVG is memoised — DottedMap re-runs the whole
 *      projection on every render otherwise;
 *   3. dots and arcs are brand-coloured, and the arc gradient fades through
 *      Signature Teal instead of sky-500.
 */

export type Lane = {
  start: { lat: number; lng: number; label?: string };
  end: { lat: number; lng: number; label?: string };
};

export default function WorldMap({
  dots = [],
  lineColor = "#3FE0D0",
  dotColor = "rgba(63,224,208,0.42)",
  className,
}: {
  dots?: Lane[];
  lineColor?: string;
  dotColor?: string;
  className?: string;
}) {
  // Seconds for one pulse to cross a lane and restart.
  const CYCLE = 4;
  const reduceMotion = useReducedMotion();

  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: dotColor,
      shape: "circle",
      backgroundColor: "transparent",
    });
  }, [dotColor]);

  const projectPoint = (lat: number, lng: number) => ({
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  });

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className={`relative aspect-[2/1] w-full font-sans ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none h-full w-full select-none [mask-image:linear-gradient(to_bottom,transparent,white_12%,white_88%,transparent)]"
        alt=""
        aria-hidden="true"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        viewBox="0 0 800 400"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
      >
        <defs>
          <linearGradient id="next-lane-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
            <stop offset="12%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="88%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const d = createCurvedPath(
            projectPoint(dot.start.lat, dot.start.lng),
            projectPoint(dot.end.lat, dot.end.lng),
          );
          return (
            <g key={`lane-${i}`}>
              {/* The lane itself, always faintly there so the route reads even
                  between pulses. */}
              <path
                d={d}
                fill="none"
                stroke={lineColor}
                strokeOpacity={0.16}
                strokeWidth="1"
              />

              {/*
                A short lit segment travelling end to end, on a loop.

                The original drew each lane once on mount, so the only way to
                see it again was a reload. Here `pathLength` is held constant
                and `pathOffset` is what animates, which slides a fixed-length
                dash along the curve rather than extending it from the start —
                that reads as something moving between the two points.

                The per-lane delay is applied once, before the first iteration;
                because every lane then shares the same period, that initial
                offset persists and the lanes stay staggered indefinitely
                instead of collapsing into a single synchronised flash.
              */}
              <motion.path
                d={d}
                fill="none"
                stroke="url(#next-lane-gradient)"
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={{ pathLength: 0.24, pathOffset: -0.24 }}
                animate={
                  reduceMotion
                    ? { pathLength: 1, pathOffset: 0 }
                    : { pathLength: 0.24, pathOffset: 1 }
                }
                transition={
                  reduceMotion
                    ? { duration: 0.6 }
                    : {
                        duration: CYCLE,
                        delay: 0.35 * i,
                        ease: "linear",
                        repeat: Infinity,
                        repeatDelay: 0,
                      }
                }
              />
            </g>
          );
        })}

        {dots.flatMap((dot, i) =>
          (["start", "end"] as const).map((end) => {
            const p = projectPoint(dot[end].lat, dot[end].lng);
            return (
              <g key={`${end}-${i}`}>
                <circle cx={p.x} cy={p.y} r="2" fill={lineColor} />
                <circle cx={p.x} cy={p.y} r="2" fill={lineColor} opacity="0.5">
                  <animate
                    attributeName="r"
                    from="2"
                    to="8"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          }),
        )}
      </svg>
    </div>
  );
}
