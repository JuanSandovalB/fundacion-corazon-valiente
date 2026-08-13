export const dynamic = "force-dynamic";
export const revalidate = 0;
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";


import { supabaseAdmin } from "../lib/supabaseAdmin";
import VolunteerForm from "./components/VolunteerForm";
const programas = [
  {
    icono: "🛡️",
    titulo: "Protección de la niñez",
    texto:
      "Promovemos entornos protectores, prevención del abuso y formación en valores.",
    clase: "program-card program-red",
  },
  {
    icono: "💛",
    titulo: "Salud mental y esperanza",
    texto:
      "Brindamos acompañamiento emocional, orientación y herramientas para fortalecer el bienestar.",
    clase: "program-card program-yellow",
  },
  {
    icono: "🤝",
    titulo: "Comunidad y solidaridad",
    texto:
      "Desarrollamos jornadas sociales, ayudas y actividades para las comunidades.",
    clase: "program-card program-blue",
  },
  {
    icono: "🎓",
    titulo: "Educación y formación",
    texto:
      "Realizamos talleres, capacitaciones y procesos educativos para construir oportunidades.",
    clase: "program-card program-purple",
  },
];

const acciones = [
  {
    icono: "📅",
    titulo: "Eventos y campañas",
    texto: "Participa en nuestras actividades y sé parte del cambio.",
    enlace: "#eventos",
    boton: "Ver eventos",
    clase: "action-pink",
  },
  {
    icono: "🫶",
    titulo: "Dona",
    texto: "Tu ayuda transforma vidas. Cada aporte cuenta.",
    enlace: "#donar",
    boton: "Quiero donar",
    clase: "action-yellow",
  },
  {
    icono: "👥",
    titulo: "Hazte voluntario",
    texto: "Tu tiempo y talento pueden hacer una gran diferencia.",
    enlace: "#voluntariado",
    boton: "Me quiero unir",
    clase: "action-blue",
  },
  {
    icono: "⭐",
    titulo: "Club Corazón Valiente",
    texto: "Únete a nuestra comunidad y recibe noticias y beneficios.",
    enlace: "#contacto",
    boton: "Quiero unirme",
    clase: "action-purple",
  },
];

