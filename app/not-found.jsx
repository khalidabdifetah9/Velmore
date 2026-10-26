import Link from "next/link";
import Navbar from "@/Components/Shared/navbar";

export const metadata = {
  title: "Page not found — Velmora",
  description: "This page has evaporated. Return to the Velmora collection.",
};

export default function NotFound() {
  return (
    <>
      <Navbar visible />

      <main className="relative flex min-h-screen bg-[#dedede]">
        {/* Left: message */}
        <div className="flex min-w-0 flex-1 flex-col justify-center px-6 pb-24 pt-32 md:px-12">
          <div className="mb-6 flex items-center gap-3">
            <span className="block h-px w-7 bg-[#a8af7e]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-900">
              Error 404
            </p>
          </div>

          <h1 className="max-w-[14ch] font-[family-name:var(--font-display)] text-[clamp(2.8rem,6.4vw,6.5rem)] font-normal leading-[1.02] tracking-[-0.02em] text-neutral-950">
            This scent has <span className="italic">evaporated</span>
          </h1>

          <p className="mt-6 max-w-[42ch] text-[13px] leading-[1.75] text-neutral-700 md:mt-8 md:text-[14px]">
            The page you are looking for has moved, been renamed, or never
            existed. Nothing is lost, though. The collection is right where we
            left it.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3 md:mt-10 md:gap-4">
            {/* Solid button */}
            <Link
              href="/"
              className="group relative overflow-hidden border border-neutral-950 bg-neutral-950 px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:border-[#a8af7e] hover:text-neutral-950 md:px-7"
            >
              <span className="absolute inset-0 -translate-x-full bg-[#a8af7e] transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative">Back home</span>
            </Link>

            {/* Outline button */}
            <Link
              href="/collections"
              className="group relative overflow-hidden border border-neutral-950 px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] text-neutral-950 transition-colors duration-500 md:px-7"
            >
              <span className="absolute inset-0 -translate-x-full bg-neutral-950 transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative transition-colors duration-500 group-hover:text-white">
                View the collection
              </span>
            </Link>
          </div>
        </div>

        {/* Right: vertical 404, same treatment as the hero wordmark */}
        <div className="flex w-[22vw] shrink-0 justify-center pt-[13vh] md:w-[16vw] md:pt-[11vh]">
          <div className="flex select-none flex-col items-center gap-3">
            <p
              aria-hidden="true"
              className="text-[clamp(3.5rem,17vw,5.5rem)] font-medium leading-[0.85] tracking-[-0.045em] text-neutral-950 [writing-mode:vertical-rl] md:text-[clamp(4rem,9vw,11rem)]"
            >
              <span className="text-[#a8af7e]">+</span>404
            </p>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-neutral-900 text-[8px] font-medium leading-none text-neutral-900 md:h-6 md:w-6 md:text-[9px]">
              R
            </span>
          </div>
        </div>

        {/* Bottom line */}
        <p className="absolute bottom-6 left-6 text-[11px] uppercase tracking-[0.25em] text-neutral-500 md:bottom-8 md:left-12">
          Velmora · Quiet by design
        </p>
      </main>
    </>
  );
}