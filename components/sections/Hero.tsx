export default function Hero() {
  return (
    <section className="relative min-h-screen px-6 pt-8 pb-20 lg:px-12">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-violet-500 font-display text-lg font-bold text-ink-950">
            A
          </div>
          <span className="font-display text-xl font-bold">AURA</span>
        </div>
        <a
          href="tel:+998884053097"
          className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm backdrop-blur transition hover:border-gold-400 hover:text-gold-400"
        >
          Qo'ng'iroq qilish
        </a>
      </nav>

      <div className="mx-auto mt-20 grid max-w-7xl items-center gap-12 lg:mt-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            20 yildan beri sotuvda
          </div>

          <h1
            className="animate-fade-up font-display mt-6 text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            Eng to'g'ri tanlov{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-gold-400 via-gold-400 to-violet-500 bg-clip-text text-transparent uppercase">
                ROBOCLEAN pro
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
          </h1> 

          <p
            className="animate-fade-up mt-7 max-w-xl text-lg text-zinc-400 lg:text-xl"
            style={{ animationDelay: "0.2s" }}
          >
            Tozalik va sog'lom hayot uchun eng yaxshi sarmoya. Endilikda siz uni <span className="text-white">0% muddatli to'lov</span> asosida xarid qilishingiz mumkin. Bepul servis xizmati kafolatlangan!
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href="tel:+998884053097"
              className="animate-glow group relative inline-flex items-center gap-3 rounded-full bg-gold-400 px-8 py-4 font-semibold text-ink-950 transition hover:bg-gold-500"
            >
              Buyurtma berish
              <span className="transition group-hover:translate-x-1">→</span>
            </a>
            <a
              href="tel:+998884053097"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur transition hover:border-white/20"
            >
              📞 +998 88 405 30 97
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
              <div className="font-semibold text-white">Minglab mamnun mijozlar</div>
              <div className="text-zinc-500">🔧 Bepul Servis xizmati</div>
            </div>
          </div>
        </div>

        {/* Maxsulot rasmi qismi */}
        <div className="lg:col-span-5">
          <div className="animate-float relative">
            {/* Rasm orqasidagi chiroyli effekt */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-gold-400 via-violet-500 to-emerald-500 opacity-30 blur-xl"></div>
            
            {/* Rasm joylashadigan asosiy konteyner */}
            <div className="relative rounded-3xl border border-white/10 bg-ink-900/80 p-2 backdrop-blur-xl overflow-hidden shadow-2xl">
              
              {/* SHU YERGA RASM MANZILINI QO'YING */}
              <img 
                src="/rasm.jpg" 
                alt="Roboclean Pro apparati" 
                className="w-full h-auto object-cover rounded-2xl"
                // Agar rasmni aniq o'lchamga keltirmoqchi bo'lsangiz quyidagi klasslarni ishlating:
                // className="w-full aspect-[4/5] object-cover rounded-2xl"
              />

            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}