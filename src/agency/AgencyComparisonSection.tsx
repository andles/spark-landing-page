import ScrollReveal from "./ScrollReveal";

const rows = [
  { feature: "Real-time multi-channel sync", spark: true, others: false },
  { feature: "AI demand forecasting", spark: true, others: false },
  { feature: "MCP protocol support", spark: true, others: false },
  { feature: "Built-in B2B/wholesale portal", spark: true, others: false },
  { feature: "No per-order fees", spark: true, others: false },
  { feature: "Onboarding in under 1 day", spark: true, others: false },
];

const CheckIcon = () => (
  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const XIcon = () => (
  <svg className="w-4 h-4 text-[#8b95a8]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function AgencyComparisonSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#06080d] relative">
      <div className="absolute -top-[100px] right-[10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(139,92,246,0.06),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-sm text-[#b8bfcc] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            Why Switch
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>
            <span className="text-white">Spark vs. </span>
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">the alternatives</span>
          </h2>
          <p className="mt-5 text-lg text-[#b8bfcc] leading-relaxed">
            Modern inventory software shouldn&apos;t feel like it was built in 2010.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden">
            {/* Gradient border glow */}
            <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-cyan-500/30 via-violet-500/20 to-transparent" style={{ animation: "borderGlow 4s ease-in-out infinite" }}>
              <div className="absolute inset-0 rounded-2xl bg-[#06080d]" />
            </div>

            <div className="relative">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_120px_120px] gap-4 px-6 py-4 border-b border-white/[0.06] bg-white/[0.02]">
                <span className="text-sm font-semibold text-[#f0f2f5]">Feature</span>
                <span className="text-center text-sm font-semibold text-cyan-400">Spark</span>
                <span className="text-center text-sm font-semibold text-[#8b95a8]">Others</span>
              </div>

              {/* Rows */}
              {rows.map((row, i) => (
                <div key={row.feature} className={`grid grid-cols-[1fr_120px_120px] gap-4 px-6 py-4 border-b border-white/[0.04] last:border-0 transition-colors duration-200 hover:bg-white/[0.02] ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                  <span className="text-sm text-[#b8bfcc]">{row.feature}</span>
                  <div className="flex justify-center">
                    {row.spark ? <CheckIcon /> : <XIcon />}
                  </div>
                  <div className="flex justify-center">
                    {row.others ? <CheckIcon /> : <XIcon />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
