import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.fullName || !body.phone || !body.address || !body.age) {
      return NextResponse.json(
        { error: "Barcha maydonlarni to'ldiring" },
        { status: 400 }
      );
    }

    // Bu yerda CRM/Telegram/Email integratsiyasi qo'shing:
    // await sendToTelegram(body);
    // await saveToDatabase(body);

    console.log("Yangi lead:", body);

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
