import { cookies } from "next/headers";
import { supabaseAdmin } from "./supabaseAdmin";


export async function verificarAdministrador(){

const cookieStore = await cookies();


const session = cookieStore.get("admin_session");


if(!session){

console.log("NO HAY SESION ADMIN");

return false;

}



const {data,error}=await supabaseAdmin

.from("administradores")

.select("*")

.eq("id",session.value)

.eq("activo",true)

.single();



console.log("ADMIN SESION:",data);



if(error || !data){

return false;

}



return true;


}