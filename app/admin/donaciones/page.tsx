import { redirect } from "next/navigation";
import { verificarAdministrador } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import DonacionesPanel from "./DonacionesPanel";


export default async function DonacionesPage(){


const autorizado =
await verificarAdministrador();



if(!autorizado){

redirect("/login");

}



const supabase =
await supabaseAdmin;



const {data,error}=await supabase

.from("donaciones")

.select("*")

.order(
"created_at",
{
ascending:false
}
);



if(error){

console.error(error);

}



return (

<DonacionesPanel

donacionesIniciales={data || []}

/>

);


}