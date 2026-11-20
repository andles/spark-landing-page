import { useId, useState } from 'react';
import { ArrowRight, Boxes, CircleCheck, ClipboardList, Factory, Layers, PackageCheck, PackageSearch } from 'lucide-react';
import { Link } from 'react-router-dom';
import AgencyFooter from '../agency/AgencyFooter';
import AgencyHeader from '../agency/AgencyHeader';
import NumberField from '../agency/CalculatorNumberField';
import ScrollReveal, { RevealItem } from '../agency/ScrollReveal';
import { calculateKitsAvailable, kittingFaqs } from '../content/kitting';

// Every card describes shipped behavior in the Spark monorepo (bundle items
// and components, component reservation on sales orders, bundle availability
// from component stock, BOMs and manufacturing orders); keep it that way.
const sparkCards = [
  { Icon: Layers, title: 'A kit SKU with its components', body: 'Create a bundle item and list each component with the quantity used per kit. The kit gets its own SKU and price for selling, and the components stay ordinary items you buy and count.' },
  { Icon: PackageSearch, title: 'Kits available, from component stock', body: 'A bundle holds no stock of its own. Spark works out how many kits you can sell from the stock of its components, so a shortage of one shared part shows up on every kit that uses it.' },
  { Icon: ClipboardList, title: 'Orders reserve the parts', body: 'When a sales order for a kit is reserved, Spark reserves each component times the quantity ordered, in the warehouse that ships it, so two orders cannot promise the same parts.' },
  { Icon: Factory, title: 'Pre-built kits as production', body: 'For kits you assemble ahead of time, define a bill of materials and run a manufacturing order. Components come out of stock and finished kits go in, with yield and scrap recorded.' },
  { Icon: PackageCheck, title: 'Pick, pack and ship by scan', body: 'Pick lists, packing and shipping run on the Spark mobile app with barcode scanning, so the right components go into each box.' },
  { Icon: Boxes, title: 'Reorder the components', body: 'Demand ESP forecasts every stocked SKU and reorder recommendations net stock on hand and on order, so you buy the components before they cap how many kits you can sell.' },
];

const steps = [
  { title: 'Give the kit its own SKU', body: 'Customers order the kit, so it needs a SKU, a name and a price, even if it never sits on a shelf as one box.' },
  { title: 'List the components and quantities', body: 'Write down every item in the kit and how many of each one kit uses, including packaging if you track it.' },
  { title: 'Decide: assemble on demand or ahead', body: 'Assemble on demand when kits vary or sell slowly. Pre-kit when they sell steadily and assembly slows down packing.' },
  { title: 'Count components, not just kits', body: 'Kits available = the smallest of (component on hand ÷ quantity per kit). One missing part stops the kit.' },
  { title: 'Reorder for the kit and for loose sales', body: 'A component sold alone and inside two kits needs a forecast that covers all three, or it runs out first.' },
];

// Example values only. The calculator says so next to the inputs.
const exampleComponents = [
  { name: 'Candle', onHand: '90', perKit: '2' },
  { name: 'Gift box', onHand: '60', perKit: '1' },
  { name: 'Card', onHand: '200', perKit: '1' },
];

const fmt = (value: number) => value.toLocaleString('en-US', { maximumFractionDigits: 0 });

