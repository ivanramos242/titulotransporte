import Link from "next/link";
import {
  faClock,
  faHeadset,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { site } from "@/lib/site";

const navigation = [
  { href: "/titulos/", label: "Alquiler de título" },
  { href: "/cede-tu-titulo-de-transporte/", label: "Ceder título" },
  { href: "/producto/curso-titulo-profesional-transporte/", label: "Curso" },
  { href: "/profesor-ia/", label: "Profesor IA" },
  { href: "/blog/", label: "Recursos" },
  { href: "/mi-cuenta/", label: "Mi cuenta" },
  { href: "/sobre-nosotros/", label: "Nosotros" },
];

export function Header() {
  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hola, quiero información sobre el título de transportista.",
  )}`;

  return (
    <>
      <div className="tt-topbar">
        <span><FontAwesomeIcon icon={faShieldHalved} /> Especialistas en alquiler y cesión de títulos de transportista</span>
        <span><FontAwesomeIcon icon={faClock} /> +15 años ayudando a empresas y autónomos del transporte</span>
        <span><FontAwesomeIcon icon={faHeadset} /> Atención personalizada: {site.phone}</span>
      </div>
      <header className="site-header">
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

        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="header-cta" href="/contacto/">
            Contacto
          </Link>
        </div>

        <details className="mobile-nav">
          <summary aria-label="Abrir menú de navegación">Menú</summary>
          <nav aria-label="Navegación móvil">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <a href={whatsappUrl}>WhatsApp</a>
            <Link href="/contacto/">Contacto</Link>
          </nav>
        </details>
      </header>
    </>
  );
}
