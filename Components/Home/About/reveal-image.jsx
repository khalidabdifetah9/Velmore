"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];

const CLIP = {
  up: { from: "inset(100% 0% 0% 0%)", origin: "origin-top", axis: "scaleY" },
  right: { from: "inset(0% 100% 0% 0%)", origin: "origin-right", axis: "scaleX" },
};

export default function RevealImage({
  src,
  alt,
  direction = "up",
  delay = 0,
  parallax = 6, // % of travel, keep <= 7
  sizes = "40vw",
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const cfg = CLIP[direction];

  // Scroll parallax for the photo inside the frame
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* 1. Clip-path wipe */}
      <motion.div
        initial={{ clipPath: cfg.from }}
        animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
        transition={{ duration: 1.3, delay, ease: EASE }}
        className="relative h-full w-full overflow-hidden bg-neutral-200"
      >
        {/* 2. Photo: starts zoomed, settles to 1, drifts with scroll */}
        <motion.div
          initial={{ scale: 1.35 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.8, delay, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <motion.div style={{ y }} className="absolute inset-[-8%]">
            <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
          </motion.div>
        </motion.div>

        {/* 3. Accent curtain slides off just after the wipe starts */}
        <motion.div
          initial={{ [cfg.axis]: 1 }}
          animate={inView ? { [cfg.axis]: 0 } : {}}
          transition={{ duration: 1.1, delay: delay + 0.35, ease: EASE }}
          className={`pointer-events-none absolute inset-0 bg-[#a8af7e] ${cfg.origin}`}
        />
      </motion.div>
    </div>
  );
}