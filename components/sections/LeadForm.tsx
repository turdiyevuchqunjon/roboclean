"use client";

import { useState } from "react";

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("err");
    }
  }

  return (
    <section id="forma" className="relative px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-ink-900 to-ink-800 p-8 lg:p-14">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl"></div>

          <div className="relative grid gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-gold-400">
                Forma 
              </span>
              <h2 className="font-display mt-3 text-4xl font-bold leading-tight lg:text-5xl">
                To'liq ma'lumot Olish uchun{" "}
                <span className="bg-gradient-to-r from-gold-400 to-violet-500 bg-clip-text text-transparent">
                  Formani to'ldiring
                </span>
              </h2>
              <p className="mt-5 text-zinc-400">
                Mentorimiz 24 soat ichida siz bilan bog&apos;lanamiz.
              </p>

           
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">Ism Familya</label>
                <input
                  required
                  name="fullName"
                  placeholder="Akmal Yusupov"
                  className="w-full rounded-2xl border border-white/10 bg-ink-950/60 px-5 py-4 text-white placeholder:text-zinc-600 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">Telefon raqam</label>
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
                  <label className="mb-2 block text-sm text-zinc-400">Manzil</label>
                  <input
                    required
                    name="address"
                    placeholder="Toshkent"
                    className="w-full rounded-2xl border border-white/10 bg-ink-950/60 px-5 py-4 text-white placeholder:text-zinc-600 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">Yoshi</label>
                  <input
                    required
                    name="age"
                    type="number"
                    min="14"
                    max="80"
                    placeholder="22"
                    className="w-full rounded-2xl border border-white/10 bg-ink-950/60 px-5 py-4 text-white placeholder:text-zinc-600 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-2xl bg-gold-400 py-4 font-semibold text-ink-950 transition hover:bg-gold-500 disabled:opacity-60"
              >
                {status === "loading" ? "Yuborilmoqda..." : "Arizani yuborish →"}
              </button>

              {status === "ok" && (
                <div className="rounded-2xl bg-emerald-500/10 p-4 text-center text-sm text-emerald-400">
                  ✓ Arizangiz qabul qilindi. Tez orada bog&apos;lanamiz.
                </div>
              )}
              {status === "err" && (
                <div className="rounded-2xl bg-red-500/10 p-4 text-center text-sm text-red-400">
                  Xatolik yuz berdi. Qaytadan urinib ko&apos;ring.
                </div>
              )}

              <p className="text-center text-xs text-zinc-500">
                Ma&apos;lumotlaringiz himoyalangan va uchinchi shaxslarga berilmaydi
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