function KitsAvailableCalculator() {
  const idPrefix = useId();
  const [rows, setRows] = useState(exampleComponents);
  const set = (index: number, key: 'onHand' | 'perKit') => (value: string) =>
    setRows((current) => current.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  const result = calculateKitsAvailable(rows.map((row) => ({ onHand: Number(row.onHand || 0), perKit: Number(row.perKit || 0) })));

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-3xl border border-white/[0.08] bg-[#090d15] p-6 sm:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">Components in one kit</p>
        <div className="mt-5 space-y-5">
          {rows.map((row, index) => (
            <div key={row.name} className="grid gap-4 sm:grid-cols-2">
              <NumberField id={`${idPrefix}-${index}-onHand`} label={`${row.name}: on hand`} value={row.onHand} onChange={set(index, 'onHand')} suffix="units" />
              <NumberField id={`${idPrefix}-${index}-perKit`} label={`${row.name}: used per kit`} value={row.perKit} onChange={set(index, 'perKit')} suffix="per kit" />
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs leading-5 text-amber-100/60">The components and numbers are examples, not Spark data. Set a component’s quantity per kit to 0 to leave it out.</p>
      </div>

      <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.05] p-6 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">Kits you can make</p>
          {result ? (
            <>
              <p className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">{fmt(result.kits)}<span className="ml-2 text-lg font-medium text-white/50">kits</span></p>
              <p className="mt-4 text-sm text-white/60"><span className="font-semibold text-white">{rows[result.limitingIndex].name}</span> runs out first.</p>
            </>
          ) : (
            <p className="mt-3 text-sm leading-6 text-white/60">Enter a quantity per kit above zero for at least one component.</p>
          )}
        </div>
        {result && (
          <div className="grid grid-cols-3 gap-3">
            {rows.map((row, index) => (
              <div key={row.name} className="rounded-2xl border border-white/[0.08] bg-[#090d15] p-4">
                <p className="text-xs text-white/50">{row.name} left</p>
                <p className="mt-2 text-xl font-semibold">{fmt(result.leftover[index])}</p>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs leading-5 text-white/45">Kits available = the smallest of (units on hand ÷ units per kit), rounded down.</p>
      </div>
    </div>
  );
}

export function KittingInventoryPage() {
  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />
      <main>
        <article>
          <header className="relative overflow-hidden px-6 pb-12 pt-28 md:px-8 lg:pb-16 lg:pt-32">
            <div className="absolute inset-0 dot-grid opacity-25" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_58%_at_50%_-5%,rgba(6,182,212,0.15),transparent_65%)]" />
            <ScrollReveal className="relative z-10 mx-auto max-w-[960px] text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2 text-xs text-cyan-200">
                <Boxes className="h-4 w-4" aria-hidden="true" /> Kits and bundles
              </div>
              <h1 className="mt-7 text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl">
                Kitting inventory software
                <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">track kits and every component</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
                Kitting turns separate items into one sellable kit. The hard part is the inventory: knowing how many kits you can sell, reserving the right parts for each order, and reordering components before one of them runs out.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="https://app.sparkinventory.com/sign-up" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 text-sm font-semibold">Start Free <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
                <a href="#kits-calculator" className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-semibold hover:bg-white/[0.08]">How many kits can I make?</a>
              </div>
            </ScrollReveal>
          </header>

          <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
              <ScrollReveal>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">What is kitting?</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">One SKU for the customer, many for the warehouse</h2>
                <p className="mt-5 text-sm leading-7 text-[#8b95a8]">Kitting, also called kitting and assembly, groups items that are bought and stored separately into one unit sold under its own SKU: a gift set, a starter kit, a subscription box, or a set of parts sent to a production line. Kits are either assembled when an order arrives or built ahead of time, which is called pre-kitting.</p>
                <p className="mt-5 text-sm leading-7 text-[#8b95a8]">Either way, stock lives in the components. For a longer look at kitting in operations, read <a href="/blog/what-is-kitting-inventory-operations/" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">what kitting is and how it affects inventory</a>.</p>
              </ScrollReveal>
              <ScrollReveal staggerChildren={50} className="space-y-3">
                {steps.map((step, index) => (
                  <RevealItem key={step.title} index={index}>
                    <div className="rounded-2xl border border-white/[0.08] bg-[#090d15] p-5">
                      <h3 className="text-sm font-semibold text-white"><span className="mr-2 font-mono text-cyan-300">{index + 1}.</span>{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#8b95a8]">{step.body}</p>
                    </div>
                  </RevealItem>
                ))}
              </ScrollReveal>
            </div>
          </section>

          <section id="kits-calculator" className="scroll-mt-24 px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto max-w-[1120px]">
              <ScrollReveal className="max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Free kit calculator</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">How many kits can you make?</h2>
                <p className="mt-4 text-sm leading-7 text-[#8b95a8]">Enter what you have of each component and how many go into one kit. The scarcest component sets the number of kits.</p>
              </ScrollReveal>
              <div className="mt-10">
                <KitsAvailableCalculator />
              </div>
            </div>
          </section>

          <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto max-w-[1120px]">
              <ScrollReveal className="max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-violet-300">Kitting in Spark Inventory</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Kits, bundles and pre-built kits in one system</h2>
                <p className="mt-4 text-sm leading-7 text-[#8b95a8]">Spark keeps kits, components, orders and purchasing together, so the kit count you sell from is the one your warehouse can actually build. More on <Link to="/features/inventory/" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">inventory</Link> and <Link to="/features/manufacturing/" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">manufacturing</Link> features.</p>
              </ScrollReveal>
              <ScrollReveal staggerChildren={60} className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sparkCards.map(({ Icon, title, body }, index) => (
                  <RevealItem key={title} index={index}>
                    <article className="h-full rounded-3xl border border-violet-300/15 bg-violet-300/[0.03] p-6">
                      <Icon className="h-5 w-5 text-violet-300" aria-hidden="true" />
                      <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#8b95a8]">{body}</p>
                    </article>
                  </RevealItem>
                ))}
              </ScrollReveal>
            </div>
          </section>

          <section className="px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.65fr_1fr] lg:gap-20">
              <ScrollReveal>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Kitting FAQ</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Kitting inventory questions</h2>
              </ScrollReveal>
              <ScrollReveal staggerChildren={55} className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {kittingFaqs.map((faq, index) => <RevealItem key={faq.question} index={index}><details className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold marker:content-none">{faq.question}<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300 transition-transform group-open:rotate-45">+</span></summary><p className="max-w-3xl pb-1 pr-10 pt-3 text-sm leading-7 text-[#8b95a8]">{faq.answer}</p></details></RevealItem>)}
              </ScrollReveal>
            </div>
          </section>

          <footer className="border-t border-white/[0.06] px-6 py-20 text-center md:px-8 lg:py-24">
            <ScrollReveal className="mx-auto max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Free for one user</p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">Sell kits without overselling the parts</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#b8bfcc]">Set up your kits and components, connect your sales history, and let Demand ESP forecast every SKU and recommend what to reorder each month.</p>
              <ul className="mx-auto mt-6 flex max-w-xl flex-col gap-2 text-left text-sm text-white/70 sm:items-center">
                {['Free: per-SKU Demand ESP forecasts and seasonal curves', 'Free: stock-risk reports and monthly reorder recommendations', 'Solo ($99/mo): continuous forecasts, live alerts and Text with Sparki'].map((item) => <li key={item} className="flex items-center gap-3"><CircleCheck className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />{item}</li>)}
              </ul>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="https://app.sparkinventory.com/sign-up" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 text-sm font-semibold">Start Free <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
                <Link to="/pricing/" className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-semibold hover:bg-white/[0.08]">See pricing</Link>
              </div>
            </ScrollReveal>
          </footer>
        </article>
      </main>
      <AgencyFooter />
    </div>
  );
}
