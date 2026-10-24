"use client";

import FadeUp from "../Home/About/fade-up";
import WordReveal from "../Home/feature/word-reveal";
import IngredientTile from "./ingredient-tile";
import { ingredients } from "@/lib/ingredients";

const ratios = ["aspect-[585/905]", "aspect-[585/500]", "aspect-[585/765]"];

const headingWords = [
  { text: "Rare" },
  { text: "materials," },
  { text: "honestly", italic: true },
  { text: "sourced" },
];

export default function Ingredients() {
  return (
    <section id="ingredients" className="relative  px-6 pb-40 pt-24 md:px-52 md:pb-48 md:pt-36">
      <header className="mb-14 md:mb-20">
        <FadeUp>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-900">
            Ingredients
          </p>
        </FadeUp>
        <WordReveal
          words={headingWords}
          delay={0.15}
          className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,4.4vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.02em] text-neutral-950"
        />
      </header>

      <div className="grid gap-12 md:grid-cols-3 md:items-start md:gap-x-[34px]">
        {ingredients.map((item, i) => (
          <IngredientTile key={item.slug} item={item} ratio={ratios[i]} index={i} />
        ))}
      </div>

    </section>
  );
}