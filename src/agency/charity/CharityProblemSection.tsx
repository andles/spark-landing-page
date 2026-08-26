import { Gem, ScanSearch, TrendingDown, Users, type LucideIcon } from "lucide-react";
import ScrollReveal, { RevealItem } from "../ScrollReveal";

interface ProblemCard {
  title: string;
  body: string;
  signal: string;
  icon: LucideIcon;
}

const cards: ProblemCard[] = [
  {
    title: "No barcodes, no data",
    body: "Every donated item is a unique single unit. There is no catalogue entry, no cost price, and no sales history to price against, so pricing runs on instinct.",
    signal: "Millions of judgment calls a year",
    icon: ScanSearch,
  },
  {
    title: "Knowledge walks out the door",
    body: "Pricing skill lives in experienced volunteers and managers. High turnover means the knowledge leaves faster than it can be taught to the next shift.",
    signal: "Expertise that never compounds",
    icon: Users,
  },
  {
    title: "Value found by luck",
    body: "A designer jacket sells for £4 on a rail unless an experienced manager happens to spot it on the sorting table. Spotting is a coincidence, not a system.",
    signal: "Systematic mispricing",
    icon: Gem,
  },
  {
    title: "Dead stock erodes contribution",
    body: "Items sit on the wrong rail in the wrong shop until they are ragged. The loss is quiet, constant, and invisible in any till report.",
    signal: "Retail contribution leaks away",
    icon: TrendingDown,
  },
];

export default function CharityProblemSection() {
  return (
    <section className="py-14 lg:py-20 relative">
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
                The donated-goods problem
              </div>
              <h2 className="text-3xl lg:text-[2.8rem] font-bold text-white leading-tight tracking-tight" style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>
                Millions of unique items.<br />
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  Zero data behind the price.
                </span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-[#b8bfcc] text-base lg:text-lg leading-relaxed max-w-lg">
              A volunteer picks up a donated jacket and must decide what it is,
              what it is worth, and where it should go. Across an estate, that
              decision is made millions of times a year with nothing to go on.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal staggerChildren={120} className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <RevealItem key={card.title} index={i} className="h-full">
                <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 lg:p-8 hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300 overflow-hidden h-full">
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300 mb-5">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-white text-lg font-semibold mb-2">{card.title}</h3>
                  <p className="text-[#8b95a8] text-sm leading-relaxed mb-4">{card.body}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">{card.signal}</p>
                </div>
              </RevealItem>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
