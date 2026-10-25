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
  parallax = 6, // % of drift. 0 = no parallax and no extra zoom
  position = "center", // object-position, e.g. "50% 15%" keeps the top of the photo in view
  sizes = "40vw",
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const cfg = CLIP[direction];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  const bleed = parallax ? `-${parallax + 1}%` : "0%";

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        initial={{ clipPath: cfg.from }}
        animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
        transition={{ duration: 1.3, delay, ease: EASE }}
        className="relative h-full w-full overflow-hidden bg-neutral-200"
      >
        <motion.div
          initial={{ scale: 1.35 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.8, delay, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <motion.div style={{ y, inset: bleed }} className="absolute">
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              style={{ objectPosition: position }}
              className="object-cover"
            />
          </motion.div>
        </motion.div>

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