
import EventosPanel from "../../components/EventosPanel";
import { supabaseAdmin } from "@/lib/supabaseAdmin";


async function obtenerEventos(){

const {data,error}=await supabaseAdmin
.from("eventos")
.select("*")
.order("created_at",{ascending:false});


if(error){

console.error(error);

return [];

}


return data || [];

}



export default async function EventosAdminPage(){


const eventos = await obtenerEventos();



return(

<EventosPanel

eventosIniciales={eventos}

/>

);


}