"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Hero from "./Hero/hero";
import Navbar from "../Shared/navbar";
import { gridImages } from "@/lib/images";
import { useLenis } from "@/Components/smooth-scroll"

/* ── Timing (ms) ── */
const START_DELAY = 350; // white screen before the first flash
const STEP = 190; // time between flashes: lower = faster
const HOLD = 450; // pause on the hero image before it zooms
const ZOOM = 1.15; // zoom duration in seconds


/* ── Images: the hero photo (index 4) is always the last one ── */
const heroImg = gridImages[4];
const pile = gridImages.filter((_, i) => i !== 4);
const items = [...pile, heroImg];
const TOTAL = items.length;

/* ── Hand-placed "messy" pile: offset from center, rotation, size variation ── */
const mess = [
  { x: "-9vw", y: "-6vh", r: -9, s: 1 },
  { x: "8vw", y: "5vh", r: 7, s: 0.92 },
  { x: "-4vw", y: "9vh", r: -4, s: 1.06 },
  { x: "11vw", y: "-8vh", r: 11, s: 0.96 },
  { x: "-12vw", y: "3vh", r: 5, s: 1.04 },
  { x: "3vw", y: "-10vh", r: -12, s: 0.9 },
  { x: "7vw", y: "8vh", r: -6, s: 1.02 },
  { x: "-7vw", y: "-3vh", r: 8, s: 0.98 },
];

// Keeps the bottle in frame on phones. Same crop on the intro card and the real hero.
const HERO_POS = "object-cover object-[41%_50%] md:object-center";

const pad = (n) => String(n).padStart(2, "0");

export default function ScrollHero() {
  const [base, setBase] = useState(0.34);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState("pile"); // "pile" -> "zoom"
  const [done, setDone] = useState(false); // intro overlay removed
  const [show, setShow] = useState(false); // hero text may enter
  const [navVisible, setNavVisible] = useState(false);

  // Setup: respect reduced motion, pick the pile size, always start at the top
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    setBase(window.innerWidth < 768 ? 0.52 : 0.34);
  }, []);

  // Lock page scroll while the intro plays
  useEffect(() => {
    document.documentElement.style.overflow = done ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [done]);

  // Start once every image has loaded (or after 4s, whichever comes first)
  useEffect(() => {
    if (loaded >= TOTAL) setReady(true);
  }, [loaded]);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready || done) return;
    let tick, hold;
    const start = setTimeout(() => {
      let n = 0;
      tick = setInterval(() => {
        n += 1;
        setCount(n);
        if (n >= TOTAL) {
          clearInterval(tick);
          hold = setTimeout(() => setPhase("zoom"), HOLD);
        }
      }, STEP);
    }, START_DELAY);
    return () => {
      clearTimeout(start);
      clearTimeout(hold);
      clearInterval(tick);
    };
  }, [ready, done]);

  // The hero text enters only AFTER the intro overlay is gone, so it is actually seen
  useEffect(() => {
    if (!done) return;
    setShow(true);
    const t = setTimeout(() => setNavVisible(true), 900);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <>
      <Navbar visible={navVisible} />

      {/* The real hero: sits underneath the intro, so the zoom lands on it seamlessly */}
      <section
        data-nav-tone="light"
        className="relative h-screen w-full overflow-hidden bg-black"
      >
        <Image
          src={heroImg.src}
          alt={heroImg.alt}
          fill
          priority
          sizes="100vw"
          className={HERO_POS}
        />
        <Hero show={show} />
      </section>

      {/* Intro overlay */}
      {!done && (
        <div
          aria-hidden="true"
          className="fixed left-0 top-0 z-[100] h-screen w-screen overflow-hidden bg-white"
        >
          {items.map((img, i) => {
            const isHero = i === TOTAL - 1;
            const m = isHero ? { x: "0vw", y: "0vh", r: 0, s: 1 } : mess[i];
            const shown = i < count;
            const size = base * m.s;

            const hidden = { opacity: 0, scale: size * 1.35, rotate: m.r * 2, x: m.x, y: m.y };
            const landed = { opacity: 1, scale: isHero ? base * 1.08 : size, rotate: m.r, x: m.x, y: m.y };
            const zoomed = { opacity: 1, scale: 1, rotate: 0, x: "0vw", y: "0vh", borderWidth: 0 };

            return (
              <motion.div
                key={img.src}
                initial={hidden}
                animate={isHero && phase === "zoom" ? zoomed : shown ? landed : hidden}
                transition={
                  isHero && phase === "zoom"
                    ? { duration: ZOOM, ease: [0.76, 0, 0.24, 1] }
                    : { duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }
                }
                onAnimationComplete={() => {
                  if (isHero && phase === "zoom") setDone(true);
                }}
                style={{
                  zIndex: i + 1,
                  boxShadow: "0 40px 90px -30px rgba(0,0,0,0.5)",
                }}
                className="absolute inset-0 overflow-hidden bg-neutral-200 will-change-transform"
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  onLoad={() => setLoaded((n) => n + 1)}
                  className={isHero ? HERO_POS : "object-cover"}
                />
              </motion.div>
            );
          })}

          {/* Counter */}
          <motion.div
            animate={{ opacity: phase === "zoom" ? 0 : count > 0 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-6 left-6 z-[50] flex items-center gap-4 md:bottom-8 md:left-12"
          >
            <span className="text-[11px] font-semibold tabular-nums tracking-[0.2em] text-neutral-950">
              {pad(Math.max(count, 1))} / {pad(TOTAL)}
            </span>
            <span className="h-px w-16 bg-neutral-300">
              <span
                className="block h-full origin-left bg-[#a8af7e] transition-transform duration-200"
                style={{ transform: `scaleX(${count / TOTAL})` }}
              />
            </span>
          </motion.div>
        </div>
      )}
    </>
  );
}