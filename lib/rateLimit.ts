import "server-only";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

const MAX_INTENTOS = 5;
const VENTANA_MINUTOS = 10;

export function obtenerIP(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return "unknown";
}

export async function verificarRateLimitLogin(ip: string) {
  const ahora = new Date();

  const { data, error } = await supabaseAdmin
    .from("intentos_login")
    .select("ip,intentos,ultimo_intento,bloqueado_hasta")
    .eq("ip", ip)
    .maybeSingle();

  if (error) {
    console.error("Error consultando rate limit:", error);

    // Para no bloquear el login por un fallo temporal de la tabla,
    // permitimos continuar.
    return {
      permitido: true,
    };
  }

  if (!data) {
    return {
      permitido: true,
    };
  }

  if (data.bloqueado_hasta) {
    const bloqueadoHasta = new Date(data.bloqueado_hasta);

    if (bloqueadoHasta > ahora) {
      return {
        permitido: false,
        bloqueadoHasta,
      };
    }
  }

  const ultimoIntento = new Date(data.ultimo_intento);

  const diferenciaMinutos =
    (ahora.getTime() - ultimoIntento.getTime()) /
    (1000 * 60);

  if (diferenciaMinutos >= VENTANA_MINUTOS) {
    await supabaseAdmin
      .from("intentos_login")
      .update({
        intentos: 0,
        bloqueado_hasta: null,
        ultimo_intento: ahora.toISOString(),
      })
      .eq("ip", ip);

    return {
      permitido: true,
    };
  }

  return {
    permitido: true,
  };
}

export async function registrarIntentoFallido(ip: string) {
  const ahora = new Date();

  const { data } = await supabaseAdmin
    .from("intentos_login")
    .select("intentos,ultimo_intento")
    .eq("ip", ip)
    .maybeSingle();

  if (!data) {
    await supabaseAdmin
      .from("intentos_login")
      .insert({
        ip,
        intentos: 1,
        ultimo_intento: ahora.toISOString(),
      });

    return;
  }

  const ultimoIntento = new Date(data.ultimo_intento);

  const diferenciaMinutos =
    (ahora.getTime() - ultimoIntento.getTime()) /
    (1000 * 60);

  let intentos = data.intentos;

  if (diferenciaMinutos >= VENTANA_MINUTOS) {
    intentos = 0;
  }

  intentos += 1;

  let bloqueadoHasta: string | null = null;

  if (intentos >= MAX_INTENTOS) {
    bloqueadoHasta = new Date(
      ahora.getTime() + VENTANA_MINUTOS * 60 * 1000
    ).toISOString();
  }

  await supabaseAdmin
    .from("intentos_login")
    .upsert({
      ip,
      intentos,
      ultimo_intento: ahora.toISOString(),
      bloqueado_hasta: bloqueadoHasta,
    });
}

export async function limpiarIntentosLogin(ip: string) {
  await supabaseAdmin
    .from("intentos_login")
    .delete()
    .eq("ip", ip);
}

// =======================================
// RATE LIMIT VOLUNTARIADO
// =======================================

const MAX_SOLICITUDES_VOLUNTARIADO = 5;
const VENTANA_VOLUNTARIADO_MINUTOS = 60;

export async function verificarRateLimitVoluntariado(
  ip: string
) {
  const ahora = new Date();

  const { data, error } = await supabaseAdmin
    .from("intentos_voluntariado")
    .select(
      "ip,intentos,ultimo_intento,bloqueado_hasta"
    )
    .eq("ip", ip)
    .maybeSingle();

  if (error) {
    console.error(
      "Error consultando rate limit voluntariado:",
      error
    );

    // Si Supabase tiene un fallo temporal,
    // no bloqueamos injustamente el formulario.
    return {
      permitido: true,
    };
  }

  if (!data) {
    return {
      permitido: true,
    };
  }

  if (data.bloqueado_hasta) {
    const bloqueadoHasta =
      new Date(data.bloqueado_hasta);

    if (bloqueadoHasta > ahora) {
      return {
        permitido: false,
        bloqueadoHasta,
      };
    }
  }

  const ultimoIntento =
    new Date(data.ultimo_intento);

  const diferenciaMinutos =
    (ahora.getTime() -
      ultimoIntento.getTime()) /
    (1000 * 60);

  // Si pasó una hora,
  // reiniciamos el contador.
  if (
    diferenciaMinutos >=
    VENTANA_VOLUNTARIADO_MINUTOS
  ) {
    await supabaseAdmin
      .from("intentos_voluntariado")
      .delete()
      .eq("ip", ip);

    return {
      permitido: true,
    };
  }

  return {
    permitido:
      data.intentos <
      MAX_SOLICITUDES_VOLUNTARIADO,
  };
}

export async function registrarSolicitudVoluntariado(
  ip: string
) {
  const ahora = new Date();

  const { data, error } = await supabaseAdmin
    .from("intentos_voluntariado")
    .select("intentos,ultimo_intento")
    .eq("ip", ip)
    .maybeSingle();

  if (error) {
    console.error(
      "Error leyendo contador de voluntariado:",
      error
    );

    return;
  }

  if (!data) {
    await supabaseAdmin
      .from("intentos_voluntariado")
      .insert({
        ip,
        intentos: 1,
        ultimo_intento:
          ahora.toISOString(),
        bloqueado_hasta: null,
      });

    return;
  }

  const ultimoIntento =
    new Date(data.ultimo_intento);

  const diferenciaMinutos =
    (ahora.getTime() -
      ultimoIntento.getTime()) /
    (1000 * 60);

  let intentos = data.intentos;

  if (
    diferenciaMinutos >=
    VENTANA_VOLUNTARIADO_MINUTOS
  ) {
    intentos = 0;
  }

  intentos += 1;

  let bloqueadoHasta:
    | string
    | null = null;

  if (
    intentos >=
    MAX_SOLICITUDES_VOLUNTARIADO
  ) {
    bloqueadoHasta = new Date(
      ahora.getTime() +
        VENTANA_VOLUNTARIADO_MINUTOS *
          60 *
          1000
    ).toISOString();
  }

  await supabaseAdmin
    .from("intentos_voluntariado")
    .upsert({
      ip,
      intentos,
      ultimo_intento:
        ahora.toISOString(),
      bloqueado_hasta:
        bloqueadoHasta,
    });
}