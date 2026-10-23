"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeUp from "./fade-up";
import SplitHeading from "./split-heading";
import RevealImage from "./reveal-image";
import { aboutTall, aboutSmall } from "@/lib/images";

export default function About() {
  return (
    <section id="about" className="bg-white px-6 py-24 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[19fr_20fr_15fr] md:gap-x-[2.5%] md:gap-y-0">
        {/* Column 1: text, top and bottom aligned to the tall image */}
        <div className="flex flex-col justify-between gap-16 md:gap-10">
          <div>
            {/* Label with self-drawing accent line */}
            <div className="mb-5 flex items-center gap-3">
              <FadeUp>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-900">
                  The House
                </p>
              </FadeUp>
            </div>

            <SplitHeading
              lines={["Composed slowly", "where the materials", "set the pace"]}
              className="text-[clamp(1.9rem,2.7vw,2.75rem)] font-bold capitalize font-[family-name:var(--font-display)] leading-[1.2] tracking-[-0.03em] text-neutral-950"
            />
          </div>

          <div>
            <FadeUp delay={0.2}>
              <p className="max-w-[34ch] text-[13px] leading-[1.75] text-neutral-700">
                Velmora began in a one-room studio with a single resin and a
                stubborn idea: a perfume should take exactly as long as its
                ingredients need. Every batch is blended by two perfumers,
                rested for ninety days, and numbered by hand before it leaves.
              </p>
            </FadeUp>

            <FadeUp delay={0.35} className="mt-8 flex items-center gap-7">
              <Link
                href="#craftsmanship"
                className="group relative overflow-hidden border border-neutral-900 px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-neutral-900 transition-colors duration-500 hover:border-[#a8af7e]"
              >
                <span className="absolute inset-0 -translate-x-full bg-[#a8af7e] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative">Our atelier</span>
              </Link>

              <Link
                href="#story"
                className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-neutral-900"
              >
                Read the story
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

        {/* Column 2: tall image, wipes upward */}
        <RevealImage
          src={aboutTall}
          alt="Perfumer blending oils at the Velmora atelier"
          direction="up"
          sizes="(max-width: 768px) 100vw, 34vw"
          className="aspect-[2/3] w-full"
        />

        {/* Column 3: small image, wipes left to right, a beat later */}
        <RevealImage
          src={aboutSmall}
          alt="Velmora bottle detail"
          direction="right"
          delay={0.35}
          parallax={5}
          sizes="(max-width: 768px) 60vw, 25vw"
          className="ml-auto aspect-square w-3/5 self-start md:ml-0 md:w-full"
        />
      </div>
    </section>
  );
}
