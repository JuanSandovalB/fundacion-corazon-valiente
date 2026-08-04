import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";


export async function POST(request:Request){


try{


const formData = await request.formData();


const archivo = formData.get("file") as File;



if(!archivo){

return NextResponse.json(
{
error:"No se recibió imagen"
},
{
status:400
}
);

}



const extension =
archivo.name.split(".").pop();



const nombreArchivo =
`${Date.now()}.${extension}`;



const buffer =
Buffer.from(
await archivo.arrayBuffer()
);



const {data,error}=await supabaseAdmin

.storage

.from("eventos")

.upload(

nombreArchivo,

buffer,

{

contentType:archivo.type

}

);



if(error){

console.error(
"ERROR STORAGE:",
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



const url =

supabaseAdmin

.storage

.from("eventos")

.getPublicUrl(

data.path

)

.data.publicUrl;



return NextResponse.json({

url

});



}catch(error){


console.error(error);


return NextResponse.json(
{
error:"Error subiendo imagen"
},
{
status:500
}
);


}


}