import { supabaseAdmin } from "@/lib/supabaseAdmin";
import Link from "next/link";
import Navbar from "../components/Navbar";


export default async function EventosPage(){


const {data:eventos}=await supabaseAdmin

.from("eventos")

.select("*")

.eq("estado","activo")

.order("fecha",{ascending:true});



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
Conoce nuestras actividades, jornadas y espacios de participación junto a la Fundación Corazón Valiente.
</p>


</div>


</section>




<section className="eventos-listado">


<div className="container">


<div className="eventos-grid">


{
eventos?.map((evento)=>(


<article

key={evento.id}

className="evento-card"

>



{
evento.imagen && (

<div className="evento-image-container">

<img

src={evento.imagen}

alt={evento.titulo}

className="evento-image"

/>

</div>

)

}




<div className="evento-content">


<span className="evento-date">

<span className="icon-date"></span>

{
new Date(evento.fecha)
.toLocaleDateString("es-CO")

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

{evento.lugar}

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

}


</div>


</div>


</section>


</main>


</>

)

}