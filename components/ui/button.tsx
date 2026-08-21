/**
 * In-page targets use a plain <a>, not next/link.
 *
 * next/link treats a hash-only href as a client-side route change: it updates
 * the URL and never performs the jump, so every anchor on this page silently
 * did nothing. A native anchor lets the browser do what it already does well,
 * including honouring `scroll-behavior: smooth`.
 */
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Buttons are set in Proxima Nova Semibold (06 TYPOGRAPHY) and finished in the
 * iOS-style glass material defined in globals.css.
 *
 *   signature — the brand gradient under a glass sheen; one per view
 *   glass     — the prominent translucent pane
 *   ghost     — the quieter pane, for secondary actions
 */

type Props = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "signature" | "glass" | "ghost" | "solid";
  size?: "md" | "lg";
  /** Widened to HTMLElement so the same handler works on both branches. */
  onClick?: React.MouseEventHandler<HTMLElement>;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] text-paper disabled:opacity-50 disabled:pointer-events-none";

const sizes = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-[3.25rem] px-7 text-base",
};

const variants = {
  signature: "glass-signature",
  glass: "glass glass-hover glass-bright",
  ghost: "glass glass-hover",
  /** kept as an alias so existing call sites keep working */
  solid: "glass glass-hover glass-bright",
};

export function Button({
  children,
  href,
  className,
  variant = "signature",
  size = "md",
  onClick,
  ...rest
}: Props) {
  const classes = cn(base, sizes[size], variants[variant], className);

  if (href) {
    // onClick has to reach the link too — the mobile menu closes itself from it.
    // Hash targets bypass next/link: it swallows the scroll (see note above).
    if (href.startsWith("#")) {
      return (
        <a href={href} className={classes} onClick={onClick}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
