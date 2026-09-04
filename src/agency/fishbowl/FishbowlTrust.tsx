// ─────────────────────────────────────────────────────────────────────────────
// Trust + support: small team, you talk to a human, onboarding is included.
// Reuses the existing integration-logo marquee (AgencyTrustBar).
// ─────────────────────────────────────────────────────────────────────────────
import ScrollReveal, { RevealItem } from "../ScrollReveal";
import AgencyTrustBar from "../AgencyTrustBar";

const points = [
  {
    title: "You reach a person, not a queue",
    body:
      "Spark is a small team. When you write in, someone who works on the product reads it and answers. There is no premium support tier to buy your way into.",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    iconBg: "from-cyan-500 to-teal-500",
  },
  {
    title: "Onboarding is working sessions, and it's included",
    body:
      "We sit with you, look at your Fishbowl setup, and map it into Spark together. Vendors, BOMs, channels, the reports you run every Monday. It is part of getting started, not a line item.",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    iconBg: "from-violet-500 to-purple-600",
  },
  {
    title: "Free until your Fishbowl contract ends",
    body:
      "Drop in your Fishbowl database backup, run Spark alongside it, and decide with real numbers. When your Fishbowl agreement ends, choose a Spark plan or export everything at any time.",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    iconBg: "from-fuchsia-500 to-violet-600",
  },
];

export default function FishbowlTrust() {
  return (
    <section id="support" className="py-14 lg:py-20 bg-[#06080d] relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.06),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-sm text-[#b8bfcc] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            Support that picks up
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
          >
            <span className="text-white">A small team </span>
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">you can actually reach</span>
          </h2>
          <p className="mt-5 text-lg text-[#b8bfcc] leading-relaxed">
            A quarter of the Fishbowl reviews we read were about support. Here is how we work instead.
          </p>
        </ScrollReveal>

        <ScrollReveal staggerChildren={120} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {points.map((p, i) => (
            <RevealItem key={p.title} index={i} className="h-full">
              <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300 overflow-hidden h-full">
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.iconBg} flex items-center justify-center mb-5`}>
                  {p.icon}
                </div>
                <h3
                  className="text-lg font-bold text-[#f0f2f5] mb-2 leading-snug"
                  style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
                >
                  {p.title}
                </h3>
                <p className="text-sm text-[#b8bfcc] leading-relaxed">{p.body}</p>
              </div>
            </RevealItem>
          ))}
        </ScrollReveal>

      </div>

      {/* Existing integration-logo marquee: the systems Fishbowl users care about */}
      <div className="mt-6">
        <AgencyTrustBar />
      </div>
    </section>
  );
}
