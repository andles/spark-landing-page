import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Check,
  CircleCheck,
  Layers3,
  Play,
  Route,
  Sparkles,
  TrendingUp,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import BookACallButton from "./BookACallButton";
import { useCtaLinks } from "./ctaLinks";
import ScrollReveal from "./ScrollReveal";

const CTA_OPTIONS = { source: "3pl-price-run-planning" } as const;

interface OperatingModel {
  label: string;
  shortLabel: string;
  client: string;
  item: string;
  spec: string;
  monthlyDemand: number;
  demand: string;
  cadence: string;
}

const operatingModels: OperatingModel[] = [
  {
    label: "Ecommerce fulfillment",
    shortLabel: "Ecommerce",
    client: "Northstar Goods",
    item: "Insulated shipper",
    spec: "Pack: 12-unit · Zone: West",
    monthlyDemand: 1250,
    demand: "1,250 units / mo",
    cadence: "Every 9 weeks",
  },
  {
    label: "B2B distribution",
    shortLabel: "B2B",
    client: "Apex Supply Co.",
    item: "Bulk case pack",
    spec: "Case: 24-unit · Grade: A",
    monthlyDemand: 900,
    demand: "900 units / mo",
    cadence: "Every 9 weeks",
  },
  {
    label: "Cold-chain logistics",
    shortLabel: "Cold chain",
    client: "Blue Harbor Foods",
    item: "Cold-pack kit",
    spec: "Temp: Frozen · Hold: 24 hr",
    monthlyDemand: 1300,
    demand: "1,300 units / mo",
    cadence: "Every 9 weeks",
  },
  {
    label: "Kitting & value-add",
    shortLabel: "Value-add",
    client: "Brightline Brands",
    item: "Retail launch kit",
    spec: "Assembly: 4-step · Pack: 6",
    monthlyDemand: 700,
    demand: "700 units / mo",
    cadence: "Every 9 weeks",
  },
];

