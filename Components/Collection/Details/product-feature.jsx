import FadeUp from "@/Components/Home/About/fade-up";
import WordReveal from "@/Components/Home/feature/word-reveal";

const list = (a) =>
  a.length > 1
    ? `${a.slice(0, -1).join(", ").toLowerCase()} and ${a[a.length - 1].toLowerCase()}`
    : a[0].toLowerCase();

export default function ProductFeature({ product, details }) {
  const { notes } = details;

  const words = [
    { text: "The" },
    { text: "story" },
    { text: "of" },
    ...product.name.split(" ").map((w) => ({ text: w, italic: true })),
  ];

  const composition = notes
    ? `It opens with ${list(notes.top)}, turns to ${list(notes.heart)} at the heart, and settles on a base of ${list(notes.base)}.`
    : details.description;

  return (
    <section id="scent" className="bg-white px-6 py-24 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1200px] gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-x-[6%]">
        <div>
          <FadeUp>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-900">
              The scent
            </p>
          </FadeUp>
          <WordReveal
            words={words}
            delay={0.15}
            className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,3.8vw,3.75rem)] font-normal leading-[1.03] tracking-[-0.02em] text-neutral-950"
          />
        </div>

        <div>
          <div className="grid gap-10 md:grid-cols-2 md:gap-12">
            <FadeUp>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
                Inspiration
              </p>
              <p className="text-[13px] leading-[1.85] text-neutral-700">
                {details.inspiration}
              </p>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
                Olfactory composition
              </p>
              <p className="text-[13px] leading-[1.85] text-neutral-700">{composition}</p>
            </FadeUp>
          </div>

          <FadeUp delay={0.2} className="mt-14 border-t border-neutral-300">
            <p className="mt-6 max-w-[34ch] font-[family-name:var(--font-display)] text-[clamp(1.4rem,2.2vw,2rem)] italic leading-snug text-neutral-950">
              {details.tagline}
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
              {details.facts.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    {label}
                  </dt>
                  <dd className="mt-2 text-[12.5px] leading-snug text-neutral-950">{value}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}