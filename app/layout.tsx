import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodePro — 6 oyda Senior Frontend Developer bo'l",
  description:
    "0 dan boshlab Frontend Developer kasbini egallang. JavaScript, React, Next.js. 1500+ bitiruvchi, 92% ish bilan ta'minlandi.",
  openGraph: {
    title: "CodePro — Frontend Developer Kursi",
    description: "6 oyda kasb egallang, $1000+ daromadga chiqing",
    type: "website",
    locale: "uz_UZ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Bricolage+Grotesque:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink-950 text-zinc-100 antialiased">{children}</body>
    </html>
  );
}
