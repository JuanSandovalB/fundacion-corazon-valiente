import "server-only";
import crypto from "crypto";

function obtenerSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET no está configurada");
  }

  return secret;
}
export function crearSesionFirmada(adminId: string) {
  const firma = crypto
    .createHmac("sha256", obtenerSecret())
    .update(adminId)
    .digest("hex");

  return `${adminId}.${firma}`;
}

export function verificarSesionFirmada(session: string) {
  const [adminId, firmaRecibida] = session.split(".");

  if (!adminId || !firmaRecibida) {
    return null;
  }

  const firmaEsperada = crypto
    .createHmac("sha256", obtenerSecret())
    .update(adminId)
    .digest("hex");

  try {
    const firmaValida = crypto.timingSafeEqual(
      Buffer.from(firmaRecibida, "hex"),
      Buffer.from(firmaEsperada, "hex")
    );

    if (!firmaValida) {
      return null;
    }

    return adminId;
  } catch {
    return null;
  }
}