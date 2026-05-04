import Hero from "@/components/sections/Hero";
import Results from "@/components/sections/Results";
import About from "@/components/sections/About";
import Reviews from "@/components/sections/Reviews";
import Pricing from "@/components/sections/Pricing";
import LeadForm from "@/components/sections/LeadForm";

// SSR — har so'rovda server-da render qilinadi
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden">
      <Hero />
      {/* <Results /> */}
      {/* <About />
      <Reviews />
      <Pricing /> */}
      <LeadForm />

      <footer className="border-t border-white/5 py-10 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} CodePro · Toshkent ·{" "}
        <a href="tel:+998901234567" className="hover:text-amber-400">
          +998 90 123 45 67
        </a>
      </footer>
    </main>
  );
}
