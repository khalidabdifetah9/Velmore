"use client";

import { motion } from "framer-motion";

export default function VerticalTitle({
  text,
  badge,
  className = "text-[clamp(2.75rem,11vw,4rem)] md:text-[clamp(3.5rem,7vw,8rem)]",
}) {
  return (
    <div className="pointer-events-none flex select-none flex-col items-center gap-3">
      {/* Reveals top to bottom, in reading direction */}
      <motion.h1
        aria-label={text}
        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        className={`font-medium leading-[0.85] tracking-[-0.045em] text-neutral-950 [writing-mode:vertical-rl] ${className}`}
      >
        <span aria-hidden="true" className="text-[#a8af7e]">+</span>
        {text}
      </motion.h1>

      {badge && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex h-5 w-5 items-center justify-center rounded-full border border-neutral-900 text-[8px] font-medium leading-none text-neutral-900 md:h-6 md:w-6 md:text-[9px]"
        >
          {badge}
        </motion.span>
      )}
    </div>
  );
}