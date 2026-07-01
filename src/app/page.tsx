import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBoxOpen,
  faBrain,
  faClock,
  faFileLines,
  faGraduationCap,
  faHandshake,
  faHeadset,
  faMapLocationDot,
  faPenNib,
  faRightLeft,
  faRotateRight,
  faShieldHalved,
  faStar,
  faTruck,
  faUser,
  faUserTie,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { site } from "@/lib/site";

const whatsappBase = `https://wa.me/${site.whatsapp}`;
const whatsappHero = `${whatsappBase}?text=${encodeURIComponent(
  "Hola, quiero información para alquilar un título de transportista.",
)}`;
const whatsappAdvice = `${whatsappBase}?text=${encodeURIComponent(
  "Hola, quiero que me asesoréis sobre qué opción me conviene.",
)}`;

export const metadata: Metadata = {
  title: "Alquilar título de transportista | Titulotransporte",
  description:
    "Alquila un título de transportista, cede tu título o prepárate para conseguirlo con nuestro curso online. Asesoramiento experto y atención personalizada.",
  alternates: { canonical: "https://titulotransporte.com/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Titulotransporte",
    title: "Alquilar título de transportista | Titulotransporte",
    description:
      "Alquila un título de transportista, cede tu título o prepárate para conseguirlo con nuestro curso online. Asesoramiento experto y atención personalizada.",
    url: "https://titulotransporte.com/",
  },
};

const images = {
  hero: "/home-assets/hero.webp",
  audience: "/home-assets/consulting-team-clean.webp",
  services: "/home-assets/logistics-screen-clean.webp",
  process: "/home-assets/process.webp",
  benefits: "/home-assets/driver-truck-clean.webp",
  trust: "/home-assets/trust-team-clean.webp",
  course: "/home-assets/course-platform-clean.webp",
  ai: "/home-assets/ai-support-clean.webp",
  faq: "/home-assets/faq.webp",
  final: "/home-assets/final.webp",
};

const serviceCards = [
  {
    icon: "doc",
    title: "Alquiler de título",
    description:
      "Alquila un título de transportista para cumplir la normativa y operar desde el primer día.",
    benefits: ["Cumplimiento legal", "Sin inversión ni esperas", "Gestión rápida y segura"],
    href: "/titulos/",
    cta: "Saber más",
  },
  {
    icon: "swap",
    title: "Cesión de título",
    description:
      "Te ayudamos a ceder tu título de transportista de forma legal, segura y sin complicaciones.",
    benefits: ["Proceso transparente", "Seguridad jurídica", "Acompañamiento personalizado"],
    href: "/cede-tu-titulo-de-transporte/",
    cta: "Saber más",
  },
  {
    icon: "cap",
    title: "Curso para obtener el título",
    description:
      "Formación completa y actualizada para que obtengas tu título de transportista con éxito.",
    benefits: ["Modalidad online", "Temario actualizado", "Tutoría y examen oficial"],
    href: "/producto/curso-titulo-profesional-transporte/",
    cta: "Ver curso",
  },
  {
    icon: "support",
    title: "Profesor IA / soporte 24/7",
    description:
      "Resuelve tus dudas al instante y recibe soporte humano siempre que lo necesites.",
    benefits: ["Respuestas inmediatas", "IA entrenada en normativa", "Soporte experto"],
    href: "/profesor-ia/",
    cta: "Probar profesor IA",
  },
];

const audienceCards = [
  ["user", "Autónomos que empiezan", "Inicia tu actividad cuanto antes y cumpliendo la normativa desde el primer día."],
  ["truck", "Empresas que quieren ampliar flota", "Añade vehículos y gana capacidad operativa sin frenar oportunidades."],
  ["deal", "Profesionales que quieren ceder su título", "Obtén rentabilidad cediendo tu título con garantías legales."],
  ["cap", "Personas que preparan el examen", "Acelera tu camino profesional mientras te enfocas en aprobar."],
];

const processSteps = [
  ["1", "Cuéntanos tu caso", "Hablamos de tus necesidades y te asesoramos sin compromiso.", "Respuesta en menos de 24 h"],
  ["2", "Te proponemos la mejor opción", "Diseñamos la solución que mejor se adapta a tu negocio y te enviamos la propuesta.", "A medida y sin sorpresas"],
  ["3", "Activas tu solución y empiezas", "Nos encargamos del proceso para que puedas empezar a trabajar cuanto antes.", "Rápido, legal y seguro"],
];

