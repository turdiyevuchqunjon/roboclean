import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendMetaLeadEvent } from "@/lib/meta-capi";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      phone,
      address,
      age,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      referrer,
      landing_page,
      // Meta uchun client-side ma'lumotlari
      eventId: clientEventId,
      fbc,
      fbp,
      sourceUrl,
    } = body;

    // Validatsiya
    if (!fullName || !phone || !address || !age) {
      return NextResponse.json(
        { error: "Barcha maydonlarni to'ldiring" },
        { status: 400 }
      );
    }

    // Client IP va User-Agent (Meta CAPI uchun zarur)
    const headers = req.headers;
    const clientIp =
      headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      headers.get("x-real-ip") ||
      undefined;
    const userAgent = headers.get("user-agent") || undefined;

    // Event ID - agar client yubormagan bo'lsa, server yaratadi
    const eventId = clientEventId || crypto.randomUUID();

    // Telegram va Meta CAPI ni parallel yuborish (tezroq response)
    const [telegramResult, metaResult] = await Promise.allSettled([
      sendToTelegram({
        fullName,
        phone,
        address,
        age,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        referrer,
        landing_page,
      }),
      sendMetaLeadEvent({
        fullName,
        phone,
        address,
        age,
        eventId,
        clientIp,
        userAgent,
        fbc,
        fbp,
        sourceUrl: sourceUrl || landing_page,
      }),
    ]);

    // Telegram MUHIM - agar tushmasa xato qaytaramiz
    if (telegramResult.status === "rejected" || !telegramResult.value.ok) {
      console.error("Telegram xatosi:", telegramResult);
      return NextResponse.json(
        { error: "Xabar yuborishda xatolik" },
        { status: 500 }
      );
    }

    // Meta CAPI - log qilamiz, lekin muvaffaqiyatsiz bo'lsa ham foydalanuvchiga ok qaytaramiz
    if (metaResult.status === "rejected" || !metaResult.value.success) {
      console.error("Meta CAPI muvaffaqiyatsiz:", metaResult);
    }

    return NextResponse.json({ ok: true, eventId });
  } catch (e) {
    console.error("Lead API xatosi:", e);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}

// Telegram yuborish funksiyasi
type TelegramData = {
  fullName: string;
  phone: string;
  address: string;
  age: string | number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
};

async function sendToTelegram(data: TelegramData): Promise<{ ok: boolean }> {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Telegram credentials topilmadi");
    return { ok: false };
  }

  const utmLines: string[] = [];
  if (data.utm_source) utmLines.push(`📡 <b>Source:</b> ${escapeHtml(data.utm_source)}`);
  if (data.utm_medium) utmLines.push(`📊 <b>Medium:</b> ${escapeHtml(data.utm_medium)}`);
  if (data.utm_campaign) utmLines.push(`🎯 <b>Campaign:</b> ${escapeHtml(data.utm_campaign)}`);
  if (data.utm_term) utmLines.push(`🔑 <b>Term:</b> ${escapeHtml(data.utm_term)}`);
  if (data.utm_content) utmLines.push(`📝 <b>Content:</b> ${escapeHtml(data.utm_content)}`);
  if (data.referrer) utmLines.push(`🔗 <b>Referrer:</b> ${escapeHtml(data.referrer)}`);
  if (data.landing_page) utmLines.push(`🌐 <b>Landing:</b> ${escapeHtml(data.landing_page)}`);

  const utmBlock =
    utmLines.length > 0
      ? `\n\n<b>📈 Manba ma'lumotlari:</b>\n${utmLines.join("\n")}`
      : "";

  const message = `
🔔 <b>Yangi ariza!</b>

👤 <b>Ism Familya:</b> ${escapeHtml(data.fullName)}
📞 <b>Telefon:</b> ${escapeHtml(data.phone)}
📍 <b>Manzil:</b> ${escapeHtml(data.address)}
🎂 <b>Yoshi:</b> ${escapeHtml(String(data.age))}${utmBlock}

🕒 <i>${new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}</i>
`.trim();

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}