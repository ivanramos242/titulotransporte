import Link from "next/link";
import { site } from "@/lib/site";

const footerLinks = [
  { href: "/servicios-asesoria-legal-para-transporte/", label: "Servicios" },
  { href: "/sobre-nosotros/", label: "Sobre nosotros" },
  { href: "/contacto/", label: "Contacto" },
  { href: "/politica-de-privacidad/", label: "Privacidad" },
  { href: "/politica-de-cookies-ue/", label: "Cookies" },
  { href: "/terminos-y-condiciones-de-compra/", label: "Condiciones" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p className="eyebrow">titulotransporte.com</p>
        <h2>Resuelve tu título de transporte con una ruta clara y sin rodeos.</h2>
      </div>
      <div className="footer-grid">
        <div>
          <strong>Contacto</strong>
          <a href={`tel:${site.phone.replaceAll(" ", "")}`}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
        <div>
          <strong>Enlaces</strong>
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
