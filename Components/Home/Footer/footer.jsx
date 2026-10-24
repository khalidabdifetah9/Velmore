"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import FadeUp from "../About/fade-up";
import { Facebook, Instagram, XIcon, Linkedin, Youtube } from "./social-icons";

const colOne = [
  { label: "Collection", href: "#collection" },
  { label: "Craftsmanship", href: "#craftsmanship" },
  { label: "Our story", href: "#about" },
  { label: "Contact", href: "/contact" },
  { label: "Journal", href: "/journal" },
];

const colTwo = [
  { label: "Fragrance notes", href: "#notes" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Consultation", href: "#consultation" },
  { label: "Stockists", href: "/stockists" },
  { label: "Shipping & returns", href: "/shipping" },
];

const socials = [
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "X", href: "#", Icon: XIcon },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "YouTube", href: "#", Icon: Youtube },
];

const legal = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
  { label: "Cookies settings", href: "/cookies" },
];

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="group relative w-fit text-[12px] font-medium text-neutral-900"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#a8af7e] transition-transform duration-500 group-hover:scale-x-100" />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white px-3 pb-6 pt-3 md:px-5 md:pt-5">
      {/* Rounded card */}
      <div className="relative overflow-hidden rounded-[2rem] bg-[#ebebe8] md:rounded-[3.5rem]">
        {/* Info area: same left/right edges as the other sections */}
        <div className="mx-auto max-w-[1200px] px-3 pt-12 md:px-7 md:pt-20">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Left: logo, atelier, contact, socials */}
            <FadeUp>
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 font-[family-name:var(--font-display)] text-3xl italic leading-none text-neutral-950"
              >
                <Image
                  src="/icon.svg"
                  alt="Velmora logo"
                  width={88}
                  height={88}
                  priority
                />
              </Link>

              <div className="mt-8 space-y-6 text-[11px] leading-[1.7] text-neutral-600">
                <div>
                  <p className="mb-1 font-bold text-neutral-950">Atelier</p>
                  <p>14 Rue de la Source, 75003 Paris</p>
                </div>
                <div>
                  <p className="mb-1 font-bold text-neutral-950">Contact</p>
                  <p>+33 1 23 45 67 89 / atelier@velmora.com</p>
                </div>
              </div>

              <ul className="mt-6 flex items-center gap-4 text-neutral-950">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      aria-label={label}
                      className="block transition-colors duration-300 hover:text-[#a8af7e]"
                    >
                      <Icon />
                    </a>
                  </li>
                ))}
              </ul>
            </FadeUp>

            {/* Right: two link columns */}
            <FadeUp delay={0.15}>
              <div className="grid grid-cols-2 gap-8 md:ml-auto md:w-[78%] md:gap-12">
                <nav aria-label="Footer">
                  <ul className="flex flex-col gap-3.5">
                    {colOne.map((l) => (
                      <li key={l.label}>
                        <FooterLink href={l.href}>{l.label}</FooterLink>
                      </li>
                    ))}
                  </ul>
                </nav>
                <nav aria-label="Footer secondary">
                  <ul className="flex flex-col gap-3.5">
                    {colTwo.map((l) => (
                      <li key={l.label}>
                        <FooterLink href={l.href}>{l.label}</FooterLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Cut-off wordmark: the box is 0.62em tall, so the lower part is hidden */}
        <div
          aria-hidden="true"
          className="relative mt-14 h-[0.62em] select-none overflow-hidden text-[25vw] md:mt-20"
        >
          <motion.div
            initial={{ y: "45%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="-mt-[0.12em] flex justify-center font-[family-name:var(--font-display)] font-normal leading-none tracking-[-0.03em] text-neutral-950"
          >
            Velmora
          </motion.div>
        </div>
      </div>

      {/* Bottom row, on white below the card */}
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-3 pt-5 text-[11px] text-neutral-600 md:flex-row md:items-center md:justify-between md:px-7">
        <p>© 2026 Velmora. All rights reserved.</p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {legal.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="underline underline-offset-4 transition-colors duration-300 hover:text-neutral-950 hover:decoration-[#a8af7e]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
