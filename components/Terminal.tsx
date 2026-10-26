"use client";

import { motion } from "framer-motion";

type Line = { s: "ok" | "run"; k: string; v: string };

const LINES: Line[] = [
  { s: "ok", k: "postgres", v: "migración v47 · 0 locks" },
  { s: "ok", k: "api/reservas", v: "p95 38ms · 0 errores" },
  { s: "ok", k: "sync erp→crm", v: "12.408 filas · idempotente" },
  { s: "ok", k: "worker/facturas", v: "próximo run 03:00 ART" },
  { s: "ok", k: "backups", v: "snapshot 04:12 · ret. 30d" },
  { s: "run", k: "healthcheck", v: "monitoreando" },
];

export function Terminal() {
  return (
    <div className="border border-line bg-surface font-mono text-[12px] leading-relaxed">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-label uppercase text-muted">
        <span>~/kosek/infra</span>
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2 w-2 border border-line" />
          <i className="h-2 w-2 border border-line" />
          <i className="h-2 w-2 bg-acid" />
        </span>
      </div>

      <div className="space-y-1.5 p-4 md:p-5">
        <p className="text-fg">
          <span className="text-acid">$</span> kosek deploy --env=prod
        </p>
        {LINES.map((l, i) => (
          <motion.p
            key={l.k}
            className="grid grid-cols-[1rem_8.5rem_1fr] gap-2 whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.18, duration: 0.2 }}
          >
            <span className={l.s === "ok" ? "text-acid" : "text-muted"}>{l.s === "ok" ? "✓" : "›"}</span>
            <span className="text-fg">{l.k}</span>
            <span className="overflow-hidden text-ellipsis text-muted">
              {l.v}
              {l.s === "run" && <span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 animate-blink bg-acid" />}
            </span>
          </motion.p>
        ))}
      </div>

      <div className="flex justify-between border-t border-line px-4 py-2.5 text-label uppercase text-muted">
        <span>sa-east-1</span>
        <span>exit 0</span>
      </div>
    </div>
  );
}
