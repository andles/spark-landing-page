import { ArrowRight, BookOpen, Calculator, CircleCheck, ClipboardCheck, PackageSearch, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import AgencyFooter from '../agency/AgencyFooter';
import AgencyHeader from '../agency/AgencyHeader';
import ScrollReveal, { RevealItem } from '../agency/ScrollReveal';

const planningLoop = [
  ['01', 'Capture demand', 'Use orders and sales history to understand what is moving, where it is moving, and how that pattern is changing.'],
  ['02', 'Position inventory', 'Separate on-hand, allocated, available, incoming, and location-specific stock instead of treating one total as the truth.'],
  ['03', 'Model supply', 'Add supplier lead times, order cadence, minimums, price breaks, production capacity, and uncertainty.'],
  ['04', 'Make the decision', 'Choose the timing and quantity that balance availability, working capital, carrying cost, and operating constraints.'],
  ['05', 'Execute and learn', 'Move the approved decision into purchasing, production, transfer, or fulfillment, then update the next plan with what happened.'],
] as const;

const metrics = [
  ['Available inventory', 'On hand minus inventory already allocated or otherwise unavailable', 'Can this stock satisfy the next demand?'],
  ['Days of supply', 'Usable inventory ÷ expected daily demand', 'How long does the current position last?'],
  ['Lead-time demand', 'Expected demand during the replenishment lead time', 'What will sell before new supply can arrive?'],
  ['Reorder point', 'Lead-time demand plus safety stock', 'When should replenishment be triggered?'],
  ['Inventory turnover', 'Cost of goods sold ÷ average inventory', 'How efficiently is inventory being converted into sales?'],
  ['Stockout rate', 'Demand events that cannot be fulfilled ÷ total demand events', 'How often does availability fail the customer?'],
] as const;

const evaluationQuestions = [
  'Can the system distinguish on-hand, available, allocated, and incoming inventory by location?',
  'Does forecasting show the demand evidence and assumptions behind a recommendation?',
  'Can supplier lead times, minimums, price breaks, and order cadence affect the plan?',
  'Does a recommendation become a reviewable purchase order, production run, or transfer?',
  'Can the team see what changed after the last plan and use that in the next decision?',
  'Can onboarding map and validate existing data without making silent assumptions?',
] as const;

const inventoryGuideFaqs = [
  {
    question: 'What is inventory management?',
    answer: 'Inventory management is the system a business uses to know what it has, where it is, what is committed, what is coming, and what action should happen next. It connects item records, stock movements, demand, purchasing, production, warehousing, and fulfillment.',
  },
  {
    question: 'What is the difference between inventory tracking and inventory planning?',
    answer: 'Inventory tracking records the current and historical position of stock. Inventory planning uses demand, supply timing, costs, and operating constraints to decide when and how much to buy, make, or move. A complete inventory system connects both.',
  },
  {
    question: 'What causes stockouts and overstock?',
    answer: 'Common causes include incomplete stock data, changing demand, stale lead times, unrecorded incoming supply, fixed reorder rules, disconnected sales channels, supplier constraints, and decisions that optimize availability without considering cash and carrying cost.',
  },
  {
    question: 'What is a reorder point?',
    answer: 'A reorder point is the inventory position at which replenishment should be triggered. A common starting formula is expected demand during lead time plus safety stock, but the useful decision also needs current allocations, incoming supply, supplier constraints, and changing demand.',
  },
  {
    question: 'How does AI improve inventory management?',
    answer: 'AI can profile source data, detect demand changes, surface missing planning inputs, calculate inventory risk, and prepare replenishment actions. The strongest workflow keeps the supporting evidence visible and gives people approval control over imports and operational writes.',
  },
] as const;

export function InventoryManagementGuidePage() {
  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />
      <main>
        <article>
          <header className="relative overflow-hidden px-6 pb-20 pt-32 md:px-8 lg:pb-28 lg:pt-40">
            <div className="absolute inset-0 dot-grid opacity-25" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_58%_at_50%_-5%,rgba(6,182,212,0.15),transparent_65%)]" />
            <ScrollReveal className="relative z-10 mx-auto max-w-[1040px] text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2 text-xs text-cyan-200">
                <BookOpen className="h-4 w-4" aria-hidden="true" /> Spark field guide
              </div>
              <h1 className="mt-7 text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.7rem]">
                What is inventory management?
                <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">A decision system for stock, supply, and demand.</span>
              </h1>
              <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
                Inventory management is how a business knows what it has, where it is, what is committed, what is coming, and what action should happen next. The best systems connect that operational truth to purchasing, production, transfers, and fulfillment.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="#inventory-loop" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 text-sm font-semibold">Learn the operating loop <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
                <Link to="/features" className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-semibold hover:bg-white/[0.08]">Explore Spark Features</Link>
              </div>
            </ScrollReveal>
          </header>

          <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-16 md:px-8 lg:py-20">
            <div className="mx-auto grid max-w-[1120px] gap-5 lg:grid-cols-2">
              <ScrollReveal className="rounded-3xl border border-white/[0.08] bg-[#090d15] p-7 sm:p-9">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">Inventory tracking</p>
                <h2 className="mt-5 text-2xl font-semibold">What is true right now?</h2>
                <p className="mt-4 text-sm leading-7 text-[#8b95a8]">Tracking records items, locations, receipts, allocations, picks, transfers, adjustments, and counts. It answers where inventory is and how it changed.</p>
                <ul className="mt-6 space-y-3 text-sm text-white/65">
                  {['On-hand and available stock', 'Orders, receipts, and movements', 'Locations, bins, lots, and bundles'].map((item) => <li key={item} className="flex items-center gap-3"><CircleCheck className="h-4 w-4 text-emerald-300" aria-hidden="true" />{item}</li>)}
                </ul>
              </ScrollReveal>
              <ScrollReveal delay={0.08} className="rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.035] p-7 sm:p-9">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">Inventory planning</p>
                <h2 className="mt-5 text-2xl font-semibold">What should happen next?</h2>
                <p className="mt-4 text-sm leading-7 text-[#aab8c1]">Planning combines the stock position with demand, lead times, costs, supplier constraints, incoming supply, and risk to prepare the next buy, run, or transfer.</p>
                <ul className="mt-6 space-y-3 text-sm text-white/75">
                  {['Demand and coverage risk', 'Reorder timing and quantity', 'Cash, carrying cost, and supply constraints'].map((item) => <li key={item} className="flex items-center gap-3"><CircleCheck className="h-4 w-4 text-cyan-300" aria-hidden="true" />{item}</li>)}
                </ul>
              </ScrollReveal>
            </div>
          </section>

          <section id="inventory-loop" className="scroll-mt-16 px-6 py-20 md:px-8 lg:py-28">
            <div className="mx-auto max-w-[1180px]">
              <ScrollReveal className="max-w-4xl">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">The inventory operating loop</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Five connected jobs, not five disconnected tools</h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-[#b8bfcc]">Weak systems stop after reporting a number. Strong systems preserve the context from the original demand signal through the approved operational action.</p>
              </ScrollReveal>
              <ScrollReveal staggerChildren={70} className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {planningLoop.map(([number, title, body], index) => (
                  <RevealItem key={number} index={index} className={index === 4 ? 'md:col-span-2 lg:col-span-1' : undefined}>
                    <article className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6">
                      <span className="font-mono text-xs text-cyan-300">{number}</span>
                      <h3 className="mt-10 text-lg font-semibold">{title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#8b95a8]">{body}</p>
                    </article>
                  </RevealItem>
                ))}
              </ScrollReveal>
            </div>
          </section>

          <section className="relative overflow-hidden border-y border-white/[0.06] bg-[#080b12] px-6 py-20 md:px-8 lg:py-28">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_85%_50%,rgba(139,92,246,0.08),transparent_70%)]" />
            <div className="relative mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.75fr_1fr] lg:gap-20">
              <ScrollReveal>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-violet-300">A practical planning trace</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Why “low stock” is not enough information</h2>
                <p className="mt-5 text-sm leading-7 text-[#8b95a8]">The same on-hand quantity can lead to a different decision when demand velocity, incoming supply, lead time, supplier minimums, or capital constraints change.</p>
                <p className="mt-5 rounded-2xl border border-amber-300/15 bg-amber-300/[0.04] p-5 text-sm leading-7 text-amber-100/70">A reorder formula is a starting point, not a substitute for the operating context around the SKU.</p>
              </ScrollReveal>
              <ScrollReveal staggerChildren={80} className="space-y-3">
                {[
                  [PackageSearch, 'Position', 'On hand, allocated, available, and incoming stock by location'],
                  [Calculator, 'Exposure', 'Expected demand during lead time plus the uncertainty buffer'],
                  [Truck, 'Constraint', 'Supplier timing, minimum, price book, and order cadence'],
                  [ClipboardCheck, 'Decision', 'Review quantity, timing, cash impact, and the draft action'],
                ].map(([Icon, title, body], index) => {
                  const ItemIcon = Icon as typeof PackageSearch;
                  return (
                    <RevealItem key={title as string} index={index}>
                      <div className="flex gap-4 rounded-2xl border border-white/[0.08] bg-[#090d15] p-5 sm:p-6">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-300"><ItemIcon className="h-5 w-5" aria-hidden="true" /></span>
                        <div><h3 className="text-base font-semibold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-[#8b95a8]">{body as string}</p></div>
                      </div>
                    </RevealItem>
                  );
                })}
              </ScrollReveal>
            </div>
          </section>

          <section className="px-6 py-20 md:px-8 lg:py-28">
            <div className="mx-auto max-w-[1180px]">
              <ScrollReveal className="max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Core inventory metrics</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Measure the decision, not just the count</h2>
                <p className="mt-4 text-sm leading-7 text-[#8b95a8]">Definitions vary by operating model. What matters is that every metric uses a consistent source and leads to a question the team can act on.</p>
              </ScrollReveal>
              <ScrollReveal className="mt-10 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#090d15]">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[820px] border-collapse text-left">
                    <thead><tr className="border-b border-white/[0.07] font-mono text-[10px] uppercase tracking-[0.14em] text-white/40"><th className="px-6 py-4 font-medium sm:px-8">Metric</th><th className="px-6 py-4 font-medium">Useful starting definition</th><th className="px-6 py-4 font-medium sm:px-8">Decision it supports</th></tr></thead>
                    <tbody className="divide-y divide-white/[0.06]">{metrics.map(([metric, definition, decision]) => <tr key={metric}><th scope="row" className="px-6 py-5 text-sm font-semibold sm:px-8">{metric}</th><td className="px-6 py-5 text-sm leading-6 text-[#8b95a8]">{definition}</td><td className="px-6 py-5 text-sm leading-6 text-white/65 sm:px-8">{decision}</td></tr>)}</tbody>
                  </table>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.7fr_1fr] lg:gap-20">
              <ScrollReveal>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-300">Software evaluation checklist</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Ask whether the system closes the loop</h2>
                <p className="mt-4 text-sm leading-7 text-[#8b95a8]">Feature counts can hide the handoffs where work falls back into spreadsheets. These questions expose whether the decision remains connected.</p>
                <Link to="/pricing" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">Compare Spark plans <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </ScrollReveal>
              <ScrollReveal staggerChildren={55} className="space-y-3">
                {evaluationQuestions.map((question, index) => <RevealItem key={question} index={index}><div className="flex gap-4 rounded-2xl border border-white/[0.08] bg-[#090d15] p-5"><CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" /><p className="text-sm leading-7 text-white/70">{question}</p></div></RevealItem>)}
              </ScrollReveal>
            </div>
          </section>

          <section className="px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.65fr_1fr] lg:gap-20">
              <ScrollReveal>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Inventory management FAQ</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Direct answers to the foundational questions</h2>
              </ScrollReveal>
              <ScrollReveal staggerChildren={55} className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {inventoryGuideFaqs.map((faq, index) => <RevealItem key={faq.question} index={index}><details className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold marker:content-none">{faq.question}<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300 transition-transform group-open:rotate-45">+</span></summary><p className="max-w-3xl pb-1 pr-10 pt-3 text-sm leading-7 text-[#8b95a8]">{faq.answer}</p></details></RevealItem>)}
              </ScrollReveal>
            </div>
          </section>

          <footer className="border-t border-white/[0.06] bg-[#080b12] px-6 py-20 text-center md:px-8 lg:py-24">
            <ScrollReveal className="mx-auto max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Put the model to work</p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">See the inventory decision on your own data</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#b8bfcc]">Bring the current catalog, sales, stock, suppliers, and lead times. Sparki can map the foundation and prepare the first reviewable plan.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a href="https://app.sparkinventory.com/sign-up" className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 text-sm font-semibold">Start Free</a><Link to="/features/purchasing" className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-semibold hover:bg-white/[0.08]">Explore Purchasing & Planning</Link></div>
            </ScrollReveal>
          </footer>
        </article>
      </main>
      <AgencyFooter />
    </div>
  );
}
