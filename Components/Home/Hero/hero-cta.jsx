"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroCta({ pointer }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-t from-black/45 to-transparent" />

      <motion.div
        style={{ pointerEvents: pointer }}
        className="absolute bottom-[12vh] left-6 max-w-[300px] md:bottom-[9vh] md:left-[4%] md:max-w-[26%] md:min-w-[240px]"
      >
        <p className="mb-3 text-[11px] font-medium text-white">
          Six scents, made slowly
        </p>
        <p className="mb-6 text-[11px] leading-[1.7] text-white/85">
          Numbered batches, blended in Paris and rested for ninety days before
          they leave the atelier.
        </p>

        <Link
          href="/collections"
          className="group relative inline-flex items-center gap-3 overflow-hidden border border-white px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:border-[#a8af7e] hover:text-neutral-950"
        >
          <span className="absolute inset-0 -translate-x-full bg-[#a8af7e] transition-transform duration-500 ease-out group-hover:translate-x-0" />
          <span className="relative">Explore the collection</span>
        </Link>
      </motion.div>
    </>
  );
}