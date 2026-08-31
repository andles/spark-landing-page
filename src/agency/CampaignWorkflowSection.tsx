import { useEffect, useState } from "react";
import {
  ArrowRight,
  Boxes,
  Building2,
  Check,
  CircleCheck,
  ClipboardCheck,
  Gauge,
  PackageCheck,
  ScanSearch,
  ShoppingBag,
  Sparkles,
  Store,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { CampaignKind } from "./campaignFaqs";
import ScrollReveal from "./ScrollReveal";

interface WorkflowStep {
  label: string;
  title: string;
  body: string;
  signals: string[];
  resultLabel: string;
  resultValue: string;
  icon: LucideIcon;
}

interface WorkflowContent {
  eyebrow: string;
  title: string;
  gradientTitle: string;
  description: string;
  workspace: string;
  promises: string[];
  steps: WorkflowStep[];
  accent: "cyan" | "emerald" | "violet" | "rose";
}

const workflows: Record<CampaignKind, WorkflowContent> = {
  "3pl": {
    eyebrow: "3PL control plane",
    title: "Turn fulfillment into a",
    gradientTitle: "client retention engine",
    description:
      "Give every client a smarter inventory operation without adding another spreadsheet, analyst, or disconnected portal to your team.",
    workspace: "NORTHSTAR GOODS / CLIENT WORKSPACE",
    promises: ["Client-scoped operations", "Branded visibility", "Forecast-to-fulfillment workflow"],
    accent: "cyan",
    steps: [
      {
        label: "Connect",
        title: "Unify every client signal",
        body: "Bring store orders, warehouse stock, purchase orders, and history into the client's own operating context.",
        signals: ["Shopify + Amazon", "Warehouse stock", "Open purchase orders"],
        resultLabel: "CLIENT DATA",
        resultValue: "Scoped and ready",
        icon: Building2,
      },
      {
        label: "Forecast",
        title: "Predict demand by client and SKU",
        body: "Spark combines velocity, inventory, and lead times so your team sees risk before the client asks about it.",
        signals: ["Sales velocity", "Current on-hand", "Supplier lead time"],
        resultLabel: "RISK WINDOW",
        resultValue: "Visible by SKU",
        icon: TrendingUp,
      },
      {
        label: "Act",
        title: "Turn risk into replenishment",
        body: "Recommendations become reviewable purchasing actions instead of another report someone has to interpret manually.",
        signals: ["Reorder evidence", "Vendor terms", "Client policy"],
        resultLabel: "NEXT ACTION",
        resultValue: "Draft plan ready",
        icon: ClipboardCheck,
      },
      {
        label: "Share",
        title: "Keep clients informed under your brand",
        body: "Give clients the visibility and answers they expect while your team stays in control of the operational workflow.",
        signals: ["Branded portal", "Live status", "Approval history"],
        resultLabel: "CLIENT EXPERIENCE",
        resultValue: "Always informed",
        icon: CircleCheck,
      },
    ],
  },
  stockouts: {
    eyebrow: "Inventory risk engine",
    title: "See the stockout before it",
    gradientTitle: "becomes a fire drill",
    description:
      "Spark turns the signals already inside your business into an explainable risk window and a purchasing decision your team can approve.",
    workspace: "REPLENISHMENT / RISK TRACE",
    promises: ["SKU-level risk windows", "Reasoning attached", "Human-approved action"],
    accent: "rose",
    steps: [
      {
        label: "Listen",
        title: "Unify demand and supply signals",
        body: "Sales history, stock, incoming supply, and lead times become one planning signal instead of competing tabs.",
        signals: ["Sales history", "On-hand + incoming", "Lead times"],
        resultLabel: "SIGNAL COVERAGE",
        resultValue: "Demand + supply",
        icon: ScanSearch,
      },
      {
        label: "Detect",
        title: "Catch velocity changes early",
        body: "Spark detects when a SKU is moving differently from the old plan and recalculates the exposure.",
        signals: ["7-day velocity", "Seasonality", "Demand changes"],
        resultLabel: "CHANGE DETECTED",
        resultValue: "+18% velocity",
        icon: Gauge,
      },
      {
        label: "Decide",
        title: "Calculate what to buy and when",
        body: "The recommendation includes timing, quantity, and the evidence behind the decision, not a black-box score.",
        signals: ["Days of supply", "Safety stock", "Order cadence"],
        resultLabel: "RECOMMENDATION",
        resultValue: "420 units · Jun 18",
        icon: TrendingUp,
      },
      {
        label: "Approve",
        title: "Move from alert to reviewed action",
        body: "Adjust the quantity if needed, approve the draft PO, and keep a record of why the team made the call.",
        signals: ["Draft PO", "Team review", "Decision history"],
        resultLabel: "CONTROL",
        resultValue: "Ready for approval",
        icon: ClipboardCheck,
      },
    ],
  },
  pickup: {
    eyebrow: "Pickup control loop",
    title: "Promise pickup only when the",
    gradientTitle: "stock is really there",
    description:
      "Connect the pickup promise to the store's preparation and handoff workflow, with location-level inventory behind every step.",
    workspace: "DOWNTOWN STORE / PICKUP QUEUE",
    promises: ["Location-aware promise", "Automatic store workflow", "Clear customer handoff"],
    accent: "emerald",
    steps: [
      {
        label: "Promise",
        title: "Offer pickup from available store stock",
        body: "The customer chooses a location from inventory that belongs to that store, not an optimistic global count.",
        signals: ["Pickup order", "Store on-hand", "Location rules"],
        resultLabel: "AVAILABLE TO PROMISE",
        resultValue: "Downtown · in stock",
        icon: Store,
      },
      {
        label: "Route",
        title: "Send the order to the right counter",
        body: "Spark routes the pickup into the selected location's working queue with the information staff needs.",
        signals: ["Selected store", "Order details", "Counter station"],
        resultLabel: "PICKUP QUEUE",
        resultValue: "Ticket #1842",
        icon: ShoppingBag,
      },
      {
        label: "Prepare",
        title: "Give staff one clear preparation flow",
        body: "The store sees what to pick, the customer context, and the status without chasing an ecommerce admin screen.",
        signals: ["Pick ticket", "Item check", "Ready status"],
        resultLabel: "STORE ACTION",
        resultValue: "2 items prepared",
        icon: PackageCheck,
      },
      {
        label: "Handoff",
        title: "Complete pickup with a clean record",
        body: "Finish the customer handoff, update the order state, and keep inventory and the operating record aligned.",
        signals: ["Customer arrival", "Handoff check", "Stock update"],
        resultLabel: "ORDER STATUS",
        resultValue: "Picked up · 4:18 PM",
        icon: CircleCheck,
      },
    ],
  },
  fishbowl: {
    eyebrow: "Agent-led migration",
    title: "Move the operation, not the",
    gradientTitle: "spreadsheet cleanup",
    description:
      "Sparki or your own AI assistant takes on the inspection, mapping, repair, and validation work while your team keeps control of the import.",
    workspace: "FISHBOWL / MIGRATION RUN",
    promises: ["Multi-file understanding", "Every row validated", "Approval before import"],
    accent: "violet",
    steps: [
      {
        label: "Inspect",
        title: "Understand the Fishbowl exports",
        body: "The agent profiles every file, identifies what it contains, and orders the migration around the dependencies in the data.",
        signals: ["Parts + products", "Customers + vendors", "Sales + purchasing"],
        resultLabel: "SOURCE PROFILE",
        resultValue: "5 files classified",
        icon: ScanSearch,
      },
      {
        label: "Map",
        title: "Build the Spark data model",
        body: "Columns are mapped to the right records and missing catalog context is surfaced instead of silently guessed.",
        signals: ["Field mapping", "Entity matching", "Missing references"],
        resultLabel: "MAPPING",
        resultValue: "42 fields resolved",
        icon: Boxes,
      },
      {
        label: "Validate",
        title: "Repair safe issues and check every row",
        body: "Safe fixes are explained, ambiguous decisions come back to you, and the full dataset is validated before import.",
        signals: ["Format repairs", "Judgment calls", "Full validation"],
        resultLabel: "VALIDATION",
        resultValue: "Ready for review",
        icon: ClipboardCheck,
      },
      {
        label: "Approve",
        title: "See the proposal before anything lands",
        body: "Review the exact counts and changes, approve the import, then verify that forecasting and operations are ready.",
        signals: ["Import proposal", "Human approval", "Readiness check"],
        resultLabel: "MIGRATION",
        resultValue: "Forecast foundation ready",
        icon: CircleCheck,
      },
    ],
  },
  shopify: {
    eyebrow: "Shopify planning loop",
    title: "Shopify records the sale.",
    gradientTitle: "Spark plans the next buy.",
    description:
      "Connect the live channel, build the historical demand signal, and turn every SKU's position into a reviewed purchasing decision.",
    workspace: "SHOPIFY / INVENTORY PLAN",
    promises: ["Live channel context", "Historical demand signal", "Draft POs with reasoning"],
    accent: "emerald",
    steps: [
      {
        label: "Connect",
        title: "Bring in the live Shopify operation",
        body: "Products, variants, orders, and live channel context flow into the inventory workspace.",
        signals: ["Products + variants", "Live orders", "Locations"],
        resultLabel: "CHANNEL",
        resultValue: "Shopify connected",
        icon: ShoppingBag,
      },
      {
        label: "Enrich",
        title: "Add the history and supply context",
        body: "Sparki fills the gaps the live connection does not know yet: history, costs, suppliers, and lead times.",
        signals: ["Sales history", "Unit costs", "Supplier lead times"],
        resultLabel: "FOUNDATION",
        resultValue: "Planning-ready",
        icon: Sparkles,
      },
      {
        label: "Forecast",
        title: "See what every SKU needs next",
        body: "Spark combines demand, stock, and supply timing to expose risk and calculate the next buy.",
        signals: ["SKU velocity", "Available stock", "Incoming supply"],
        resultLabel: "REORDER PLAN",
        resultValue: "18 SKUs need action",
        icon: TrendingUp,
      },
      {
        label: "Approve",
        title: "Review the PO instead of rebuilding it",
        body: "Your team sees the reasoning, adjusts when needed, and approves the supplier-ready draft from one place.",
        signals: ["Supplier grouping", "Order quantities", "Decision evidence"],
        resultLabel: "PURCHASING",
        resultValue: "3 draft POs ready",
        icon: ClipboardCheck,
      },
    ],
  },
};

const accentClasses = {
  cyan: {
    pill: "border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-200",
    active: "border-cyan-300/25 bg-cyan-300/[0.09] text-cyan-200",
    icon: "border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300",
    line: "from-cyan-300 via-violet-400 to-fuchsia-400",
    result: "border-cyan-300/20 bg-cyan-300/[0.07]",
  },
  emerald: {
    pill: "border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-200",
    active: "border-emerald-300/25 bg-emerald-300/[0.09] text-emerald-200",
    icon: "border-emerald-300/20 bg-emerald-300/[0.08] text-emerald-300",
    line: "from-emerald-300 via-cyan-300 to-violet-400",
    result: "border-emerald-300/20 bg-emerald-300/[0.07]",
  },
  violet: {
    pill: "border-violet-300/20 bg-violet-300/[0.07] text-violet-200",
    active: "border-violet-300/25 bg-violet-300/[0.09] text-violet-200",
    icon: "border-violet-300/20 bg-violet-300/[0.08] text-violet-300",
    line: "from-violet-300 via-fuchsia-300 to-cyan-300",
    result: "border-violet-300/20 bg-violet-300/[0.07]",
  },
  rose: {
    pill: "border-rose-300/20 bg-rose-300/[0.07] text-rose-200",
    active: "border-rose-300/25 bg-rose-300/[0.09] text-rose-200",
    icon: "border-rose-300/20 bg-rose-300/[0.08] text-rose-300",
    line: "from-rose-300 via-violet-300 to-cyan-300",
    result: "border-rose-300/20 bg-rose-300/[0.07]",
  },
};

export default function CampaignWorkflowSection({ kind }: { kind: CampaignKind }) {
  const content = workflows[kind];
  const colors = accentClasses[content.accent];
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % content.steps.length);
    }, 2800);
    return () => window.clearInterval(interval);
  }, [content.steps.length, isAutoPlaying]);

  const active = content.steps[activeStep];
  const ActiveIcon = active.icon;

  return (
    <section id="campaign-workflow" className="scroll-mt-16 relative overflow-hidden bg-[#06080d] py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_54%_at_78%_48%,rgba(6,182,212,0.08),transparent_70%)]" />
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-12 px-6 md:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14 lg:px-12">
        <ScrollReveal>
          <div className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm ${colors.pill}`}>
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {content.eyebrow}
          </div>
          <h2 className="mt-6 text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-4xl lg:text-[3.15rem]">
            {content.title}
            <span className={`block bg-gradient-to-r ${colors.line} bg-clip-text text-transparent`}>{content.gradientTitle}</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#b8bfcc] lg:text-lg">{content.description}</p>
          <div className="mt-7 space-y-3">
            {content.promises.map((promise) => (
              <div key={promise} className="flex items-center gap-3 text-sm text-[#d6dae2]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
                  <Check className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                </span>
                {promise}
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <div className="overflow-hidden rounded-[28px] border border-white/[0.10] bg-[#090d15]/95 shadow-[0_32px_100px_rgba(0,0,0,0.45)]">
            <div className="flex min-h-14 items-center justify-between border-b border-white/[0.07] bg-white/[0.025] px-4 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-rose-400/70" />
                  <span className="h-2 w-2 rounded-full bg-amber-300/70" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                </div>
                <span className="hidden font-mono text-[9px] tracking-[0.16em] text-white/35 sm:inline">{content.workspace}</span>
              </div>
              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[9px] tracking-[0.12em] text-white/40">LIVE MODEL</span>
            </div>

            <div className="grid grid-cols-2 gap-2 border-b border-white/[0.07] p-3 sm:grid-cols-4 sm:p-4">
              {content.steps.map((step, index) => (
                <button
                  key={step.label}
                  type="button"
                  onClick={() => {
                    setActiveStep(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`min-h-12 rounded-xl border px-3 py-2 text-left transition-all ${
                    activeStep === index ? colors.active : "border-transparent bg-white/[0.02] text-white/35 hover:bg-white/[0.04] hover:text-white/65"
                  }`}
                  aria-pressed={activeStep === index}
                >
                  <span className="block font-mono text-[9px] opacity-60">0{index + 1}</span>
                  <span className="mt-0.5 block text-[11px] font-semibold">{step.label}</span>
                </button>
              ))}
            </div>

            <div className="p-5 sm:p-6">
              <div key={active.title} className="agent-stage-enter">
                <div className="flex items-start gap-4">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${colors.icon}`}>
                    <ActiveIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.14em] text-white/30">STEP 0{activeStep + 1}</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{active.title}</h3>
                  </div>
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-[#8b95a8]">{active.body}</p>
              </div>

              <div className="mt-6 grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
                <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                  <p className="font-mono text-[9px] tracking-[0.14em] text-white/30">INPUT SIGNALS</p>
                  <div className="mt-3 space-y-2">
                    {active.signals.map((signal, index) => (
                      <div key={signal} className="flex items-center justify-between rounded-lg bg-white/[0.035] px-3 py-2 text-[11px] text-[#b8bfcc]">
                        <span>{signal}</span>
                        <span className={`h-1.5 w-1.5 rounded-full ${index === 0 ? "animate-pulse bg-cyan-300" : "bg-emerald-300/70"}`} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hidden items-center justify-center text-white/20 sm:flex">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </div>

                <div className={`flex flex-col justify-between rounded-2xl border p-4 ${colors.result}`}>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[9px] tracking-[0.14em] text-white/35">{active.resultLabel}</p>
                    <CircleCheck className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                  </div>
                  <p className="my-5 text-xl font-semibold text-white">{active.resultValue}</p>
                  <div className="h-1 overflow-hidden rounded-full bg-white/[0.08]">
                    <div className={`h-full bg-gradient-to-r ${colors.line} transition-[width] duration-700`} style={{ width: `${25 * (activeStep + 1)}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
