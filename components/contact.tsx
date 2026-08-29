"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowRight, Mail, MapPin, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { arcs, mapLanes } from "@/data/arcs";
import { ErrorBoundary, canUseWebGL } from "@/components/ui/error-boundary";
import type { GlobeConfig } from "@/components/ui/globe";

/** WebGL is client-only and heavy — split it out so it never blocks the page. */
const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="border-teal/25 border-t-teal h-14 w-14 animate-spin rounded-full border-2" />
      </div>
    ),
  },
);

/**
 * Shown when WebGL is unavailable or the renderer fails. The flat map is plain
 * SVG/DOM, so it carries the same "lanes across the world" idea with no GPU
 * involvement at all.
 */
const FlatMapFallback = dynamic(() => import("@/components/ui/world-map"), {
  ssr: false,
});

/** Deep Blue globe, Signature Teal atmosphere (07 IN USE). */
const globeConfig: GlobeConfig = {
  pointSize: 3,
  globeColor: "#010080",
  showAtmosphere: true,
  atmosphereColor: "#3FE0D0",
  atmosphereAltitude: 0.14,
  emissive: "#010080",
  emissiveIntensity: 0.16,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.55)",
  ambientLight: "#3FE0D0",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1400,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3, lng: 55.3 },
  autoRotate: true,
  autoRotateSpeed: 0.6,
};

/** lucide-react no longer ships brand glyphs, so the LinkedIn mark is inline. */
function LinkedInIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

/**
 * ⚠️ PLACEHOLDER — the brief says this button should open Vikrant's Calendly,
 * but the link was not supplied. Drop the real URL in here and the button
 * works; while it is empty the form just confirms without opening anything.
 */
/** Formspree form id — the tail of https://formspree.io/f/xvkpykyd */
const FORMSPREE_ID = "xvkpykyd";

const BOOKING_URL = "";

const ROLES = [
  "Operator",
  "Founder",
  "Investor",
  "Partner / vendor",
  "Something else",
];

