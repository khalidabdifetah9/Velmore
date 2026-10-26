"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import FadeUp from "@/Components/Home/About/fade-up";
import Stars from "./stars";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1];

function Accordion({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mt-10 border-t border-neutral-300">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.title} className="border-b border-neutral-300">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-4 text-left text-[11px] uppercase tracking-[0.12em] text-neutral-950"
            >
              {it.title}
              <span className="relative block h-3 w-3">
                <span className="absolute left-0 top-1/2 h-px w-full bg-neutral-950" />
                <span
                  className={`absolute left-1/2 top-0 h-full w-px bg-neutral-950 transition-transform duration-300 ${
                    isOpen ? "scale-y-0" : ""
                  }`}
                />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[56ch] pb-5 text-[12px] leading-[1.75] text-neutral-500">
                    {it.text}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function ProductHeader({ product, details }) {
  const [size, setSize] = useState(0);
  const [added, setAdded] = useState(false);
  const [wish, setWish] = useState(false);

  const current = details.sizes[size];
  const [first, ...rest] = product.name.split(" ");
  const lines = [first, rest.join(" ")].filter(Boolean);

  const addToBag = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const accordion = [
    {
      title: "Scent profile",
      text: `${details.family}. ${details.description}`,
    },
    { title: "How to wear", text: details.howToWear },
    { title: "Payment & delivery", text: details.delivery },
  ];

  return (
    <section id="product" className="bg-white px-3 pb-3 pt-24 md:px-4">
      <div className="mx-auto grid min-h-[calc(100svh-6.25rem)] max-w-[1670px] gap-3 md:grid-cols-[1.08fr_1fr] md:gap-4">
        {/* Left: product image tile */}
        <motion.div
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          className="relative min-h-[62svh] overflow-hidden rounded-[10px] bg-[#efeeec] md:min-h-0"
        >
          <motion.div
            initial={{ scale: 1.25 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-contain p-[10%] mix-blend-multiply"
            />
          </motion.div>

          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="pointer-events-none absolute inset-0 origin-top bg-[#a8af7e]"
          />
        </motion.div>

        {/* Right: details */}
        <div className="flex flex-col justify-center px-2 py-6 md:px-[5%] md:py-10">
          <FadeUp delay={0.3}>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-900">
              {details.kind}
            </p>
          </FadeUp>

          {/* Bold editorial name, line by line out of a mask */}
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,6.2vw,6.5rem)] font-normal leading-[0.98] tracking-[-0.025em] text-neutral-950">
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden py-[0.06em] -my-[0.06em]">
                <motion.span
                  className={`block ${i === 1 ? "italic" : ""}`}
                  initial={{ y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: 0.4 + i * 0.12, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <FadeUp delay={0.65} className="mt-6 flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Stars rating={details.rating} size={14} />
              <Link
                href="#reviews"
                className="text-[11px] text-neutral-500  decoration-[#a8af7e] decoration-2 underline-offset-4 transition-colors hover:text-neutral-950"
              >
                {details.rating.toFixed(1)} · {details.count} reviews
              </Link>
            </div>
            <p className="text-[clamp(1.3rem,1.8vw,1.8rem)] text-neutral-950">
              ${current.price}
            </p>
          </FadeUp>

          <FadeUp delay={0.75}>
            <p className="mt-6 max-w-[52ch] text-[12.5px] leading-[1.75] text-neutral-700">
              {details.description}
            </p>
          </FadeUp>

          {/* Size */}
          <FadeUp delay={0.85}>
            <div role="radiogroup" aria-label="Size" className="mt-7 flex items-center gap-7">
              {details.sizes.map((s, i) => {
                const on = size === i;
                return (
                  <button
                    key={s.label}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setSize(i)}
                    className="flex items-center gap-2.5 text-[11px] text-neutral-950"
                  >
                    <span
                      className={`flex h-3 w-3 items-center justify-center rounded-full border transition-colors duration-300 ${
                        on ? "border-neutral-950 bg-neutral-950" : "border-neutral-400"
                      }`}
                    />
                    {s.label}
                  </button>
                );
              })}
            </div>
          </FadeUp>

          {/* Buttons */}
          <FadeUp delay={0.95} className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={addToBag}
              className="group relative overflow-hidden rounded-[6px] border border-neutral-950 bg-neutral-950 py-4 text-[10px] uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:border-[#a8af7e] hover:text-neutral-950"
            >
              <span className="absolute inset-0 -translate-x-full bg-[#a8af7e] transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative" aria-live="polite">
                {added ? "Added to bag ✓" : "Add to bag"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setWish((w) => !w)}
              aria-pressed={wish}
              className="flex items-center justify-center gap-2 rounded-[6px] border border-neutral-300 bg-white py-4 text-[10px] uppercase tracking-[0.2em] text-neutral-950 transition-colors duration-300 hover:border-neutral-950"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill={wish ? "#a8af7e" : "none"}
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M12 21s-7-4.6-9.3-9A5.4 5.4 0 0 1 12 6.2 5.4 5.4 0 0 1 21.3 12c-2.3 4.4-9.3 9-9.3 9z" />
              </svg>
              {wish ? "Saved" : "Add to wishlist"}
            </button>
          </FadeUp>

          <FadeUp delay={1.05}>
            <Accordion items={accordion} />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}