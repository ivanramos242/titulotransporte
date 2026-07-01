import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRight,
  faBookOpen,
  faBriefcase,
  faClipboardCheck,
  faCoins,
  faComments,
  faFileContract,
  faGavel,
  faGraduationCap,
  faHeadset,
  faLaptop,
  faRoute,
  faScaleBalanced,
  faShieldHalved,
  faStar,
  faTruckFast,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { site } from "@/lib/site";

const wa = `https://wa.me/${site.whatsapp}`;

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function serviceSchema(path: string, name: string, description: string) {
  const url = new URL(path, site.url).toString();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#organization`,
        name: "Titulotransporte",
        url: site.url,
        telephone: site.phone,
        email: site.email,
        areaServed: "España",
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name,
        description,
        areaServed: "España",
        provider: { "@id": `${site.url}/#organization` },
        url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
          { "@type": "ListItem", position: 2, name, item: url },
        ],
      },
    ],
  };
}

function Icon({ icon }: { icon: IconDefinition }) {
  return (
    <span className="cp-icon" aria-hidden="true">
      <FontAwesomeIcon icon={icon} />
    </span>
  );
}

function Hero({
  label,
  title,
  subtitle,
  image,
  primary,
}: {
  label: string;
  title: ReactNode;
  subtitle: string;
  image: string;
  primary: string;
}) {
  return (
    <section className="cp-hero">
      <div className="cp-hero__copy">
        <p className="tt-label">{label}</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div className="tt-actions">
          <a className="tt-btn tt-btn-primary" href={`${wa}?text=${encodeURIComponent(primary)}`}>
            {primary.includes("ceder") ? "Quiero ceder mi título" : primary.includes("alquilar") ? "Consultar disponibilidad" : "Contáctanos"}
          </a>
          <Link className="tt-btn tt-btn-secondary" href="/contacto/">
            Hablar con un asesor
          </Link>
        </div>
      </div>
      <figure className="cp-hero__media">
        <Image src={image} alt="" fill priority sizes="(max-width: 900px) 100vw, 48vw" />
      </figure>
    </section>
  );
}

function CTA({ title, text, action }: { title: string; text: string; action: string }) {
  return (
    <section className="cp-cta">
      <div>
        <p className="tt-label">Siguiente paso</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <a className="tt-btn tt-btn-primary" href={`${wa}?text=${encodeURIComponent(action)}`}>
        {action}
        <FontAwesomeIcon icon={faArrowRight} />
      </a>
    </section>
  );
}

