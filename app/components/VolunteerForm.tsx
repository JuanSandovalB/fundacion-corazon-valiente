"use client";

import { FormEvent, useState } from "react";

type FormStatus =
  | "idle"
  | "sending"
  | "success"
  | "error";

export default function VolunteerForm() {

  const [status, setStatus] =
    useState<FormStatus>("idle");

  const [message, setMessage] =
    useState("");


  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const nombre =
      String(formData.get("nombre") ?? "")
        .trim();

    const correo =
      String(formData.get("correo") ?? "")
        .trim()
        .toLowerCase();

    const telefono =
      String(formData.get("telefono") ?? "")
        .trim();

    const estudios =
      String(formData.get("estudios") ?? "")
        .trim();

    const area_conocimiento =
      String(
        formData.get("area_conocimiento") ?? ""
      ).trim();
    const ciudad =
      String(formData.get("ciudad") ?? "")
        .trim();

    const departamento =
      String(formData.get("departamento") ?? "")
        .trim();


    const mensaje =
      String(formData.get("mensaje") ?? "")
        .trim();

    const website =
      String(formData.get("website") ?? "")
        .trim();


    // ===============================
    // VALIDACIONES
    // ===============================

    if (
      !nombre ||
      !correo ||
      !telefono ||
      !estudios ||
      !area_conocimiento ||
      !ciudad ||
      !departamento
    ) {
      setStatus("error");
      setMessage(
        "Por favor completa todos los campos obligatorios."
      );
      return;
    }

    setStatus("sending");
    setMessage("");


    try {

      const response =
        await fetch(
          "/api/voluntarios",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              nombre,
              correo,
              telefono,
              estudios,
              area_conocimiento,
              ciudad,
              departamento,
              mensaje,
              website,
            }),
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          data.error ||
          "No fue posible registrar la solicitud."
        );

      }


      setStatus("success");

      setMessage(
        data.message ||
        "¡Gracias! Tu solicitud fue enviada correctamente."
      );

      form.reset();


    } catch (error) {

      console.error(
        "Error enviando la solicitud:",
        error
      );


      setStatus("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "No pudimos enviar tu solicitud. Intenta nuevamente."
      );

    }

  }


  return (

    <form
      className="volunteer-form"
      onSubmit={handleSubmit}
    >


      {/* NOMBRE */}

      <label htmlFor="nombre">

        Nombre completo

        <input
          id="nombre"
          type="text"
          name="nombre"
          placeholder="Escribe tu nombre"
          autoComplete="name"
          minLength={3}
          maxLength={100}
          required
        />

      </label>


      {/* CORREO */}

      <label htmlFor="correo">

        Correo electrónico

        <input
          id="correo"
          type="email"
          name="correo"
          placeholder="correo@ejemplo.com"
          autoComplete="email"
          maxLength={150}
          required
        />

      </label>


      {/* TELÉFONO */}

      <label htmlFor="telefono">

        Número de contacto

        <input
          id="telefono"
          type="tel"
          name="telefono"
          placeholder="300 123 4567"
          autoComplete="tel"
          minLength={7}
          maxLength={20}
          required
        />

      </label>


      {/* NIVEL DE ESTUDIOS */}

      <label htmlFor="estudios">

        Nivel de estudios

        <select
          id="estudios"
          name="estudios"
          defaultValue=""
          required
        >

          <option
            value=""
            disabled
          >
            Selecciona tu nivel de estudios
          </option>

          <option value="Bachillerato">
            Bachillerato
          </option>

          <option value="Técnico">
            Técnico
          </option>

          <option value="Tecnólogo">
            Tecnólogo
          </option>

          <option value="Profesional">
            Profesional
          </option>

        </select>

      </label>


      {/* ÁREA DE CONOCIMIENTO */}

      <label htmlFor="area_conocimiento">

        Área de conocimiento

        <input
          id="area_conocimiento"
          type="text"
          name="area_conocimiento"
          placeholder="Ej: Psicología, Derecho, Educación, Sistemas..."
          minLength={2}
          maxLength={150}
          required
        />

      </label>

      <label htmlFor="departamento">
  Departamento

  <input
    id="departamento"
    type="text"
    name="departamento"
    placeholder="Ej: Boyacá, Cundinamarca, Antioquia..."
    minLength={2}
    maxLength={100}
    required
  />
</label>


<label htmlFor="ciudad">
  Ciudad o municipio

  <input
    id="ciudad"
    type="text"
    name="ciudad"
    placeholder="Ej: Bogotá, Sogamoso, Medellín..."
    minLength={2}
    maxLength={100}
    required
  />
</label>


      {/* MENSAJE */}

      <label htmlFor="mensaje">

        ¿Cómo te gustaría ayudar?

        <textarea
          id="mensaje"
          name="mensaje"
          placeholder="Cuéntanos brevemente sobre ti y cómo quieres participar"
          maxLength={600}
          rows={4}
        />

      </label>


      {/* HONEYPOT ANTISPAM */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >

        <label htmlFor="website">
          Sitio web
        </label>

        <input
          id="website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />

      </div>


      {/* AUTORIZACIÓN */}

      <label className="privacy-check">

        <input
          type="checkbox"
          required
        />

        <span>
          Autorizo el tratamiento de mis datos
          para gestionar esta solicitud de
          voluntariado.
        </span>

      </label>


      {/* BOTÓN */}

      <button
        type="submit"
        className="button button-primary volunteer-submit"
        disabled={status === "sending"}
      >

        {
          status === "sending"
            ? "Enviando solicitud..."
            : "Quiero ser voluntario"
        }

      </button>


      {/* RESPUESTA */}

      {
        message && (

          <div
            className={
              `form-message ${status === "success"
                ? "form-message-success"
                : "form-message-error"
              }`
            }
            role="status"
            aria-live="polite"
          >

            {message}

          </div>

        )
      }

    </form>

  );

}