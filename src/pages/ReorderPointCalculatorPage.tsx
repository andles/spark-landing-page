import { useId, useState } from 'react';
import { ArrowRight, Calculator, CircleCheck, MessageSquareText, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import AgencyFooter from '../agency/AgencyFooter';
import AgencyHeader from '../agency/AgencyHeader';
import ScrollReveal, { RevealItem } from '../agency/ScrollReveal';
import { calculateReorderPoint, reorderPointFaqs, serviceLevels, type SafetyStockMethod } from '../content/reorderPoint';

const methods: { id: SafetyStockMethod; label: string; summary: string }[] = [
  { id: 'max-average', label: 'Max and average', summary: 'Safety stock = (max daily demand × max lead time) − (average daily demand × average lead time)' },
  { id: 'service-level', label: 'Service level', summary: 'Safety stock = Z × √(lead time × demand SD² + daily demand² × lead time SD²)' },
  { id: 'days-of-cover', label: 'Days of cover', summary: 'Safety stock = average daily demand × safety days' },
];

// How Spark goes past the textbook formula. Every row describes shipped
// behavior in the Spark monorepo (Velocity reorder point, safety stock and
// Demand ESP services); keep it that way when editing.
const beyondFormulaRows = [
  { input: 'Demand rate', basic: 'One average you type in.', spark: 'Demand ESP sorts every SKU as steady, trending, seasonal or intermittent, backtests several forecasting models on its own history and keeps the one that predicted best. The reorder point uses the forecast for the actual lead time window, not a flat average.' },
  { input: 'Stockout days', basic: 'Counted as low demand.', spark: 'Sales lost while a SKU was out of stock are added back before forecasting, so a stockout does not teach the system to buy less.' },
  { input: 'Seasonality and new items', basic: 'Not modeled.', spark: 'Seasonal curves per SKU. Items with less than a year of history borrow the seasonal shape of similar items, and new products start from look-alike items.' },
  { input: 'Promotions and events', basic: 'Not modeled.', spark: 'Demand Calendar events and demand signals lift or lower the forecast for a set window, within bounds, and fade out after.' },
  { input: 'Demand variability', basic: 'A standard deviation you estimate.', spark: 'Measured from the forecast’s own past misses over the lead time, so safety stock reflects how predictable each SKU really is. You set the target service level (95% by default).' },
  { input: 'Lead time', basic: 'One number for every order.', spark: 'Learned from completed purchase orders per supplier, with lead time variability and on-time reliability tracked. Falls back to price book lead times by order size and supplier defaults when history is thin.' },
  { input: 'What counts as stock', basic: 'Whatever number you compare it to.', spark: 'Inventory position: on hand plus open purchase orders and inbound transfers, less sales orders already committed by ship date.' },
  { input: 'How much to order', basic: 'Not covered.', spark: 'Economic order quantity or days of cover, net of stock already on order and raised to the supplier’s minimum order quantity. Price breaks are compared across suppliers.' },
  { input: 'Locations', basic: 'One location.', spark: 'Calculated per warehouse. Distribution centers plan for the stores they restock, and those stores get transfer proposals instead of purchase orders.' },
];

const beyondFormulaCards = [
  { Icon: Calculator, title: 'Every number explained', body: 'Each reorder point comes with a breakdown of the forecast, lead time and safety stock behind it. Items with too little or too erratic history are flagged as low confidence instead of firing noisy alerts.' },
  { Icon: TrendingUp, title: 'Reorder automation you control', body: 'A reorder rule sweeps every SKU and drafts one purchase order per supplier and warehouse. Run it in Observe, Propose or Autopilot mode, and switch it off or reschedule it from the Automation page.' },
  { Icon: MessageSquareText, title: 'Text with Sparki', body: 'Get a text when an item reaches its reorder point and approve the drafted purchase order with one reply. Included on Solo ($99/mo) and up.' },
  { Icon: Sparkles, title: 'Spark MCP', body: 'Ask Claude, ChatGPT or any MCP client what to reorder and why. Spark answers from your live stock, incoming supply and Demand ESP forecasts.' },
];

// Example values only. The page says so next to the inputs.
const exampleValues = {
  averageDailyDemand: '10',
  averageLeadTimeDays: '14',
  maxDailyDemand: '15',
  maxLeadTimeDays: '20',
  dailyDemandStdDev: '3',
  leadTimeStdDevDays: '2',
  safetyDays: '5',
  inventoryPosition: '',
};

type FieldName = keyof typeof exampleValues;


function NumberField({ id, label, hint, value, onChange, suffix }: { id: string; label: string; hint?: string; value: string; onChange: (value: string) => void; suffix: string }) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium text-white/85">{label}</span>
      <div className="mt-2 flex items-center rounded-xl border border-white/[0.1] bg-[#06080d] focus-within:border-cyan-300/50">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          step="any"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent px-4 py-3 text-base text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <span className="pr-4 text-xs text-white/45">{suffix}</span>
      </div>
      {hint && <span className="mt-1.5 block text-xs leading-5 text-white/40">{hint}</span>}
    </label>
  );
}

