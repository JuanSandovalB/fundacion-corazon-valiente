"use client";


type Props = {

  voluntarios:{
    estado:string;
  }[];

};



export default function AdminDashboard({

  voluntarios

}:Props){



const estadisticas={


total: voluntarios.length,


pendientes: voluntarios.filter(

(item)=>item.estado==="pendiente"

).length,


contactados: voluntarios.filter(

(item)=>item.estado==="contactado"

).length,


aprobados: voluntarios.filter(

(item)=>item.estado==="aprobado"

).length,


cerrados: voluntarios.filter(

(item)=>item.estado==="cerrado"

).length


};





return (

<div className="dashboard-page">


<div className="dashboard-title">

<h1>
Dashboard
</h1>

<p>
Resumen general de voluntariado
</p>

</div>



<div className="dashboard-cards">


<div className="dashboard-box total">
<h3>Total voluntarios</h3>
<strong>{estadisticas.total}</strong>
</div>


<div className="dashboard-box pendiente">
<h3>Pendientes</h3>
<strong>{estadisticas.pendientes}</strong>
</div>


<div className="dashboard-box contactado">
<h3>Contactados</h3>
<strong>{estadisticas.contactados}</strong>
</div>


<div className="dashboard-box aprobado">
<h3>Aprobados</h3>
<strong>{estadisticas.aprobados}</strong>
</div>


<div className="dashboard-box cerrado">
<h3>Cerrados</h3>
<strong>{estadisticas.cerrados}</strong>
</div>


</div>


</div>

)


}