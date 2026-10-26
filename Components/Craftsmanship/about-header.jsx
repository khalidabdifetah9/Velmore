"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeUp from "../Home/About/fade-up";
import RevealImage from "../Home/About/reveal-image";
import WordReveal from "../Home/feature/word-reveal";
import VerticalTitle from "./vertical-title";

const headingWords = [
  { text: "A" },
  { text: "house" },
  { text: "of" },
  { text: "unhurried", italic: true },
  { text: "makers" },
];

const facts = [
  { value: "2019", label: "Founded in Paris" },
  { value: "90", label: "Days of rest per batch" },
  { value: "06", label: "Signature scents" },
];

export default function AboutHeader() {
  return (
    <section id="about" className="relative min-h-screen bg-[#ebebe8]">
      <div className="flex min-h-screen">
        {/* LEFT: store image + information */}
        <div className="flex min-w-0 flex-1 flex-col md:flex-row">
          {/* Store image, full screen height on desktop */}
          <div className="relative h-[52svh] shrink-0 md:h-auto md:w-[42%]">
            <div className="absolute inset-0">
              <RevealImage
                src="/About/Velmore_Store.avif"
                alt="The Velmora atelier and store in Paris"
                direction="right"
                parallax={5}
                sizes="(max-width: 768px) 80vw, 42vw"
                className="h-full w-full"
              />
            </div>
            {/* Keeps the logo readable over the photo */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-black/35 to-transparent" />
          </div>

          {/* Information */}
          <div className="flex flex-1 flex-col justify-between gap-14 px-5 pb-12 pt-10 md:px-[5%] md:pb-14 md:pt-[16vh]">
            <div>
          

              <WordReveal
                words={headingWords}
                delay={0.4}
                className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.4vw,3.6rem)] font-normal leading-[1.04] tracking-[-0.02em] text-neutral-950"
              />
            </div>

            <div className="max-w-[460px]">
              <FadeUp delay={0.2} className="space-y-4 text-[12.5px] leading-[1.75] text-neutral-700 md:text-[13px]">
                <p>
                  Velmora is an independent perfume house that began in a
                  one-room Paris studio with a single resin and a stubborn
                  idea: a fragrance should take exactly as long as its
                  ingredients need.
                </p>
                <p>
                  Every composition is built by two perfumers, blended in small
                  batches, rested for ninety days and numbered by hand. We keep
                  the house small on purpose, so nothing leaves the atelier
                  before it is finished.
                </p>
              </FadeUp>

              <FadeUp delay={0.35} className="mt-9 grid grid-cols-3 gap-4 border-t border-neutral-400/50 pt-5">
                {facts.map((f) => (
                  <div key={f.label}>
                    <p className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,2.4vw,2.4rem)] leading-none text-neutral-950">
                      {f.value}
                    </p>
                    <p className="mt-2 text-[10px] uppercase leading-snug tracking-[0.16em] text-neutral-600">
                      {f.label}
                    </p>
                  </div>
                ))}
              </FadeUp>

             
            </div>
          </div>
        </div>

        <div className="flex w-[17vw] shrink-0 justify-center pt-[13vh] md:w-[11vw] md:pt-[11vh]">
          <VerticalTitle text="About" badge="01" />
        </div>
      </div>
    </section>
  );
}