import { useId, useState } from 'react';
import { ArrowRight, Calculator, CircleCheck, MessageSquareText, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import AgencyFooter from '../agency/AgencyFooter';
import AgencyHeader from '../agency/AgencyHeader';
import NumberField from '../agency/CalculatorNumberField';
import ScrollReveal, { RevealItem } from '../agency/ScrollReveal';
import { calculateEoq, eoqFaqs, type HoldingCostMode } from '../content/eoq';

const holdingModes: { id: HoldingCostMode; label: string }[] = [
  { id: 'percent', label: '% of unit cost' },
  { id: 'per-unit', label: '$ per unit per year' },
];

// How Spark goes past the textbook formula. Every row describes shipped
// behavior in the Spark monorepo (Velocity EOQ and reorder point services,
// Demand ESP); keep it that way when editing.
const beyondFormulaRows = [
  { input: 'Annual demand', basic: 'One yearly total you type in.', spark: 'Demand ESP’s forecast for the coming lead time, per SKU and warehouse, turned into a yearly rate. It is recalculated as the forecast updates, so order sizes grow into a busy season and shrink after it.' },
  { input: 'Demand pattern', basic: 'Assumes demand is steady all year.', spark: 'Demand ESP sorts every SKU as steady, trending, seasonal or intermittent, backtests several forecasting models on its own history and keeps the one that predicted best.' },
  { input: 'Stockout days', basic: 'Counted as low demand.', spark: 'Sales lost while a SKU was out of stock are added back before forecasting, so a stockout does not shrink the next order.' },
  { input: 'Promotions and new items', basic: 'Not modeled.', spark: 'Demand Calendar events lift or lower the forecast for a set window. New products start from the history of similar items instead of a blank.' },
  { input: 'Ordering cost', basic: 'A guess per order.', spark: 'A workspace setting, $50 per order by default. Change it once and every SKU’s EOQ updates.' },
  { input: 'Holding cost', basic: 'A rate you estimate.', spark: 'A workspace setting, 24% of unit cost a year by default, applied to each item’s own cost.' },
  { input: 'Stock already on hand or ordered', basic: 'Not considered.', spark: 'The reorder quantity is netted against available stock and open purchase orders, so you do not buy twice.' },
  { input: 'Supplier minimums and price breaks', basic: 'One MOQ check.', spark: 'Orders are raised to the supplier’s minimum order quantity, and price book breaks are compared across suppliers.' },
  { input: 'Items without cost data', basic: 'No answer.', spark: 'Falls back to a days-of-cover quantity, and you can override the quantity or order cycle for any item.' },
];

const beyondFormulaCards = [
  { Icon: Calculator, title: 'Every quantity explained', body: 'Each suggested order shows where its number came from: EOQ, days of cover or your own override, with the demand rate and costs behind it.' },
  { Icon: TrendingUp, title: 'Reorder automation you control', body: 'A reorder rule sweeps every SKU and drafts one purchase order per supplier and warehouse. Run it in Observe, Propose or Autopilot mode, and switch it off or reschedule it from the Automation page.' },
  { Icon: MessageSquareText, title: 'Text with Sparki', body: 'Get a text when an item needs reordering and approve the drafted purchase order with one reply. Included on Solo ($99/mo) and up.' },
  { Icon: Sparkles, title: 'Spark MCP', body: 'Ask Claude, ChatGPT or any MCP client how much to order and why. Spark answers from your live stock, incoming supply and Demand ESP forecasts.' },
];

// Example values only. The page says so next to the inputs.
const exampleValues = {
  annualDemand: '3650',
  orderingCost: '50',
  unitCost: '12',
  holdingRatePct: '24',
  holdingCostPerUnit: '3',
  minimumOrderQuantity: '',
};

type FieldName = keyof typeof exampleValues;

const usd = (value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function EoqCalculator() {
  const idPrefix = useId();
  const [holdingCostMode, setHoldingCostMode] = useState<HoldingCostMode>('percent');
  const [values, setValues] = useState(exampleValues);
  const set = (name: FieldName) => (value: string) => setValues((current) => ({ ...current, [name]: value }));
  const num = (name: FieldName) => (values[name] === '' ? undefined : Number(values[name]));

  const result = calculateEoq({
    holdingCostMode,
    annualDemand: num('annualDemand') ?? 0,
    orderingCost: num('orderingCost') ?? 0,
    unitCost: num('unitCost'),
    holdingRatePct: num('holdingRatePct'),
    holdingCostPerUnit: num('holdingCostPerUnit'),
    minimumOrderQuantity: num('minimumOrderQuantity'),
  });

  const field = (name: FieldName) => `${idPrefix}-${name}`;
  const stats = result
    ? [
        { label: 'Orders per year', value: result.ordersPerYear.toLocaleString('en-US', { maximumFractionDigits: 1 }) },
        { label: 'Days between orders', value: result.daysBetweenOrders.toLocaleString('en-US', { maximumFractionDigits: 0 }) },
        { label: 'Yearly ordering cost', value: usd(result.annualOrderingCost) },
        { label: 'Yearly holding cost', value: usd(result.annualHoldingCost) },
      ]
    : [];

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-3xl border border-white/[0.08] bg-[#090d15] p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberField id={field('annualDemand')} label="Annual demand" hint="Units you expect to sell in a year." value={values.annualDemand} onChange={set('annualDemand')} suffix="units/yr" />
          <NumberField id={field('orderingCost')} label="Cost per order" hint="Placing, receiving and paying for one order." value={values.orderingCost} onChange={set('orderingCost')} prefix="$" suffix="per order" />
        </div>

        <fieldset className="mt-7">
          <legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">Holding cost</legend>
          <div className="mt-4 grid gap-2 sm:grid-cols-2" role="radiogroup">
            {holdingModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                role="radio"
                aria-checked={holdingCostMode === mode.id}
                onClick={() => setHoldingCostMode(mode.id)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${holdingCostMode === mode.id ? 'border-cyan-300/60 bg-cyan-300/[0.1] text-white' : 'border-white/[0.1] bg-white/[0.02] text-white/60 hover:text-white'}`}
              >
                {mode.label}
              </button>
            ))}
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {holdingCostMode === 'percent' ? (
              <>
                <NumberField id={field('unitCost')} label="Unit cost" hint="What you pay the supplier per unit." value={values.unitCost} onChange={set('unitCost')} prefix="$" suffix="per unit" />
                <NumberField id={field('holdingRatePct')} label="Yearly holding rate" hint="Cash, storage, insurance and shrinkage. 20% to 30% is typical." value={values.holdingRatePct} onChange={set('holdingRatePct')} suffix="% per year" />
              </>
            ) : (
              <div className="sm:col-span-2">
                <NumberField id={field('holdingCostPerUnit')} label="Holding cost per unit" hint="What it costs to keep one unit in stock for a year." value={values.holdingCostPerUnit} onChange={set('holdingCostPerUnit')} prefix="$" suffix="per unit/yr" />
              </div>
            )}
          </div>
        </fieldset>

        <div className="mt-7">
          <NumberField id={field('minimumOrderQuantity')} label="Supplier minimum order quantity (optional)" hint="Leave blank if your supplier has no minimum." value={values.minimumOrderQuantity} onChange={set('minimumOrderQuantity')} suffix="units" />
        </div>
        <p className="mt-6 text-xs leading-5 text-amber-100/60">The starting numbers are example values, not Spark data. Replace them with your own.</p>
      </div>

      <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.05] p-6 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">{result?.raisedToMoq ? 'Order quantity' : 'Economic order quantity'}</p>
          {result ? (
            <>
              <p className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">{result.orderQuantity.toLocaleString('en-US')}<span className="ml-2 text-lg font-medium text-white/50">units</span></p>
              {result.raisedToMoq && (
                <p className="mt-4 rounded-xl bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-100">Raised to the supplier minimum. The EOQ is {result.eoq.toLocaleString('en-US')} units, so this order carries extra stock.</p>
              )}
              <p className="mt-4 text-sm text-white/60">Total yearly cost: <span className="font-semibold text-white">{usd(result.totalAnnualCost)}</span></p>
            </>
          ) : (
            <p className="mt-3 text-sm leading-6 text-white/60">Enter annual demand, a cost per order and a holding cost above zero to see your EOQ.</p>
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
        <p className="text-xs leading-5 text-white/45">EOQ = √(2 × annual demand × cost per order ÷ holding cost per unit), rounded to whole units.</p>
      </div>
    </div>
  );
}

export function EoqCalculatorPage() {
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
                EOQ calculator
                <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">economic order quantity</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
                Enter your yearly demand, the cost of placing an order and the cost of holding stock to find the order size with the lowest total cost. Add your supplier’s minimum to see what you would actually order.
              </p>
            </ScrollReveal>
          </header>

          <section className="px-6 pb-20 md:px-8 lg:pb-28">
            <div className="mx-auto max-w-[1120px]">
              <EoqCalculator />
            </div>
          </section>

          <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
              <ScrollReveal>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">The EOQ formula</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Balance the cost of ordering against the cost of holding</h2>
                <p className="mt-5 text-sm leading-7 text-[#8b95a8]">Small, frequent orders keep stock low but cost more in purchase orders, receiving and freight. Large, rare orders save on ordering but tie up cash and shelf space. EOQ is the order size where those two yearly costs are equal and their total is lowest.</p>
                <p className="mt-6 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5 font-mono text-sm leading-7 text-cyan-100">EOQ = √(2 × annual demand × cost per order ÷ holding cost per unit per year)</p>
                <p className="mt-5 text-sm leading-7 text-[#8b95a8]">EOQ answers how much to order. For when to order, use the <Link to="/reorder-point-calculator/" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">reorder point calculator</Link>. To see how fast your stock sells through, try the <Link to="/inventory-turnover-calculator/" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">inventory turnover calculator</Link>.</p>
              </ScrollReveal>
              <ScrollReveal>
                <div className="rounded-3xl border border-white/[0.08] bg-[#090d15] p-6 sm:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">Worked example (illustrative numbers)</p>
                  <ol className="mt-5 space-y-4 text-sm leading-7 text-white/75">
                    <li><span className="font-semibold text-white">1. Holding cost per unit.</span> A SKU costs $12 and holding stock costs 24% a year: $12 × 0.24 = $2.88 per unit per year.</li>
                    <li><span className="font-semibold text-white">2. EOQ.</span> It sells 3,650 units a year and each order costs $50: √(2 × 3,650 × 50 ÷ 2.88) ≈ 356 units.</li>
                    <li><span className="font-semibold text-white">3. What it means.</span> About 10 orders a year, one every 36 days. Ordering and holding each cost about $513 a year, $1,025 in total.</li>
                  </ol>
                  <p className="mt-5 text-xs leading-5 text-white/45">If the supplier’s minimum is 500 units, ordering 500 raises the yearly total to $1,085. That $60 gap is what the minimum costs you, and a useful number to bring to the supplier.</p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <section className="px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto max-w-[1120px]">
              <ScrollReveal className="max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-violet-300">Beyond the formula</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">EOQ is only as good as its demand number. Demand ESP forecasts it.</h2>
                <p className="mt-4 text-sm leading-7 text-[#8b95a8]">This calculator assumes demand is flat all year and nothing is already on order. Spark Inventory feeds EOQ with Demand ESP, its forecasting engine, so every SKU and warehouse gets an order size based on what it is expected to sell next, not last year’s average. Spark then nets out stock you already have and turns the result into a purchase order your team approves.</p>
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
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">An order quantity is half the decision. Spark plans the buy.</h2>
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
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">EOQ FAQ</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Economic order quantity questions</h2>
              </ScrollReveal>
              <ScrollReveal staggerChildren={55} className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {eoqFaqs.map((faq, index) => <RevealItem key={faq.question} index={index}><details className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold marker:content-none">{faq.question}<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300 transition-transform group-open:rotate-45">+</span></summary><p className="max-w-3xl pb-1 pr-10 pt-3 text-sm leading-7 text-[#8b95a8]">{faq.answer}</p></details></RevealItem>)}
              </ScrollReveal>
            </div>
          </section>

          <footer className="px-6 py-20 text-center md:px-8 lg:py-24">
            <ScrollReveal className="mx-auto max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Free for one user</p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">Get the right order size for every SKU</h2>
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
