// ─────────────────────────────────────────────────────────────────────────────
// Fishbowl vs Spark, row by row, from Fishbowl's public pricing page.
// Shares the table/card layout used by AgencyComparisonSection.tsx.
// ─────────────────────────────────────────────────────────────────────────────
import ScrollReveal from "../ScrollReveal";
import { useCtaLinks, SIGNUP_CTA } from "./links";

const rows = [
  {
    category: "Demand forecasting",
    fishbowl:
      "An add-on on Growth, or included when you move up to Scale at $729 a month.",
    spark:
      "Per-SKU forecasts, seasonal curves, and draft POs, free for one user. Live on Solo at $99 a month.",
  },
  {
    category: "Users",
    fishbowl:
      "2, 5, or 10 users on Essentials, Growth, and Scale.",
    spark:
      "Unlimited users on every paid plan. No meter on SKUs or warehouses either.",
  },
  {
    category: "Custom reports",
    fishbowl:
      "Custom reports are listed as an add-on.",
    spark:
      "Describe the report you want in the reports playground and it's built from your live data in seconds. Included on every plan.",
  },
  {
    category: "Shopify, Amazon, QuickBooks",
    fishbowl:
      "Ecommerce and marketplace integrations are priced separately, and advanced integrations are add-ons.",
    spark:
      "Native connectors for Shopify, Amazon, and QuickBooks Online. Orders and stock levels sync both ways without a plugin to babysit.",
  },
  {
    category: "Customizing and extending",
    fishbowl:
      "An open API is listed on Advanced Manufacturing.",
    spark:
      "Full REST API and an MCP server, so your own tools and your own AI can read and write your inventory. No consultant in between.",
  },
  {
    category: "Getting started",
    fishbowl:
      "Implementation is required, with a 6 to 8 week training certification. Data migration does not include history.",
    spark:
      "Sparki maps your Fishbowl backup, history included, and you approve the import. Onboarding is consultative working sessions with a person, and it's included.",
  },
];

export default function FishbowlComparison() {
  const { signupUrl } = useCtaLinks();
  return (
    // Google Ads sitelink anchors. "reports" (Custom reports / Customizing rows)
    // and "sync" (Shopify, Amazon, QuickBooks row) both land on this table, so
    // the section carries id="reports" and an unstyled wrapper carries id="sync".
    // scroll-mt-16 offsets the fixed 64px header.
    <div id="sync" className="scroll-mt-16">
    <section id="reports" className="py-14 lg:py-20 bg-[#06080d] relative scroll-mt-16">
      <div className="absolute -top-[100px] right-[10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(139,92,246,0.06),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-sm text-[#b8bfcc] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            Side by side
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
          >
            <span className="text-white">Spark vs Fishbowl, </span>
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">line by line</span>
          </h2>
          <p className="mt-5 text-lg text-[#b8bfcc] leading-relaxed">
            Forecasting, team size, reporting, integrations, and getting started.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          {/* Desktop table */}
          <div className="hidden md:block rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c1019]">
            {/* Header */}
            <div className="grid grid-cols-[200px_1fr_1fr] border-b border-white/[0.08] bg-white/[0.02]">
              <div className="px-6 py-4" />
              <div className="px-6 py-4 border-l border-white/[0.06]">
                <span className="text-sm font-semibold text-[#8b95a8]">Fishbowl</span>
              </div>
              <div className="px-6 py-4 border-l border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <img src="/spark-favicon.png" alt="Spark" width="20" height="20" loading="lazy" decoding="async" className="w-5 h-5 rounded" />
                  <span className="text-sm font-semibold text-white">Spark</span>
                </div>
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
                  <p className="text-sm text-[#8b95a8] leading-relaxed">{row.fishbowl}</p>
                </div>
                <div className="px-6 py-5 border-l border-white/[0.04]">
                  <p className="text-sm text-[#b8bfcc] leading-relaxed">{row.spark}</p>
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
                    <div className="text-[10px] text-white/40 uppercase tracking-wider font-mono mb-1">Fishbowl</div>
                    <p className="text-sm text-[#8b95a8] leading-relaxed">{row.fishbowl}</p>
                  </div>
                  <div className="border-t border-white/[0.04] pt-3">
                    <div className="text-[10px] text-white/40 uppercase tracking-wider font-mono mb-1">Spark</div>
                    <p className="text-sm text-[#b8bfcc] leading-relaxed">{row.spark}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <p className="mt-6 text-center text-xs text-[#8b95a8] max-w-2xl mx-auto">
          Fishbowl details come from Fishbowl's public pricing page, checked October 17, 2026.
          Fishbowl is a trademark of its owner; Spark is not affiliated with Fishbowl.
        </p>

        <div className="mt-8 text-center">
          <a href={signupUrl}
            className="inline-flex items-center h-[46px] px-8 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold hover:scale-[1.02] transition-all duration-300"
          >
            {SIGNUP_CTA}
          </a>
        </div>
      </div>
    </section>
    </div>
  );
}
