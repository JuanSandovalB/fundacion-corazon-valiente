"use client";


import { useState } from "react";
import * as XLSX from "xlsx";


type Voluntario = {
  id: string;
  nombre: string;
  correo: string;
  telefono: string;

  estudios: string | null;
  area_conocimiento: string | null;
  ciudad: string | null;
  departamento: string | null;

  mensaje: string | null;
  estado: string;
  notas_admin: string | null;
  fecha_contacto: string | null;
  created_at: string;
};



type Props = {

  voluntariosIniciales: Voluntario[];

};



export default function VoluntariosPanel({

  voluntariosIniciales

}: Props) {



  const [voluntarios, setVoluntarios] = useState<Voluntario[]>(

    voluntariosIniciales

  );



  const [busqueda, setBusqueda] = useState("");

  const [filtroEstado, setFiltroEstado] = useState("todos");

  const [seleccionado, setSeleccionado] = useState<Voluntario | null>(null);





  // ===============================
  // ACTUALIZAR VOLUNTARIO
  // ===============================


  async function guardarCambios() {


    if (!seleccionado) return;



    const respuesta = await fetch(

      "/api/voluntarios",

      {

        method: "PUT",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify({

          id: seleccionado.id,

          estado: seleccionado.estado,

          notas_admin: seleccionado.notas_admin,

          fecha_contacto:

            seleccionado.estado === "contactado"

              ?

              new Date().toISOString()

              :

              seleccionado.fecha_contacto

        })

      }

    );




    if (!respuesta.ok) {

      alert("Error actualizando");

      return;

    }



    alert("Cambios guardados correctamente");



    setVoluntarios(

      voluntarios.map(item =>

        item.id === seleccionado.id

          ?

          seleccionado

          :

          item

      )

    );



    setSeleccionado(null);



  }





  // ===============================
  // ELIMINAR VOLUNTARIO
  // ===============================


  async function eliminarVoluntario(id: string) {


    const confirmar = window.confirm(

      "¿Está seguro de eliminar este voluntario?"

    );



    if (!confirmar) {

      return;

    }



    const respuesta = await fetch(

      "/api/voluntarios",

      {

        method: "DELETE",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify({

          id

        })

      }

    );



    const data = await respuesta.json();



    if (!respuesta.ok) {

      alert(

        data.error || "Error eliminando voluntario"

      );

      return;

    }



    alert(

      "Voluntario eliminado correctamente"

    );



    setVoluntarios(

      voluntarios.filter(

        (item) => item.id !== id

      )

    );



  }







  // ===============================
  // EXPORTAR EXCEL
  // ===============================


  function exportarExcel() {

    const datos = voluntarios.map(item => ({
      Nombre: item.nombre,
      Correo: item.correo,
      Telefono: item.telefono,

      Estudios:
        item.estudios || "",

      Area_conocimiento:
        item.area_conocimiento || "",
      Departamento: item.departamento || "",
      Ciudad: item.ciudad || "",

      Estado: item.estado,

      Mensaje:
        item.mensaje || "",

      Notas:
        item.notas_admin || "",

      Fecha_registro:
        new Date(item.created_at)
          .toLocaleDateString("es-CO"),

      Fecha_contacto:
        item.fecha_contacto
          ? new Date(item.fecha_contacto)
            .toLocaleDateString("es-CO")
          : "",
    }));

    const hoja =
      XLSX.utils.json_to_sheet(datos);

    const libro =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      libro,
      hoja,
      "Voluntarios"
    );

    XLSX.writeFile(
      libro,
      "Voluntarios_Corazon_Valiente.xlsx"
    );
  }







  // ===============================
  // FILTROS
  // ===============================

  const voluntariosFiltrados =
    voluntarios.filter(item => {

      const termino =
        busqueda.toLowerCase();

      const texto =
        item.nombre
          .toLowerCase()
          .includes(termino)

        ||

        item.correo
          .toLowerCase()
          .includes(termino)

        ||

        (item.estudios || "")
          .toLowerCase()
          .includes(termino)

        ||

        (item.area_conocimiento || "")
          .toLowerCase()
          .includes(termino);

      const estado =
        filtroEstado === "todos"
        ||
        item.estado === filtroEstado;

      return texto && estado;
    });







  return (


    <main className="admin-container">



      <section className="dashboard-card">



        <h1>

          Gestión de Voluntarios

        </h1>




        <div className="admin-filtros">



          <button

            className="export-button"

            onClick={exportarExcel}

          >

            📥 Descargar Excel

          </button>




          <input

            placeholder="Buscar por nombre o correo,estudios o área."

            value={busqueda}

            onChange={e => setBusqueda(e.target.value)}

          />




          <select

            value={filtroEstado}

            onChange={e => setFiltroEstado(e.target.value)}

          >


            <option value="todos">

              Todos

            </option>


            <option value="pendiente">

              Pendiente

            </option>


            <option value="contactado">

              Contactado

            </option>


            <option value="aprobado">

              Aprobado

            </option>


            <option value="cerrado">

              Cerrado

            </option>


          </select>



        </div>






        <table>



          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Estudios</th>
              <th>Área de conocimiento</th>
              <th>Ciudad</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>






          <tbody>

            {voluntariosFiltrados.map(item => (

              <tr key={item.id}>

                <td>
                  {item.nombre}
                </td>

                <td>
                  {item.correo}
                </td>

                <td>
                  {item.telefono}
                </td>

                <td>
                  {item.estudios || "No registrado"}
                </td>

                <td>
                  {item.area_conocimiento || "No registrado"}
                </td>
                <td>
                  {item.ciudad || "No registrado"}
                </td>
                <td>

                  <span
                    className={`status ${item.estado === "pendiente"
                      ? "status-pendiente"
                      : item.estado === "contactado"
                        ? "status-contactado"
                        : item.estado === "aprobado"
                          ? "status-aprobado"
                          : "status-cerrado"
                      }`}
                  >
                    {item.estado}
                  </span>

                </td>

                <td>

                  <button
                    className="admin-action"
                    onClick={() =>
                      setSeleccionado(item)
                    }
                  >
                    Gestionar
                  </button>

                  <br />

                  <button
                    className="admin-delete"
                    onClick={() =>
                      eliminarVoluntario(item.id)
                    }
                  >
                    Eliminar
                  </button>

                </td>

              </tr>

            ))}

          </tbody>



        </table>




      </section>






      {


        seleccionado && (



          <div className="modal">



            <div className="modal-content">


              <div className="modal-header">

                <h2>
                  Gestionar solicitud
                </h2>

                <p>
                  Revisa la información del voluntario y actualiza su estado.
                </p>

              </div>



              <div className="info-box">

                <span>
                  Nombre
                </span>

                <strong>
                  {seleccionado.nombre}
                </strong>

              </div>



              <div className="info-box">

                <span>
                  Correo electrónico
                </span>

                <strong>
                  {seleccionado.correo}
                </strong>

              </div>



              <div className="info-box">

                <span>
                  Teléfono
                </span>

                <strong>
                  {seleccionado.telefono}
                </strong>

              </div>
              <div className="info-box">
                <span>Nivel de estudios</span>
                <strong>
                  {seleccionado.estudios || "No registrado"}
                </strong>
              </div>

              <div className="info-box">
                <span>Área de conocimiento</span>
                <strong>
                  {seleccionado.area_conocimiento || "No registrado"}
                </strong>
              </div>

              <div className="info-box">
                <span>Departamento</span>
                <strong>
                  {seleccionado.departamento || "No registrado"}
                </strong>
              </div>

              <div className="info-box">
                <span>Ciudad o municipio</span>
                <strong>
                  {seleccionado.ciudad || "No registrado"}
                </strong>
              </div>
              <div className="info-box">

                <span>
                  Nivel de estudios
                </span>

                <strong>
                  {seleccionado.estudios || "No registrado"}
                </strong>

              </div>


              <div className="info-box">

                <span>
                  Área de conocimiento
                </span>

                <strong>
                  {seleccionado.area_conocimiento || "No registrado"}
                </strong>

              </div>




              <div className="info-box">

                <span>
                  Mensaje del voluntario
                </span>

                <strong>
                  {seleccionado.mensaje || "Sin mensaje"}
                </strong>

              </div>





              <label>

                Estado

              </label>



              <select

                value={seleccionado.estado}

                onChange={e =>

                  setSeleccionado({

                    ...seleccionado,

                    estado: e.target.value

                  })

                }

              >


                <option value="pendiente">

                  Pendiente

                </option>


                <option value="contactado">

                  Contactado

                </option>


                <option value="aprobado">

                  Aprobado

                </option>


                <option value="cerrado">

                  Cerrado

                </option>


              </select>






              <label>

                Notas internas

              </label>




              <textarea

                value={seleccionado.notas_admin || ""}

                onChange={e =>

                  setSeleccionado({

                    ...seleccionado,

                    notas_admin: e.target.value

                  })

                }

              />









              <button

                className="modal-primary"

                onClick={guardarCambios}

              >

                Guardar cambios

              </button>
              <button

                className="modal-secondary"

                onClick={() => setSeleccionado(null)}

              >
                Cancelar
              </button>






            </div>


          </div>



        )



      }





    </main>


  )

}