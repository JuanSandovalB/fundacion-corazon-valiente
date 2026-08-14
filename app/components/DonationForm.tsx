"use client";


import {useState} from "react";


export default function DonationForm(){


const [mensaje,setMensaje]=useState("");



async function enviar(e:any){

e.preventDefault();


const form=e.currentTarget;


const datos={

nombre_donante:
form.nombre.value,

correo:
form.correo.value,

telefono:
form.telefono.value,

tipo:
form.tipo.value,

valor:
form.valor.value,

descripcion:
form.descripcion.value

};



const respuesta=await fetch(
"/api/donaciones",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(datos)

}

);



const resultado=await respuesta.json();


if(respuesta.ok){

setMensaje(
"Gracias por tu apoyo. Hemos recibido tu solicitud."
);

form.reset();

}else{

setMensaje(
resultado.error || "Error enviando información"
);

}



}



return(

<form

className="donation-form"

onSubmit={enviar}

>


<input

name="nombre"

placeholder="Nombre completo"

required

/>



<input

name="correo"

type="email"

placeholder="Correo electrónico"

/>



<input

name="telefono"

placeholder="Teléfono"

/>




<select name="tipo">


<option value="Dinero">

Donación económica

</option>





<option value="Otro">

Otro tipo de apoyo

</option>


</select>





<input

name="valor"

placeholder="Valor aproximado del aporte"

/>





<textarea

name="descripcion"

placeholder="Cuéntanos cómo deseas apoyar"

/>






<button

type="submit"

>

❤️ Enviar donación

</button>





{
mensaje &&
<p className="donation-message">
{mensaje}
</p>
}



</form>

)

}