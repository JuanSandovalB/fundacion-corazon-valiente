"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function LoginPage(){


const router = useRouter();


const [correo,setCorreo]=useState("");

const [password,setPassword]=useState("");

const [error,setError]=useState("");

const [cargando,setCargando]=useState(false);



async function ingresar(e:React.FormEvent){


e.preventDefault();


setError("");

setCargando(true);



const respuesta = await fetch(

"/api/login",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

correo,

password

})

}

);



const resultado = await respuesta.json();



if(!respuesta.ok){

setError(

resultado.error || "Datos incorrectos"

);

setCargando(false);

return;

}



router.push("/admin");



}



return(


<main className="login-page">


<div className="login-card">


<img

src="/images/logo.png"

alt="Fundación Corazón Valiente"

className="login-logo"

/>



<h1>

Bienvenido

</h1>


<p>

Ingresa al panel administrativo

</p>




<form onSubmit={ingresar}>


<label>

Correo electrónico

</label>


<input

type="email"

placeholder="Correo"

value={correo}

onChange={e=>setCorreo(e.target.value)}

required

/>





<label>

Contraseña

</label>


<input

type="password"

placeholder="Contraseña"

value={password}

onChange={e=>setPassword(e.target.value)}

required

/>





{
error && (

<p className="login-error">

{error}

</p>

)

}





<button

type="submit"

className="login-button"

disabled={cargando}

>

{

cargando

?

"Ingresando..."

:

"Ingresar"

}

</button>
<Link 
href="/"
className="login-back"
>
← Volver al inicio
</Link>



</form>


</div>


</main>


)


}