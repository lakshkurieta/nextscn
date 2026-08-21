import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * NEXT logo (04 LOGO) — the master artwork.
 *
 * "The NEXT mark pairs a bold wordmark with a linked 'X' that resolves into an
 *  upward arrow — two links joining to point forward."
 *
 * Assets are derived from `NEXT SCN LOGO.png` by `mklogo.mjs` (re-run it if the
 * master changes). The wordmark and descriptor are neutral ink in the original,
 * so the reversed lockup recolours only those to white and leaves the linked-X
 * in full colour — the documented treatment for Ink Black and Deep Blue grounds.
 *
 * Clearspace: keep a margin equal to the arrowhead's height on all sides.
 * Minimum digital size: 120px wide for the full lockup (wordmark + descriptor).
 */

const LOCKUP = {
  primary: "/next-scn-logo.png",
  reversed: "/next-scn-logo-reversed.png",
  width: 1600,
  height: 718,
} as const;

const ICON = {
  primary: "/next-scn-icon.png",
  reversed: "/next-scn-icon-reversed.png",
  width: 512,
  height: 550,
} as const;

type Variant = "reversed" | "primary";

/** The linked-X alone — for favicons, avatars, and tight placements. */
export function LogoMark({
  className,
  variant = "reversed",
}: {
  className?: string;
  variant?: Variant;
}) {
  return (
    <Image
      src={ICON[variant]}
      alt=""
      aria-hidden
      width={ICON.width}
      height={ICON.height}
      className={cn("h-8 w-auto", className)}
    />
  );
}

/** The full lockup. Never separate the descriptor from the wordmark. */
export function Logo({
  className,
  variant = "reversed",
  priority = false,
}: {
  className?: string;
  variant?: Variant;
  priority?: boolean;
}) {
  return (
    <Image
      src={LOCKUP[variant]}
      alt="NEXT Supply Chain Network"
      width={LOCKUP.width}
      height={LOCKUP.height}
      priority={priority}
      /* 128px clears the 120px minimum for the full lockup. */
      className={cn("h-auto w-32", className)}
    />
  );
}
