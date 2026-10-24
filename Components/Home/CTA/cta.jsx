"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeUp from "../About/fade-up";
import WordReveal from "../feature/word-reveal";
import { ctaBg } from "@/lib/images";

const headingWords = [
  { text: "Wear" },
  { text: "the" },
  { text: "obsession", italic: true },
  { text: "once" },
];

export default function Cta() {
  const ref = useRef(null);

  // Slow parallax drift on the background as the section passes through
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    // data-nav-tone="light" turns the navbar white while it is over this image
    <section
      ref={ref}
      id="consultation"
      data-nav-tone="light"
      className="relative h-screen min-h-[620px] w-full overflow-hidden bg-neutral-900"
    >
      {/* Full-bleed background image */}
      <motion.div
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <motion.div style={{ y }} className="absolute inset-x-0 inset-y-[-10%]">
          <Image
            src={ctaBg}
            alt="Velmora collection"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Left-weighted overlay keeps the text readable on any photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20" />

      {/* Content, same side padding as the other sections */}
      <div className="relative z-10 flex h-full items-center px-6 md:px-12">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="max-w-[820px]">
            <WordReveal
              words={headingWords}
              delay={0.1}
              className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,6vw,6rem)] font-normal leading-[1.02] tracking-[-0.02em] text-white"
            />

            <FadeUp delay={0.3}>
              <p className="mt-6 max-w-[46ch] text-[13px] leading-[1.75] text-white/80 md:mt-8 md:text-[14px]">
                Six scents cut from rare materials and hard patience wait in
                the collection.
              </p>
            </FadeUp>

            <FadeUp delay={0.45} className="mt-9 flex flex-wrap items-center gap-4">
              {/* Solid button */}
              <Link
                href="#collection"
                className="group relative overflow-hidden border border-white bg-white px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-neutral-950 transition-colors duration-500 hover:border-[#a8af7e]"
              >
                <span className="absolute inset-0 -translate-x-full bg-[#a8af7e] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative">Collection</span>
              </Link>

              {/* Outline button */}
              <Link
                href="/consultation"
                className="group relative overflow-hidden border border-white px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:text-neutral-950"
              >
                <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative">Consultation</span>
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}