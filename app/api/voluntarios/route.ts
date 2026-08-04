import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { createClientServer } from "@/lib/supabaseServer";
import { verificarAdministrador } from "@/lib/auth";



// ===============================
// CREAR SOLICITUD VOLUNTARIADO
// PÚBLICO
// ===============================

export async function POST(request: Request) {

  try {

    const body = await request.json();


    console.log(
      "INSERTANDO VOLUNTARIO:",
      body
    );


    const {data,error}=await supabaseAdmin
      .from("voluntarios")
      .insert({

        nombre: body.nombre,

        correo: body.correo,

        telefono: body.telefono,

        mensaje: body.mensaje,

        estado: "pendiente"

      })
      .select();


    if(error){

      console.error(
        "ERROR INSERT:",
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
message:"¡Gracias por registrarte! Tu solicitud de voluntariado fue enviada correctamente.",
data
},
{
status:200
}
);


  } catch(error){


    console.error(
      "ERROR GENERAL:",
      error
    );


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




// ===============================
// ACTUALIZAR VOLUNTARIO
// SOLO ADMIN
// ===============================

export async function PUT(request: Request){


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



  const supabase = await createClientServer();

const { data: rol } = await supabase.rpc(
  "test_role"
);

console.log(
  "ROL DESDE API:",
  rol
);

  const {data,error}= await supabase

    .from("voluntarios")

    .update({

      estado: body.estado,

      notas_admin: body.notas_admin,

      fecha_contacto: body.fecha_contacto

    })

    .eq(
      "id",
      body.id
    )

    .select();



  if(error){

    console.error(
      "ERROR UPDATE:",
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



  return NextResponse.json({

    success:true,

    data

  });


}
// ===============================
// ELIMINAR VOLUNTARIO
// SOLO ADMIN
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



const body = await request.json();



const {error}=await supabaseAdmin

.from("voluntarios")

.delete()

.eq(
"id",
body.id
);



if(error){

console.error(
"ERROR DELETE:",
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



return NextResponse.json({

success:true

});


}

