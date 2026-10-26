import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product, className = "" }) {
  return (
    <article className={className}>
      {/* Grey tile. multiply blend lets white product shots melt into the grey */}
      <div className="relative aspect-square bg-[#ececec]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-contain p-[12%] mix-blend-multiply"
        />
      </div>

      {/* Name + price */}
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="text-[11px] font-semibold uppercase leading-snug tracking-[0.08em] text-neutral-950 md:text-[12px]">
          {product.name}
        </h3>
        <p className="shrink-0 text-[11px] text-neutral-700 md:text-[12px]">
          ${product.price}
        </p>
      </div>

      {/* View button */}
      <Link
        href={`/collections/${product.slug}`}
        aria-label={`View ${product.name}`}
        className="mt-3 block bg-neutral-950 py-3 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-[#a8af7e] hover:text-neutral-950"
      >
        View
      </Link>
    </article>
  );
}