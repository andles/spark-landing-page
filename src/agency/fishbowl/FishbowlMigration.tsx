// ─────────────────────────────────────────────────────────────────────────────
// "What changes when you switch": the centerpiece of the Fishbowl page.
// Five cards in the AgencyWhySpark card style. Each pairs one Spark capability
// with the Fishbowl review complaint it answers, so the mapping is explicit.
// ─────────────────────────────────────────────────────────────────────────────
import ScrollReveal, { RevealItem } from "../ScrollReveal";

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const cards = [
  {
    number: "01",
    badge: "Migration",
    badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    iconBg: "from-violet-500 to-purple-600",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    title: "Your Fishbowl data comes with you, in minutes",
    description:
      "Give the exports to Sparki in app, or to your own AI assistant over MCP, and your parts, vendors, customers, and history land through a mapped, validated, approval-gated workflow.",
    complaint: "Switching sounds worse than staying.",
    features: ["Automatic field mapping", "Sales history included", "Undo any import"],
  },
  {
    number: "02",
    badge: "MCP",
    badgeColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    iconBg: "from-violet-500 to-cyan-500",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    title: "Point your own AI at your inventory",
    description:
      "Spark ships an MCP server, so Claude, ChatGPT, or whatever your team already uses can query stock, draft POs, and answer questions about your data. The thing Fishbowl won't do, you can now ask for in plain English.",
    complaint: "Missing features, and no way to customize.",
    features: ["Works with any MCP client", "Full REST API too", "No consultant required"],
  },
  {
    number: "03",
    badge: "Reports",
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    iconBg: "from-cyan-500 to-teal-500",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "The report you need, built in seconds, not billed by the hour",
    description:
      "Describe the report in the reports playground and Spark builds it from your live data. Margin by channel, aging stock by vendor, whatever the meeting needs. Save it, share it, run it again tomorrow.",
    complaint: "Reporting is weak, and custom reports cost extra.",
    features: ["Describe it, get it", "Save and rerun", "Export anywhere"],
  },
  {
    number: "04",
    badge: "Forecasting",
    badgeColor: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
    iconBg: "from-fuchsia-500 to-violet-600",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Know what to order, not just what you have",
    description:
      "Spark reads your sales velocity and lead times, flags the SKUs about to run short and the ones piling up, and turns that into reorder points and draft POs you can approve in one click.",
    complaint: "It tracks stock, but doesn't tell me what to buy.",
    features: ["Stockout and overstock alerts", "Reorder points that adapt", "One-click POs"],
  },
  {
    number: "05",
    badge: "Guided launch",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    iconBg: "from-emerald-500 to-cyan-500",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Start with an agent and a person when you need one",
    description:
      "Sparki handles the repeatable migration work. When your operation needs judgment, the Spark team can work through it with you while you get started instead of leaving you with a checklist.",
    complaint: "Steep learning curve, and support that doesn't pick up.",
    features: ["Free monthly forecast", "Agentic onboarding", "Talk to a human"],
  },
];

export default function FishbowlMigration() {
  return (
    // id="migrate" is a Google Ads sitelink anchor (/fishbowl-alternative#migrate).
    // scroll-mt-16 offsets the fixed 64px header so the heading lands below it.
    <section id="migrate" className="py-14 lg:py-20 bg-[#06080d] relative scroll-mt-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(139,92,246,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-sm text-[#b8bfcc] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            What changes when you switch
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
          >
            <span className="text-white">Five things Fishbowl users </span>
            <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">ask us for first</span>
          </h2>
          <p className="mt-5 text-lg text-[#b8bfcc] leading-relaxed">
            We read 449 Fishbowl reviews. Almost nobody complained about stock accuracy. They
            complained about the edges. This is how Spark handles each one.
          </p>
        </ScrollReveal>

        <ScrollReveal staggerChildren={120} className="flex flex-wrap justify-center gap-5">
          {cards.map(({ number, badge, badgeColor, iconBg, icon, title, description, complaint, features }, i) => (
            <RevealItem
              key={badge}
              index={i}
              className="w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
            >
              <div className="relative rounded-2xl border border-white/[0.08] bg-[#0c1019] p-6 flex flex-col h-full hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-300">
                {/* Top row: icon + number */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center shrink-0`}>
                    {icon}
                  </div>
                  <span className="text-2xl font-bold text-white/15 font-mono tabular-nums">{number}</span>
                </div>

                {/* Badge */}
                <span
                  className={`inline-flex items-center self-start rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase mb-4 ${badgeColor}`}
                >
                  {badge}
                </span>

                {/* The complaint this answers */}
                <p className="text-xs text-[#8b95a8] mb-2">
                  <span className="text-white/40 uppercase tracking-wider font-mono text-[10px]">Fishbowl users report</span>
                  <br />
                  <span className="italic">"{complaint}"</span>
                </p>

                {/* Title + description */}
                <h3
                  className="text-xl font-bold text-[#f0f2f5] mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-[#b8bfcc] leading-relaxed flex-1">{description}</p>

                {/* Features */}
                <div className="mt-6 pt-5 border-t border-white/[0.06]">
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {features.map((f) => (
                      <div key={f} className="flex items-center gap-1.5">
                        <CheckIcon />
                        <span className="text-xs text-[#b8bfcc]">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
