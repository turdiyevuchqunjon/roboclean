import MetaPixel from "@/components/sections/MetaPixel";
import UTMTracker from "@/components/UTMTracker";
import "./globals.css"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body>
        <MetaPixel />
        <UTMTracker />
        {children}
      </body>
    </html>
  );
}