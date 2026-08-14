"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const fotos = [
  "/images/imagenP.jpg",
  "/images/reunion.jpg",
  "/images/bolivar.jpg",
  "/images/uniforme.png",
];


export default function HeroCarousel() {
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % fotos.length);
    }, 4500);

    return () => clearInterval(intervalo);
  }, []);

  const anterior = () => {
    setActual((prev) =>
      prev === 0 ? fotos.length - 1 : prev - 1
    );
  };

  const siguiente = () => {
    setActual((prev) =>
      (prev + 1) % fotos.length
    );
  };

  return (
    <div className="hero-carousel">

      {fotos.map((foto, index) => (
        <Image
          key={foto}
          src={foto}
          alt={`Actividad Fundación Corazón Valiente ${index + 1}`}
          fill
          priority={index === 0}
          sizes="(max-width: 900px) 100vw, 50vw"
          className={`hero-carousel-image ${
            index === actual ? "active" : ""
          }`}
        />
      ))}

      <button
        type="button"
        className="hero-carousel-arrow hero-carousel-prev"
        onClick={anterior}
        aria-label="Foto anterior"
      >
        ‹
      </button>

      <button
        type="button"
        className="hero-carousel-arrow hero-carousel-next"
        onClick={siguiente}
        aria-label="Foto siguiente"
      >
        ›
      </button>

      <div className="hero-carousel-dots">
        {fotos.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Ver fotografía ${index + 1}`}
            className={
              index === actual
                ? "hero-carousel-dot active"
                : "hero-carousel-dot"
            }
            onClick={() => setActual(index)}
          />
        ))}
      </div>

    </div>
  );
}