import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verificarAdministrador } from "@/lib/auth";

import {
  obtenerIP,
  verificarRateLimitVoluntariado,
  registrarSolicitudVoluntariado,
} from "@/lib/rateLimit";


// ===============================
// CREAR SOLICITUD VOLUNTARIADO
// PÚBLICO
// ===============================
// ===============================
// CREAR SOLICITUD VOLUNTARIADO
// PÚBLICO
// ===============================

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ===============================
    // HONEYPOT ANTISPAM
    // ===============================

    if (body.website) {
      return NextResponse.json(
        {
          success: true,
          message:
            "¡Gracias por registrarte! Tu solicitud de voluntariado fue enviada correctamente.",
        },
        {
          status: 200,
        }
      );
    }

    // ===============================
    // RATE LIMIT
    // ===============================

    const ip = obtenerIP(request);

    const rateLimit =
      await verificarRateLimitVoluntariado(ip);

    if (!rateLimit.permitido) {
      return NextResponse.json(
        {
          error:
            "Se han enviado varias solicitudes recientemente. Intenta nuevamente más tarde.",
        },
        {
          status: 429,
        }
      );
    }

    // ===============================
    // LEER Y LIMPIAR DATOS
    // ===============================

    const nombre =
      body.nombre?.trim();

    const correo =
      body.correo
        ?.trim()
        .toLowerCase();

    const telefono =
      body.telefono?.trim();

    const estudios =
      body.estudios?.trim();

    const area_conocimiento =
      body.area_conocimiento?.trim();
    const ciudad =
      body.ciudad?.trim();

    const departamento =
      body.departamento?.trim();

    const mensaje =
      body.mensaje?.trim();


    // ===============================
    // VALIDAR CAMPOS OBLIGATORIOS
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
  return NextResponse.json(
    {
      error:
        "Nombre, correo, teléfono, nivel de estudios, área de conocimiento, ciudad y departamento son obligatorios",
    },
    {
      status: 400,
    }
  );
}



    // ===============================
    // VALIDAR NIVEL DE ESTUDIOS
    // ===============================

    const estudiosPermitidos = [
      "Bachillerato",
      "Técnico",
      "Tecnólogo",
      "Profesional",
    ];

    if (
      !estudiosPermitidos.includes(
        estudios
      )
    ) {
      return NextResponse.json(
        {
          error:
            "El nivel de estudios seleccionado no es válido",
        },
        {
          status: 400,
        }
      );
    }


    // ===============================
    // VALIDAR CORREO
    // ===============================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(correo)) {
      return NextResponse.json(
        {
          error:
            "El correo electrónico no es válido",
        },
        {
          status: 400,
        }
      );
    }


    // ===============================
    // VALIDAR LONGITUDES
    // ===============================

    if (nombre.length > 120) {
      return NextResponse.json(
        {
          error:
            "El nombre es demasiado largo",
        },
        {
          status: 400,
        }
      );
    }

    if (correo.length > 180) {
      return NextResponse.json(
        {
          error:
            "El correo es demasiado largo",
        },
        {
          status: 400,
        }
      );
    }

    if (telefono.length > 30) {
      return NextResponse.json(
        {
          error:
            "El teléfono es demasiado largo",
        },
        {
          status: 400,
        }
      );
    }

    if (
      area_conocimiento.length > 150
    ) {
      return NextResponse.json(
        {
          error:
            "El área de conocimiento es demasiado larga",
        },
        {
          status: 400,
        }
      );
    }
    if (ciudad.length > 100) {
  return NextResponse.json(
    {
      error: "La ciudad es demasiado larga",
    },
    {
      status: 400,
    }
  );
}

