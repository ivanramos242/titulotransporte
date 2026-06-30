import Link from "next/link";
import Image from "next/image";
import { metadataFor, routeByPath, site } from "@/lib/site";

const homeRoute = routeByPath("/")!;

export const metadata = metadataFor(homeRoute);

const proofItems = [
  ["4.484", "preguntas reales de examen"],
  ["30", "guías sobre transporte"],
  ["99 EUR", "curso online actual"],
  ["España", "normativa y trámites"],
];

const services = [
  {
    title: "Alquilar título de transporte",
    text: "Estudiamos tu caso y te orientamos sobre la vía adecuada para operar con gestor o título de transporte.",
    href: "/titulos/",
  },
  {
    title: "Ceder tu título",
    text: "Acompañamiento para titulares que quieren valorar una cesión de forma ordenada y con criterios claros.",
    href: "/cede-tu-titulo-de-transporte/",
  },
  {
    title: "Curso y test online",
    text: "Preparación para la competencia profesional de mercancías con preguntas reales, simulación y apoyo de estudio.",
    href: "/producto/curso-titulo-profesional-transporte/",
  },
];

const faq = [
  [
    "¿Qué es un título de transporte?",
    "Es la capacitación profesional necesaria para que una empresa pueda cumplir los requisitos de acceso a la actividad de transporte de mercancías por carretera.",
  ],
  [
    "¿Puedo alquilar un título de transporte?",
    "Depende de la situación de la empresa, del gestor de transporte y de cómo se cumplan los requisitos legales. Por eso conviene revisar el caso antes de tomar una decisión.",
  ],
  [
    "¿Cómo preparo el examen de competencia profesional?",
    "Puedes practicar con el banco de preguntas, hacer simulacros y reforzar los temas que fallas antes de presentarte al examen.",
  ],
];

export default function Home() {
  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Quiero información sobre el título de transporte",
  )}`;

  return (
    <main>
      <section className="home-hero">
        <div className="hero-stage" aria-hidden="true">
          <Image
            className="hero-orbit"
            src="https://titulotransporte.com/wp-content/uploads/2025/09/Vector-282.svg"
            alt=""
            width={609}
            height={633}
            priority
            unoptimized
          />
          <Image
            className="hero-ia"
            src="https://titulotransporte.com/wp-content/uploads/2025/09/ChatGPT-Image-18-sept-2025-19_48_04-1-e1758219879225.png"
            alt=""
            width={740}
            height={802}
            priority
            sizes="(max-width: 960px) 58vw, 360px"
          />
          <div className="hero-course">
            <Image
              src="https://titulotransporte.com/wp-content/uploads/2025/08/Curso-titulo-transporte.png"
              alt=""
              width={1080}
              height={1080}
              priority
              sizes="190px"
            />
            <span>Curso online</span>
          </div>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">Título de transporte · España</p>
          <h1>{homeRoute.h1}</h1>
          <p className="hero-lead">
            Te ayudamos a estudiar la vía adecuada para alquilar un título de
            transporte, cederlo o preparar la competencia profesional con curso,
            test online y apoyo de profesor IA.
          </p>
          <div className="hero-actions">
            <a className="button primary" href={whatsappUrl}>
              Hablar por WhatsApp
            </a>
            <Link className="button secondary" href="/test-competencia-profesional-mercancias/">
              Practicar test
            </Link>
          </div>
        </div>

        <div className="hero-panel" aria-label="Opciones de título de transporte">
          <span className="panel-kicker">Alquiler · cesión · formación</span>
          <strong>Una ruta clara para operar o prepararte</strong>
          <p>
            Combinamos asesoría, formación y práctica para que sepas qué opción
            encaja mejor con tu empresa o con tu capacitación profesional.
          </p>
          <div className="route-strip">
            <Link href="/titulos/">Alquilar título</Link>
            <Link href="/cede-tu-titulo-de-transporte/">Ceder título</Link>
            <Link href="/test-competencia-profesional-mercancias/">Test online</Link>
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Datos principales">
        {proofItems.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="section two-col home-intent">
        <div>
          <p className="eyebrow">Intención principal</p>
          <h2>Para empresas que necesitan operar con título de transporte</h2>
        </div>
        <p>
          Si necesitas iniciar o regularizar una actividad de transporte de
          mercancías, el primer paso es entender qué opción encaja: contar con
          un gestor de transporte, preparar el examen, revisar una cesión o
          resolver los requisitos administrativos.
        </p>
      </section>

      <section className="services" aria-labelledby="servicios-heading">
        <div className="section-heading">
          <p className="eyebrow">Servicios y formación</p>
          <h2 id="servicios-heading">Tres caminos para resolver tu situación</h2>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <Link key={service.href} className="service-card" href={service.href}>
              <span>0{index + 1}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section dark-band decision-band">
        <div>
          <p className="eyebrow">Sin atajos confusos</p>
          <h2>Decisiones claras antes de mover dinero o presentar trámites</h2>
        </div>
        <ul className="check-list">
          <li>Orientación inicial para entender tu caso.</li>
          <li>Opciones separadas para alquiler, cesión, curso y test.</li>
          <li>Contacto directo por WhatsApp o formulario.</li>
          <li>Contenido claro sobre requisitos, gestor y normativa.</li>
        </ul>
      </section>

      <section className="faq" aria-labelledby="faq-heading">
        <p className="eyebrow">Preguntas frecuentes</p>
        <h2 id="faq-heading">Dudas habituales sobre el título de transporte</h2>
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
