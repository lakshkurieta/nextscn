"use client";

import { usePathname } from "next/navigation";

/**
 * Section links point at the home page, so a bare "#about" only works while the
 * reader is already on it. From any other route the browser resolves that hash
 * against the current document, finds nothing, and the click does nothing at
 * all — which is exactly what the nav and footer links did on
 * /become-a-member. Off-home they have to carry the route too.
 *
 * A plain anchor, not next/link: next/link treats a hash href as a route change
 * it can satisfy without moving, and swallows the jump (see components/ui/button.tsx).
 */
export function useSectionHref() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  return (href: string) => {
    // "#" on its own is a placeholder for a page that does not exist yet
    // (Privacy, Terms). Rewriting it to "/#" would turn a dead link into one
    // that navigates home, which is worse than doing nothing.
    if (onHome || href === "#" || !href.startsWith("#")) return href;
    return `/${href}`;
  };
}

export function SectionLink({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const resolve = useSectionHref();
  return (
    <a href={resolve(href)} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
