import Link from "next/link";
import FadeUp from "@/Components/Home/About/fade-up";
import WordReveal from "@/Components/Home/feature/word-reveal";

export default function ProductCta({ product }) {
  const words = [
    { text: "Make" },
    ...product.name.split(" ").map((w) => ({ text: w, italic: true })),
    { text: "yours" },
  ];

  return (
    <section
      data-nav-tone="light"
      className="bg-neutral-950 px-6 py-28 md:px-12 md:py-44"
    >
      <div className="mx-auto max-w-[1200px]">
        <WordReveal
          words={words}
          delay={0.1}
          className="max-w-[16ch] font-[family-name:var(--font-display)] text-[clamp(2.6rem,6vw,6rem)] font-normal leading-[1.02] tracking-[-0.02em] text-white"
        />

        <FadeUp delay={0.3}>
          <p className="mt-6 max-w-[44ch] text-[13px] leading-[1.75] text-white/70 md:mt-8 md:text-[14px]">
            Take it home, or sit down with a perfumer first. A private
            consultation takes thirty minutes and ends with a scent chosen for
            you.
          </p>
        </FadeUp>

        <FadeUp delay={0.45} className="mt-9 flex flex-wrap items-center gap-3 md:gap-4">
          <Link
            href="#product"
            className="group relative overflow-hidden border border-white bg-white px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] text-neutral-950 transition-colors duration-500 hover:border-[#a8af7e] md:px-7"
          >
            <span className="absolute inset-0 -translate-x-full bg-[#a8af7e] transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="relative">Buy {product.name}</span>
          </Link>

          <Link
            href="/contact"
            className="group relative overflow-hidden border border-white px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:text-neutral-950 md:px-7"
          >
            <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="relative">Book a consultation</span>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}