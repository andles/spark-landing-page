import {
  Camera,
  Clock,
  HandCoins,
  Network,
  Split,
  Store,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal, { RevealItem } from "../ScrollReveal";

interface Capability {
  title: string;
  body: string;
  signal: string;
  icon: LucideIcon;
}

const capabilities: Capability[] = [
  {
    title: "Computer vision intake",
    body: "A volunteer photographs the item. Spark identifies brand, category, size, condition, and materials, pulls live sold prices from resale marketplaces such as eBay, Vinted, and Depop, assigns a price, prints the label, and creates a digital record. Intake drops from minutes of guesswork to about 30 seconds, and a new volunteer prices exactly like a 20-year veteran.",
    signal: "Every donation becomes a data object",
    icon: Camera,
  },
  {
    title: "Channel routing",
    body: "For every item, Spark computes expected net yield across every channel: this shop's floor, another shop, eBay, your online store, bundling, or rag. It weighs sell-through probability, achievable price, listing labour, and transfer logistics, then tells the volunteer where the item should go. A premium jacket donated in the wrong catchment gets flagged for online or transfer. A fast-fashion top stays local at £3.",
    signal: "Right item, right channel, full value",
    icon: Split,
  },
  {
    title: "Shop demand profiles and placement",
    body: "Every shop develops a learned profile: what sells, at what price, how fast, by category and brand. Incoming donations are matched against those profiles, and Spark generates transfer manifests that ride your existing van network. Stock stops being an accident of where it was donated.",
    signal: "Placement by evidence, not geography",
    icon: Store,
  },
  {
    title: "Automated lifecycle pricing",
    body: "Every item has a clock. Spark knows the decay curve for its category in that location and executes markdowns, relists, channel switches, and outlet routing on schedule, without anyone deciding anything. Dead stock becomes structurally impossible.",
    signal: "Markdowns run themselves",
    icon: Clock,
  },
  {
    title: "Gift Aid maximisation",
    body: "Donor-linked intake raises Gift Aid capture and keeps HMRC compliance automatic. It is pure incremental income, with no behaviour change asked of shop teams.",
    signal: "Compliance built into intake",
    icon: HandCoins,
  },
  {
    title: "The network layer",
    body: "At scale, your chain generates one of the largest live datasets on secondhand pricing and demand in the UK. That unlocks donation supply forecasting by region and season, demand-driven donation appeals, and a valuation engine that gets smarter with every scan. The chain stops running hundreds of independent shops and starts operating one national inventory with hundreds of endpoints.",
    signal: "One national inventory",
    icon: Network,
  },
];

export default function CharityCapabilitiesSection() {
  return (
    <section id="capabilities" className="scroll-mt-16 py-14 lg:py-20 bg-[#06080d] relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute -top-[300px] left-[10%] w-[1200px] h-[1200px] bg-[radial-gradient(circle,rgba(6,182,212,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute -bottom-[200px] right-[10%] w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(139,92,246,0.07),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-8 lg:px-12">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-sm text-[#b8bfcc] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            What Spark does
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>
            <span className="text-white">Every item priced, placed,</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              and sold where it earns most
            </span>
          </h2>
          <p className="mt-5 text-lg text-[#b8bfcc] leading-relaxed">
            Six capabilities, one operating layer. It starts the moment a
            donation is photographed.
          </p>
        </ScrollReveal>

        <ScrollReveal staggerChildren={100} className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <RevealItem key={cap.title} index={i} className="h-full">
                <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 lg:p-8 hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300 overflow-hidden h-full">
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-center gap-4 mb-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-white text-lg font-semibold">{cap.title}</h3>
                  </div>
                  <p className="text-[#8b95a8] text-sm leading-relaxed mb-4">{cap.body}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">{cap.signal}</p>
                </div>
              </RevealItem>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
