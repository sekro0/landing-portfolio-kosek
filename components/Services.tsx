"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

type Service = {
  code: string;
  title: string;
  lead: string;
  body: string;
  spec: [string, string][];
};

const SERVICES: Service[] = [
  {
    code: "S-01",
    title: "Ecosistemas corporativos",
    lead: "Backoffice · Paneles · RBAC",
    body: "Reemplazamos las 14 planillas sueltas, el CRM a medio usar y el grupo de WhatsApp por un sistema interno con una sola fuente de verdad, permisos por rol y auditoría de cada cambio.",
    spec: [
      ["Stack", "Next.js · PostgreSQL · Auth con roles"],
      ["Entrega", "App en producción + repo + runbook"],
      ["Plazo", "6–12 semanas"],
    ],
  },
  {
    code: "S-02",
    title: "Integraciones de datos",
    lead: "ERP · CRM · E-commerce",
    body: "Sincronización bidireccional entre sistemas que no fueron hechos para hablarse. Idempotente, con reintentos, cola de errores y logs que se pueden leer sin llamarnos.",
    spec: [
      ["Stack", "Node.js · Python · Postgres · colas"],
      ["Entrega", "Conectores + monitoreo + alertas"],
      ["Plazo", "2–6 semanas"],
    ],
  },
  {
    code: "S-03",
    title: "Sistemas de reservas",
    lead: "Turnos · Pagos · Recordatorios",
    body: "Disponibilidad en tiempo real, cobro anticipado y recordatorios por WhatsApp. Cero doble turno: los locks viven en la base de datos, no en la buena voluntad del frontend.",
    spec: [
      ["Stack", "Postgres · MercadoPago/Stripe · WhatsApp API"],
      ["Entrega", "Motor + panel + widget embebible"],
      ["Plazo", "4–8 semanas"],
    ],
  },
  {
    code: "S-04",
    title: "Automatizaciones",
    lead: "Jobs · Webhooks · LLMs",
    body: "Lo que hoy hace una persona copiando y pegando entre pestañas lo convertimos en un job con horario, reintentos y una alerta cuando algo no cuadra. IA solo donde reduce error, no donde suma demo.",
    spec: [
      ["Stack", "n8n · cron · webhooks · Claude/GPT"],
      ["Entrega", "Flujos versionados + dashboard de ejecuciones"],
      ["Plazo", "1–4 semanas"],
    ],
  },
  {
    code: "S-05",
    title: "Infraestructura & DevOps",
    lead: "Deploy · Backups · Observabilidad",
    body: "CI/CD, entornos separados, backups probados (no solo configurados) y monitoreo con alertas. Si algo se cae, nos enteramos antes que vos.",
    spec: [
      ["Stack", "Docker · Railway/AWS · GitHub Actions"],
      ["Entrega", "Pipeline + IaC + guardia acordada"],
      ["Plazo", "Continuo"],
    ],
  },
];

export function Services() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-b border-line">
      {SERVICES.map((s, i) => {
        const isOpen = open === i;
        return (
          <motion.li
            key={s.code}
            className="border-t border-line"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`svc-${s.code}`}
              className="group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 text-left md:grid-cols-[5rem_1fr_14rem_auto] md:py-8"
            >
              <span className="font-mono text-label text-muted">{s.code}</span>
              <span
                className={`stretch-tight text-3xl font-extrabold uppercase leading-none tracking-tight transition-colors md:text-5xl ${
                  isOpen ? "text-acid" : "text-fg group-hover:text-acid"
                }`}
              >
                {s.title}
              </span>
              <span className="hidden font-mono text-label uppercase text-muted md:block">{s.lead}</span>
              <Plus
                strokeWidth={1.25}
                className={`h-6 w-6 transition-transform duration-300 ${isOpen ? "rotate-45 text-acid" : "text-muted"}`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`svc-${s.code}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-8 pb-10 md:grid-cols-[5rem_1fr_1fr] md:gap-4">
                    <span className="hidden md:block" />
                    <p className="max-w-md leading-relaxed text-muted">{s.body}</p>
                    <dl className="border-t border-line text-sm">
                      {s.spec.map(([k, v]) => (
                        <div key={k} className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-3">
                          <dt className="font-mono text-label uppercase text-muted">{k}</dt>
                          <dd className="text-fg">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}
