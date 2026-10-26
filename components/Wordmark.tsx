"use client";

import { motion } from "framer-motion";

export function Wordmark() {
  return (
    <p
      aria-label="Kosek"
      className="stretch-wide flex select-none justify-center overflow-hidden px-2 pt-6 text-[22vw] font-black uppercase leading-[0.8] tracking-tighter xl:text-[21rem]"
    >
      {"Kosek".split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="text-outline-dim inline-block cursor-default transition-colors duration-300 hover:text-acid"
          initial={{ y: "100%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </p>
  );
}
