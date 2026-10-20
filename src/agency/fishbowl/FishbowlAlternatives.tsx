// ─────────────────────────────────────────────────────────────────────────────
// Direct answers to the Fishbowl comparison searches: "fishbowl competitors",
// "apps like fishbowl", "inflow vs fishbowl", "fishbowl inventory reviews".
// The matching FAQ entries (and FAQPage schema) live in ../campaignFaqs.ts.
// inFlow and Fishbowl details come from each company's public pricing page;
// review themes come from public Fishbowl reviews.
// ─────────────────────────────────────────────────────────────────────────────
import ScrollReveal from "../ScrollReveal";

const competitorLinks = [
  { href: "/inflow-alternative/", label: "Spark vs inFlow" },
  { href: "/cin7-alternative/", label: "Spark vs Cin7" },
  { href: "/zoho-inventory-alternative/", label: "Spark vs Zoho Inventory" },
] as const;

const rows = [
  {
    category: "Starting price",
    inflow: "Lite is $99 a month billed annually, for 2 team members and 1 location.",
    fishbowl: "Essentials is $229 a month billed annually, for 2 users.",
    spark: "Free forecasting for one user. Solo is $99 a month with unlimited users.",
  },
  {
    category: "Users",
    inflow: "2, 5, 10, or 20 team members by plan, then $29 per extra member each month.",
    fishbowl: "2, 5, or 10 users on Essentials, Growth, and Scale.",
    spark: "Unlimited users on every paid plan.",
  },
  {
    category: "Demand forecasting",
    inflow: "Reorder points and recommended reorder points.",
    fishbowl: "An add-on on Growth, or included on Scale at $729 a month.",
    spark: "Per-SKU forecasts, seasonal curves, and draft purchase orders.",
  },
  {
    category: "Manufacturing",
    inflow: "A separate inFlow Manufacturing product, from $169 a month.",
    fishbowl: "Not in Fishbowl Inventory plans. Fishbowl Advanced Manufacturing is quoted from $675 a month.",
    spark: "Multi-level BOMs and manufacturing orders on Scale.",
  },
  {
    category: "Getting started",
    inflow: "A $499 onboarding package, required on most plans.",
    fishbowl: "Implementation and training are sold as separate packages.",
    spark: "Import your Fishbowl backup and run Spark alongside it, free until your Fishbowl contract ends.",
  },
] as const;

export default function FishbowlAlternatives() {
  return (
    <section id="alternatives" className="scroll-mt-16 relative bg-[#06080d] py-14 lg:py-20">
      <div className="relative z-10 mx-auto max-w-[1180px] px-6 md:px-8 lg:px-12">
        <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-semibold text-cyan-300">Comparing Fishbowl alternatives</p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
          >
            Fishbowl competitors, inFlow vs Fishbowl, and what reviews say
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#b8bfcc]">
            Straight answers for teams shopping for apps like Fishbowl.
          </p>
        </ScrollReveal>

        <div className="space-y-6">
          <ScrollReveal>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-7">
              <h3 className="text-xl font-bold text-[#f0f2f5]">Fishbowl competitors and apps like Fishbowl</h3>
              <p className="mt-3 text-base leading-7 text-[#b8bfcc]">
                Common Fishbowl competitors include Spark Inventory, inFlow, Cin7, and Zoho Inventory. Spark is built
                around the buying decision: it forecasts demand for every SKU, weighs stock on hand and incoming purchase
                orders against supplier lead times, and prepares draft purchase orders your team approves. Forecasting is
                free for one user, and every paid plan includes unlimited users.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {competitorLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-10 items-center rounded-full border border-white/[0.1] px-4 text-sm font-medium text-cyan-200 transition hover:border-cyan-300/40 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-7">
              <h3 className="text-xl font-bold text-[#f0f2f5]">inFlow vs Fishbowl</h3>
              <p className="mt-3 text-base leading-7 text-[#b8bfcc]">
                Both include a set number of users per plan and sell manufacturing as a separate product or tier. Spark puts the demand
                forecast at the center and does not charge per user.
              </p>

              {/* Desktop table */}
              <div className="mt-6 hidden overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c1019] md:block">
                <div className="grid grid-cols-[170px_1fr_1fr_1fr] border-b border-white/[0.08] bg-white/[0.02] text-sm font-semibold">
                  <div className="px-5 py-3" />
                  <div className="border-l border-white/[0.06] px-5 py-3 text-[#8b95a8]">inFlow Inventory</div>
                  <div className="border-l border-white/[0.06] px-5 py-3 text-[#8b95a8]">Fishbowl Inventory</div>
                  <div className="border-l border-white/[0.06] px-5 py-3 text-white">Spark</div>
                </div>
                {rows.map((row) => (
                  <div key={row.category} className="grid grid-cols-[170px_1fr_1fr_1fr] border-b border-white/[0.04] last:border-0">
                    <div className="px-5 py-4 text-sm font-semibold text-cyan-400">{row.category}</div>
                    <p className="border-l border-white/[0.04] px-5 py-4 text-sm leading-relaxed text-[#8b95a8]">{row.inflow}</p>
                    <p className="border-l border-white/[0.04] px-5 py-4 text-sm leading-relaxed text-[#8b95a8]">{row.fishbowl}</p>
                    <p className="border-l border-white/[0.04] px-5 py-4 text-sm leading-relaxed text-[#b8bfcc]">{row.spark}</p>
                  </div>
                ))}
              </div>

              {/* Mobile cards */}
              <div className="mt-6 space-y-3 md:hidden">
                {rows.map((row) => (
                  <div key={row.category} className="rounded-xl border border-white/[0.06] bg-[#0c1019] p-4">
                    <div className="mb-3 text-sm font-semibold text-cyan-400">{row.category}</div>
                    <div className="space-y-3">
                    {([
                      ["inFlow Inventory", row.inflow, "text-[#8b95a8]"],
                      ["Fishbowl Inventory", row.fishbowl, "text-[#8b95a8]"],
                      ["Spark", row.spark, "text-[#b8bfcc]"],
                    ] as const).map(([label, text, tone]) => (
                      <div key={label} className="border-t border-white/[0.04] pt-3 first:border-0 first:pt-0">
                        <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-white/40">{label}</div>
                        <p className={`text-sm leading-relaxed ${tone}`}>{text}</p>
                      </div>
                    ))}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs text-[#8b95a8]">
                Sources:{" "}
                <a href="https://www.inflowinventory.com/software-pricing-inflow" target="_blank" rel="noreferrer" className="underline hover:text-white">
                  inFlow pricing
                </a>{" "}
                and{" "}
                <a href="https://www.fishbowlinventory.com/pricing" target="_blank" rel="noreferrer" className="underline hover:text-white">
                  Fishbowl pricing
                </a>
                , checked October 20, 2026.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-7">
              <h3 className="text-xl font-bold text-[#f0f2f5]">What Fishbowl Inventory reviews say</h3>
              <p className="mt-3 text-base leading-7 text-[#b8bfcc]">
                In public reviews, users credit Fishbowl for its manufacturing and inventory features and its QuickBooks
                connection. The recurring complaints are a steep learning curve, reporting they want to be better, and
                slow turnaround on issues that need a developer. Spark answers each one: describe the report you need and
                it is built from your live data, onboarding is working sessions with the team that builds the product,
                and you review the import before anything lands.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
