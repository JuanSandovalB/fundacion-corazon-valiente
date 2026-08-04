"use client";

import { useState } from "react";

type Evento = {
  id: string;
  titulo: string;
  descripcion: string | null;
  fecha: string;
  hora: string | null;
  lugar: string | null;
  imagen: string | null;
  estado: string;
  created_at: string;
};

type Props = {
  eventosIniciales: Evento[];
};

export default function EventosPanel({ eventosIniciales }: Props) {
  const [eventos, setEventos] = useState<Evento[]>(eventosIniciales);

  const [crear, setCrear] = useState(false);

  const [seleccionado, setSeleccionado] = useState<Evento | null>(null);

  const [imagen, setImagen] = useState<File | null>(null);

  const [imagenEditar, setImagenEditar] = useState<File | null>(null);

  return (
    <main className="admin-container">
      <section className="dashboard-card">
        <h1>Gestión de Eventos</h1>

        <button className="export-button" onClick={() => setCrear(true)}>
          + Crear evento
        </button>

        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha</th>
              <th>Lugar</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {eventos.map((evento) => (
              <tr key={evento.id}>
                <td>{evento.titulo}</td>

                <td>{new Date(evento.fecha).toLocaleDateString("es-CO")}</td>

                <td>{evento.lugar || "Sin definir"}</td>

                <td>
                  <span className="status status-aprobado">
                    {evento.estado}
                  </span>
                </td>

                <td>
                  <button
                    className="admin-action"
                    onClick={() => setSeleccionado(evento)}
                  >
                    Gestionar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {crear && (
        <div className="modal">
          <div className="modal-content">
            <h2>📅 Nuevo evento</h2>

            <input id="titulo" placeholder="Nombre del evento" />

            <input id="fecha" type="date" />

            <input id="hora" placeholder="Hora del evento" />

            <input id="lugar" placeholder="Lugar" />

            <textarea id="descripcion" placeholder="Descripción del evento" />

            <label>Imagen del evento</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImagen(e.target.files?.[0] || null)}
            />

            <button
              className="modal-primary"
              onClick={async () => {
                const titulo = (
                  document.getElementById("titulo") as HTMLInputElement
                ).value;

                const fecha = (
                  document.getElementById("fecha") as HTMLInputElement
                ).value;

                const hora = (
                  document.getElementById("hora") as HTMLInputElement
                ).value;

                const lugar = (
                  document.getElementById("lugar") as HTMLInputElement
                ).value;

                const descripcion = (
                  document.getElementById(
                    "descripcion"
                  ) as HTMLTextAreaElement
                ).value;

                let urlImagen = "";

                if (imagen) {
                  const formData = new FormData();

                  formData.append("file", imagen);

                  const respuestaImagen = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                  });

                  const resultadoImagen = await respuestaImagen.json();

                  urlImagen = resultadoImagen.url;
                }

                const respuesta = await fetch("/api/eventos", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    titulo,
                    fecha,
                    hora,
                    lugar,
                    descripcion,
                    imagen: urlImagen,
                  }),
                });

                if (respuesta.ok) {
                  window.location.reload();
                }
              }}
            >
              Guardar evento
            </button>

            <button className="modal-secondary" onClick={() => setCrear(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {seleccionado && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>📅 Editar evento</h2>
              <p>Actualiza la información del evento.</p>
            </div>

            <label>Título</label>
            <input
              value={seleccionado.titulo}
              onChange={(e) =>
                setSeleccionado({
                  ...seleccionado,
                  titulo: e.target.value,
                })
              }
            />

            <label>Fecha</label>
            <input
              type="date"
              value={seleccionado.fecha}
              onChange={(e) =>
                setSeleccionado({
                  ...seleccionado,
                  fecha: e.target.value,
                })
              }
            />

            <label>Hora</label>
            <input
              value={seleccionado.hora || ""}
              onChange={(e) =>
                setSeleccionado({
                  ...seleccionado,
                  hora: e.target.value,
                })
              }
            />

            <label>Lugar</label>
            <input
              value={seleccionado.lugar || ""}
              onChange={(e) =>
                setSeleccionado({
                  ...seleccionado,
                  lugar: e.target.value,
                })
              }
            />

            <label>Descripción</label>
            <textarea
              value={seleccionado.descripcion || ""}
              onChange={(e) =>
                setSeleccionado({
                  ...seleccionado,
                  descripcion: e.target.value,
                })
              }
            />

            <label>Imagen actual</label>
            <div className="imagen-preview">
              {seleccionado.imagen && (
                <img src={seleccionado.imagen} alt="Evento" />
              )}
            </div>

            <label>Cambiar imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImagenEditar(e.target.files?.[0] || null)
              }
            />

            <label>Estado</label>
            <select
              value={seleccionado.estado}
              onChange={(e) =>
                setSeleccionado({
                  ...seleccionado,
                  estado: e.target.value,
                })
              }
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>

            <button
              className="modal-primary"
              onClick={async () => {
                let imagenFinal = seleccionado.imagen;

                if (imagenEditar) {
                  const formData = new FormData();

                  formData.append("file", imagenEditar);

                  const respuestaImagen = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                  });

                  const resultadoImagen = await respuestaImagen.json();

                  imagenFinal = resultadoImagen.url;
                }

                const respuesta = await fetch("/api/eventos", {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: seleccionado.id,
                    titulo: seleccionado.titulo,
                    descripcion: seleccionado.descripcion,
                    fecha: seleccionado.fecha,
                    hora: seleccionado.hora,
                    lugar: seleccionado.lugar,
                    imagen: imagenFinal,
                    estado: seleccionado.estado,
                  }),
                });

                if (respuesta.ok) {
                  setEventos(
                    eventos.map((item) =>
                      item.id === seleccionado.id
                        ? {
                            ...seleccionado,
                            imagen: imagenFinal,
                          }
                        : item
                    )
                  );

                  setSeleccionado(null);
                  setImagenEditar(null);
                }
              }}
            >
              Guardar cambios
            </button>

            <button
              className="modal-secondary"
              onClick={() => {
                setSeleccionado(null);
                setImagenEditar(null);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
