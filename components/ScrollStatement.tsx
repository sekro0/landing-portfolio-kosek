"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const TEXT =
  "No hacemos páginas web. Construimos la *infraestructura* que tu operación da por sentada: *datos*, *reservas*, *pagos* y *procesos* que corren solos a las 3 AM.";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const accent = word.startsWith("*");
  const clean = word.replace(/\*/g, "");
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, ["0.25em", "0em"]);

  return (
    <motion.span style={{ opacity, y }} className={`mr-[0.22em] inline-block ${accent ? "text-acid" : "text-fg"}`}>
      {clean}
    </motion.span>
  );
}

export function ScrollStatement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = TEXT.split(" ");
  const pct = useTransform(scrollYProgress, (v) => `${String(Math.round(v * 100)).padStart(3, "0")}%`);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="relative h-[260vh] border-b border-line">
      <div className="sticky top-14 flex h-[calc(100svh-3.5rem)] flex-col justify-between overflow-hidden px-4 py-10 md:px-8 md:py-14">
        <div className="flex items-center justify-between font-mono text-label uppercase text-muted">
          <span>
            <span className="text-acid">[—]</span> Declaración de principios
          </span>
          <motion.span>{pct}</motion.span>
        </div>

        <p className="stretch-tight max-w-[30ch] text-[clamp(2rem,4.4vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tight">
          {words.map((w, i) => {
            const start = (i / words.length) * 0.85;
            return <Word key={i} word={w} progress={scrollYProgress} range={[start, start + 0.85 / words.length]} />;
          })}
        </p>

        <div className="h-px w-full bg-line">
          <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-acid" />
        </div>
      </div>
    </section>
  );
}
