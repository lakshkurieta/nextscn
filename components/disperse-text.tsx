"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Text that scatters away from the cursor, like rubbing at it with a small
 * eraser. Each glyph is its own inline-block; on pointer move, any glyph inside
 * `radius` is pushed along the vector away from the cursor, rotated and faded
 * in proportion to how close it is. Everything outside the radius is untouched.
 *
 * Three things this deliberately avoids:
 *
 *   - React state. This fires on every pointer move; re-rendering the headline
 *     that often would be wasteful, so displacement is written straight to
 *     each glyph's style and coalesced into one rAF per frame.
 *
 *   - Measuring during the effect. `getBoundingClientRect` on a transformed
 *     element returns its *displaced* box, so rest positions are captured once
 *     up front (and on resize) as offsets from the container, never re-read
 *     while glyphs are in motion.
 *
 *   - Reading the glyphs aloud. Split text is announced character by character,
 *     so the pieces are aria-hidden and the real string is exposed separately.
 */

type Props = {
  text: string;
  className?: string;
  /**
   * Eraser size, in multiples of the rendered font size — NOT pixels. The
   * headline is fluid (clamp 2.9rem→6.4rem), so a fixed radius would cover
   * several glyphs on a phone and less than one at 102px on a desktop. At 0.85
   * the eraser stays a little under one glyph-width wide at every breakpoint,
   * which catches roughly three letters.
   */
  radiusEm?: number;
  /** Throw distance at the centre, also relative to the font size. */
  strengthEm?: number;
};

export function DisperseText({
  text,
  className,
  radiusEm = 0.85,
  strengthEm = 0.26,
}: Props) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // No cursor to follow on touch, and this is motion the user may not want.
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const glyphs = Array.from(
      root.querySelectorAll<HTMLElement>("[data-glyph]"),
    );

    type Rest = { el: HTMLElement; x: number; y: number; dir: number };
    let rest: Rest[] = [];
    let radius = 0;
    let strength = 0;

    const measure = () => {
      // Clear any displacement first so the boxes read at their rest position.
      for (const el of glyphs) {
        el.style.transform = "";
        el.style.opacity = "";
      }
      const fontSize = parseFloat(getComputedStyle(root).fontSize) || 16;
      radius = fontSize * radiusEm;
      strength = fontSize * strengthEm;
      const rootRect = root.getBoundingClientRect();
      rest = glyphs.map((el, i) => {
        const r = el.getBoundingClientRect();
        return {
          el,
          x: r.left - rootRect.left + r.width / 2,
          y: r.top - rootRect.top + r.height / 2,
          dir: i % 2 === 0 ? 1 : -1,
        };
      });
    };

    let raf = 0;
    let pointer: { x: number; y: number } | null = null;

    const flush = () => {
      raf = 0;
      const rootRect = root.getBoundingClientRect();

      if (!pointer) {
        for (const g of rest) {
          g.el.style.transform = "";
          g.el.style.opacity = "";
        }
        return;
      }

      const px = pointer.x - rootRect.left;
      const py = pointer.y - rootRect.top;

      for (const g of rest) {
        const dx = g.x - px;
        const dy = g.y - py;
        const dist = Math.hypot(dx, dy);

        if (dist >= radius) {
          if (g.el.style.transform) {
            g.el.style.transform = "";
            g.el.style.opacity = "";
          }
          continue;
        }

        const f = 1 - dist / radius; // 1 at the cursor, 0 at the rim
        const angle = Math.atan2(dy, dx);
        const tx = Math.cos(angle) * strength * f;
        const ty = Math.sin(angle) * strength * f;
        g.el.style.transform =
          `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)` +
          ` rotate(${(f * 16 * g.dir).toFixed(2)}deg)` +
          ` scale(${(1 - f * 0.28).toFixed(3)})`;
        g.el.style.opacity = (1 - f * 0.72).toFixed(3);
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(flush);
    };

    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      schedule();
    };
    const onLeave = () => {
      pointer = null;
      schedule();
    };

    measure();
    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(measure);
    ro.observe(root);

    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [radiusEm, strengthEm]);

  const words = text.split(" ");

  return (
    <span ref={rootRef} className={cn("block", className)}>
      {/* the real string, for assistive tech and for copy/paste */}
      <span className="sr-only">{text}</span>

      <span aria-hidden="true">
        {words.map((word, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, ci) => (
              <span
                key={ci}
                data-glyph
                className="inline-block will-change-[transform,opacity] [transition:transform_320ms_cubic-bezier(0.22,1,0.36,1),opacity_320ms_cubic-bezier(0.22,1,0.36,1)]"
              >
                {ch}
              </span>
            ))}
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </span>
    </span>
  );
}
