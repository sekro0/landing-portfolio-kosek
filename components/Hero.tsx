"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { CountUp } from "@/components/CountUp";
import { Terminal } from "@/components/Terminal";

const EASE = [0.22, 1, 0.36, 1] as const;

const FACTS = [
  { to: 2, pad: 2, label: "Fundadores que escriben código" },
  { to: 0, pad: 2, label: "Intermediarios" },
  { to: 24, prefix: "<", suffix: "h", label: "Primera respuesta técnica" },
  { to: 100, suffix: "%", label: "Código y accesos tuyos" },
];

function MaskLine({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className="-my-[0.06em] block overflow-hidden py-[0.06em]">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const x3 = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);
  const asideY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const asideScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="grid grid-cols-12 overflow-hidden border-b border-line">
      <div className="col-span-12 flex flex-col justify-between gap-16 px-4 py-14 md:px-8 md:py-20 lg:col-span-8 lg:border-r lg:border-line">
        <motion.p
          className="font-mono text-label uppercase text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-acid">[00]</span> Ingeniería de software · Buenos Aires → LATAM
        </motion.p>

        <h1 className="stretch-tight text-mega font-black uppercase">
          <motion.span className="block" style={{ x: x1 }}>
            <MaskLine delay={0.1}>Sistemas</MaskLine>
          </motion.span>
          <motion.span className="block" style={{ x: x2 }}>
            <MaskLine delay={0.2}>que operan.</MaskLine>
          </motion.span>
          <motion.span className="block" style={{ x: x3 }}>
            <MaskLine delay={0.3} className="text-muted/50">
              <span className="relative inline-block">
                Páginas web.
                <motion.span
                  aria-hidden
                  className="absolute inset-x-0 top-[52%] h-[0.07em] origin-left bg-acid"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
                />
              </span>
            </MaskLine>
          </motion.span>
        </h1>

        <motion.div
          style={{ opacity: fade }}
          className="grid gap-10 md:grid-cols-[minmax(0,26rem)_1fr] md:items-end"
        >
          <motion.p
            className="text-lg leading-relaxed text-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          >
            Backends, integraciones de bases de datos, motores de reservas y automatizaciones que corren 24/7.
            Diseñados para fallar poco y, cuando fallan, avisar.
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center gap-6 md:justify-end"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          >
            <a
              href="#contacto"
              className="group relative inline-flex items-center gap-3 overflow-hidden border border-acid bg-acid px-7 py-4 font-mono text-sm font-bold uppercase tracking-wider text-background"
            >
              <span className="absolute inset-0 translate-y-full bg-background transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative transition-colors duration-500 group-hover:text-acid">Agendar diagnóstico</span>
              <ArrowRight className="relative h-4 w-4 transition-all duration-500 group-hover:translate-x-1 group-hover:text-acid" />
            </a>
            <a
              href="#casos"
              className="inline-flex items-center gap-1.5 border-b border-line pb-1 font-mono text-label uppercase text-muted transition-colors hover:border-acid hover:text-fg"
            >
              Ver casos <ArrowDownRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.aside
        style={{ y: asideY, scale: asideScale }}
        className="col-span-12 flex origin-top flex-col border-t border-line lg:col-span-4 lg:border-t-0"
      >
        <motion.div
          className="flex-1 p-4 md:p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
        >
          <Terminal />
        </motion.div>
        <dl className="grid grid-cols-2 border-t border-line">
          {FACTS.map((f, i) => (
            <div
              key={f.label}
              className={`flex flex-col-reverse border-line p-4 md:p-6 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""}`}
            >
              <dt className="mt-2 min-h-[2.75em] font-mono text-[10px] uppercase leading-snug tracking-widest text-muted">
                {f.label}
              </dt>
              <dd className="stretch-tight text-4xl font-black text-fg">
                <CountUp to={f.to} pad={f.pad} prefix={f.prefix} suffix={f.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </motion.aside>
    </section>
  );
}
