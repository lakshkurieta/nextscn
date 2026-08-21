"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Cookie } from "lucide-react";

/**
 * Non-blocking cookie notice, bottom-left.
 *
 * A few deliberate choices:
 *
 *   - It is a `region`, not a `dialog`. The page stays usable behind it, so
 *     announcing it as a dialog would wrongly imply a modal that traps focus.
 *
 *   - The choice is read in an effect rather than during render. localStorage
 *     does not exist on the server, so reading it while rendering would either
 *     break SSR or hydrate to a different tree than the server produced.
 *
 *   - It reveals on a short timer instead of setting state straight away. That
 *     avoids it flashing in over the hero on first paint, and keeps the state
 *     update inside an async callback, which React 19's cascading-render rule
 *     requires.
 *
 *   - Every localStorage call is wrapped: it throws outright in Safari private
 *     mode and when a browser blocks site data, and an unhandled throw here
 *     would take the page down over a cookie banner.
 */

const STORAGE_KEY = "next-scn:cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let decided: string | null = null;
    try {
      decided = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // storage blocked; show the notice rather than assume consent
    }
    if (decided) return;

    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  const decide = (choice: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // nothing to persist to; just dismiss for this session
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          role="region"
          aria-label="Cookie notice"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="glass fixed right-4 bottom-4 left-4 z-[60] rounded-2xl p-5 sm:right-auto sm:bottom-6 sm:left-6 sm:max-w-sm"
        >
          <div className="flex items-start gap-3">
            <span className="bg-signature mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
              <Cookie size={16} className="text-paper" />
            </span>
            <div>
              <p className="text-[0.9375rem] font-semibold text-paper">
                We use cookies
              </p>
              <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-paper/55">
                A few help the site run, the rest tell us what people find
                useful. You choose.{" "}
                <a
                  href="#"
                  className="text-teal underline-offset-2 hover:underline"
                >
                  Privacy
                </a>
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => decide("accepted")}
              className="glass-signature h-9 flex-1 rounded-full text-[0.875rem] font-semibold text-paper"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => decide("declined")}
              className="glass glass-hover h-9 flex-1 rounded-full text-[0.875rem] font-semibold text-paper/80"
            >
              Decline
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
