import { verificarAdministrador } from "@/lib/auth";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import AdminDashboard from "./AdminDashboard";


export default async function AdminPage(){


const autorizado = await verificarAdministrador();


if(!autorizado){

redirect("/login");

}



const supabase = supabaseAdmin;



const {data,error}=await supabase

.from("voluntarios")

.select("estado");



if(error){

console.error(error);

}



return (

<AdminDashboard

voluntarios={data || []}

/>

);


}