export default async function Home() {
  const { data: eventos, error } = await supabaseAdmin
    .from("eventos")
    .select("*")
    .eq("estado", "activo")
    .order("fecha", { ascending: true });


  if (error) {
    console.error("ERROR EVENTOS HOME:", error);
  }


 

  return (
    <main>
      <header className="site-header">
        <div className="container navbar">
          <a href="#inicio" className="brand" aria-label="Ir al inicio">
            <Image
              src="/images/logo.png"
              alt="Logo Fundación Corazón Valiente"
              width={190}
              height={90}
              priority
              className="navbar-logo"
            />
          </a>

          <nav className="desktop-menu" aria-label="Menú principal">
            <a href="#inicio">Inicio</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#programas">Programas</a>
            <a href="#eventos">Eventos</a>

            <a href="#donar">Dona</a>
            <a href="#voluntariado">Voluntariado</a>
            <a href="#contacto">Contacto</a>
          </nav>

          <Link
            href="/dona"
            className="header-action header-donate"
          >
            ❤️ Quiero ayudar
          </Link>


          <Link
            href="/login"
            className="header-action header-login"
          >
            Administrador
          </Link>
        </div>
      </header>

      <section id="inicio" className="hero">
        

        <div className="container hero-grid">
          <div className="hero-content">
            <span className="eyebrow">Fundación Corazón Valiente</span>

            <h1>
              Un corazón valiente es el que cree que su{" "}
              <span>historia puede cambiar.</span>
            </h1>

            <p>
              Acompañamos, protegemos e impulsamos a niños, mujeres, adultos
              mayores y familias para que vivan con dignidad, esperanza y
              oportunidades.
            </p>

            <div className="hero-buttons">
              <a href="#donar" className="button button-primary">
                ♡ Quiero ayudar
              </a>

              <a href="#nosotros" className="button button-outline">
                Conoce más
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-photo">
              <div className="photo-placeholder">
                <span>❤️</span>
                <strong>Una familia llena de esperanza</strong>
                <small>
                  Aquí colocaremos la fotografía principal de la fundación
                </small>
              </div>
            </div>

            <div className="hero-character character-left">
              <Image
                src="/images/amelia.png"
                alt="Amelia, personaje de la Fundación Corazón Valiente"
                width={160}
                height={190}
                className="hero-character-image"
              />
            </div>

            <div className="hero-character character-right">
              <Image
                src="/images/valentin.png"
                alt="Valentín, personaje de la Fundación Corazón Valiente"
                width={160}
                height={190}
                className="hero-character-image"
              />
            </div>
          </div>
        </div>

        <div className="container impact-bar">
          <div>
            <span>👨‍👩‍👧</span>
            <p>
              <strong>Niños y niñas</strong>
              protegidos
            </p>
          </div>

          <div>
            <span>♡</span>
            <p>
              <strong>Familias</strong>
              acompañadas
            </p>
          </div>

          <div>
            <span>🤲</span>
            <p>
              <strong>Voluntarios</strong>
              comprometidos
            </p>
          </div>

          <div>
            <span>✨</span>
            <p>
              <strong>Comunidades</strong>
              transformadas
            </p>
          </div>
        </div>
      </section>

      <section id="nosotros" className="section about-section">
        <div className="container about-grid">
          <div className="about-logo-card">
            <Image
              src="/images/logo.png"
              alt="Fundación Corazón Valiente"
              width={280}
              height={200}
              className="about-logo-image"
            />
          </div>

          <div className="about-content">
            <span className="section-kicker">Nuestra esencia</span>
            <h2>¿Quiénes somos?</h2>

            <p>
              En Fundación Corazón Valiente creemos que una sola persona puede
              cambiar la vida de otra. Trabajamos para brindar apoyo emocional,
              social, educativo y comunitario a quienes más lo necesitan.
            </p>

            <p>
              Promovemos entornos seguros, amorosos y llenos de oportunidades
              para niños, familias y comunidades.
            </p>

            <a href="#programas" className="button button-outline">
              Nuestra historia
            </a>
          </div>

          <div className="about-video">
            <div className="video-placeholder">
              <button aria-label="Reproducir video">▶</button>
              <span>Conoce nuestra labor</span>
            </div>
          </div>
        </div>
      </section>

      <section id="programas" className="section programs-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">Nuestro propósito</span>
            <h2>¿Qué hacemos?</h2>
            <p>
              Desarrollamos iniciativas que fortalecen a las personas y sus
              comunidades.
            </p>
          </div>

          <div className="program-grid">
            {programas.map((programa) => (
              <article className={programa.clase} key={programa.titulo}>
                <span className="program-icon">{programa.icono}</span>
                <h3>{programa.titulo}</h3>
                <p>{programa.texto}</p>
                <a href="#contacto">Saber más</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section characters-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">Nuestra identidad</span>
            <h2>Conoce nuestros personajes</h2>
          </div>

          <div className="characters-grid">
            <article className="character-card">
              <div className="character-illustration">
                <Image
                  src="/images/valentin.png"
                  alt="Valentín, el león más valiente"
                  width={210}
                  height={250}
                  className="character-real-image"
                />
              </div>

              <div>
                <span className="character-name">Valentín</span>
                <h3>El león más valiente</h3>
                <p>
                  Representa el valor, la fuerza y la protección de cada niño y
                  niña.
                </p>
              </div>
            </article>

            <div className="characters-heart">♡</div>

            <article className="character-card character-reverse">
              <div className="character-illustration">
                <Image
                  src="/images/amelia.png"
                  alt="Amelia, personaje de la esperanza"
                  width={210}
                  height={250}
                  className="character-real-image"
                />
              </div>

              <div>
                <span className="character-name">Amelia</span>
                <h3>La luciérnaga de la esperanza</h3>
                <p>
                  Representa la alegría, la empatía y la esperanza de construir
                  un mañana mejor.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="eventos" className="section actions-section">
        <div className="container action-grid">
          {acciones.map((accion) => (
            <article className={`action-card ${accion.clase}`} key={accion.titulo}>
              <span className="action-icon">{accion.icono}</span>
              <h3>{accion.titulo}</h3>
              <p>{accion.texto}</p>

              <Link href={accion.enlace}>
                {accion.boton}
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="section eventos-reales">

        <div className="container">


          <div className="section-heading">

            <span className="section-kicker">
              Próximas actividades
            </span>

            <h2>
              Nuestros eventos
            </h2>

            <p>
              Conoce las actividades y espacios donde puedes participar.
            </p>

          </div>

          <div className="eventos-grid">

            {
              eventos && eventos.length > 0 ? (

                eventos.map((evento) => (


                  <article

                    key={evento.id}

                    className="evento-card"

                  >


                    <div className="evento-image-container">


                      {

                        evento.imagen ? (

                          <Image
                            src={evento.imagen}
                            alt={evento.titulo}
                            width={600}
                            height={400}
                            className="evento-image"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />

                        )

                          :

                          (

                            <div className="photo-placeholder">

                              <span>
                                ❤️
                              </span>

                            </div>

                          )

                      }


                    </div>





                    <div className="evento-content">



                      <span className="evento-date">

                        <span className="icon-date"></span>


                        {new Date(evento.fecha)
                          .toLocaleDateString("es-CO")}


                      </span>





                      <h3>

                        {evento.titulo}

                      </h3>





                      <p>

                        {evento.descripcion}

                      </p>





                      <div className="evento-location">


                        <span className="icon-location"></span>


                        {evento.lugar || "Lugar por confirmar"}


                      </div>





                      <Link

                        href="/eventos"

                        className="evento-button"

                      >

                        Conocer evento

                      </Link>



                    </div>



                  </article>



                ))

              )

                :

                (

                  <div className="evento-vacio">

                    <h3>
                      Próximamente tendremos nuevos eventos
                    </h3>

                    <p>
                      Estamos preparando actividades para compartir con nuestra comunidad.
                    </p>

                  </div>

                )

            }


          </div>




        </div>

      </section>

      <section id="donar" className="donation-section">
        <div className="container donation-grid">
          <div>
            <span className="section-kicker section-kicker-light">
              Tu ayuda importa
            </span>

            <h2>Juntos podemos transformar más vidas</h2>

            <p>
              Cada aporte permite desarrollar actividades educativas,
              comunitarias, recreativas y de acompañamiento para quienes más lo
              necesitan.
            </p>
          </div>

          <div className="donation-box">
            <h3>Quiero realizar una donación</h3>

            <p>
              Próximamente habilitaremos pagos en línea. Mientras tanto, puedes
              comunicarte con nuestro equipo.
            </p>

            <Link
              href="/dona"
              className="button button-light"
            >
              Realizar donación
            </Link>

            <a
              href="https://wa.me/573118449229"
              target="_blank"
              rel="noreferrer"
              className="button button-light"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section id="voluntariado" className="section volunteer-section">
        <div className="container volunteer-grid">
          <div>
            <span className="section-kicker">Súmate al cambio</span>
            <h2>Haz parte de nuestro equipo de voluntarios</h2>

            <p>
              Comparte tu tiempo, conocimientos y talento para construir
              oportunidades junto a nuestras comunidades.
            </p>
          </div>

          <VolunteerForm />
        </div>
      </section>

      <footer id="contacto" className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="footer-brand">
              <Image
                src="/images/logo.png"
                alt="Logo Fundación Corazón Valiente"
                width={210}
                height={120}
                className="footer-logo"
              />
            </div>

            <p>
              Un corazón valiente es el que cree que su historia puede cambiar.
            </p>
          </div>

          <div>
            <h3>Síguenos</h3>

            <div className="social-links">
              <a href="https://www.instagram.com/fundacioncorazonvaliente?igsh=a2VzemdnN2FvNjQy" aria-label="Instagram">
                IG
              </a>
              <a href="https://www.facebook.com/profile.php?id=61592853252677" aria-label="Facebook">
                FB
              </a>
              <a href="https://www.tiktok.com/@fundacin.corazn.v?_r=1&_t=ZS-98RcLqbpZOj" aria-label="tiktok">

                TK
              </a>
             
            </div>

            <p>@fundacioncorazonvaliente</p>
          </div>

          <div>
            <h3>Información institucional</h3>
            <p><strong>Fundación Corazón Valiente Colombia</strong></p>
            <p>NIT: 902.061.743</p>
            <p>📞 3118449229 </p>
            <p>✉️ fundacioncorazonvalienteco@gmail.com</p>
            <p>📍 Bogotá D.C./ Boyacá, Colombia</p>
          </div>


        </div>

        <div className="container footer-bottom">
          <p>
            © {new Date().getFullYear()} Fundación Corazón Valiente Colombia.
            NIT 902.061.743. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}