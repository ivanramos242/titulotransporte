import Link from "next/link";
import { notFound } from "next/navigation";
import { TestPractice } from "@/components/test-practice";
import wpContent from "@/data/wp-content.json";
import { allRoutes, blogPosts, metadataFor, routeByPath, site } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

function pathFromSlug(slug: string[]) {
  return `/${slug.join("/")}/`;
}

function findMigratedContent(path: string) {
  return [...wpContent.pages, ...wpContent.posts, ...wpContent.products].find(
    (item) => item.path === path,
  );
}

function schemaForRoute(route: (typeof allRoutes)[number], title: string, description: string) {
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

  const migratedContent = findMigratedContent(path);
  if (migratedContent) {
    return metadataFor({
      ...route,
      title: migratedContent.seoTitle || migratedContent.title || route.title,
      description: migratedContent.seoDescription || migratedContent.excerpt || route.description,
      h1: migratedContent.title || route.h1,
    });
  }

  return metadataFor(route);
}

export default async function MigratedRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const route = routeByPath(pathFromSlug(slug));

  if (!route) {
    notFound();
  }

  const isProduct = route.type === "product";
  const isAccount = route.type === "account";
  const isPost = route.type === "post";
  const migratedContent = findMigratedContent(route.path);
  const migratedHtml = migratedContent?.html || "";
  const hasHtml = Boolean(migratedHtml);
  const isTestPage = route.path === "/test-competencia-profesional-mercancias/";
  const pageTitle = migratedContent?.title || route.h1;
  const pageDescription = migratedContent?.seoDescription || migratedContent?.excerpt || route.description;
  const schemas = schemaForRoute(route, pageTitle, pageDescription);

  return (
    <main>
      <section className="subhero">
        <p className="eyebrow">
          {isPost ? "Guia" : isProduct ? "Producto" : "titulotransporte.com"}
        </p>
        <h1>{pageTitle}</h1>
        <p>{pageDescription}</p>
        <div className="hero-actions compact">
          {isAccount ? (
            <Link className="button primary" href="/producto/curso-titulo-profesional-transporte/">
              Ver curso
            </Link>
          ) : (
            <a
              className="button primary"
              href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                `Quiero informacion sobre ${pageTitle}`,
              )}`}
            >
              Consultar por WhatsApp
            </a>
          )}
          <Link className="button secondary" href="/contacto/">
            Contacto
          </Link>
        </div>
      </section>

      {isTestPage ? <TestPractice /> : null}

      {hasHtml ? (
        <article className="wp-content-shell">
          <div
            className="wp-content"
            dangerouslySetInnerHTML={{ __html: migratedHtml }}
          />
        </article>
      ) : (
        <section className="section two-col">
          <div>
            <p className="eyebrow">Acceso privado</p>
            <h2>Contenido disponible para usuarios registrados</h2>
          </div>
          <div className="copy-stack">
            <p>
              Esta zona forma parte del area de alumnos y clientes. Accede a tu
              cuenta o consulta el curso para ver las opciones disponibles.
            </p>
            {isProduct ? (
              <p>
                Curso online para preparar la competencia profesional del
                transporte con test, materiales digitales y apoyo de estudio.
              </p>
            ) : null}
          </div>
        </section>
      )}

      <section className="section dark-band">
        <div>
          <p className="eyebrow">Siguiente paso</p>
          <h2>Resuelve tus dudas sobre transporte</h2>
        </div>
        <ul className="check-list">
          <li>Consulta requisitos antes de iniciar el tramite.</li>
          <li>Revisa si te interesa alquilar, ceder o preparar el examen.</li>
          <li>Accede a test y materiales de competencia profesional.</li>
          <li>Habla con el equipo para estudiar tu caso concreto.</li>
        </ul>
      </section>

      {route.path === "/blog/" ? (
        <section className="services">
          <div className="section-heading">
            <p className="eyebrow">Archivo editorial</p>
            <h2>Guias sobre transporte y competencia profesional</h2>
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
