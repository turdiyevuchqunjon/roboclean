export default function Hero() {
  return (
    <section className="relative min-h-screen px-6 pt-8 pb-20 lg:px-12">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-violet-500 font-display text-lg font-bold text-ink-950">
            T
          </div>
          <span className="font-display text-xl font-bold">Uchqun</span>
        </div>
        <a
          href="#forma"
          className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm backdrop-blur transition hover:border-gold-400 hover:text-gold-400"
        >
          Ma'lumot uchun
        </a>
      </nav>

      <div className="mx-auto mt-20 grid max-w-7xl items-center gap-12 lg:mt-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Yangi guruhga ro&apos;yxat boshlandi
          </div>

          <h1
            className="animate-fade-up font-display mt-6 text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            3 oyda{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-gold-400 via-gold-400 to-violet-500 bg-clip-text text-transparent">
                Performance Marketing
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M2 9C50 3 150 3 298 9"
                  stroke="#f5b544"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            mutaxassisi bo'ling 
          </h1> 

          <p
            className="animate-fade-up mt-7 max-w-xl text-lg text-zinc-400 lg:text-xl"
            style={{ animationDelay: "0.2s" }}
          >
            Noldan boshlab amaliy loyihalar bilan o&apos;rganasiz. Kursni
            tugatgach <span className="text-white">$700+ daromadli</span>{" "}
            ish o&apos;rinlariga tayyor bo&apos;lasiz.
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href="#forma"
              className="animate-glow group relative inline-flex items-center gap-3 rounded-full bg-gold-400 px-8 py-4 font-semibold text-ink-950 transition hover:bg-gold-500"
            >
              Bepul darsga yozilish
              <span className="transition group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#price"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur transition hover:border-white/20"
            >
              Narxni ko&apos;rish
            </a>
          </div>

          <div
            className="animate-fade-up mt-12 flex items-center gap-6"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex -space-x-3">
              {["#f5b544", "#6d5cff", "#10b981", "#ef4444"].map((c, i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-ink-950"
                  style={{ background: `linear-gradient(135deg, ${c}, #1a1c2e)` }}
                />
              ))}
            </div>
            <div className="text-sm">
              <div className="font-semibold text-white">1500+ bitiruvchi</div>
              <div className="text-zinc-500">⭐ 4.9 / 5.0 reyting</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="animate-float relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-gold-400 via-violet-500 to-emerald-500 opacity-30 blur-xl"></div>
            <div className="relative rounded-3xl border border-white/10 bg-ink-900/80 p-8 backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-zinc-500">
                  Aksiya
                </span>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-400">
                  -40%
                </span>
              </div>
              <div className="mb-2 text-sm text-zinc-500 line-through">
                4 800 000 so&apos;m
              </div>
              <div className="font-display text-5xl font-bold text-white">
                2 880 000{" "}
                <span className="text-base font-normal text-zinc-400">so&apos;m</span>
              </div>
              <p className="mt-2 text-sm text-zinc-400">yoki 480 000 so&apos;m × 6 oy</p>

              <div className="my-6 h-px bg-white/10"></div>

              <ul className="space-y-3 text-sm">
                {[
                  "24 haftalik dastur",
                  "Live video darslar",
                  "Real loyihalar portfolio",
                  "Ish topishga yordam",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-xs text-emerald-400">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl bg-gold-400/10 p-4 text-sm text-gold-400">
                ⏰ Aksiya 3 kunda tugaydi
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
