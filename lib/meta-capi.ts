import crypto from "crypto";

type LeadEventData = {
  fullName: string;
  phone: string;
  address?: string;
  age?: string | number;
  eventId: string; // Pixel bilan deduplikatsiya uchun
  clientIp?: string;
  userAgent?: string;
  fbc?: string; // _fbc cookie (Facebook Click ID)
  fbp?: string; // _fbp cookie (Facebook Browser ID)
  sourceUrl?: string;
};

// SHA-256 hashing (Meta talabiga ko'ra PII ma'lumotlar hash qilinishi kerak)
function hash(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  const normalized = String(value).trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

// Telefon raqamini normalizatsiya qilish (faqat raqamlar)
function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

// Ism va familyani ajratish
function splitName(fullName: string): { firstName?: string; lastName?: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) return {};
  if (parts.length === 1) return { firstName: parts[0] };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

export async function sendMetaLeadEvent(data: LeadEventData): Promise<{
  success: boolean;
  error?: string;
}> {
  const PIXEL_ID = process.env.META_PIXEL_ID;
  const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;
  const TEST_CODE = process.env.META_TEST_EVENT_CODE;

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error("Meta CAPI credentials topilmadi");
    return { success: false, error: "Meta credentials yo'q" };
  }

  const { firstName, lastName } = splitName(data.fullName);
  const phoneNormalized = normalizePhone(data.phone);

  // user_data - Meta talab qiladigan format (PII hash qilingan)
  const userData: Record<string, string | string[] | undefined> = {
    em: undefined, // email yo'q formada
    ph: hash(phoneNormalized),
    fn: hash(firstName),
    ln: hash(lastName),
    ct: hash(data.address), // city
    country: hash("uz"), // O'zbekiston
    external_id: hash(phoneNormalized), // unique foydalanuvchi ID si
    client_ip_address: data.clientIp,
    client_user_agent: data.userAgent,
    fbc: data.fbc,
    fbp: data.fbp,
  };

  // undefined qiymatlarni tozalash
  const cleanUserData = Object.fromEntries(
    Object.entries(userData).filter(([_, v]) => v !== undefined && v !== "")
  );

  const eventPayload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: data.eventId, // Pixel-CAPI deduplikatsiya
        event_source_url: data.sourceUrl,
        action_source: "website",
        user_data: cleanUserData,
        custom_data: {
          currency: "UZS",
          value: 0,
          lead_type: "course_application",
        },
      },
    ],
    ...(TEST_CODE && { test_event_code: TEST_CODE }),
  };

  try {
    const url = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventPayload),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Meta CAPI xatosi:", result);
      return {
        success: false,
        error: result?.error?.message || "Meta API xatosi",
      };
    }

    console.log("Meta CAPI muvaffaqiyatli:", {
      events_received: result.events_received,
      fbtrace_id: result.fbtrace_id,
    });

    return { success: true };
  } catch (e) {
    console.error("Meta CAPI tarmoq xatosi:", e);
    return { success: false, error: "Tarmoq xatosi" };
  }
}