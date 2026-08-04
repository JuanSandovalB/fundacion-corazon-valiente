import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { createClientServer } from "@/lib/supabaseServer";
import { verificarAdministrador } from "@/lib/auth";



// =====================================
// CREAR DONACIÓN
// PÚBLICO
// =====================================

export async function POST(request: Request){

try{


const body = await request.json();


console.log(
"INSERTANDO DONACIÓN:",
body
);



const {data,error}=await supabaseAdmin

.from("donaciones")

.insert({

nombre_donante: body.nombre_donante,

correo: body.correo,

telefono: body.telefono,

tipo: body.tipo,

valor: body.valor,

descripcion: body.descripcion,

estado:"pendiente"

})

.select();




if(error){

console.error(
"ERROR DONACIÓN:",
error
);


return NextResponse.json(

{
error:error.message
},

{
status:500
}

);

}




return NextResponse.json(

{

success:true,

message:
"Tu donación fue registrada correctamente. Gracias por apoyar a Fundación Corazón Valiente.",

data

},

{
status:200
}

);



}

catch(error){


console.error(error);


return NextResponse.json(

{
error:"Error interno"
},

{
status:500
}

);


}



}






// =====================================
// CONSULTAR DONACIONES
// ADMIN
// =====================================

export async function GET(){


const autorizado =
await verificarAdministrador();



if(!autorizado){

return NextResponse.json(

{
error:"No autorizado"
},

{
status:401
}

);

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

return NextResponse.json(

{
error:error.message
},

{
status:500
}

);

}




return NextResponse.json(

data

);


}






// =====================================
// ACTUALIZAR DONACIÓN
// ADMIN
// =====================================

export async function PUT(request:Request){



const autorizado =
await verificarAdministrador();



if(!autorizado){

return NextResponse.json(

{
error:"No autorizado"
},

{
status:401
}

);

}



const body =
await request.json();



const supabase =
await createClientServer();




const {data,error}=await supabase

.from("donaciones")

.update({

estado:body.estado

})

.eq(
"id",
body.id
)

.select();





if(error){

return NextResponse.json(

{
error:error.message
},

{
status:500
}

);

}



return NextResponse.json({

success:true,

data

});


}






// =====================================
// ELIMINAR DONACIÓN
// ADMIN
// =====================================

export async function DELETE(request:Request){



const autorizado =
await verificarAdministrador();



if(!autorizado){

return NextResponse.json(

{
error:"No autorizado"
},

{
status:401
}

);

}



const {id}=await request.json();



const supabase =
await createClientServer();




const {error}=await supabase

.from("donaciones")

.delete()

.eq(
"id",
id
);




if(error){

return NextResponse.json(

{
error:error.message
},

{
status:500
}

);

}




return NextResponse.json({

success:true

});


}