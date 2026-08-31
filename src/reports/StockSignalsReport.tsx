import { useEffect, useMemo, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import BookACallButton from "../agency/BookACallButton";
import { PROSPECTS, type ProspectReport } from "./prospects";

// ─────────────────────────────────────────────────────────────────────────────
// /r/<slug>: prospect-specific stock signals report.
//
// One shared component; everything prospect-specific comes from the data
// object in ./prospects.ts. Section 1 renders measured facts exactly as given.
// Sections 2 and 3 are the prospect's own calculator. The route injects a
// robots noindex meta tag so these pages stay out of search engines, and no
// other page links here.
// ─────────────────────────────────────────────────────────────────────────────

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatCrawlDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[(m || 1) - 1]} ${d}, ${y}`;
}

const fmtInt = (n: number) => n.toLocaleString("en-US");
const fmtPct1 = (r: number) => `${(r * 100).toFixed(1)}%`;
const fmtMoney = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/** Digits only, capped, so currency fields stay sane. */
function parseCurrencyInput(raw: string): string {
  return raw.replace(/[^0-9]/g, "").slice(0, 12);
}

const displayFont = { fontFamily: "var(--font-display, 'Inter', sans-serif)" };

// ── Small shared pieces ──────────────────────────────────────────────────────

function SectionLabel({ n, title }: { n: number; title: string }) {
  return (
    <div className="mb-5">
      <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">Section {n}</p>
      <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f2f5] tracking-tight" style={displayFont}>
        {title}
      </h2>
    </div>
  );
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
      <div
        className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent tabular-nums"
        style={displayFont}
      >
        {value}
      </div>
      <div className="text-[#8b95a8] text-sm mt-1.5 leading-snug">{label}</div>
    </div>
  );
}

function CurrencyField({
  id, label, sub, value, placeholder, onChange,
}: {
  id: string;
  label: string;
  sub: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) {
  const display = value ? Number(value).toLocaleString("en-US") : "";
  return (
    <div>
      <label htmlFor={id} className="block text-[#f0f2f5] text-sm font-semibold">{label}</label>
      <p className="text-[#8b95a8] text-xs mt-1 mb-2 leading-relaxed">{sub}</p>
      <div className="relative">
        <span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b95a8] text-sm">$</span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={display}
          placeholder={placeholder}
          onChange={(e) => onChange(parseCurrencyInput(e.target.value))}
          className="w-full h-11 rounded-xl border border-white/[0.1] bg-white/[0.03] pl-8 pr-4 text-[#f0f2f5] text-sm placeholder:text-[#8b95a8]/60 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-colors"
        />
      </div>
    </div>
  );
}

function SliderField({
  id, label, sub, value, min, max, step, onChange,
}: {
  id: string;
  label: string;
  sub?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[#f0f2f5] text-sm font-semibold">{label}</label>
        <span className="text-cyan-400 text-sm font-semibold tabular-nums shrink-0">{value}%</span>
      </div>
      {sub && <p className="text-[#8b95a8] text-xs mt-1 leading-relaxed">{sub}</p>}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full h-1.5 cursor-pointer accent-cyan-400"
      />
      <div className="flex justify-between text-[#8b95a8]/70 text-[11px] mt-1 tabular-nums">
        <span>{min}%</span>
        <span>{max}%</span>
      </div>
    </div>
  );
}

function OutputTile({ value, label, muted }: { value: string; label: string; muted?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
      <div
        className={`text-2xl sm:text-3xl font-bold tabular-nums ${
          muted
            ? "text-[#8b95a8]"
            : "bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"
        }`}
        style={displayFont}
      >
        {value}
      </div>
      <div className="text-[#8b95a8] text-sm mt-1.5 leading-snug">{label}</div>
    </div>
  );
}

// ── Presets (sliders only, currency fields are never touched) ────────────────

const PRESETS = [
  { name: "Conservative", lostRate: 8, promoShare: 50 },
  { name: "Typical", lostRate: 12.5, promoShare: 30 },
  { name: "Aggressive", lostRate: 20, promoShare: 15 },
] as const;

// ── The report ───────────────────────────────────────────────────────────────

export function StockSignalsReport({ data }: { data: ProspectReport }) {
  const crawlLabel = formatCrawlDate(data.crawled);

  // Section 2 inputs. Currency fields start blank on purpose, never prefilled.
  const [revenueRaw, setRevenueRaw] = useState("");
  const [lostRate, setLostRate] = useState(12.5);
  const [margin, setMargin] = useState(55);
  const [promoShare, setPromoShare] = useState(30);
  const [inventoryRaw, setInventoryRaw] = useState("");

  const calc = useMemo(() => {
    const revenue = Number(revenueRaw) || 0;
    const inventory = Number(inventoryRaw) || 0;
    const lostMonthly = revenue * (lostRate / 100);
    const recoveredMonthly = lostMonthly * 0.5;
    const annualized = recoveredMonthly * 12;
    const overbuyShare = data.mdRate * (1 - promoShare / 100);
    return {
      revenue,
      inventory,
      lostMonthly,
      recoveredMonthly,
      firstTwoMonths: recoveredMonthly * 2,
      annualized,
      profitImpact: annualized * (margin / 100),
      overbuyShare,
      cashFreed: inventory * overbuyShare * 0.43,
    };
  }, [revenueRaw, inventoryRaw, lostRate, margin, promoShare, data.mdRate]);

  const hasRevenue = calc.revenue > 0;
  const hasInventory = calc.inventory > 0;

  // Section 1 display values, derived once from the measured facts.
  const inStockPct = fmtPct1(data.fullyInStock / data.sku);
  const partialPct = fmtPct1(data.partiallyOut / data.sku);
  const launchSoldOutPct = `${Math.round((data.launches.withSoldOut / data.launches.n) * 100)}%`;

  return (
    <div className="relative min-h-screen bg-[#06080d]">
      {/* Background layers, same treatment as the rest of the site */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(6,182,212,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(139,92,246,0.08),transparent_50%)]" />
      <div className="absolute inset-0 dot-grid" />
      <div className="absolute inset-0 noise" />

      <div className="relative z-10">
        {/* Minimal header: logo only, no site nav, this page stands alone */}
        <header>
          <div className="max-w-[760px] mx-auto px-6 h-16 flex items-center">
            <a
              href="/"
              className="flex items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
            >
              <img src="/spark-icon-64.webp" alt="" width="32" height="32" decoding="async" className="w-8 h-8" />
              <span className="font-bold text-white text-base tracking-tight">Spark Inventory</span>
            </a>
          </div>
        </header>

        <main className="max-w-[760px] mx-auto px-6 pt-10 pb-20">
          {/* Title */}
          <div className="animate-fade-up">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={displayFont}>
              <span className="text-[#f0f2f5]">Stock signals report: </span>
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                {data.company}
              </span>
            </h1>
          </div>

          {/* ── Section 1: What we measured ── */}
          <section aria-labelledby="measured" className="animate-fade-up delay-100 mt-12">
            <SectionLabel n={1} title="What we measured" />
            <p id="measured" className="text-[#b8bfcc] text-sm sm:text-base leading-relaxed">
              Prepared by Spark from {data.company}'s public storefront catalog, {crawlLabel}.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
              <StatTile value={fmtInt(data.sku)} label="products listed" />
              <StatTile value={fmtInt(data.variants)} label="variants listed" />
              <StatTile value={fmtPct1(data.oosRate)} label="of variants unavailable" />
              <StatTile value={fmtPct1(data.mdRate)} label="of variants marked down" />
            </div>

            {/* Availability breakdown bar */}
            <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
              <div className="flex h-4 rounded-full overflow-hidden" role="img" aria-label={`Fully in stock ${fmtInt(data.fullyInStock)} (${inStockPct}), partially out ${fmtInt(data.partiallyOut)} (${partialPct})`}>
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-400" style={{ width: inStockPct }} />
                <div className="bg-gradient-to-r from-amber-500/80 to-amber-400/80" style={{ width: partialPct }} />
              </div>
              <div className="mt-3 flex flex-col sm:flex-row sm:justify-between gap-2 text-sm">
                <span className="flex items-center gap-2 text-[#f0f2f5]">
                  <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                  Fully in stock {fmtInt(data.fullyInStock)} ({inStockPct})
                </span>
                <span className="flex items-center gap-2 text-[#f0f2f5]">
                  <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-amber-400/90 shrink-0" />
                  Partially out {fmtInt(data.partiallyOut)} ({partialPct})
                </span>
              </div>
              <p className="mt-3 pt-3 border-t border-white/[0.08] text-[#8b95a8] text-sm leading-relaxed">
                {fmtInt(data.fullyInStock)} of {fmtInt(data.sku)} listings are fully in stock. {fmtInt(data.partiallyOut)} products are selling with gaps in the size or color run.
              </p>
            </div>

            {/* Launches */}
            <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
              <p className="text-[#f0f2f5] text-sm sm:text-base font-semibold leading-relaxed">
                {launchSoldOutPct} of the {data.launches.n} products launched in the last 90 days already have at least one sold-out variant.
              </p>
              <ul className="mt-3 space-y-2">
                {[
                  `${data.launches.oosVariants} of ${fmtInt(data.launches.variants)} variants on those launches are already unavailable`,
                  `${data.launches.withMarkdown} of those launches already carry a markdown`,
                ].map((line, i) => (
                  <li key={i} className="flex gap-2.5 text-[#b8bfcc] text-sm leading-relaxed">
                    <span aria-hidden="true" className="mt-[7px] w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── Section 2: Your numbers ── */}
          <section aria-labelledby="your-numbers" className="animate-fade-up delay-200 mt-14">
            <SectionLabel n={2} title="Your numbers" />
            <p id="your-numbers" className="text-[#b8bfcc] text-sm sm:text-base leading-relaxed">
              Only you know these. Enter them and section 3 updates live. Nothing here is stored or sent anywhere.
            </p>

            <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-7 space-y-7">
              <CurrencyField
                id="monthly-revenue"
                label="Monthly revenue"
                sub="Your average online revenue in a normal month."
                value={revenueRaw}
                placeholder="Your monthly revenue"
                onChange={setRevenueRaw}
              />

              {/* Presets: set the two assumption sliders, never the currency fields */}
              <div>
                <p className="text-[#8b95a8] text-xs mb-2">Quick assumptions (sets the two sliders below, leaves your dollar figures alone):</p>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((p) => {
                    const active = lostRate === p.lostRate && promoShare === p.promoShare;
                    return (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => { setLostRate(p.lostRate); setPromoShare(p.promoShare); }}
                        className={`h-9 px-4 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 ${
                          active
                            ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white"
                            : "glass border border-white/15 text-[#b8bfcc] hover:text-white hover:border-white/25"
                        }`}
                      >
                        {p.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <SliderField
                id="lost-rate"
                label="Orders lost when a variant is out of stock"
                sub="Our default assumption: 1 order in 8."
                value={lostRate}
                min={2}
                max={25}
                step={0.5}
                onChange={setLostRate}
              />

              <SliderField
                id="gross-margin"
                label="Gross margin"
                sub="Revenue left after product cost."
                value={margin}
                min={20}
                max={85}
                step={1}
                onChange={setMargin}
              />

              <SliderField
                id="promo-share"
                label="Planned promo share of discounting"
                sub="How much of your discounting is planned promos rather than overbuys."
                value={promoShare}
                min={0}
                max={80}
                step={1}
                onChange={setPromoShare}
              />

              <CurrencyField
                id="inventory-on-hand"
                label="Inventory on hand at cost (optional, unlocks the cash estimate)"
                sub="Roughly what your current inventory cost you to buy. An estimate is fine."
                value={inventoryRaw}
                placeholder="Inventory at cost"
                onChange={setInventoryRaw}
              />
            </div>
          </section>

          {/* ── Section 3: What's available ── */}
          <section aria-labelledby="whats-available" className="animate-fade-up delay-300 mt-14">
            <SectionLabel n={3} title="What's available" />
            <p id="whats-available" className="text-[#b8bfcc] text-sm sm:text-base leading-relaxed">
              {hasRevenue
                ? "Live estimates from your inputs above. Adjust anything and these follow."
                : "Showing $0 until you enter revenue. Add your monthly revenue in section 2 and these fill in live."}
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <OutputTile
                value={fmtMoney(calc.firstTwoMonths)}
                label="recovered revenue, first two months"
                muted={!hasRevenue}
              />
              <OutputTile
                value={fmtMoney(calc.annualized)}
                label="recovered revenue, annualized"
                muted={!hasRevenue}
              />
              <OutputTile
                value={fmtMoney(calc.profitImpact)}
                label={`profit impact at your ${margin}% margin, annualized`}
                muted={!hasRevenue}
              />
            </div>

            <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
              {hasInventory ? (
                <>
                  <div
                    className="text-2xl sm:text-3xl font-bold tabular-nums bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"
                    style={displayFont}
                  >
                    {fmtMoney(calc.cashFreed)}
                  </div>
                  <p className="text-[#8b95a8] text-sm mt-1.5 leading-relaxed">
                    estimated cash freed from excess inventory, based on your {fmtMoney(calc.inventory)} at cost and a {fmtPct1(calc.overbuyShare)} overbuy share of markdowns
                  </p>
                </>
              ) : (
                <p className="text-[#8b95a8] text-sm leading-relaxed">
                  Enter inventory on hand at cost in section 2 to see the cash estimate.
                </p>
              )}
            </div>

            {/* How this is calculated */}
            <details className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] group">
              <summary className="list-none cursor-pointer select-none p-5 flex items-center justify-between gap-3 text-[#f0f2f5] text-sm font-semibold rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60">
                How this is calculated
                <svg aria-hidden="true" className="w-4 h-4 text-[#8b95a8] transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-5 space-y-2.5 text-[#b8bfcc] text-sm leading-relaxed">
                <p className="font-mono text-[13px]">
                  Lost each month = {fmtMoney(calc.revenue)} revenue × {lostRate}% lost rate = {fmtMoney(calc.lostMonthly)}
                </p>
                <p className="font-mono text-[13px]">
                  Recovered each month = {fmtMoney(calc.lostMonthly)} × 0.5 = {fmtMoney(calc.recoveredMonthly)} (stockouts more than halved is our measured cohort result)
                </p>
                <p className="font-mono text-[13px]">
                  First two months = {fmtMoney(calc.recoveredMonthly)} × 2 = {fmtMoney(calc.firstTwoMonths)}
                </p>
                <p className="font-mono text-[13px]">
                  Annualized = {fmtMoney(calc.recoveredMonthly)} × 12 = {fmtMoney(calc.annualized)}
                </p>
                <p className="font-mono text-[13px]">
                  Profit impact = {fmtMoney(calc.annualized)} × {margin}% margin = {fmtMoney(calc.profitImpact)}
                </p>
                <p className="font-mono text-[13px]">
                  Overbuy share = {fmtPct1(data.mdRate)} measured markdown rate × (1 - {promoShare}% promo share) = {fmtPct1(calc.overbuyShare)}
                </p>
                <p className="font-mono text-[13px]">
                  {hasInventory
                    ? `Cash freed = ${fmtMoney(calc.inventory)} inventory at cost × ${fmtPct1(calc.overbuyShare)} × 43% = ${fmtMoney(calc.cashFreed)} (43% less excess is our measured cohort result)`
                    : "Cash freed = inventory at cost × overbuy share × 43% (43% less excess is our measured cohort result)"}
                </p>
                <p className="pt-2 border-t border-white/[0.08]">
                  The catalog numbers are measured from your public storefront. The revenue and cash numbers are estimates driven entirely by the inputs you set above.
                </p>
              </div>
            </details>
          </section>

          {/* ── Section 4: How Spark closes these gaps ── */}
          <section aria-labelledby="closing-gaps" className="animate-fade-up delay-400 mt-14">
            <SectionLabel n={4} title="How Spark closes these gaps" />
            <ul id="closing-gaps" className="space-y-4">
              {[
                { head: "Overstock", body: "buys get sized to forecasted demand instead of gut feel, and slow movers surface before they become clearance. Merchants on Spark usually end up carrying about 43% less excess inventory." },
                { head: "Stockouts", body: "Spark forecasts demand per variant and sets reorder points from your actual sales history, so the sizes and colors that break first get bought deeper and reordered sooner. Merchants running Spark usually see stockouts more than halved." },
                { head: "Planning time", body: "the forecasting, reorder math, and buy planning that live in spreadsheets today collapse into a review. Merchants on Spark usually get planning down to under an hour." },
              ].map((item) => (
                <li key={item.head} className="flex gap-3">
                  <svg aria-hidden="true" className="shrink-0 mt-1 w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-[#b8bfcc] text-sm sm:text-base leading-relaxed">
                    <strong className="text-[#f0f2f5]">{item.head}:</strong> {item.body}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8 text-center">
              <p className="text-[#b8bfcc] text-sm sm:text-base leading-relaxed">
                Everything in section one is measured from the public catalog, so it shows symptoms, not causes. The actual forecast, which variants to restock, how deep, and when, takes your sales history.
              </p>
              <div className="mt-6 flex justify-center">
                <BookACallButton className="h-[46px] px-8 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold text-base transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center">
                  Start forecasting free
                </BookACallButton>
              </div>
              <p className="mt-3 text-[#8b95a8] text-sm">No card, no contract, and the forecast is yours either way.</p>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/[0.06] py-8">
          <div className="max-w-[760px] mx-auto px-6">
            <p className="text-[#8b95a8] text-xs leading-relaxed">
              Prepared by Jason Watts, CRO, Spark Inventory. Counts are from a {crawlLabel} read of the {data.domain} public product feed and change as the catalog does.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

// ── Route wrapper: slug lookup + per-route noindex ───────────────────────────

export default function ProspectReportRoute() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? PROSPECTS[slug] : undefined;

  useEffect(() => {
    if (!data) return;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.title = `Stock signals report: ${data.company}`;

    // noindex applies to this route only; removed again on unmount.
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, [data]);

  if (!data) return <Navigate to="/" replace />;
  return <StockSignalsReport data={data} />;
}
