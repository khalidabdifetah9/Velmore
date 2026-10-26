"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import VerticalWordmark from "./vertical-wordmark";
import HeroCopy from "./hero-copy";
import HeroCta from "./hero-cta";

const SPOT_RADIUS = 280; // size of the bright area in px
const FEATHER = 0.55; // 0 = hard edge, closer to 1 = softer edge
const EASE = [0.22, 1, 0.36, 1];

// Soft rise with a blur-in, staggered by `delay` (seconds)
const rise = (show, delay) => ({
  initial: { opacity: 0, y: 36, filter: "blur(8px)" },
  animate: show ? { opacity: 1, y: 0, filter: "blur(0px)" } : {},
  transition: { duration: 1.3, delay, ease: EASE },
});

export default function Hero({ show }) {
  const sectionRef = useRef(null);

  // Cursor position (raw), smoothed with a spring for a silky follow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 140, damping: 22, mass: 0.5 });
  const y = useSpring(mouseY, { stiffness: 140, damping: 22, mass: 0.5 });

  // Spotlight size: 0 when the cursor is away, grows on enter
  const radiusTarget = useMotionValue(0);
  const radius = useSpring(radiusTarget, { stiffness: 120, damping: 20 });


  // Overlay mask: transparent at the cursor, opaque outside
  const inner = useTransform(radius, (r) => r * (1 - FEATHER));
  const mask = useMotionTemplate`radial-gradient(circle ${radius}px at ${x}px ${y}px, transparent ${inner}px, black ${radius}px)`;
  const glow = useMotionTemplate`radial-gradient(circle ${radius}px at ${x}px ${y}px, rgba(255,248,235,0.22) 0%, rgba(255,248,235,0.08) 45%, transparent 100%)`;

  return (
    <section
      ref={sectionRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Dark overlay: fades in last, once the photo has settled */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 1.8, delay: 0.9, ease: "easeInOut" }}
        style={{ maskImage: mask, WebkitMaskImage: mask }}
        className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/5 to-black/15"
      />

    

      {/* 1. Wordmark wipes down in reading direction */}
      <motion.div
        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
        animate={show ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
        transition={{ duration: 1.6, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
        className="pointer-events-none absolute inset-0"
      >
        <VerticalWordmark />
      </motion.div>

      {/* 2. "Essence" label */}
      <motion.div {...rise(show, 0.35)} className="pointer-events-none absolute inset-0">
        <div className="absolute left-6 top-[15vh] flex h-5 gap-[3px] md:left-[4.5%]">
          <span className="w-px bg-white" />
          <span className="w-px bg-white" />
        </div>
        <p className="absolute left-14 top-[14.5vh] text-base tracking-wide text-white md:left-[11%] md:text-lg">
          Essence
        </p>
      </motion.div>

      {/* 3. "Quiet by design" */}
      <motion.div {...rise(show, 0.55)} className="pointer-events-none absolute inset-0">
        <HeroCopy />
      </motion.div>

      {/* 4. CTA block */}
      <motion.div {...rise(show, 0.8)} className="pointer-events-none absolute inset-0">
        <HeroCta pointer={show ? "auto" : "none"} />
      </motion.div>
    </section>
  );
}