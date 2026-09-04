import { ArrowRight, Database, Layers3, ShieldCheck } from "lucide-react";
import ScrollReveal, { RevealItem } from "../ScrollReveal";
import { useCtaLinks } from "./links";

const offerPoints = [
  {
    icon: Layers3,
    label: "Run side by side",
    title: "Fishbowl keeps running",
    body: "Nothing is replaced during the evaluation. Compare Fishbowl and Spark using your own inventory and your own numbers.",
    accent: "from-cyan-400 to-teal-400",
  },
  {
    icon: Database,
    label: "Import in minutes",
    title: "Drop in the database backup",
    body: "Sparki maps the data, prepares the import, and asks you to approve it. No migration project and no spreadsheet cleanup.",
    accent: "from-violet-400 to-fuchsia-400",
  },
  {
    icon: ShieldCheck,
    label: "No double payment",
    title: "Free until your contract ends",
    body: "Then choose the Spark plan that fits. If you decide not to continue, export everything at any time.",
    accent: "from-emerald-400 to-cyan-400",
  },
];

export default function FishbowlOffer() {
  const { signupUrl } = useCtaLinks();
  return (
    <section id="offer" className="relative overflow-hidden bg-[#06080d] py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_56%_44%_at_50%_0%,rgba(139,92,246,0.09),transparent_72%)]" />
      <div className="relative z-10 mx-auto max-w-[1180px] px-6 md:px-8 lg:px-12">
        <ScrollReveal className="max-w-3xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">The Fishbowl bridge offer</p>
          <h2 className="mt-4 text-3xl font-bold leading-[1.06] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Free until your Fishbowl contract ends.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#9da7b8] lg:text-lg">
            Start proving the forecast before you pay for another inventory system.
          </p>
        </ScrollReveal>

        <ScrollReveal staggerChildren={100} className="mt-10 grid gap-4 lg:grid-cols-3">
          {offerPoints.map(({ icon: Icon, label, title, body, accent }, index) => (
            <RevealItem key={title} index={index} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#0b0f18] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/[0.15]">
                <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent} opacity-60`} />
                <div className="flex items-start justify-between">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-[#06080d] shadow-lg`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-white/20">0{index + 1}</span>
                </div>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">{label}</p>
                <h3 className="mt-2 text-xl font-semibold leading-snug text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#9da7b8]">{body}</p>
              </article>
            </RevealItem>
          ))}
        </ScrollReveal>

        <ScrollReveal className="mt-7 flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl text-xs leading-5 text-[#7f899a]">
            Free access runs to the end date of your current Fishbowl agreement. Migration and onboarding are included.
          </p>
          <a href={signupUrl} className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 text-sm font-semibold text-white transition hover:scale-[1.02] sm:self-auto">
            Start Free
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
