import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheck,
  faCircleCheck,
  faGraduationCap,
  faHeadset,
  faLock,
  faShieldHalved,
  faUsers,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { createCourseCheckoutSession } from "./actions";

export const metadata: Metadata = {
  title: "Finalizar compra | Curso Título Transporte",
  description: "Completa la compra del curso de título de transportista con pago seguro en Stripe.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <main className="checkout-page">
      <header className="checkout-head">
        <Link href="/producto/curso-titulo-profesional-transporte/" className="checkout-brand">
          <span className="brand-mark" aria-hidden="true" style={{ backgroundImage: 'url("/brand/titulotransporte-logo-mark.png")' }} />
          <span>TITULOTRANSPORTE</span>
        </Link>
        <Link href="/producto/curso-titulo-profesional-transporte/" className="checkout-back">
          <FontAwesomeIcon icon={faArrowLeft} />
          Volver al curso
        </Link>
        <div className="checkout-steps" aria-label="Proceso de compra">
          <span><FontAwesomeIcon icon={faCircleCheck} /> Selección</span>
          <strong>Pago</strong>
          <span>Confirmación</span>
        </div>
        <p><FontAwesomeIcon icon={faLock} /> Pago 100% seguro · Procesado con <strong>Stripe</strong></p>
      </header>

      <section className="checkout-grid">
        <form className="checkout-form" action={createCourseCheckoutSession}>
          <div className="checkout-title">
            <h1>Completa tu compra</h1>
            <p>Estás a un paso de activar tu acceso al curso de título de transporte.</p>
          </div>

          <div className="checkout-secure">
            <FontAwesomeIcon icon={faLock} />
            <div>
              <strong>Checkout real de Stripe</strong>
              <span>La tarjeta se introduce en Stripe, no en nuestra web. Usamos producto y precio inline, sin crear producto en Stripe.</span>
            </div>
            <em>Procesado con Stripe</em>
          </div>

          <div className="checkout-next">
            <h2>Qué ocurrirá al continuar</h2>
            <p>
              Te enviaremos a una página segura de Stripe para introducir tus datos de pago. Al completar el pago volverás automáticamente a Titulotransporte.
            </p>
          </div>

          <button className="checkout-submit" type="submit">
            <span><FontAwesomeIcon icon={faLock} /> Ir a pago seguro</span>
            <strong>99,00 €</strong>
          </button>
          <p className="checkout-terms">
            Al continuar aceptas nuestros <Link href="/terminos-y-condiciones-de-compra/">Términos de uso</Link> y{" "}
            <Link href="/politica-de-privacidad/">Política de privacidad</Link>. Stripe solicitará la aceptación en el checkout.
          </p>
        </form>

        <aside className="checkout-summary">
          <article className="order-card">
            <h2>Resumen de tu pedido</h2>
            <div className="order-product">
              <span><FontAwesomeIcon icon={faGraduationCap} /></span>
              <div>
                <strong>Curso de Transportista</strong>
                <small>Acceso completo · 12 meses</small>
              </div>
              <b>99,00 €</b>
            </div>
            <div className="order-includes">
              <strong>Incluye:</strong>
              {[
                "Acceso a todo el contenido del curso",
                "Tests y simulacros ilimitados",
                "Actualizaciones y nueva normativa",
                "Soporte de profesores y tutorías",
                "Certificado de aprovechamiento",
              ].map((item) => (
                <span key={item}><FontAwesomeIcon icon={faCheck} /> {item}</span>
              ))}
            </div>
            <dl>
              <div><dt>Subtotal</dt><dd>81,82 €</dd></div>
              <div><dt>IVA incluido (21%)</dt><dd>17,18 €</dd></div>
              <div className="order-total"><dt>Total</dt><dd>99,00 €</dd></div>
            </dl>
          </article>

          <article className="checkout-guarantee">
            <FontAwesomeIcon icon={faShieldHalved} />
            <div>
              <strong>Compra protegida</strong>
              <p>Garantía de reembolso de 14 días si no estás satisfecho.</p>
            </div>
          </article>

          <article className="checkout-proof">
            <h2>Miles de profesionales ya confían en Titulotransporte</h2>
            <div>
              <span><FontAwesomeIcon icon={faUsers} /><strong>+1.200</strong> Alumnos satisfechos</span>
              <span><FontAwesomeIcon icon={faShieldHalved} /><strong>100%</strong> Pago seguro</span>
              <span><FontAwesomeIcon icon={faClock} /><strong>14 días</strong> Garantía</span>
              <span><FontAwesomeIcon icon={faHeadset} /><strong>24/7</strong> Soporte</span>
            </div>
            <blockquote>
              “Gracias a Titulotransporte aprobé a la primera y ahora gestiono mi propia empresa de transporte.”
              <cite>— Carlos M.</cite>
            </blockquote>
          </article>
        </aside>
      </section>

      <footer className="checkout-footer">
        <span><FontAwesomeIcon icon={faLock} /> Conexión segura SSL 256-bit</span>
        <span><FontAwesomeIcon icon={faShieldHalved} /> Tu información está protegida</span>
        <span>Pago procesado con Stripe</span>
      </footer>
    </main>
  );
}
