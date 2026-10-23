import Image from "next/image";
import Link from "next/link";
import { detailImage } from "@/lib/images";

export default function Statement() {
  return (
    <section
      id="craftsmanship"
      className="bg-[#dedede] px-6 pb-32 pt-10 md:px-[3%]"
    >
      <div className="max-w-[1600px]">
        <div className="max-w-xl text-[13px] font-medium leading-6 text-neutral-900 md:text-sm">
          <p>
            Perfumery too often clings to the familiar, missing the chance to
            change how a scent is lived with.
          </p>
          <p>
            Velmora is a house of unhurried makers. We believe a fragrance
            should be a deliberate, lingering presence, never a loud
            announcement.
          </p>
        </div>

        <div className="mt-16 md:ml-[47%] md:mt-24 md:w-[44%]">
          <div className="space-y-5 text-[11px] leading-[1.8] text-neutral-500">
            <p>
              Each formula begins with a single raw material — a resin, a root,
              a leaf — and is allowed to develop over months, not weeks, before
              a perfumer ever touches the blend.
            </p>
            <p>
              Our bottles are filled by hand, numbered, and rested before they
              leave the atelier, so every one arrives exactly as it was meant
              to smell.
            </p>
          </div>

          <Link
            href="#collection"
            className="mt-8 inline-block text-[11px] font-medium text-neutral-900 underline decoration-[#a8af7e] decoration-2 underline-offset-4 transition-colors hover:text-[#7d8458]"
          >
            Explore the atelier →
          </Link>

          <div className="relative mt-24 aspect-[4/3] w-full max-w-[420px] overflow-hidden bg-neutral-300">
            <Image
              src={detailImage}
              alt="Velmora atelier detail"
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div id="collection" />
    </section>
  );
}