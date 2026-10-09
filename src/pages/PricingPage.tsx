import { ArrowRight, CircleCheck, Database, Gauge, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import AgencyCTASection from '../agency/AgencyCTASection';
import AgencyFooter from '../agency/AgencyFooter';
import AgencyHeader from '../agency/AgencyHeader';
import AgencyPricingSection from '../agency/AgencyPricingSection';
import ScrollReveal, { RevealItem } from '../agency/ScrollReveal';
import { useCtaLinks, withSignupIntent } from '../agency/ctaLinks';
import { MIGRATION_HELP_LINE, pricingFaqs } from '../agency/pricingData';
import { useScrollToHashOnMount } from '../hooks/useScrollToHash';

const planSignals = [
  {
    icon: Gauge,
    title: 'One visible scale meter',
    body: 'Paid plans include a clear monthly order allowance, then add capacity in predictable 2,500-order blocks. Free stays focused on forecasting.',
  },
  {
    icon: UsersRound,
    title: 'Free for one operator',
    body: 'Free is a focused single-user workspace. Paid plans include unlimited users, so buyers, warehouse leads, finance, and advisors can work from the same inventory picture.',
  },
  {
    icon: Database,
    title: 'A data foundation that compounds',
    body: 'Bring data from commerce platforms, spreadsheets, or other systems. Spark Inventory preserves demand, supply, and decision context so every forecast starts smarter.',
  },
] as const;

const PRICING_HERO_CTA_OPTIONS = { source: 'pricing_page' } as const;

export function PricingPage() {
  const { signupUrl } = useCtaLinks(PRICING_HERO_CTA_OPTIONS);
  const freeSignupUrl = withSignupIntent(signupUrl, { plan: 'free' });
  useScrollToHashOnMount();

  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />
      <main>
        <section className="relative overflow-hidden px-6 pb-16 pt-28 md:px-8 lg:pb-20 lg:pt-32">
          <div className="absolute inset-0 dot-grid opacity-25" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_-10%,rgba(163,230,53,0.12),rgba(6,182,212,0.08)_38%,transparent_68%)]" />
          <div className="absolute -right-48 top-28 h-[560px] w-[560px] rounded-full bg-violet-500/[0.1] blur-[130px]" />
          <ScrollReveal className="relative z-10 mx-auto max-w-[1080px] text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime-200">Spark Inventory pricing</p>
            <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-bold leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-[4.85rem]">
              Upgrade from spreadsheets
              <span
                className="block bg-gradient-to-r from-lime-200 via-cyan-200 to-violet-300 bg-clip-text pb-[0.1em] text-transparent"
                style={{ fontFamily: "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif", fontStyle: 'italic', fontWeight: 400 }}
              >
                or legacy inventory software
              </span>
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
              Free covers one user. Pulse, Operate, and Scale add live planning, purchasing, and manufacturing, with unlimited users and a 14-day free trial.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={freeSignupUrl} className="inline-flex h-12 items-center justify-center rounded-full bg-lime-300 px-8 text-sm font-semibold text-[#071009] transition-all hover:scale-[1.02] hover:bg-lime-200">
                Start free
              </a>
              <a href="#plans" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-8 text-sm font-semibold transition-colors hover:bg-white/[0.08]">
                Compare Plans <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="mx-auto mt-7 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/45">
              {['1 user on Free', 'Unlimited users on paid plans', 'No SKU limits'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2"><CircleCheck className="h-3.5 w-3.5 text-lime-300" aria-hidden="true" />{item}</span>
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

        <section aria-labelledby="upgrading-heading" className="px-6 py-14 md:px-8 lg:py-16">
          <ScrollReveal className="mx-auto max-w-[1080px] rounded-3xl border border-white/[0.08] bg-[#090d15] p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Upgrading from another system</p>
            <h2 id="upgrading-heading" className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Bring the history you already have</h2>
            <ul className="mt-6 grid gap-4 text-sm leading-7 text-[#b8bfcc] md:grid-cols-2">
              <li className="flex gap-3">
                <CircleCheck className="mt-1 h-4 w-4 shrink-0 text-lime-300" aria-hidden="true" />
                <span>
                  Moving from Fishbowl?{' '}
                  <Link to="/fishbowl-alternative/#offer" className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
                    See the Fishbowl bridge offer.
                  </Link>
                </span>
              </li>
              <li className="flex gap-3">
                <CircleCheck className="mt-1 h-4 w-4 shrink-0 text-lime-300" aria-hidden="true" />
                <span>{MIGRATION_HELP_LINE}</span>
              </li>
            </ul>
          </ScrollReveal>
        </section>

        <div id="plans" className="scroll-mt-16">
          <AgencyPricingSection detailed />
        </div>

        <section id="faq" className="scroll-mt-16 border-y border-white/[0.06] bg-[#080b12] px-6 py-20 md:px-8 lg:py-24">
          <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.65fr_1fr] lg:gap-20">
            <ScrollReveal>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Pricing FAQ</p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Clear answers before you start</h2>
              <p className="mt-4 text-sm leading-7 text-[#8b95a8]">Three core plans cover forecasting through execution. Scale and Custom are separate advanced paths for manufacturers and multi-client operators.</p>
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
