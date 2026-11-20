import { useId, useState } from 'react';
import { ArrowRight, BadgeCheck, CalendarRange, Calculator, CircleCheck, LineChart, PackageSearch, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import AgencyFooter from '../agency/AgencyFooter';
import AgencyHeader from '../agency/AgencyHeader';
import NumberField from '../agency/CalculatorNumberField';
import ScrollReveal, { RevealItem } from '../agency/ScrollReveal';
import { calculateWeeksOfSupply, weeksOfSupplyFaqs } from '../content/weeksOfSupply';

const windows = [
  { weeks: 4, label: '4 weeks' },
  { weeks: 8, label: '8 weeks' },
  { weeks: 13, label: '13 weeks' },
] as const;

// Every card describes shipped behavior in the Spark monorepo (Velocity
// forecasts, days-on-hand display rules, Portfolio health bands and reorder
// rules); keep it that way when editing.
const sparkCards = [
  { Icon: LineChart, title: 'Forward weeks, not past weeks', body: 'Days on hand divides available stock by the planning rate: the higher of the Demand ESP forecast and recent sales, so stock ahead of a busy season is not overstated.' },
  { Icon: CalendarRange, title: 'Seasons and promotions included', body: 'Each SKU gets its own seasonal curve, borrowed from similar items when it has less than a year of history, and Demand Calendar events lift or lower the forecast for a set window.' },
  { Icon: PackageSearch, title: 'Stockouts do not shrink demand', body: 'Sales lost while an item was out of stock are added back before forecasting, so a stockout does not make the next weeks of supply look longer than they are.' },
  { Icon: BadgeCheck, title: 'Honest when the data is thin', body: 'Days on hand is hidden when there is no real demand signal, shown as a range for lumpy demand, and labeled when it rests on your own estimate instead of sales.' },
  { Icon: ShieldCheck, title: 'Excess flagged and priced', body: 'Stock beyond 180 days of supply counts as excess by default (you can retune the bands). It lowers the item’s health score and is shown as a monthly carrying cost.' },
  { Icon: Calculator, title: 'Orders sized to the forecast', body: 'Reorder recommendations net stock on hand and on order against each SKU’s forecast, and a reorder rule can draft the purchase orders for you to approve.' },
];

// Example values only. The page says so next to the inputs.
const exampleValues = { onHandUnits: '600', onOrderUnits: '', unitsSold: '400', targetWeeks: '' };
type FieldName = keyof typeof exampleValues;

const fmt = (value: number, digits = 0) => value.toLocaleString('en-US', { maximumFractionDigits: digits });

function WeeksOfSupplyCalculator() {
  const idPrefix = useId();
  const [salesWeeks, setSalesWeeks] = useState<number>(8);
  const [values, setValues] = useState(exampleValues);
  const set = (name: FieldName) => (value: string) => setValues((current) => ({ ...current, [name]: value }));
  const num = (name: FieldName) => (values[name] === '' ? undefined : Number(values[name]));

  const result = calculateWeeksOfSupply({
    salesWeeks,
    onHandUnits: num('onHandUnits') ?? 0,
    onOrderUnits: num('onOrderUnits'),
    unitsSold: num('unitsSold') ?? 0,
    targetWeeks: num('targetWeeks'),
  });

  const field = (name: FieldName) => `${idPrefix}-${name}`;
  const hasOnOrder = (num('onOrderUnits') ?? 0) > 0;
  const stats = result
    ? [
        { label: 'Average weekly sales', value: `${fmt(result.weeklySales, 1)} units` },
        { label: 'Days of supply', value: fmt(result.daysOnHand) },
        ...(hasOnOrder ? [{ label: 'Weeks incl. on order', value: fmt(result.weeksWithOnOrder, 1) }] : []),
        ...(result.unitsToTarget !== undefined ? [{ label: 'Units to order for target', value: fmt(result.unitsToTarget) }] : []),
      ]
    : [];

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-3xl border border-white/[0.08] bg-[#090d15] p-6 sm:p-8">
        <fieldset>
          <legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">Sales window</legend>
          <div className="mt-4 grid grid-cols-3 gap-2" role="radiogroup">
            {windows.map((w) => (
              <button
                key={w.weeks}
                type="button"
                role="radio"
                aria-checked={salesWeeks === w.weeks}
                onClick={() => setSalesWeeks(w.weeks)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${salesWeeks === w.weeks ? 'border-cyan-300/60 bg-cyan-300/[0.1] text-white' : 'border-white/[0.1] bg-white/[0.02] text-white/60 hover:text-white'}`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <NumberField id={field('unitsSold')} label={`Units sold in the last ${salesWeeks} weeks`} hint="Leave out weeks when the item was out of stock if you can." value={values.unitsSold} onChange={set('unitsSold')} suffix="units" />
          </div>
          <NumberField id={field('onHandUnits')} label="Units on hand now" hint="Stock you can sell today." value={values.onHandUnits} onChange={set('onHandUnits')} suffix="units" />
          <NumberField id={field('onOrderUnits')} label="Units on order (optional)" hint="Ordered and not yet received." value={values.onOrderUnits} onChange={set('onOrderUnits')} suffix="units" />
          <div className="sm:col-span-2">
            <NumberField id={field('targetWeeks')} label="Target weeks of supply (optional)" hint="Lead time + time between orders + safety stock, in weeks." value={values.targetWeeks} onChange={set('targetWeeks')} suffix="weeks" />
          </div>
        </div>
        <p className="mt-6 text-xs leading-5 text-amber-100/60">The starting numbers are example values, not Spark data. Replace them with your own.</p>
      </div>

      <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.05] p-6 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">Weeks of supply</p>
          {result ? (
            <>
              <p className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">{fmt(result.weeksOnHand, 1)}<span className="ml-2 text-lg font-medium text-white/50">weeks</span></p>
              <p className="mt-4 text-sm text-white/60">At {fmt(result.weeklySales, 1)} units a week, your stock on hand lasts about <span className="font-semibold text-white">{fmt(result.daysOnHand)} days</span>.</p>
            </>
          ) : (
            <p className="mt-3 text-sm leading-6 text-white/60">Enter units sold above zero to see your weeks of supply.</p>
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
        <p className="text-xs leading-5 text-white/45">Weeks of supply = units on hand ÷ average weekly sales. Days of supply = weeks × 7.</p>
      </div>
    </div>
  );
}

export function WeeksOfSupplyCalculatorPage() {
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
                Weeks of supply calculator
                <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">formula, days of supply and order size</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
                Weeks of supply tells you how long your stock lasts at the rate it is selling. Enter recent sales and stock on hand to get weeks and days of supply, and how much to order to reach a target.
              </p>
            </ScrollReveal>
          </header>

          <section className="px-6 pb-20 md:px-8 lg:pb-28">
            <div className="mx-auto max-w-[1120px]">
              <WeeksOfSupplyCalculator />
            </div>
          </section>

          <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
              <ScrollReveal>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">The weeks of supply formula</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">How to calculate weeks of supply</h2>
                <p className="mt-5 text-sm leading-7 text-[#8b95a8]">Average your weekly unit sales over a recent window, then divide the units on hand by that rate. Add units on order to see how long stock lasts once they arrive.</p>
                <p className="mt-6 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5 font-mono text-sm leading-7 text-cyan-100">Weeks of supply = units on hand ÷ average weekly unit sales</p>
                <p className="mt-6 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5 font-mono text-sm leading-7 text-cyan-100">Units to order = (target weeks × weekly sales) − on hand − on order</p>
                <p className="mt-5 text-sm leading-7 text-[#8b95a8]">A target in weeks comes from your lead time, how often you order and your buffer. Size the buffer with the <Link to="/safety-stock-calculator/" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">safety stock calculator</Link> and the trigger with the <Link to="/reorder-point-calculator/" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">reorder point calculator</Link>.</p>
              </ScrollReveal>
              <ScrollReveal>
                <div className="rounded-3xl border border-white/[0.08] bg-[#090d15] p-6 sm:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">Worked example (illustrative numbers)</p>
                  <ol className="mt-5 space-y-4 text-sm leading-7 text-white/75">
                    <li><span className="font-semibold text-white">1. Weekly sales.</span> 400 units sold over the last 8 weeks: 400 ÷ 8 = 50 units a week.</li>
                    <li><span className="font-semibold text-white">2. Weeks of supply.</span> 600 units on hand: 600 ÷ 50 = 12 weeks, or 84 days.</li>
                    <li><span className="font-semibold text-white">3. Order to a target.</span> With 100 units on order and a 20 week target: (20 × 50) − 600 − 100 = 300 units to order.</li>
                  </ol>
                  <p className="mt-5 text-xs leading-5 text-white/45">Past sales assume the next weeks look like the last ones. If a busy season is coming, 12 weeks of supply at last month’s pace can run out in 6.</p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <section className="px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto max-w-[1120px]">
              <ScrollReveal className="max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-violet-300">Demand ESP</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Weeks of supply for every SKU, from the forecast</h2>
                <p className="mt-4 text-sm leading-7 text-[#8b95a8]">A spreadsheet divides by last month. Spark Inventory divides by what each SKU is forecast to sell, in every warehouse, and keeps the number current as orders come in. See how the <Link to="/demand-forecasting-software/" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">demand forecasting software</Link> picks a method for each SKU.</p>
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

          <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.65fr_1fr] lg:gap-20">
              <ScrollReveal>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Weeks of supply FAQ</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Weeks of supply questions</h2>
                <p className="mt-5 text-sm leading-7 text-[#8b95a8]">Checking how fast stock sold through instead? Use the <Link to="/sell-through-rate-calculator/" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">sell-through rate calculator</Link>.</p>
              </ScrollReveal>
              <ScrollReveal staggerChildren={55} className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {weeksOfSupplyFaqs.map((faq, index) => <RevealItem key={faq.question} index={index}><details className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold marker:content-none">{faq.question}<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300 transition-transform group-open:rotate-45">+</span></summary><p className="max-w-3xl pb-1 pr-10 pt-3 text-sm leading-7 text-[#8b95a8]">{faq.answer}</p></details></RevealItem>)}
              </ScrollReveal>
            </div>
          </section>

          <footer className="px-6 py-20 text-center md:px-8 lg:py-24">
            <ScrollReveal className="mx-auto max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Free for one user</p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">Stop recalculating weeks of supply by hand</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#b8bfcc]">Connect your sales history and Demand ESP forecasts every SKU, shows how long its stock lasts, and turns it into monthly reorder recommendations.</p>
              <ul className="mx-auto mt-6 flex max-w-xl flex-col gap-2 text-left text-sm text-white/70 sm:items-center">
                {['Free: per-SKU Demand ESP forecasts and seasonal curves', 'Free: stock-risk reports and monthly reorder recommendations', 'Solo ($99/mo): continuous forecasts, live alerts and Text with Sparki'].map((item) => <li key={item} className="flex items-center gap-3"><CircleCheck className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />{item}</li>)}
              </ul>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="https://app.sparkinventory.com/sign-up" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 text-sm font-semibold">Start Free <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
                <Link to="/inventory-reorder-walkthrough/" className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-semibold hover:bg-white/[0.08]">Watch the Reorder Walkthrough</Link>
              </div>
            </ScrollReveal>
          </footer>
        </article>
      </main>
      <AgencyFooter />
    </div>
  );
}
