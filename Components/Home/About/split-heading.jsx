"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SplitHeading({ lines, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });

  return (
    <h2 ref={ref} className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span
          key={line}
          aria-hidden="true"
          className="block overflow-hidden py-[0.06em] -my-[0.06em]"
        >
          <motion.span
            className="block"
            initial={{ y: "115%", rotate: 3 }}
            animate={inView ? { y: "0%", rotate: 0 } : {}}
            transition={{
              duration: 1.1,
              delay: delay + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}