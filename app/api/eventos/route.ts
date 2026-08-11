import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verificarAdministrador } from "@/lib/auth";


// ===============================
// CREAR EVENTO
// ===============================

export async function POST(request: Request) {
  const admin = await verificarAdministrador();

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
    const body = await request.json();

    if (
      !body.titulo ||
      !body.descripcion ||
      !body.fecha ||
      !body.lugar
    ) {
      return NextResponse.json(
        {
          error: "Faltan campos obligatorios",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("eventos")
      .insert({
        titulo: body.titulo,
        descripcion: body.descripcion,
        fecha: body.fecha,
        hora: body.hora || null,
        lugar: body.lugar,
        imagen: body.imagen || null,
        estado: "activo",
      })
      .select();

    if (error) {
      console.error("Error creando evento:", error);

      return NextResponse.json(
        {
          error: "No fue posible crear el evento",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (error) {
    console.error("Error en POST eventos:", error);

    return NextResponse.json(
      {
        error: "Solicitud inválida",
      },
      {
        status: 400,
      }
    );
  }
}


// ===============================
// EDITAR EVENTO
// ===============================

export async function PUT(request: Request) {
  const admin = await verificarAdministrador();

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
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        {
          error: "ID de evento requerido",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !body.titulo ||
      !body.descripcion ||
      !body.fecha ||
      !body.lugar
    ) {
      return NextResponse.json(
        {
          error: "Faltan campos obligatorios",
        },
        {
          status: 400,
        }
      );
    }

    const estadosPermitidos = ["activo", "inactivo"];

    if (
      body.estado &&
      !estadosPermitidos.includes(body.estado)
    ) {
      return NextResponse.json(
        {
          error: "Estado de evento no válido",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("eventos")
      .update({
        titulo: body.titulo,
        descripcion: body.descripcion,
        fecha: body.fecha,
        hora: body.hora || null,
        lugar: body.lugar,
        imagen: body.imagen || null,
        estado: body.estado || "activo",
      })
      .eq("id", body.id)
      .select();

    if (error) {
      console.error("Error actualizando evento:", error);

      return NextResponse.json(
        {
          error: "No fue posible actualizar el evento",
        },
        {
          status: 500,
        }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        {
          error: "Evento no encontrado",
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
    console.error("Error en PUT eventos:", error);

    return NextResponse.json(
      {
        error: "Solicitud inválida",
      },
      {
        status: 400,
      }
    );
  }
}


// ===============================
// ELIMINAR EVENTO
// ===============================

export async function DELETE(request: Request) {
  const admin = await verificarAdministrador();

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
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        {
          error: "ID de evento requerido",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("eventos")
      .delete()
      .eq("id", body.id)
      .select("id");

    if (error) {
      console.error("Error eliminando evento:", error);

      return NextResponse.json(
        {
          error: "No fue posible eliminar el evento",
        },
        {
          status: 500,
        }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        {
          error: "Evento no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error("Error en DELETE eventos:", error);

    return NextResponse.json(
      {
        error: "Solicitud inválida",
      },
      {
        status: 400,
      }
    );
  }
}