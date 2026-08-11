import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verificarAdministrador } from "@/lib/auth";
import crypto from "crypto";

const TIPOS_PERMITIDOS = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const TAMANO_MAXIMO = 5 * 1024 * 1024;

export async function POST(request: Request) {
  // ===============================
  // VERIFICAR ADMINISTRADOR
  // ===============================

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
    const formData = await request.formData();

    const archivo = formData.get("file");

    if (!(archivo instanceof File)) {
      return NextResponse.json(
        {
          error: "No se recibió una imagen válida",
        },
        {
          status: 400,
        }
      );
    }

    // ===============================
    // VALIDAR TIPO
    // ===============================

    if (!TIPOS_PERMITIDOS.includes(archivo.type)) {
      return NextResponse.json(
        {
          error:
            "Formato no permitido. Usa JPG, PNG o WEBP.",
        },
        {
          status: 400,
        }
      );
    }

    // ===============================
    // VALIDAR TAMAÑO
    // ===============================

    if (archivo.size > TAMANO_MAXIMO) {
      return NextResponse.json(
        {
          error:
            "La imagen supera el tamaño máximo permitido de 5 MB.",
        },
        {
          status: 400,
        }
      );
    }

    // ===============================
    // EXTENSIÓN SEGURA
    // ===============================

    const extensiones: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    };

    const extension = extensiones[archivo.type];

    // ===============================
    // NOMBRE ALEATORIO
    // ===============================

    const nombreArchivo =
      `${crypto.randomUUID()}.${extension}`;

    // ===============================
    // CONVERTIR ARCHIVO
    // ===============================

    const buffer = Buffer.from(
      await archivo.arrayBuffer()
    );

    // ===============================
    // SUBIR A STORAGE
    // ===============================

    const { data, error } = await supabaseAdmin
      .storage
      .from("eventos")
      .upload(
        nombreArchivo,
        buffer,
        {
          contentType: archivo.type,
          upsert: false,
        }
      );

    if (error) {
      console.error(
        "ERROR STORAGE:",
        error
      );

      return NextResponse.json(
        {
          error:
            "No fue posible subir la imagen",
        },
        {
          status: 500,
        }
      );
    }

    // ===============================
    // OBTENER URL PÚBLICA
    // ===============================

    const { data: publicData } =
      supabaseAdmin
        .storage
        .from("eventos")
        .getPublicUrl(data.path);

    return NextResponse.json(
      {
        success: true,
        url: publicData.publicUrl,
      },
      {
        status: 201,
      }
    );

  } catch (error) {
    console.error(
      "Error subiendo imagen:",
      error
    );

    return NextResponse.json(
      {
        error: "Error subiendo imagen",
      },
      {
        status: 500,
      }
    );
  }
}