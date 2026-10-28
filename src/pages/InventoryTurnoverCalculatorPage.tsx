import { useId, useState } from 'react';
import { ArrowRight, BadgeCheck, CalendarRange, Calculator, CircleCheck, Layers, LineChart, MessageSquareText, PackageSearch, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import AgencyFooter from '../agency/AgencyFooter';
import AgencyHeader from '../agency/AgencyHeader';
import NumberField from '../agency/CalculatorNumberField';
import ScrollReveal, { RevealItem } from '../agency/ScrollReveal';
import { calculateInventoryTurnover, inventoryTurnoverFaqs } from '../content/inventoryTurnover';

const periods = [
  { days: 365, label: 'Year' },
  { days: 91, label: 'Quarter' },
  { days: 30, label: 'Month' },
] as const;

// What Demand ESP does past a basic forecast. Every card describes shipped
// behavior in the Spark monorepo (Forecasting, Velocity and Demand Calendar
// services); keep it that way when editing.
const demandEspCards = [
  { Icon: Layers, title: 'A model picked for each SKU', body: 'Demand ESP sorts every SKU as steady, trending, seasonal or intermittent, backtests several forecasting models on that SKU’s own history and keeps the one that predicted best. A slow spare part and a fast seller are not forced through the same math.' },
  { Icon: PackageSearch, title: 'Stockouts do not shrink the forecast', body: 'Sales lost while an item was out of stock are added back before forecasting, so running out does not teach the system to buy less next time.' },
  { Icon: CalendarRange, title: 'Seasonality, promotions and new items', body: 'Seasonal curves per SKU, borrowed from similar items when a SKU has less than a year of history. Demand Calendar events lift or lower the forecast for a set window. New products start from look-alike items.' },
  { Icon: BadgeCheck, title: 'A trust grade on every forecast', body: 'Each forecast gets a grade from A to D based on how accurate its past forecasts turned out, with the reasons behind the grade and what would improve it.' },
  { Icon: ShieldCheck, title: 'Forecast misses become safety stock', body: 'Safety stock is sized from how far the forecast has actually missed over each supplier’s real lead time, so predictable items carry less buffer and erratic ones carry more.' },
  { Icon: LineChart, title: 'Days on hand that admit uncertainty', body: 'Days on hand is hidden when there is no real demand signal, shown as a range for lumpy demand and labeled when it rests on your own estimate instead of sales.' },
];

// How Spark goes past the textbook ratio. Every row describes shipped
// behavior in the Spark monorepo (Portfolio health score, Velocity and
// proactive health alerts); keep it that way when editing.
const beyondFormulaRows = [
  { input: 'Level of detail', basic: 'One number for the whole business.', spark: 'Every SKU and warehouse, so a few fast sellers cannot hide a shelf of slow ones.' },
  { input: 'Direction', basic: 'Looks back at last period’s sales.', spark: 'Looks forward: days on hand is available stock ÷ the planning rate, the higher of the Demand ESP forecast and recent sales.' },
  { input: 'Overstock', basic: 'Blended into the average.', spark: 'Stock beyond 180 days of supply counts as excess by default (you can retune the bands). It lowers the item’s health score and is priced as a monthly carrying cost.' },
  { input: 'Dead stock', basic: 'Drags the average down, unnamed.', spark: 'Units on hand with no demand at all are flagged as dead stock by item.' },
  { input: 'Which items matter', basic: 'Every dollar counts the same.', spark: 'Each item gets an ABC class by revenue contribution, which feeds its health score.' },
  { input: 'Over time', basic: 'Whenever you rerun the numbers.', spark: 'Health is captured nightly with a daily trend. When it drops week over week, Spark alerts you with the weakest factor and the excess carrying cost behind it.' },
];

const actionCards = [
  { Icon: Calculator, title: 'Every score explained', body: 'Each item’s 0 to 100 health score breaks down into stock level, stockout risk, return rate, ABC class and dead stock, so you see what to fix first.' },
  { Icon: TrendingUp, title: 'Buy to the forecast', body: 'A reorder rule drafts purchase orders from Demand ESP, netted against stock you already have and on order, so overstock stops building. Run it in Observe, Propose or Autopilot mode from the Automation page.' },
  { Icon: MessageSquareText, title: 'Text with Sparki', body: 'Text Sparki to ask what is overstocked or about to run out, and approve the drafted purchase order with one reply. Included on Solo ($99/mo) and up.' },
  { Icon: Sparkles, title: 'Spark MCP', body: 'Ask Claude, ChatGPT or any MCP client which SKUs are dead stock or tying up the most cash. Spark answers from your live stock, health scores and Demand ESP forecasts.' },
];

// Example values only. The page says so next to the inputs.
const exampleValues = {
  costOfGoodsSold: '600000',
  beginningInventory: '120000',
  endingInventory: '80000',
  holdingRatePct: '',
};

type FieldName = keyof typeof exampleValues;

const usd = (value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function InventoryTurnoverCalculator() {
  const idPrefix = useId();
  const [periodDays, setPeriodDays] = useState<number>(365);
  const [values, setValues] = useState(exampleValues);
  const set = (name: FieldName) => (value: string) => setValues((current) => ({ ...current, [name]: value }));
  const num = (name: FieldName) => (values[name] === '' ? undefined : Number(values[name]));

  const result = calculateInventoryTurnover({
    periodDays,
    costOfGoodsSold: num('costOfGoodsSold') ?? 0,
    beginningInventory: num('beginningInventory') ?? 0,
    endingInventory: num('endingInventory') ?? 0,
    holdingRatePct: num('holdingRatePct'),
  });

  const field = (name: FieldName) => `${idPrefix}-${name}`;
  const periodLabel = periods.find((p) => p.days === periodDays)?.label.toLowerCase() ?? 'period';
  const stats = result
    ? [
        { label: 'Days in inventory', value: result.daysInInventory.toLocaleString('en-US', { maximumFractionDigits: 0 }) },
        { label: 'Average inventory', value: usd(result.averageInventory) },
        ...(periodDays !== 365 ? [{ label: 'Annualized turnover', value: result.annualTurnover.toLocaleString('en-US', { maximumFractionDigits: 1 }) }] : []),
        ...(result.annualHoldingCost !== undefined ? [{ label: 'Yearly holding cost', value: usd(result.annualHoldingCost) }] : []),
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
                key={p.days}
                type="button"
                role="radio"
                aria-checked={periodDays === p.days}
                onClick={() => setPeriodDays(p.days)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${periodDays === p.days ? 'border-cyan-300/60 bg-cyan-300/[0.1] text-white' : 'border-white/[0.1] bg-white/[0.02] text-white/60 hover:text-white'}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <NumberField id={field('costOfGoodsSold')} label={`Cost of goods sold this ${periodLabel}`} hint="What the goods you sold cost you, not their sale price." value={values.costOfGoodsSold} onChange={set('costOfGoodsSold')} prefix="$" suffix="at cost" />
          </div>
          <NumberField id={field('beginningInventory')} label="Inventory at the start" hint="Stock value at cost on the first day." value={values.beginningInventory} onChange={set('beginningInventory')} prefix="$" suffix="at cost" />
          <NumberField id={field('endingInventory')} label="Inventory at the end" hint="Stock value at cost on the last day." value={values.endingInventory} onChange={set('endingInventory')} prefix="$" suffix="at cost" />
          <div className="sm:col-span-2">
            <NumberField id={field('holdingRatePct')} label="Yearly holding rate (optional)" hint="Cash, storage, insurance and shrinkage as a percent of stock value. 20% to 30% is typical." value={values.holdingRatePct} onChange={set('holdingRatePct')} suffix="% per year" />
          </div>
        </div>
        <p className="mt-6 text-xs leading-5 text-amber-100/60">The starting numbers are example values, not Spark data. Replace them with your own.</p>
      </div>

      <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.05] p-6 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">Inventory turnover</p>
          {result ? (
            <>
              <p className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">{result.turnover.toLocaleString('en-US', { maximumFractionDigits: 2 })}<span className="ml-2 text-lg font-medium text-white/50">turns per {periodLabel}</span></p>
              <p className="mt-4 text-sm text-white/60">Stock sits about <span className="font-semibold text-white">{result.daysInInventory.toLocaleString('en-US', { maximumFractionDigits: 0 })} days</span> before it sells.</p>
            </>
          ) : (
            <p className="mt-3 text-sm leading-6 text-white/60">Enter cost of goods sold and at least one inventory value above zero to see your turnover.</p>
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
        <p className="text-xs leading-5 text-white/45">Turnover = cost of goods sold ÷ average inventory. Days in inventory = days in the period ÷ turnover.</p>
      </div>
    </div>
  );
}

export function InventoryTurnoverCalculatorPage() {
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
                Inventory turnover calculator
                <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">ratio and days in inventory</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
                Enter your cost of goods sold and your inventory value at the start and end of the period to see how many times you sold through your stock, and how many days it sits before it sells.
              </p>
            </ScrollReveal>
          </header>

          <section className="px-6 pb-20 md:px-8 lg:pb-28">
            <div className="mx-auto max-w-[1120px]">
              <InventoryTurnoverCalculator />
            </div>
          </section>

          <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
              <ScrollReveal>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">The inventory turnover formula</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">How fast your stock turns into sales</h2>
                <p className="mt-5 text-sm leading-7 text-[#8b95a8]">Turnover counts how many times you sold through your average inventory in a period. Higher turnover usually means less cash tied up in stock. Too high can mean you are running out and losing sales.</p>
                <p className="mt-6 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5 font-mono text-sm leading-7 text-cyan-100">Inventory turnover = cost of goods sold ÷ ((beginning inventory + ending inventory) ÷ 2)</p>
                <p className="mt-5 text-sm leading-7 text-[#8b95a8]">To act on it, set when to reorder with the <Link to="/reorder-point-calculator/" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">reorder point calculator</Link> and how much with the <Link to="/eoq-calculator/" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-white">EOQ calculator</Link>.</p>
              </ScrollReveal>
              <ScrollReveal>
                <div className="rounded-3xl border border-white/[0.08] bg-[#090d15] p-6 sm:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">Worked example (illustrative numbers)</p>
                  <ol className="mt-5 space-y-4 text-sm leading-7 text-white/75">
                    <li><span className="font-semibold text-white">1. Average inventory.</span> The year starts with $120,000 of stock at cost and ends with $80,000: (120,000 + 80,000) ÷ 2 = $100,000.</li>
                    <li><span className="font-semibold text-white">2. Turnover.</span> Cost of goods sold for the year is $600,000: 600,000 ÷ 100,000 = 6 turns.</li>
                    <li><span className="font-semibold text-white">3. Days in inventory.</span> 365 ÷ 6 ≈ 61 days. On average, stock waits about two months before it sells.</li>
                  </ol>
                  <p className="mt-5 text-xs leading-5 text-white/45">At a 24% yearly holding rate, carrying that $100,000 of average stock costs about $24,000 a year. Six turns can still hide items with a year of stock next to items that keep running out.</p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <section className="px-6 py-20 md:px-8 lg:py-24">
            <div className="mx-auto max-w-[1120px]">
              <ScrollReveal className="max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-violet-300">Demand ESP</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Turnover looks back. Demand ESP looks ahead.</h2>
                <p className="mt-4 text-sm leading-7 text-[#8b95a8]">A turnover ratio tells you how last period went. Demand ESP, Spark’s forecasting engine, tells you how many days each SKU’s stock will last from here, and it goes well past a basic forecast to get that number right.</p>
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
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-violet-300">Beyond the ratio</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">One ratio hides the items that cost you money</h2>
                <p className="mt-4 text-sm leading-7 text-[#8b95a8]">Spark Inventory scores every item’s health from 0 to 100, finds overstock and dead stock, and puts a dollar figure on what the excess costs to carry.</p>
              </ScrollReveal>
              <ScrollReveal staggerChildren={45} className="mt-10 overflow-hidden rounded-3xl border border-white/[0.08]">
                <div className="hidden grid-cols-[0.75fr_0.9fr_1.8fr] gap-6 border-b border-white/[0.08] bg-white/[0.03] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45 md:grid">
                  <span>Question</span><span>Turnover ratio</span><span>Spark Inventory</span>
                </div>
                {beyondFormulaRows.map((row, index) => (
                  <RevealItem key={row.input} index={index}>
                    <div className="grid gap-2 border-b border-white/[0.06] px-6 py-5 last:border-b-0 md:grid-cols-[0.75fr_0.9fr_1.8fr] md:gap-6">
                      <h3 className="text-sm font-semibold text-white">{row.input}</h3>
                      <p className="text-sm leading-6 text-white/45"><span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/35 md:hidden">Turnover ratio: </span>{row.basic}</p>
                      <p className="text-sm leading-6 text-[#b8bfcc]"><span className="font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-300 md:hidden">Spark: </span>{row.spark}</p>
                    </div>
                  </RevealItem>
                ))}
              </ScrollReveal>

              <ScrollReveal className="mt-20 max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-violet-300">From number to action</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Turnover improves when buying follows demand</h2>
              </ScrollReveal>
              <ScrollReveal staggerChildren={70} className="mt-10 grid gap-4 md:grid-cols-2">
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
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Inventory turnover FAQ</p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Inventory turnover questions</h2>
              </ScrollReveal>
              <ScrollReveal staggerChildren={55} className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {inventoryTurnoverFaqs.map((faq, index) => <RevealItem key={faq.question} index={index}><details className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold marker:content-none">{faq.question}<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300 transition-transform group-open:rotate-45">+</span></summary><p className="max-w-3xl pb-1 pr-10 pt-3 text-sm leading-7 text-[#8b95a8]">{faq.answer}</p></details></RevealItem>)}
              </ScrollReveal>
            </div>
          </section>

          <footer className="px-6 py-20 text-center md:px-8 lg:py-24">
            <ScrollReveal className="mx-auto max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Free for one user</p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">See which SKUs are slowing your turns</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#b8bfcc]">Connect your sales history and Demand ESP forecasts every SKU, flags stock risk and builds a monthly reorder and buying plan from it. No spreadsheet to maintain.</p>
              <ul className="mx-auto mt-6 flex max-w-xl flex-col gap-2 text-left text-sm text-white/70 sm:items-center">
                {['Free: per-SKU Demand ESP forecasts and seasonal curves', 'Free: stock-risk reports and a monthly buying plan', 'Solo ($99/mo): continuous forecasts, live alerts and Text with Sparki'].map((item) => <li key={item} className="flex items-center gap-3"><CircleCheck className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />{item}</li>)}
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
