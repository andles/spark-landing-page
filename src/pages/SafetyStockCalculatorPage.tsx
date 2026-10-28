import { useId, useState } from 'react';
import { ArrowRight, BadgeCheck, CalendarRange, Calculator, CircleCheck, Crosshair, MessageSquareText, SlidersHorizontal, Sparkles, TrendingUp, Truck, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';
import AgencyFooter from '../agency/AgencyFooter';
import AgencyHeader from '../agency/AgencyHeader';
import NumberField from '../agency/CalculatorNumberField';
import ScrollReveal, { RevealItem } from '../agency/ScrollReveal';
import { calculateSafetyStockDetails, comparisonServiceLevels, safetyStockFaqs, serviceLevelSafetyStock, zForServiceLevelPct, type SafetyStockCalculatorMethod } from '../content/safetyStock';

const methods: { id: SafetyStockCalculatorMethod; label: string; summary: string }[] = [
  { id: 'service-level', label: 'Service level', summary: 'Safety stock = Z × √(lead time × demand SD² + daily demand² × lead time SD²)' },
  { id: 'max-average', label: 'Max and average', summary: 'Safety stock = (max daily demand × max lead time) − (average daily demand × average lead time)' },
  { id: 'days-of-cover', label: 'Days of cover', summary: 'Safety stock = average daily demand × safety days' },
];

// How Demand ESP sizes safety stock. Every card describes shipped behavior in
// the Spark monorepo (SafetyStockMath, Forecasting and Velocity services);
// keep it that way when editing.
const demandEspCards = [
  { Icon: Crosshair, title: 'Variability from forecast misses, not raw swings', body: 'The calculator above measures how much demand moves. Spark measures how far Demand ESP’s forecast actually missed. Swings the forecast saw coming, like a seasonal peak, do not inflate the buffer, so you hold less stock for the same protection.' },
  { Icon: Waves, title: 'Measured where your next order lands', body: 'Only misses at the horizon a purchase order placed today would cover are counted, over the last year of monthly forecasts. Until an item has three scored months, Spark uses the forecast’s own confidence band instead.' },
  { Icon: Truck, title: 'Real lead time spread per supplier', body: 'Lead time variability comes from completed purchase orders, so a supplier who is sometimes a week late gets a bigger buffer than one who is always on time.' },
  { Icon: BadgeCheck, title: 'A model picked for each SKU, with a trust grade', body: 'Demand ESP sorts every SKU as steady, trending, seasonal or intermittent, backtests several models on its own history and keeps the best one. Each forecast gets an A to D grade with the reasons behind it.' },
  { Icon: CalendarRange, title: 'Stockouts, seasons, promotions and new items', body: 'Sales lost to stockouts are added back, seasonal curves are borrowed from similar items when history is short, Demand Calendar events adjust the forecast for a set window, and new products start from look-alikes.' },
  { Icon: SlidersHorizontal, title: 'Your service level, your overrides', body: 'Set the target service level for the workspace (95% by default) and override safety stock on any item. Items with no forecast yet fall back to a simple days-of-cover buffer instead of a guess dressed up as statistics.' },
];

const actionCards = [
  { Icon: TrendingUp, title: 'Reorder automation you control', body: 'A reorder rule checks every SKU against its reorder point and drafts one purchase order per supplier and warehouse. Run it in Observe, Propose or Autopilot mode from the Automation page.' },
  { Icon: MessageSquareText, title: 'Text with Sparki', body: 'Get a text when an item reaches its reorder point and approve the drafted purchase order with one reply. Included on Solo ($99/mo) and up.' },
  { Icon: Sparkles, title: 'Spark MCP', body: 'Ask Claude, ChatGPT or any MCP client why an item carries the buffer it does. Spark answers from your live stock, lead times and Demand ESP forecasts.' },
];

// Example values only. The page says so next to the inputs.
const exampleValues = {
  averageDailyDemand: '10',
  averageLeadTimeDays: '14',
  dailyDemandStdDev: '3',
  leadTimeStdDevDays: '2',
  serviceLevelPct: '95',
  maxDailyDemand: '15',
  maxLeadTimeDays: '20',
  safetyDays: '5',
  unitCost: '',
  holdingRatePct: '24',
};

type FieldName = keyof typeof exampleValues;

const usd = (value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const pctLabel = (value: number) => `${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}%`;

function SafetyStockCalculator() {
  const idPrefix = useId();
  const [method, setMethod] = useState<SafetyStockCalculatorMethod>('service-level');
  const [values, setValues] = useState(exampleValues);
  const set = (name: FieldName) => (value: string) => setValues((current) => ({ ...current, [name]: value }));
  const num = (name: FieldName) => (values[name] === '' ? undefined : Number(values[name]));

  const input = {
    method,
    averageDailyDemand: num('averageDailyDemand') ?? 0,
    averageLeadTimeDays: num('averageLeadTimeDays') ?? 0,
    dailyDemandStdDev: num('dailyDemandStdDev'),
    leadTimeStdDevDays: num('leadTimeStdDevDays'),
    serviceLevelPct: num('serviceLevelPct'),
    maxDailyDemand: num('maxDailyDemand'),
    maxLeadTimeDays: num('maxLeadTimeDays'),
    safetyDays: num('safetyDays'),
    unitCost: num('unitCost'),
    holdingRatePct: num('holdingRatePct'),
  };
  const result = calculateSafetyStockDetails(input);
  const unitCost = input.unitCost ?? 0;

  const field = (name: FieldName) => `${idPrefix}-${name}`;
  const active = methods.find((m) => m.id === method) ?? methods[0];
  const stats = [
    { label: 'Reorder point', value: result.reorderPoint.toLocaleString('en-US') },
    { label: 'Days of cover', value: result.safetyDays === null ? 'n/a' : result.safetyDays.toLocaleString('en-US', { maximumFractionDigits: 1 }) },
    ...(result.inventoryValue !== undefined ? [{ label: 'Value of the buffer', value: usd(result.inventoryValue) }] : []),
    ...(result.annualHoldingCost !== undefined ? [{ label: 'Yearly holding cost', value: usd(result.annualHoldingCost) }] : []),
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-3xl border border-white/[0.08] bg-[#090d15] p-6 sm:p-8">
        <fieldset>
          <legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">Method</legend>
          <div className="mt-4 grid gap-2 sm:grid-cols-3" role="radiogroup">
            {methods.map((m) => (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={method === m.id}
                onClick={() => setMethod(m.id)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${method === m.id ? 'border-cyan-300/60 bg-cyan-300/[0.1] text-white' : 'border-white/[0.1] bg-white/[0.02] text-white/60 hover:text-white'}`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-white/45">{active.summary}</p>
        </fieldset>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <NumberField id={field('averageDailyDemand')} label="Average daily demand" value={values.averageDailyDemand} onChange={set('averageDailyDemand')} suffix="units/day" />
          <NumberField id={field('averageLeadTimeDays')} label="Average lead time" value={values.averageLeadTimeDays} onChange={set('averageLeadTimeDays')} suffix="days" />
          {method === 'service-level' && (
            <>
              <NumberField id={field('dailyDemandStdDev')} label="Daily demand standard deviation" hint="How much a typical day differs from the average." value={values.dailyDemandStdDev} onChange={set('dailyDemandStdDev')} suffix="units" />
              <NumberField id={field('leadTimeStdDevDays')} label="Lead time standard deviation" hint="Use 0 if your supplier is consistent." value={values.leadTimeStdDevDays} onChange={set('leadTimeStdDevDays')} suffix="days" />
              <div className="sm:col-span-2">
                <NumberField id={field('serviceLevelPct')} label="Target service level" hint={`Chance of not running out before the next order arrives. Z = ${zForServiceLevelPct(input.serviceLevelPct ?? 95).toFixed(2)}.`} value={values.serviceLevelPct} onChange={set('serviceLevelPct')} suffix="%" />
              </div>
            </>
          )}
          {method === 'max-average' && (
            <>
              <NumberField id={field('maxDailyDemand')} label="Maximum daily demand" hint="Your busiest normal day, not a one-off spike." value={values.maxDailyDemand} onChange={set('maxDailyDemand')} suffix="units/day" />
              <NumberField id={field('maxLeadTimeDays')} label="Maximum lead time" hint="The longest a recent order took to arrive." value={values.maxLeadTimeDays} onChange={set('maxLeadTimeDays')} suffix="days" />
            </>
          )}
          {method === 'days-of-cover' && (
            <div className="sm:col-span-2">
              <NumberField id={field('safetyDays')} label="Safety days" hint="Extra days of average demand to keep as a buffer." value={values.safetyDays} onChange={set('safetyDays')} suffix="days" />
            </div>
          )}
          <NumberField id={field('unitCost')} label="Unit cost (optional)" hint="Puts a dollar value on the buffer." value={values.unitCost} onChange={set('unitCost')} prefix="$" suffix="per unit" />
          <NumberField id={field('holdingRatePct')} label="Yearly holding rate" hint="Used only with a unit cost. 20% to 30% is typical." value={values.holdingRatePct} onChange={set('holdingRatePct')} suffix="% per year" />
        </div>
        <p className="mt-6 text-xs leading-5 text-amber-100/60">The starting numbers are example values, not Spark data. Replace them with your own.</p>
      </div>

      <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.05] p-6 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">Safety stock</p>
          <p className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">{result.safetyStock.toLocaleString('en-US')}<span className="ml-2 text-lg font-medium text-white/50">units</span></p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/[0.08] bg-[#090d15] p-5">
              <p className="text-xs text-white/50">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
        {method === 'service-level' && (
          <div className="rounded-2xl border border-white/[0.08] bg-[#090d15] p-5">
            <p className="text-xs text-white/50">What a higher service level costs</p>
            <table className="mt-3 w-full text-left text-sm">
              <thead className="text-xs text-white/40"><tr><th className="pb-2 font-medium">Service level</th><th className="pb-2 font-medium">Z</th><th className="pb-2 text-right font-medium">Safety stock</th></tr></thead>
              <tbody>
                {comparisonServiceLevels.map((level) => {
                  const units = serviceLevelSafetyStock(input, level);
                  return (
                    <tr key={level} className="border-t border-white/[0.06]">
                      <td className="py-2 text-white/75">{pctLabel(level)}</td>
                      <td className="py-2 text-white/50">{zForServiceLevelPct(level).toFixed(2)}</td>
                      <td className="py-2 text-right font-semibold">{units.toLocaleString('en-US')}{unitCost > 0 && <span className="ml-2 font-normal text-white/45">{usd(units * unitCost)}</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-xs leading-5 text-white/45">Safety stock is rounded up to whole units. Reorder point = average daily demand × average lead time + safety stock.</p>
      </div>
    </div>
  );
}

export function SafetyStockCalculatorPage() {
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
                Safety stock calculator
                <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">with service level and Z score</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
                Work out how much buffer stock to hold against demand spikes and late deliveries, see what each extra point of service level costs, and get the reorder point that goes with it.
              </p>
            </ScrollReveal>
          </header>

          <section className="px-6 pb-20 md:px-8 lg:pb-28">
            <div className="mx-auto max-w-[1120px]">
              <SafetyStockCalculator />
            </div>
          </section>

          <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
              <ScrollReveal>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">The safety stock formula</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">A buffer sized to how unpredictable you are</h2>
                <p className="mt-5 text-sm leading-7 text-[#8b95a8]">Safety stock covers the gap between average demand during a lead time and what can actually happen: a busy week, a late truck, or both. The service level formula scales that buffer by how much demand and lead time vary, and by how rarely you are willing to run out.</p>
                <p className="mt-6 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5 font-mono text-sm leading-7 text-cyan-100">Safety stock = Z × √(lead time × σ_demand² + daily demand² × σ_lead time²)</p>
                <p className="mt-5 text-sm leading-7 text-[#8b95a8]">Safety stock sets the floor. Use the <Link to="/reorder-point-calculator/" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">reorder point calculator</Link> for when to order and the <Link to="/eoq-calculator/" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">EOQ calculator</Link> for how much.</p>
              </ScrollReveal>
              <ScrollReveal>
                <div className="rounded-3xl border border-white/[0.08] bg-[#090d15] p-6 sm:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">Worked example (illustrative numbers)</p>
                  <ol className="mt-5 space-y-4 text-sm leading-7 text-white/75">
                    <li><span className="font-semibold text-white">1. Demand variability.</span> A SKU sells 10 units a day with a standard deviation of 3, and the supplier takes 14 days: 14 × 3² = 126.</li>
                    <li><span className="font-semibold text-white">2. Lead time variability.</span> Deliveries vary by 2 days: 10² × 2² = 400.</li>
                    <li><span className="font-semibold text-white">3. Safety stock at 95%.</span> Z = 1.645, so 1.645 × √(126 + 400) ≈ 38 units, about 4 days of demand. The reorder point is 140 + 38 = 178.</li>
                  </ol>
                  <p className="mt-5 text-xs leading-5 text-white/45">The same SKU needs 30 units at 90%, 54 at 99% and 71 at 99.9%. Most of this buffer comes from the late deliveries, not the demand swings, so a more reliable supplier would cut it in half.</p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <section className="px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto max-w-[1120px]">
              <ScrollReveal className="max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-violet-300">Demand ESP</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">The formula is standard. The inputs are where Spark is different.</h2>
                <p className="mt-4 text-sm leading-7 text-[#8b95a8]">Spark Inventory uses the same service level formula for every SKU and warehouse. What changes the answer is where the variability and lead time come from. Demand ESP, Spark’s forecasting engine, measures them from your own history and keeps them current.</p>
              </ScrollReveal>
              <ScrollReveal staggerChildren={60} className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {demandEspCards.map(({ Icon, title, body }, index) => (
                  <RevealItem key={title} index={index}>
                    <article className="h-full rounded-3xl border border-violet-300/15 bg-violet-300/[0.03] p-6">
                      <Icon className="h-5 w-5 text-violet-300" aria-hidden="true" />
                      <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#8b95a8]">{body}</p>
                    </article>
                  </RevealItem>
                ))}
              </ScrollReveal>

              <ScrollReveal className="mt-20 max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-violet-300">From buffer to purchase order</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Safety stock only helps if someone reorders in time</h2>
              </ScrollReveal>
              <ScrollReveal staggerChildren={70} className="mt-10 grid gap-4 md:grid-cols-3">
                {actionCards.map(({ Icon, title, body }, index) => (
                  <RevealItem key={title} index={index}>
                    <article className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6">
                      <Icon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
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
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Safety stock FAQ</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Safety stock questions</h2>
              </ScrollReveal>
              <ScrollReveal staggerChildren={55} className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {safetyStockFaqs.map((faq, index) => <RevealItem key={faq.question} index={index}><details className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold marker:content-none">{faq.question}<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300 transition-transform group-open:rotate-45">+</span></summary><p className="max-w-3xl pb-1 pr-10 pt-3 text-sm leading-7 text-[#8b95a8]">{faq.answer}</p></details></RevealItem>)}
              </ScrollReveal>
            </div>
          </section>

          <footer className="px-6 py-20 text-center md:px-8 lg:py-24">
            <ScrollReveal className="mx-auto max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Free for one user</p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">Get the right buffer for every SKU</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#b8bfcc]">Connect your sales history and Demand ESP forecasts every SKU, flags stock risk and builds a monthly reorder and buying plan from it. No spreadsheet to maintain.</p>
              <ul className="mx-auto mt-6 flex max-w-xl flex-col gap-2 text-left text-sm text-white/70 sm:items-center">
                {['Free: per-SKU Demand ESP forecasts and seasonal curves', 'Free: stock-risk reports and a monthly buying plan', 'Solo ($99/mo): continuous forecasts, live reorder alerts and Text with Sparki'].map((item) => <li key={item} className="flex items-center gap-3"><CircleCheck className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />{item}</li>)}
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
