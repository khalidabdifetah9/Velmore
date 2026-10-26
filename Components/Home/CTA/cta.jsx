"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeUp from "../About/fade-up";
import WordReveal from "../feature/word-reveal";
import { ctaBg } from "@/lib/images";
const MOBILE_FOCUS = "object-[62%_50%]";

const headingWords = [
  { text: "Wear" },
  { text: "the" },
  { text: "obsession", italic: true },
  { text: "once" },
];

export default function Cta() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      id="consultation"
      data-nav-tone="light"
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-neutral-900"
    >
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
            className={`object-cover ${MOBILE_FOCUS} md:object-center`}
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20 md:bg-gradient-to-r md:from-black/65 md:via-black/30 md:to-black/10" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-black/35 via-transparent to-black/20 md:block" />

      <div className="relative z-10 flex h-full items-end px-6 pb-16 md:items-center md:px-12 md:pb-0">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="max-w-[820px]">
            <WordReveal
              words={headingWords}
              delay={0.1}
              className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,6vw,6rem)] font-normal leading-[1.02] tracking-[-0.02em] text-white"
            />

            <FadeUp delay={0.3}>
              <p className="mt-5 max-w-[40ch] text-[13px] leading-[1.75] text-white/85 md:mt-8 md:max-w-[46ch] md:text-[14px]">
                Six scents cut from rare materials and hard patience wait in
                the collection.
              </p>
            </FadeUp>

            <FadeUp delay={0.45} className="mt-7 flex flex-wrap items-center gap-3 md:mt-9 md:gap-4">
              <Link
                href="/collections"
                className="group relative overflow-hidden border border-white bg-white px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] text-neutral-950 transition-colors duration-500 hover:border-[#a8af7e] md:px-7"
              >
                <span className="absolute inset-0 -translate-x-full bg-[#a8af7e] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative">Collections</span>
              </Link>

              <Link
                href="/contact"
                className="group relative overflow-hidden border border-white px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:text-neutral-950 md:px-7"
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