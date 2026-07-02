import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRight,
  faBookOpen,
  faBriefcase,
  faCircleCheck,
  faClipboardCheck,
  faCoins,
  faComments,
  faEnvelope,
  faFileContract,
  faGavel,
  faGraduationCap,
  faHeadset,
  faLaptop,
  faLocationDot,
  faLock,
  faPaperPlane,
  faPhone,
  faRobot,
  faRoute,
  faScaleBalanced,
  faShieldHalved,
  faStar,
  faTruckFast,
  faUserTie,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { blogPosts, site } from "@/lib/site";

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

const courseReviews = [
  {
    author: "Maria garcia",
    date: "2025-06-21",
    dateLabel: "21 de junio de 2025",
    rating: 5,
    text: "Curso para ponerse al día. Soy autónoma y el módulo de acceso a mercados + estiba me ahorró multas y quebraderos. Todo muy fácil de entender y con ejemplos reales. Repetiría sin dudar.",
  },
  {
    author: "carlos rodri",
    date: "2025-07-01",
    dateLabel: "1 de julio de 2025",
    rating: 4,
    text: "Temario completo y bien hilado, ADR y Seguridad Vial muy claros. Me gustó que no es puro tocho para leer, aunque echo en falta algún caso práctico más.",
  },
  {
    author: "Sergio sanchez",
    date: "2025-07-28",
    dateLabel: "28 de julio de 2025",
    rating: 5,
    text: "Buena relación calidad precio; módulos claros y ejemplos de estiba. El ritmo es ameno, sin paja, y la lectura va fluida, fácil de entender.",
  },
  {
    author: "Cristian",
    date: "2025-08-08",
    dateLabel: "8 de agosto de 2025",
    rating: 4,
    text: "Preparando el título de competencia profesional me vino de 10. Los resúmenes y las pequeñas ayudas son muy buenas, normativa actualizada ITV, masas y dimensiones todo sin rodeos.",
  },
  {
    author: "ramiro",
    date: "2025-08-17",
    dateLabel: "17 de agosto de 2025",
    rating: 5,
    text: "Un curso bastante bueno, muy claro y fácil de entender. Aprobé a la primera el examen después de meses de estudiar.",
  },
  {
    author: "Ivan Ramos",
    date: "2025-08-26",
    dateLabel: "26 de agosto de 2025",
    rating: 5,
    text: "Muy buen curso la verdad, me ha ayudado muchísimo.",
  },
  {
    author: "Rodrigo",
    date: "2025-08-28",
    dateLabel: "28 de agosto de 2025",
    rating: 5,
    text: "Muy buen Curso de Título Transporte, he conseguido el título de transportista en menos de 4 meses.",
  },
  {
    author: "Samuel Fernández",
    date: "2025-09-01",
    dateLabel: "1 de septiembre de 2025",
    rating: 5,
    text: "Después de 3 años intentándolo se me ha hecho fácil con vosotros, gracias por ayudarme a aprobar. Profesor IA 24 horas para mí ha sido la clave.",
  },
  {
    author: "Ivan Fernández",
    date: "2025-09-10",
    dateLabel: "10 de septiembre de 2025",
    rating: 5,
    text: "Muchísimas gracias por todo, equipo muy atento y todo muy sencillo, la mejor forma de conseguir tu título de transportista.",
  },
  {
    author: "Edwin",
    date: "2025-10-11",
    dateLabel: "11 de octubre de 2025",
    rating: 5,
    verified: true,
    text: "Buen curso, fácil.",
  },
  {
    author: "rodrigo",
    date: "2025-10-20",
    dateLabel: "20 de octubre de 2025",
    rating: 5,
    verified: true,
    text: "Curso completo y muy simple de entender.",
  },
  {
    author: "Cristian Recouso",
    date: "2025-10-30",
    dateLabel: "30 de octubre de 2025",
    rating: 5,
    verified: true,
    text: "El curso me ha ido súper bien, está muy bien de precio a comparación con la competencia, y lo que ofrece es increíble. Todo el contenido es muy fácil de leer.",
  },
] as const;

