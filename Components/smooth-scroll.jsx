"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import Lenis from "lenis";

/* Tiny store so useLenis() can read the instance without setState-in-effect */
let current = null;
const listeners = new Set();
const setCurrent = (value) => {
  current = value;
  listeners.forEach((fn) => fn());
};
const subscribeLenis = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export function useLenis() {
  return useSyncExternalStore(
    subscribeLenis,
    () => current,
    () => null,
  );
}

export function useScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (target, opts = {}) => {
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.4, ...opts });
        return;
      }
      const el =
        typeof target === "string" ? document.querySelector(target) : target;
      el?.scrollIntoView({ behavior: "smooth" });
    },
    [lenis],
  );
}

/* "Reduce motion" setting, read without setState-in-effect */
const QUERY = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (cb) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export default function SmoothScroll({ children }) {
  console.log("SmoothScroll rendered");
  const reduced = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.03, // between 0 and 1. Lower = silkier (0.05 – 0.12)
      wheelMultiplier: 1,
      smoothWheel: !reduced,
      syncTouch: false, // keep native touch scrolling on phones
      anchors: true, // <a href="#id"> links scroll smoothly too
      autoRaf: false, // we run the animation loop ourselves below
    });

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.lenis = lenis; // for checking in the console
    setCurrent(lenis);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setCurrent(null);
      if (window.lenis === lenis) delete window.lenis;
    };
  }, [reduced]);

  return children;
}
