import { verificarAdministrador } from "@/lib/auth";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import VoluntariosPanel from "./VoluntariosPanel";


export default async function VoluntariosPage(){


const autorizado = await verificarAdministrador();


if(!autorizado){

redirect("/login");

}



const supabase = await supabaseAdmin;



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