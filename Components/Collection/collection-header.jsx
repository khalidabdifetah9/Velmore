"use client";

import { motion } from "framer-motion";
import FadeUp from "../Home/About/fade-up";
import VerticalTitle from "../Craftsmanship/vertical-title";

export default function CollectionHeader() {
  return (
    <section id="collections" className="relative bg-[#dedede]">
      <div className="flex">
        <div className="min-w-0 flex-1 px-6 pb-14 pt-[16vh] md:px-12 md:pb-20">
          <div className="mb-5 flex items-center gap-3">
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 28 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block h-px bg-[#a8af7e]"
            />
            <FadeUp delay={0.3}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-900">
                The Collection
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.45}>
            <p className="max-w-[34ch] text-[12.5px] leading-[1.75] text-neutral-700 md:text-[13px]">
              Six signature scents and the small things that go with them, each
              made in numbered batches at our Paris atelier.
            </p>
          </FadeUp>

          <FadeUp
            delay={0.6}
            className="mt-8 flex items-center gap-5 text-[11px] uppercase tracking-[0.22em] text-neutral-900"
          >
            <span>(10) Pieces</span>
            <span className="h-px w-8 bg-neutral-400" />
            <span>Paris · 2026</span>
          </FadeUp>
        </div>

        <div className="flex w-[17vw] shrink-0 justify-center pb-10 pt-[13vh] md:w-[11vw] md:pt-[11vh]">
          <VerticalTitle
            text="Collections"
            badge="10"
            className="text-[clamp(2.4rem,9vw,3.4rem)] md:text-[clamp(3rem,4.6vw,5.5rem)]"
          />
        </div>
      </div>
    </section>
  );
}