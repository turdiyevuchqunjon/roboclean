import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadRequestBody = {
  fullName?: string;
  phone?: string;
  address?: string;
  age?: string | number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
  eventId?: string;
  fbc?: string;
  fbp?: string;
  sourceUrl?: string;
};

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
  fbc?: string;
  fbp?: string;
  sourceUrl?: string;
  clientIp?: string;
  userAgent?: string;
  eventId?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LeadRequestBody;

    const fullName = String(body.fullName ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const address = String(body.address ?? "").trim();
    const age = String(body.age ?? "").trim();

    if (!fullName || !phone || !address || !age) {
      return NextResponse.json(
        { error: "Barcha maydonlarni to'ldiring" },
        { status: 400 }
      );
    }

    const headers = req.headers;
    const clientIp =
      headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headers.get("x-real-ip") ||
      undefined;

    const userAgent = headers.get("user-agent") || undefined;

    const eventId =
      body.eventId ||
      (typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

    const telegramResult = await sendToTelegram({
      fullName,
      phone,
      address,
      age,
      utm_campaign: clean(body.utm_campaign),
      utm_term: clean(body.utm_term),
      utm_content: clean(body.utm_content),
     
    });

    if (!telegramResult.ok) {
      console.error("Telegram yuborishda xato:", telegramResult.error);
      return NextResponse.json(
        { error: "Telegramga yuborishda xatolik" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      eventId,
    });
  } catch (error) {
    console.error("Lead API xatosi:", error);
    return NextResponse.json(
      { error: "Server xatosi" },
      { status: 500 }
    );
  }
}

async function sendToTelegram(
  data: TelegramData
): Promise<{ ok: boolean; error?: string }> {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return {
      ok: false,
      error: "TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID topilmadi",
    };
  }

  const extraLines: string[] = [];

  if (data.utm_source) {
    extraLines.push(`📡 <b>UTM Source:</b> ${escapeHtml(data.utm_source)}`);
  }
  if (data.utm_medium) {
    extraLines.push(`📊 <b>UTM Medium:</b> ${escapeHtml(data.utm_medium)}`);
  }
  if (data.utm_campaign) {
    extraLines.push(`🎯 <b>UTM Campaign:</b> ${escapeHtml(data.utm_campaign)}`);
  }
  if (data.utm_term) {
    extraLines.push(`🔑 <b>UTM Term:</b> ${escapeHtml(data.utm_term)}`);
  }
  if (data.utm_content) {
    extraLines.push(`📝 <b>UTM Content:</b> ${escapeHtml(data.utm_content)}`);
  }
  if (data.referrer) {
    extraLines.push(`🔗 <b>Referrer:</b> ${escapeHtml(data.referrer)}`);
  }
  if (data.landing_page) {
    extraLines.push(`🌐 <b>Landing page:</b> ${escapeHtml(data.landing_page)}`);
  }
  if (data.sourceUrl) {
    extraLines.push(`📍 <b>Source URL:</b> ${escapeHtml(data.sourceUrl)}`);
  }
  if (data.fbp) {
    extraLines.push(`🧩 <b>FBP:</b> ${escapeHtml(data.fbp)}`);
  }
  if (data.fbc) {
    extraLines.push(`🧩 <b>FBC:</b> ${escapeHtml(data.fbc)}`);
  }
  if (data.clientIp) {
    extraLines.push(`🌍 <b>IP:</b> ${escapeHtml(data.clientIp)}`);
  }
  if (data.userAgent) {
    extraLines.push(`🖥 <b>User Agent:</b> ${escapeHtml(data.userAgent)}`);
  }
  if (data.eventId) {
    extraLines.push(`🆔 <b>Event ID:</b> ${escapeHtml(data.eventId)}`);
  }

  const extraBlock =
    extraLines.length > 0
      ? `\n\n<b>📈 Qo'shimcha ma'lumotlar:</b>\n${extraLines.join("\n")}`
      : "";

  const message = `
🔔 <b>Yangi lead keldi!</b>

👤 <b>Ism Familya:</b> ${escapeHtml(data.fullName)}
📞 <b>Telefon:</b> ${escapeHtml(data.phone)}
📍 <b>Manzil:</b> ${escapeHtml(data.address)}
🎂 <b>Yoshi:</b> ${escapeHtml(String(data.age))}${extraBlock}

🕒 <i>${formatUzbekTime()}</i>
`.trim();

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );

    const raw = await response.text();

    if (!response.ok) {
      return {
        ok: false,
        error: `Telegram API xatosi: ${response.status} ${raw}`,
      };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Noma'lum Telegram xatosi",
    };
  }
}

function clean(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function formatUzbekTime() {
  return new Intl.DateTimeFormat("uz-UZ", {
    timeZone: "Asia/Tashkent",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
