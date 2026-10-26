"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FOUNDERS = [
  {
    handle: "Kombak",
    role: "Backend · Datos · Infraestructura",
    body: "Modelado de datos, APIs, colas y deploys. Piensa en transacciones, índices y en qué pasa cuando se corta la red a mitad de un pago.",
    focus: ["PostgreSQL", "Node / Python", "AWS · Docker"],
    dir: -1,
  },
  {
    handle: "Sekro",
    role: "Producto · Frontend · Automatización",
    body: "Interfaces internas que se usan sin manual, integraciones y flujos que eliminan trabajo repetitivo. Mide el éxito en horas devueltas al equipo.",
    focus: ["React / Next.js", "n8n · Webhooks", "UX operativa"],
    dir: 1,
  },
];

function Founder({ f, i }: { f: (typeof FOUNDERS)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [`${-f.dir * 12}%`, `${f.dir * 12}%`]);
  const line = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);

  return (
    <div ref={ref} className="overflow-hidden border-b border-line py-14 last:border-b-0">
      <motion.p
        style={{ x }}
        className={`stretch-wide whitespace-nowrap text-[18vw] font-black uppercase leading-[0.8] tracking-tighter xl:text-[17rem] ${
          i === 1 ? "text-outline text-right" : "text-fg"
        }`}
      >
        {f.handle}
      </motion.p>

      <div className={`mt-10 grid gap-8 px-4 md:grid-cols-12 md:px-8 ${i === 1 ? "md:[&>*]:col-start-6" : ""}`}>
        <div className="md:col-span-7">
          <div className="relative h-px bg-line">
            <motion.div style={{ scaleX: line }} className="absolute inset-0 origin-left bg-acid" />
          </div>
          <div className="mt-4 flex items-baseline justify-between gap-4 font-mono text-label uppercase text-muted">
            <span>F-0{i + 1}</span>
            <span>{f.role}</span>
          </div>
          <p className="mt-6 max-w-lg leading-relaxed text-muted">{f.body}</p>
          <ul className="mt-6 flex flex-wrap gap-1.5">
            {f.focus.map((x) => (
              <li key={x} className="border border-line px-2 py-1 font-mono text-[10px] uppercase text-muted">
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Founders() {
  return (
    <div className="border-t border-line">
      {FOUNDERS.map((f, i) => (
        <Founder key={f.handle} f={f} i={i} />
      ))}
    </div>
  );
}
