"use client";

import Image from "next/image";
import { cubicBezier, motion, useTransform } from "framer-motion";
import { enter, LEN, OFFSET } from "./timing";

const ease = cubicBezier(0.65, 0, 0.35, 1);

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#a8af7e">
          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialSlide({ item, index, total, progress }) {
  const [s, e] = enter(index);
  const first = index === 0;
  const next = index < total - 1 ? enter(index + 1) : null;
  const cover = next ?? [0, 1];

  /* ── Photo: arrives over the previous one ── */
  const imgY = useTransform(progress, [s, e], first ? ["0%", "0%"] : ["108%", "0%"], { ease });
  const imgX = useTransform(progress, [s, e], first ? ["0%", "0%"] : [OFFSET.x, "0%"], { ease });
  const imgRot = useTransform(progress, [s, e], first ? [0, 0] : [OFFSET.rot, 0], { ease });
  const photoZoom = useTransform(progress, [s, e], [1.3, 1], { ease });

  /* ── Photo: gets covered by the next one ── */
  const imgScale = useTransform(progress, cover, next ? [1, 0.92] : [1, 1], { ease });
  const imgLift = useTransform(progress, cover, next ? ["0%", "-4%"] : ["0%", "0%"], { ease });
  const dim = useTransform(progress, cover, next ? [0, 0.45] : [0, 0], { ease });

  /* ── Quote: rises in a beat after the photo ── */
  const inY = useTransform(progress, [s + 0.03, e + 0.03], first ? [0, 0] : [60, 0], { ease });
  const inOpacity = useTransform(progress, [s + LEN * 0.35, e], first ? [1, 1] : [0, 1]);

  /* ── Quote: fades up and out as the next slide arrives ── */
  const outOpacity = useTransform(
    progress,
    next ? [next[0], next[0] + LEN * 0.55] : [0, 1],
    next ? [1, 0] : [1, 1]
  );
  const outY = useTransform(
    progress,
    next ? [next[0], next[0] + LEN * 0.55] : [0, 1],
    next ? [0, -36] : [0, 0]
  );

  return (
    <div
      style={{ zIndex: index + 1 }}
      className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-6 md:grid md:grid-cols-2 md:grid-rows-[minmax(0,1fr)] md:items-center md:gap-x-[7%]"
    >
      {/* Photo */}
      <motion.div
        style={{ x: imgX, y: imgY, rotate: imgRot }}
        className="h-[30vh] w-[30vh] shrink-0 will-change-transform md:h-full md:w-auto md:max-w-full md:aspect-square"
      >
        <motion.div
          style={{ scale: imgScale, y: imgLift }}
          className={`relative h-full w-full overflow-hidden bg-neutral-200 ${
            first ? "" : "shadow-[0_30px_70px_-25px_rgba(0,0,0,0.45)]"
          }`}
        >
          <motion.div style={{ scale: photoZoom }} className="absolute inset-0">
            <Image
              src={item.image}
              alt={`${item.name}, ${item.role}`}
              fill
              priority={index < 2}
              sizes="(max-width: 768px) 60vw, 40vw"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{ opacity: dim }}
            className="absolute inset-0 bg-black"
          />
        </motion.div>
      </motion.div>

      {/* Quote */}
      <motion.div style={{ y: inY, opacity: inOpacity }}>
        <motion.div style={{ y: outY, opacity: outOpacity }} className="max-w-[500px]">
          <Stars />

          <blockquote className="mt-5 text-[clamp(1.05rem,1.65vw,1.55rem)] font-bold leading-[1.4] text-neutral-950">
            “{item.quote}”
          </blockquote>

          <div className="mt-7 flex items-center gap-4">
            <div>
              <p className="text-[12px] font-bold text-neutral-950">{item.name}</p>
              <p className="mt-0.5 text-[11px] text-neutral-500">{item.role}</p>
            </div>
            <span className="h-9 w-px bg-neutral-900" />
            <p className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg italic text-neutral-950">
              {item.company}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}