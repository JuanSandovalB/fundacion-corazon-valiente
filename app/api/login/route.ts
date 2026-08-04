import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";


export async function POST(request:Request){


try{


const body = await request.json();


const correo = body.correo;

const password = body.password;



console.log("CORREO RECIBIDO:", correo);




// Buscar administrador

const {data,error}=await supabaseAdmin

.from("administradores")

.select("*")

.eq("email",correo)

.single();



console.log("ADMIN ENCONTRADO:",data);

console.log("ERROR SUPABASE:",error);





if(error || !data){


return NextResponse.json(

{
error:"Usuario no encontrado"
},

{
status:401
}

);


}





if(!data.activo){


return NextResponse.json(

{
error:"Usuario inactivo"
},

{
status:401
}

);


}





// Validar contraseña

const passwordCorrecta = await bcrypt.compare(

password,

data.password

);





if(!passwordCorrecta){


return NextResponse.json(

{
error:"Contraseña incorrecta"
},

{
status:401
}

);


}





// Crear sesión

const cookieStore = await cookies();



cookieStore.set(

"admin_session",

data.id,

{

httpOnly:true,

secure:false,

sameSite:"lax",

maxAge:60*60*8

}

);





return NextResponse.json({

success:true

});




}catch(error){


console.error(error);



return NextResponse.json(

{
error:"Error interno del servidor"
},

{
status:500
}

);


}


}