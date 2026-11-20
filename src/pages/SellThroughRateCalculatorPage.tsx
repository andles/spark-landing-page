import { useId, useState } from 'react';
import { ArrowRight, Calculator, CircleCheck, Gauge, LineChart, PackageSearch, Sparkles, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import AgencyFooter from '../agency/AgencyFooter';
import AgencyHeader from '../agency/AgencyHeader';
import NumberField from '../agency/CalculatorNumberField';
import ScrollReveal, { RevealItem } from '../agency/ScrollReveal';
import { calculateSellThrough, sellThroughFaqs } from '../content/sellThrough';

const periods = [
  { weeks: 1, label: 'Week' },
  { weeks: 4, label: 'Month' },
  { weeks: 13, label: 'Quarter' },
] as const;

// Every card describes shipped behavior in the Spark monorepo (Velocity
// forecasts, Portfolio health score and DemandAnalysis pricing scenarios);
// keep it that way when editing.
const sparkCards = [
  { Icon: LineChart, title: 'Days on hand for every SKU', body: 'Spark shows how long each SKU’s stock lasts in each warehouse, using the higher of the Demand ESP forecast and recent sales, so a slow seller is visible before the season ends.' },
  { Icon: Gauge, title: 'Overstock and dead stock, named', body: 'Each item gets a 0 to 100 health score. Stock past 180 days of supply counts as excess by default and is priced as a monthly carrying cost; units with no demand at all are flagged as dead stock.' },
  { Icon: Tag, title: 'Hold, mark down or bundle', body: 'Ask Claude or ChatGPT through the Spark connector how long an item’s stock takes to clear at the current price, with a 15% markdown, or bundled with an item customers already buy with it, and what margin each keeps.' },
  { Icon: PackageSearch, title: 'Buy less of what sits', body: 'Reorder recommendations follow each SKU’s forecast, netted against stock on hand and on order, so the next purchase of a slow item gets smaller instead of repeating the last one.' },
];

// Example values only. The page says so next to the inputs.
const exampleValues = { beginningUnits: '400', receivedUnits: '100', unitsSold: '300' };
type FieldName = keyof typeof exampleValues;

const fmt = (value: number, digits = 0) => value.toLocaleString('en-US', { maximumFractionDigits: digits });

function SellThroughCalculator() {
  const idPrefix = useId();
  const [periodWeeks, setPeriodWeeks] = useState<number>(4);
  const [values, setValues] = useState(exampleValues);
  const set = (name: FieldName) => (value: string) => setValues((current) => ({ ...current, [name]: value }));
  const num = (name: FieldName) => (values[name] === '' ? 0 : Number(values[name]));

  const result = calculateSellThrough({
    periodWeeks,
    beginningUnits: num('beginningUnits'),
    receivedUnits: num('receivedUnits'),
    unitsSold: num('unitsSold'),
  });

  const field = (name: FieldName) => `${idPrefix}-${name}`;
  const periodLabel = periods.find((p) => p.weeks === periodWeeks)?.label.toLowerCase() ?? 'period';
  const stats = result
    ? [
        { label: 'Units available', value: fmt(result.availableUnits) },
        { label: 'Units left', value: fmt(result.unitsLeft) },
        { label: 'Units sold per week', value: fmt(result.weeklySales, 1) },
        { label: 'Weeks to sell the rest', value: result.weeksToSellOut === null ? 'No sales yet' : fmt(result.weeksToSellOut, 1) },
      ]
    : [];

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-3xl border border-white/[0.08] bg-[#090d15] p-6 sm:p-8">
        <fieldset>
          <legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">Period</legend>
          <div className="mt-4 grid grid-cols-3 gap-2" role="radiogroup">
            {periods.map((p) => (
              <button
                key={p.weeks}
                type="button"
                role="radio"
                aria-checked={periodWeeks === p.weeks}
                onClick={() => setPeriodWeeks(p.weeks)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${periodWeeks === p.weeks ? 'border-cyan-300/60 bg-cyan-300/[0.1] text-white' : 'border-white/[0.1] bg-white/[0.02] text-white/60 hover:text-white'}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <NumberField id={field('beginningUnits')} label="Units on hand at the start" hint="Stock on the first day of the period." value={values.beginningUnits} onChange={set('beginningUnits')} suffix="units" />
          <NumberField id={field('receivedUnits')} label="Units received" hint="Deliveries that arrived during the period. 0 if none." value={values.receivedUnits} onChange={set('receivedUnits')} suffix="units" />
          <div className="sm:col-span-2">
            <NumberField id={field('unitsSold')} label={`Units sold this ${periodLabel}`} hint="Units, not dollars, so markdowns do not distort the rate." value={values.unitsSold} onChange={set('unitsSold')} suffix="units" />
          </div>
        </div>
        <p className="mt-6 text-xs leading-5 text-amber-100/60">The starting numbers are example values, not Spark data. Replace them with your own.</p>
      </div>

      <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.05] p-6 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">Sell-through rate</p>
          {result ? (
            <>
              <p className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">{fmt(result.sellThroughPct, 1)}%<span className="ml-2 text-lg font-medium text-white/50">per {periodLabel}</span></p>
              <p className="mt-4 text-sm text-white/60">You sold <span className="font-semibold text-white">{fmt(result.sellThroughPct, 1)}%</span> of what you had available, about {fmt(result.weeklySellThroughPct, 1)} points a week.</p>
            </>
          ) : (
            <p className="mt-3 text-sm leading-6 text-white/60">Enter units on hand or units received above zero to see your sell-through rate.</p>
          )}
        </div>
        {result && (
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/[0.08] bg-[#090d15] p-5">
                <p className="text-xs text-white/50">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs leading-5 text-white/45">Sell-through rate = units sold ÷ (units at the start + units received) × 100.</p>
      </div>
    </div>
  );
}

export function SellThroughRateCalculatorPage() {
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
                <Calculator className="h-4 w-4" aria-hidden="true" /> Free inventory tool
              </div>
              <h1 className="mt-7 text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl">
                Sell-through rate calculator
                <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">with the formula and an example</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
                Sell-through rate is the share of the stock you had available that actually sold in a period. Enter your units to get the rate, the units left, and how many weeks the rest will take to sell at the same pace.
              </p>
            </ScrollReveal>
          </header>

          <section className="px-6 pb-20 md:px-8 lg:pb-28">
            <div className="mx-auto max-w-[1120px]">
              <SellThroughCalculator />
            </div>
          </section>

          <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
              <ScrollReveal>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">The sell-through formula</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">How to calculate sell-through rate</h2>
                <p className="mt-5 text-sm leading-7 text-[#8b95a8]">Count everything that was available to sell in the period: the units on hand on the first day plus every unit received. Divide the units sold by that total and multiply by 100.</p>
                <p className="mt-6 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5 font-mono text-sm leading-7 text-cyan-100">Sell-through rate = units sold ÷ (beginning inventory + units received) × 100</p>
                <p className="mt-5 text-sm leading-7 text-[#8b95a8]">For one delivery or one season, many buyers divide by units received only. Either works if you use the same method every time. For more on reading the number, see our guide to <a href="/blog/sell-through-rate/" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">sell-through rate</a>. To see how long the remaining stock lasts, use the <Link to="/weeks-of-supply-calculator/" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">weeks of supply calculator</Link>.</p>
              </ScrollReveal>
              <ScrollReveal>
                <div className="rounded-3xl border border-white/[0.08] bg-[#090d15] p-6 sm:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">Worked example (illustrative numbers)</p>
                  <ol className="mt-5 space-y-4 text-sm leading-7 text-white/75">
                    <li><span className="font-semibold text-white">1. Units available.</span> The month starts with 400 units and a delivery of 100 arrives: 400 + 100 = 500 units.</li>
                    <li><span className="font-semibold text-white">2. Sell-through rate.</span> 300 units sell during the month: 300 ÷ 500 × 100 = 60%.</li>
                    <li><span className="font-semibold text-white">3. What is left.</span> 200 units remain. At 75 units a week, they take about 2.7 more weeks to sell.</li>
                  </ol>
                  <p className="mt-5 text-xs leading-5 text-white/45">The same 60% means different things for a seasonal item with 3 weeks of season left and for a staple you restock every month. Compare each product with its own history.</p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <section className="px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto max-w-[1120px]">
              <ScrollReveal className="max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-violet-300">Beyond one number</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Find the SKUs that are not selling through</h2>
                <p className="mt-4 text-sm leading-7 text-[#8b95a8]">One sell-through rate for the whole store hides the items that are stuck. Spark Inventory looks at every SKU and warehouse, and looks ahead with <Link to="/demand-forecasting-software/" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">demand forecasting</Link> instead of only back at last month.</p>
              </ScrollReveal>
              <ScrollReveal staggerChildren={60} className="mt-10 grid gap-4 md:grid-cols-2">
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

          <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.65fr_1fr] lg:gap-20">
              <ScrollReveal>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Sell-through FAQ</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Sell-through rate questions</h2>
                <p className="mt-5 text-sm leading-7 text-[#8b95a8]">Comparing with the whole business? Try the <Link to="/inventory-turnover-calculator/" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">inventory turnover calculator</Link>.</p>
              </ScrollReveal>
              <ScrollReveal staggerChildren={55} className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {sellThroughFaqs.map((faq, index) => <RevealItem key={faq.question} index={index}><details className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold marker:content-none">{faq.question}<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300 transition-transform group-open:rotate-45">+</span></summary><p className="max-w-3xl pb-1 pr-10 pt-3 text-sm leading-7 text-[#8b95a8]">{faq.answer}</p></details></RevealItem>)}
              </ScrollReveal>
            </div>
          </section>

          <footer className="px-6 py-20 text-center md:px-8 lg:py-24">
            <ScrollReveal className="mx-auto max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Free for one user</p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">See which SKUs are sitting on the shelf</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#b8bfcc]">Connect your sales history and Demand ESP forecasts every SKU, flags overstock and dead stock, and turns it into monthly reorder recommendations. No spreadsheet to maintain.</p>
              <ul className="mx-auto mt-6 flex max-w-xl flex-col gap-2 text-left text-sm text-white/70 sm:items-center">
                {['Free: per-SKU Demand ESP forecasts and seasonal curves', 'Free: stock-risk reports and monthly reorder recommendations', 'Solo ($99/mo): continuous forecasts, live alerts and Text with Sparki'].map((item) => <li key={item} className="flex items-center gap-3"><CircleCheck className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />{item}</li>)}
              </ul>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="https://app.sparkinventory.com/sign-up" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 text-sm font-semibold">Start Free <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
                <Link to="/chatgpt-inventory-management/" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-semibold hover:bg-white/[0.08]"><Sparkles className="h-4 w-4" aria-hidden="true" /> Use Spark in ChatGPT or Claude</Link>
              </div>
            </ScrollReveal>
          </footer>
        </article>
      </main>
      <AgencyFooter />
    </div>
  );
}
