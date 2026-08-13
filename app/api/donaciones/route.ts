import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verificarAdministrador } from "@/lib/auth";


// =====================================
// CREAR DONACIÓN
// PÚBLICO
// =====================================

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const nombre_donante =
      body.nombre_donante?.trim();

    const correo =
      body.correo?.trim().toLowerCase();

    const telefono =
      body.telefono?.trim();

    const tipo =
      body.tipo?.trim();

    const descripcion =
      body.descripcion?.trim();

    const valor =
      Number(body.valor) || 0;

    // Validaciones básicas
    if (!nombre_donante || !tipo) {
      return NextResponse.json(
        {
          error:
            "Nombre del donante y tipo de donación son obligatorios",
        },
        {
          status: 400,
        }
      );
    }

    if (
      correo &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
    ) {
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

    if (valor < 0) {
      return NextResponse.json(
        {
          error:
            "El valor de la donación no puede ser negativo",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("donaciones")
      .insert({
        nombre_donante,
        correo: correo || null,
        telefono: telefono || null,
        tipo,
        valor,
        descripcion: descripcion || null,
        estado: "pendiente",
      })
      .select()
      .single();

    if (error) {
      console.error(
        "ERROR CREANDO DONACIÓN:",
        error
      );

      return NextResponse.json(
        {
          error:
            "No fue posible registrar la donación",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Tu donación fue registrada correctamente. Gracias por apoyar a Fundación Corazón Valiente.",
        data,
      },
      {
        status: 201,
      }
    );

  } catch (error) {
    console.error(
      "ERROR POST DONACIÓN:",
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


// =====================================
// CONSULTAR DONACIONES
// ADMIN
// =====================================

export async function GET() {
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

  const { data, error } =
    await supabaseAdmin
      .from("donaciones")
      .select("*")
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

  if (error) {
    console.error(
      "ERROR CONSULTANDO DONACIONES:",
      error
    );

    return NextResponse.json(
      {
        error:
          "No fue posible consultar las donaciones",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(data);
}


// =====================================
// ACTUALIZAR DONACIÓN
// ADMIN
// =====================================

export async function PUT(
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
            "ID de donación requerido",
        },
        {
          status: 400,
        }
      );
    }

    const estadosPermitidos = [
      "pendiente",
      "confirmada",
      "rechazada",
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
            "Estado de donación no válido",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } =
      await supabaseAdmin
        .from("donaciones")
        .update({
          estado: body.estado,
        })
        .eq(
          "id",
          body.id
        )
        .select();

    if (error) {
      console.error(
        "ERROR ACTUALIZANDO DONACIÓN:",
        error
      );

      return NextResponse.json(
        {
          error:
            "No fue posible actualizar la donación",
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
            "Donación no encontrada",
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
      "ERROR PUT DONACIÓN:",
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


// =====================================
// ELIMINAR DONACIÓN
// ADMIN
// =====================================

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
            "ID de donación requerido",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } =
      await supabaseAdmin
        .from("donaciones")
        .delete()
        .eq(
          "id",
          body.id
        )
        .select("id");

    if (error) {
      console.error(
        "ERROR ELIMINANDO DONACIÓN:",
        error
      );

      return NextResponse.json(
        {
          error:
            "No fue posible eliminar la donación",
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
            "Donación no encontrada",
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
    console.error(
      "ERROR DELETE DONACIÓN:",
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