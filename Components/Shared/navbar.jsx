"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  { label: "Craftsmanship", href: "#craftsmanship" },
  { label: "Collection", href: "#collection" },
];

export default function Navbar({ visible, tone = "light" }) {
  const isLight = tone === "light";

  return (
    <motion.header
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 ${visible ? "" : "pointer-events-none"}`}
    >
      <nav className="flex h-20 items-center justify-between px-6 md:px-12">
        <Link
          href="/"
          className={`flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.32em] transition-colors duration-500 ${
            isLight ? "text-white" : "text-white"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-[#a8af7e]" />
          Velmora
        </Link>

        <ul className="flex items-center gap-8 md:gap-12">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`group relative text-[11px] uppercase tracking-[0.22em] transition-colors duration-500 hover:text-[#a8af7e] ${
                  isLight ? "text-white" : "text-white"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-[#a8af7e] transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}