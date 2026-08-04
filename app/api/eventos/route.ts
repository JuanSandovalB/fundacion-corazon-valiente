import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verificarAdministrador } from "@/lib/auth";



// ===============================
// CREAR EVENTO
// ===============================

export async function POST(request:Request){


const autorizado = await verificarAdministrador();


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



const body = await request.json();



const {data,error}=await supabaseAdmin

.from("eventos")

.insert({

titulo:body.titulo,

descripcion:body.descripcion,

fecha:body.fecha,

hora:body.hora,

lugar:body.lugar,

imagen:body.imagen,

estado:"activo"

})

.select();



if(error){

console.error(error);

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





// ===============================
// EDITAR EVENTO
// ===============================


export async function PUT(request:Request){


const autorizado = await verificarAdministrador();


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



const body = await request.json();



const {data,error}=await supabaseAdmin

.from("eventos")

.update({

titulo:body.titulo,

descripcion:body.descripcion,

fecha:body.fecha,

hora:body.hora,

lugar:body.lugar,

imagen:body.imagen,

estado:body.estado

})

.eq(

"id",

body.id

)

.select();



if(error){

console.error(error);


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





// ===============================
// ELIMINAR EVENTO
// ===============================


export async function DELETE(request:Request){


const autorizado = await verificarAdministrador();



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



const {error}=await supabaseAdmin

.from("eventos")

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