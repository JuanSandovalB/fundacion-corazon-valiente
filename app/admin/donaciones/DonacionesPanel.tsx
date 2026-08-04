"use client";

import { useState } from "react";
import * as XLSX from "xlsx";


type Donacion = {

id:string;

nombre_donante:string;

correo:string;

telefono:string;

tipo:string;

valor:number;

descripcion:string | null;

estado:string;

created_at:string;

};



type Props = {

donacionesIniciales:Donacion[];

};



export default function DonacionesPanel({

donacionesIniciales

}:Props){



const [donaciones,setDonaciones]=useState<Donacion[]>(

donacionesIniciales

);



const [busqueda,setBusqueda]=useState("");

const [filtroEstado,setFiltroEstado]=useState("todos");

const [seleccionado,setSeleccionado]=useState<Donacion|null>(null);





async function guardarCambios(){


if(!seleccionado)return;



const respuesta = await fetch(

"/api/donaciones",

{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

id:seleccionado.id,

estado:seleccionado.estado

})

}

);



if(!respuesta.ok){

alert("Error actualizando");

return;

}



alert("Cambios guardados");



setDonaciones(

donaciones.map(item=>

item.id===seleccionado.id

?

seleccionado

:

item

)

);



setSeleccionado(null);


}






async function eliminarDonacion(id:string){



const confirmar =
confirm(
"¿Está seguro de eliminar esta donación?"
);



if(!confirmar)return;



const respuesta =
await fetch(

"/api/donaciones",

{

method:"DELETE",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

id

})

}

);



if(!respuesta.ok){

alert("No se pudo eliminar");

return;

}



setDonaciones(

donaciones.filter(item=>item.id!==id)

);



alert("Donación eliminada");


}








function exportarExcel(){


const datos =
donaciones.map(item=>({

Donante:item.nombre_donante,

Correo:item.correo,

Telefono:item.telefono,

Tipo:item.tipo,

Valor:item.valor,

Estado:item.estado,

Descripcion:item.descripcion || "",

Fecha:

new Date(item.created_at)

.toLocaleDateString("es-CO")


}));



const hoja =
XLSX.utils.json_to_sheet(datos);



const libro =
XLSX.utils.book_new();



XLSX.utils.book_append_sheet(

libro,

hoja,

"Donaciones"

);



XLSX.writeFile(

libro,

"Donaciones_Corazon_Valiente.xlsx"

);



}






const donacionesFiltradas =
donaciones.filter(item=>{


const texto =

item.nombre_donante

.toLowerCase()

.includes(

busqueda.toLowerCase()

)

||

item.correo

.toLowerCase()

.includes(

busqueda.toLowerCase()

);



const estado =

filtroEstado==="todos"

||

item.estado===filtroEstado;



return texto && estado;


});






return(

<main className="admin-container">



<section className="dashboard-card">


<h1>

Gestión de Donaciones

</h1>



<div className="admin-filtros">



<button

className="export-button"

onClick={exportarExcel}

>

📥 Descargar Excel

</button>




<input

placeholder="Buscar por nombre o correo..."

value={busqueda}

onChange={e=>setBusqueda(e.target.value)}

/>





<select

value={filtroEstado}

onChange={e=>setFiltroEstado(e.target.value)}

>


<option value="todos">

Todos

</option>


<option value="pendiente">

Pendiente

</option>


<option value="confirmada">

Confirmada

</option>


<option value="rechazada">

Rechazada

</option>


</select>



</div>







<table>


<thead>

<tr>

<th>
Donante
</th>

<th>
Correo
</th>

<th>
Tipo
</th>

<th>
Valor
</th>

<th>
Estado
</th>

<th>
Acción
</th>

</tr>

</thead>




<tbody>


{

donacionesFiltradas.map(item=>(


<tr key={item.id}>


<td>

{item.nombre_donante}

</td>



<td>

{item.correo}

</td>



<td>

{item.tipo}

</td>



<td>

$

{item.valor}

</td>




<td>


<span

className={`status ${
item.estado==="pendiente"

?

"status-pendiente"

:

item.estado==="confirmada"

?

"status-aprobado"

:

"status-cerrado"

}`}

>

{item.estado}

</span>


</td>




<td>


<button

className="admin-action"

onClick={()=>setSeleccionado(item)}

>

Gestionar

</button>



</td>


</tr>


))


}


</tbody>


</table>


</section>








{

seleccionado && (


<div className="modal">


<div className="modal-content">

<div className="modal-header">

<h2>
Gestionar donación
</h2>

<p>
Administra la información del aporte recibido.
</p>

</div>



<div className="info-box">

<span>
Donante
</span>

<strong>
{seleccionado.nombre_donante}
</strong>

</div>



<div className="info-box">

<span>
Correo electrónico
</span>

<strong>
{seleccionado.correo}
</strong>

</div>



<div className="info-box">

<span>
Teléfono
</span>

<strong>
{seleccionado.telefono}
</strong>

</div>



<div className="info-box">

<span>
Tipo de donación
</span>

<strong>
{seleccionado.tipo}
</strong>

</div>



<div className="info-box">

<span>
Valor del aporte
</span>

<strong>
${Number(seleccionado.valor).toLocaleString("es-CO")}
</strong>

</div>



<div className="info-box">

<span>
Descripción
</span>

<strong>
{seleccionado.descripcion || "Sin descripción"}
</strong>

</div>




<label>

Estado

</label>



<select

value={seleccionado.estado}

onChange={e=>

setSeleccionado({

...seleccionado,

estado:e.target.value

})

}

>


<option value="pendiente">

Pendiente

</option>


<option value="confirmada">

Confirmada

</option>


<option value="rechazada">

Rechazada

</option>


</select>





<button

className="modal-primary"

onClick={guardarCambios}

>

Guardar cambios

</button>



<button

className="modal-secondary"

onClick={()=>setSeleccionado(null)}

>

Cancelar

</button>


<button

className="modal-delete"

onClick={()=>{

eliminarDonacion(seleccionado.id);

setSeleccionado(null);

}}

>

Eliminar donación

</button>



</div>


</div>


)


}




</main>


)


}