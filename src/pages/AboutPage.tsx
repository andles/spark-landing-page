import { ArrowRight, Bot, CircleCheck, Database, ShieldCheck, Waypoints } from 'lucide-react';
import { Link } from 'react-router-dom';
import AgencyFooter from '../agency/AgencyFooter';
import AgencyHeader from '../agency/AgencyHeader';
import BookACallButton from '../agency/BookACallButton';
import ScrollReveal, { RevealItem } from '../agency/ScrollReveal';
import { useCtaLinks } from '../agency/ctaLinks';

const principles = [
  {
    icon: Database,
    number: '01',
    title: 'The operating truth comes first',
    body: 'A forecast is only useful when products, locations, orders, suppliers, lead times, and incoming supply agree. Spark starts by making that foundation visible and ready.',
  },
  {
    icon: Waypoints,
    number: '02',
    title: 'Every recommendation needs a path to action',
    body: 'Inventory intelligence should not end in another dashboard. Spark carries the demand evidence into a reviewable purchasing, fulfillment, or production decision.',
  },
  {
    icon: ShieldCheck,
    number: '03',
    title: 'AI does the work. People keep control.',
    body: 'Sparki and Spark MCP can inspect, map, validate, forecast, and prepare actions. Imports and operational writes remain previewable and approval-led.',
  },
] as const;

const audiences = [
  ['Multichannel brands', 'Keep Shopify, Amazon, wholesale, and location inventory connected to one planning process.', '/shopify-inventory-management'],
  ['Inventory operators', 'Replace static reorder sheets with explainable risk, timing, quantities, and draft purchase actions.', '/reduce-stockouts-overstock'],
  ['3PL teams', 'Offer client-scoped inventory planning using price books, run economics, and governed operator workflows.', '/3pl'],
  ['Manufacturers', 'Connect bills of materials, component availability, production work, and finished-goods demand.', '/features/manufacturing'],
] as const;

export function AboutPage() {
  const { signupUrl } = useCtaLinks();

  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />
      <main>
        <section className="relative min-h-[760px] overflow-hidden px-6 pb-24 pt-32 md:px-8 lg:flex lg:items-center lg:pb-28 lg:pt-36">
          <div className="absolute inset-0 dot-grid opacity-25" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_30%_0%,rgba(6,182,212,0.14),transparent_66%)]" />
          <div className="absolute bottom-[-220px] right-[-120px] h-[680px] w-[680px] rounded-full border border-violet-400/10 bg-violet-500/[0.06] blur-[2px]" />
          <div className="relative mx-auto grid w-full max-w-[1180px] gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <ScrollReveal>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">About Spark Inventory</p>
              <h1 className="mt-6 text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.75rem]">
                Inventory planning should
                <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">end in a decision.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
                Spark connects the records that describe an inventory operation with the reasoning and approval path behind what happens next, from onboarding through forecasting, purchasing, warehousing, and production.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={signupUrl} className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 text-sm font-semibold transition-transform hover:scale-[1.02]">Start Free</a>
                <BookACallButton className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-semibold transition-colors hover:bg-white/[0.08]">Talk With the Spark Team</BookACallButton>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12} className="relative">
              <div className="rounded-[2rem] border border-white/[0.1] bg-[#090d15]/90 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur sm:p-8">
                <div className="flex items-center justify-between border-b border-white/[0.07] pb-5">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">Spark operating model</p>
                    <p className="mt-2 text-lg font-semibold">Evidence → decision → control</p>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300"><Bot className="h-5 w-5" aria-hidden="true" /></span>
                </div>
                <div className="mt-6 space-y-3">
                  {[
                    ['Understand', 'Products, orders, stock, supply, and history'],
                    ['Reason', 'Demand, timing, economics, and operating constraints'],
                    ['Prepare', 'A mapped import or reviewable operational action'],
                    ['Approve', 'A person decides what actually lands or executes'],
                  ].map(([label, body], index) => (
                    <div key={label} className="flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                      <span className="font-mono text-xs text-cyan-300">0{index + 1}</span>
                      <div><p className="text-sm font-semibold">{label}</p><p className="mt-1 text-xs leading-5 text-[#8b95a8]">{body}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-20 md:px-8 lg:py-28">
          <div className="mx-auto max-w-[1180px]">
            <ScrollReveal className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">What guides the product</p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Built around the decision, not the demo</h2>
            </ScrollReveal>
            <ScrollReveal staggerChildren={90} className="mt-12 grid gap-4 md:grid-cols-3">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <RevealItem key={principle.number} index={index}>
                    <article className="h-full rounded-3xl border border-white/[0.08] bg-[#090d15] p-6 sm:p-7">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-white/30">{principle.number}</span>
                        <Icon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                      </div>
                      <h3 className="mt-10 text-xl font-semibold">{principle.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#8b95a8]">{principle.body}</p>
                    </article>
                  </RevealItem>
                );
              })}
            </ScrollReveal>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-20 md:px-8 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_65%_at_85%_50%,rgba(139,92,246,0.08),transparent_70%)]" />
          <div className="relative mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.7fr_1fr] lg:gap-20">
            <ScrollReveal>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-violet-300">Who Spark is for</p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Operators responsible for both availability and cash</h2>
              <p className="mt-5 text-sm leading-7 text-[#8b95a8]">The common thread is an inventory decision that has outgrown disconnected spreadsheets, store plugins, or reports without an execution path.</p>
              <Link to="/what-is-inventory-management" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">Read the inventory management guide <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </ScrollReveal>
            <ScrollReveal staggerChildren={70} className="grid gap-3 sm:grid-cols-2">
              {audiences.map(([title, body, href], index) => (
                <RevealItem key={title} index={index}>
                  <Link to={href} className="group block h-full rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition hover:border-white/[0.15] hover:bg-white/[0.04]">
                    <CircleCheck className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                    <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#8b95a8]">{body}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-cyan-300">Explore the workflow <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                  </Link>
                </RevealItem>
              ))}
            </ScrollReveal>
          </div>
        </section>

        <section className="border-t border-white/[0.06] bg-[#080b12] px-6 py-20 text-center md:px-8 lg:py-24">
          <ScrollReveal className="mx-auto max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Start with the operation you have</p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">Bring the data. See the decision path.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#b8bfcc]">Use Sparki in app or your own compatible assistant over MCP to inspect the current operation, prepare the onboarding plan, and show exactly what is ready for approval.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={signupUrl} className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 text-sm font-semibold">Start Free</a>
              <Link to="/contact" className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-semibold hover:bg-white/[0.08]">Contact Spark</Link>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <AgencyFooter />
    </div>
  );
}
