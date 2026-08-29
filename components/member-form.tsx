"use client";

import { useForm, ValidationError } from "@formspree/react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { JOIN_AS, PILLAR_OPTIONS } from "@/data/membership";

/** Same Formspree endpoint as the home form; `_subject` distinguishes them. */
const FORMSPREE_ID = "xvkpykyd";

export function MemberForm() {
  const [formState, handleSubmit] = useForm(FORMSPREE_ID);
  const sent = formState.succeeded;

  return (
    <div className="mx-auto max-w-2xl px-5 sm:px-8">
      <Reveal>
        <p className="eyebrow text-teal">It&apos;s your turn NEXT.</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-5 text-[clamp(1.9rem,4.2vw,3rem)]">
          <span className="hover-signature cursor-default">Be part of the</span>{" "}
          <span className="text-signature">
            NEXT breakthrough in supply chain.
          </span>
        </h2>
      </Reveal>

      <Reveal delay={0.12}>
        <form className="relative mt-10" onSubmit={handleSubmit}>
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="pointer-events-none absolute h-0 w-0 opacity-0"
          />
          <input type="hidden" name="_subject" value="NEXT SCN founding application" />

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Full name" name="name" placeholder="Rima Ahmed" required />
            <TextField
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
            <TextField label="Organization" name="organization" placeholder="Acme Freight" required />
            <TextField
              label="Phone number"
              name="phone"
              type="tel"
              placeholder="+1 555 000 0000"
              required
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <SelectField label="I want to join as" name="joinAs" options={JOIN_AS} required />
            <SelectField label="Which pillar are you?" name="pillar" options={PILLAR_OPTIONS} required />
          </div>

          <div className="mt-4">
            <TextField label="Referred by (optional)" name="referredBy" placeholder="Who sent you?" />
          </div>

          <div className="mt-4">
            <label htmlFor="contribution" className="mb-2 block text-[0.8125rem] font-semibold text-paper/55">
              What would you bring NEXT to the table?
            </label>
            <textarea
              id="contribution"
              name="contribution"
              rows={4}
              required
              placeholder="An introduction you can make, a room you can open, a problem you've already solved…"
              className="glass w-full resize-none rounded-xl px-4 py-3.5 text-[0.9375rem] text-paper placeholder:text-paper/30 outline-none focus:border-teal/70"
            />
            {/* the deck calls this the most important line on the form */}
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-teal">
              Not what you want from the network. What you&apos;d bring to it. We
              read every answer, and it&apos;s the main thing we select on.
            </p>
            <ValidationError
              prefix="Message"
              field="contribution"
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
              {sent ? "Seat claimed" : formState.submitting ? "Sending…" : "Claim my seat"}
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
                Application received. We read every one personally.
              </motion.span>
            )}

            <ValidationError errors={formState.errors} className="text-[0.875rem] text-[#FF7E5F]" />
          </div>

          <p className="mt-5 text-[0.8125rem] text-paper/40">
            No spam, no list-selling. We&apos;ll only ever contact you about
            someone you should meet.
          </p>
        </form>
      </Reveal>
    </div>
  );
}

function TextField({
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
      <label htmlFor={name} className="mb-2 block text-[0.8125rem] font-semibold text-paper/55">
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

function SelectField({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[0.8125rem] font-semibold text-paper/55">
        {label}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        className="glass h-12 w-full appearance-none rounded-xl px-4 text-[0.9375rem] text-paper outline-none focus:border-teal/70"
      >
        <option value="" disabled className="bg-ink text-paper">
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-ink text-paper">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
