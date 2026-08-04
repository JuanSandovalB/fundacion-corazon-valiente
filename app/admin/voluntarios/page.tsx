import { verificarAdministrador } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createClientServer } from "@/lib/supabaseServer";
import VoluntariosPanel from "./VoluntariosPanel";


export default async function VoluntariosPage(){


const autorizado = await verificarAdministrador();


if(!autorizado){

redirect("/login");

}



const supabase = await createClientServer();



const {data,error}=await supabase

.from("voluntarios")

.select("*")

.order(
"created_at",
{
ascending:false
}
);



if(error){

console.error(
"ERROR CARGANDO VOLUNTARIOS:",
error
);

}



return (

<VoluntariosPanel

voluntariosIniciales={data || []}

/>

);


}