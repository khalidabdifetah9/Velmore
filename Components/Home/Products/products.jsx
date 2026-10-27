"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import FadeUp from "../About/fade-up";
import WordReveal from "../feature/word-reveal";
import ProductCard from "./product-card";
import { products } from "@/lib/products";

const EASE = [0.65, 0, 0.35, 1];

const headingWords = [
  { text: "Six" },
  { text: "scents," },
  { text: "made", italic: true },
  { text: "slowly" },
];

/* ───────────── Desktop carousel (unchanged behavior) ───────────── */

function useCarouselMetrics(ref, count) {
  const [m, setM] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const calc = () => {
      const vw = el.clientWidth || window.innerWidth;
      const gap = 16;
      const gutter = 48;
      const cols = vw >= 1280 ? 4 : 3;
      const cardW = Math.round((vw - gutter * 2 - gap * (cols - 1)) / cols);

      const stride = cardW + gap;
      const trackW = count * cardW + (count - 1) * gap;

      // One empty slot on the left at the start
      const startGap = stride;
      const minX = Math.min(gutter, vw - gutter - trackW);
      const r = (trackW + gutter * 2 - vw) / stride;
      const maxStep = 1 + Math.ceil(Math.max(0, r));

      setM({ cardW, gap, gutter, stride, startGap, minX, maxStep });
    };

    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, count]);

  return m;
}

function xFor(m, step) {
  if (step === 0) return m.gutter + m.startGap;
  return Math.max(m.gutter - (step - 1) * m.stride, m.minX);
}

function Arrow({ dir, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous products" : "Next products"}
      className="group relative flex h-11 w-14 items-center justify-center overflow-hidden border border-neutral-900 text-neutral-900 transition-opacity duration-300 enabled:hover:border-[#a8af7e] disabled:cursor-not-allowed disabled:opacity-25"
    >
      <span
        className={`absolute inset-0 bg-[#a8af7e] transition-transform duration-500 ease-out ${
          dir === "prev"
            ? "translate-x-full group-enabled:group-hover:translate-x-0"
            : "-translate-x-full group-enabled:group-hover:translate-x-0"
        }`}
      />
      <svg
        className="relative"
        width="22"
        height="14"
        viewBox="0 0 22 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      >
        {dir === "prev" ? (
          <path d="M21 7H1m0 0l6-6M1 7l6 6" />
        ) : (
          <path d="M1 7h20m0 0l-6-6m6 6l-6 6" />
        )}
      </svg>
    </button>
  );
}

function DesktopCarousel() {
  const viewportRef = useRef(null);
  const m = useCarouselMetrics(viewportRef, products.length);
  const [step, setStep] = useState(0);

  const current = m ? Math.min(step, m.maxStep) : 0;
  const go = (n) => m && setStep(Math.max(0, Math.min(n, m.maxStep)));

  return (
    <>
      <div ref={viewportRef} className="mt-20 overflow-hidden">
        {m && (
          <motion.div
            className="flex touch-pan-y"
            style={{ gap: m.gap }}
            initial={{ x: xFor(m, 0) }}
            animate={{ x: xFor(m, current) }}
            transition={{ duration: 0.95, ease: EASE }}
            onPanEnd={(_, info) => {
              if (info.offset.x < -60) go(current + 1);
              else if (info.offset.x > 60) go(current - 1);
            }}
          >
            {products.map((p, i) => (
              <div key={p.slug} className="shrink-0" style={{ width: m.cardW }}>
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <Arrow dir="prev" onClick={() => go(current - 1)} disabled={current === 0} />
        <Arrow
          dir="next"
          onClick={() => go(current + 1)}
          disabled={!m || current >= m.maxStep}
        />
      </div>
    </>
  );
}

/* ───────────── Mobile: one product at a time ───────────── */

const slide = {
  enter: (d) => ({ x: d * 56, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d) => ({ x: d * -56, opacity: 0 }),
};

function MobileProducts() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const total = products.length;
  const p = products[i];

  const go = (n) => {
    if (n < 0 || n >= total) return;
    setDir(n > i ? 1 : -1);
    setI(n);
  };

  return (
    <div className="mt-12 px-6">
      <div className="relative overflow-hidden">
        {/* initial={false}: the first product is simply there, nothing can hide it */}
        <AnimatePresence initial={false} mode="popLayout" custom={dir}>
          <motion.div
            key={p.slug}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: EASE }}
            className="touch-pan-y"
            onPanEnd={(_, info) => {
              if (info.offset.x < -50) go(i + 1);
              else if (info.offset.x > 50) go(i - 1);
            }}
          >
            <Link
              href={`/collection/${p.slug}`}
              draggable={false}
              className="block select-none"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-200">
                <Image
                  src={p.image}
                  alt={`${p.name} perfume`}
                  fill
                  priority={i === 0}
                  draggable={false}
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <ul className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
                  {(p.tags ?? []).map((tag) => (
                    <li
                      key={tag}
                      className="bg-black/25 px-3 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.06em] text-white backdrop-blur-md"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 flex items-center justify-between text-[15px] text-neutral-950">
                <p className="font-medium">{p.name}</p>
                <p className="font-[family-name:var(--font-mono)] text-[13px] text-neutral-500">
                  [ ${p.price} ]
                </p>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Counter + progress */}
      <div className="mt-8 flex items-center justify-between">
        <p className="font-[family-name:var(--font-mono)] text-[12px] tabular-nums text-neutral-950">
          {String(i + 1).padStart(2, "0")}
          <span className="text-neutral-400"> / {String(total).padStart(2, "0")}</span>
        </p>
        <div className="mx-5 h-px flex-1 bg-neutral-300">
          <div
            className="h-full origin-left bg-[#a8af7e] transition-transform duration-500"
            style={{ transform: `scaleX(${(i + 1) / total})` }}
          />
        </div>
        <div className="flex items-center gap-3">
          <Arrow dir="prev" onClick={() => go(i - 1)} disabled={i === 0} />
          <Arrow dir="next" onClick={() => go(i + 1)} disabled={i === total - 1} />
        </div>
      </div>
    </div>
  );
}

/* ───────────── Section ───────────── */

export default function Products() {
  return (
    <section
      id="collection"
      className="border-t border-neutral-200 bg-white py-24 md:py-36"
    >
      <header className="mx-auto max-w-392 px-6 md:px-12">
        <FadeUp>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-900">
            Collection
          </p>
        </FadeUp>
        <WordReveal
          words={headingWords}
          delay={0.15}
          className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,4.4vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.02em] text-neutral-950"
        />
      </header>

      {/* Phones: one product at a time */}
      <div className="md:hidden">
        <MobileProducts />
      </div>

      {/* md and up: the carousel with the reveal you like */}
      <div className="hidden md:block">
        <DesktopCarousel />
      </div>
    </section>
  );
}