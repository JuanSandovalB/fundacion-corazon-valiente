import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
    return new NextResponse(challenge, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return NextResponse.json(
    { error: "Token de verificación inválido" },
    { status: 403 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("Webhook WhatsApp recibido:", JSON.stringify(body, null, 2));

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error procesando webhook de WhatsApp:", error);

    return NextResponse.json(
      { error: "Error procesando webhook" },
      { status: 500 }
    );
  }
}