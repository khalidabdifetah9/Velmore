import FadeUp from "@/Components/Home/About/fade-up";
import ProductCard from "../product-card";

export default function ProductSeeAlso({ items }) {
  return (
    <section id="see-also" className="bg-white px-3 pb-24 pt-8 md:px-4 md:pb-36">
      <div className="mx-auto max-w-[1670px]">
        <FadeUp>
          <h2 className="mb-8 px-2 font-[family-name:var(--font-display)] text-[clamp(2rem,3vw,3rem)] font-normal text-neutral-950 md:mb-12">
            See also
          </h2>
        </FadeUp>

        <div className="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-3 md:gap-x-3">
          {items.map((p, i) => (
            <ProductCard
              key={p.slug}
              product={p}
              className={i === 2 ? "col-span-2 md:col-span-1" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}