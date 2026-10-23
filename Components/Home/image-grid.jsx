"use client";

import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { gridImages } from "@/lib/images";

export default function ImageGrid({ progress, centerRef }) {
  const outerOpacity = useTransform(progress, [0, 0.3], [1, 0]);
  const hintOpacity = useTransform(progress, [0, 0.08], [1, 0]);

  return (
    <>
      <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-2 p-2 sm:gap-4 sm:p-4 md:gap-5 md:p-5">
        {gridImages.map((img, i) => {
          const isCenter = i === 4;
          return (
            <motion.div
              key={img.src}
              ref={isCenter ? centerRef : null}
              style={isCenter ? undefined : { opacity: outerOpacity }}
              className="relative overflow-hidden bg-neutral-900"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={isCenter}
                sizes={isCenter ? "100vw" : "34vw"}
                className="object-cover"
              />
            </motion.div>
          );
        })}
      </div>

      <motion.p
        style={{ opacity: hintOpacity }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-white/60 mix-blend-difference"
      >
        Scroll
      </motion.p>
    </>
  );
}