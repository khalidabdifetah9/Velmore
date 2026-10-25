import RevealImage from "../Home/About/reveal-image";
import ProductCard from "./product-card";
import { collection, editorial } from "@/lib/collection";

const layout = [
  { type: "product", i: 0, pos: "lg:col-start-1 lg:row-start-1" },
  { type: "product", i: 1, pos: "lg:col-start-2 lg:row-start-1" },
  {
    type: "image",
    id: "a",
    pos: "col-span-2 aspect-[4/5] lg:col-start-3 lg:row-start-1 lg:row-span-2 lg:aspect-auto",
    direction: "up",
  },
  { type: "product", i: 2, pos: "lg:col-start-1 lg:row-start-2" },
  { type: "product", i: 3, pos: "lg:col-start-2 lg:row-start-2" },
  {
    type: "image",
    id: "b",
    pos: "col-span-2 aspect-[16/10] lg:col-start-1 lg:row-start-3 lg:aspect-auto",
    direction: "right",
  },
  { type: "product", i: 4, pos: "lg:col-start-3 lg:row-start-3" },
  { type: "product", i: 5, pos: "lg:col-start-4 lg:row-start-3" },
  { type: "product", i: 6, pos: "lg:col-start-1 lg:row-start-4" },
  { type: "product", i: 7, pos: "lg:col-start-2 lg:row-start-4" },
  { type: "product", i: 8, pos: "lg:col-start-3 lg:row-start-4" },
  { type: "product", i: 9, pos: "lg:col-start-4 lg:row-start-4" },
];

export default function CollectionGrid() {
  return (
    <section
      id="products"
      className="bg-white px-4 pb-24 pt-4 md:px-12 md:pb-36 md:pt-12"
    >
      <div className="mx-auto grid max-w-[1670px] grid-cols-2 gap-x-2 gap-y-8 md:gap-x-3 md:gap-y-12 lg:grid-cols-4">
        {layout.map((item) =>
          item.type === "product" ? (
            <ProductCard
              key={collection[item.i].slug}
              product={collection[item.i]}
              className={item.pos}
            />
          ) : (
            <RevealImage
              key={item.id}
              src={editorial[item.id].src}
              alt={editorial[item.id].alt}
              direction={item.direction}
              parallax={0}
              position={editorial[item.id].position}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={item.pos}
            />
          ),
        )}
      </div>
    </section>
  );
}
