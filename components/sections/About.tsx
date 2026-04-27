const modules = [
  { week: "1-4", title: "HTML, CSS, Tailwind", desc: "Web sayt asoslari va zamonaviy stillar" },
  { week: "5-10", title: "JavaScript chuqur", desc: "ES6+, asinxron kod, DOM manipulation" },
  { week: "11-16", title: "React.js", desc: "Komponentlar, hook'lar, state management" },
  { week: "17-22", title: "Next.js + API", desc: "SSR, App Router, real backend bilan ishlash" },
  { week: "23-24", title: "Diplom loyihasi", desc: "Portfolio uchun mukammal e-commerce sayt" },
];

export default function About() {
  return (
    <section id="kurs" className="relative px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="text-sm font-semibold uppercase tracking-widest text-violet-500">
              Dastur haqida
            </span>
            <h2 className="font-display mt-3 text-4xl font-bold leading-tight lg:text-5xl">
              24 haftada noldan{" "}
              <span className="bg-gradient-to-r from-violet-500 to-gold-400 bg-clip-text text-transparent">
                pro darajaga
              </span>
            </h2>
            <p className="mt-6 text-lg text-zinc-400">
              Har bir modulda 70% amaliyot — chunki kod yozish faqat
              kod yozish orqali o&apos;rganiladi. Mentor sizni har qadamda
              kuzatib boradi.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                ["120+", "Live dars"],
                ["50+", "Amaliy mashq"],
                ["5", "Real loyiha"],
                ["1:1", "Mentor bilan"],
              ].map(([num, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="font-display text-3xl font-bold text-gold-400">{num}</div>
                  <div className="mt-1 text-sm text-zinc-400">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-3">
              {modules.map((m) => (
                <div
                  key={m.title}
                  className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-ink-900/50 p-5 transition hover:border-violet-500/50 hover:bg-ink-900"
                >
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-gold-400/20 text-xs">
                    <div className="text-zinc-500">Hafta</div>
                    <div className="font-display font-bold text-white">{m.week}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold">{m.title}</h3>
                    <p className="text-sm text-zinc-400">{m.desc}</p>
                  </div>
                  <div className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-gold-400">
                    →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
