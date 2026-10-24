"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeUp from "../Home/About/fade-up";
import WordReveal from "../Home/feature/word-reveal";
import Chapter from "./chapter";
import Vision from "./vision";
import { chapters } from "@/lib/craft-process";

const headingWords = [
  { text: "The" },
  { text: "art" },
  { text: "of" },
  { text: "perfume", italic: true },
  { text: "creation" },
];

export default function ArtOfCreation() {
  const [active, setActive] = useState(0);

  const goTo = (e, i) => {
    e.preventDefault();
    document
      .getElementById(`chapter-${i + 1}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="process" className="bg-white px-6 py-24 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-x-[6%]">
          {/* Left: stays pinned while the chapters scroll */}
          <aside className="md:sticky md:top-28 md:self-start">
            <div className="mb-5 flex items-center gap-3">
              <FadeUp>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-900">
                  The craft
                </p>
              </FadeUp>
            </div>

            <WordReveal
              words={headingWords}
              delay={0.1}
              className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,3.8vw,3.75rem)] font-normal leading-[1.03] tracking-[-0.02em] text-neutral-950"
            />

            <FadeUp delay={0.25}>
              <p className="mt-6 max-w-[40ch] text-[13px] leading-[1.8] text-neutral-700">
                A Velmora fragrance is not assembled from a trend report. It is
                written slowly by one perfumer, over six months or more, in four
                movements.
              </p>
            </FadeUp>

            {/* Chapter index */}
            <nav aria-label="Process chapters" className="mt-12 hidden md:block">
              <ul className="border-t border-neutral-200">
                {chapters.map((c, i) => (
                  <li key={c.number} className="border-b border-neutral-200">
                    <a
                      href={`#chapter-${i + 1}`}
                      onClick={(e) => goTo(e, i)}
                      className="group relative flex items-baseline gap-4 py-3.5"
                    >
                      
                      
                      <span
                        className={`font-[family-name:var(--font-display)] text-[18px] transition-colors duration-500 ${
                          active === i
                            ? "text-neutral-950"
                            : "text-neutral-400 group-hover:text-neutral-700"
                        }`}
                      >
                        {c.index}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Right: the narrative */}
          <div>
            {chapters.map((c, i) => (
              <Chapter
                key={c.number}
                data={c}
                index={i}
                active={active === i}
                onActive={setActive}
              />
            ))}
          </div>
        </div>

        <Vision />
      </div>
    </section>
  );
}