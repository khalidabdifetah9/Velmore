"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export default function Chapter({ data, index, active, onActive }) {
  const ref = useRef(null);

  const inCenter = useInView(ref, { margin: "-40% 0px -45% 0px" });
  const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  useEffect(() => {
    if (inCenter) onActive(index);
  }, [inCenter, index, onActive]);

  return (
    <article
      ref={ref}
      id={`chapter-${index + 1}`}
      className="relative scroll-mt-28 pb-16 pt-8 md:pb-14 md:pt-10"
    >
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={seen ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        className="absolute left-0 top-0 h-px w-full origin-left bg-neutral-300"
      />
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 h-px origin-left bg-[#a8af7e] transition-[width] duration-700 ease-out ${
          active ? "w-full" : "w-0"
        }`}
      />

      <motion.div
        initial={{ opacity: 0, y: 36, filter: "blur(6px)" }}
        animate={seen ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 1, delay: 0.15, ease: EASE }}
        className="grid gap-5 md:grid-cols-[110px_1fr] md:gap-10"
      >
        {/* Numeral */}
        <p
          className={`font-[family-name:var(--font-display)] text-[clamp(2.8rem,4.5vw,4.5rem)] leading-none transition-colors duration-700 ${
            active ? "text-neutral-950" : "text-neutral-300"
          }`}
        >
          {data.number}
        </p>

        {/* Narrative */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
            {data.kicker}
          </p>

          <h3 className="mt-3 max-w-[22ch] font-[family-name:var(--font-display)] text-[clamp(1.6rem,2.6vw,2.4rem)] font-normal leading-[1.1] tracking-[-0.015em] text-neutral-950">
            {data.title}
          </h3>

          <div className="mt-5 max-w-[56ch] space-y-4 text-[13px] leading-[1.85] text-neutral-700">
            {data.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </motion.div>
    </article>
  );
}