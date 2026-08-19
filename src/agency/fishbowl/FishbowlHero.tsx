// ─────────────────────────────────────────────────────────────────────────────
// FISHBOWL ALTERNATIVE campaign hero (Google Ads message-match).
// Same background layers, eyebrow, type scale and video showcase as
// AgencyHero.tsx. Differences: Fishbowl-specific headline + subhead, and a
// single primary CTA (booking) instead of a two-button row.
// ─────────────────────────────────────────────────────────────────────────────
import BookACallButton from "../BookACallButton";
import HeroVideoShowcase from "../HeroVideoShowcase";
import MobileHeroShowcase from "./MobileHeroShowcase";
import { useCtaLinks, PRIMARY_CTA } from "./links";

export default function FishbowlHero() {
  const { bookUrl } = useCtaLinks();
  return (
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
            For teams running Fishbowl Inventory
          </div>

          {/* H1 */}
          <h1
            className="animate-fade-up delay-100 text-[2.4rem] sm:text-5xl lg:text-[4rem] font-bold leading-[1.08] tracking-tight"
            style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
          >
            <span className="text-[#f0f2f5]">Using Fishbowl?</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Here's what's different.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-up delay-200 text-sm sm:text-base lg:text-lg text-[#b8bfcc] max-w-2xl mx-auto leading-relaxed mt-5">
            Fishbowl counts your stock fine. The trouble is everything around it: reports you pay
            a consultant for, Shopify and QuickBooks syncs you babysit, support tickets that sit.
            Spark handles those, and brings your Fishbowl data over in minutes.
          </p>

          {/* Single primary CTA */}
          <div className="animate-fade-up delay-300 mt-7 flex justify-center">
            <BookACallButton
              url={bookUrl}
              className="h-[46px] px-8 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold text-base transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center"
            >
              {PRIMARY_CTA}
            </BookACallButton>
          </div>
          <p className="animate-fade-up delay-300 mt-3 text-xs text-[#8b95a8]">
            20 minutes. Bring a Fishbowl export if you like. No card, no commitment.
          </p>
        </div>

        {/* < sm : tap-to-play video + mockup (mounted only on small screens,
            and deliberately BEFORE the shared showcase; see MobileHeroShowcase).
            sm+ : the shared autoplay video + mockup. */}
        <MobileHeroShowcase />
        <HeroVideoShowcase />
      </div>
    </section>
  );
}
