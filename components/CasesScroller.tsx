"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SplitHeading } from "@/components/SplitHeading";

type Case = {
  code: string;
  sector: string;
  year: string;
  title: string;
  body: string;
  metrics: [string, string][];
  stack: string[];
  size: string;
  visual?: "schedule" | "uptime";
};

const CASES: Case[] = [
  {
    code: "C-01",
    sector: "Salud",
    year: "2026",
    title: "Motor de turnos multi-sede",
    body: "Red de clínicas con 3 sedes y 40 profesionales. Agenda unificada, cobro de seña por MercadoPago y confirmación por WhatsApp 24h antes.",
    metrics: [
      ["−68%", "ausentismo"],
      ["0", "doble turno"],
    ],
    stack: ["Postgres", "Node", "WhatsApp API"],
    size: "md:w-[46vw] md:max-w-[720px] md:h-[74%] md:self-center",
    visual: "schedule",
  },
  {
    code: "C-02",
    sector: "Distribución",
    year: "2025",
    title: "Sync ERP ↔ Tiendanube",
    body: "Stock y precios de 18k SKUs sincronizados cada 15 min. Antes: un CSV manual los lunes.",
    metrics: [["15min", "latencia máx."]],
    stack: ["Python", "Redis"],
    size: "md:w-[30vw] md:max-w-[460px] md:h-[52%] md:self-start",
  },
  {
    code: "C-03",
    sector: "Inmobiliaria",
    year: "2025",
    title: "Backoffice de propiedades",
    body: "Una sola fuente de verdad para 400 propiedades, 6 portales y el equipo comercial.",
    metrics: [["6→1", "sistemas"]],
    stack: ["Next.js", "Supabase"],
    size: "md:w-[30vw] md:max-w-[460px] md:h-[56%] md:self-end",
  },
  {
    code: "C-04",
    sector: "Contable",
    year: "2026",
    title: "Conciliación automática",
    body: "Extractos bancarios contra comprobantes de ARCA. Las diferencias llegan como tarea, no como sorpresa.",
    metrics: [["2d→20m", "por cierre"]],
    stack: ["n8n", "Postgres"],
    size: "md:w-[34vw] md:max-w-[520px] md:h-[60%] md:self-start",
  },
  {
    code: "C-05",
    sector: "Logística · SaaS",
    year: "2026",
    title: "Migración y observabilidad",
    body: "De un VPS sin backups a contenedores con CI/CD, réplicas y alertas. Sin ventana de mantenimiento.",
    metrics: [
      ["99.95%", "uptime 90d"],
      ["0", "downtime"],
    ],
    stack: ["Docker", "AWS", "Grafana"],
    size: "md:w-[42vw] md:max-w-[660px] md:h-[66%] md:self-center",
    visual: "uptime",
  },
];

const SCHEDULE = ["x.o..x", "xxo.x.", ".x.xxo", "o..x.x", "x.x.o.", ".xx..x"];

