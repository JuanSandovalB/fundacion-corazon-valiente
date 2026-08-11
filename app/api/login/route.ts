import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

import { crearSesionFirmada } from "@/lib/session";

import {
  obtenerIP,
  verificarRateLimitLogin,
  registrarIntentoFallido,
  limpiarIntentosLogin,
} from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
    // ===============================
    // OBTENER IP
    // ===============================

    const ip = obtenerIP(request);

    // ===============================
    // VERIFICAR RATE LIMIT
    // ===============================

    const rateLimit = await verificarRateLimitLogin(ip);

    if (!rateLimit.permitido) {
      return NextResponse.json(
        {
          error:
            "Demasiados intentos de inicio de sesión. Espera unos minutos antes de volver a intentar.",
        },
        {
          status: 429,
        }
      );
    }

    // ===============================
    // LEER DATOS DEL LOGIN
    // ===============================

    const body = await request.json();

    const correo = body.correo
      ?.trim()
      .toLowerCase();

    const password = body.password;

    if (!correo || !password) {
      return NextResponse.json(
        {
          error:
            "Correo y contraseña son obligatorios",
        },
        {
          status: 400,
        }
      );
    }

    // ===============================
    // BUSCAR ADMINISTRADOR
    // ===============================

    const { data, error } = await supabaseAdmin
      .from("administradores")
      .select("id,email,password,activo,rol")
      .eq("email", correo)
      .single();

    // Usuario inexistente
    if (error || !data) {
      await registrarIntentoFallido(ip);

      return NextResponse.json(
        {
          error:
            "Correo o contraseña incorrectos",
        },
        {
          status: 401,
        }
      );
    }

    // ===============================
    // VALIDAR USUARIO ACTIVO
    // ===============================

    if (!data.activo) {
      await registrarIntentoFallido(ip);

      return NextResponse.json(
        {
          error:
            "Correo o contraseña incorrectos",
        },
        {
          status: 401,
        }
      );
    }

    // ===============================
    // VALIDAR CONTRASEÑA
    // ===============================

    const passwordCorrecta = await bcrypt.compare(
      password,
      data.password
    );

    if (!passwordCorrecta) {
      await registrarIntentoFallido(ip);

      return NextResponse.json(
        {
          error:
            "Correo o contraseña incorrectos",
        },
        {
          status: 401,
        }
      );
    }

    // ===============================
    // LOGIN CORRECTO
    // ===============================

    await limpiarIntentosLogin(ip);

    const sessionFirmada =
      crearSesionFirmada(String(data.id));

    const cookieStore = await cookies();

    cookieStore.set(
      "admin_session",
      sessionFirmada,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 8,
        path: "/",
      }
    );

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
      }
    );

  } catch (error) {
    console.error(
      "Error en login administrativo:",
      error
    );

    return NextResponse.json(
      {
        error: "Error interno del servidor",
      },
      {
        status: 500,
      }
    );
  }
}