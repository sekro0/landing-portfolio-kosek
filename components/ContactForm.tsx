"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/site";

const WEBHOOK = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK;
const BUDGETS = ["< USD 5k", "USD 5–15k", "USD 15–40k", "USD 40k+"];

type Status = "idle" | "sending" | "sent" | "error";

const input =
  "w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 text-lg text-fg placeholder:text-muted/40 transition-colors focus:border-acid focus:outline-none focus:ring-0";

function Field({ n, label, children }: { n: string; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-label uppercase text-muted">
        {n} / {label}
      </span>
      {children}
    </label>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (!WEBHOOK) {
      const subject = `Proyecto — ${data.empresa || data.nombre}`;
      const body = `${data.mensaje}\n\n${data.nombre} · ${data.empresa}\n${data.email}\nPresupuesto: ${data.presupuesto}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "kosek-landing" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-10">
      <div className="grid gap-10 md:grid-cols-2">
        <Field n="01" label="Nombre">
          <input name="nombre" required autoComplete="name" placeholder="Nombre y apellido" className={input} />
        </Field>
        <Field n="02" label="Empresa">
          <input name="empresa" autoComplete="organization" placeholder="Razón social o marca" className={input} />
        </Field>
      </div>

      <Field n="03" label="Email">
        <input name="email" type="email" required autoComplete="email" placeholder="vos@empresa.com" className={input} />
      </Field>

      <Field n="04" label="Qué está roto / qué hay que construir">
        <textarea
          name="mensaje"
          required
          rows={4}
          placeholder="Ej: tenemos 3 sedes, los turnos se cargan en un Excel compartido y se pisan."
          className={`${input} resize-none`}
        />
      </Field>

      <fieldset>
        <legend className="mb-4 font-mono text-label uppercase text-muted">05 / Presupuesto estimado</legend>
        <div className="flex flex-wrap gap-px border border-line bg-line">
          {BUDGETS.map((b, i) => (
            <label key={b} className="flex-1 cursor-pointer">
              <input type="radio" name="presupuesto" value={b} defaultChecked={i === 1} className="peer sr-only" />
              <span className="block whitespace-nowrap bg-background px-4 py-3 text-center font-mono text-xs text-muted transition-colors hover:text-fg peer-checked:bg-acid peer-checked:text-background peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-acid">
                {b}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
        <p className="font-mono text-label uppercase text-muted" aria-live="polite">
          {status === "sent" && (
            <span className="flex items-center gap-2 text-acid">
              <Check className="h-4 w-4" /> Recibido. Respondemos en &lt; 24h hábiles.
            </span>
          )}
          {status === "error" && <span className="text-fg">Falló el envío. Escribinos a {CONTACT_EMAIL}</span>}
          {(status === "idle" || status === "sending") && "Respuesta de un fundador. No de un bot."}
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-3 border border-acid bg-acid px-7 py-4 font-mono text-sm font-bold uppercase tracking-wider text-background transition-colors hover:bg-background hover:text-acid disabled:opacity-50"
        >
          {status === "sending" ? "Enviando…" : "Enviar brief"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
