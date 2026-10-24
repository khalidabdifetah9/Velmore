"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FadeUp from "../Home/About/fade-up";
import { principles } from "@/lib/craft-process";

const EASE = [0.22, 1, 0.36, 1];

const quoteLines = [
  "A perfume should never announce itself.",
  "It should be what people remember about",
  "a room after you have left it.",
];

export default function Vision() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <div className="mt-24 border-t border-neutral-200 pt-14 md:mt-36 md:pt-24">
      <FadeUp>
        <p className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-900">
          Our vision
        </p>
      </FadeUp>

      {/* Quote, rising line by line out of its mask */}
      <blockquote ref={ref} aria-label={quoteLines.join(" ")}>
        <p
          aria-hidden="true"
          className="max-w-[920px] font-[family-name:var(--font-display)] text-[clamp(1.9rem,4.2vw,4rem)] italic leading-[1.1] tracking-[-0.02em] text-neutral-950"
        >
          {quoteLines.map((line, i) => (
            <span
              key={line}
              className="block overflow-hidden py-[0.06em] -my-[0.06em]"
            >
              <motion.span
                className="block"
                initial={{ y: "115%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 1.1, delay: i * 0.14, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </p>
      </blockquote>

      <FadeUp delay={0.3} className="mt-8 flex items-center gap-3">
        <p className="text-[12px] text-neutral-900">
          <span className="font-bold">Élise Marchand</span>
          <span className="text-neutral-500"> · Master Perfumer, Velmora</span>
        </p>
      </FadeUp>

      {/* Principles */}
    </div>
  );
}
