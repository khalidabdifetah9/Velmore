import FadeUp from "@/Components/Home/About/fade-up";
import WordReveal from "@/Components/Home/feature/word-reveal";
import Stars from "./stars";

const headingWords = [
  { text: "What" },
  { text: "wearers", italic: true },
  { text: "say" },
];

export default function ProductReviews({ details, reviews }) {
  return (
    <section id="reviews" className="border-t border-neutral-200 bg-white px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto grid max-w-[1200px] gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-x-[6%]">
        {/* Left: rating summary */}
        <div>
          <FadeUp>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-900">
              Reviews
            </p>
          </FadeUp>
          <WordReveal
            words={headingWords}
            delay={0.15}
            className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,3.8vw,3.75rem)] font-normal leading-[1.03] tracking-[-0.02em] text-neutral-950"
          />

          <FadeUp delay={0.3} className="mt-10">
            <p className="font-[family-name:var(--font-display)] text-[clamp(4rem,8vw,7rem)] leading-none text-neutral-950">
              {details.rating.toFixed(1)}
              <span className="ml-2 text-[0.3em] text-neutral-400">/ 5</span>
            </p>
            <Stars rating={details.rating} size={22} className="mt-4" />
            <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-neutral-500">
              Based on {details.count} reviews
            </p>
          </FadeUp>
        </div>

        {/* Right: reviews */}
        <div className="border-t border-neutral-300">
          {reviews.map((r, i) => (
            <FadeUp key={r.name} delay={i * 0.1}>
              <article className="grid gap-4 border-b border-neutral-300 py-8 md:grid-cols-[150px_1fr] md:gap-8">
                <div className="flex items-center gap-3 md:block">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#e7e7e3] to-[#f6f7f2] text-[14px] font-semibold text-black">
                    {r.name[0]}
                  </span>
                  <div className="md:mt-3">
                    <p className="text-[12px] font-bold text-neutral-950">{r.name}</p>
                    <p className="mt-0.5 text-[11px] text-neutral-500">{r.date}</p>
                  </div>
                </div>

                <div>
                  <Stars rating={r.rating} size={14} />
                  <p className="mt-3 max-w-[52ch] text-[14px] leading-[1.75] text-neutral-900">
                    {r.text}
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a8af7e]" />
                    Verified buyer
                  </p>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}