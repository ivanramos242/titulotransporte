"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookieBite, faSliders, faXmark } from "@fortawesome/free-solid-svg-icons";

const storageKey = "tt-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(!window.localStorage.getItem(storageKey));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function saveConsent(value: "accepted" | "necessary") {
    window.localStorage.setItem(storageKey, JSON.stringify({ value, date: new Date().toISOString() }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <section className="cookie-banner" aria-label="Aviso de cookies">
      <button className="cookie-close" type="button" aria-label="Cerrar aviso de cookies" onClick={() => saveConsent("necessary")}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <div className="cookie-icon" aria-hidden="true">
        <FontAwesomeIcon icon={faCookieBite} />
      </div>
      <div>
        <h2>Usamos cookies para mejorar tu experiencia</h2>
        <p>
          Utilizamos cookies necesarias y, si aceptas, cookies de analítica para entender el uso de la web.
          Puedes consultar más información en nuestra{" "}
          <Link href="/politica-de-cookies-ue/">política de cookies</Link> y en la{" "}
          <Link href="/politica-de-privacidad/">política de privacidad</Link>.
        </p>
      </div>
      <div className="cookie-actions">
        <button type="button" className="tt-btn tt-btn-secondary" onClick={() => saveConsent("necessary")}>
          <FontAwesomeIcon icon={faSliders} />
          Solo necesarias
        </button>
        <button type="button" className="tt-btn tt-btn-primary" onClick={() => saveConsent("accepted")}>
          Aceptar cookies
        </button>
      </div>
    </section>
  );
}
