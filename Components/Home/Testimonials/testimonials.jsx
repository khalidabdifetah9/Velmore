"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import FadeUp from "../About/fade-up";
import WordReveal from "../feature/word-reveal";
import TestimonialSlide from "./testimonial-slide";
import { enter, LEN } from "./timing";
import { testimonials } from "@/lib/testimonials";

const pad = (n) => String(n).padStart(2, "0");

const headingWords = [
  { text: "Worn" },
  { text: "daily," },
  { text: "remembered", italic: true },
  { text: "always" },
];

export default function Testimonials() {
  const ref = useRef(null);
  const total = testimonials.length;
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Smoothing layer for the overlap
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.5,
  });

  const bar = useTransform(progress, [0, 0.82], [1 / total, 1]);

  useMotionValueEvent(progress, "change", (p) => {
    let idx = 0;
    for (let k = 1; k < total; k++) {
      if (p >= enter(k)[0] + LEN * 0.5) idx = k;
    }
    setActive((prev) => (prev === idx ? prev : idx));
  });

  return (
    <section
      ref={ref}
      id="testimonials"
      className="relative border-t border-neutral-200 bg-white"
      style={{ height: `${(total + 1) * 100}vh` }}
    >
      {/* Locked stage: same side padding as About and Feature */}
      <div className="sticky top-0 h-screen w-full overflow-hidden px-6 pb-8 pt-24 md:px-12 md:pb-10 md:pt-28">
        <div className="mx-auto flex h-full max-w-[1200px] flex-col">
          {/* Header, same style as Collection */}
          <header>
            <FadeUp>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-900">
                Testimonial
              </p>
            </FadeUp>
            <WordReveal
              words={headingWords}
              delay={0.15}
              className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,4.4vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.02em] text-neutral-950"
            />
          </header>

          {/* Only photo + quote overlap here */}
          <div className="relative mt-8 min-h-0 flex-1 md:mt-10">
            {testimonials.map((t, i) => (
              <TestimonialSlide
                key={t.name}
                item={t}
                index={i}
                total={total}
                progress={progress}
              />
            ))}
          </div>

          {/* Counter + progress */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold tabular-nums text-neutral-950">
              <span className="relative block h-4 w-[18px] overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={active}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 block"
                  >
                    
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}