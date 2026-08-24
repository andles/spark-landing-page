// IN-STORE PICKUP campaign variant of AgencyStats.
// Identical to AgencyStats.tsx except the platform claim reads
// "The #1 Platform for Shopify, FBA & B2B".
import ScrollReveal, { RevealItem } from "./ScrollReveal";

const stats = [
  {
    value: "Live",
    label: "Location stock signal",
    desc: "Base the pickup promise on inventory at the selected store.",
  },
  {
    value: "Auto",
    label: "Pickup ticket routing",
    desc: "Send the order into the right store's preparation flow.",
  },
  {
    value: "1 flow",
    label: "Promise to handoff",
    desc: "Keep ecommerce, store staff, and inventory aligned.",
  },
];

export default function AgencyStatsPickup() {
  return (
    <section className="py-12 lg:py-16 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.06),transparent_60%)]" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.05),transparent_60%)]" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-end mb-10">
          <ScrollReveal>
            <div>
              <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-sm text-[#b8bfcc] mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                Built for store operations
              </div>
              <h2 className="text-3xl lg:text-[2.8rem] font-bold text-white leading-tight tracking-tight" style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>
                One clean flow from<br />
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  click to counter
                </span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-[#b8bfcc] text-base lg:text-lg leading-relaxed max-w-lg">
              Make pickup easy for the customer without creating a second operating system for the people working in your stores.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal staggerChildren={120} className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
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
      </div>
    </section>
  );
}
