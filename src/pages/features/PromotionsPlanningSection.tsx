// Promotions planning section shared by the stockouts campaign page and the
// purchasing feature page. Labels follow the web app's Demand Calendar
// (web-app modules/DemandIntelligence/DemandCalendar, i18n keys demandEsp.events
// and demandCalendar) and the Spark Signal markdown surface (web-app
// modules/Signal/surfaces/markdown, i18n group markdown). Every number in the
// mockups is example data and says so.
import ScrollReveal from '../../agency/ScrollReveal';
import { ExampleTag, type FlowStep } from './featureVisuals';

const promoSteps: readonly FlowStep[] = [
  {
    step: '01',
    title: 'Plan the promo',
    body: 'Add an event with its dates, products and offer, or confirm one Spark found in your connected tools. Spark suggests the expected effect as a likely range, and the event joins the forecast when you add it. Drafts don’t change the forecast or purchasing.',
  },
  {
    step: '02',
    title: 'See what it needs',
    body: 'Each event gets a stock check. If a product runs out before the event ends, you see what is on hand, what is needed, when it runs out, and an order-by date based on the supplier’s usual lead time.',
  },
  {
    step: '03',
    title: 'Review how it went',
    body: 'When the event ends, compare what you expected with what happened. The result goes into the track record for that event type, so the next suggestion for it starts from what you learned.',
  },
];

/* ── Demand Calendar mockup ─────────────────────────────────────────────── */

// Example window: Oct 1 to Dec 31 (92 days), today on Oct 9.
const WINDOW_DAYS = 92;
const TODAY = 8;
const pct = (day: number) => `${(day / WINDOW_DAYS) * 100}%`;

type BarStyle = 'inForecast' | 'suggested' | 'draft';

interface ExampleLane {
  label: string;
  color: string;
  bars: { name: string; start: number; end: number; style: BarStyle; flag?: string; labelOutside?: boolean }[];
}

// Lane names and colors match LANE_META in the web app's DemandCalendar/model.ts.
const lanes: ExampleLane[] = [
  { label: 'Campaign', color: '#7c3aed', bars: [{ name: 'Holiday gift guide', start: 50, end: 85, style: 'inForecast' }] },
  { label: 'Email & SMS send', color: '#0891b2', bars: [{ name: 'VIP early access', start: 48, end: 50, style: 'inForecast', labelOutside: true }] },
  { label: 'Discount or sale', color: '#db2777', bars: [{ name: 'Fall tee sale', start: 16, end: 26, style: 'inForecast', flag: 'Stock risk', labelOutside: true }] },
  { label: 'Price change', color: '#ca8a04', bars: [] },
  { label: 'Product launch', color: '#16a34a', bars: [{ name: 'Canvas Tote, Black', start: 40, end: 42, style: 'draft', labelOutside: true }] },
  { label: 'Wholesale order', color: '#2563eb', bars: [{ name: 'Harbor Goods order', start: 33, end: 35, style: 'suggested', labelOutside: true }] },
];

const barFill = (style: BarStyle, color: string) => {
  if (style === 'suggested') return { borderColor: color, borderStyle: 'dashed', background: 'white' };
  if (style === 'draft') {
    return {
      borderColor: color,
      background: `repeating-linear-gradient(135deg, color-mix(in srgb, ${color} 16%, white) 0 5px, white 5px 10px)`,
    };
  }
  return { borderColor: color, background: `color-mix(in srgb, ${color} 18%, white)` };
};

const attention = [
  { count: 1, dot: 'bg-sky-500', label: 'event found in Shopify' },
  { count: 1, dot: 'bg-red-600', label: 'event where stock runs out' },
  { count: 1, dot: 'bg-emerald-600', label: 'event ended: compare with what you expected' },
];

