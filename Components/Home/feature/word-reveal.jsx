"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];
const TIMES = [0, 0.45, 0.5, 1];

/**
 * words: [{ text: "Three" }, { text: "single", italic: true }, ...]
 * Each word is uncovered by an accent block sweeping left → right.
 */
export default function WordReveal({
  words,
  className = "",
  delay = 0,
  stagger = 0.14,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <h2
      ref={ref}
      className={className}
      aria-label={words.map((w) => w.text).join(" ")}
    >
      <span aria-hidden="true" className="flex flex-wrap gap-x-[0.28em]">
        {words.map((w, i) => {
          const d = delay + i * stagger;
          return (
            <span key={i} className="relative inline-block py-[0.06em] align-top">
              {/* The word: hidden until the block fully covers it, then revealed */}
              <motion.span
                className={`block ${w.italic ? "italic" : ""}`}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: [0, 0, 1, 1] } : {}}
                transition={{ duration: 1.1, delay: d, times: TIMES }}
              >
                {w.text}
              </motion.span>

              {/* Accent block: grows from the left, then exits to the right */}
              <motion.span
                className="absolute inset-x-[-0.04em] inset-y-0 bg-[#a8af7e]"
                initial={{ scaleX: 0, transformOrigin: "0% 50%" }}
                animate={
                  inView
                    ? {
                        scaleX: [0, 1, 1, 0],
                        transformOrigin: ["0% 50%", "0% 50%", "100% 50%", "100% 50%"],
                      }
                    : {}
                }
                transition={{ duration: 1.1, delay: d, times: TIMES, ease: EASE }}
              />
            </span>
          );
        })}
      </span>
    </h2>
  );
}