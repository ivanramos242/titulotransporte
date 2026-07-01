import Link from "next/link";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { site } from "@/lib/site";

const serviceLinks = [
  { href: "/titulos/", label: "Alquiler de título" },
  { href: "/cede-tu-titulo-de-transporte/", label: "Ceder título" },
  { href: "/producto/curso-titulo-profesional-transporte/", label: "Curso de transportista" },
  { href: "/profesor-ia/", label: "Profesor IA" },
  { href: "/test-competencia-profesional-mercancias/", label: "Plataforma Test" },
  { href: "/mi-cuenta/", label: "Mi cuenta" },
];

const resourceLinks = [
  { href: "/blog/", label: "Blog" },
  { href: "/#faq", label: "Preguntas frecuentes" },
  { href: "/capacidad-financiera-en-transporte-cuanto-necesitas-y-como-acreditarla/", label: "Capacidad financiera" },
  { href: "/category/gestor-de-transporte/funciones-del-gestor/", label: "Funciones del gestor" },
];

const legalLinks = [
  { href: "/politica-de-privacidad/", label: "Política de privacidad" },
  { href: "/politica-de-cookies-ue/", label: "Política de cookies" },
  { href: "/terminos-y-condiciones-de-compra/", label: "Condiciones de uso" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="tt-footer-brand">
        <Link href="/" className="brand" aria-label="Ir a la página de inicio">
          <span
            className="brand-mark"
            aria-hidden="true"
            style={{ backgroundImage: 'url("/brand/titulotransporte-logo-mark.png")' }}
          />
          <span>
            <strong>TITULOTRANSPORTE</strong>
            <small>GESTORÍA DE TRANSPORTE</small>
          </span>
        </Link>
        <p>
          Especialistas en alquiler, cesión y formación para el título de transportista. Ayudamos a autónomos,
          empresas y profesionales del transporte a cumplir la normativa y hacer crecer su negocio.
        </p>
        <div className="tt-footer-badges">
          <span>+1.200 clientes satisfechos</span>
          <span>100% legal y seguro</span>
          <span>Asesoramiento experto</span>
        </div>
      </div>
      <div className="footer-grid">
        <div>
          <strong>Servicios</strong>
          {serviceLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </div>
        <div>
          <strong>Recursos</strong>
          {resourceLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </div>
        <div>
          <strong>Contacto</strong>
          <a href={`tel:${site.phone.replaceAll(" ", "")}`}>{site.phone}</a>
          <a href={`https://wa.me/${site.whatsapp}`}>Hablar por WhatsApp</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>Toda España</span>
        </div>
        <div>
          <strong>Recursos y novedades</strong>
          <p>Recibe guías, novedades legales y consejos para tu negocio.</p>
          <form className="tt-newsletter">
            <label>
              <span className="sr-only">Tu email</span>
              <input type="email" placeholder="Tu email" />
            </label>
            <button type="submit" aria-label="Suscribirme"><FontAwesomeIcon icon={faArrowRight} /></button>
          </form>
          <label className="tt-privacy">
            <input type="checkbox" /> Acepto la política de privacidad
          </label>
        </div>
      </div>
      <div className="tt-footer-bottom">
        <span>© 2026 Titulotransporte. Todos los derechos reservados.</span>
        <nav aria-label="Enlaces legales">
          {legalLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
      </div>
    </footer>
  );
}
