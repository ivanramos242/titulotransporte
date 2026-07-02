import Link from "next/link";
import {
  faBookOpen,
  faClock,
  faEnvelope,
  faHeadset,
  faHouse,
  faRobot,
  faShieldHalved,
  faTruckFast,
  faUser,
  faUserPlus,
  faUsers,
  faFileContract,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { site } from "@/lib/site";

const navigation = [
  { href: "/", label: "Inicio", icon: faHouse },
  { href: "/titulos/", label: "Alquiler de título", icon: faFileContract },
  { href: "/cede-tu-titulo-de-transporte/", label: "Ceder título", icon: faTruckFast },
  { href: "/producto/curso-titulo-profesional-transporte/", label: "Curso", icon: faGraduationCap },
  { href: "/test-competencia-profesional-mercancias/", label: "Tests", icon: faBookOpen },
  { href: "/profesor-ia/", label: "Profesor IA", icon: faRobot },
  { href: "/blog/", label: "Blog", icon: faBookOpen },
  { href: "/sobre-nosotros/", label: "Nosotros", icon: faUsers },
  { href: "/contacto/", label: "Contacto", icon: faEnvelope },
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
              <FontAwesomeIcon icon={item.icon} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="header-login" href="/login/">
            <FontAwesomeIcon icon={faUser} />
            Iniciar sesión
          </Link>
          <Link className="header-register" href="/register/">
            <FontAwesomeIcon icon={faUserPlus} />
            Registrarse
          </Link>
        </div>

        <details className="mobile-nav">
          <summary aria-label="Abrir menú de navegación">Menú</summary>
          <nav aria-label="Navegación móvil">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                <FontAwesomeIcon icon={item.icon} />
                {item.label}
              </Link>
            ))}
            <Link href="/login/">Iniciar sesión</Link>
            <Link href="/register/">Registrarse</Link>
            <Link href="/mi-cuenta/">Mi cuenta</Link>
            <a href={whatsappUrl}>WhatsApp</a>
          </nav>
        </details>
      </header>
    </>
  );
}
