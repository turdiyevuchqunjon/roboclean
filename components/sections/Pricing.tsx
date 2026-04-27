const plans = [
  {
    name: "Standart",
    price: "2 880 000",
    old: "4 800 000",
    popular: false,
    features: [
      "24 haftalik to'liq dastur",
      "Guruhli live darslar",
      "Mentordan home-work tekshiruvi",
      "Sertifikat",
    ],
  },
  {
    name: "Premium",
    price: "4 200 000",
    old: "7 000 000",
    popular: true,
    features: [
      "Standart paketdagi hammasi",
      "1:1 mentor bilan haftalik suhbat",
      "Ish topishga yordam (HR)",
      "Resume va LinkedIn ko'rib chiqish",
      "Lifetime materiallarga kirish",
    ],
  },
  {
    name: "VIP",
    price: "7 500 000",
    old: "12 000 000",
    popular: false,
    features: [
      "Premium paketdagi hammasi",
      "Shaxsiy mentor (kuniga)",
      "Real ishga joylashish kafolati",
      "5 ta tayyor mijoz loyihasi",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="price" className="relative px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-gold-400">
            Tariflar
          </span>
          <h2 className="font-display mt-3 text-4xl font-bold leading-tight lg:text-5xl">
            O&apos;zingizga mos paketni{" "}
            <span className="bg-gradient-to-r from-gold-400 to-violet-500 bg-clip-text text-transparent">
              tanlang
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Aksiya 3 kun ichida tugaydi — narxlar ikki barobariga oshadi
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl border p-8 ${
                p.popular
                  ? "border-gold-400 bg-gradient-to-b from-gold-400/10 to-transparent"
                  : "border-white/10 bg-ink-900/50"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gold-400 px-4 py-1 text-xs font-bold text-ink-950">
                  ENG MASHHUR
                </div>
              )}
              <h3 className="font-display text-2xl font-bold">{p.name}</h3>
              <div className="mt-6">
                <div className="text-sm text-zinc-500 line-through">{p.old} so&apos;m</div>
                <div className="font-display text-4xl font-bold">
                  {p.price} <span className="text-base font-normal text-zinc-400">so&apos;m</span>
                </div>
              </div>

              <a
                href="#forma"
                className={`mt-6 block rounded-full py-3 text-center font-semibold transition ${
                  p.popular
                    ? "bg-gold-400 text-ink-950 hover:bg-gold-500"
                    : "border border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                Tanlash
              </a>

              <ul className="mt-8 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs text-emerald-400">
                      ✓
                    </span>
                    <span className="text-zinc-300">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
