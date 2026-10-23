"use client";

import { useState } from "react";
import Link from "next/link";
import FadeUp from "../About/fade-up";
import WordReveal from "./word-reveal";
import NoteVisual from "./note-visual";
import NoteTabs from "./note-tabs";
import { notes } from "@/lib/notes";

const headingWords = [
  { text: "Three" },
  { text: "acts" },
  { text: "of" },
  { text: "a" },
  { text: "single", italic: true },
  { text: "obsession" },
];

export default function Feature() {
  const [active, setActive] = useState(0);

  return (
    <section id="notes" className="bg-white px-6 py-24 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <header className="md:max-w-[62%]">
          <FadeUp>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-900">
              Anatomy
            </p>
          </FadeUp>
          <WordReveal
            words={headingWords}
            delay={0.15}
            className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,4.4vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.02em] text-neutral-950"
          />
        </header>

        {/* Visual (left) + interactive notes (right) */}
        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-[1.05fr_1fr] md:items-end md:gap-x-[4%]">
          <NoteVisual note={notes[active]} index={active} total={notes.length} />

          <div className="max-w-[460px]">
            <FadeUp>
              <p className="mb-9 max-w-[38ch] text-[13px] leading-[1.75] text-neutral-700">
                Press a layer to follow the signature scent as it unfolds on
                skin, from the first spray to the last trace on your collar.
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <NoteTabs notes={notes} active={active} onChange={setActive} />
            </FadeUp>

            <FadeUp delay={0.3} className="mt-10 flex items-center gap-7">
              <Link
                href="#collection"
                className="group relative overflow-hidden border border-neutral-900 px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-neutral-900 transition-colors duration-500 hover:border-[#a8af7e]"
              >
                <span className="absolute inset-0 -translate-x-full bg-[#a8af7e] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative">Explore</span>
              </Link>

              <Link
                href="/notes"
                className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-neutral-900"
              >
                Notes
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}