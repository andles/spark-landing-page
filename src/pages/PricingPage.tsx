import { ArrowRight, Bot, CircleCheck, Layers3, ShieldCheck } from 'lucide-react';
import AgencyCTASection from '../agency/AgencyCTASection';
import AgencyFooter from '../agency/AgencyFooter';
import AgencyHeader from '../agency/AgencyHeader';
import AgencyPricingSection from '../agency/AgencyPricingSection';
import ScrollReveal, { RevealItem } from '../agency/ScrollReveal';
import { useCtaLinks } from '../agency/ctaLinks';

const planSignals = [
  {
    icon: Layers3,
    title: 'Choose by operating complexity',
    body: 'Start with the users, warehouses, and workflows your team runs today. Move up when locations, manufacturing, or automation volume expands.',
  },
  {
    icon: Bot,
    title: 'AI planning is part of the product',
    body: 'Every plan includes demand forecasting and Sparki-assisted onboarding. Higher tiers expand automation volume and operating depth.',
  },
  {
    icon: ShieldCheck,
    title: 'Your team keeps approval control',
    body: 'Spark can inspect, map, forecast, and prepare actions while imports and operational writes remain reviewable before execution.',
  },
] as const;

const pricingFaqs = [
  {
    question: 'Can I start using Spark before choosing a paid plan?',
    answer: 'Yes. You can start free for 14 days, bring in your own operating data, and evaluate the workflow before selecting the plan that fits your team.',
  },
  {
    question: 'Is onboarding included?',
    answer: 'Yes. Sparki can inspect, map, validate, and prepare your data in app. You can also use your own compatible AI assistant through Spark MCP. Every import is shown for approval before it lands.',
  },
  {
    question: 'Which plan is best for a multichannel or multi-warehouse team?',
    answer: 'Professional is designed for growing operators that need multiple warehouses, pick and wave workflows, smart email processing, and more advanced demand forecasting. The visible limits on this page make the tradeoff explicit.',
  },
  {
    question: 'Which plan includes manufacturing?',
    answer: 'Business adds bills of materials, manufacturing orders, work orders, barcode and lot tracking, and higher automation volume for more complex operations.',
  },
  {
    question: 'What if our workflow does not fit a standard plan?',
    answer: 'The Custom plan is for larger teams that need custom integrations, security requirements, service levels, or a tailored operating model. Contact the Spark team to scope it.',
  },
] as const;

export function PricingPage() {
  const { signupUrl } = useCtaLinks();

  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />
      <main>
        <section className="relative overflow-hidden px-6 pb-16 pt-32 md:px-8 lg:pb-20 lg:pt-40">
          <div className="absolute inset-0 dot-grid opacity-25" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_-10%,rgba(6,182,212,0.16),transparent_64%)]" />
          <div className="absolute -right-48 top-28 h-[560px] w-[560px] rounded-full bg-violet-500/[0.09] blur-[130px]" />
          <ScrollReveal className="relative z-10 mx-auto max-w-[1080px] text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">Spark Inventory pricing</p>
            <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.75rem]">
              Inventory software pricing
              <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">with the planning included.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
              Start free, onboard with Sparki or your own assistant over MCP, and choose the operating capacity that fits your users, locations, and workflows.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={signupUrl} className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-8 text-sm font-semibold transition-transform hover:scale-[1.02]">
                Start Free
              </a>
              <a href="#plans" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-8 text-sm font-semibold transition-colors hover:bg-white/[0.08]">
                Compare Plans <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="mx-auto mt-7 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/45">
              {['14 days to evaluate', 'Agent-guided onboarding', 'Approval before import'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2"><CircleCheck className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />{item}</span>
              ))}
            </div>
          </ScrollReveal>
        </section>

        <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-16 md:px-8 lg:py-20">
          <ScrollReveal staggerChildren={90} className="mx-auto grid max-w-[1180px] gap-4 md:grid-cols-3">
            {planSignals.map((signal, index) => {
              const Icon = signal.icon;
              return (
                <RevealItem key={signal.title} index={index}>
                  <article className="h-full rounded-3xl border border-white/[0.08] bg-[#090d15] p-6 sm:p-7">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h2 className="mt-6 text-lg font-semibold">{signal.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-[#8b95a8]">{signal.body}</p>
                  </article>
                </RevealItem>
              );
            })}
          </ScrollReveal>
        </section>

        <div id="plans" className="scroll-mt-16">
          <AgencyPricingSection />
        </div>

        <section className="border-y border-white/[0.06] bg-[#080b12] px-6 py-20 md:px-8 lg:py-24">
          <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.65fr_1fr] lg:gap-20">
            <ScrollReveal>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Pricing FAQ</p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Clear answers before you start</h2>
              <p className="mt-4 text-sm leading-7 text-[#8b95a8]">Use your own operation to evaluate Spark. The important question is not how many boxes a plan checks—it is whether the workflow reaches a better decision.</p>
            </ScrollReveal>
            <ScrollReveal staggerChildren={60} className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {pricingFaqs.map((faq, index) => (
                <RevealItem key={faq.question} index={index}>
                  <details className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold marker:content-none">
                      {faq.question}
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300 transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="max-w-3xl pb-1 pr-10 pt-3 text-sm leading-7 text-[#8b95a8]">{faq.answer}</p>
                  </details>
                </RevealItem>
              ))}
            </ScrollReveal>
          </div>
        </section>

        <AgencyCTASection />
      </main>
      <AgencyFooter />
    </div>
  );
}
