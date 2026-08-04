import AdminSidebar from "../components/AdminSidebar";
import { verificarAdministrador } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function AdminLayout({

children,

}:{

children:React.ReactNode

}){


const autorizado = await verificarAdministrador();



if(!autorizado){

redirect("/login");

}



return(

<div className="admin-layout">


<AdminSidebar />


<main className="admin-content">

{children}

</main>


</div>

)

}