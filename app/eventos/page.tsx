export const dynamic = "force-dynamic";
export const revalidate = 0;


import Link from "next/link";
import Navbar from "../components/Navbar";
import { supabaseAdmin } from "@/lib/supabaseAdmin";



async function obtenerEventos(){

const {data,error}=await supabaseAdmin

.from("eventos")

.select("*")

.eq("estado","activo")

.order("fecha",{ascending:true});



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


<img

src={evento.imagen}

alt={evento.titulo}

className="evento-image"

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







<Link

href="/voluntariado"

className="evento-button"

>

Quiero participar

</Link>





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