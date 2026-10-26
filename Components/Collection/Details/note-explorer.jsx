"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FadeUp from "@/Components/Home/About/fade-up";
import { tierMeta } from "@/lib/product-details";

const order = ["top", "heart", "base"];

// Outermost ring first so smaller circles sit on top and stay clickable
const rings = [
  { id: "base", size: 100, active: "#a8af7e" },
  { id: "heart", size: 66, active: "#bcc392" },
  { id: "top", size: 34, active: "#d3d8b3" },
];

export default function NoteExplorer({ details }) {
  const [active, setActive] = useState("top");
  const { notes, facts } = details;
  if (!notes) return null;

  return (
    <section id="notes" className="bg-white px-3 pb-3 md:px-4">
      <div className="mx-auto grid min-h-[80svh] max-w-[1670px] items-center gap-14 rounded-[10px] bg-[#efeeec] px-6 py-16 md:grid-cols-2 md:gap-8 md:px-0 md:py-20">
        {/* Visual: three nested rings, one per layer */}
        <FadeUp className="mx-auto w-full max-w-[440px] md:max-w-[460px]">
          <div className="relative aspect-square w-full">
            {rings.map((r) => {
              const on = active === r.id;
              return (
                <motion.button
                  key={r.id}
                  type="button"
                  aria-label={`${tierMeta[r.id].title}: ${notes[r.id].join(", ")}`}
                  onClick={() => setActive(r.id)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(r.id)}
                  animate={{
                    backgroundColor: on ? r.active : "rgba(255,255,255,0.55)",
                    scale: on ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    width: `${r.size}%`,
                    height: `${r.size}%`,
                    top: `${(100 - r.size) / 2}%`,
                    left: `${(100 - r.size) / 2}%`,
                  }}
                  className="absolute rounded-full border border-neutral-300 outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
                >
                  <span
                    className={`absolute left-1/2 top-[7%] -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors duration-500 ${
                      on ? "text-neutral-950" : "text-neutral-500"
                    }`}
                  >
                    {tierMeta[r.id].short}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Timeline under the rings */}
          <div className="mt-8 grid grid-cols-3 gap-2">
            {order.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                className="text-left"
              >
                <span className="relative block h-px w-full bg-neutral-300">
                  <span
                    className={`absolute inset-0 origin-left bg-[#a8af7e] transition-transform duration-700 ${
                      active === id ? "scale-x-100" : "scale-x-0"
                    }`}
                    style={{ height: 2, top: -0.5 }}
                  />
                </span>
                <span
                  className={`mt-2 block text-[10px] uppercase tracking-[0.15em] transition-colors duration-500 ${
                    active === id ? "text-neutral-950" : "text-neutral-500"
                  }`}
                >
                  {tierMeta[id].time}
                </span>
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Table */}
        <FadeUp delay={0.15} className="w-full max-w-[460px] md:pr-[8%]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-950">
            How it unfolds
          </p>
          <p className="mt-2 max-w-[44ch] text-[11px] leading-[1.7] text-neutral-500">
            Choose a layer to follow the scent from the first spray to the last
            trace on your collar.
          </p>

          <div className="mt-5 border-t border-neutral-300">
            {order.map((id) => {
              const on = active === id;
              return (
                <div key={id} className="border-b border-neutral-300">
                  <button
                    type="button"
                    onClick={() => setActive(id)}
                    aria-expanded={on}
                    className="grid w-full grid-cols-[110px_1fr] items-baseline gap-4 py-3.5 text-left"
                  >
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors duration-500 ${
                        on ? "text-neutral-950" : "text-neutral-500"
                      }`}
                    >
                      {tierMeta[id].title}
                    </span>
                    <span
                      className={`text-[12px] leading-[1.7] transition-colors duration-500 ${
                        on ? "text-neutral-950" : "text-neutral-500"
                      }`}
                    >
                      {notes[id].join(", ")}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-4 pl-[126px] text-[11px] leading-[1.7] text-neutral-500">
                          <span className="mr-2 text-neutral-950">{tierMeta[id].time}.</span>
                          {tierMeta[id].text}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {facts.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[110px_1fr] items-baseline gap-4 border-b border-neutral-300 py-3.5"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-950">
                  {label}
                </span>
                <span className="text-[12px] leading-[1.7] text-neutral-500">{value}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}