const benefits = [
  ["refresh", "Sin permanencia", "Sin ataduras. Alquila tu título el tiempo que lo necesites, con total flexibilidad."],
  ["clock", "Activación rápida", "En 24/48 horas tu caso estará revisado para avanzar sin interrupciones."],
  ["advisor", "Asesoramiento experto", "Te acompañamos en cada paso con especialistas en transporte."],
  ["shield", "Cumplimiento normativo", "Proceso alineado con la normativa vigente para tu tranquilidad."],
  ["support", "Atención personalizada", "Un asesor dedicado resuelve tus dudas antes, durante y después."],
  ["map", "Cobertura en toda España", "Prestamos servicio online estés donde estés."],
];

const trustFeatures = [
  ["shield", "Experiencia en gestión de transporte", "Más de 15 años ayudando a empresas y autónomos del sector."],
  ["support", "Soporte en cada paso", "Te asesoramos y resolvemos dudas antes, durante y después."],
  ["doc", "Documentación clara", "Te indicamos todo lo necesario para operar con total tranquilidad."],
  ["team", "Acompañamiento real", "Un equipo cercano entiende tu negocio y te da soluciones."],
];

const courseBenefits = [
  ["box", "100% práctico", "Contenidos claros, ejemplos reales y test actualizados."],
  ["spark", "Actualizado a normativa vigente", "Incluye las novedades legales de 2026."],
  ["clock", "A tu ritmo", "Estudia cuando quieras, sin horarios ni presiones."],
  ["doc", "Desde cualquier dispositivo", "Accede desde tu móvil, tablet u ordenador."],
];

const aiBenefits = [
  ["pen", "Resuelve dudas al instante", "Obtén respuestas claras y precisas sobre normativa, requisitos y procedimientos."],
  ["brain", "Te guía durante el estudio", "Explicaciones paso a paso, ejemplos prácticos y recursos adaptados a ti."],
  ["clock", "Disponible 24/7", "Accede a tu profesor IA desde cualquier dispositivo cuando lo necesites."],
];

const resources = [
  ["PDF", "Guía para alquilar un título de transportista", "Qué revisar, qué preguntar y qué errores evitar antes de decidir.", "/blog/"],
  ["Checklist", "Checklist para empezar en transporte", "Requisitos, pasos y documentación básica para avanzar con más claridad.", "/titulos/"],
  ["Test online", "Test de competencia profesional", "Practica con preguntas reales y mide tu progreso antes del examen.", "/test-competencia-profesional-mercancias/"],
];

const faqs = [
  [
    "¿Qué es el alquiler de un título de transportista?",
    "Es una solución mediante la cual una empresa puede contar con el apoyo necesario para cumplir determinados requisitos del sector transporte. Cada caso debe revisarse individualmente para asegurar que el encaje sea correcto.",
  ],
  [
    "¿Qué diferencia hay entre alquilar y ceder un título de transportista?",
    "Quien necesita alquilar busca poder operar o avanzar en su actividad. Quien quiere ceder ya dispone del título y quiere valorar si puede rentabilizarlo en condiciones adecuadas.",
  ],
  [
    "¿Es legal alquilar o ceder un título de transportista?",
    "Depende de cómo se estructure la relación, las funciones reales del gestor, la vinculación y el cumplimiento de los requisitos aplicables. Por eso es importante revisar cada caso antes de tomar una decisión.",
  ],
  [
    "¿Qué requisitos necesito para alquilar un título?",
    "Necesitamos revisar tu actividad, documentación, vehículo o flota, urgencia y situación administrativa para indicarte la opción adecuada.",
  ],
  [
    "¿Cuánto tiempo tarda el proceso completo?",
    "La orientación inicial puede darse rápido. La activación depende de la documentación, el encaje del caso y los requisitos aplicables.",
  ],
  [
    "¿Cuánto cuesta alquilar un título de transportista?",
    "El precio varía según el caso, la duración, el tipo de actividad y el nivel de acompañamiento. Lo mejor es explicar tu situación y recibir una propuesta concreta.",
  ],
  [
    "¿Puedo alquilar un título sin permanencia mínima?",
    "Trabajamos con soluciones flexibles. Te explicaremos las condiciones antes de que tomes una decisión.",
  ],
];

