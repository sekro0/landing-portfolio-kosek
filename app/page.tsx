import { CasesScroller } from "@/components/CasesScroller";
import { ContactForm } from "@/components/ContactForm";
import { Founders } from "@/components/Founders";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollStatement } from "@/components/ScrollStatement";
import { Services } from "@/components/Services";
import { SplitHeading } from "@/components/SplitHeading";
import { VelocityMarquee } from "@/components/VelocityMarquee";
import { Wordmark } from "@/components/Wordmark";
import { CONTACT_EMAIL } from "@/lib/site";

const NAV = [
  { n: "01", label: "Servicios", href: "#servicios" },
  { n: "02", label: "Casos", href: "#casos" },
  { n: "03", label: "Equipo", href: "#equipo" },
  { n: "04", label: "Contacto", href: "#contacto" },
];

const STACK = [
  "PostgreSQL",
  "Node.js",
  "Python",
  "Next.js",
  "Redis",
  "Docker",
  "n8n",
  "Supabase",
  "MercadoPago",
  "WhatsApp API",
  "ARCA / AFIP",
  "GitHub Actions",
];

const CAPABILITIES = ["Sistemas", "Datos", "Reservas", "Automatización", "Infraestructura"];

const MANIFESTO = [
  "Firmamos el código que escribimos. No hay juniors escondidos detrás de un project manager.",
  "Si no se puede medir, no está terminado. Logs, métricas y alertas desde el primer deploy.",
  "El repositorio, las credenciales y la documentación son tuyos. Siempre. Sin lock-in.",
  "Aburrido y estable le gana a novedoso y frágil. Postgres antes que la moda del trimestre.",
  "Si tu problema no necesita software, te lo decimos. Pasa más seguido de lo que creés.",
];

