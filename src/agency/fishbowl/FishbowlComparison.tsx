// ─────────────────────────────────────────────────────────────────────────────
// Fishbowl vs Spark, on the complaint dimensions only. Same table/card
// markup as AgencyComparisonSection.tsx. The Fishbowl column is phrased as
// what reviewers report, not as flat claims about the product.
// ─────────────────────────────────────────────────────────────────────────────
import ScrollReveal from "../ScrollReveal";
import BookACallButton from "../BookACallButton";
import { BOOK_URL, PRIMARY_CTA } from "./links";

const rows = [
  {
    category: "Custom reports",
    fishbowl:
      "Reviewers say the built-in reports don't cover what they need, and that custom ones are slow to get or cost extra.",
    spark:
      "Describe the report you want in the reports playground and it's built from your live data in seconds. Included on every plan.",
  },
  {
    category: "Shopify, Amazon, QuickBooks",
    fishbowl:
      "Reviewers describe syncs that need watching, break after updates, or need a third-party connector to work at all.",
    spark:
      "Native connectors for Shopify, Amazon, and QuickBooks Online. Orders and stock levels sync both ways without a plugin to babysit.",
  },
  {
    category: "Customizing and extending",
    fishbowl:
      "The most common complaint in the reviews we read: a feature is missing and there's no practical way to add it yourself.",
    spark:
      "Full REST API and an MCP server, so your own tools and your own AI can read and write your inventory. No consultant in between.",
  },
  {
    category: "Support and onboarding",
    fishbowl:
      "Reviewers report long waits, tickets that stall, and a steep learning curve that pushed them toward paid training.",
    spark:
      "A small team you can reach. Onboarding is consultative working sessions with a person, and it's included.",
  },
  {
    category: "Where it runs",
    fishbowl:
      "Reviewers running the desktop and server edition mention maintaining the server and updates that break workflows.",
    spark:
      "Cloud-based. Nothing to install or maintain, same experience on desktop, tablet, and phone.",
  },
];

export default function FishbowlComparison() {
  return (
    <section id="compare" className="py-14 lg:py-20 bg-[#06080d] relative">
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
            <span className="text-white">Only the things </span>
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">people actually complain about</span>
          </h2>
          <p className="mt-5 text-lg text-[#b8bfcc] leading-relaxed">
            No feature-grid padding. The Fishbowl column is what reviewers say, not our opinion.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          {/* Desktop table */}
          <div className="hidden md:block rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c1019]">
            {/* Header */}
            <div className="grid grid-cols-[200px_1fr_1fr] border-b border-white/[0.08] bg-white/[0.02]">
              <div className="px-6 py-4" />
              <div className="px-6 py-4 border-l border-white/[0.06]">
                <span className="text-sm font-semibold text-[#8b95a8]">Fishbowl, as reviewers report</span>
              </div>
              <div className="px-6 py-4 border-l border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <img src="/spark_icon.png" alt="Spark" className="w-5 h-5 rounded" />
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
                    <div className="text-[10px] text-white/40 uppercase tracking-wider font-mono mb-1">Fishbowl, as reviewers report</div>
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
          Fishbowl column summarizes themes from 449 public Fishbowl Inventory reviews with a cons
          section. Fishbowl is a trademark of its owner; Spark is not affiliated with Fishbowl.
        </p>

        <div className="mt-8 text-center">
          <BookACallButton
            url={BOOK_URL}
            className="inline-flex items-center h-[46px] px-8 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold hover:scale-[1.02] transition-all duration-300"
          >
            {PRIMARY_CTA}
          </BookACallButton>
        </div>
      </div>
    </section>
  );
}
