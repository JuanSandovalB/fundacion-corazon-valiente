export const dynamic = "force-dynamic";
export const revalidate = 0;



import Navbar from "../components/Navbar";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Conoce las actividades, jornadas y espacios de participación de la Fundación Corazón Valiente.",
  alternates: {
    canonical: "/eventos",
  },
  openGraph: {
    title: "Eventos | Fundación Corazón Valiente",
    description:
      "Conoce las actividades y espacios de participación de la Fundación Corazón Valiente.",
    url: "/eventos",
  },
};


async function obtenerEventos(){

const { data, error } = await supabaseAdmin
  .from("eventos")
  .select(
    "id,titulo,descripcion,fecha,hora,lugar,imagen,estado"
  )
  .eq("estado", "activo")
  .order("fecha", {
    ascending: true,
  });


if(error){

console.error("ERROR EVENTOS:",error);

return [];

}


return data || [];

}




export default async function EventosPage(){


const eventos = await obtenerEventos();



return(

<>


<Navbar />



<main className="eventos-page">



<section className="eventos-hero">


<div className="eventos-hero-content">


<span>
PRÓXIMAS ACTIVIDADES
</span>



<h1>
Nuestros eventos
</h1>



<p>
Conoce las actividades, jornadas y espacios de participación junto a la Fundación Corazón Valiente.
</p>


</div>


</section>







<section className="eventos-listado">


<div className="container">



<div className="eventos-grid">



{

eventos.length === 0 ? (


<p>
No hay eventos disponibles actualmente.
</p>


)

:

(

eventos.map((evento)=>(



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
  sizes="(max-width: 768px) 100vw, 50vw"
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


{

new Date(evento.fecha)

.toLocaleDateString(

"es-CO",

{

day:"2-digit",

month:"2-digit",

year:"numeric"

}

)

}



</span>








<h2>

{evento.titulo}

</h2>






<p>

{evento.descripcion}

</p>







<div className="evento-location">


<span className="icon-location"></span>


{

evento.lugar || "Lugar por confirmar"

}


</div>







{

evento.hora && (


<div className="evento-location">


<span className="icon-time"></span>


{evento.hora}


</div>


)


}







<a

href={`https://wa.me/573118449229?text=${encodeURIComponent(
`Hola Fundación Corazón Valiente, quiero participar en el evento "${evento.titulo}". 
Me gustaría recibir más información sobre fecha, lugar y requisitos de participación.`
)}`}

target="_blank"

rel="noopener noreferrer"

className="evento-button"

>

Quiero participar

</a>




</div>





</article>



))


)


}





</div>



</div>



</section>






</main>



</>

)


}