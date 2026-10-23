"use client";

import { useState } from "react";
import Image from "next/image";
import { backOut, motion, useTransform } from "framer-motion";

const GAP = 0.1; // scroll distance between cards (0–1 of the section)
const FIRST = 0.08; // when the first card starts dropping

function Stars() {
  return (
    <div className="flex gap-[2px]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#FFC400">
          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name, src }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#a8af7e] to-[#6f7650] text-[14px] font-semibold text-white">
        {name[0]}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={`${name}, Velmora customer`}
      width={76}
      height={76}
      onError={() => setFailed(true)}
      className="h-[38px] w-[38px] shrink-0 rounded-full object-cover ring-2 ring-white"
    />
  );
}

export default function ReviewCard({ review, index, progress }) {
  const start = FIRST + index * GAP;
  const end = start + GAP * 1.1;

  // Drops from above and settles with a small overshoot
  const y = useTransform(progress, [start, end], [-260, 0], { ease: backOut });
  const rotate = useTransform(progress, [start, end], [review.tilt * 2, 0], {
    ease: backOut,
  });
  const opacity = useTransform(progress, [start, start + GAP * 0.45], [0, 1]);

  return (
    <motion.div
      style={{
        opacity,
        y,
        rotate,
        "--dl": review.dl,
        "--dt": review.dt,
        "--ml": review.ml,
        "--mt": review.mt,
      }}
      className="absolute left-[var(--ml)] top-[var(--mt)] will-change-transform md:left-[var(--dl)] md:top-[var(--dt)]"
    >
      <div className="flex w-[clamp(258px,26vw,390px)] items-center gap-3 bg-white px-4 py-3.5 shadow-[0_14px_40px_-14px_rgba(0,0,0,0.45)]">
        {/* Customer photo + name */}
        <div className="flex w-[92px] shrink-0 items-center gap-2">
          <Avatar name={review.name} src={review.avatar} />
          <span className="truncate text-[11px] font-bold text-neutral-800">
            {review.name}
          </span>
        </div>

        {/* Stars + text */}
        <div className="min-w-0">
          <Stars />
          <p className="mt-1 text-[12px] font-bold leading-snug text-neutral-800 md:text-[13px]">
            {review.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}