"use client";

import FadeUp from "../Home/About/fade-up";
import RevealImage from "../Home/About/reveal-image";

export default function IngredientTile({ item, ratio, index }) {
  return (
    <article className="group">
      <div className="overflow-hidden rounded-[4px]">
        <div className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]">
          <RevealImage
            src={item.image}
            alt={item.alt}
            direction="up"
            delay={index * 0.15}
            parallax={4}
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`w-full ${ratio}`}
          />
        </div>
      </div>

      <FadeUp
        delay={0.35 + index * 0.15}
        className="mt-4 flex items-start justify-between gap-6"
      >
        <h3 className="max-w-[24ch] text-[16px] font-light leading-[1.85] text-neutral-900 md:text-[17px]">
          {item.title}
        </h3>
        <p className="shrink-0 pt-1 text-[13px] text-neutral-500">{item.origin}</p>
      </FadeUp>
    </article>
  );
}