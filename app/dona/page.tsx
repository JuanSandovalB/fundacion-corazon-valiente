import DonationForm from "../components/DonationForm";
import Navbar from "../components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donaciones",
  description:
    "Apoya los programas sociales de la Fundación Corazón Valiente y contribuye al bienestar de niños, familias y comunidades.",
  alternates: {
    canonical: "/donaciones",
  },
  openGraph: {
    title: "Donaciones | Fundación Corazón Valiente",
    description:
      "Con tu apoyo podemos seguir desarrollando programas sociales para niños, familias y comunidades.",
    url: "/donaciones",
  },
};



export default function DonaPage(){

return(

<>

<Navbar />


<main className="donation-page">


<section className="donation-hero">


<div className="donation-intro">


<span>
TU AYUDA IMPORTA ❤️
</span>


<h1>
Haz parte de nuestra misión
</h1>


<p>
Cada aporte nos permite continuar desarrollando programas
sociales, educativos y comunitarios para quienes más lo necesitan.
</p>


</div>



<div className="donation-container">


<DonationForm />


</div>



</section>



<section className="donation-info">


<h2>
Tu aporte genera oportunidades
</h2>


<p>
Actualmente recibimos donaciones económicas y apoyos.
Nuestro equipo se comunicará contigo para acompañar el proceso.
</p>


</section>



</main>



</>

)

}