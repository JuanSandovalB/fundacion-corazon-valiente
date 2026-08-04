import Image from "next/image";
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
              <a href="https://www.facebook.com/fundacioncorazonvaliente" aria-label="Facebook">
                FB
              </a>
              <a href="https://www.tiktok.com/@fundacin.corazn.v?_r=1&_t=ZS-98RcLqbpZOj" aria-label="tiktok">

                TK
              </a>
              <a href="https://www.youtube.com/@fundacioncorazonvaliente" aria-label="YouTube">
                YT
              </a>
            </div>

            <p>@fundacioncorazonvaliente</p>
          </div>

          <div>
            <h3>Información institucional</h3>
            <p><strong>Fundación Corazón Valiente Colombia</strong></p>
            <p>NIT: 902.061.743</p>
            <p>📞 310 2576909 </p>
            <p>✉️ johadamian@gmail.com</p>
            <p>📍 Bogotá D.C., Colombia</p>
          </div>

          <div>
            <h3>Newsletter</h3>
            <p>Recibe nuestras noticias, eventos y actividades.</p>

            <form className="newsletter-form">
              <input type="email" placeholder="Tu correo electrónico" />
              <button type="submit" aria-label="Suscribirme">
                ➤
              </button>
            </form>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>
            © {new Date().getFullYear()} Fundación Corazón Valiente Colombia.
            NIT 902.061.743. Todos los derechos reservados.
          </p>
        </div>
      </footer>
   