interface Stage {
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const stages: Stage[] = [
  {
    label: "Price books",
    title: "Model the rate card exactly",
    description: "Keep house or client-specific vendor pricing by SKU, specification, or cost component—including quantity breaks and setup costs.",
    icon: BookOpen,
  },
  {
    label: "Economics",
    title: "Resolve the real cost of every run",
    description: "Spark matches the item, specification, and quantity to the right price break, then brings demand and operating policy into the decision.",
    icon: TrendingUp,
  },
  {
    label: "Run plan",
    title: "Balance unit cost, cadence, and capital",
    description: "Compare explainable run-size scenarios instead of optimizing one number while inventory, carrying cost, or cash suffers somewhere else.",
    icon: Route,
  },
  {
    label: "Pool & approve",
    title: "Turn compatible demand into leverage",
    description: "Surface opportunities to pool compatible client demand, reach a stronger break, and put a review-ready plan in front of an operator.",
    icon: UsersRound,
  },
];

function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-3 ${accent ? "border-cyan-300/20 bg-cyan-300/[0.07]" : "border-white/[0.07] bg-white/[0.025]"}`}>
      <p className="font-mono text-[8px] tracking-[0.13em] text-white/35">{label}</p>
      <p className={`mt-1 text-sm font-semibold ${accent ? "text-cyan-200" : "text-white"}`}>{value}</p>
    </div>
  );
}

function PriceBookPanel({ model }: { model: OperatingModel }) {
  const breaks = [
    { quantity: "500+", cost: "$7.40", setup: "$360", active: false },
    { quantity: "2,500+", cost: "$6.75", setup: "$310", active: true },
    { quantity: "5,000+", cost: "$6.10", setup: "$280", active: false },
  ];

  return (
    <div className="grid gap-3 md:grid-cols-[0.82fr_1.18fr]">
      <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
        <p className="font-mono text-[9px] tracking-[0.14em] text-white/30">PRICING MODEL</p>
        <div className="mt-3 space-y-2">
          {[
            ["Spec matrix", "Size, grade, region", true],
            ["Per SKU", "Vendor item lists", false],
            ["Components", "Materials + services", false],
          ].map(([label, detail, active]) => (
            <div key={label as string} className={`flex items-center gap-3 rounded-xl border p-3 ${active ? "border-cyan-300/25 bg-cyan-300/[0.08]" : "border-white/[0.05] bg-white/[0.02]"}`}>
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${active ? "bg-cyan-300/10 text-cyan-200" : "bg-white/[0.04] text-white/35"}`}>
                {label === "Components" ? <Layers3 className="h-4 w-4" /> : <Boxes className="h-4 w-4" />}
              </span>
              <span className="min-w-0">
                <span className={`block text-xs font-semibold ${active ? "text-white" : "text-white/55"}`}>{label}</span>
                <span className="block truncate text-[10px] text-white/30">{detail}</span>
              </span>
              {active && <CircleCheck className="ml-auto h-4 w-4 text-cyan-300" />}
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-black/20">
        <div className="border-b border-white/[0.06] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-white">{model.client} vendor book</p>
              <p className="mt-1 text-[10px] text-white/35">{model.item} · {model.spec}</p>
            </div>
            <span className="rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-2 py-1 font-mono text-[8px] tracking-[0.1em] text-emerald-200">ACTIVE</span>
          </div>
        </div>
        <div className="grid grid-cols-[0.75fr_1fr_0.9fr] border-b border-white/[0.05] px-4 py-2 font-mono text-[8px] tracking-[0.1em] text-white/25">
          <span>MIN QTY</span><span>UNIT COST</span><span>SETUP</span>
        </div>
        {breaks.map((row) => (
          <div key={row.quantity} className={`relative grid grid-cols-[0.75fr_1fr_0.9fr] px-4 py-3 text-xs ${row.active ? "bg-cyan-300/[0.08] text-white" : "text-white/45"}`}>
            {row.active && <span className="absolute inset-y-0 left-0 w-0.5 bg-cyan-300" />}
            <span className="font-medium">{row.quantity}</span><span>{row.cost}</span><span>{row.setup}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EconomicsPanel({ model }: { model: OperatingModel }) {
  return (
    <div className="grid gap-3 md:grid-cols-[0.92fr_1.08fr]">
      <div className="grid grid-cols-2 gap-2 content-start">
        <Metric label="DEMAND SIGNAL" value={model.demand} />
        <Metric label="IDEAL CADENCE" value={model.cadence} />
        <Metric label="SOURCING PROFILE" value="Matched" accent />
        <Metric label="BOOK STATUS" value="Current" />
        <div className="col-span-2 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
          <p className="font-mono text-[8px] tracking-[0.13em] text-white/35">ITEM + SPEC RESOLUTION</p>
          <p className="mt-2 truncate text-xs font-semibold text-white">{model.item}</p>
          <p className="mt-1 truncate text-[10px] text-white/35">{model.spec}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[9px] tracking-[0.14em] text-white/30">QUANTITY BREAK LADDER</p>
          <span className="text-[10px] text-cyan-200">Live match</span>
        </div>
        <div className="relative mt-6">
          <div className="absolute left-0 right-0 top-[7px] h-px bg-white/10" />
          <div className="price-run-flow absolute left-0 top-[6px] h-[3px] w-1/2 rounded-full bg-gradient-to-r from-cyan-300 to-violet-400" />
          <div className="relative grid grid-cols-3">
            {["500", "2,500", "5,000"].map((quantity, index) => (
              <div key={quantity} className={`flex flex-col ${index === 0 ? "items-start" : index === 2 ? "items-end" : "items-center"}`}>
                <span className={`h-3.5 w-3.5 rounded-full border-2 ${index === 1 ? "border-cyan-200 bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.65)]" : "border-white/20 bg-[#111621]"}`} />
                <span className={`mt-2 text-[10px] ${index === 1 ? "font-semibold text-white" : "text-white/35"}`}>{quantity}+</span>
                <span className="mt-0.5 text-[9px] text-white/25">{["$7.40", "$6.75", "$6.10"][index]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.07] p-4">
          <div className="flex items-start justify-between gap-4">
            <div><p className="font-mono text-[8px] tracking-[0.12em] text-cyan-200/60">RESOLVED COST</p><p className="mt-1 text-2xl font-semibold text-white">$6.75<span className="text-xs font-normal text-white/35"> / unit</span></p></div>
            <CircleCheck className="h-5 w-5 text-cyan-300" />
          </div>
          <p className="mt-2 text-[10px] text-white/40">2,500-unit break · $310 setup · no interpolation</p>
        </div>
      </div>
    </div>
  );
}

function RunPlanPanel({ model }: { model: OperatingModel }) {
  const roundToHundred = (value: number) => Math.max(500, Math.round(value / 100) * 100);
  const scenarios = [
    { name: "Lean", size: roundToHundred(model.monthlyDemand), runs: 12, net: "$8.8k", returnValue: "12.1×", peakCash: "$1.2k", profitX: 58, profitY: 106, balanceX: 55, totalY: 75, orderingY: 86, carryingY: 120, runwayTop: 62, coverage: 1.9 },
    { name: "Sweet spot", size: roundToHundred(model.monthlyDemand * 2), runs: 6, net: "$10.9k", returnValue: "9.3×", peakCash: "$4.6k", profitX: 132, profitY: 43, balanceX: 126, totalY: 72, orderingY: 104, carryingY: 101, runwayTop: 39, coverage: 3.8 },
    { name: "Price break", size: roundToHundred(model.monthlyDemand * 4), runs: 3, net: "$9.7k", returnValue: "5.8×", peakCash: "$8.1k", profitX: 230, profitY: 69, balanceX: 224, totalY: 49, orderingY: 116, carryingY: 66, runwayTop: 25, coverage: 7.2 },
    { name: "Long run", size: roundToHundred(model.monthlyDemand * 8), runs: 1, net: "$6.5k", returnValue: "2.7×", peakCash: "$14.8k", profitX: 326, profitY: 119, balanceX: 326, totalY: 23, orderingY: 124, carryingY: 27, runwayTop: 14, coverage: 11.8 },
  ];
  const [selectedScenario, setSelectedScenario] = useState(1);
  const scenario = scenarios[selectedScenario];
  const runwayStart = 28;
  const runwayChartEnd = 722;
  const runwayBottom = 83;
  const runwayEndFor = (coverage: number) => runwayStart + ((runwayChartEnd - runwayStart) * coverage) / 12;
  const runwayPath = `M ${runwayStart} ${scenario.runwayTop} L ${runwayEndFor(scenario.coverage)} ${runwayBottom}`;
  const thumbPosition = [8, 36, 66, 94][selectedScenario];

  return (
    <div className="run-planning-cockpit relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#070b12] shadow-[0_24px_80px_rgba(0,0,0,0.34)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.07),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(139,92,246,0.09),transparent_34%)]" />
      <div className="relative flex min-h-12 items-center justify-between gap-4 border-b border-white/[0.07] bg-white/[0.018] px-4">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold text-white">{model.client} · {model.item}</p>
          <p className="mt-0.5 truncate font-mono text-[8px] tracking-[0.1em] text-white/30">12-MONTH RUN ECONOMICS</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden text-[9px] text-white/30 sm:inline">Modeled from price book + demand</span>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-2 py-1 font-mono text-[8px] tracking-[0.08em] text-emerald-200"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.8)]" /> LIVE MODEL</span>
        </div>
      </div>

      <div className="relative grid xl:grid-cols-[205px_minmax(0,1fr)]">
        <aside className="border-b border-white/[0.07] bg-black/20 p-4 xl:border-b-0 xl:border-r">
          <div className="flex items-center justify-between"><p className="font-mono text-[8px] tracking-[0.14em] text-white/30">WHAT-IF CONTROLS</p><span className="rounded-full bg-cyan-300/[0.08] px-2 py-1 text-[8px] font-medium text-cyan-200">{scenario.name}</span></div>
          <div className="mt-4">
            <div className="flex items-end justify-between gap-3"><span className="text-[10px] text-white/40">Run size</span><span className="text-lg font-semibold tabular-nums text-white">{scenario.size.toLocaleString()}</span></div>
            <div className="relative mt-3 h-1 rounded-full bg-white/10">
              <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 transition-all duration-700" style={{ width: `${thumbPosition}%` }} />
              <span className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.7)] transition-all duration-700" style={{ left: `${thumbPosition}%` }} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-1.5">
              {scenarios.map((option, index) => (
                <button key={option.name} type="button" onClick={() => setSelectedScenario(index)} aria-pressed={selectedScenario === index} className={`rounded-lg border px-2 py-2 text-left transition ${selectedScenario === index ? "border-cyan-300/25 bg-cyan-300/[0.08] text-white" : "border-white/[0.05] bg-white/[0.02] text-white/35 hover:bg-white/[0.05] hover:text-white/65"}`}>
                  <span className="block text-[8px] font-semibold">{option.name}</span>
                  <span className="mt-0.5 block font-mono text-[7px] opacity-55">{option.size.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5 space-y-3 border-t border-white/[0.06] pt-4">
            <div><div className="flex items-center justify-between text-[9px]"><span className="text-white/35">Demand</span><span className="font-semibold text-white">+0%</span></div><div className="mt-2 h-1 rounded-full bg-white/10"><div className="h-full w-[58%] rounded-full bg-cyan-400/70" /></div></div>
            <div><div className="flex items-center justify-between text-[9px]"><span className="text-white/35">Cost of capital</span><span className="font-semibold text-white">8% / yr</span></div><div className="mt-2 h-1 rounded-full bg-white/10"><div className="h-full w-[42%] rounded-full bg-violet-400/70" /></div></div>
          </div>
          <div key={`outcome-${scenario.name}`} className="run-plan-value mt-5 rounded-xl border border-emerald-300/15 bg-emerald-300/[0.06] p-3">
            <p className="font-mono text-[7px] tracking-[0.13em] text-emerald-200/55">AT THIS RUN SIZE</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-white">{scenario.net}<span className="ml-1 text-[9px] font-normal text-white/35">net / yr</span></p>
            <div className="mt-2 flex gap-3 text-[8px] text-white/40"><span>{scenario.returnValue} on capital</span><span>{scenario.peakCash} peak cash</span></div>
          </div>
        </aside>

        <div className="grid min-w-0 gap-3 p-3 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-xl border border-white/[0.07] border-t-2 border-t-cyan-300/80 bg-[linear-gradient(180deg,rgba(34,211,238,0.055),rgba(0,0,0,0.18)_34%)] p-3">
            <div className="flex items-start justify-between gap-3"><div><p className="text-[11px] font-semibold text-white">Profit vs run size</p><p className="mt-0.5 text-[8px] text-white/30">Price breaks + demand + capital</p></div>{selectedScenario === 1 && <span className="rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-2 py-1 text-[7px] font-medium text-emerald-200">MODELED SWEET SPOT</span>}</div>
            <div key={`profit-${scenario.name}`} className="relative mt-2">
              <svg viewBox="0 0 360 158" className="h-[148px] w-full overflow-visible" role="img" aria-label={`Profit versus run size with ${scenario.name} selected at ${scenario.size.toLocaleString()} units`}>
                <defs><pattern id={`profit-hatch-${selectedScenario}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="#f59e0b" strokeOpacity="0.12" strokeWidth="2" /></pattern><linearGradient id={`profit-line-${selectedScenario}`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#22d3ee" /><stop offset="0.55" stopColor="#a78bfa" /><stop offset="1" stopColor="#f0abfc" /></linearGradient><linearGradient id={`profit-fill-${selectedScenario}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#22d3ee" stopOpacity="0.22" /><stop offset="1" stopColor="#22d3ee" stopOpacity="0" /></linearGradient></defs>
                <rect x="276" y="19" width="68" height="115" rx="5" fill={`url(#profit-hatch-${selectedScenario})`} /><text x="310" y="29" fill="#fbbf24" fillOpacity="0.48" fontSize="6.5" textAnchor="middle">OVERPRODUCTION</text>
                {[36, 70, 104, 134].map((y) => <line key={y} x1="25" y1={y} x2="344" y2={y} stroke="white" strokeOpacity="0.05" />)}
                <line x1="25" y1="134" x2="344" y2="134" stroke="white" strokeOpacity="0.09" />
                <path d="M 25 129 C 55 108, 89 54, 132 43 S 188 55, 230 69 S 291 107, 344 125 L 344 134 L 25 134 Z" fill={`url(#profit-fill-${selectedScenario})`} />
                <path className="run-plan-chart-line" d="M 25 129 C 55 108, 89 54, 132 43 S 188 55, 230 69 S 291 107, 344 125" fill="none" stroke={`url(#profit-line-${selectedScenario})`} strokeWidth="2.7" strokeLinecap="round" />
                <line className="run-plan-crosshair" x1={scenario.profitX} y1="23" x2={scenario.profitX} y2="134" stroke="#67e8f9" strokeOpacity="0.38" strokeDasharray="3 4" />
                <circle className="run-plan-selected-dot" cx={scenario.profitX} cy={scenario.profitY} r="5.5" fill="#071018" stroke="#67e8f9" strokeWidth="2.5" />
                <circle className="run-plan-selected-halo" cx={scenario.profitX} cy={scenario.profitY} r="10" fill="none" stroke="#67e8f9" strokeOpacity="0.25" />
                <rect x={Math.min(282, Math.max(28, scenario.profitX - 34))} y={Math.max(4, scenario.profitY - 30)} width="68" height="18" rx="9" fill="#102331" stroke="#67e8f9" strokeOpacity="0.18" />
                <text x={Math.min(316, Math.max(62, scenario.profitX))} y={Math.max(16, scenario.profitY - 18)} fill="#cffafe" fontSize="7" textAnchor="middle">{scenario.net} net / yr</text>
                <text x="25" y="149" fill="white" fillOpacity="0.24" fontSize="6.5">SMALLER RUNS</text><text x="344" y="149" fill="white" fillOpacity="0.24" fontSize="6.5" textAnchor="end">LARGER RUNS</text>
              </svg>
              <div className="run-plan-scan pointer-events-none absolute inset-y-2 w-14 bg-gradient-to-r from-transparent via-cyan-200/[0.06] to-transparent blur-md" />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-white/[0.07] border-t-2 border-t-amber-300/90 bg-[linear-gradient(180deg,rgba(251,191,36,0.06),rgba(0,0,0,0.18)_34%)] p-3">
            <div className="flex items-start justify-between gap-3"><div><p className="text-[11px] font-semibold text-white">Ordering vs carrying</p><p className="mt-0.5 text-[8px] text-white/30">Find the economic balance point</p></div><span className="flex items-center gap-1.5 text-[7px] text-amber-200/70"><span className="h-1.5 w-1.5 rounded-full bg-amber-300" /> BALANCE ZONE</span></div>
            <div key={`balance-${scenario.name}`} className="relative mt-2">
              <svg viewBox="0 0 360 158" className="h-[148px] w-full overflow-visible" role="img" aria-label={`Ordering versus carrying cost with ${scenario.name} selected`}>
                <defs><linearGradient id={`ordering-fill-${selectedScenario}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#22d3ee" stopOpacity="0.14" /><stop offset="1" stopColor="#22d3ee" stopOpacity="0" /></linearGradient><linearGradient id={`carrying-fill-${selectedScenario}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fb7185" stopOpacity="0.16" /><stop offset="1" stopColor="#fb7185" stopOpacity="0" /></linearGradient></defs>
                {[36, 70, 104, 134].map((y) => <line key={y} x1="25" y1={y} x2="344" y2={y} stroke="white" strokeOpacity="0.05" />)}
                <path d="M 25 64 C 61 91, 103 105, 145 111 S 252 121, 344 125 L 344 134 L 25 134 Z" fill={`url(#ordering-fill-${selectedScenario})`} /><path d="M 25 126 C 74 121, 112 108, 151 93 S 246 53, 344 20 L 344 134 L 25 134 Z" fill={`url(#carrying-fill-${selectedScenario})`} />
                <path className="run-plan-chart-line" d="M 25 64 C 61 91, 103 105, 145 111 S 252 121, 344 125" fill="none" stroke="#22d3ee" strokeWidth="2.3" strokeLinecap="round" />
                <path className="run-plan-chart-line run-plan-line-delay" d="M 25 126 C 74 121, 112 108, 151 93 S 246 53, 344 20" fill="none" stroke="#fb7185" strokeWidth="2.3" strokeLinecap="round" />
                <path className="run-plan-chart-line run-plan-line-delay-two" d="M 25 59 C 69 84, 101 84, 131 73 S 226 49, 344 13" fill="none" stroke="white" strokeOpacity="0.64" strokeWidth="2.5" strokeLinecap="round" />
                <line className="run-plan-crosshair" x1={scenario.balanceX} y1="18" x2={scenario.balanceX} y2="134" stroke="#fbbf24" strokeOpacity="0.42" strokeDasharray="3 4" />
                <circle cx={scenario.balanceX} cy={scenario.orderingY} r="3.5" fill="#22d3ee" /><circle cx={scenario.balanceX} cy={scenario.carryingY} r="3.5" fill="#fb7185" /><circle className="run-plan-selected-dot" cx={scenario.balanceX} cy={scenario.totalY} r="5.5" fill="#0a0d14" stroke="#fbbf24" strokeWidth="2.5" />
                <text x="334" y="18" fill="white" fillOpacity="0.52" fontSize="6.5" textAnchor="end">TOTAL / CYCLE-YEAR</text><text x="334" y="51" fill="#fb7185" fillOpacity="0.7" fontSize="6.5" textAnchor="end">CARRYING + CAPITAL</text><text x="334" y="125" fill="#22d3ee" fillOpacity="0.72" fontSize="6.5" textAnchor="end">SETUP + ORDERING</text>
                <rect x="91" y="17" width="76" height="19" rx="9.5" fill="#2b2109" stroke="#fbbf24" strokeOpacity="0.3" /><text x="129" y="29.5" fill="#fde68a" fontSize="6.5" textAnchor="middle">cost curves cross</text>
                <text x="25" y="149" fill="white" fillOpacity="0.24" fontSize="6.5">MORE ORDERS</text><text x="344" y="149" fill="white" fillOpacity="0.24" fontSize="6.5" textAnchor="end">MORE HELD STOCK</text>
              </svg>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-white/[0.07] border-t-2 border-t-emerald-300/85 bg-[linear-gradient(180deg,rgba(52,211,153,0.055),rgba(0,0,0,0.18)_38%)] p-3 md:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[11px] font-semibold text-white">Inventory runway</p><p className="mt-0.5 text-[8px] text-white/30">Demand burn-down + planned replenishment</p></div><div className="flex items-center gap-3 text-[8px]"><span className="text-white/35"><strong className="text-white">{scenario.runs}</strong> runs / year</span><span className="text-white/35"><strong className="text-cyan-200">{Math.round(52 / scenario.runs)}</strong> week cadence</span><span className="flex items-center gap-1.5 text-emerald-200/70"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> no modeled gap</span></div></div>
            <div key={`runway-${scenario.name}`} className="relative mt-2 h-[92px]">
              <svg viewBox="0 0 750 103" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-label={`${scenario.size.toLocaleString()} units per run across ${scenario.runs} planned annual runs`}>
                <defs><linearGradient id={`runway-line-${selectedScenario}`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#22d3ee" /><stop offset="0.65" stopColor="#67e8f9" /><stop offset="1" stopColor="#cffafe" /></linearGradient></defs>
                {[18, 50, 83].map((y) => <line key={y} x1="28" y1={y} x2="722" y2={y} stroke="white" strokeOpacity="0.05" />)}
                <line x1="28" y1="83" x2="722" y2="83" stroke="#fb7185" strokeOpacity="0.25" strokeDasharray="4 6" />
                {[0.88, 1.1, 0.72, 1.18, 0.92, 1.22, 0.82, 1.12, 0.75, 1.05, 0.84, 0.98].map((factor, index) => <rect key={index} x={36 + index * 56} y={83 - factor * 8} width="33" height={factor * 8} rx="2" fill="#34d399" fillOpacity="0.12" />)}
                <path d="M 36 76 L 91 72 L 147 78 L 203 70 L 259 75 L 315 68 L 371 74 L 427 67 L 483 73 L 539 69 L 595 75 L 651 70 L 707 74" fill="none" stroke="#34d399" strokeOpacity="0.78" strokeWidth="1.8" />
                {scenarios.map((option, index) => index === selectedScenario ? null : <path key={option.name} d={`M ${runwayStart} ${option.runwayTop} L ${runwayEndFor(option.coverage)} ${runwayBottom}`} fill="none" stroke={["#a78bfa", "#22d3ee", "#fb7185", "#e879f9"][index]} strokeOpacity="0.32" strokeWidth="1.5" />)}
                <path d={runwayPath} fill="none" stroke={`url(#runway-line-${selectedScenario})`} strokeWidth="3.2" strokeLinecap="round" className="runway-line" />
                <circle className="run-plan-selected-dot" cx={runwayStart} cy={scenario.runwayTop} r="4" fill="#090d15" stroke="#67e8f9" strokeWidth="2" /><text x={runwayStart + 8} y={Math.max(9, scenario.runwayTop - 7)} fill="#67e8f9" fontSize="6.2">{scenario.size.toLocaleString()} recommended</text><text x={runwayEndFor(scenario.coverage) - 2} y={runwayBottom - 7} fill="white" fillOpacity="0.72" fontSize="6.2" textAnchor="end">{scenario.coverage} mo</text>
                <text x="28" y="100" fill="white" fillOpacity="0.22" fontSize="6">NOW</text><text x="258" y="100" fill="white" fillOpacity="0.22" fontSize="6">Q2</text><text x="487" y="100" fill="white" fillOpacity="0.22" fontSize="6">Q3</text><text x="722" y="100" fill="white" fillOpacity="0.22" fontSize="6" textAnchor="end">Q4</text>
              </svg>
              <div className="run-plan-scan pointer-events-none absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-violet-200/[0.06] to-transparent blur-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PoolPanel({ model }: { model: OperatingModel }) {
  const clients = [
    [model.client, "1,900"],
    ["Juniper Retail", "1,650"],
    ["Fieldhouse Supply", "1,550"],
  ];
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_auto_0.9fr] md:items-stretch">
      <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
        <div className="flex items-center justify-between"><p className="font-mono text-[9px] tracking-[0.14em] text-white/30">COMPATIBLE DEMAND</p><span className="text-[9px] text-white/30">Same vendor grid</span></div>
        <div className="mt-3 space-y-2">
          {clients.map(([client, quantity], index) => (
            <div key={client} className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.025] p-3">
              <div className="flex min-w-0 items-center gap-2.5"><span className={`h-7 w-1 rounded-full ${["bg-cyan-300", "bg-violet-300", "bg-fuchsia-300"][index]}`} /><span className="truncate text-[11px] font-medium text-white/65">{client}</span></div><span className="ml-3 text-xs font-semibold tabular-nums text-white">{quantity}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3"><span className="text-[10px] text-white/35">Pooled run</span><span className="text-base font-semibold text-white">5,100 units</span></div>
      </div>
      <div className="hidden items-center text-white/20 md:flex"><ArrowRight className="h-4 w-4" /></div>
      <div className="relative overflow-hidden rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.07] p-4">
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-300/10 blur-2xl" />
        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between"><p className="font-mono text-[9px] tracking-[0.14em] text-emerald-200/55">BATCH OPPORTUNITY</p><CircleCheck className="h-5 w-5 text-emerald-300" /></div>
          <p className="mt-4 text-2xl font-semibold leading-tight text-white">5,000-unit<br />break unlocked</p>
          <p className="mt-2 text-[10px] leading-5 text-white/45">Compatible client demand reaches the next vendor price tier without hiding the tradeoffs.</p>
          <div className="mt-auto pt-5"><div className="flex items-center justify-between text-[10px]"><span className="text-white/35">Decision status</span><span className="font-medium text-emerald-200">Ready for review</span></div><div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.08]"><div className="price-run-flow h-full w-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-violet-400" /></div></div>
        </div>
      </div>
    </div>
  );
}

function StagePanel({ stage, model }: { stage: number; model: OperatingModel }) {
  const panels: ReactNode[] = [<PriceBookPanel model={model} />, <EconomicsPanel model={model} />, <RunPlanPanel model={model} />, <PoolPanel model={model} />];
  return <>{panels[stage]}</>;
}

export default function ThreePLPriceRunSection() {
  const { bookUrl } = useCtaLinks(CTA_OPTIONS);
  const [activeStage, setActiveStage] = useState(2);
  const [activeModel, setActiveModel] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timeout = window.setTimeout(() => setActiveStage((current) => (current + 1) % stages.length), activeStage === 2 ? 6000 : 3600);
    return () => window.clearTimeout(timeout);
  }, [activeStage, isAutoPlaying]);

  const stage = stages[activeStage];
  const StageIcon = stage.icon;
  const model = operatingModels[activeModel];

  return (
    <section id="price-run-planning" className="relative scroll-mt-16 overflow-hidden bg-[#06080d] py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_52%_at_72%_48%,rgba(34,211,238,0.08),transparent_70%)]" />
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative z-10 mx-auto max-w-[1360px] px-6 md:px-8 lg:px-12">
        <div className="grid items-end gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2 text-sm text-cyan-200">
              <Sparkles className="h-4 w-4" /> Run economics for modern 3PLs
            </div>
            <h2 className="mt-6 max-w-2xl text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-4xl lg:text-[3.35rem]">
              Turn every rate card into a <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">smarter run plan.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#b8bfcc] lg:text-lg">
              Spark connects vendor price books to live demand so your team can choose run size, cadence, and purchasing leverage with the full economic picture in view.
            </p>
            <div className="mt-7 space-y-3">
              {["House or client-specific vendor price books", "Run size, cadence, carrying cost, and capital tradeoffs", "Compatible client demand surfaced for pooling"].map((promise) => (
                <div key={promise} className="flex items-start gap-3 text-sm leading-6 text-[#d6dae2]"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10"><Check className="h-3.5 w-3.5 text-emerald-300" /></span>{promise}</div>
              ))}
            </div>
            <BookACallButton url={bookUrl} className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 text-sm font-semibold text-[#05070b] shadow-[0_14px_40px_rgba(34,211,238,0.17)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(34,211,238,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080d]">
              See it with your price book <ArrowRight className="h-4 w-4" />
            </BookACallButton>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {operatingModels.map((item, index) => (
                <button key={item.label} type="button" onClick={() => { setActiveModel(index); setIsAutoPlaying(false); }} aria-pressed={activeModel === index} title={item.label} className={`rounded-full border px-3 py-2 text-[10px] font-medium transition sm:text-[11px] ${activeModel === index ? "border-white/20 bg-white/[0.09] text-white" : "border-white/[0.07] bg-white/[0.025] text-white/40 hover:bg-white/[0.05] hover:text-white/65"}`}>{item.shortLabel}</button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.16} className="mt-10">
          <div className="overflow-hidden rounded-[28px] border border-white/[0.10] bg-[#090d15]/95 shadow-[0_34px_110px_rgba(0,0,0,0.5)]">
            <div className="flex min-h-14 items-center justify-between gap-4 border-b border-white/[0.07] bg-white/[0.025] px-4 sm:px-5">
              <div className="flex min-w-0 items-center gap-3"><div className="flex shrink-0 gap-1.5" aria-hidden="true"><span className="h-2 w-2 rounded-full bg-rose-400/70" /><span className="h-2 w-2 rounded-full bg-amber-300/70" /><span className="h-2 w-2 rounded-full bg-emerald-400/70" /></div><span className="truncate font-mono text-[9px] tracking-[0.14em] text-white/35">RUN ECONOMICS / {model.client.toUpperCase()}</span></div>
              <span className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[8px] tracking-[0.11em] text-white/35">ILLUSTRATIVE MODEL</span>
            </div>

            <div className="grid grid-cols-2 gap-2 border-b border-white/[0.07] p-3 sm:grid-cols-4 sm:p-4">
              {stages.map((item, index) => (
                <button key={item.label} type="button" onClick={() => { setActiveStage(index); setIsAutoPlaying(false); }} aria-pressed={activeStage === index} className={`relative min-h-14 overflow-hidden rounded-xl border px-3 py-2 text-left transition-all ${activeStage === index ? "border-cyan-300/25 bg-cyan-300/[0.08] text-cyan-100" : "border-transparent bg-white/[0.02] text-white/35 hover:bg-white/[0.04] hover:text-white/65"}`}>
                  <span className="block font-mono text-[8px] opacity-50">0{index + 1}</span><span className="mt-0.5 block text-[11px] font-semibold">{item.label}</span>
                  {activeStage === index && isAutoPlaying && <span className="price-run-progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400" style={{ animationDuration: activeStage === 2 ? "6s" : "3.6s" }} />}
                </button>
              ))}
            </div>

            <div className="p-4 sm:p-6">
              <div key={`${activeStage}-${activeModel}`} className="agent-stage-enter">
                <div className="mb-5 flex flex-col gap-3 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200"><StageIcon className="h-5 w-5" /></span><div><p className="font-mono text-[8px] tracking-[0.13em] text-white/30">STEP 0{activeStage + 1}</p><h3 className="mt-1 text-base font-semibold text-white sm:text-lg">{stage.title}</h3><p className="mt-1 max-w-3xl text-[11px] leading-5 text-white/40 sm:text-xs">{stage.description}</p></div></div>
                  <button type="button" onClick={() => setIsAutoPlaying((current) => !current)} className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[9px] text-white/40 transition hover:text-white/70" aria-label={isAutoPlaying ? "Pause animation" : "Play animation"}><Play className={`h-3 w-3 ${isAutoPlaying ? "text-cyan-300" : ""}`} />{isAutoPlaying ? "Playing" : "Play tour"}</button>
                </div>
                <StagePanel stage={activeStage} model={model} />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
