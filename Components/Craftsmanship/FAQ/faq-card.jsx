"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const hidden = { backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" };

export default function FaqCard({ item, index, className = "" }) {
  const [flipped, setFlipped] = useState(false);
  const pointer = useRef("mouse");
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 46, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, delay: (index % 3) * 0.12, ease: EASE }}
      style={{ perspective: 1400 }}
      className={className}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={flipped}
        aria-label={`${item.q} Press to ${flipped ? "hide" : "show"} the answer.`}
        onPointerDown={(e) => (pointer.current = e.pointerType)}
        onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(false)}
        // Hover handles the mouse, so click only toggles for touch and pen
        onClick={() => pointer.current !== "mouse" && setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
        onBlur={() => setFlipped(false)}
        className="relative h-[250px] w-full cursor-pointer rounded-[10px] outline-none focus-visible:ring-2 focus-visible:ring-[#a8af7e] focus-visible:ring-offset-2 lg:h-[clamp(250px,13.4vw,270px)]"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-full w-full"
        >
          {/* FRONT: the question */}
          <div
            style={hidden}
            className="absolute inset-0 flex flex-col justify-between rounded-[10px] bg-[#ededed] p-6 lg:p-[30px]"
          >
            <div className="flex items-start justify-between gap-6">
              <h3 className="max-w-[78%] text-[clamp(1.3rem,1.75vw,1.75rem)] font-normal leading-[1.1] tracking-[-0.01em] text-neutral-950">
                {item.q}
              </h3>
              <span className="pt-0.5 text-[clamp(1.05rem,1.4vw,1.4rem)] font-light text-neutral-500">
                {num}
              </span>
            </div>

            <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">
              <span className="hidden [@media(hover:hover)]:inline">Hover to read</span>
              <span className="[@media(hover:hover)]:hidden">Tap to read</span>
            </p>
          </div>

          {/* BACK: the answer */}
          <div
            style={{ ...hidden, transform: "rotateY(180deg)" }}
            className="absolute inset-0 flex flex-col rounded-[10px] bg-[#0d0d0b] p-6 lg:p-[30px]"
          >
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a8af7e]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a8af7e]" />
                Answer
              </p>
              <span className="text-[clamp(1.05rem,1.4vw,1.4rem)] font-light text-[#a8af7e]">
                {num}
              </span>
            </div>

            <p className="mt-5 max-w-[48ch] text-[13px] leading-[1.65] text-white/85 lg:text-[14px]">
              {item.a}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}