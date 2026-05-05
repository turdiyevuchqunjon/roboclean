import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, phone, address, age } = body;

    // Validatsiya
    if (!fullName || !phone || !address || !age) {
      return NextResponse.json(
        { error: "Barcha maydonlarni to'ldiring" },
        { status: 400 }
      );
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Telegram credentials topilmadi");
      return NextResponse.json(
        { error: "Server konfiguratsiyasi xato" },
        { status: 500 }
      );
    }

    // Telegram uchun xabar formatlash
    const message = `
🔔 <b>Yangi ariza!</b>

👤 <b>Ism Familya:</b> ${escapeHtml(fullName)}
📞 <b>Telefon:</b> ${escapeHtml(phone)}
📍 <b>Manzil:</b> ${escapeHtml(address)}
🎂 <b>Yoshi:</b> ${escapeHtml(String(age))}

🕒 <i>${new Date().toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
    })}</i>
`.trim();

    // Telegram ga yuborish
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    if (!telegramRes.ok) {
      const errorData = await telegramRes.json().catch(() => ({}));
      console.error("Telegram xatosi:", errorData);
      return NextResponse.json(
        { error: "Xabar yuborishda xatolik" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Lead API xatosi:", e);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}

// HTML inyeksiyadan himoya
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}