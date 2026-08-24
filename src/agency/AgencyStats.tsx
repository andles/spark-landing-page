// The performance metric cards now live in the hero (AgencyHero.tsx), matching
// the /reduce-stockouts-overstock variant. This section keeps the platform
// claim + supporting copy that ties those outcomes to the mechanism.
import ScrollReveal from "./ScrollReveal";

export default function AgencyStats() {
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
                Built for multichannel operators
              </div>
              <h2 className="text-3xl lg:text-[2.8rem] font-bold text-white leading-tight tracking-tight" style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>
                One Inventory Plan for<br />
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  Shopify, FBA &amp; B2B
                </span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-[#b8bfcc] text-base lg:text-lg leading-relaxed max-w-lg">
              Built for operators who have outgrown spreadsheet forecasting but do
              not want another long ERP implementation. Spark turns live sales and
              stock data into decisions your team can review and approve.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