function ScheduleVisual() {
  return (
    <div className="border border-line">
      <div className="grid grid-cols-[3rem_repeat(6,1fr)] border-b border-line font-mono text-[10px] uppercase text-muted">
        <span />
        {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
          <span key={d} className="border-l border-line px-2 py-1.5">
            {d}
          </span>
        ))}
      </div>
      {SCHEDULE.map((row, r) => (
        <div key={r} className="grid grid-cols-[3rem_repeat(6,1fr)] border-b border-line last:border-b-0">
          <span className="px-2 py-1 font-mono text-[10px] text-muted">{String(8 + r).padStart(2, "0")}:00</span>
          {row.split("").map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (r * 6 + i) * 0.015 }}
              className={`h-6 border-l border-line ${
                c === "x" ? "bg-line" : c === "o" ? "bg-acid/80 transition-colors group-hover:bg-acid" : ""
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function UptimeVisual() {
  return (
    <div className="flex h-10 items-end gap-[3px]" aria-hidden>
      {Array.from({ length: 45 }, (_, i) => (
        <motion.span
          key={i}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.012, duration: 0.4 }}
          className={`flex-1 origin-bottom ${i === 31 ? "h-1/2 bg-muted/40" : "h-full bg-acid/70 transition-colors group-hover:bg-acid"}`}
        />
      ))}
    </div>
  );
}

function CaseCard({ c }: { c: Case }) {
  return (
    <article
      className={`group relative flex shrink-0 flex-col justify-between gap-6 border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-300 hover:border-acid/60 hover:shadow-acid md:p-8 ${c.size}`}
    >
      <header className="flex items-start justify-between gap-4 font-mono text-label uppercase text-muted">
        <span>
          {c.code} / {c.sector}
        </span>
        <span className="flex items-center gap-3">
          {c.year}
          <ArrowUpRight className="h-4 w-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acid" />
        </span>
      </header>

      {c.visual === "schedule" && <ScheduleVisual />}
      {c.visual === "uptime" && <UptimeVisual />}

      <div>
        <h3 className="stretch-tight text-3xl font-extrabold uppercase leading-[0.92] tracking-tight text-fg md:text-4xl">
          {c.title}
        </h3>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{c.body}</p>
      </div>

      <footer className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-5">
        <dl className="flex gap-8">
          {c.metrics.map(([v, k]) => (
            <div key={k} className="flex flex-col-reverse">
              <dt className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">{k}</dt>
              <dd className="stretch-tight text-3xl font-black text-fg">{v}</dd>
            </div>
          ))}
        </dl>
        <ul className="flex flex-wrap gap-1.5">
          {c.stack.map((s) => (
            <li key={s} className="border border-line px-2 py-1 font-mono text-[10px] uppercase text-muted">
              {s}
            </li>
          ))}
        </ul>
      </footer>
    </article>
  );
}

function Intro() {
  return (
    <div className="flex shrink-0 flex-col justify-between gap-10 md:w-[34vw] md:max-w-[540px]">
      <SplitHeading
        className="stretch-tight text-huge font-black uppercase"
        lines={[{ text: "En producción," }, { text: "no en Dribbble.", className: "text-acid" }]}
      />
      <div>
        <p className="max-w-sm leading-relaxed text-muted">
          Sistemas que hoy procesan turnos, pagos, stock y facturas reales. Métricas medidas, no estimadas.
        </p>
        <p className="mt-6 hidden items-center gap-3 font-mono text-label uppercase text-muted md:flex">
          Scrolleá <ArrowRight className="h-3.5 w-3.5 animate-pulse text-acid" />
        </p>
      </div>
    </div>
  );
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function CasesScroller() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(false);
  const [distance, setDistance] = useState(0);

  useIsoLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useIsoLayoutEffect(() => {
    if (!desktop || !trackRef.current || !viewportRef.current) return;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - viewport.clientWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [desktop]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * distance);
  const smoothX = useSpring(x, { stiffness: 140, damping: 30, mass: 0.4 });
  const skewX = useTransform(useVelocity(smoothX), [-2500, 2500], [5, -5], { clamp: true });
  const counter = useTransform(scrollYProgress, (v) => `0${Math.min(CASES.length, Math.floor(v * CASES.length) + 1)}`);

  if (!desktop) {
    return (
      <div ref={sectionRef} className="flex flex-col gap-3 px-4 py-14">
        <Intro />
        <div className="mt-8 flex flex-col gap-3">
          {CASES.map((c) => (
            <CaseCard key={c.code} c={c} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative" style={{ height: `calc(100svh + ${distance}px)` }}>
      <div ref={viewportRef} className="sticky top-14 flex h-[calc(100svh-3.5rem)] flex-col overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x: smoothX, skewX }}
          className="flex h-full w-max items-stretch gap-6 px-8 py-12 will-change-transform"
        >
          <Intro />
          {CASES.map((c) => (
            <CaseCard key={c.code} c={c} />
          ))}
          <div className="w-[8vw] shrink-0" />
        </motion.div>

        <div className="flex items-center gap-6 border-t border-line px-8 py-4 font-mono text-label uppercase text-muted">
          <span>
            <motion.span className="text-acid">{counter}</motion.span> / 0{CASES.length}
          </span>
          <div className="h-px flex-1 bg-line">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-acid" />
          </div>
          <span>Casos</span>
        </div>
      </div>
    </div>
  );
}