function Icon({ name }: { name: string }) {
  const icons: Record<string, IconDefinition> = {
    advisor: faUserTie,
    brain: faBrain,
    box: faBoxOpen,
    cap: faGraduationCap,
    clock: faClock,
    deal: faHandshake,
    doc: faFileLines,
    map: faMapLocationDot,
    pen: faPenNib,
    refresh: faRotateRight,
    shield: faShieldHalved,
    spark: faStar,
    support: faHeadset,
    swap: faRightLeft,
    team: faUsers,
    truck: faTruck,
    user: faUser,
  };

  return (
    <span className="tt-icon" aria-hidden="true">
      <FontAwesomeIcon icon={icons[name] ?? faShieldHalved} />
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="tt-label">{children}</p>;
}

function UiDashboard() {
  return (
    <div className="tt-dashboard" aria-hidden="true">
      <div className="tt-dashboard-top">
        <strong>TITULOTRANSPORTE</strong>
        <span>Panel</span>
      </div>
      <div className="tt-dashboard-body">
        <aside>
          <span />
          <span />
          <span />
          <span />
        </aside>
        <div>
          <div className="tt-map" />
          <div className="tt-bars">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseMockup() {
  return (
    <figure className="tt-course-mock" aria-hidden="true">
      <Image src={images.course} alt="" fill sizes="(max-width: 900px) 100vw, 52vw" />
    </figure>
  );
}

function AiMockup() {
  return (
    <figure className="tt-ai-mock" aria-hidden="true">
      <Image src={images.ai} alt="" fill sizes="(max-width: 900px) 100vw, 52vw" />
    </figure>
  );
}

export default function Home() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: "Titulotransporte",
        url: site.url,
        email: site.email,
        telephone: site.phone,
      },
      {
        "@type": "LocalBusiness",
        "@id": `${site.url}/#localbusiness`,
        name: "Titulotransporte",
        url: site.url,
        telephone: site.phone,
        email: site.email,
        areaServed: "España",
        priceRange: "€€",
      },
      {
        "@type": "Course",
        name: "Curso Título Transporte 2026",
        description: "Curso online para preparar el título de transportista por carretera.",
        provider: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "Product",
        name: "Curso Título Transporte 2026",
        description: "Formación online para preparar el examen oficial de competencia profesional.",
        offers: {
          "@type": "Offer",
          price: "99.00",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${site.url}/producto/curso-titulo-profesional-transporte/`,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(([name, text]) => ({
          "@type": "Question",
          name,
          acceptedAnswer: { "@type": "Answer", text },
        })),
      },
    ],
  };

  return (
    <main className="tt-home">
      <section className="tt-hero">
        <div className="tt-hero-copy">
          <SectionLabel>Soluciones rápidas, legales y sin complicaciones</SectionLabel>
          <h1>
            Alquila tu título<br />
            de transportista y<br />
            <span>empieza a trabajar antes</span>
          </h1>
          <p>
            Te ayudamos a cumplir con la normativa y poner en marcha tu negocio de transporte por carretera sin demoras.
            Soluciones flexibles, 100% legales y con el respaldo de un equipo de expertos.
          </p>
          <div className="tt-actions">
            <a className="tt-btn tt-btn-primary" href={whatsappHero} data-event="click_whatsapp_hero">
              <Icon name="shield" /> Quiero alquilar un título
            </a>
            <Link className="tt-btn tt-btn-secondary" href="/producto/curso-titulo-profesional-transporte/" data-event="click_course_hero">
              <Icon name="cap" /> Ver curso
            </Link>
          </div>
          <div className="tt-badges">
            {["Sin permanencia", "Asesoramiento experto", "Cumplimiento normativo"].map((badge) => (
              <span key={badge}><Icon name="shield" /> {badge}</span>
            ))}
          </div>
        </div>
        <div className="tt-hero-media">
          <Image
            src={images.hero}
            alt="Asesor de transporte revisando documentación con un autónomo del sector"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 54vw"
          />
          <UiDashboard />
        </div>
      </section>

      <section className="tt-proof" aria-label="Datos principales">
        <div><Icon name="team" /><strong>+1.200</strong><span>Clientes satisfechos en toda España</span></div>
        <div><Icon name="clock" /><strong>24/48 h</strong><span>Tiempo medio de activación</span></div>
        <div><Icon name="shield" /><strong>100% legal</strong><span>Cumplimiento de la normativa vigente</span></div>
        <div><Icon name="support" /><strong>Soporte experto</strong><span>Acompañamiento continuo</span></div>
      </section>

      <section className="tt-section tt-managers">
        <div className="tt-managers-copy">
          <SectionLabel>Los mejores gestores</SectionLabel>
          <h2>¿Buscas una gestión eficiente para tu negocio de transporte?</h2>
          <p>
            En Titulotransporte.com te brindamos una gestión integral y profesional. Ofrecemos servicios completos
            de gestión de transporte para que tu operación logística avance con documentación clara, seguimiento
            experto y cumplimiento de las regulaciones vigentes.
          </p>
          <div className="tt-actions">
            <Link className="tt-btn tt-btn-primary" href="/titulos/">Alquilar título transporte</Link>
            <Link className="tt-btn tt-btn-secondary" href="/producto/curso-titulo-profesional-transporte/">Curso título transporte</Link>
          </div>
        </div>
        <div className="tt-managers-panel">
          <article>
            <span>Tu mejor opción</span>
            <h3>Alquilar Título Transporte</h3>
            <p>
              Ofrecemos títulos sin permanencia a precios accesibles. Es una opción pensada para quienes quieren
              empezar a trabajar mientras estudian o consolidan su actividad en transporte de mercancías.
            </p>
          </article>
          <article>
            <span>Curso Título Transporte 2026</span>
            <h3>Oferta curso online</h3>
            <p>
              Domina con enfoque práctico el ciclo del transporte: autorizaciones, CMR, ADR, ATP, logística,
              estiba, aduanas, fiscalidad internacional, normativa técnica y seguridad vial.
            </p>
            <strong><del>200,00 €</del> 99,00 €</strong>
          </article>
        </div>
      </section>

      <section className="tt-section tt-audience">
        <div className="tt-card-shell tt-split">
          <div>
            <SectionLabel>Para autónomos, pequeñas flotas y empresas</SectionLabel>
            <h2>La forma más rápida de empezar si aún no tienes título</h2>
            <p>
              Sabemos que necesitas operar ya, captar clientes y hacer crecer tu negocio. Por eso te lo ponemos fácil:
              nosotros nos encargamos de todo para que no tengas que perder tiempo con requisitos ni burocracia.
            </p>
            <div className="tt-mini-grid">
              {audienceCards.map(([icon, title, description]) => (
                <article key={title} className="tt-mini-card">
                  <Icon name={icon} />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <a className="tt-btn tt-btn-primary" href={whatsappAdvice}>
              <Icon name="shield" /> Quiero que me asesoren
            </a>
            <p className="tt-checkline"><Icon name="shield" /> Asesoramiento gratuito y sin compromiso</p>
          </div>
          <figure className="tt-image-card">
            <Image src={images.audience} alt="Profesional del transporte revisando documentación en una oficina" fill sizes="(max-width: 900px) 100vw, 48vw" />
          </figure>
        </div>
      </section>

      <section className="tt-section tt-services">
        <div className="tt-section-head">
          <div>
            <SectionLabel>Servicios principales</SectionLabel>
            <h2>Todo lo que necesitas para avanzar en transporte</h2>
            <p>Soluciones integrales para que cumplas la normativa, ahorres tiempo y hagas crecer tu negocio de transporte con total tranquilidad.</p>
          </div>
          <figure className="tt-services-visual">
            <Image src={images.services} alt="Panel de servicios de gestión de transporte" fill sizes="520px" />
            <UiDashboard />
          </figure>
        </div>
        <div className="tt-service-grid">
          {serviceCards.map((card) => (
            <Link key={card.title} href={card.href} className="tt-service-card">
              <Icon name={card.icon} />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <ul>
                {card.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
              </ul>
              <span>{card.cta} →</span>
            </Link>
          ))}
        </div>
        <div className="tt-strip">
          <span><Icon name="advisor" /> Asesoramiento experto desde el primer día</span>
          <span><Icon name="shield" /> Soluciones a medida para tu negocio</span>
          <span><Icon name="team" /> +1.200 clientes satisfechos en toda España</span>
        </div>
      </section>

      <section className="tt-section tt-process">
        <div className="tt-process-copy">
          <SectionLabel>Cómo funciona</SectionLabel>
          <h2>Empieza en 3 pasos</h2>
          <p>Así de fácil es alquilar tu título de transportista con nosotros. Un proceso rápido, claro y 100% legal.</p>
          <div className="tt-timeline">
            {processSteps.map(([number, title, description, tag]) => (
              <article key={number}>
                <strong>{number}</strong>
                <div>
                  <Icon name="doc" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span>{tag}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="tt-actions">
            <a className="tt-btn tt-btn-primary" href={whatsappBase}>
              <Icon name="support" /> Hablar por WhatsApp
            </a>
            <span className="tt-phone-text">O llámanos al {site.phone}</span>
          </div>
        </div>
        <figure className="tt-process-image">
          <Image src={images.process} alt="Persona contactando por WhatsApp para consultar sobre título de transportista" fill sizes="50vw" />
          <div className="tt-whatsapp-card">
            <strong>Titulotransporte</strong>
            <span>Hola, necesito alquilar un título de transportista.</span>
            <p>Perfecto. ¿Podríamos hablar por teléfono?</p>
          </div>
        </figure>
      </section>

      <section className="tt-section tt-benefits">
        <div className="tt-benefit-copy">
          <SectionLabel>¿Por qué elegir Titulotransporte?</SectionLabel>
          <h2>Más simple, más legal y más rápido</h2>
          <p>
            Un servicio integral para que puedas alquilar tu título de transportista con total tranquilidad y centrarte en hacer crecer tu negocio.
          </p>
          <div className="tt-benefit-grid">
            {benefits.map(([icon, title, description]) => (
              <article key={title}>
                <Icon name={icon} />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <figure className="tt-benefit-image">
          <Image src={images.benefits} alt="Asesor de transporte atendiendo a un cliente en oficina" fill sizes="50vw" />
        </figure>
        <div className="tt-reviews">
          <div>
            <h3>Lo que dicen nuestros clientes</h3>
            <strong>Excelente</strong>
            <span>4.9/5 en Google</span>
          </div>
          {["Profesionales y muy cercanos. En 24 horas tenía todo listo para seguir trabajando.", "La flexibilidad y el asesoramiento marcan la diferencia.", "Cumplen lo que prometen y siempre están disponibles."].map((quote, index) => (
            <blockquote key={quote}>
              <span>★★★★★</span>
              <p>“{quote}”</p>
              <cite>{["Carlos M.", "Laura G.", "Javier P."][index]}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="tt-section tt-trust">
        <figure>
          <Image src={images.trust} alt="Equipo de transporte revisando documentación con clientes" fill sizes="50vw" />
        </figure>
        <div>
          <SectionLabel>Confianza, normativa y equipo experto</SectionLabel>
          <h2>Gestión experta y 100% alineada con la normativa</h2>
          <p>
            Aseguramos que tu empresa cumpla con todos los requisitos legales del transporte por carretera. Nos encargamos de la gestión, la documentación y la comunicación con la administración.
          </p>
          <div className="tt-trust-grid">
            {trustFeatures.map(([icon, title, description]) => (
              <article key={title}>
                <Icon name={icon} />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className="tt-stat-box">
            <span><Icon name="team" /> +15 años de experiencia</span>
            <span><Icon name="spark" /> +1.200 clientes satisfechos</span>
            <span><Icon name="clock" /> Respuesta en 24/48 h</span>
          </div>
          <Link className="tt-btn tt-btn-primary" href="/contacto/">
            <Icon name="shield" /> Solicitar información
          </Link>
        </div>
      </section>

      <section className="tt-section tt-course">
        <div>
          <SectionLabel>Curso online para obtener tu título de transportista</SectionLabel>
          <h2>Prepárate para conseguir tu título</h2>
          <h3>Curso Título Transporte 2026</h3>
          <p>Todo lo que necesitas para aprobar el examen oficial y obtener tu título de transportista por carretera.</p>
          <div className="tt-list">
            {courseBenefits.map(([icon, title, description]) => (
              <article key={title}>
                <Icon name={icon} />
                <div>
                  <h4>{title}</h4>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="tt-price">
            <del>200€</del>
            <span>-50% DTO.</span>
            <strong>99€</strong>
          </div>
          <p className="tt-stars">★★★★★ <span>4,9/5 (215 reseñas)</span></p>
          <div className="tt-actions">
            <Link className="tt-btn tt-btn-primary" href="/producto/curso-titulo-profesional-transporte/">
              <Icon name="shield" /> Ver curso
            </Link>
            <Link className="tt-btn tt-btn-secondary" href="/producto/curso-titulo-profesional-transporte/#temario">
              <Icon name="doc" /> Ver temario
            </Link>
          </div>
          <p className="tt-checkline"><Icon name="shield" /> Compra 100% segura · Acceso inmediato · Garantía de 14 días</p>
        </div>
        <CourseMockup />
        <div className="tt-course-strip">
          <span><Icon name="team" /> <strong>+1.200</strong> alumnos ya han aprobado con nuestro método</span>
          <span><Icon name="clock" /> <strong>95%</strong> tasa de aprobados en primera convocatoria</span>
          <span><Icon name="shield" /> <strong>Actualizado 2026</strong> contenido vigente</span>
          <span><Icon name="support" /> <strong>Soporte experto</strong> cuando lo necesites</span>
        </div>
      </section>

      <section className="tt-section tt-ai">
        <div>
          <SectionLabel>Tu profesor IA de transporte</SectionLabel>
          <h2>Tu profesor IA disponible 24/7</h2>
          <p>Resuelve tus dudas sobre la normativa de transporte al instante, estudia más rápido y recibe ayuda personalizada cuando la necesites.</p>
          <div className="tt-list">
            {aiBenefits.map(([icon, title, description]) => (
              <article key={title}>
                <Icon name={icon} />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
          <Link className="tt-btn tt-btn-primary" href="/profesor-ia/" data-event="click_profesor_ia">
            <Icon name="spark" /> Probar profesor IA
          </Link>
        </div>
        <AiMockup />
        <div className="tt-ai-strip">
          <article><Icon name="shield" /><h3>Información 100% fiable y actualizada</h3><p>Entrenado con normativa vigente y fuentes del sector transporte.</p></article>
          <article><Icon name="pen" /><h3>Ideal para opositores y profesionales</h3><p>Te acompaña si preparas el examen o gestionas autorizaciones.</p></article>
        </div>
      </section>

      <section className="tt-section tt-resources">
        <div className="tt-section-head compact">
          <div>
            <SectionLabel>Recursos útiles</SectionLabel>
            <h2>Antes de decidir, resuelve tus dudas clave</h2>
            <p>Guías, checklist y práctica para elegir mejor entre alquiler, cesión, curso o plataforma test.</p>
          </div>
        </div>
        <div className="tt-resource-grid">
          {resources.map(([format, title, description, href]) => (
            <Link key={title} href={href} className="tt-resource-card">
              <span>{format}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <strong>Ver recurso →</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="tt-section tt-faq" id="faq">
        <div>
          <SectionLabel>Preguntas frecuentes</SectionLabel>
          <h2>Resolvemos tus dudas más comunes</h2>
          <p>Aquí encontrarás respuestas claras a las preguntas más habituales sobre el alquiler y cesión de títulos de transportista.</p>
          <div className="tt-faq-list">
            {faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
        <aside className="tt-support-card">
          <Icon name="support" />
          <h3>¿Prefieres hablarlo con nosotros?</h3>
          <p>Nuestro equipo te asesora sin compromiso y te ayuda a encontrar la mejor solución para tu negocio.</p>
          <Image src={images.faq} alt="Asesor de transporte atendiendo dudas frecuentes" width={560} height={370} sizes="360px" />
          <ul>
            <li>Atención personalizada</li>
            <li>Respuesta rápida</li>
            <li>Asesoramiento experto</li>
          </ul>
          <a className="tt-btn tt-btn-whatsapp" href={`${whatsappBase}?text=${encodeURIComponent("Hola, tengo dudas sobre el título de transportista.")}`}>
            Contactar por WhatsApp
          </a>
        </aside>
      </section>

      <section className="tt-final">
        <div>
          <SectionLabel>¿Listo para empezar?</SectionLabel>
          <h2>Cuéntanos qué necesitas y te ayudamos a encontrar la mejor opción</h2>
          <p>Te respondemos rápido, te asesoramos con expertos y te damos claridad legal desde el primer momento.</p>
          <div className="tt-actions">
            <a className="tt-btn tt-btn-primary" href={`${whatsappBase}?text=${encodeURIComponent("Hola, quiero información sobre Titulotransporte.")}`} data-event="click_final_whatsapp">
              <Icon name="support" /> Hablar por WhatsApp
            </a>
            <Link className="tt-btn tt-btn-outline" href="/contacto/">Solicitar llamada</Link>
          </div>
          <div className="tt-final-points">
            <span><Icon name="clock" /> Respuesta en 24/48 h</span>
            <span><Icon name="shield" /> Sin compromiso</span>
          </div>
        </div>
        <Image src={images.final} alt="Asesor de transporte junto a camión" fill sizes="45vw" />
      </section>

      <a className="tt-sticky-whatsapp" href={whatsappHero}>WhatsApp</a>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
    </main>
  );
}