function ReorderPointCalculator() {
  const idPrefix = useId();
  const [method, setMethod] = useState<SafetyStockMethod>('max-average');
  const [serviceLevel, setServiceLevel] = useState<number>(0.95);
  const [values, setValues] = useState(exampleValues);
  const set = (name: FieldName) => (value: string) => setValues((current) => ({ ...current, [name]: value }));
  const num = (name: FieldName) => (values[name] === '' ? undefined : Number(values[name]));

  const result = calculateReorderPoint({
    method,
    serviceLevel,
    averageDailyDemand: num('averageDailyDemand') ?? 0,
    averageLeadTimeDays: num('averageLeadTimeDays') ?? 0,
    maxDailyDemand: num('maxDailyDemand'),
    maxLeadTimeDays: num('maxLeadTimeDays'),
    dailyDemandStdDev: num('dailyDemandStdDev'),
    leadTimeStdDevDays: num('leadTimeStdDevDays'),
    safetyDays: num('safetyDays'),
    inventoryPosition: num('inventoryPosition'),
  });

  const field = (name: FieldName | 'serviceLevel') => `${idPrefix}-${name}`;
  const active = methods.find((m) => m.id === method) ?? methods[0];

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-3xl border border-white/[0.08] bg-[#090d15] p-6 sm:p-8">
        <fieldset>
          <legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">Safety stock method</legend>
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
          {method === 'max-average' && (
            <>
              <NumberField id={field('maxDailyDemand')} label="Maximum daily demand" hint="Your busiest normal day, not a one-off spike." value={values.maxDailyDemand} onChange={set('maxDailyDemand')} suffix="units/day" />
              <NumberField id={field('maxLeadTimeDays')} label="Maximum lead time" hint="The longest a recent order took to arrive." value={values.maxLeadTimeDays} onChange={set('maxLeadTimeDays')} suffix="days" />
            </>
          )}
          {method === 'service-level' && (
            <>
              <NumberField id={field('dailyDemandStdDev')} label="Daily demand standard deviation" value={values.dailyDemandStdDev} onChange={set('dailyDemandStdDev')} suffix="units" />
              <NumberField id={field('leadTimeStdDevDays')} label="Lead time standard deviation" hint="Use 0 if your supplier is consistent." value={values.leadTimeStdDevDays} onChange={set('leadTimeStdDevDays')} suffix="days" />
              <label htmlFor={field('serviceLevel')} className="block sm:col-span-2">
                <span className="text-sm font-medium text-white/85">Target service level</span>
                <select id={field('serviceLevel')} value={serviceLevel} onChange={(event) => setServiceLevel(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-white/[0.1] bg-[#06080d] px-4 py-3 text-base text-white outline-none focus:border-cyan-300/50">
                  {serviceLevels.map((level) => <option key={level.value} value={level.value}>{level.label} (Z = {level.z})</option>)}
                </select>
              </label>
            </>
          )}
          {method === 'days-of-cover' && (
            <NumberField id={field('safetyDays')} label="Safety days" hint="Extra days of average demand to keep as a buffer." value={values.safetyDays} onChange={set('safetyDays')} suffix="days" />
          )}
          <div className="sm:col-span-2">
            <NumberField id={field('inventoryPosition')} label="Inventory position (optional)" hint="Available stock plus units already on order. Leave blank to skip the reorder check." value={values.inventoryPosition} onChange={set('inventoryPosition')} suffix="units" />
          </div>
        </div>
        <p className="mt-6 text-xs leading-5 text-amber-100/60">The starting numbers are example values, not Spark data. Replace them with your own.</p>
      </div>

      <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.05] p-6 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">Reorder point</p>
          <p className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">{result.reorderPoint.toLocaleString('en-US')}<span className="ml-2 text-lg font-medium text-white/50">units</span></p>
          {result.reorderNow !== undefined && (
            <p className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold ${result.reorderNow ? 'bg-rose-400/10 text-rose-200' : 'bg-emerald-400/10 text-emerald-200'}`}>
              {result.reorderNow ? 'Reorder now: your inventory position is at or below the reorder point.' : 'No order needed yet: your inventory position is above the reorder point.'}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/[0.08] bg-[#090d15] p-5">
            <p className="text-xs text-white/50">Lead time demand</p>
            <p className="mt-2 text-2xl font-semibold">{result.leadTimeDemand.toLocaleString('en-US', { maximumFractionDigits: 1 })}</p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[#090d15] p-5">
            <p className="text-xs text-white/50">Safety stock</p>
            <p className="mt-2 text-2xl font-semibold">{result.safetyStock.toLocaleString('en-US')}</p>
          </div>
        </div>
        <p className="text-xs leading-5 text-white/45">Reorder point = lead time demand + safety stock, rounded up to whole units.</p>
      </div>
    </div>
  );
}

export function ReorderPointCalculatorPage() {
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
                Reorder point calculator
                <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">with safety stock</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
                Enter your daily demand and supplier lead time to find the stock level that should trigger your next purchase order. Pick the safety stock method that matches the data you have.
              </p>
            </ScrollReveal>
          </header>

          <section className="px-6 pb-20 md:px-8 lg:pb-28">
            <div className="mx-auto max-w-[1120px]">
              <ReorderPointCalculator />
            </div>
          </section>

          <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
              <ScrollReveal>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">The reorder point formula</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Lead time demand plus a buffer</h2>
                <p className="mt-5 text-sm leading-7 text-[#8b95a8]">The reorder point is the inventory position at which you place the next order. Order at that level and the new stock should arrive just as the old stock runs down to your safety buffer.</p>
                <p className="mt-6 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5 font-mono text-sm leading-7 text-cyan-100">Reorder point = (average daily demand × average lead time) + safety stock</p>
                <p className="mt-5 text-sm leading-7 text-[#8b95a8]">For how much to order once you hit it, try the <Link to="/eoq-calculator/" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">EOQ calculator</Link> or see <a href="/blog/how-to-calculate-reorder-quantities/" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">how to calculate reorder quantities</a>.</p>
              </ScrollReveal>
              <ScrollReveal>
                <div className="rounded-3xl border border-white/[0.08] bg-[#090d15] p-6 sm:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">Worked example (illustrative numbers)</p>
                  <ol className="mt-5 space-y-4 text-sm leading-7 text-white/75">
                    <li><span className="font-semibold text-white">1. Lead time demand.</span> A SKU sells 10 units a day and the supplier takes 14 days: 10 × 14 = 140 units.</li>
                    <li><span className="font-semibold text-white">2. Safety stock (max and average).</span> The busiest normal day is 15 units and the slowest delivery took 20 days: (15 × 20) − 140 = 160 units.</li>
                    <li><span className="font-semibold text-white">3. Reorder point.</span> 140 + 160 = 300 units. When available stock plus what is on order drops to 300, place the order.</li>
                  </ol>
                  <p className="mt-5 text-xs leading-5 text-white/45">The same SKU at a 95% service level, with a demand SD of 3 units and a lead time SD of 2 days, needs 38 units of safety stock and a reorder point of 178. The method changes the answer a lot, which is why the inputs matter.</p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <section className="px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto max-w-[1120px]">
              <ScrollReveal className="max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-violet-300">Beyond the formula</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Every input above is a guess. Spark measures it.</h2>
                <p className="mt-4 text-sm leading-7 text-[#8b95a8]">This calculator takes one average demand, one lead time and one variability number you estimate. Spark Inventory works out each of them per SKU and per warehouse from your own sales and purchase history, keeps them current as demand moves, and turns the result into a purchase order your team approves.</p>
              </ScrollReveal>
              <ScrollReveal staggerChildren={45} className="mt-10 overflow-hidden rounded-3xl border border-white/[0.08]">
                <div className="hidden grid-cols-[0.75fr_0.9fr_1.8fr] gap-6 border-b border-white/[0.08] bg-white/[0.03] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45 md:grid">
                  <span>Input</span><span>This calculator</span><span>Spark Inventory</span>
                </div>
                {beyondFormulaRows.map((row, index) => (
                  <RevealItem key={row.input} index={index}>
                    <div className="grid gap-2 border-b border-white/[0.06] px-6 py-5 last:border-b-0 md:grid-cols-[0.75fr_0.9fr_1.8fr] md:gap-6">
                      <h3 className="text-sm font-semibold text-white">{row.input}</h3>
                      <p className="text-sm leading-6 text-white/45"><span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/35 md:hidden">This calculator: </span>{row.basic}</p>
                      <p className="text-sm leading-6 text-[#b8bfcc]"><span className="font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-300 md:hidden">Spark: </span>{row.spark}</p>
                    </div>
                  </RevealItem>
                ))}
              </ScrollReveal>

              <ScrollReveal className="mt-20 max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-violet-300">From number to purchase order</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">A reorder point is a trigger. Spark plans the buy.</h2>
              </ScrollReveal>
              <ScrollReveal staggerChildren={70} className="mt-10 grid gap-4 md:grid-cols-2">
                {beyondFormulaCards.map(({ Icon, title, body }, index) => (
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
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Reorder point FAQ</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Reorder point and safety stock questions</h2>
              </ScrollReveal>
              <ScrollReveal staggerChildren={55} className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {reorderPointFaqs.map((faq, index) => <RevealItem key={faq.question} index={index}><details className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold marker:content-none">{faq.question}<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300 transition-transform group-open:rotate-45">+</span></summary><p className="max-w-3xl pb-1 pr-10 pt-3 text-sm leading-7 text-[#8b95a8]">{faq.answer}</p></details></RevealItem>)}
              </ScrollReveal>
            </div>
          </section>

          <footer className="px-6 py-20 text-center md:px-8 lg:py-24">
            <ScrollReveal className="mx-auto max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Free for one user</p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">Get a reorder point for every SKU</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#b8bfcc]">Connect your sales history and Spark forecasts demand per SKU and builds a monthly reorder and buying plan from it. No spreadsheet to maintain.</p>
              <ul className="mx-auto mt-6 flex max-w-xl flex-col gap-2 text-left text-sm text-white/70 sm:items-center">
                {['Free: per-SKU demand forecasts and seasonal curves', 'Free: a monthly reorder and buying plan', 'Solo ($99/mo): continuous forecasts, live reorder alerts and Text with Sparki'].map((item) => <li key={item} className="flex items-center gap-3"><CircleCheck className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />{item}</li>)}
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
