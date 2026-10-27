"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "Craftsmanship", href: "/craftsmanship" },
  { label: "Collection", href: "/collections" },
];

const EASE = [0.22, 1, 0.36, 1];

export default function Navbar({ visible = true }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);

  // Scroll state + which kind of section is behind the navbar
  useEffect(() => {
    let raf;
    const check = () => {
      setScrolled(window.scrollY > 24);
      const els = document.elementsFromPoint(window.innerWidth / 2, 40);
      const el = els.find(
        (e) => !e.closest("header") && e.closest("[data-nav-tone]"),
      );
      const tone = el?.closest("[data-nav-tone]")?.dataset.navTone;
      setOverDark(tone === "light"); // "light" = light text = dark photo section
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Mobile menu: lock page scroll, close on Escape or when resized to desktop
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // Close the menu first, then smooth-scroll to the section
  const go = (e, href) => {
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    setTimeout(
      () =>
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }),
      wasOpen ? 400 : 0,
    );
  };

  const showBg = scrolled && !overDark && !open;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 ${visible ? "" : "pointer-events-none"}`}
      >
        <div
          aria-hidden="true"
          className={`absolute inset-0 -z-10 border-b border-white/10 bg-white/70 backdrop-blur-xl transition-opacity duration-500 ${
            showBg ? "opacity-100" : "opacity-0"
          }`}
        />

        <nav
          className={`flex items-center justify-between px-6 transition-[height] duration-500 md:px-12 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Velmora home"
            className="flex items-center"
          >
            <Image
              src="/icon.svg"
              alt="Velmora logo"
              width={88}
              height={88}
              priority
              className={`object-contain transition-all duration-500 ${
                scrolled ? "h-8 w-8 md:h-9 md:w-9" : "h-9 w-9 md:h-11 md:w-11"
              }`}
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-12 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative uppercase text-[15px] font-medium tracking-[0.02em] text-[#a8af7e] transition-colors duration-500 hover:text-[#a8af7e]"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-[#a8af7e] transition-transform duration-500 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute h-[1.5px] w-6 bg-[#a8af7e]"
            />
            <motion.span
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute h-[1.5px] w-6 bg-[#a8af7e]"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu (outside the header so `fixed` is relative to the screen) */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex max-h-80 bg-white flex-col justify-center px-6 md:hidden"
          >
            <ul className="border-t border-white/10">
              {links.map((link, i) => (
                <li
                  key={link.href}
                  className="overflow-hidden border-b border-white/10"
                >
                  <motion.a
                    href={link.href}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.25 + i * 0.1,
                      ease: EASE,
                    }}
                    className="flex items-baseline justify-between py-6 text-[clamp(2.4rem,11vw,3.6rem)] leading-none tracking-[-0.02em] text-[#a8af7e]"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute bottom-8 left-6 text-[11px] uppercase tracking-[0.25em] text-white/50"
            >
              Velmora · Quiet by design
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
