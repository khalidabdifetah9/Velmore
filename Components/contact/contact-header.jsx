"use client";

import { motion } from "framer-motion";
import FadeUp from "../Home/About/fade-up";
import WordReveal from "../Home/feature/word-reveal";
import VerticalTitle from "../Craftsmanship/vertical-title";

const headingWords = [
  { text: "Write" },
  { text: "to" },
  { text: "the" },
  { text: "atelier", italic: true },
];

const details = [
  {
    label: "Atelier",
    lines: ["14 Rue de la Source", "75003 Paris, France"],
  },
  {
    label: "Contact",
    lines: [
      { text: "atelier@velmora.com", href: "mailto:atelier@velmora.com" },
      { text: "+33 1 23 45 67 89", href: "tel:+33123456789" },
    ],
  },
  {
    label: "Hours",
    lines: ["Tuesday to Saturday", "10:00 – 19:00 CET"],
  },
];

export default function ContactHeader() {
  return (
    <section id="contact" className="relative bg-[#dedede]">
      <div className="flex">
        {/* Left: details */}
        <div className="min-w-0 flex-1 px-6 pb-16 pt-[16vh] md:px-12 md:pb-24">
          <div className="mb-5 flex items-center gap-3">
          
            <FadeUp delay={0.3}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-900">
                Get in touch
              </p>
            </FadeUp>
          </div>

          <WordReveal
            words={headingWords}
            delay={0.4}
            className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,4.4vw,4.5rem)] font-normal leading-[1.03] tracking-[-0.02em] text-neutral-950"
          />

          <FadeUp delay={0.55}>
            <p className="mt-6 max-w-[42ch] text-[13px] leading-[1.75] text-neutral-700 md:mt-8">
              Questions about a scent, a private consultation, or an order?
              A perfumer reads every message and replies within two working
              days.
            </p>
          </FadeUp>

          <div className="mt-12 grid max-w-[640px] gap-8 border-t border-neutral-400/50 pt-6 sm:grid-cols-3 md:mt-16">
            {details.map((d, i) => (
              <FadeUp key={d.label} delay={0.65 + i * 0.12}>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
                  {d.label}
                </p>
                <div className="space-y-1 text-[13px] leading-[1.6] text-neutral-950">
                  {d.lines.map((l) =>
                    typeof l === "string" ? (
                      <p key={l}>{l}</p>
                    ) : (
                      <p key={l.text}>
                        <a
                          href={l.href}
                          className="underline decoration-[#a8af7e] decoration-2 underline-offset-4 transition-colors hover:text-[#7d8458]"
                        >
                          {l.text}
                        </a>
                      </p>
                    )
                  )}
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={1.05} className="mt-10">
            <a
              href="#message"
              className="inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-900 underline decoration-[#a8af7e] decoration-2 underline-offset-[6px] transition-colors hover:text-[#7d8458]"
            >
              Send a message ↓
            </a>
          </FadeUp>
        </div>

        {/* Right: vertical "Contact", same treatment as the hero wordmark */}
        <div className="flex w-[17vw] shrink-0 justify-center pb-10 pt-[13vh] md:w-[11vw] md:pt-[11vh]">
          <VerticalTitle text="Contact" badge="@" />
        </div>
      </div>
    </section>
  );
}