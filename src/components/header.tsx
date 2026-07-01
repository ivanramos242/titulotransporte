import Link from "next/link";
import { site } from "@/lib/site";

const navigation = [
  { href: "/titulos/", label: "Alquiler de tÃ­tulo" },
  { href: "/cede-tu-titulo-de-transporte/", label: "Ceder tÃ­tulo" },
  { href: "/producto/curso-titulo-profesional-transporte/", label: "Curso" },
  { href: "/profesor-ia/", label: "Profesor IA" },
  { href: "/blog/", label: "Recursos" },
  { href: "/sobre-nosotros/", label: "Nosotros" },
];

export function Header() {
  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hola, quiero informaciÃ³n sobre el tÃ­tulo de transportista.",
  )}`;

  return (
    <>
      <div className="tt-topbar">
        <span>Especialistas en alquiler y cesiÃ³n de tÃ­tulos de transportista</span>
        <span>+15 aÃ±os ayudando a empresas y autÃ³nomos del transporte</span>
        <span>AtenciÃ³n personalizada: {site.phone}</span>
      </div>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Ir a la pÃ¡gina de inicio">
          <span
            className="brand-mark"
            aria-hidden="true"
            style={{ backgroundImage: 'url("/brand/titulotransporte-logo-mark.png")' }}
          />
          <span>
            <strong>TITULOTRANSPORTE</strong>
            <small>GESTORÃA DE TRANSPORTE</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="NavegaciÃ³n principal">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-phone" href={`tel:${site.phone.replaceAll(" ", "")}`}>
            {site.phone}
          </a>
          <a className="header-cta" href={whatsappUrl}>
            WhatsApp
          </a>
        </div>

        <details className="mobile-nav">
          <summary aria-label="Abrir menÃº de navegaciÃ³n">MenÃº</summary>
          <nav aria-label="NavegaciÃ³n mÃ³vil">
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

