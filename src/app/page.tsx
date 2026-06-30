import Link from "next/link";
import { metadataFor, routeByPath, site } from "@/lib/site";

const homeRoute = routeByPath("/")!;

export const metadata = metadataFor(homeRoute);

const proofItems = [
  ["4.484", "preguntas de test a migrar"],
  ["30", "guías SEO preservadas"],
  ["99 EUR", "precio actual del curso"],
  ["1", "redirección crítica detectada"],
];

const services = [
  {
    title: "Alquilar título de transporte",
    text: "Orientación para empresas que necesitan operar cuanto antes con una vía clara y revisada.",
    href: "/titulos/",
  },
  {
    title: "Ceder tu título",
    text: "Acompañamiento para titulares que quieren estudiar una cesión con orden y sin improvisar.",
    href: "/cede-tu-titulo-de-transporte/",
  },
  {
    title: "Curso y test",
    text: "Preparación online para competencia profesional de mercancías con tests y apoyo de profesor IA.",
    href: "/producto/curso-titulo-profesional-transporte/",
  },
];

const faq = [
  [
    "¿Puedo mantener los mismos slugs de WordPress?",
    "Sí. La migración se está planteando para conservar la estructura actual y redirigir solo lo imprescindible.",
  ],
  [
    "¿Qué pasa con el curso y los pagos?",
    "La intención es sustituir WooCommerce por un flujo propio con Stripe, manteniendo producto, acceso y trazabilidad.",
  ],
  [
    "¿Se migrarán los tests?",
    "Sí. La base actual contiene miles de preguntas que deben pasar a un motor propio de práctica y simulacro.",
  ],
];

export default function Home() {
  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Quiero alquilar un título de transporte",
  )}`;

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Título de transporte · España</p>
          <h1>{homeRoute.h1}</h1>
          <p className="hero-lead">
            Migramos la experiencia actual de WordPress a una plataforma más
            rápida y mantenible, preservando las rutas que ya posicionan y
            mejorando la conversión sin inflar el contenido.
          </p>
          <div className="hero-actions">
            <a className="button primary" href={whatsappUrl}>
              Hablar por WhatsApp
            </a>
            <Link className="button secondary" href="/test-competencia-profesional-mercancias/">
              Practicar tests
            </Link>
          </div>
        </div>
        <div className="hero-panel" aria-label="Resumen de migración">
          <span className="panel-kicker">Plan de migración</span>
          <strong>WordPress → Next.js</strong>
          <p>
            SEO, contenido, curso, membresías, tests y profesor IA se migran
            como piezas controladas, no como una copia visual de Divi.
          </p>
          <div className="route-strip">
            <span>/</span>
            <span>/blog/</span>
            <span>/producto/...</span>
            <span>/test-...</span>
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Datos auditados">
        {proofItems.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="section two-col">
        <div>
          <p className="eyebrow">Intención principal</p>
          <h2>Captar clientes que buscan operar con título de transporte</h2>
        </div>
        <p>
          La home actual posiciona alrededor de “alquilar título de
          transporte”. La nueva versión mantiene esa intención, pero reduce
          repetición, refuerza confianza y separa mejor alquiler, cesión, curso
          y tests para evitar mensajes mezclados.
        </p>
      </section>

      <section className="services" aria-labelledby="servicios-heading">
        <div className="section-heading">
          <p className="eyebrow">Rutas comerciales</p>
          <h2 id="servicios-heading">Tres caminos, una estructura clara</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <Link key={service.href} className="service-card" href={service.href}>
              <span>0{services.indexOf(service) + 1}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section dark-band">
        <div>
          <p className="eyebrow">SEO técnico</p>
          <h2>La migración empieza por no perder lo que ya funciona</h2>
        </div>
        <ul className="check-list">
          <li>Slugs actuales preservados y auditados contra sitemap.</li>
          <li>Metadatos, canonicals, robots y schema definidos por ruta.</li>
          <li>Contenido indexable en HTML server-rendered.</li>
          <li>Assets optimizados y menos JavaScript que WordPress + Divi.</li>
        </ul>
      </section>

      <section className="faq" aria-labelledby="faq-heading">
        <p className="eyebrow">Preguntas frecuentes</p>
        <h2 id="faq-heading">Decisiones importantes de la migración</h2>
        <div className="faq-list">
          {faq.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map(([name, text]) => ({
              "@type": "Question",
              name,
              acceptedAnswer: { "@type": "Answer", text },
            })),
          }),
        }}
      />
    </main>
  );
}
