"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const telefono = "573118449229";

  const mensaje =
    "Hola Fundación Corazón Valiente, quisiera recibir más información.";

  const whatsappUrl =
    `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Contactar por WhatsApp"
      title="Escríbenos por WhatsApp"
    >
      <FaWhatsapp />
      <span className="whatsapp-tooltip">
        ¿Necesitas ayuda? Escríbenos
      </span>
    </a>
  );
}