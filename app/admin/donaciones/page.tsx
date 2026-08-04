import { redirect } from "next/navigation";
import { verificarAdministrador } from "@/lib/auth";
import { createClientServer } from "@/lib/supabaseServer";
import DonacionesPanel from "./DonacionesPanel";


export default async function DonacionesPage(){


const autorizado =
await verificarAdministrador();



if(!autorizado){

redirect("/login");

}



const supabase =
await createClientServer();



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