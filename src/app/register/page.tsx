import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import {
  faChartSimple,
  faCheck,
  faEnvelope,
  faEye,
  faFileCircleCheck,
  faLock,
  faPhone,
  faShieldHalved,
  faSquarePollVertical,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../../auth";
import { signInWithGoogle } from "../login/actions";

export const metadata: Metadata = {
  title: "Crear cuenta | Titulotransporte",
  description: "Crea tu cuenta de Titulotransporte con Google para acceder a cursos, test y recursos privados.",
  robots: { index: false, follow: true },
};

export default async function RegisterPage() {
  const session = await auth();
  const googleReady = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
  const fields = [
    { label: "Nombre", placeholder: "Tu nombre", icon: faUser },
    { label: "Apellidos", placeholder: "Tus apellidos", icon: faUser },
    { label: "Email", placeholder: "tu@email.com", icon: faEnvelope },
    { label: "Teléfono", placeholder: "600 123 456", icon: faPhone },
  ];
  const benefits = [
    { icon: faFileCircleCheck, title: "Tests actualizados 2026", text: "Miles de preguntas basadas en la normativa vigente y exámenes oficiales." },
    { icon: faSquarePollVertical, title: "Simulacros de examen", text: "Simula el examen real con tiempo limitado y condiciones idénticas." },
    { icon: faChartSimple, title: "Seguimiento de progreso", text: "Analiza resultados, identifica puntos débiles y mejora cada día." },
    { icon: faShieldHalved, title: "Acceso 24/7", text: "Estudia cuando quieras, desde donde quieras y en cualquier dispositivo." },
  ];

  return (
    <main className="register-page">
      <section className="register-form" aria-labelledby="register-title">
        <p className="tt-label">Plataforma Test de Transportista</p>
        <h1 id="register-title">Crea tu cuenta</h1>
        <p>Accede a nuestra plataforma de tests actualizados y al curso completo para preparar el examen de competencia profesional.</p>

        {session?.user ? (
          <Link className="auth-submit" href="/mi-cuenta/">Ir a mi cuenta</Link>
        ) : (
          <>
            <div className="register-grid">
              {fields.map(({ label, placeholder, icon }) => (
                <label key={label}>
                  {label}
                  <span>
                    <FontAwesomeIcon icon={icon} />
                    <input placeholder={placeholder} disabled />
                  </span>
                </label>
              ))}
              <label className="register-wide">
                Contraseña
                <span>
                  <FontAwesomeIcon icon={faLock} />
                  <input type="password" placeholder="Crea una contraseña" disabled />
                  <FontAwesomeIcon icon={faEye} />
                </span>
              </label>
              <label className="register-wide">
                Confirmar contraseña
                <span>
                  <FontAwesomeIcon icon={faLock} />
                  <input type="password" placeholder="Repite tu contraseña" disabled />
                  <FontAwesomeIcon icon={faEye} />
                </span>
              </label>
            </div>

            <label className="auth-terms">
              <input type="checkbox" disabled />
              Acepto los <Link href="/terminos-y-condiciones-de-compra/">Términos de uso</Link> y la{" "}
              <Link href="/politica-de-privacidad/">Política de privacidad</Link>.
            </label>

            <form action={signInWithGoogle}>
              <button className="auth-submit" type="submit" disabled={!googleReady}>
                <FontAwesomeIcon icon={faUserPlus} />
                {googleReady ? "Crear cuenta" : "Google OAuth pendiente"}
              </button>
            </form>

            <div className="auth-divider"><span>o continúa con</span></div>

            <div className="register-socials">
              <form action={signInWithGoogle}>
                <button type="submit" disabled={!googleReady}><FontAwesomeIcon icon={faGoogle} /> Google</button>
              </form>
              <button type="button" disabled><FontAwesomeIcon icon={faMicrosoft} /> Microsoft</button>
            </div>
          </>
        )}

        <p className="auth-bottom">¿Ya tienes cuenta? <Link href="/login/">Inicia sesión</Link></p>
      </section>

      <aside className="register-benefit-panel">
        <div className="register-product-visual">
          <Image src="/home-assets/logistics-screen-clean.webp" alt="Panel de progreso de la plataforma test" fill sizes="42vw" />
          <span><FontAwesomeIcon icon={faShieldHalved} /></span>
          <span><FontAwesomeIcon icon={faChartSimple} /></span>
        </div>
        <div className="register-benefit-card">
          <h2>Con tu cuenta obtienes acceso completo a:</h2>
          {benefits.map(({ icon, title, text }) => (
            <article key={title}>
              <FontAwesomeIcon icon={icon} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
          <p className="register-protected"><FontAwesomeIcon icon={faCheck} /> Tu información está protegida y se trata conforme al RGPD.</p>
        </div>
      </aside>
    </main>
  );
}
