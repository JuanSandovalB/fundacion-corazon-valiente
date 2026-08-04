"use client";

import { FormEvent, useState } from "react";


type FormStatus = "idle" | "sending" | "success" | "error";

export default function VolunteerForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const nombre = String(formData.get("nombre") ?? "").trim();
  const correo = String(formData.get("correo") ?? "")
    .trim()
    .toLowerCase();
  const telefono = String(formData.get("telefono") ?? "").trim();
  const mensaje = String(formData.get("mensaje") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();

  if (!nombre || !correo || !telefono) {
    setStatus("error");
    setMessage("Por favor completa todos los campos obligatorios.");
    return;
  }

  setStatus("sending");
  setMessage("");

  try {
    const response = await fetch("/api/voluntarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        correo,
        telefono,
        mensaje,
        
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "No fue posible registrar la solicitud.",
      );
    }

    setStatus("success");
    setMessage(data.message);
    form.reset();
  } catch (error) {
    console.error("Error enviando la solicitud:", error);

    setStatus("error");
    setMessage(
      error instanceof Error
        ? error.message
        : "No pudimos enviar tu solicitud. Intenta nuevamente.",
    );
  }
}

  return (
    <form className="volunteer-form" onSubmit={handleSubmit}>
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

      

      <label className="privacy-check">
        <input type="checkbox" required />
        <span>
          Autorizo el tratamiento de mis datos para gestionar esta solicitud de
          voluntariado.
        </span>
      </label>

      <button
        type="submit"
        className="button button-primary volunteer-submit"
        disabled={status === "sending"}
      >
        {status === "sending"
          ? "Enviando solicitud..."
          : "Quiero ser voluntario"}
      </button>

      {message && (
        <div
          className={`form-message ${
            status === "success"
              ? "form-message-success"
              : "form-message-error"
          }`}
          role="status"
          aria-live="polite"
        >
          {message}
        </div>
      )}
    </form>
  );
}