export function Contact() {
  /**
   * Formspree handles the submission. `handleSubmit` serialises the form by the
   * `name` attribute of each field, so those names are what land in the
   * notification email.
   */
  const [formState, handleSubmit] = useForm(FORMSPREE_ID);
  const sent = formState.succeeded;

  /**
   * The globe is only mounted once it is close to the viewport.
   *
   * Without this, three.js loads and a WebGL context renders continuously from
   * page load — hex polygons, animated arcs and rings, every frame — while the
   * visitor is still up in the hero. Gating it recovers that cost for the whole
   * first screen, and the 300px margin means it is ready before it scrolls in.
   */
  const stageRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<"idle" | "webgl" | "flat">("idle");

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    // No capability fallback: IntersectionObserver is baseline in every browser
    // Next 16 supports, and the framework already depends on it for next/image
    // and link prefetching. A synchronous setState fallback here would also trip
    // React 19's cascading-render rule.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Probe here rather than on mount: it is the latest safe moment, and
          // it keeps the setState inside an async callback where React 19's
          // cascading-render rule allows it.
          setStage(canUseWebGL() ? "webgl" : "flat");
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden pt-8 pb-28 sm:pt-10 sm:pb-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 bottom-0 -z-10 h-[52vw] w-[70vw]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(1,0,128,0.45), rgba(1,0,128,0.14) 55%, transparent 80%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/*
          On mobile the running order is Title -> Globe -> Description -> Form,
          which is just DOM order here. The desktop two-column layout is
          restored with explicit grid placement rather than `order-*`: the title
          and the body both sit in column 1 (rows 1 and 2) while the globe spans
          both rows in column 2.
        */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-10">
          {/* ---------- Title ---------- */}
          <div className="lg:col-start-1 lg:row-start-1">
            <Reveal>
              <p className="eyebrow text-teal">Learn more</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-[clamp(2.1rem,4.6vw,3.4rem)]">
                <span className="hover-signature cursor-default">You&apos;re one</span>
                <br />
                <span className="text-signature">introduction away.</span>
              </h2>
            </Reveal>
          </div>

          {/* ---------- Globe ---------- */}
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto aspect-square w-full max-w-[620px]"
            >
              {/* teal halo behind the sphere */}
              <div
                aria-hidden
                className="absolute inset-[8%]"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(63,224,208,0.18), rgba(63,224,208,0.06) 55%, transparent 78%)",
                }}
              />
              {/*
                The globe's base is faded with a mask on the canvas itself, not
                with an Ink Black panel laid over it. An overlay is opaque to
                everything behind it — including the teal halo above — so its
                rectangular edges showed as a dark box against the round glow.
                Masking removes only the globe's own pixels and leaves the halo
                and the section background untouched.
              */}
              <div
                ref={stageRef}
                className="absolute inset-0 [-webkit-mask-image:linear-gradient(to_bottom,#000_68%,transparent_94%)] [mask-image:linear-gradient(to_bottom,#000_68%,transparent_94%)]"
              >
                {stage === "webgl" && (
                  <ErrorBoundary fallback={<FlatMapStandIn />}>
                    <World globeConfig={globeConfig} data={arcs} />
                  </ErrorBoundary>
                )}
                {stage === "flat" && <FlatMapStandIn />}
              </div>
            </motion.div>
          </div>

          {/* ---------- Description + form ---------- */}
          <div className="lg:col-start-1 lg:row-start-2">
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-paper/55">
                Want to know more what NEXT is about, still have questions? Fill
                out this quick form below and someone from our team will get in
                touch with you shortly to explain to you further.
              </p>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.18}>
              <form
                className="relative mt-10 max-w-lg"
                onSubmit={async (e) => {
                  await handleSubmit(e);
                  // The booking link opens AFTER the send, so a popup blocker
                  // or a failed submission can never lose the enquiry.
                  if (BOOKING_URL) {
                    window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                {/* Bot trap: Formspree discards any submission that fills this
                    in, so it must stay in the DOM but out of the tab order and
                    hidden from assistive tech. */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="pointer-events-none absolute h-0 w-0 opacity-0"
                />
                <input
                  type="hidden"
                  name="_subject"
                  value="New NEXT SCN enquiry"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" placeholder="Rima Ahmed" required />
                  <Field
                    label="Work email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                  />
                </div>
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={formState.errors}
                  className="mt-2 block text-[0.8125rem] text-[#FF7E5F]"
                />
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Company" name="company" placeholder="Acme Freight" />
                  <div>
                    <label
                      htmlFor="role"
                      className="mb-2 block text-[0.8125rem] font-semibold text-paper/55"
                    >
                      I am a
                    </label>
                    <select
                      id="role"
                      name="role"
                      defaultValue={ROLES[0]}
                      className="glass h-12 w-full appearance-none rounded-xl px-4 text-[0.9375rem] text-paper outline-none focus:border-teal/70"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r} className="bg-ink text-paper">
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[0.8125rem] font-semibold text-paper/55"
                  >
                    What ideas will you bring to NEXT?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="A cold-chain operator in Southeast Asia…"
                    className="glass w-full resize-none rounded-xl px-4 py-3.5 text-[0.9375rem] text-paper placeholder:text-paper/30 outline-none focus:border-teal/70"
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={formState.errors}
                    className="mt-2 block text-[0.8125rem] text-[#FF7E5F]"
                  />
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    variant="signature"
                    disabled={formState.submitting || sent}
                  >
                    {sent
                      ? "Request received"
                      : formState.submitting
                        ? "Sending…"
                        : "Claim my seat"}
                    {sent ? (
                      <Check size={17} />
                    ) : (
                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    )}
                  </Button>

                  {sent && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[0.875rem] text-teal"
                    >
                      Thanks. Someone from our team will be in touch shortly.
                    </motion.span>
                  )}

                  {/* form-level failures: network, rate limit, blocked */}
                  <ValidationError
                    errors={formState.errors}
                    className="text-[0.875rem] text-[#FF7E5F]"
                  />
                </div>
              </form>
            </Reveal>

            {/* Direct channels */}
            <Reveal delay={0.24}>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/[0.08] pt-8">
                {[
                  { icon: Mail, label: "info@nextscn.com", href: "mailto:info@nextscn.com" },
                  { icon: LinkedInIcon, label: "NEXT on LinkedIn", href: "#" },
                  { icon: MapPin, label: "Vancouver, Canada | Indiana, US", href: undefined },
                ].map((c) => {
                  const Inner = (
                    <span className="group hover-signature-dim inline-flex items-center gap-2.5 text-[0.9375rem]">
                      <c.icon size={16} className="text-teal" />
                      {c.label}
                    </span>
                  );
                  return c.href ? (
                    <a key={c.label} href={c.href}>
                      {Inner}
                    </a>
                  ) : (
                    <span key={c.label}>{Inner}</span>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/** DOM-only stand-in for the globe. */
function FlatMapStandIn() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <FlatMapFallback
        dots={mapLanes}
        lineColor="#3FE0D0"
        dotColor="rgba(63,224,208,0.4)"
        className="w-full max-w-none"
      />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[0.8125rem] font-semibold text-paper/55"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="glass h-12 w-full rounded-xl px-4 text-[0.9375rem] text-paper placeholder:text-paper/30 outline-none focus:border-teal/70"
      />
    </div>
  );
}
