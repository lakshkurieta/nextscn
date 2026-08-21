"use client";

import dynamic from "next/dynamic";

/**
 * The product on a laptop, as the closing beat before the footer.
 *
 * Client-only and dynamically imported: it is tall, scroll-driven and the last
 * thing on the page, so there is no reason to ship it in the initial bundle.
 * `ssr: false` is why this wrapper exists at all — app/page.tsx is a Server
 * Component, and Next does not allow that option from one.
 */
const MacbookScroll = dynamic(
  () => import("@/components/ui/macbook-scroll").then((m) => m.MacbookScroll),
  { ssr: false },
);

export function LaptopShowcase() {
  return (
    <section
      aria-label="NEXT on the web"
      className="relative w-full overflow-hidden pt-8 pb-0 sm:pt-14 md:pt-32"
    >
      {/* a single restrained gradient seam marks the section change */}
      <div
        aria-hidden
        className="bg-signature absolute inset-x-0 top-0 h-px opacity-45"
      />
      <MacbookScroll
        src="/next-scn-screen.png"
        showGradient={false}
        badge={<span className="eyebrow text-paper/40">nextscn.com</span>}
        title={
          <span className="block">
            <span className="hover-signature cursor-default">
              Building a shared space that is ready for what&apos;s NEXT in
              supply chain.
            </span>
            <span className="mt-5 block text-3xl leading-snug font-normal text-paper/45 sm:mt-4 sm:text-2xl md:text-lg">
              One industry. No walls. One introduction away.
            </span>
          </span>
        }
      />
    </section>
  );
}
