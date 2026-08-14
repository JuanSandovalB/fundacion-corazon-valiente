export const dynamic = "force-dynamic";
export const revalidate = 0;
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
} from "react-icons/fa";


import { supabaseAdmin } from "../lib/supabaseAdmin";
import VolunteerForm from "./components/VolunteerForm";


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

            <a href="#eventos">Eventos</a>

            <a href="#donar">Dona</a>
            <a href="#voluntariado">Voluntariado</a>
            <a href="#contacto">Contacto</a>
            <Link href="/cursos">
              Cursos
            </Link>
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
              <Image
                src="/images/imagenP.jpg"
                alt="Fundación Corazón Valiente Colombia"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                className="hero-main-photo"
              />
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
              src="/images/reunion.jpg"
              alt="Logo de la Fundación Corazón Valiente Colombia"
              width={420}
              height={420}
              className="about-logo-image"
            />


          </div>

          <div className="about-content">
            <span className="section-kicker">Nuestra esencia</span>
            <h2>¿Quiénes somos?</h2>

            <p>
              En Fundación Corazón Valiente Colombia creemos en el poder de acompañar, escuchar y tender una mano cuando más se necesita. Trabajamos junto a niños, jóvenes, mujeres, familias y comunidades, creando espacios seguros y desarrollando acciones que promueven el bienestar, la prevención de la violencia, el empoderamiento y nuevas oportunidades.

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

            <video
              className="about-video-player"
              controls
              preload="metadata"
              playsInline
            >
              <source
                src="/videos/fundacion-corazon-valiente.mp4"
                type="video/mp4"
              />

              Tu navegador no puede reproducir este video.
            </video>

          </div>
        </div>
      </section>

      <section id="programas" className="section purpose-section">

        <div className="container">

          <div className="section-heading">

            <span className="section-kicker">
              Nuestro propósito
            </span>

            <h2>
              Lo que nos mueve
            </h2>

            <p>
              Acompañamos con empatía, compromiso y esperanza a quienes
              atraviesan momentos difíciles.
            </p>

          </div>


          <div className="purpose-grid">

            {/* MISIÓN */}

            <article className="purpose-card mission-card">

              <div className="purpose-icon">
                ❤️
              </div>

              <span className="purpose-label">
                Nuestra razón de ser
              </span>

              <h3>
                Misión
              </h3>

              <p>
                En la Fundación Corazón Valiente Colombia trabajamos para que
                ninguna persona tenga que enfrentar sola un momento difícil.
                Acompañamos especialmente a mujeres, niños, jóvenes y familias
                que atraviesan situaciones de vulnerabilidad, violencia o dolor,
                brindándoles orientación, apoyo y espacios seguros donde puedan
                sentirse escuchados, protegidos y valorados.
              </p>

              <p>
                A través de nuestros programas sociales, educativos y de
                sensibilización, buscamos ayudar a las personas a reconocer
                situaciones que vulneran su dignidad, encontrar su propia voz y
                saber que siempre es posible pedir ayuda y encontrar nuevos
                caminos.
              </p>

              <p className="purpose-highlight">
                Creemos en una sociedad más humana, solidaria y consciente,
                donde acompañar también significa transformar vidas.
              </p>

            </article>


            {/* VISIÓN */}

            <article className="purpose-card vision-card">

              <div className="purpose-icon">
                ✨
              </div>

              <span className="purpose-label">
                Hacia dónde vamos
              </span>

              <h3>
                Visión
              </h3>

              <p>
                Para el año 2030, queremos que la Fundación Corazón Valiente
                Colombia sea reconocida en todo el país como una organización
                cercana a las personas y presente cuando más lo necesitan.
              </p>

              <p>
                Soñamos con una Colombia donde ninguna forma de violencia sea
                vista como normal, donde pedir ayuda sea un acto de valentía y
                donde niños, jóvenes, mujeres y familias encuentren espacios
                seguros para ser escuchados, acompañados y orientados.
              </p>

              <p className="purpose-highlight">
                Queremos seguir llegando a más territorios, comunidades y
                hogares, creando conciencia, fortaleciendo capacidades y
                construyendo oportunidades para que cada persona pueda vivir
                con dignidad, esperanza y sin miedo.
              </p>

            </article>

          </div>

        </div>

      </section>



      <section id="eventos" className="section eventos-reales">

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
      <section className="social-section">
        <div className="container">

          <div className="social-heading">
            <span className="social-kicker">
              SÍGUENOS Y HAZ PARTE
            </span>

            <h2>
              Conecta con Corazón Valiente
            </h2>

            <p>
              Conoce nuestras jornadas, historias, actividades y todo
              lo que estamos construyendo junto a nuestras comunidades.
            </p>
          </div>

          <div className="social-grid">

            <a
              href="https://www.instagram.com/fundacioncorazonvaliente?igsh=a2VzemdnN2FvNjQy"
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
            >
              <div className="social-icon instagram-icon">
                <FaInstagram />
              </div>

              <div>
                <span>Síguenos en</span>
                <strong>Instagram</strong>
              </div>

              <span className="social-arrow">→</span>
            </a>


            <a
              href="https://www.facebook.com/share/1HaByPTSH7/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
            >
              <div className="social-icon facebook-icon">
                <FaFacebookF />
              </div>

              <div>
                <span>Encuéntranos en</span>
                <strong>Facebook</strong>
              </div>

              <span className="social-arrow">→</span>
            </a>


            <a
              href="https://www.tiktok.com/@fundacin.corazn.v?_r=1&_t=ZS-98RcLqbpZOj"
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
            >
              <div className="social-icon tiktok-icon">
                <FaTiktok />
              </div>

              <div>
                <span>Síguenos en</span>
                <strong>TikTok</strong>
              </div>

              <span className="social-arrow">→</span>
            </a>

          </div>

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
              <a href="https://www.facebook.com/share/1HaByPTSH7/?mibextid=wwXIfr" aria-label="Facebook">
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