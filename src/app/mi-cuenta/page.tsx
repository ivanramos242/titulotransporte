import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faReceipt, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../../auth";
import { signInWithGoogle, signOutUser } from "../login/actions";

export const metadata: Metadata = {
  title: "Mi cuenta | Titulotransporte",
  description: "Zona privada para alumnos y clientes de Titulotransporte.",
  robots: { index: false, follow: true },
};

export default async function AccountPage() {
  const session = await auth();
  const googleReady = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
  const accountCards = [
    ["Curso online", "Accede al curso y a los recursos de estudio cuando esté activo en tu cuenta.", faBookOpen, "/producto/curso-titulo-profesional-transporte/"],
    ["Compras", "Consulta pagos, facturas y estado de pedidos cuando Stripe esté conectado.", faReceipt, "/finalizar-compra/"],
    ["Datos seguros", "Tu acceso usa OAuth y sesión cifrada con Auth.js.", faUserShield, "/contacto/"],
  ] as const;

  if (!session?.user) {
    return (
      <main className="account-page">
        <section className="account-panel">
          <p className="tt-label">Acceso privado</p>
          <h1>Entra para ver tu cuenta</h1>
          <p>Inicia sesión con Google para acceder a tus cursos, compras y recursos.</p>
          <form action={signInWithGoogle}>
            <button className="tt-btn tt-btn-primary account-google" type="submit" disabled={!googleReady}>
              {googleReady ? "Continuar con Google" : "Google OAuth pendiente"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="account-page">
      <section className="account-dashboard">
        <div className="account-dashboard__head">
          <div>
            <p className="tt-label">Mi cuenta</p>
            <h1>Hola, {session.user.name || session.user.email}</h1>
            <p>{session.user.email}</p>
          </div>
          <form action={signOutUser}>
            <button className="tt-btn tt-btn-secondary" type="submit">
              Cerrar sesión
            </button>
          </form>
        </div>
        <div className="account-dashboard__grid">
          {accountCards.map(([title, text, icon, href]) => (
            <Link key={title} href={href} className="account-card">
              <FontAwesomeIcon icon={icon} />
              <h2>{title}</h2>
              <p>{text}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
