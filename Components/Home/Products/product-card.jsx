"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductCard({ product, index }) {
  return (
    <motion.article
      initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1.1,
        delay: Math.min(index, 3) * 0.1,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      <Link
        href={`/collection/${product.slug}`}
        draggable={false}
        className="group block select-none"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-200">
          <Image
            src={product.image}
            alt={`${product.name} perfume`}
            fill
            draggable={false}
            sizes="(max-width: 768px) 75vw, 25vw"
            className="object-cover transition-[filter,transform] duration-700 ease-out group-hover:scale-110 group-hover:blur-xl"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <span className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-mono)] text-[13px] uppercase tracking-[0.18em] text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            [ View 
          </span>

          <ul className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2 transition-[filter,opacity] duration-700 group-hover:opacity-70 group-hover:blur-[3px]">
            {product.tags.map((tag) => (
              <li
                key={tag}
                className=" bg-black/25 px-3 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.06em] text-white backdrop-blur-md"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3 flex items-center justify-between text-[15px] text-neutral-950">
          <p className="flex items-center gap-2.5 font-medium">
            {product.name}
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[13px] text-neutral-500">
            [ ${product.price} ]
          </p>
        </div>
      </Link>
    </motion.article>
  );
}