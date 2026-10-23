"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function NoteTabs({ notes, active, onChange }) {
  const current = notes[active];

  return (
    <div>
      <div role="tablist" className="grid gap-7 sm:grid-cols-3 sm:gap-5">
        {notes.map((n, i) => {
          const isActive = i === active;
          return (
            <button
              key={n.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(i)}
              className="group relative pt-4 text-left"
            >
              <span className="absolute left-0 top-0 h-px w-full bg-neutral-200" />
              {isActive && (
                <motion.span
                  layoutId="note-line"
                  transition={{ type: "spring", stiffness: 380, damping: 36 }}
                  className="absolute left-0 top-0 h-[2px] w-full bg-[#a8af7e]"
                />
              )}

              <h3
                className={`text-[13px] font-bold transition-colors duration-300 ${
                  isActive
                    ? "text-neutral-950"
                    : "text-neutral-400 group-hover:text-neutral-700"
                }`}
              >
                {n.title}
              </h3>
              <p
                className={`mt-2 text-[11px] leading-[1.7] transition-colors duration-300 ${
                  isActive ? "text-neutral-600" : "text-neutral-400"
                }`}
              >
                {n.text}
              </p>
            </button>
          );
        })}
      </div>

      {/* Ingredient line for the active layer */}
      <div className="mt-7 h-5">
        <AnimatePresence mode="wait">
          <motion.p
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-neutral-900"
          >
            {current.ingredients.join("  ·  ")}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
