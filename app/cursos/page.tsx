import Navbar from "../components/Navbar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursos | Fundación Corazón Valiente",
  description:
    "Próximamente encontrarás cursos, talleres y espacios de formación de la Fundación Corazón Valiente Colombia.",
};

export default function CursosPage() {
  return (
    <>
      <Navbar />

      <main className="cursos-page">

        <section className="cursos-proximamente">

          <div className="cursos-icon">
            🎓
          </div>

          <span className="cursos-kicker">
            FORMACIÓN QUE TRANSFORMA
          </span>

          <h1>
            Nuestros cursos
          </h1>

          <p className="cursos-description">
            Estamos preparando nuevos espacios de aprendizaje,
            formación y crecimiento para nuestra comunidad.
          </p>

          <div className="cursos-message">
            <strong>Muy pronto</strong>

            <p>
              Aquí podrás conocer nuestros cursos, talleres,
              capacitaciones y demás espacios de formación de la
              Fundación Corazón Valiente Colombia.
            </p>
          </div>

          <Link href="/" className="cursos-back">
            ← Volver al inicio
          </Link>

        </section>

      </main>
    </>
  );
}