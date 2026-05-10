"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SubmitStatus = "idle" | "loading" | "err";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

type UTMData = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
  referrer?: string;
  landing_page?: string;
};

type FbCookieData = {
  fbp?: string;
  fbc?: string;
};

export default function LeadForm() {
  const router = useRouter();
  const [status, setStatus] = useState<SubmitStatus>("idle");

  useEffect(() => {
    persistTrackingData();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      const fd = new FormData(e.currentTarget);

      const payload = {
        fullName: String(fd.get("fullName") ?? "").trim(),
        phone: String(fd.get("phone") ?? "").trim(),
        address: String(fd.get("address") ?? "").trim(),
        age: String(fd.get("age") ?? "").trim(),
        ...getStoredUTM(),
        ...getFbCookies(),
        eventId:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        sourceUrl:
          typeof window !== "undefined" ? window.location.href : undefined,
      };

      if (
        typeof window !== "undefined" &&
        typeof (window as any).fbq === "function"
      ) {
        (window as any).fbq(
          "track",
          "Lead",
          {
            currency: "UZS",
            value: 0,
          },
          { eventID: payload.eventId }
        );
      }

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorBody = await safeReadJson(res);
        console.error("Lead yuborishda xato:", errorBody);
        throw new Error("Lead yuborilmadi");
      }

      router.push("/thanks");
    } catch (error) {
      console.error("Form submit xatosi:", error);
      setStatus("err");
    }
  }

  return (
    <section id="forma" className="relative px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-ink-900 to-ink-800 p-8 lg:p-14">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative grid gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-gold-400">
                Forma
              </span>

              <h2 className="font-display mt-3 text-4xl font-bold leading-tight lg:text-5xl">
                <span className="bg-gradient-to-r from-gold-400 to-violet-500 bg-clip-text text-transparent">
                  To&apos;liq ma&apos;lumot olish uchun formani to&apos;ldiring
                </span>
              </h2>

              <p className="mt-5 text-zinc-400">
                Tez orada siz bilan bog&apos;lanamiz
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Ism Familya
                </label>
                <input
                  required
                  name="fullName"
                  placeholder="Akmal Yusupov"
                  className="w-full rounded-2xl border border-white/10 bg-ink-950/60 px-5 py-4 text-white placeholder:text-zinc-600 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Telefon raqam
                </label>
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  className="w-full rounded-2xl border border-white/10 bg-ink-950/60 px-5 py-4 text-white placeholder:text-zinc-600 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">
                    Manzil
                  </label>
                  <input
                    required
                    name="address"
                    placeholder="Toshkent"
                    className="w-full rounded-2xl border border-white/10 bg-ink-950/60 px-5 py-4 text-white placeholder:text-zinc-600 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
                  />
                </div>

                {/* <div>
                  <label className="mb-2 block text-sm text-zinc-400">
                    Yoshi
                  </label>
                  <input
                    required
                    name="age"
                    type="number"
                    min="14"
                    max="80"
                    placeholder="22"
                    className="w-full rounded-2xl border border-white/10 bg-ink-950/60 px-5 py-4 text-white placeholder:text-zinc-600 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
                  />
                </div> */}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-2xl bg-gold-400 py-4 font-semibold text-ink-950 transition hover:bg-gold-500 disabled:opacity-60"
              >
                {status === "loading" ? "Yuborilmoqda..." : "Arizani yuborish →"}
              </button>

              {status === "err" && (
                <div className="rounded-2xl bg-red-500/10 p-4 text-center text-sm text-red-400">
                  Xatolik yuz berdi. Qaytadan urinib ko&apos;ring.
                </div>
              )}

              <p className="text-center text-xs text-zinc-500">
                Ma&apos;lumotlaringiz himoyalangan va uchinchi shaxslarga
                berilmaydi
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function persistTrackingData() {
  if (typeof window === "undefined") return;

  try {
    const params = new URLSearchParams(window.location.search);

    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) {
        localStorage.setItem(key, value);
      }
    }

    if (document.referrer && !localStorage.getItem("referrer")) {
      localStorage.setItem("referrer", document.referrer);
    }

    if (!localStorage.getItem("landing_page")) {
      localStorage.setItem("landing_page", window.location.href);
    }
  } catch (error) {
    console.error("Tracking ma'lumotlarini saqlashda xato:", error);
  }
}

function getStoredUTM(): UTMData {
  if (typeof window === "undefined") return {};

  try {
    const params = new URLSearchParams(window.location.search);

    const data: UTMData = {};

    for (const key of UTM_KEYS) {
      const fromQuery = params.get(key);
      const fromStorage = localStorage.getItem(key);

      const value = fromQuery || fromStorage || undefined;
      if (value) data[key] = value;
    }

    data.referrer =
      document.referrer ||
      localStorage.getItem("referrer") ||
      undefined;

    data.landing_page =
      localStorage.getItem("landing_page") ||
      window.location.href ||
      undefined;

    return data;
  } catch (error) {
    console.error("UTM o'qishda xato:", error);
    return {};
  }
}

function getFbCookies(): FbCookieData {
  if (typeof document === "undefined") return {};

  try {
    const cookies = parseCookies(document.cookie);

    let fbp = cookies._fbp;
    let fbc = cookies._fbc;

    if (!fbc && typeof window !== "undefined") {
      const fbclid = new URLSearchParams(window.location.search).get("fbclid");
      if (fbclid) {
        fbc = `fb.1.${Date.now()}.${fbclid}`;
      }
    }

    return {
      fbp: fbp || undefined,
      fbc: fbc || undefined,
    };
  } catch (error) {
    console.error("FB cookie o'qishda xato:", error);
    return {};
  }
}

function parseCookies(cookieString: string): Record<string, string> {
  return cookieString
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, part) => {
      const eqIndex = part.indexOf("=");
      if (eqIndex === -1) return acc;

      const key = decodeURIComponent(part.slice(0, eqIndex).trim());
      const value = decodeURIComponent(part.slice(eqIndex + 1).trim());

      acc[key] = value;
      return acc;
    }, {});
}

async function safeReadJson(res: Response) {
  try {
    return await res.json();
  } catch {
    try {
      return await res.text();
    } catch {
      return null;
    }
  }
}
