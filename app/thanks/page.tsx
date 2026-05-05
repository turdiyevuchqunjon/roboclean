"use client";

import { useEffect, useState } from "react";

const REDIRECT_SECONDS = 10;
const TELEGRAM_URL =
  process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL || "https://t.me/sizning_kanal";

export default function ThanksPage() {
  const [seconds, setSeconds] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = TELEGRAM_URL;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const progress = ((REDIRECT_SECONDS - seconds) / REDIRECT_SECONDS) * 100;

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-16">
      {/* Fon effektlari */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-2xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-ink-900 to-ink-800 p-10 text-center lg:p-16">
          {/* Tasdiq ikona */}
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-violet-500">
            <svg
              className="h-12 w-12 text-ink-950"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <span className="text-sm font-semibold uppercase tracking-widest text-gold-400">
            Rahmat!
          </span>

          <h1 className="font-display mt-3 text-4xl font-bold leading-tight lg:text-5xl">
            Arizangiz{" "}
            <span className="bg-gradient-to-r from-gold-400 to-violet-500 bg-clip-text text-transparent">
              qabul qilindi
            </span>
          </h1>

          <p className="mt-5 text-lg text-zinc-400">
            Mentorimiz 24 soat ichida siz bilan bog&apos;lanadi.
          </p>

          <div className="mt-10 rounded-2xl border border-white/10 bg-ink-950/60 p-6">
            <p className="text-sm text-zinc-400">
              Telegram kanalimizga{" "}
              <span className="font-bold text-gold-400">{seconds}</span> soniyada
              yo&apos;naltirilasiz
            </p>

            {/* Progress bar */}
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full bg-gradient-to-r from-gold-400 to-violet-500 transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <a href={TELEGRAM_URL}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gold-400 px-6 py-3 font-semibold text-ink-950 transition hover:bg-gold-500"
            >
              Hozir o&apos;tish →
            </a>
          </div>

          <p className="mt-8 text-xs text-zinc-500">
            Foydali ma&apos;lumotlar va yangiliklar uchun kanalimizga obuna
            bo&apos;ling
          </p>
        </div>
      </div>
    </section>
  );
}