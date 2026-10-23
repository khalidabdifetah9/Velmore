"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import FadeUp from "../About/fade-up";
import WordReveal from "../feature/word-reveal";
import ReviewCard from "./review-card";
import { reviews, testimonialBg } from "@/lib/reviews";

const headingWords = [
  { text: "Worn" },
  { text: "daily," },
  { text: "remembered", italic: true },
  { text: "always" },
];

export default function Testimonials() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll so the drops feel fluid
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const bgScale = useTransform(progress, [0, 1], [1.12, 1]);
  const bar = useTransform(progress, [0.05, 0.85], [0, 1]);

  return (
    // data-nav-tone makes the navbar switch to light text over this image
    <section
      ref={ref}
      id="testimonials"
      data-nav-tone="light"
      className="relative h-[480vh] bg-black"
    >
      {/* Pinned full-screen stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Locked background image */}
        <motion.div
          style={{ scale: bgScale }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={testimonialBg}
            alt="Velmora testimonials background"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/40" />

        {/* Left: label + heading */}
        <div className="absolute left-6 top-[13vh] z-10 max-w-[300px] md:left-[5%] md:top-[18vh] md:max-w-[28%]">
          <div className="mb-5 flex items-center gap-3">
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 28 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="block h-px bg-[#a8af7e]"
            />
            <FadeUp>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white">
                Testimonial
              </p>
            </FadeUp>
          </div>

          <WordReveal
            words={headingWords}
            delay={0.15}
            className="font-[family-name:var(--font-display)] text-[clamp(2.1rem,3.6vw,3.6rem)] font-normal leading-[1.04] tracking-[-0.02em] text-white"
          />
        </div>

        {/* Review cards: dropped in by scroll */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {reviews.map((r, i) => (
            <ReviewCard key={r.name} review={r} index={i} progress={progress} />
          ))}
        </div>

        {/* Progress line */}
        <div className="absolute bottom-8 left-6 z-10 h-px w-28 bg-white/25 md:left-[5%]">
          <motion.div
            style={{ scaleX: bar }}
            className="h-full origin-left bg-[#a8af7e]"
          />
        </div>
      </div>
    </section>
  );
}