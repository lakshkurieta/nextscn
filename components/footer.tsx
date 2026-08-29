import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionLink } from "@/components/ui/section-link";

/**
 * 07 IN USE — the reversed lockup on the signature gradient.
 *
 * Deliberately compact: a finishing band rather than a full-height section.
 * The gradient, the reversed lockup and the primary tagline all carry over from
 * the banner treatment; what shrinks is the scale — the tagline runs as a
 * single line at body size instead of a display headline, and the three link
 * columns collapse into one inline row.
 *
 * Link text is solid white at varying opacity rather than the gradient-on-hover
 * treatment used elsewhere on the site — that would be invisible on this ground.
 */

const LINKS = [
  { label: "What's NEXT", href: "#about" },
  { label: "When NEXT", href: "#network" },
  { label: "Connect", href: "#contact" },
  { label: "Become a Member", href: "/become-a-member" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-signature relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_160%_at_10%_0%,rgba(255,255,255,0.24),transparent_58%)]"
      />
      <div
        aria-hidden
        className="noise absolute inset-0 opacity-[0.09] mix-blend-overlay"
      />
      <Image
        src="/next-scn-icon-reversed.png"
        alt=""
        aria-hidden
        width={512}
        height={550}
        className="pointer-events-none absolute -top-8 -right-10 h-[150%] w-auto opacity-[0.08] select-none"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          {/* brand */}
          <div className="shrink-0">
            <Image
              src="/next-scn-logo-reversed.png"
              alt="NEXT Supply Chain Network"
              width={1600}
              height={718}
              className="h-auto w-32"
            />
            <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-paper/80">
              <span className="font-black text-paper">NEXT SCN</span> is a global
              supply chain network bringing together the people, businesses,
              ideas, and technology shaping what comes next.{" "}
              <span className="font-black text-paper">
                Connect. Learn. Collaborate. Grow.
              </span>
            </p>
          </div>

          {/* nav + cta */}
          <div className="flex flex-col gap-6 lg:items-end">
            <nav className="flex flex-wrap gap-x-7 gap-y-2.5 lg:justify-end">
              {LINKS.map((l) => (
                <SectionLink
                  key={l.label}
                  href={l.href}
                  className="text-[0.875rem] text-paper/75 transition-colors duration-300 hover:text-paper"
                >
                  {l.label}
                </SectionLink>
              ))}
            </nav>

            <SectionLink
              href="#contact"
              className="group inline-flex items-center gap-2 self-start text-[0.9375rem] font-semibold text-paper lg:self-end"
            >
              Meet your NEXT
              <span className="glass glass-hover flex h-7 w-7 items-center justify-center rounded-full">
                <ArrowUpRight size={14} />
              </span>
            </SectionLink>
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 pt-5">
          <p className="text-[0.75rem] text-paper/60">
            © {new Date().getFullYear()} NEXT Supply Chain Network. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