function SectionLabel({ n, title, meta }: { n: string; title: string; meta: string }) {
  return (
    <div className="flex items-center gap-4 border-b border-line px-4 py-3 font-mono text-label uppercase text-muted md:px-8">
      <span className="text-acid">[{n}]</span>
      <span className="text-fg">{title}</span>
      <span className="h-px flex-1 bg-line" />
      <span>{meta}</span>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between border-x border-line px-4 md:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="h-3 w-3 bg-acid" />
            <span className="stretch-wide text-sm font-black uppercase tracking-tight">Kosek</span>
            <span className="font-mono text-label uppercase text-muted">/sys</span>
          </a>
          <nav className="hidden gap-8 md:flex">
            {NAV.map((l) => (
              <a key={l.href} href={l.href} className="font-mono text-label uppercase text-muted transition-colors hover:text-acid">
                <span className="text-line">{l.n}</span> {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#contacto"
            className="flex items-center gap-2 font-mono text-label uppercase text-fg transition-colors hover:text-acid"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-acid" />
            <span className="hidden sm:inline">2 cupos · Q1 2027</span>
            <span className="sm:hidden">Contacto</span>
          </a>
        </div>
        <ScrollProgress />
      </header>

      <main id="top" className="mx-auto max-w-[1600px] border-x border-line pt-14">
        <Hero />

        <div className="border-b border-line">
          <VelocityMarquee baseVelocity={-1.5} className="border-b border-line">
            {CAPABILITIES.map((c, i) => (
              <span
                key={c}
                className={`stretch-tight flex items-center gap-[0.35em] pr-[0.35em] text-huge font-black uppercase ${
                  i % 2 ? "text-outline" : "text-fg"
                }`}
              >
                {c}
                <span className="inline-block h-[0.28em] w-[0.28em] bg-acid" />
              </span>
            ))}
          </VelocityMarquee>
          <VelocityMarquee baseVelocity={1} className="font-mono text-label uppercase text-muted">
            {STACK.map((s) => (
              <span key={s} className="border-r border-line px-6 py-3">
                {s}
              </span>
            ))}
          </VelocityMarquee>
        </div>

        <ScrollStatement />

        {/* SERVICIOS */}
        <section id="servicios" className="border-b border-line">
          <SectionLabel n="01" title="Qué hacemos" meta="05 módulos" />
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 py-12 md:px-8 lg:col-span-4 lg:border-r lg:border-line">
              <div className="lg:sticky lg:top-24">
                <SplitHeading
                  className="stretch-tight text-huge font-black uppercase"
                  lines={[{ text: "Hoja de" }, { text: "especi-", className: "text-acid" }, { text: "ficaciones.", className: "text-acid" }]}
                />
                <Reveal delay={0.2}>
                  <p className="mt-6 max-w-sm leading-relaxed text-muted">
                    No vendemos paquetes. Cada proyecto combina estos módulos según lo que tu operación necesita hoy y
                    lo que va a necesitar cuando triplique el volumen.
                  </p>
                </Reveal>
              </div>
            </div>
            <div className="col-span-12 px-4 pb-12 md:px-8 lg:col-span-8 lg:pt-12">
              <Services />
            </div>
          </div>
        </section>

        {/* CASOS */}
        <section id="casos" className="border-b border-line">
          <SectionLabel n="02" title="Casos" meta="Producción · 2025–2026" />
          <CasesScroller />
        </section>

        {/* EQUIPO */}
        <section id="equipo" className="border-b border-line">
          <SectionLabel n="03" title="Quiénes somos" meta="Manifiesto · v1.0" />
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 py-14 md:px-8 lg:col-span-5 lg:border-r lg:border-line">
              <div className="lg:sticky lg:top-24">
                <SplitHeading
                  className="stretch-tight text-huge font-black uppercase"
                  lines={[{ text: "Dos" }, { text: "ingenieros." }, { text: "Cero capas.", className: "text-outline" }]}
                />
              </div>
            </div>
            <ol className="col-span-12 lg:col-span-7">
              {MANIFESTO.map((m, i) => (
                <li key={i} className="border-t border-line first:border-t-0 max-lg:first:border-t">
                  <Reveal
                    y={40}
                    className="grid grid-cols-[3rem_1fr] gap-4 px-4 py-8 md:grid-cols-[5rem_1fr] md:px-8 md:py-10"
                  >
                    <span className="font-mono text-label text-acid">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-xl leading-snug text-fg md:text-2xl">{m}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
          <Founders />
        </section>

        {/* CONTACTO */}
        <section id="contacto">
          <SectionLabel n="04" title="Contacto" meta="Respuesta < 24h hábiles" />
          <div className="grid grid-cols-12">
            <div className="col-span-12 flex flex-col justify-between gap-12 px-4 py-14 md:px-8 lg:col-span-5 lg:border-r lg:border-line">
              <div>
                <SplitHeading
                  className="stretch-tight text-huge font-black uppercase"
                  lines={[{ text: "¿Qué está" }, { text: "roto?", className: "text-acid" }]}
                />
                <Reveal delay={0.2}>
                  <p className="mt-6 max-w-sm leading-relaxed text-muted">
                    Contanos el problema, no la solución que imaginás. La primera llamada es un diagnóstico técnico de
                    30 minutos, sin costo y sin pitch.
                  </p>
                </Reveal>
              </div>
              <dl className="border-t border-line font-mono text-sm">
                {[
                  ["Email", CONTACT_EMAIL],
                  ["Base", "Buenos Aires, AR · GMT−3"],
                  ["Idiomas", "ES · EN"],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[6rem_1fr] border-b border-line py-3">
                    <dt className="text-label uppercase text-muted">{k}</dt>
                    <dd className="text-fg">
                      {k === "Email" ? (
                        <a href={`mailto:${v}`} className="transition-colors hover:text-acid">
                          {v}
                        </a>
                      ) : (
                        v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <Reveal className="col-span-12 border-t border-line px-4 py-14 md:px-8 lg:col-span-7 lg:border-t-0" y={30}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-[1600px] overflow-hidden border-x border-t border-line">
        <Wordmark />
        <div className="flex flex-wrap justify-between gap-4 border-t border-line px-4 py-4 font-mono text-label uppercase text-muted md:px-8">
          <span>© {new Date().getFullYear()} Kosek Systems</span>
          <span>Kombak × Sekro</span>
          <a href="#top" className="transition-colors hover:text-acid">
            Volver arriba ↑
          </a>
        </div>
      </footer>
    </>
  );
}