function Stars({ rating }: { rating: number }) {
  return (
    <span className="review-stars" aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesomeIcon key={star} icon={faStar} className={star <= rating ? "is-active" : ""} />
      ))}
    </span>
  );
}

function ContactPage() {
  const contactOptions = [
    ["Teléfono", site.phone, `tel:${site.phone.replaceAll(" ", "")}`, faPhone],
    ["WhatsApp", "Respuesta directa para estudiar tu caso", `${wa}?text=${encodeURIComponent("Hola, quiero hablar sobre mi caso de transporte.")}`, faHeadset],
    ["Email", site.email, `mailto:${site.email}`, faEnvelope],
    ["Servicio", "Asesoramiento en toda España", "/titulos/", faLocationDot],
  ] as const;

  return (
    <main className="contact-page cp-page">
      <JsonLd data={serviceSchema("/contacto/", "Contacto Titulotransporte", "Contacto para resolver dudas sobre alquiler, cesión, curso y tests del título de transporte.")} />
      <section className="contact-hero">
        <div>
          <p className="tt-label">Contacto Titulotransporte</p>
          <h1>Hablemos de tu caso de transporte</h1>
          <p>
            Cuéntanos si necesitas alquilar un título, cederlo, preparar el examen o resolver una duda legal. Te responderá una persona del equipo con una orientación clara.
          </p>
          <div className="tt-actions">
            <a className="tt-btn tt-btn-primary" href={`${wa}?text=${encodeURIComponent("Hola, quiero que me asesoren sobre mi caso de transporte.")}`}>
              Hablar por WhatsApp
            </a>
            <a className="tt-btn tt-btn-secondary" href={`tel:${site.phone.replaceAll(" ", "")}`}>
              Llamar ahora
            </a>
          </div>
        </div>
        <aside className="contact-hero__panel">
          {contactOptions.map(([title, text, href, icon]) => (
            <a key={title} href={href}>
              <Icon icon={icon} />
              <span>{title}</span>
              <strong>{text}</strong>
            </a>
          ))}
        </aside>
      </section>

      <section className="contact-layout">
        <form className="contact-form" action={`mailto:${site.email}`} method="post" encType="text/plain">
          <p className="tt-label">Consulta rápida</p>
          <h2>Envíanos los datos básicos</h2>
          <label>
            Nombre
            <input name="nombre" type="text" autoComplete="name" required placeholder="Tu nombre" />
          </label>
          <label>
            Teléfono o email
            <input name="contacto" type="text" required placeholder="Dónde podemos responderte" />
          </label>
          <label>
            ¿Qué necesitas?
            <select name="tipo-consulta" defaultValue="">
              <option value="" disabled>Selecciona una opción</option>
              <option>Alquilar un título de transporte</option>
              <option>Ceder mi título de transporte</option>
              <option>Curso y tests de competencia profesional</option>
              <option>Otra consulta legal o administrativa</option>
            </select>
          </label>
          <label>
            Mensaje
            <textarea name="mensaje" rows={5} placeholder="Resume tu situación para poder orientarte mejor" />
          </label>
          <button className="tt-btn tt-btn-primary" type="submit">
            Enviar consulta
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>

        <div className="contact-support">
          <h2>Qué revisamos antes de darte una respuesta</h2>
          {[
            ["Tu objetivo", "Operar, ceder, prepararte para el examen o resolver una duda concreta."],
            ["Documentación disponible", "Título, empresa, autorizaciones, vehículo o estado del curso, según el caso."],
            ["Próximo paso", "Te indicamos si conviene avanzar, qué falta y qué riesgos hay que evitar."],
          ].map(([title, text]) => (
            <article key={title}>
              <Icon icon={faCircleCheck} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function ProfesorIAPage() {
  return (
    <main className="ai-page cp-page">
      <JsonLd data={serviceSchema("/profesor-ia/", "Profesor IA para título de transporte", "Ayuda de estudio con inteligencia artificial para preparar el título de competencia profesional del transporte.")} />
      <Hero
        label="Profesor IA para transportistas"
        title={<>Resuelve dudas del temario <span>cuando estás estudiando</span></>}
        subtitle="Un apoyo de estudio para repasar normativa, supuestos, documentación y conceptos del examen de competencia profesional sin esperar a una tutoría."
        image="/home-assets/ai-support-clean.webp"
        primary="Hola, quiero probar el Profesor IA"
      />
      <section className="cp-benefit-grid ai-grid">
        {([
          ["Dudas al momento", "Pregunta por conceptos del temario, casos prácticos o errores de test y recibe una explicación ordenada.", faRobot],
          ["Enfoque de examen", "Las respuestas se orientan a entender el criterio, no solo a memorizar una frase.", faClipboardCheck],
          ["Estudio continuo", "Úsalo como acompañamiento entre sesiones para mantener ritmo y resolver bloqueos.", faBookOpen],
        ] as const).map(([title, text, icon]) => (
          <article key={title}>
            <Icon icon={icon} />
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="ai-flow">
        <div>
          <p className="tt-label">Cómo usarlo bien</p>
          <h2>Del fallo en un test a una explicación útil</h2>
        </div>
        {[
          ["01", "Pega la pregunta o describe tu duda"],
          ["02", "Recibe una explicación con el criterio clave"],
          ["03", "Repasa el bloque relacionado y vuelve a practicar"],
        ].map(([number, text]) => (
          <article key={number}>
            <strong>{number}</strong>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <CTA
        title="Añade el Profesor IA a tu preparación"
        text="Combínalo con el curso y los tests para estudiar con más autonomía y menos dudas acumuladas."
        action="Quiero probar el Profesor IA"
      />
    </main>
  );
}

function BlogLandingPage() {
  const featured = blogPosts.slice(0, 9);

  return (
    <main className="blog-page cp-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Blog de competencia profesional y transporte",
          url: `${site.url}/blog/`,
          publisher: { "@id": `${site.url}/#organization` },
        }}
      />
      <section className="blog-hero">
        <p className="tt-label">Recursos para transportistas</p>
        <h1>Blog de competencia profesional y transporte</h1>
        <p>
          Guías claras sobre título de transportista, gestor de transporte, normativa, supuestos prácticos, tests y gestión diaria de empresas de transporte.
        </p>
        <div className="blog-tags" aria-label="Temas principales">
          {["Competencia profesional", "Supuestos prácticos", "LOTT y ROTT", "Gestor de transporte", "Tests oficiales"].map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      <section className="blog-grid">
        {featured.map((post) => (
          <article key={post.path} className="blog-card">
            <p className="tt-label">Guía</p>
            <h2>
              <Link href={post.path}>{post.h1}</Link>
            </h2>
            <p>{post.description}</p>
            <Link className="blog-card__link" href={post.path}>
              Leer artículo
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

function SobreNosotrosPage() {
  return (
    <main className="about-page cp-page">
      <JsonLd data={serviceSchema("/sobre-nosotros/", "Sobre Titulotransporte", "Equipo especializado en título de transporte, asesoría y formación para empresas y autónomos del transporte en España.")} />
      <Hero
        label="Sobre Titulotransporte"
        title={<>Especialistas en <span>título de transporte</span></>}
        subtitle="Ayudamos a empresas, autónomos y profesionales del transporte a tomar decisiones con criterio: alquiler, cesión, formación, tests y soporte normativo."
        image="/home-assets/trust-team-clean.webp"
        primary="Hola, quiero conocer cómo podéis ayudarme"
      />
      <section className="about-stats">
        {[
          ["+15 años", "Experiencia acompañando a empresas y autónomos"],
          ["+1.200", "Clientes satisfechos en España"],
          ["24/48 h", "Tiempo medio de activación"],
          ["100% legal", "Trabajo alineado con normativa vigente"],
        ].map(([value, text]) => (
          <article key={value}>
            <strong>{value}</strong>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="about-principles">
        <div>
          <p className="tt-label">Nuestra forma de trabajar</p>
          <h2>Claridad antes que promesas vacías</h2>
        </div>
        {[
          ["Diagnóstico honesto", "Primero revisamos si tu caso encaja y qué límites existen."],
          ["Documentación ordenada", "Te explicamos qué necesitas y por qué, sin pasos confusos."],
          ["Acompañamiento real", "No desaparecemos tras el primer contacto: resolvemos dudas durante el proceso."],
        ].map(([title, text]) => (
          <article key={title}>
            <Icon icon={faUserTie} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <CTA
        title="Cuéntanos en qué punto estás"
        text="Te orientamos sobre la vía más razonable para alquilar, ceder o preparar el título de transporte."
        action="Quiero hablar con Titulotransporte"
      />
    </main>
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
              review: courseReviews.map((review) => ({
                "@type": "Review",
                author: { "@type": "Person", name: review.author },
                datePublished: review.date,
                reviewBody: review.text,
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: review.rating,
                  bestRating: 5,
                },
              })),
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

      <section className="course-reviews" id="valoraciones">
        <div className="course-reviews__head">
          <div>
            <p className="tt-label">Valoraciones reales de alumnos</p>
            <h2>Opiniones del curso de título de transporte</h2>
            <p>
              Reseñas importadas de la ficha original de WordPress para mantener la prueba social real del curso y no perder señales de confianza.
            </p>
          </div>
          <div className="course-reviews__score" aria-label="Valoración media 4.83 de 5">
            <strong>4,83</strong>
            <Stars rating={5} />
            <span>12 valoraciones</span>
          </div>
        </div>

        <div className="course-review-grid">
          {courseReviews.map((review) => (
            <article key={`${review.author}-${review.date}`} className="course-review-card">
              <div>
                <Stars rating={review.rating} />
                {"verified" in review && review.verified ? <span className="review-verified">Compra verificada</span> : null}
              </div>
              <p>{review.text}</p>
              <footer>
                <strong>{review.author}</strong>
                <time dateTime={review.date}>{review.dateLabel}</time>
              </footer>
            </article>
          ))}
        </div>

        <aside className="course-review-form">
          <div>
            <p className="tt-label">Dejar una reseña</p>
            <h3>Solo alumnos con compra verificada</h3>
            <p>
              Para evitar reseñas falsas, el sistema debe comprobar que has comprado el curso antes de permitir publicar una valoración.
            </p>
            <div className="tt-actions">
              <Link className="tt-btn tt-btn-primary" href="/login/">
                Iniciar sesión
              </Link>
              <Link className="tt-btn tt-btn-secondary" href="/mi-cuenta/">
                Ver mi cuenta
              </Link>
            </div>
          </div>
          <form aria-label="Formulario de reseña bloqueado hasta verificar compra">
            <fieldset disabled>
              <label>
                Tu puntuación
                <select name="rating" defaultValue="5">
                  <option value="5">5 estrellas</option>
                  <option value="4">4 estrellas</option>
                  <option value="3">3 estrellas</option>
                  <option value="2">2 estrellas</option>
                  <option value="1">1 estrella</option>
                </select>
              </label>
              <label>
                Tu reseña
                <textarea name="review" rows={4} placeholder="Cuéntanos cómo te ha ayudado el curso" />
              </label>
              <button type="button">
                <FontAwesomeIcon icon={faLock} />
                Verifica tu compra para publicar
              </button>
            </fieldset>
          </form>
        </aside>
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
  if (path === "/contacto/") return <ContactPage />;
  if (path === "/profesor-ia/") return <ProfesorIAPage />;
  if (path === "/blog/") return <BlogLandingPage />;
  if (path === "/sobre-nosotros/") return <SobreNosotrosPage />;
  return null;
}
