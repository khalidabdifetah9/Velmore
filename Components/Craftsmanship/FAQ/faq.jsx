"use client";

import FadeUp from "@/Components/Home/About/fade-up";
import WordReveal from "@/Components/Home/feature/word-reveal";
import FaqCard from "./faq-card";
import { faqs } from "@/lib/faqs";

// Grid positions on desktop: same staggered rhythm as the reference
const slots = [
  "lg:col-start-1 lg:row-start-1",
  "lg:col-start-2 lg:row-start-1",
  "lg:col-start-1 lg:row-start-2",
  "lg:col-start-3 lg:row-start-2",
  "lg:col-start-2 lg:row-start-3",
  "lg:col-start-3 lg:row-start-3",
];

const headingWords = [
  { text: "Questions" },
  { text: "we" },
  { text: "are" },
  { text: "often", italic: true },
  { text: "asked" },
];

const noteStyle =
  "self-start max-w-[26rem] text-[15px] leading-[1.65] text-neutral-950 lg:pl-[14.5%] lg:pt-[13%] lg:text-[17px]";

export default function Faq() {
  return (
    <section
      id="faq"
      className="  px-6 py-24 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-[1670px]">
        {/* Header (delete this block for the bare grid, like the reference) */}
        <header className="mb-14 md:mb-20 md:px-40">
          <FadeUp>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-900">
              FAQ
            </p>
          </FadeUp>
          <WordReveal
            words={headingWords}
            delay={0.15}
            className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,4.4vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.02em] text-neutral-950"
          />
        </header>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-[25px]">
          {/* Intro text, top-right slot */}
          <FadeUp delay={0.2} className={`${noteStyle} lg:col-start-3 lg:row-start-1`}>
            Questions · Paris · 2026. What collectors ask us most about how
            Velmora is made, where its materials come from and how to know your
            bottle is genuine.
          </FadeUp>

          {faqs.map((item, i) => (
            <FaqCard key={item.q} item={item} index={i} className={slots[i]} />
          ))}

          {/* Contact line, bottom-left slot */}
          <FadeUp delay={0.2} className={`${noteStyle} lg:col-start-1 lg:row-start-3`}>
            Still curious?{" "}
            <a
              href="mailto:atelier@velmora.com"
              className="underline decoration-[#a8af7e] decoration-2 underline-offset-4 transition-colors hover:text-[#7d8458]"
            >
              Write to the atelier
            </a>{" "}
            and a perfumer will reply within two days.
          </FadeUp>
        </div>
      </div>
    </section>
  );
}