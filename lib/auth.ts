import { createClientServer } from "./supabaseServer";


export async function verificarAdministrador(){


const supabase = await createClientServer();


const {
data:{
user
}

}=await supabase.auth.getUser();



console.log("USUARIO ACTUAL:", user);



if(!user){

console.log("NO HAY USUARIO");

return false;

}



const {data,error}=await supabase

.from("administradores")

.select("*")

.eq(
"email",
user.email
)

.eq(
"activo",
true
)

.single();

console.log("ADMIN ENCONTRADO:", data);

console.log("ERROR ADMIN:", error);



if(error || !data){

return false;

}



return true;


}