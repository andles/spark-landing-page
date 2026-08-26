import ScrollReveal, { RevealItem } from "../ScrollReveal";

const steps = [
  {
    title: "Start with intake and pricing",
    body: "Roll out photograph-to-label intake in 15 to 20 shops. The pilot runs standalone, so there is no integration with your existing till or EPOS systems.",
  },
  {
    title: "Measure against baseline shops",
    body: "Track revenue per item in pilot shops against comparable baseline shops. Lift shows within weeks, not quarters.",
  },
  {
    title: "Expand across the estate",
    body: "Once the numbers prove out, switch on channel routing, transfers, and lifecycle pricing across the rest of the estate.",
  },
];

export default function CharityPilotSection() {
  return (
    <section id="pilot" className="scroll-mt-16 py-14 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_54%_at_50%_40%,rgba(6,182,212,0.06),transparent_70%)]" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-sm text-[#b8bfcc] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            How the pilot works
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>
            <span className="text-white">Prove it in 15 to 20 shops,</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              then scale what works
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal staggerChildren={120} className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {steps.map((step, i) => (
            <RevealItem key={step.title} index={i} className="h-full">
              <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 lg:p-8 hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300 overflow-hidden h-full">
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="block font-mono text-xs tracking-[0.14em] text-cyan-300 mb-4">0{i + 1}</span>
                <h3 className="text-white text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-[#8b95a8] text-sm leading-relaxed">{step.body}</p>
              </div>
            </RevealItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
