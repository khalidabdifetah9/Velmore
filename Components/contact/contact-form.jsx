"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FadeUp from "../Home/About/fade-up";
import WordReveal from "../Home/feature/word-reveal";

const headingWords = [
  { text: "Tell" },
  { text: "us" },
  { text: "what" },
  { text: "you", italic: true },
  { text: "are" },
  { text: "looking" },
  { text: "for" },
];

const fieldBase =
  "peer block w-full border-0 border-b border-neutral-300 bg-transparent pb-3 pt-2 text-[15px] text-neutral-950 outline-none transition-colors duration-300 placeholder:text-neutral-400";

function Field({ id, label, delay, children }) {
  return (
    <FadeUp delay={delay}>
      <div className="group relative">
        <label
          htmlFor={id}
          className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500"
        >
          {label}
        </label>
        {children}
        {/* Sage underline draws in on focus */}
        <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#a8af7e] transition-transform duration-500 ease-out group-focus-within:scale-x-100" />
      </div>
    </FadeUp>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section id="message" className="bg-white px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto grid max-w-[1200px] gap-14 md:grid-cols-[5fr_7fr] md:gap-x-[8%]">
        {/* Left: heading */}
        <div>
          <FadeUp>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-900">
              Send a message
            </p>
          </FadeUp>
          <WordReveal
            words={headingWords}
            delay={0.15}
            className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,3.8vw,3.75rem)] font-normal leading-[1.04] tracking-[-0.02em] text-neutral-950"
          />
          <FadeUp delay={0.3}>
            <p className="mt-6 max-w-[38ch] text-[13px] leading-[1.8] text-neutral-700">
              A few lines is plenty. Tell us the scent you are curious about, or
              the occasion, and we will take it from there.
            </p>
          </FadeUp>
        </div>

        {/* Right: form */}
        <form onSubmit={onSubmit} noValidate={false} className="space-y-9 md:pt-2">
          {/* Honeypot: hidden from people, bots fill it in */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />

          <Field id="name" label="Name" delay={0.1}>
            <input
              id="name"
              name="name"
              type="text"
              required
              minLength={2}
              maxLength={80}
              autoComplete="name"
              placeholder="Your full name"
              className={fieldBase}
            />
          </Field>

          <Field id="email" label="Email" delay={0.2}>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={120}
              autoComplete="email"
              placeholder="you@example.com"
              className={fieldBase}
            />
          </Field>

          <Field id="message-text" label="Message" delay={0.3}>
            <textarea
              id="message-text"
              name="message"
              required
              minLength={10}
              maxLength={2000}
              rows={5}
              placeholder="How can we help?"
              className={`${fieldBase} resize-none`}
            />
          </Field>

          <FadeUp delay={0.4} className="flex flex-wrap items-center gap-6">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative overflow-hidden border border-neutral-950 bg-neutral-950 px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:border-[#a8af7e] hover:text-neutral-950 disabled:cursor-wait disabled:opacity-60"
            >
              <span className="absolute inset-0 -translate-x-full bg-[#a8af7e] transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative">
                {status === "sending" ? "Sending…" : "Send message"}
              </span>
            </button>

            {/* Status message, announced to screen readers */}
            <div aria-live="polite" className="min-h-[1.5rem] overflow-hidden">
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.p
                    key="ok"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-2 text-[13px] text-neutral-950"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a8af7e]" />
                    Thank you. We will reply within two working days.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    key="err"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[13px] text-red-700"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>
        </form>
      </div>
    </section>
  );
}