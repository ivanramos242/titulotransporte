import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faGraduationCap, faReceipt } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Compra recibida | Titulotransporte",
  description: "Confirmación de compra del curso de título de transporte.",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams?: Promise<{ session_id?: string }>;
}) {
  void searchParams;

  return (
    <main className="checkout-page checkout-success-page">
      <section className="account-panel checkout-success">
        <FontAwesomeIcon icon={faCircleCheck} className="checkout-success__icon" />
        <p className="tt-label">Pago enviado a verificación</p>
        <h1>Gracias por tu compra</h1>
        <p>
          Stripe ha completado el pago y estamos procesando la activación del curso. Si has iniciado sesión, el acceso quedará asociado a tu cuenta.
        </p>
        <div className="tt-actions">
          <Link className="tt-btn tt-btn-primary" href="/mi-cuenta/">
            <FontAwesomeIcon icon={faGraduationCap} />
            Ir a mi cuenta
          </Link>
          <Link className="tt-btn tt-btn-secondary" href="/contacto/">
            <FontAwesomeIcon icon={faReceipt} />
            Necesito ayuda
          </Link>
        </div>
      </section>
    </main>
  );
}
