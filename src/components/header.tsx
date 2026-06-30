import Link from "next/link";
import { site } from "@/lib/site";

const navigation = [
  { href: "/", label: "Inicio" },
  { href: "/titulos/", label: "Títulos" },
  { href: "/test-competencia-profesional-mercancias/", label: "Tests" },
  { href: "/producto/curso-titulo-profesional-transporte/", label: "Curso" },
  { href: "/cede-tu-titulo-de-transporte/", label: "Ceder título" },
  { href: "/blog/", label: "Blog" },
];

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Ir a la home">
        <span className="brand-mark">TT</span>
        <span>
          <strong>titulotransporte</strong>
          <small>.com</small>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Navegación principal">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <a
        className="header-cta"
        href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
          "Quiero información sobre el título de transporte",
        )}`}
      >
        WhatsApp
      </a>
    </header>
  );
}
