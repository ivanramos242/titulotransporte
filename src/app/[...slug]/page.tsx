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

export async function generateStaticParams() {
  return allRoutes
    .filter((route) => route.path !== "/")
    .map((route) => ({
      slug: route.path.split("/").filter(Boolean),
    }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const route = routeByPath(pathFromSlug(slug));

  if (!route) {
    return {};
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

  return (
    <main>
      <section className="subhero">
        <p className="eyebrow">
          {isPost ? "Guía migrada" : isProduct ? "Producto" : "Ruta heredada"}
        </p>
        <h1>{route.h1}</h1>
        <p>{route.description}</p>
        <div className="hero-actions compact">
          {isAccount ? (
            <Link className="button primary" href="/producto/curso-titulo-profesional-transporte/">
              Ver curso
            </Link>
          ) : (
            <a
              className="button primary"
              href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                `Quiero información sobre ${route.h1}`,
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
          <div className="wp-content-note">
            <p className="eyebrow">Contenido original migrado</p>
            <p>
              Texto renderizado desde WordPress. La maquetación se está
              transformando a componentes Next sin perder contenido ni slug.
            </p>
          </div>
          <div
            className="wp-content"
            dangerouslySetInnerHTML={{ __html: migratedHtml }}
          />
        </article>
      ) : (
        <section className="section two-col">
          <div>
            <p className="eyebrow">Estado de migración</p>
            <h2>Ruta preparada para función privada</h2>
          </div>
          <div className="copy-stack">
            <p>
              Esta ruta depende de funcionalidad privada de WordPress o de un
              plugin: login, cuenta, checkout, membresía o profesor IA. La ruta
              queda preservada y marcada según su intención mientras se porta la
              lógica a Next.
            </p>
            {isProduct ? (
              <p>
                Producto detectado: curso virtual y descargable con precio
                actual de 99 EUR. La compra final se portará a Stripe Checkout.
              </p>
            ) : null}
          </div>
        </section>
      )}

      <section className="section dark-band">
        <div>
          <p className="eyebrow">SEO de la ruta</p>
          <h2>Señales técnicas ya preparadas</h2>
        </div>
        <ul className="check-list">
          <li>Title y meta description específicos.</li>
          <li>Canonical absoluto hacia la URL final.</li>
          <li>{route.noindex ? "Noindex intencional." : "Indexable por defecto."}</li>
          <li>
            {hasHtml
              ? "Contenido original visible en HTML renderizado."
              : "Estructura lista para lógica privada."}
          </li>
        </ul>
      </section>

      {route.path === "/blog/" ? (
        <section className="services">
          <div className="section-heading">
            <p className="eyebrow">Archivo editorial</p>
            <h2>Guías detectadas en WordPress</h2>
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
    </main>
  );
}
