// ─────────────────────────────────────────────────────────────────────────────
// IN-STORE PICKUP campaign variant (Google Ads message-match).
// Identical to AgencyHero.tsx except the hero headline + subhead. Targets
// Shopify merchants with a physical retail component who want in-store pickup.
// ─────────────────────────────────────────────────────────────────────────────
import BookACallButton from "./BookACallButton";
import HeroVideoShowcase from "./HeroVideoShowcase";
import { useCtaLinks } from "./ctaLinks";

const CTA_OPTIONS = { source: "in-store-pickup" } as const;

export default function AgencyHeroPickup() {
  const { bookUrl, signupUrl } = useCtaLinks(CTA_OPTIONS);
  return (
    /* ── HERO: In-Store Pickup campaign variant — only this hero differs from the default page ── */
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
            Shopify pickup, connected to real store stock
          </div>

          {/* H1 */}
          <h1
            className="animate-fade-up delay-100 text-[2.4rem] sm:text-5xl lg:text-[4.25rem] font-bold leading-[1.08] tracking-tight"
            style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
          >
            <span className="text-[#f0f2f5]">The easiest way to offer</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              in-store pickup on Shopify.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-up delay-200 text-sm sm:text-base lg:text-lg text-[#b8bfcc] max-w-2xl mx-auto leading-relaxed mt-5">
            Make an accurate pickup promise online, route the order to the right store, and give staff one clear flow from preparation to customer handoff.
          </p>

          {/* CTA row — single "Book a Call" opens the Calendly scheduler in a
              popup overlay and fires the Google Ads conversion on click. The
              href is a no-JS fallback that still reaches Calendly. */}
          <div className="animate-fade-up delay-300 mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <BookACallButton url={bookUrl} className="h-[46px] px-8 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold text-base transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center">
              Book a Pickup Walkthrough
            </BookACallButton>
            <a href={signupUrl} className="h-[46px] px-8 rounded-full glass border border-white/15 text-[#f0f2f5] font-semibold text-base hover:bg-white/[0.06] hover:border-white/25 hover:scale-[1.02] transition-all duration-300 inline-flex items-center justify-center">
              Start Free
            </a>
          </div>
          <p className="animate-fade-up delay-300 mt-3 text-xs text-[#8b95a8]">Shopify connection · automatic ticket printing · guided rollout</p>
        </div>

        <HeroVideoShowcase />

      </div>
    </section>
  );
}
