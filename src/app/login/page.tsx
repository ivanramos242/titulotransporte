import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRightToBracket,
  faBookOpen,
  faBolt,
  faChartLine,
  faEnvelope,
  faEye,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../../auth";
import { signInWithGoogle } from "./actions";

export const metadata: Metadata = {
  title: "Iniciar sesión | Titulotransporte",
  description: "Accede a tu cuenta de Titulotransporte con inicio de sesión seguro mediante Google.",
  robots: { index: false, follow: true },
};

export default async function LoginPage() {
  const session = await auth();
  const googleReady = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
  const features = [
    { icon: faBookOpen, title: "Accede a tu curso", text: "Continúa donde lo dejaste y avanza a tu ritmo." },
    { icon: faBolt, title: "Practica con tests", text: "Miles de preguntas actualizadas y simulacros." },
    { icon: faChartLine, title: "Guarda tu progreso", text: "Seguimiento para no perder tu racha." },
  ];

  return (
    <main className="auth-split">
      <section className="auth-form-panel" aria-labelledby="login-title">
        <Link href="/" className="auth-logo" aria-label="Ir a la página de inicio">
          <span className="brand-mark" aria-hidden="true" style={{ backgroundImage: 'url("/brand/titulotransporte-logo-mark.png")' }} />
          <span>
            <strong>TITULOTRANSPORTE</strong>
            <small>GESTORÍA DE TRANSPORTE</small>
          </span>
        </Link>

        <div className="auth-copy">
          <p className="tt-label">Plataforma Test</p>
          <h1 id="login-title">Inicia sesión en tu cuenta</h1>
          <p>Accede a la Plataforma Test de Transportista y sigue avanzando hacia tu título.</p>
        </div>

        {session?.user ? (
          <Link className="auth-submit" href="/mi-cuenta/">
            Ir a mi cuenta
            <FontAwesomeIcon icon={faArrowRightToBracket} />
          </Link>
        ) : (
          <>
            <div className="auth-field-grid">
              <label>
                Correo electrónico
                <span>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input type="email" placeholder="ejemplo@correo.com" disabled />
                </span>
              </label>
              <label>
                Contraseña
                <span>
                  <FontAwesomeIcon icon={faLock} />
                  <input type="password" placeholder="••••••••••••" disabled />
                  <FontAwesomeIcon icon={faEye} />
                </span>
              </label>
            </div>

            <div className="auth-row">
              <label className="auth-check">
                <input type="checkbox" defaultChecked disabled />
                Recordarme
              </label>
              <Link href="/contacto/">He olvidado mi contraseña</Link>
            </div>

            <form action={signInWithGoogle}>
              <button className="auth-submit" type="submit" disabled={!googleReady}>
                <FontAwesomeIcon icon={faArrowRightToBracket} />
                {googleReady ? "Iniciar sesión" : "Google OAuth pendiente"}
              </button>
            </form>

            <div className="auth-divider"><span>o continúa con</span></div>

            <form action={signInWithGoogle}>
              <button className="auth-social" type="submit" disabled={!googleReady}>
                <FontAwesomeIcon icon={faGoogle} />
                Continuar con Google
              </button>
            </form>
          </>
        )}

        <p className="auth-bottom">
          ¿Aún no tienes cuenta? <Link href="/register/">Crear cuenta</Link>
        </p>
      </section>

      <section className="auth-visual-panel" aria-label="Vista previa de la plataforma">
        <div className="auth-device">
          <Image
            src="/home-assets/course-platform-clean.webp"
            alt="Vista de la plataforma de test y curso de Titulotransporte"
            fill
            priority
            sizes="(max-width: 980px) 100vw, 56vw"
          />
        </div>
        <div className="auth-feature-row">
          {features.map(({ icon, title, text }) => (
            <article key={title}>
              <FontAwesomeIcon icon={icon} />
              <div>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="auth-rating">
          <span>★★★★★</span>
          <strong>4,9/5</strong>
          <p>Más de 1.200 alumnos ya confían en nosotros</p>
        </div>
      </section>
    </main>
  );
}