if (departamento.length > 100) {
  return NextResponse.json(
    {
      error: "El departamento es demasiado largo",
    },
    {
      status: 400,
    }
  );
}

    if (
      area_conocimiento.length < 2
    ) {
      return NextResponse.json(
        {
          error:
            "El área de conocimiento no es válida",
        },
        {
          status: 400,
        }
      );
    }

    if (
      mensaje &&
      mensaje.length > 1500
    ) {
      return NextResponse.json(
        {
          error:
            "El mensaje es demasiado largo",
        },
        {
          status: 400,
        }
      );
    }


    // ===============================
    // GUARDAR VOLUNTARIO
    // ===============================

    const { data, error } =
      await supabaseAdmin
        .from("voluntarios")
        .insert({
          nombre,
          correo,
          telefono,

          estudios,
          area_conocimiento,
          ciudad,
  departamento,

          mensaje:
            mensaje || null,

          estado:
            "pendiente",
        })
        .select(
          `
          id,
          nombre,
          estudios,
          area_conocimiento,
          ciudad,
          departamento,
          estado
          `
        )
        .single();


    if (error) {
      console.error(
        "Error registrando voluntario:",
        error
      );

      return NextResponse.json(
        {
          error:
            "No fue posible enviar la solicitud de voluntariado",
        },
        {
          status: 500,
        }
      );
    }


    // ===============================
    // REGISTRAR SOLICITUD RATE LIMIT
    // ===============================

    await registrarSolicitudVoluntariado(
      ip
    );


    // ===============================
    // RESPUESTA
    // ===============================

    return NextResponse.json(
      {
        success: true,

        message:
          "¡Gracias por registrarte! Tu solicitud de voluntariado fue enviada correctamente.",

        data,
      },
      {
        status: 201,
      }
    );

  } catch (error) {
    console.error(
      "Error en POST voluntarios:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Solicitud inválida",
      },
      {
        status: 400,
      }
    );
  }
}
// ===============================
// ACTUALIZAR VOLUNTARIO
// SOLO ADMIN
// ===============================

export async function PUT(request: Request) {
  const admin =
    await verificarAdministrador();

  if (!admin) {
    return NextResponse.json(
      {
        error: "No autorizado",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const body =
      await request.json();

    if (!body.id) {
      return NextResponse.json(
        {
          error:
            "ID de voluntario requerido",
        },
        {
          status: 400,
        }
      );
    }

    const estadosPermitidos = [
      "pendiente",
      "contactado",
      "aprobado",
      "cerrado",
    ];

    if (
      !body.estado ||
      !estadosPermitidos.includes(
        body.estado
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Estado de voluntario no válido",
        },
        {
          status: 400,
        }
      );
    }

    if (
      body.notas_admin &&
      body.notas_admin.length > 2000
    ) {
      return NextResponse.json(
        {
          error:
            "Las notas administrativas son demasiado largas",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } =
      await supabaseAdmin
        .from("voluntarios")
        .update({
          estado:
            body.estado,

          notas_admin:
            body.notas_admin?.trim() ||
            null,

          fecha_contacto:
            body.fecha_contacto ||
            null,
        })
        .eq(
          "id",
          body.id
        )
        .select();

    if (error) {
      console.error(
        "Error actualizando voluntario:",
        error
      );

      return NextResponse.json(
        {
          error:
            "No fue posible actualizar el voluntario",
        },
        {
          status: 500,
        }
      );
    }

    if (
      !data ||
      data.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Voluntario no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (error) {
    console.error(
      "Error en PUT voluntarios:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Solicitud inválida",
      },
      {
        status: 400,
      }
    );
  }
}


// ===============================
// ELIMINAR VOLUNTARIO
// SOLO ADMIN
// ===============================

export async function DELETE(
  request: Request
) {
  const admin =
    await verificarAdministrador();

  if (!admin) {
    return NextResponse.json(
      {
        error: "No autorizado",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const body =
      await request.json();

    if (!body.id) {
      return NextResponse.json(
        {
          error:
            "ID de voluntario requerido",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } =
      await supabaseAdmin
        .from("voluntarios")
        .delete()
        .eq(
          "id",
          body.id
        )
        .select("id");

    if (error) {
      console.error(
        "Error eliminando voluntario:",
        error
      );

      return NextResponse.json(
        {
          error:
            "No fue posible eliminar el voluntario",
        },
        {
          status: 500,
        }
      );
    }

    if (
      !data ||
      data.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Voluntario no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Voluntario eliminado correctamente",
      },
      {
        status: 200,
      }
    );

  } catch (error) {
    console.error(
      "Error en DELETE voluntarios:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Solicitud inválida",
      },
      {
        status: 400,
      }
    );
  }
}
