import { supabaseAdmin } from "@/lib/supabaseAdmin";


export async function subirImagen(

archivo:File

){


const extension =
archivo.name.split(".").pop();



const nombreArchivo =
`${Date.now()}.${extension}`;



const {data,error}=await supabaseAdmin

.storage

.from("eventos")

.upload(

nombreArchivo,

archivo

);



if(error){

throw error;

}



const url =

supabaseAdmin

.storage

.from("eventos")

.getPublicUrl(

data.path

).data.publicUrl;



return url;


}