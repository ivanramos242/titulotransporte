import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheck,
  faCircleCheck,
  faCreditCard,
  faGraduationCap,
  faLock,
  faShieldHalved,
  faTag,
  faUsers,
  faClock,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Finalizar compra | Curso Título Transporte",
  description: "Completa la compra del curso de título de transportista con pago seguro.",
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
        <form className="checkout-form">
          <div className="checkout-title">
            <h1>Completa tu compra</h1>
            <p>Estás a un paso de impulsar tu carrera en el transporte.</p>
          </div>

          <div className="checkout-secure">
            <FontAwesomeIcon icon={faLock} />
            <div>
              <strong>Pago seguro</strong>
              <span>Todos los datos se transmiten cifrados y protegidos.</span>
            </div>
            <em>Procesado con stripe</em>
          </div>

          <label>
            Correo electrónico
            <input type="email" placeholder="hola@ejemplo.com" />
            <small>Te enviaremos tu acceso y la confirmación de compra.</small>
          </label>

          <fieldset className="card-fieldset">
            <legend>Datos de la tarjeta</legend>
            <div className="card-number">
              <FontAwesomeIcon icon={faCreditCard} />
              <input inputMode="numeric" placeholder="Número de tarjeta" />
              <span>VISA · MC · AMEX</span>
            </div>
            <div className="card-row">
              <input placeholder="MM / AA" />
              <input placeholder="CVC" />
            </div>
          </fieldset>

          <label>
            Titular de la tarjeta
            <input placeholder="Nombre completo del titular" />
          </label>

          <div className="checkout-two">
            <label>
              País o región
              <select defaultValue="España">
                <option>España</option>
                <option>Portugal</option>
                <option>Francia</option>
              </select>
            </label>
            <label>
              Código postal
              <input placeholder="Ej. 28001" />
            </label>
          </div>

          <label>
            <span><FontAwesomeIcon icon={faTag} /> Código de descuento <small>(opcional)</small></span>
            <div className="discount-row">
              <input placeholder="Introducir código" />
              <button type="button">Aplicar</button>
            </div>
          </label>

          <button className="checkout-submit" type="button">
            <span><FontAwesomeIcon icon={faLock} /> Finalizar compra</span>
            <strong>89,00 €</strong>
          </button>
          <p className="checkout-terms">
            Al finalizar la compra aceptas nuestros <Link href="/terminos-y-condiciones-de-compra/">Términos de uso</Link> y{" "}
            <Link href="/politica-de-privacidad/">Política de privacidad</Link>.
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
              <b>89,00 €</b>
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
              <div><dt>Subtotal</dt><dd>89,00 €</dd></div>
              <div><dt>IVA (21%)</dt><dd>18,69 €</dd></div>
              <div className="order-total"><dt>Total</dt><dd>89,00 €</dd></div>
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
