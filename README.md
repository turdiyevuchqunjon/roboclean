# 🎓 Kurs Landing Page — Next.js 14 (App Router, SSR)

Zamonaviy, sotuvga undaydigan dizayn bilan yasalgan 1 sahifali landing page.

## ✨ Xususiyatlari

- ⚡ **Next.js 14 App Router** + Server-Side Rendering (SSR)
- 🎨 **Tailwind CSS** bilan zamonaviy dizayn
- 📱 To'liq responsiv (mobile, tablet, desktop)
- 🌙 Dark theme (premium ko'rinish)
- 🎯 SEO optimizatsiya qilingan (metadata, OpenGraph)
- 📝 API route bilan forma yuborish
- 🔥 Animatsiyalar va micro-interactions

## 📦 Sahifa bo'limlari

1. **Hero** — Asosiy taklif + sarlavha + CTA
2. **Results** — Kursdan oladigan natijalar (4 ta blok)
3. **About** — Kurs haqida + dastur modullari
4. **Reviews** — O'quvchilar otziflari
5. **Pricing** — 3 ta tarif (Standart / Premium / VIP)
6. **LeadForm** — Ism, telefon, manzil, yosh forma

## 🚀 Ishga tushirish

```bash
# 1. Paketlarni o'rnatish
npm install

# 2. Dev rejimda ishga tushirish
npm run dev
```

Brauzerda oching: [http://localhost:3000](http://localhost:3000)

## 🏗️ Production build

```bash
npm run build
npm start
```

## 📁 Loyiha tuzilishi

```
kurs-landing/
├── app/
│   ├── layout.tsx          # Root layout (SSR metadata, fonts)
│   ├── page.tsx            # Asosiy sahifa
│   ├── globals.css         # Global stillar
│   └── api/
│       └── lead/
│           └── route.ts    # Forma uchun API endpoint
├── components/
│   └── sections/
│       ├── Hero.tsx
│       ├── Results.tsx
│       ├── About.tsx
│       ├── Reviews.tsx
│       ├── Pricing.tsx
│       └── LeadForm.tsx
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## 🎨 Rang palitrasi

- **Ink (chuqur ko'k)**: `#0a0a14` — premium muhit
- **Gold (tilla)**: `#f5b544` — CTA va aksent
- **Violet (binafsha)**: `#6d5cff` — innovatsiya
- **Emerald (yashil)**: `#10b981` — trust signal va "✓"

## ✏️ Matnlarni o'zgartirish

Har bir bo'lim alohida komponentda joylashgan. O'zingizning mahsulotingizga moslab matnlarni shu fayllarda o'zgartiring:

- `components/sections/Hero.tsx` — Sarlavha, subheadline
- `components/sections/Results.tsx` — Natijalar (icons, titles, texts)
- `components/sections/About.tsx` — Modullar ro'yxati
- `components/sections/Reviews.tsx` — Otziflar massivi
- `components/sections/Pricing.tsx` — Tariflar va narxlar
- `components/sections/LeadForm.tsx` — Forma sarlavhasi

## 🔌 Telegram bot integratsiyasi

`app/api/lead/route.ts` faylidagi `console.log` o'rniga Telegram bot orqali yuborish:

```ts
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: CHAT_ID,
    text: `🆕 Yangi ariza:\n\n👤 ${body.fullName}\n📞 ${body.phone}\n📍 ${body.address}\n🎂 ${body.age} yosh`,
  }),
});
```

`.env.local` faylida:
```
TELEGRAM_BOT_TOKEN=your_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

## 📤 Deploy

Eng oson — **Vercel** orqali:

1. GitHub'ga push qiling
2. [vercel.com](https://vercel.com) ga kiring
3. Repository'ni import qiling
4. Deploy ✅

Yoki har qanday Node.js hosting (DigitalOcean, Hetzner, Railway).

---

**Muvaffaqiyatlar! 🚀**
# performance
# roboclean
