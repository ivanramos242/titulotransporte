import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "../../../auth";
import { CommercialRoutePage } from "@/components/commercial-pages";
import { TestPractice } from "@/components/test-practice";
import wpContent from "@/data/wp-content.json";
import { allRoutes, blogPosts, metadataFor, routeByPath, site } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

type RouteRecord = (typeof allRoutes)[number];

const importantLinks = [
  { href: "/titulos/", label: "Alquiler de título" },
  { href: "/cede-tu-titulo-de-transporte/", label: "Ceder título" },
  { href: "/producto/curso-titulo-profesional-transporte/", label: "Curso transportista" },
  { href: "/test-competencia-profesional-mercancias/", label: "Plataforma test" },
  { href: "/profesor-ia/", label: "Profesor IA" },
  { href: "/blog/", label: "Recursos" },
];

const examCategoryKeywords = [
  "competencia profesional",
  "examen",
  "test",
  "tests",
  "supuestos",
  "plan de estudio",
  "transportista",
];

const routeVisuals: Record<string, { label: string; image: string; accent: string }> = {
  "/titulos/": {
    label: "Alquiler de título",
    image: "/home-assets/hero.webp",
    accent: "Empieza a operar con acompañamiento experto.",
  },
  "/cede-tu-titulo-de-transporte/": {
    label: "Cesión de título",
    image: "/home-assets/consulting-team-clean.webp",
    accent: "Convierte tu capacitación en una oportunidad segura.",
  },
  "/producto/curso-titulo-profesional-transporte/": {
    label: "Curso online",
    image: "/home-assets/course-platform-clean.webp",
    accent: "Preparación práctica para el examen oficial.",
  },
  "/profesor-ia/": {
    label: "Profesor IA",
    image: "/home-assets/ai-support-clean.webp",
    accent: "Resuelve dudas de normativa cuando lo necesites.",
  },
  "/test-competencia-profesional-mercancias/": {
    label: "Plataforma test",
    image: "/home-assets/course-platform-clean.webp",
    accent: "Practica con preguntas y seguimiento de progreso.",
  },
  "/servicios-asesoria-legal-para-transporte/": {
    label: "Asesoría de transporte",
    image: "/home-assets/trust-team-clean.webp",
    accent: "Gestión clara, documentación y cumplimiento normativo.",
  },
  "/sobre-nosotros/": {
    label: "Equipo experto",
    image: "/home-assets/driver-truck-clean.webp",
    accent: "Especialistas en empresas y autónomos del transporte.",
  },
  "/contacto/": {
    label: "Contacto",
    image: "/home-assets/final.webp",
    accent: "Cuéntanos tu caso y te orientamos rápido.",
  },
  "/blog/": {
    label: "Recursos",
    image: "/home-assets/logistics-screen-clean.webp",
    accent: "Guías sobre normativa, gestor y competencia profesional.",
  },
  "/category/examen-competencia-profesional-mercancias/": {
    label: "Examen competencia profesional",
    image: "/home-assets/course-platform-clean.webp",
    accent: "Guías, tests y planes de estudio para preparar mercancías.",
  },
};

function pathFromSlug(slug: string[]) {
  return `/${slug.join("/")}/`;
}

function findMigratedContent(path: string) {
  return [...wpContent.pages, ...wpContent.posts, ...wpContent.products].find(
    (item) => item.path === path,
  );
}

function normalizeLegacyHtml(html: string) {
  return html.replace(/<h1(\s[^>]*)?>/gi, "<h2$1>").replace(/<\/h1>/gi, "</h2>");
}

function routeVisualFor(route: RouteRecord, isPost: boolean, isProduct: boolean) {
  if (routeVisuals[route.path]) {
    return routeVisuals[route.path];
  }

  if (isPost) {
    return routeVisuals["/blog/"];
  }

  if (isProduct) {
    return routeVisuals["/producto/curso-titulo-profesional-transporte/"];
  }

  return {
    label: "Titulotransporte",
    image: "/home-assets/trust.webp",
    accent: "Soluciones para operar con claridad en transporte.",
  };
}

