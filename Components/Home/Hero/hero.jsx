"use client";

import { motion, useTransform } from "framer-motion";
import VerticalWordmark from "./vertical-wordmark";
import HeroCopy from "./hero-copy";

export default function Hero({ progress }) {
  const overlayOpacity = useTransform(progress, [0.4, 0.65], [0, 1]);
  const textOpacity = useTransform(progress, [0.62, 0.85], [0, 1]);
  const textY = useTransform(progress, [0.62, 0.85], [40, 0]);

  return (
    <section className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/30"
      />

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="absolute inset-0"
      >
        <div className="absolute left-6 top-[15vh] flex h-5 gap-[3px] md:left-[4.5%]">
          <span className="w-px bg-white" />
          <span className="w-px bg-white" />
        </div>

        <p className="absolute left-14 top-[14.5vh] text-base tracking-wide text-white md:left-[11%] md:text-lg">
          Essence
        </p>

        <HeroCopy />
        <VerticalWordmark />
      </motion.div>
    </section>
  );
}