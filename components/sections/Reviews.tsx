const reviews = [
  {
    name: "Akmal Yusupov",
    role: "Frontend Developer · Uzum",
    text: "Kurs boshlanishida hech narsa bilmasdim. 5 oy ichida React'da pet-project yasab, 6-oyda Uzum'ga kichik dasturchi sifatida ishga kirdim. Mentorning sabri uchun katta rahmat.",
    avatar: "linear-gradient(135deg, #f5b544, #ef4444)",
  },
  {
    name: "Munisa Rahimova",
    role: "Freelance · Upwork",
    text: "Universitet bitirgach ish topa olmasdim. Kursdan keyin Upwork'da $25/soat narxda buyurtma olaman. Eng yaxshi investitsiya bo'ldi.",
    avatar: "linear-gradient(135deg, #6d5cff, #10b981)",
  },
  {
    name: "Sherzod Karimov",
    role: "Junior Dev · EPAM",
    text: "Boshqa kurslarda ko'p suv quyilgan, bu yerda esa har bir dars amaliyot. Diplom loyihasini portfolio'ma qo'shib EPAM'ga kirdim.",
    avatar: "linear-gradient(135deg, #10b981, #f5b544)",
  },
  {
    name: "Dilnoza Tursunova",
    role: "Web Dev · O'z biznesi",
    text: "31 yoshda kasb almashtirdim. Endi mijozlarga sayt yasab beraman, oyiga 8-10 mln so'm topaman. Hayot o'zgardi.",
    avatar: "linear-gradient(135deg, #ef4444, #6d5cff)",
  },
];

export default function Reviews() {
  return (
    <section id="otziflar" className="relative overflow-hidden px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-emerald-500">
              Otziflar
            </span>
            <h2 className="font-display mt-3 text-4xl font-bold leading-tight lg:text-5xl">
              1500+ bitiruvchining{" "}
              <span className="text-zinc-500">haqiqiy hikoyalari</span>
            </h2>
          </div>
          <div className="hidden lg:block">
            <div className="font-display text-6xl font-bold text-gold-400">4.9</div>
            <div className="text-sm text-zinc-500">⭐⭐⭐⭐⭐ 1247 sharh</div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="relative rounded-3xl border border-white/10 bg-ink-900/50 p-7"
              style={{ transform: `rotate(${i % 2 === 0 ? "-0.3deg" : "0.3deg"})` }}
            >
              <div className="mb-5 text-4xl text-gold-400 opacity-50">&ldquo;</div>
              <p className="text-zinc-300 leading-relaxed">{r.text}</p>
              <div className="mt-6 flex items-center gap-4">
                <div
                  className="h-12 w-12 rounded-full"
                  style={{ background: r.avatar }}
                ></div>
                <div>
                  <div className="font-display font-bold">{r.name}</div>
                  <div className="text-sm text-zinc-500">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
