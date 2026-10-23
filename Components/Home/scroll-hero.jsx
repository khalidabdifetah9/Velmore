"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import ImageGrid from "./image-grid";
import Hero from "./Hero/hero";
import Navbar from "../Shared/navbar";

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const ZOOM_END = 0.55; // progress where the center tile fills the screen

export default function ScrollHero() {
  const sectionRef = useRef(null);
  const centerRef = useRef(null);
  const maxScale = useMotionValue(3.5);
  const [navVisible, setNavVisible] = useState(false);
  const [navTone, setNavTone] = useState("light");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.4,
  });

  // Measure the center tile so the zoom covers the viewport exactly
  useEffect(() => {
    const measure = () => {
      const el = centerRef.current;
      if (!el) return;
      const s = Math.max(
        window.innerWidth / el.offsetWidth,
        window.innerHeight / el.offsetHeight
      );
      maxScale.set(s * 1.01);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [maxScale]);

  const scale = useTransform([progress, maxScale], ([p, max]) => {
    const t = Math.min(Math.max(p / ZOOM_END, 0), 1);
    return 1 + (max - 1) * easeInOutCubic(t);
  });

  useMotionValueEvent(progress, "change", (v) => {
    setNavVisible(v > 0.68);
  });

  // Once the pinned hero ends and the light section scrolls under the navbar,
  // switch the navbar to dark text.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setNavTone(v > 0.985 ? "dark" : "light");
  });

  return (
    <>
      <Navbar visible={navVisible} tone={navTone} />

      <section ref={sectionRef} className="relative h-[380vh] bg-black">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          {/* Grid layer: the center tile scales up and STAYS as the hero background */}
          <motion.div
            style={{ scale }}
            className="absolute inset-0 origin-center will-change-transform"
          >
            <ImageGrid progress={progress} centerRef={centerRef} />
          </motion.div>

          {/* Hero text layer on top of the zoomed image */}
          <Hero progress={progress} />
        </div>
      </section>
    </>
  );
}