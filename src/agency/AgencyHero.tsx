import ScrollReveal, { RevealItem } from "./ScrollReveal";
import BookACallButton from "./BookACallButton";
import { useCtaLinks } from "./ctaLinks";
import HeroVideoShowcase from "./HeroVideoShowcase";
import MobileHeroShowcase from "./MobileHeroShowcase";

// Performance metrics live in the hero (below the CTAs, above the video),
// matching the /reduce-stockouts-overstock variant's placement.
const stats = [
  {
    value: "43%",
    label: "Less excess inventory",
    desc: "Observed across the Spark merchant cohort.",
  },
  {
    value: "56%",
    label: "Fewer stockouts",
    desc: "Observed across the Spark merchant cohort.",
  },
  {
    value: "< 1 hr",
    label: "Weekly planning time",
    desc: "Typical weekly planning time with Spark.",
  },
];

export default function AgencyHero() {
  const { signupUrl } = useCtaLinks();
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
        <div className="max-w-5xl mx-auto text-center">
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass text-sm text-[#b8bfcc] mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            AI inventory management for multichannel brands
          </div>

          {/* H1 */}
          <h1
            className="text-[2.4rem] sm:text-5xl lg:text-[5rem] font-bold leading-[1.08] tracking-tight"
            style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
          >
            <span className="text-[#f0f2f5]">AI Inventory Management</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              That Plans Every Reorder
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-[#b8bfcc] max-w-2xl mx-auto leading-relaxed mt-5">
            Spark turns sales, inventory, and supply data from every channel into
            demand forecasts and draft purchase orders. Your team approves the
            plan, so cash stays out of overstock and bestsellers stay available.
          </p>

          {/* CTA row */}
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={signupUrl}
              className="h-[46px] px-8 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold text-base transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center"
            >
              Start Free
            </a>
            <BookACallButton className="h-[46px] px-8 rounded-full glass border border-white/15 text-[#f0f2f5] font-semibold text-base hover:bg-white/[0.06] hover:border-white/25 hover:scale-[1.02] transition-all duration-300 inline-flex items-center justify-center">
              Book a 30-Minute Demo
            </BookACallButton>
          </div>
          <p className="mt-3 text-xs text-[#8b95a8]">
            Onboard with Sparki in app or your own AI assistant over MCP.
          </p>
        </div>

        {/* Performance metrics: relocated from the stats section to sit directly
            below the CTAs and above the hero video, matching the stockouts
            variant. Width + top margin match the video block below so the
            horizontal edges and vertical rhythm align. */}
        <ScrollReveal staggerChildren={120} className="mt-10 lg:mt-14 w-full max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {stats.map((s, i) => (
            <RevealItem key={i} index={i} className="h-full">
              <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 lg:p-8 hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300 overflow-hidden h-full">
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent mb-3 tabular-nums group-hover:from-cyan-400 group-hover:to-violet-400 transition-all duration-500" style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>
                  {s.value}
                </div>
                <div className="text-white text-sm font-semibold mb-1.5">{s.label}</div>
                <div className="text-[#8b95a8] text-sm leading-relaxed">{s.desc}</div>
              </div>
            </RevealItem>
          ))}
        </ScrollReveal>
        <p className="mt-4 max-w-[1100px] w-full text-center text-[11px] leading-relaxed text-white/35">
          Cohort outcomes are based on observed Spark merchant results. Individual results vary by catalog, channel mix, and operating process.
        </p>

        {/* < sm : tap-to-play video + mockup (mounted only on small screens, and
            deliberately BEFORE the shared showcase; see MobileHeroShowcase).
            sm+ : the shared autoplay video + mockup. */}
        <MobileHeroShowcase />
        <HeroVideoShowcase />

      </div>
    </section>
  );
}
