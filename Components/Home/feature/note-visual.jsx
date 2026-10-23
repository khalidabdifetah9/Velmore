"use client";

import { useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];

export default function NoteVisual({ note, index, total }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <div ref={ref} className="relative w-full max-w-[540px]">
      {/* Entry reveal: left → right wipe with accent curtain */}
      <motion.div
        initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
        animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
        transition={{ duration: 1.3, ease: EASE }}
        className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-200"
      >
        {/* Layers: each new note wipes in over the previous one */}
        <AnimatePresence initial={false}>
          <motion.div
            key={note.id}
            className="absolute inset-0"
            initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            // keeps the old layer mounted until the new one has finished wiping
            exit={{ opacity: 0.999, transition: { duration: 1.3 } }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={note.image}
                alt={`${note.title} of the Velmora signature scent`}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
              <p className="font-[family-name:var(--font-display)] text-3xl italic leading-none md:text-4xl">
                {note.title}
              </p>
            
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Accent curtain on first reveal */}
        <motion.div
          initial={{ scaleX: 1 }}
          animate={inView ? { scaleX: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
          className="pointer-events-none absolute inset-0 z-10 origin-right bg-[#a8af7e]"
        />
      </motion.div>
    </div>
  );
}