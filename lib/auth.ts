
import "server-only";
import { cookies } from "next/headers";
import { supabaseAdmin } from "./supabaseAdmin";
import { verificarSesionFirmada } from "./session";

export async function verificarAdministrador() {
  const cookieStore = await cookies();

  const session = cookieStore.get("admin_session");

  if (!session) {
    return null;
  }

  const adminId = verificarSesionFirmada(session.value);

  if (!adminId) {
    return null;
  }

  const { data, error } = await supabaseAdmin
    .from("administradores")
    .select("id,email,rol,activo")
    .eq("id", adminId)
    .eq("activo", true)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}