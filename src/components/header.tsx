import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

const navigation = [
  { href: "/titulos/", label: "Alquiler de título" },
  { href: "/cede-tu-titulo-de-transporte/", label: "Ceder título" },
  { href: "/producto/curso-titulo-profesional-transporte/", label: "Curso de transportista" },
  { href: "/blog/", label: "Recursos" },
  { href: "/sobre-nosotros/", label: "Sobre nosotros" },
];

export function Header() {
  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hola, quiero información sobre el título de transportista.",
  )}`;

  return (
    <>
      <div className="tt-topbar">
        <span>◈ Especialistas en alquiler y cesión de títulos de transportista</span>
        <span>◷ +15 años ayudando a empresas y autónomos del transporte</span>
        <span>Atención personalizada: {site.phone}</span>
      </div>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Ir a la página de inicio">
          <span className="brand-mark">
            <Image src="/brand/titulotransporte-logo-mark.png" alt="" width={52} height={52} priority />
          </span>
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
        <Link className="header-cta" href="/contacto/">
          Contacto
        </Link>
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
