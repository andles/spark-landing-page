// ─────────────────────────────────────────────────────────────────────────────
// Closing CTA. Same layout and background as AgencyCTASection.tsx; primary
// action matches the hero (booking), free start is secondary.
// ─────────────────────────────────────────────────────────────────────────────
import ScrollReveal from "../ScrollReveal";
import BookACallButton from "../BookACallButton";
import { useCtaLinks, PRIMARY_CTA } from "./links";

export default function FishbowlCTA() {
  const { bookUrl, signupUrl } = useCtaLinks();
  return (
    // id="book" is a Google Ads sitelink anchor (/fishbowl-alternative#book).
    // scroll-mt-16 offsets the fixed 64px header so the heading lands below it.
    <section id="book" className="relative py-20 lg:py-28 bg-[#06080d] scroll-mt-16">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2200px] h-[1100px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 55% at 50% 70%, rgba(80,40,160,0.18), rgba(40,20,100,0.10) 40%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1800px] h-[900px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 80%, rgba(6,182,212,0.08), transparent 60%)" }}
      />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <ScrollReveal className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>
            Bring the Fishbowl data.
            <br className="hidden sm:block" />{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Let Sparki build the migration plan.</span>
          </h2>
          <p className="mt-5 text-[#b8bfcc] text-lg mx-auto leading-relaxed max-w-2xl">
            See how your catalog, history, suppliers, and inventory move through mapping, validation,
            approval, and readiness—then decide whether Spark is worth a broader switch.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <BookACallButton
              url={bookUrl}
              className="inline-flex items-center h-[46px] px-7 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold hover:scale-[1.02] transition-all duration-300"
            >
              {PRIMARY_CTA}
            </BookACallButton>
            <a
              href={signupUrl}
              className="inline-flex items-center h-[46px] px-7 rounded-full glass border border-white/15 text-white text-sm font-semibold hover:bg-white/[0.06] hover:border-white/25 hover:scale-[1.02] transition-all duration-300"
            >
              Start 14-Day Free Trial
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
