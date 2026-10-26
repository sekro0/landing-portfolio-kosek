"use client";

import { motion } from "framer-motion";

export type Line = { text: string; className?: string };

type Props = {
  lines: Line[];
  className?: string;
  as?: "h1" | "h2";
  delay?: number;
  animateOnMount?: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function SplitHeading({ lines, className, as = "h2", delay = 0, animateOnMount = false }: Props) {
  const Tag = as;
  const trigger = animateOnMount
    ? { animate: { y: "0%" } }
    : { whileInView: { y: "0%" }, viewport: { once: true, margin: "-80px" } };

  return (
    <Tag className={className}>
      {lines.map((l, i) => (
        <span key={i} className="-my-[0.06em] block overflow-hidden py-[0.06em]">
          <motion.span
            className={`block ${l.className ?? ""}`}
            initial={{ y: "110%" }}
            {...trigger}
            transition={{ duration: 0.9, delay: delay + i * 0.09, ease: EASE }}
          >
            {l.text}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
