const results = [
  {
    icon: "💼",
    title: "Birinchi ish",
    text: "Bitiruvchilarimizning 92% kursdan keyin 3 oy ichida ishga joylashadi",
  },
  {
    icon: "💰",
    title: "$1000+ daromad",
    text: "O'rtacha boshlang'ich oylik — yangi kasbingiz uchun yaxshi start",
  },
  {
    icon: "🚀",
    title: "Real portfolio",
    text: "Kurs davomida 5+ jiddiy loyiha yaratasiz va GitHub'da chop etasiz",
  },
  {
    icon: "🌍",
    title: "Xalqaro buyurtmalar",
    text: "Upwork va boshqa platformalarda mustaqil ishlash ko'nikmasi",
  },
];

export default function Results() {
  return (
    <section id="natijalar" className="relative px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-gold-400">
            Sizning natijalaringiz
          </span>
          <h2 className="font-display mt-3 text-4xl font-bold leading-tight lg:text-5xl">
            Kursdan keyin{" "}
            <span className="text-zinc-500">qo&apos;lga kiritadigan</span> 4 ta
            haqiqiy natija
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((r) => (
            <div
              key={r.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/50 p-7 transition hover:-translate-y-1 hover:border-gold-400/50"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold-400/5 blur-2xl transition group-hover:bg-gold-400/20"></div>
              <div className="relative">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-gold-400/20 text-3xl">
                  {r.icon}
                </div>
                <h3 className="font-display text-xl font-bold">{r.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
