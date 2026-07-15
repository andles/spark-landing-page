// REDUCE STOCKOUTS & OVERSTOCK campaign variant of AgencyStats.
// Identical to AgencyStats.tsx except the platform claim reads
// "The #1 Platform for Shopify, FBA & B2B".
import ScrollReveal from "./ScrollReveal";

export default function AgencyStatsStockouts() {
  return (
    <section className="py-12 lg:py-16 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.06),transparent_60%)]" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.05),transparent_60%)]" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-end">
          <ScrollReveal>
            <div>
              <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-sm text-[#b8bfcc] mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                Proven Results
              </div>
              <h2 className="text-3xl lg:text-[2.8rem] font-bold text-white leading-tight tracking-tight" style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>
                The #1 Platform for<br />
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  Shopify, FBA &amp; B2B
                </span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-[#b8bfcc] text-base lg:text-lg leading-relaxed max-w-lg">
              Built for high-volume sellers who need accurate stock levels, smarter purchasing decisions, and full visibility across every channel.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
