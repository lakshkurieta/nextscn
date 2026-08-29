"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSectionHref } from "@/components/ui/section-link";

/**
 * The bar has no background of its own — no fill, no border, no blur. Only the
 * controls sitting on it are glass, so they read as floating over the page.
 *
 * It hides on scroll down and returns on scroll up, which is also what keeps
 * the links legible without a backing plate: content never sits behind the nav
 * for long. It always reappears near the top, and never hides while the mobile
 * menu is open — that would take the close button with it.
 */

const links = [
  { label: "What's NEXT", href: "#about" },
  { label: "When NEXT", href: "#network" },
  { label: "Connect", href: "#contact" },
];

/** A real route, so it goes through next/link rather than a hash anchor. */
const MEMBER_HREF = "/become-a-member";

export function Navbar() {
  const sectionHref = useSectionHref();
  const onHome = usePathname() === "/";
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [overLight, setOverLight] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      // Ignore sub-pixel jitter and rubber-banding, or the bar flickers.
      if (Math.abs(delta) < 6) return;
      lastY.current = y;
      setHidden(y < 96 ? false : delta > 0);
    };
    lastY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * The bar is transparent, so over the white About bands its white text and
   * reversed lockup vanish. This watches whether any light band currently sits
   * under the bar and flips the whole thing to its light-ground treatment.
   *
   * Measured against the bands' own rects rather than an IntersectionObserver
   * with a negative rootMargin: there are only two of them, so this is cheap,
   * and it avoids rebuilding the observer every time the viewport resizes.
   */
  useEffect(() => {
    const NAV_H = 80;
    const bands = Array.from(
      document.querySelectorAll<HTMLElement>(".on-light"),
    );
    if (!bands.length) return;

    let raf = 0;
    const measure = () => {
      raf = 0;
      setOverLight(
        bands.some((b) => {
          const r = b.getBoundingClientRect();
          return r.top < NAV_H && r.bottom > 0;
        }),
      );
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
        // flips the glass tint and the gradient-hover resting colour to ink
        overLight && "on-light",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href={onHome ? "#top" : "/"}
          aria-label={
            onHome
              ? "NEXT Supply Chain Network, back to top"
              : "NEXT Supply Chain Network, back to home"
          }
          className="shrink-0"
        >
          <Logo priority variant={overLight ? "primary" : "reversed"} />
        </a>

        {/* One glass frame around all three. The segments inside tint with a
            plain background on hover rather than getting their own .glass —
            stacking backdrop filters is expensive and muddies the pane. */}
        <div className="glass hidden items-center gap-1 rounded-full p-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={sectionHref(l.href)}
              className="group/sig rounded-full px-4 py-2 transition-colors duration-300 hover:bg-white/[0.12]"
            >
              <span className="hover-signature-dim text-[0.9375rem] font-semibold">
                {l.label}
              </span>
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button
            href={MEMBER_HREF}
            variant="glass"
            /* Tailwind utilities outrank the .on-light colour rule, so the
               override has to come through className where tailwind-merge can
               drop `text-paper`. */
            className={overLight ? "text-ink" : undefined}
          >
            Become a Member
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={cn(
            "glass glass-hover flex h-11 w-11 items-center justify-center rounded-full md:hidden",
            overLight ? "text-ink" : "text-paper",
          )}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="glass mx-5 rounded-3xl p-3 md:hidden"
          >
            <div className="flex flex-col">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={sectionHref(l.href)}
                  onClick={() => setOpen(false)}
                  className="group/sig rounded-2xl px-5 py-4 transition-colors duration-300 hover:bg-white/[0.12]"
                >
                  <span className="hover-signature-dim text-2xl font-bold tracking-[-0.02em]">
                    {l.label}
                  </span>
                </a>
              ))}
              <Button
                href={MEMBER_HREF}
                variant="signature"
                size="lg"
                className="mt-3"
                onClick={() => setOpen(false)}
              >
                Become a Member
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