/** The Events tab of Demand ESP, recreated with example data. */
export function DemandCalendarMockup() {
  return (
    <figure className="w-full min-w-0">
      <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-white text-slate-900 shadow-2xl shadow-black/40">
        <div className="border-b border-slate-100 px-4 pt-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-gray-900">What’s affecting demand</p>
              <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-gray-600">
                <span className="font-medium text-gray-900">5 events coming up</span>
                {lanes.filter((lane) => lane.bars.length > 0).map((lane) => (
                  <span key={lane.label} className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-sm" style={{ background: lane.color }} aria-hidden="true" />
                    <b className="tabular-nums text-gray-900">{lane.bars.length}</b> {lane.label}
                  </span>
                ))}
                <span className="rounded-full bg-sky-50 px-2 py-0.5 font-semibold text-sky-700">2 need review</span>
              </div>
            </div>
            <span className="shrink-0 rounded-md bg-sky-500 px-2.5 py-1.5 text-[11px] font-medium text-white">+ Add event</span>
          </div>
          <div className="mt-3 flex gap-1 overflow-hidden pb-2.5 text-[11px] font-semibold text-gray-600">
            <span className="rounded-md bg-sky-600 px-2.5 py-1 text-white">Calendar</span>
            <span className="px-2.5 py-1">List</span>
            <span className="ml-2 inline-flex items-center gap-1 px-2.5 py-1">
              To review <span className="rounded-full bg-sky-600 px-1.5 text-[10px] leading-4 text-white">2</span>
            </span>
            <span className="hidden px-2.5 py-1 sm:inline">Track record</span>
          </div>
        </div>

        <div className="space-y-3 p-4">
          <ul className="flex flex-wrap gap-1.5" aria-label="Needs your attention">
            {attention.map((chip) => (
              <li key={chip.label} className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-1">
                <span className={`h-1.5 w-1.5 rounded-full ${chip.dot}`} aria-hidden="true" />
                <b className="text-[12px] tabular-nums text-gray-900">{chip.count}</b>
                <span className="text-[10.5px] leading-tight text-gray-600">{chip.label}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-xl border border-gray-200">
            <div className="relative flex border-b border-gray-100 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide text-gray-400">
              <span className="absolute inset-y-0 left-3 right-3" aria-hidden="true">
                <span className="absolute top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded bg-red-500 px-1 text-[8px] font-semibold text-white sm:block" style={{ left: pct(TODAY) }}>Today</span>
              </span>
              <span className="w-1/3">Oct</span>
              <span className="w-1/3">Nov</span>
              <span className="w-1/3">Dec</span>
            </div>
            <div className="relative px-3 pb-2">
              <div className="pointer-events-none absolute inset-y-0 left-3 right-3" aria-hidden="true">
                <span className="absolute inset-y-0 w-px bg-red-500" style={{ left: pct(TODAY) }} />
              </div>
              {lanes.map((lane) => (
                <div key={lane.label} className="pt-2">
                  <p className="relative z-10 inline-flex items-center gap-1 bg-white pr-1 text-[9.5px] text-gray-500">
                    <span className="h-1.5 w-1.5 rounded-sm" style={{ background: lane.color }} aria-hidden="true" />
                    {lane.label}
                  </p>
                  <div className="relative mt-0.5 h-[22px] overflow-hidden">
                    {lane.bars.map((bar) => (
                      <div key={bar.name} className="absolute inset-y-0 flex items-center" style={{ left: pct(bar.start), width: `calc(100% - ${pct(bar.start)})` }}>
                        <span
                          className="flex h-full shrink-0 items-center overflow-hidden whitespace-nowrap rounded-[6px] border-[1.5px] px-1.5 text-[10px] font-semibold text-gray-900"
                          style={{ width: `${((bar.end - bar.start) / (WINDOW_DAYS - bar.start)) * 100}%`, ...barFill(bar.style, lane.color) }}
                        >
                          {!bar.labelOutside && bar.name}
                        </span>
                        {bar.labelOutside && (
                          <span className="ml-1 truncate text-[10px] font-semibold text-gray-700">{bar.name}</span>
                        )}
                        {bar.flag && (
                          <span className="ml-1 shrink-0 rounded bg-red-50 px-1 text-[9px] font-semibold text-red-700">{bar.flag}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9.5px] text-gray-500">
            <span className="inline-flex items-center gap-1"><span className="h-2 w-3 rounded-sm border border-dashed border-gray-500 bg-white" aria-hidden="true" />Suggested, not in the forecast yet</span>
            <span className="inline-flex items-center gap-1"><span className="h-2 w-3 rounded-sm border border-gray-500 bg-[repeating-linear-gradient(135deg,#e5e7eb_0_2px,white_2px_4px)]" aria-hidden="true" />Draft</span>
            <span className="inline-flex items-center gap-1"><span className="h-2 w-3 rounded-sm border border-gray-500 bg-gray-200" aria-hidden="true" />In the forecast</span>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl border border-red-200 bg-red-50/60 p-3">
              <p className="text-[11px] font-semibold text-red-800">Stock runs out before this event ends</p>
              <p className="mt-0.5 text-[10.5px] text-gray-600">Fall tee sale · 1 product runs out, the first around Oct 21.</p>
              <dl className="mt-2 grid grid-cols-3 gap-1 text-[10px]">
                <div><dt className="text-gray-500">On hand</dt><dd className="font-semibold tabular-nums">42</dd></div>
                <div><dt className="text-gray-500">Needed</dt><dd className="font-semibold tabular-nums">96</dd></div>
                <div><dt className="text-gray-500">Runs out</dt><dd className="font-semibold">Oct 21</dd></div>
              </dl>
              <p className="mt-1 truncate text-[10px] text-gray-500">Classic Tee, Black, M</p>
              <span className="mt-2 inline-block rounded-md border border-gray-300 bg-white px-2 py-1 text-[10px] font-semibold text-gray-800">Order 60 by Oct 12</span>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
              <p className="text-[11px] font-semibold text-emerald-800">Expected 20%, got 17%</p>
              <p className="mt-0.5 text-[10.5px] text-gray-600">Summer tee sale · Ended Aug 31 · Discount or sale</p>
              <p className="mt-2 text-[10px] font-semibold text-gray-800">What Spark learned</p>
              <p className="mt-0.5 text-[10px] leading-4 text-gray-600">Your Discount or sale events came in 3 points under the expectation. Future suggestions for this type now start a little lower.</p>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 flex items-center justify-center gap-2 text-xs text-white/40">
        The Demand Calendar in Demand ESP <ExampleTag />
      </figcaption>
    </figure>
  );
}

/* ── Markdown proposal card ─────────────────────────────────────────────── */

/** A slow mover markdown proposal as it appears in Spark Signal, with example data. */
function MarkdownProposalCard() {
  return (
    <div className="flex flex-col self-start rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Slow mover markdown</p>
        <span className="shrink-0 whitespace-nowrap"><ExampleTag /></span>
      </div>
      <h3 className="mt-4 text-base font-semibold text-white">Markdown proposals for what isn’t selling</h3>
      <p className="mt-2 text-sm leading-7 text-[#9da8b9]">
        When an item has stock but no recent sales, Spark can propose a markdown in Spark Signal. You set the price and see what waiting costs. The item price does not change until you approve it.
      </p>
      <div className="mt-5 space-y-3 rounded-xl border border-white/[0.08] bg-[#0a0d14] p-4 text-xs">
        <p className="text-sm font-semibold text-white">Dad Cap, Olive</p>
        <div>
          <p className="text-white/40">What waiting costs</p>
          <dl className="mt-1.5 grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-white/[0.06] p-2.5">
              <dt className="text-[10px] text-white/40">Capital tied up</dt>
              <dd className="mt-0.5 font-semibold tabular-nums text-white">$1,240</dd>
            </div>
            <div className="rounded-lg border border-white/[0.06] p-2.5">
              <dt className="text-[10px] text-white/40">Units on hand</dt>
              <dd className="mt-0.5 font-semibold tabular-nums text-white">124</dd>
            </div>
          </dl>
        </div>
        <div>
          <p className="text-white/40">Set the price</p>
          <div className="mt-1.5 flex items-center justify-between gap-3 rounded-lg border border-cyan-400/30 bg-cyan-400/[0.06] px-3 py-2">
            <span className="text-white/60">Markdown price</span>
            <span className="font-semibold tabular-nums text-white">$16.00</span>
          </div>
          <p className="mt-1.5 text-[11px] text-[#8b95a8]">27% below the current price.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="rounded-lg bg-sky-500 px-2.5 py-1.5 text-[11px] font-semibold text-white">Create markdown proposal</span>
          <span className="rounded-lg border border-white/[0.12] px-2.5 py-1.5 text-[11px] font-medium text-white/70">Dismiss</span>
        </div>
      </div>
    </div>
  );
}

/* ── Section ────────────────────────────────────────────────────────────── */

/**
 * Plan the promo, see what it needs, then review how it went. `variant` only
 * changes the outer spacing so the block sits naturally on a campaign page
 * (full-bleed sections) or a feature page (stacked showcase blocks).
 */
export function PromotionsPlanningSection({ variant = 'feature' }: { variant?: 'feature' | 'campaign' }) {
  const outer =
    variant === 'campaign'
      ? 'scroll-mt-16 bg-[#06080d] px-6 py-20 md:px-8 lg:py-28'
      : 'px-6 pb-16 md:px-8 lg:pb-20';
  const width = variant === 'campaign' ? 'max-w-[1180px]' : 'max-w-[1120px]';

  return (
    <section id="promotions-planning" aria-labelledby="promotions-planning-heading" className={outer}>
      <div className={`mx-auto ${width}`}>
        <ScrollReveal className="max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">Promotions and demand events</p>
          <h2 id="promotions-planning-heading" className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            Plan the promo, see what it needs, then review how it went
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#9da8b9]">
            A forecast that reacts to your business, not only to past sales. The Demand Calendar in Demand ESP holds the campaigns, discounts, email and SMS sends, price changes, launches and wholesale orders that move demand. Once you add an event to the forecast, purchasing suggestions include it.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <ol className="mt-8 grid gap-3 md:grid-cols-3">
            {promoSteps.map((item) => (
              <li key={item.step} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                <span className="font-mono text-xs text-cyan-300">{item.step}</span>
                <h3 className="mt-4 text-sm font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-xs leading-6 text-[#8b95a8]">{item.body}</p>
              </li>
            ))}
          </ol>
        </ScrollReveal>
        <ScrollReveal className="mt-8 grid min-w-0 gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <DemandCalendarMockup />
          <MarkdownProposalCard />
        </ScrollReveal>
        <p className="mt-5 text-xs leading-6 text-white/45">
          Ordering from the stock check creates a draft purchase order, which needs a plan that includes purchasing (Operate and above).
        </p>
      </div>
    </section>
  );
}
