import ScrollReveal from "./ScrollReveal";

const rows = [
  {
    category: "Pricing",
    spark: "Flat-rate, predictable pricing on every plan. No surprises as you scale.",
    others: "Usage-based or tiered pricing that spikes with catalog size and order volume.",
  },
  {
    category: "Onboarding",
    spark: "AI-powered data migration gets you live in days. No manual CSV wrangling.",
    others: "Manual imports, lengthy setup calls, and expensive onboarding fees.",
  },
  {
    category: "Forecasting",
    spark: "Built-in AI forecasting that analyzes sales velocity and recommends reorder points.",
    others: "No forecasting, or basic static rules that don't adapt to trends.",
  },
  {
    category: "Integrations",
    spark: "Native connectors for Shopify, Amazon, QuickBooks, Stripe. Full REST API and MCP included.",
    others: "Limited integrations. API access often sold as a paid add-on.",
  },
  {
    category: "B2B & Wholesale",
    spark: "Customer portals, vendor workflows, and B2B ordering built into the platform.",
    others: "No B2B portal. Wholesale workflows require third-party tools.",
  },
  {
    category: "Support",
    spark: "Responsive support with real SLAs. No pay-to-talk support tiers.",
    others: "Slow resolution, expensive premium support, opaque cancellation policies.",
  },
];

export default function AgencyComparisonSection() {
  return (
    <section className="py-14 lg:py-20 bg-[#06080d] relative">
      <div className="absolute -top-[100px] right-[10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(139,92,246,0.06),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-sm text-[#b8bfcc] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            Why Teams Switch to Spark
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
          >
            <span className="text-white">See How Spark </span>
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">Compares</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          {/* Desktop table */}
          <div className="hidden md:block rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c1019]">
            {/* Header */}
            <div className="grid grid-cols-[200px_1fr_1fr] border-b border-white/[0.08] bg-white/[0.02]">
              <div className="px-6 py-4" />
              <div className="px-6 py-4 border-l border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <img src="/spark_icon.png" alt="Spark" className="w-5 h-5 rounded" />
                  <span className="text-sm font-semibold text-white">Spark Inventory</span>
                </div>
              </div>
              <div className="px-6 py-4 border-l border-white/[0.06]">
                <span className="text-sm font-semibold text-[#8b95a8]">Others</span>
              </div>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div
                key={row.category}
                className={`grid grid-cols-[200px_1fr_1fr] border-b border-white/[0.04] last:border-0 transition-colors duration-200 hover:bg-white/[0.015] ${
                  i % 2 === 1 ? "bg-white/[0.01]" : ""
                }`}
              >
                <div className="px-6 py-5 flex items-start pt-5">
                  <span className="text-sm font-semibold text-cyan-400">{row.category}</span>
                </div>
                <div className="px-6 py-5 border-l border-white/[0.04]">
                  <p className="text-sm text-[#b8bfcc] leading-relaxed">{row.spark}</p>
                </div>
                <div className="px-6 py-5 border-l border-white/[0.04]">
                  <p className="text-sm text-[#8b95a8] leading-relaxed">{row.others}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {rows.map((row) => (
              <div key={row.category} className="rounded-xl border border-white/[0.06] bg-[#0c1019] p-4">
                <div className="text-sm font-semibold text-cyan-400 mb-3">{row.category}</div>
                <div className="space-y-3">
                  <div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider font-mono mb-1">Spark</div>
                    <p className="text-sm text-[#b8bfcc] leading-relaxed">{row.spark}</p>
                  </div>
                  <div className="border-t border-white/[0.04] pt-3">
                    <div className="text-[10px] text-white/40 uppercase tracking-wider font-mono mb-1">Others</div>
                    <p className="text-sm text-[#8b95a8] leading-relaxed">{row.others}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-10 text-center">
          <a
            href="https://app.sparkinventory.com/sign-up"
            className="inline-flex items-center h-[46px] px-8 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold hover:scale-[1.02] transition-all duration-300"
          >
            Start Free Trial
          </a>
        </div>
      </div>
    </section>
  );
}