export function CedeTituloPage() {
  const benefits = [
    ["Flexibilidad sin complicaciones", "Adapta tu capacidad de transporte a la demanda sin cargar con una flota fija ni recursos inmovilizados.", faTruckFast],
    ["Ahorra y gana dinero", "Reduce costes operativos y convierte tu título de transporte en una oportunidad de ingresos con acompañamiento profesional.", faCoins],
    ["Cumplimiento normativo", "Revisamos el encaje del caso y trabajamos con procesos alineados con las obligaciones del transporte por carretera.", faClipboardCheck],
    ["Foco en tu negocio principal", "Deja la gestión documental y operativa en manos expertas para concentrarte en tu actividad.", faBriefcase],
    ["Asistencia profesional", "Te acompañamos antes, durante y después para resolver dudas, coordinar pasos y evitar decisiones improvisadas.", faHeadset],
  ] as const;

  return (
    <main className="cp-page">
      <JsonLd
        data={serviceSchema(
          "/cede-tu-titulo-de-transporte/",
          "Ceder título de transporte",
          "Servicio de asesoramiento para estudiar la cesión de un título de transporte con proceso claro, documentación y acompañamiento experto.",
        )}
      />
      <Hero
        label="Cesión de título de transporte"
        title={<>Cede tu <span>título de transporte</span></>}
        subtitle="Optimiza tu flota, libera recursos y valora una cesión de título con un proceso claro, documentado y acompañado por especialistas."
        image="/home-assets/trust-team-clean.webp"
        primary="Hola, quiero ceder mi título de transporte"
      />

      <section className="cp-intro">
        <div>
          <p className="tt-label">Optimiza tu flota y libera recursos</p>
          <h2>Una forma inteligente de aprovechar tu capacitación</h2>
        </div>
        <p>
          En lugar de asumir costes y complicaciones innecesarias, puedes estudiar la cesión de tu título de transporte con un equipo que revisa el caso, documenta los pasos y te orienta sobre las condiciones adecuadas. Cada cesión debe analizarse individualmente para que el encaje sea correcto.
        </p>
      </section>

      <section className="cp-benefit-grid">
        {benefits.map(([title, text, icon]) => (
          <article key={title}>
            <Icon icon={icon} />
            <h2>{title}</h2>
            <p>{text} Cede tu título de transporte con claridad y sin improvisar.</p>
          </article>
        ))}
      </section>

      <section className="cp-process">
        <div>
          <p className="tt-label">Cómo lo trabajamos</p>
          <h2>De la consulta inicial a una propuesta seria</h2>
        </div>
        {[
          ["01", "Revisamos tu situación", "Analizamos tu título, disponibilidad, objetivos y el tipo de colaboración que puede tener sentido."],
          ["02", "Definimos condiciones", "Te explicamos obligaciones, límites, documentación y próximos pasos antes de tomar una decisión."],
          ["03", "Te acompañamos", "Coordinamos el proceso y mantenemos soporte para que no tengas que resolverlo solo."],
        ].map(([number, title, text]) => (
          <article key={number}>
            <strong>{number}</strong>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <CTA
        title="Ponte en contacto y estudia la cesión de tu título hoy mismo"
        text="Te orientamos sin compromiso y te explicamos qué información necesitamos para valorar tu caso."
        action="Quiero ceder mi título de transporte"
      />
    </main>
  );
}

export function TitulosPage() {
  const offers = [
    { members: "3/5 miembros", price: "420€", text: "Título de transporte con plazas disponibles para empezar a operar con acompañamiento." },
    { members: "2/5 miembros", price: "420€", text: "Opción flexible para empresas y autónomos que necesitan avanzar sin demoras." },
  ];
  const benefits = [
    ["Revisión inicial", "Antes de avanzar, revisamos tu caso y la documentación necesaria.", faClipboardCheck],
    ["Asesoramiento experto", "Te explicamos requisitos, pasos y condiciones para evitar errores.", faHeadset],
    ["Proceso claro", "Sin promesas vacías: sabrás qué se puede hacer y qué depende de cada caso.", faShieldHalved],
  ] as const;

  return (
    <main className="cp-page">
      <JsonLd
        data={{
          ...serviceSchema(
            "/titulos/",
            "Alquilar título de transporte",
            "Opciones de alquiler de título de transporte para empresas y autónomos que necesitan empezar a operar con acompañamiento experto.",
          ),
          "@graph": [
            ...serviceSchema(
              "/titulos/",
              "Alquilar título de transporte",
              "Opciones de alquiler de título de transporte para empresas y autónomos que necesitan empezar a operar con acompañamiento experto.",
            )["@graph"],
            {
              "@type": "Product",
              "@id": `${site.url}/titulos/#product`,
              name: "Alquiler de título de transporte",
              description: "Título de transporte con plazas disponibles y acompañamiento especializado.",
              brand: { "@type": "Brand", name: "Titulotransporte" },
              offers: {
                "@type": "Offer",
                price: "420",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                url: `${site.url}/titulos/`,
              },
            },
          ],
        }}
      />
      <Hero
        label="Alquiler de título de transporte"
        title={<>Alquila alguno de <span>nuestros títulos</span></>}
        subtitle="Únete hoy mismo al título de transporte que necesitas para empezar a trabajar. Rápido, simple y eficaz."
        image="/home-assets/consulting-team-clean.webp"
        primary="Hola, quiero alquilar un título de transporte"
      />

      <section className="cp-intro cp-intro--center">
        <p className="tt-label">Rápido. Simple. Eficaz.</p>
        <h2>Elige una opción disponible y revisamos tu caso</h2>
        <p>Te ayudamos a comprobar requisitos, documentación, condiciones y próximos pasos para operar con más claridad.</p>
      </section>

      <section className="cp-offers">
        {offers.map((offer, index) => (
          <article key={offer.members}>
            <Icon icon={faFileContract} />
            <p className="tt-label">Título de transporte</p>
            <h2>Alquilar título de transporte</h2>
            <dl>
              <div>
                <dt>Miembros actuales</dt>
                <dd>{offer.members}</dd>
              </div>
              <div>
                <dt>Precio mensual</dt>
                <dd><strong>{offer.price}</strong> al mes</dd>
              </div>
            </dl>
            <p>{offer.text}</p>
            <a className="tt-btn tt-btn-primary" href={`${wa}?text=${encodeURIComponent(`Hola, quiero unirme al título de transporte ${index + 1}`)}`}>
              Unirse al título
            </a>
          </article>
        ))}
      </section>

      <section className="cp-benefit-grid cp-benefit-grid--compact">
        {benefits.map(([title, text, icon]) => (
          <article key={title}>
            <Icon icon={icon} />
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <CTA
        title="¿Necesitas alquilar un título para empezar a trabajar?"
        text="Cuéntanos tu situación y te indicamos qué opción puede encajar mejor con tu actividad."
        action="Quiero alquilar un título de transporte"
      />
    </main>
  );
}

export function LegalTransportPage() {
  const pillars = [
    ["Experiencia especializada", "Expertos en derecho del transporte y acompañamiento a empresas y autónomos.", faScaleBalanced],
    ["Soluciones a medida", "Contratos, cumplimiento, gestión documental, riesgos y decisiones operativas.", faGavel],
    ["Protección legal especializada", "Te ayudamos a reducir riesgos y mantener tu negocio mejor preparado.", faShieldHalved],
    ["Acompañamiento continuo", "Soporte durante el proceso, no solo una consulta aislada.", faComments],
    ["Resultados comprobados", "Orientación práctica para resolver problemas reales del transporte.", faUsers],
  ] as const;

  return (
    <main className="cp-page">
      <JsonLd
        data={serviceSchema(
          "/servicios-asesoria-legal-para-transporte/",
          "Asesoría legal para transporte",
          "Asesoría legal especializada para empresas de transporte y autónomos: contratos, cumplimiento normativo, protección legal y acompañamiento.",
        )}
      />
      <Hero
        label="Asesoría legal para transporte"
        title={<>Asesoría legal <span>para transporte</span></>}
        subtitle="Optimiza tu operación y protege tu negocio con asesoría legal especializada para empresas de transporte, autónomos y gestores."
        image="/home-assets/trust-team-clean.webp"
        primary="Hola, necesito asesoría legal para transporte"
      />

      <section className="cp-intro">
        <div>
          <p className="tt-label">Simplificando tu éxito en el transporte</p>
          <h2>Tu socio legal confiable en el camino hacia el éxito</h2>
        </div>
        <p>
          Especializados en derecho del transporte, ofrecemos soluciones a medida: contratos, cumplimiento normativo, revisión documental, prevención de riesgos y orientación para decisiones clave. Confía en un socio de asesoría legal para transporte con foco práctico y comercial.
        </p>
      </section>

      <section className="cp-benefit-grid">
        {pillars.map(([title, text, icon]) => (
          <article key={title}>
            <Icon icon={icon} />
            <h2>{title}</h2>
            <p>{text}</p>
            <Link href="#detalle">Ver más</Link>
          </article>
        ))}
      </section>

      <section className="cp-process" id="detalle">
        {pillars.map(([title, text], index) => (
          <article key={title}>
            <strong>{String(index + 1).padStart(2, "0")}.</strong>
            <span>{["Expertos", "Soluciones", "Protección", "Soporte", "Éxito"][index]}</span>
            <h2>{title}</h2>
            <p>{text} No te compliques más: consigue tu asesoría legal para transporte hoy.</p>
          </article>
        ))}
      </section>

      <CTA
        title="No te la juegues: consigue asesoría legal para transporte"
        text="No te arriesgues con la legalidad de tu negocio. Te ayudamos a revisar tu situación y definir la mejor forma de avanzar."
        action="Necesito asesoría legal para transporte"
      />
    </main>
  );
}

export function CourseProductPage() {
  const highlights = [
    ["Fácil de leer y entender", "Explicaciones claras, resúmenes tipo examen y esquemas para estudiar sin perderte.", faBookOpen],
    ["Normativa España y UE", "Actualizado a la normativa vigente para transporte nacional e internacional.", faShieldHalved],
    ["A tu ritmo", "Acceso desde móvil, tablet u ordenador para avanzar cuando puedas.", faLaptop],
  ] as const;
  const modules = [
    ["Acceso a mercados y autorizaciones", "Operador vs. transportista, competencia profesional, capacidad financiera, honorabilidad, visados, transmisiones y sustitución de vehículos."],
    ["Documentación del transporte", "Documento de control, CMR, certificados de conductores extracomunitarios y documentación ADR."],
    ["Operativa, logística y rutas", "Tipos de transporte, redes logísticas, selección de vehículo, cisternas, góndolas, silos y cargas unitarias."],
    ["Aduanas y fiscalidad internacional", "TIR, Tránsito UE T1/T2, ATA, Intrastat, OEA, certificados de origen y DUA."],
    ["Normas técnicas y explotación", "Masas, dimensiones, ejes, maniobrabilidad, matriculación, homologación, ITV y reformas."],
    ["Estiba, carga y embalaje", "Palés, contenedores, puntos de amarre, bloqueo, amarre directo y superior, sobresalientes y señal V-20."],
    ["Intermodalidad y UTI", "Contenedores ISO/CSC, cajas móviles, Ro-Ro, Lo-Lo, ROLA, Modalohr, feeder y buques celulares."],
    ["ADR, residuos y perecederos ATP", "Etiquetas, paneles, cisternas, compatibilidades, traslados de residuos y vehículos isotermos/frigoríficos."],
    ["Animales vivos y seguridad vial", "Densidades, tiempos de viaje, permisos, velocidades, restricciones, PAS, RCP 30:2 y cabina segura."],
  ] as const;

  return (
    <main className="course-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Course",
              "@id": `${site.url}/producto/curso-titulo-profesional-transporte/#course`,
              name: "Curso para Título de Competencia Profesional del Transporte 2026",
              description:
                "Curso online para preparar el título de competencia profesional del transporte con enfoque práctico, temario actualizado, test y soporte.",
              provider: { "@id": `${site.url}/#organization` },
            },
            {
              "@type": "Product",
              "@id": `${site.url}/producto/curso-titulo-profesional-transporte/#product`,
              name: "Curso Título Transporte 2026",
              description:
                "Formación online práctica para preparar el título de competencia profesional del transporte.",
              image: `${site.url}/home-assets/course-platform-clean.webp`,
              brand: { "@type": "Brand", name: "Titulotransporte" },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.83",
                reviewCount: "12",
              },
              offers: {
                "@type": "Offer",
                price: "99",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                url: `${site.url}/producto/curso-titulo-profesional-transporte/`,
              },
            },
          ],
        }}
      />

      <section className="course-hero">
        <div className="course-hero__copy">
          <p className="tt-label">Oferta</p>
          <h1>Curso Título Transporte 2026</h1>
          <p>
            Domina, con enfoque 100% práctico, todo el ciclo del transporte de mercancías:
            autorizaciones, documentación, logística, aduanas, estiba, ADR, ATP, animales vivos y seguridad vial.
          </p>
          <div className="course-rating" aria-label="Valorado con 4.83 sobre 5 en 12 valoraciones">
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesomeIcon key={star} icon={faStar} />
            ))}
            <span>4,83/5 · 12 valoraciones</span>
          </div>
          <div className="course-price">
            <span>200,00 €</span>
            <strong>99,00 €</strong>
          </div>
          <div className="tt-actions">
            <Link className="tt-btn tt-btn-primary" href="/finalizar-compra/">
              Añadir al carrito
            </Link>
            <a className="tt-btn tt-btn-secondary" href="#temario">
              Ver temario
            </a>
          </div>
          <p className="course-safe">Compra segura · Acceso inmediato tras activar pagos · Garantía de 14 días</p>
        </div>
        <figure className="course-hero__media">
          <Image
            src="/home-assets/course-platform-clean.webp"
            alt="Curso online para preparar el título de competencia profesional del transporte"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
          />
        </figure>
      </section>

      <section className="course-highlights">
        {highlights.map(([title, text, icon]) => (
          <article key={title}>
            <Icon icon={icon} />
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="course-story">
        <div>
          <p className="tt-label">Tu hoja de ruta completa</p>
          <h2>Aprende transporte por carretera con criterio operativo</h2>
        </div>
        <p>
          Con este programa dominarás las normas, la operativa y la seguridad que necesitas para planificar,
          contratar y ejecutar transportes nacionales e internacionales con solvencia profesional. El objetivo
          no es memorizar sin sentido: es entender qué pide el examen y cómo se aplica en la actividad real.
        </p>
      </section>

      <section className="course-modules" id="temario">
        <div className="course-modules__head">
          <p className="tt-label">Contenidos clave del curso</p>
          <h2>Temario completo, ordenado para estudiar y aplicar</h2>
        </div>
        {modules.map(([title, text]) => (
          <article key={title}>
            <span><FontAwesomeIcon icon={faRoute} /></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="course-method">
        <div>
          <p className="tt-label">Metodología práctica</p>
          <h2>Menos teoría suelta, más criterio para aprobar y operar</h2>
        </div>
        <ul>
          <li>Resúmenes tipo examen, chuletas operativas y checklists para inspecciones.</li>
          <li>Casos reales y criterios de Inspección y Régimen Sancionador para evitar multas y paralizaciones.</li>
          <li>Enfoque visual con iconografía, tablas y esquemas para recordar más rápido.</li>
        </ul>
      </section>

      <section className="course-audience">
        <div>
          <FontAwesomeIcon icon={faGraduationCap} />
          <h2>¿Para quién es?</h2>
          <p>
            Responsables de tráfico, jefes de almacén, conductores profesionales, pymes de transporte y logística,
            operadores de comercio exterior y cualquier profesional que necesite seguridad normativa y operativa.
          </p>
        </div>
        <div>
          <FontAwesomeIcon icon={faClipboardCheck} />
          <h2>Qué te llevas</h2>
          <p>
            Criterios claros para rutas, vehículo, documentación, estiba segura, eficiencia energética y operación
            nacional e internacional con cumplimiento legal.
          </p>
        </div>
      </section>

      <CTA
        title="¿Listo para conseguir tu título de transporte?"
        text="Inscríbete y empieza a estudiar con un curso práctico, actualizado y pensado para aprobar sin dolores de cabeza."
        action="Quiero comprar el curso"
      />
    </main>
  );
}

export function CommercialRoutePage({ path }: { path: string }) {
  if (path === "/cede-tu-titulo-de-transporte/") return <CedeTituloPage />;
  if (path === "/titulos/") return <TitulosPage />;
  if (path === "/servicios-asesoria-legal-para-transporte/") return <LegalTransportPage />;
  if (path === "/producto/curso-titulo-profesional-transporte/") return <CourseProductPage />;
  return null;
}