function schemaForRoute(route: RouteRecord, title: string, description: string) {
  const url = new URL(route.path, site.url).toString();
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
      { "@type": "ListItem", position: 2, name: title, item: url },
    ],
  };

  if (route.type === "product") {
    return [
      breadcrumb,
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: title,
        description,
        brand: { "@type": "Organization", name: site.name },
        offers: {
          "@type": "Offer",
          price: "99",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url,
        },
      },
    ];
  }

  if (route.type === "post") {
    return [
      breadcrumb,
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        mainEntityOfPage: url,
        publisher: { "@type": "Organization", name: site.name },
        dateModified: route.lastModified,
      },
    ];
  }

  return [breadcrumb];
}

export async function generateStaticParams() {
  return allRoutes
    .filter((route) => route.path !== "/")
    .map((route) => ({
      slug: route.path.split("/").filter(Boolean),
    }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const path = pathFromSlug(slug);
  const route = routeByPath(path);

  if (!route) {
    return {};
  }

  if (
    path === "/cede-tu-titulo-de-transporte/" ||
    path === "/titulos/" ||
    path === "/servicios-asesoria-legal-para-transporte/" ||
    path === "/producto/curso-titulo-profesional-transporte/" ||
    path === "/test-competencia-profesional-mercancias/"
  ) {
    return metadataFor(route);
  }

  const migratedContent = findMigratedContent(path);
  if (migratedContent) {
    const title = migratedContent.hasRankTitle ? migratedContent.seoTitle : route.title;
    const description = migratedContent.hasRankDescription
      ? migratedContent.seoDescription
      : route.description;

    return metadataFor({
      ...route,
      title,
      description,
      h1: migratedContent.title || route.h1,
    });
  }

  return metadataFor(route);
}

export default async function MigratedRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const path = pathFromSlug(slug);
  const route = routeByPath(path);

  if (!route) {
    notFound();
  }

  const commercialPage = CommercialRoutePage({ path });
  if (commercialPage) {
    return commercialPage;
  }

  const isProduct = route.type === "product";
  const isAccount = route.type === "account";
  const isPost = route.type === "post";
  const isTestPage = route.path === "/test-competencia-profesional-mercancias/";
  const isExamCategory = route.path === "/category/examen-competencia-profesional-mercancias/";
  const migratedContent = findMigratedContent(route.path);
  const migratedHtml = normalizeLegacyHtml(migratedContent?.html || "");
  const hasHtml = Boolean(migratedHtml);
  const pageTitle = isTestPage ? route.h1 : migratedContent?.title || route.h1;
  const pageDescription = isTestPage
    ? route.description
    : migratedContent?.hasRankDescription
    ? migratedContent.seoDescription
    : route.description;
  const schemas = schemaForRoute(route, pageTitle, pageDescription);
  const visual = routeVisualFor(route, isPost, isProduct);
  const session = isTestPage ? await auth() : null;
  const examCategoryPosts = isExamCategory
    ? blogPosts
        .filter((post) => {
          const haystack = `${post.path} ${post.title} ${post.description} ${post.h1}`.toLowerCase();
          return examCategoryKeywords.some((keyword) => haystack.includes(keyword));
        })
        .slice(0, 16)
    : [];
  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    `Quiero información sobre ${pageTitle}`,
  )}`;

  return (
    <main className={`inner-page inner-page--${route.type}${isPost ? " inner-page--post" : ""}`}>
      <section className="inner-hero">
        <div className="inner-hero-copy">
          <p className="tt-label">{isPost ? "Guía" : visual.label}</p>
          <h1>{pageTitle}</h1>
          <p>{pageDescription}</p>
          <div className="tt-actions">
            {isTestPage ? (
              <>
                <Link className="tt-btn tt-btn-primary" href="#test-app-heading">
                  Empezar test
                </Link>
                <Link className="tt-btn tt-btn-secondary" href="/login/">
                  Iniciar sesión
                </Link>
              </>
            ) : isAccount ? (
              <Link className="tt-btn tt-btn-primary" href="/producto/curso-titulo-profesional-transporte/">
                Ver curso
              </Link>
            ) : (
              <a className="tt-btn tt-btn-primary" href={whatsappUrl}>
                Consultar por WhatsApp
              </a>
            )}
            {!isTestPage ? (
              <Link className="tt-btn tt-btn-secondary" href="/contacto/">
                Contacto
              </Link>
            ) : null}
          </div>
        </div>

        <aside className="inner-hero-visual">
          <Image src={visual.image} alt="" fill priority sizes="(max-width: 900px) 100vw, 44vw" />
          <div className="inner-visual-card">
            <span>{visual.label}</span>
            <strong>{visual.accent}</strong>
          </div>
        </aside>
      </section>

      {isTestPage ? (
        <section className="inner-wide">
          <TestPractice isAuthenticated={Boolean(session?.user)} userName={session?.user?.name} />
        </section>
      ) : null}

      {isExamCategory ? (
        <section className="inner-blog-list inner-blog-list--category">
          <div>
            <p className="tt-label">Archivo temático</p>
            <h2>Guías para preparar competencia profesional de mercancías</h2>
            <p>
              Reúne los contenidos clave para estudiar el examen: supuestos prácticos, tests oficiales,
              planes de estudio, normativa y recursos para practicar antes de presentarte.
            </p>
            <div className="tt-actions">
              <Link className="tt-btn tt-btn-primary" href="/test-competencia-profesional-mercancias/">
                Practicar test
              </Link>
              <Link className="tt-btn tt-btn-secondary" href="/producto/curso-titulo-profesional-transporte/">
                Ver curso
              </Link>
            </div>
          </div>
          <div className="post-list">
            {examCategoryPosts.map((post) => (
              <Link key={post.path} href={post.path}>
                {post.h1}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {!isTestPage && !isExamCategory ? (
      <div className="inner-layout">
        {hasHtml ? (
          <article className="wp-content-shell">
            <div className="wp-content" dangerouslySetInnerHTML={{ __html: migratedHtml }} />
          </article>
        ) : (
          <section className="inner-private">
            <p className="tt-label">Acceso privado</p>
            <h2>Contenido disponible para usuarios registrados</h2>
            <p>
              Esta zona forma parte del área de alumnos y clientes. Accede a tu cuenta o consulta el curso para ver las opciones disponibles.
            </p>
            {isProduct ? (
              <p>
                Curso online para preparar la competencia profesional del transporte con test, materiales digitales y apoyo de estudio.
              </p>
            ) : null}
          </section>
        )}

        <aside className="inner-sidebar" aria-label="Enlaces importantes">
          <div className="inner-sidebar-card">
            <span>¿Necesitas claridad?</span>
            <h2>Te orientamos sobre la mejor opción</h2>
            <p>Revisamos tu caso y te indicamos si te conviene alquilar, ceder, preparar el examen o usar la plataforma test.</p>
            <a className="tt-btn tt-btn-primary" href={whatsappUrl}>Hablar por WhatsApp</a>
          </div>
          <nav className="inner-link-list">
            {importantLinks.map((link) => (
              <Link key={link.href} href={link.href}>{link.label}</Link>
            ))}
          </nav>
        </aside>
      </div>
      ) : (
        <section className="test-after">
          <article>
            <p className="tt-label">Cómo aprovecharla</p>
            <h2>Entrena por bloques, revisa fallos y vuelve a intentarlo</h2>
            <p>
              La plataforma está pensada para practicar como en un banco real de examen: eliges módulo,
              respondes, compruebas al momento y avanzas con un marcador de aciertos y fallos.
            </p>
          </article>
          <article>
            <p className="tt-label">Acceso y cuenta</p>
            <h2>Funciona para invitados y usuarios registrados</h2>
            <p>
              Sin iniciar sesión puedes practicar gratis. Con cuenta, la plataforma queda preparada para
              vincular progreso, compras y recursos privados cuando se active la base de datos de usuarios.
            </p>
            <Link className="tt-btn tt-btn-primary" href="/login/">Iniciar sesión</Link>
          </article>
        </section>
      )}

      <section className="inner-final">
        <div>
          <p className="tt-label">Siguiente paso</p>
          <h2>Resuelve tus dudas sobre transporte</h2>
        </div>
        <ul>
          <li>Consulta requisitos antes de iniciar el trámite.</li>
          <li>Revisa si te interesa alquilar, ceder o preparar el examen.</li>
          <li>Accede a test y materiales de competencia profesional.</li>
          <li>Habla con el equipo para estudiar tu caso concreto.</li>
        </ul>
      </section>

      {route.path === "/blog/" ? (
        <section className="inner-blog-list">
          <div>
            <p className="tt-label">Archivo editorial</p>
            <h2>Guías sobre transporte y competencia profesional</h2>
          </div>
          <div className="post-list">
            {blogPosts.slice(0, 12).map((post) => (
              <Link key={post.path} href={post.path}>
                {post.h1}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
    </main>
  );
}
