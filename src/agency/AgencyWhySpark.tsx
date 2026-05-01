import ScrollReveal, { RevealItem } from "./ScrollReveal";

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const cards = [
  {
    number: "01",
    badge: "Onboarding",
    badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    iconBg: "from-violet-500 to-purple-600",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    title: "AI Data Migration",
    description:
      "Our team handles your full data migration. Products, sales history, suppliers, and customers imported with zero manual setup.",
    features: ["Automated field mapping", "Zero-downtime cutover", "Full validation"],
  },
  {
    number: "02",
    badge: "AI Agent",
    badgeColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    iconBg: "from-violet-500 to-cyan-500",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Drive Efficiency",
    description:
      "Spark's AI agent acts as an extension of your team with real-time insights and actionable recommendations to optimize operations.",
    features: ["Proactive alerts", "Natural language chat", "One-click actions"],
  },
  {
    number: "03",
    badge: "Sales Portals",
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    iconBg: "from-cyan-500 to-teal-500",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Boost Revenue",
    description:
      "White-labeled seller and vendor portals transform how customers buy and suppliers stay aligned, unlocking new revenue channels.",
    features: ["Branded portals", "Self-service ordering", "Live catalog sync"],
  },
];

export default function AgencyWhySpark() {
  return (
    <section id="solutions" className="py-14 lg:py-20 bg-[#06080d] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(139,92,246,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-sm text-[#b8bfcc] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            Why Spark?
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
          >
            <span className="text-white">The </span>
            <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">Smarter Way</span>
            <span className="text-white"> to Scale</span>
          </h2>
          <p className="mt-5 text-lg text-[#b8bfcc] leading-relaxed">
            Three steps to transform your inventory operations from reactive to predictive.
          </p>
        </ScrollReveal>

        <ScrollReveal staggerChildren={120} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map(({ number, badge, badgeColor, iconBg, icon, title, description, features }, i) => (
            <RevealItem key={badge} index={i}>
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

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href="#core-capabilities"
            className="inline-flex items-center gap-2 h-[46px] px-8 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold text-sm hover:scale-[1.02] transition-all duration-300"
          >
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
