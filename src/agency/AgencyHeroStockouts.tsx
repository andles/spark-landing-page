// ─────────────────────────────────────────────────────────────────────────────
// REDUCE STOCKOUTS & OVERSTOCK campaign variant (Google Ads message-match).
// Identical to AgencyHero.tsx except the hero headline + subhead (and a smaller
// lg headline size so the longer headline fits two lines). Targets the
// "AI forecasting" ad angle.
// ─────────────────────────────────────────────────────────────────────────────
import ProductProofCards from "./ProductProofCards";
import BookACallButton from "./BookACallButton";
import { useCtaLinks } from "./ctaLinks";
import HeroVideoShowcase from "./HeroVideoShowcase";


export default function AgencyHeroStockouts() {
  const { signupUrl } = useCtaLinks();
  return (
    /* ── HERO: Reduce Stockouts & Overstock campaign variant. Only this hero differs from the default page. ── */
    <section className="relative min-h-screen bg-[#06080d]">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#06080d]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(6,182,212,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(139,92,246,0.08),transparent_50%)]" />
      <div className="absolute inset-0 dot-grid" />
      <div className="absolute inset-0 noise" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow pill */}
          <div className="animate-fade-up inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass text-sm text-[#b8bfcc] mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            Explainable AI inventory planning
          </div>

          {/* H1 */}
          <h1
            className="animate-fade-up delay-100 text-[2.4rem] sm:text-5xl lg:text-[3.375rem] font-bold leading-[1.08] tracking-tight"
            style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
          >
            <span className="text-[#f0f2f5]">See Demand Before</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              You Commit to More Stock
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-up delay-200 text-sm sm:text-base lg:text-lg text-[#b8bfcc] max-w-2xl mx-auto leading-relaxed mt-5">
            Review seasonal demand, stock coverage, and incoming supply in one place. Use Demand ESP to inform your next reorder, then ask Sparki to prepare a draft for your review.
          </p>

          {/* CTA row */}
          <div className="animate-fade-up delay-300 mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={signupUrl}
              className="h-[46px] px-8 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold text-base transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center"
            >
              Start Forecasting Free
            </a>
            <BookACallButton className="h-[46px] px-8 rounded-full glass border border-white/15 text-[#f0f2f5] font-semibold text-base hover:bg-white/[0.06] hover:border-white/25 hover:scale-[1.02] transition-all duration-300 inline-flex items-center justify-center" />
          </div>
          <p className="animate-fade-up delay-300 mt-3 text-xs text-[#8b95a8]">Agentic onboarding · recommendations with reasoning · your team approves</p>
        </div>

        <ProductProofCards />

        <HeroVideoShowcase />

      </div>
    </section>
  );
}
