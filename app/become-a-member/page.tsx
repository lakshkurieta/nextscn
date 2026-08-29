import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MemberForm } from "@/components/member-form";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { ArrowLeft, Check } from "lucide-react";
import {
  FOUNDING_MEMBER_DOES,
  FOUNDING_BOARD_DOES,
  TIERS,
} from "@/data/membership";

export const metadata: Metadata = {
  title: "Become a Member",
  description:
    "We're not recruiting members yet. We're recruiting founders. Fifty people across six industries who want to build NEXT rather than attend it.",
  alternates: { canonical: "/become-a-member" },
};

export default function BecomeAMemberPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ---------- opening ---------- */}
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-[20%] left-1/2 -z-10 h-[60vw] max-h-[700px] w-[110vw] -translate-x-1/2 opacity-[0.5]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(229,69,126,0.45), rgba(165,55,200,0.26) 44%, transparent 80%)",
            }}
          />
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            {/*
              A real link to "/" rather than history.back(): this page is linked
              from the hero and the nav and gets shared directly, so there is
              often no history entry to go back to.
            */}
            <Reveal>
              <Button href="/" variant="ghost" className="mb-8">
                <ArrowLeft size={16} />
                Back to home
              </Button>
            </Reveal>
            <Reveal>
              <p className="eyebrow text-teal">
                We&apos;re not recruiting members yet. We&apos;re recruiting
                founders.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-6 max-w-[20ch] text-[clamp(2.4rem,6vw,4.6rem)] font-black">
                <span className="hover-signature cursor-default">
                  Be the force that drives NEXT.
                </span>{" "}
                <span className="text-signature">The choice is yours.</span>
              </h1>
            </Reveal>

            <div className="mt-10 max-w-[58ch]">
              <Reveal delay={0.12}>
                <p className="text-lg text-paper/65">
                  Most organizations launch, then look for members. We&apos;re
                  doing it the other way round.
                </p>
                <p className="mt-5 text-paper/50">
                  Before the first event, before the first chapter, before the
                  website is even finished, we&apos;re finding fifty people
                  across six industries who want to build this rather than
                  attend it.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- what each role actually does ---------- */}
        <section className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-4 md:grid-cols-2">
              <RoleCard
                label="What a founding member actually does"
                items={FOUNDING_MEMBER_DOES}
              />
              <RoleCard
                label="What a founding board member actually does"
                items={FOUNDING_BOARD_DOES}
              />
            </div>

            {/*
              This sits under the two role cards rather than in the opening: it
              is what the two roles add up to, so it only lands once the reader
              knows what they are.
            */}
            <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-14">
              <Reveal delay={0.06}>
                <p className="text-paper/50">
                  Everyone who joins after year one joins something that already
                  exists. The first fifty build the thing itself, the pillars,
                  the standards, the first rooms, the culture.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="font-semibold text-paper">
                  That&apos;s not a marketing line. It&apos;s a job description.
                  We&apos;re looking for people willing to make introductions
                  before they ask for one, and to put their name on something
                  before it&apos;s safe to.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- tiers ---------- */}
        <section className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            {/* The deck is explicit: state the nesting or the two cards read as
                a contradiction. */}
            <Reveal>
              <p className="mx-auto max-w-[46ch] text-center text-[clamp(1.1rem,2.4vw,1.6rem)] font-bold tracking-[-0.02em] text-balance text-paper">
                The first 50 become Founding Members. The first 20 of those
                become Founding Members for life.
              </p>
            </Reveal>

            <RevealGroup className="mt-12 grid gap-4 lg:grid-cols-3">
              {TIERS.map((t) => (
                <Reveal
                  key={t.name}
                  className={
                    t.featured
                      ? "border-teal/35 bg-teal/[0.05] relative flex flex-col rounded-2xl border p-8"
                      : "relative flex flex-col rounded-2xl border border-white/[0.09] bg-white/[0.015] p-8"
                  }
                >
                  <p className={t.featured ? "eyebrow text-teal" : "eyebrow text-paper/40"}>
                    {t.eyebrow}
                  </p>
                  <h2 className="mt-4 text-[1.5rem] font-bold tracking-[-0.02em] text-paper">
                    {t.name}
                  </h2>
                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="text-[2rem] font-black tracking-[-0.04em] text-paper">
                      {t.price}
                    </span>
                    <span className="text-[0.875rem] text-paper/45">{t.priceNote}</span>
                  </p>
                  {t.inherits && (
                    <p className="mt-4 text-[0.875rem] font-semibold text-paper/60">
                      {t.inherits}
                    </p>
                  )}
                  <ul className="mt-5 space-y-3">
                    {t.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <Check
                          size={16}
                          className={t.featured ? "text-teal mt-1 shrink-0" : "mt-1 shrink-0 text-paper/35"}
                        />
                        <span className="text-[0.9375rem] leading-relaxed text-paper/70">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </RevealGroup>

            <Reveal className="mt-12">
              <p className="mx-auto max-w-[54ch] text-center text-lg text-balance text-paper/55">
                If you&apos;ve ever left a conference thinking “the person I
                needed wasn&apos;t in the room”, this is being built by people
                who felt the same thing, and decided to fix it.
              </p>
            </Reveal>

            <Reveal className="mt-10 flex justify-center">
              <Button href="#apply" size="lg" variant="signature">
                Apply to join
              </Button>
            </Reveal>
          </div>
        </section>

        {/* ---------- application form ---------- */}
        <section id="apply" className="relative scroll-mt-24 py-16 sm:py-24">
          <div aria-hidden className="bg-signature absolute inset-x-0 top-0 h-px opacity-45" />
          <MemberForm />
        </section>
      </main>
      <Footer />
    </>
  );
}

function RoleCard({ label, items }: { label: string; items: string[] }) {
  return (
    <Reveal className="rounded-2xl border border-white/[0.09] bg-white/[0.015] p-8">
      <p className="eyebrow text-teal">{label}</p>
      <ul className="mt-6 space-y-3.5">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-3">
            <Check size={17} className="text-teal mt-1 shrink-0" />
            <span className="text-[1.0625rem] text-paper/75">{i}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
