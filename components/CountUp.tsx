"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

type Props = { to: number; pad?: number; prefix?: string; suffix?: string };

export function CountUp({ to, pad = 0, prefix = "", suffix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const format = (v: number) => `${prefix}${String(Math.round(v)).padStart(pad, "0")}${suffix}`;

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (node.textContent = format(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to]);

  return <span ref={ref}>{format(0)}</span>;
}
