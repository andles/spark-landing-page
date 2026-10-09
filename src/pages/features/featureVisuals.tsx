// Coded product illustrations and section blocks for the mobile, signals, and
// wholesale feature pages. Every mockup shows example data and says so.
import { type ReactNode } from 'react';
import ScrollReveal from '../../agency/ScrollReveal';

export interface FlowStep {
  step: string;
  title: string;
  body: string;
}

/** Numbered process strip, matching the reorder flow on the purchasing page. */
export function FlowSection({ id, eyebrow, title, intro, steps, footer }: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  steps: readonly FlowStep[];
  footer?: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="px-6 pb-16 md:px-8 lg:pb-20">
      <div className="mx-auto max-w-[1120px]">
        <ScrollReveal className="max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">{eyebrow}</p>
          <h2 id={id} className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
          <p className="mt-3 text-sm leading-7 text-[#9da8b9]">{intro}</p>
        </ScrollReveal>
        <ScrollReveal>
          <ol className={`mt-8 grid gap-3 ${steps.length === 5 ? 'md:grid-cols-5' : 'md:grid-cols-3'}`}>
            {steps.map((item) => (
              <li key={item.step} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                <span className="font-mono text-xs text-cyan-300">{item.step}</span>
                <h3 className="mt-4 text-sm font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-xs leading-6 text-[#8b95a8]">{item.body}</p>
              </li>
            ))}
          </ol>
          {footer}
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── Mobile ─────────────────────────────────────────────────────────────── */

const floorFlowSteps: readonly FlowStep[] = [
  { step: '01', title: 'Receive', body: 'Scan the delivery against its purchase order. Shorts, overs, and unlisted items are flagged on the line.' },
  { step: '02', title: 'Put away', body: 'Scan or pick the bin. Stock is live in that location the moment it lands.' },
  { step: '03', title: 'Pick', body: 'Work the pick list by location, or let Auto Pick fill lines by earliest expiry.' },
  { step: '04', title: 'Pack', body: 'Scan each item into its package. Spark checks the UPC against the order.' },
  { step: '05', title: 'Ship', body: 'Finish packing and ship out. The order, the stock, and the plan all update together.' },
];

const scannerOptions = [
  { title: 'Phone camera', body: 'UPC, EAN, Code 128, QR, DataMatrix, and more.' },
  { title: 'Rugged handhelds', body: 'Zebra and Sunmi devices in keyboard mode.' },
  { title: 'Docked iPad', body: 'Run the Pickup Monitor at the counter, in landscape.' },
];

export function ScannerStrip() {
  return (
    <div className="mt-4 grid gap-3 md:grid-cols-3">
      {scannerOptions.map((option) => (
        <p key={option.title} className="rounded-2xl border border-white/[0.08] bg-[#0a0d14] p-5 text-sm leading-7 text-[#b8bfcc]">
          <span className="font-semibold text-white">{option.title}. </span>
          {option.body}
        </p>
      ))}
    </div>
  );
}

/* ── Signals and automation ─────────────────────────────────────────────── */

// Recreated from the web app's Spark Signal page (web-app modules/Signal):
// the same title, view toggles, and action verbs, with example data.
const exampleSignals = [
  { type: 'Reorder alert', cls: 'bg-sky-50 text-sky-700', title: 'Classic Tee, Black, M is below its reorder point', why: 'Days of supply is shorter than the supplier lead time.', verb: 'Create purchase order', urgent: true },
  { type: 'Backorder', cls: 'bg-amber-50 text-amber-700', title: 'SO-2281 is waiting on stock', why: 'Spark drafted a delay email for the customer.', verb: 'Send email', urgent: true },
  { type: 'Inventory mismatch', cls: 'bg-violet-50 text-violet-700', title: 'Shopify shows 3 more Canvas Totes than Spark', why: 'The Main warehouse quantity drifted after a manual edit.', verb: 'Sync inventory', urgent: false },
  { type: 'Slow mover', cls: 'bg-emerald-50 text-emerald-700', title: 'Dad Cap, Olive has not sold in 60 days', why: 'Spark proposes a markdown to move the stock.', verb: 'Apply markdown', urgent: false },
];

/** The Spark Signal page with example proposed actions. */
export function SignalInboxMockup() {
  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-white text-slate-900 shadow-2xl shadow-black/40">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 px-4 py-3">
          <span className="text-[15px] font-semibold text-gray-900">Spark Signal</span>
          <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">2 need you</span>
          <div className="ml-auto flex rounded-lg bg-slate-100 p-0.5 text-[10px] font-medium text-slate-500">
            <span className="rounded-md bg-white px-2 py-0.5 text-slate-900 shadow-sm">Ranked</span>
            <span className="px-2 py-0.5">Feed</span>
            <span className="px-2 py-0.5">Kanban</span>
          </div>
        </div>
        <ul className="divide-y divide-slate-100">
          {exampleSignals.map((signal) => (
            <li key={signal.title} className={`px-4 py-3 ${signal.urgent ? 'border-l-2 border-l-red-400' : 'border-l-2 border-l-transparent'}`}>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${signal.cls}`}>{signal.type}</span>
              <p className="mt-1.5 text-[13px] font-semibold text-gray-900">{signal.title}</p>
              <p className="mt-0.5 text-xs text-slate-500">{signal.why}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-lg bg-sky-500 px-2.5 py-1 text-[11px] font-semibold text-white">{signal.verb}</span>
                <span className="rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600">Dismiss</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-3 flex items-center justify-center gap-2 text-xs text-white/40">
        The Spark Signal page
      </figcaption>
    </figure>
  );
}

// Mode names and descriptions follow the web app's Automation settings
// (web-app modules/Setup/Automation/SignalsTab/signalsMeta.ts).
const trustModes = [
  { name: 'Observe', body: 'Surface it in the Signal feed, but don\u2019t draft any action.' },
  { name: 'Propose', body: 'Spark drafts the action and waits for you to approve it in the Signal feed.' },
  { name: 'Autopilot', body: 'Spark drafts and runs the action. You see the result already done.' },
];

/** Rule builder, trust modes, and a Spark Solo text thread. */
export function AutomationShowcase() {
  return (
    <section aria-labelledby="automation-heading" className="px-6 pb-16 md:px-8 lg:pb-24">
      <div className="mx-auto max-w-[1120px]">
        <ScrollReveal className="max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">How a rule is built</p>
          <h2 id="automation-heading" className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Say what you want. Choose how far it goes.</h2>
          <p className="mt-3 text-sm leading-7 text-[#9da8b9]">Describe a rule in plain English, check it with a dry run, then pick a mode. You can change the mode or turn the rule off at any time.</p>
        </ScrollReveal>

        <ScrollReveal className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">New rule</p>
             
            </div>
            <p className="mt-4 rounded-xl border border-white/[0.08] bg-[#0a0d14] px-4 py-3 text-sm text-white">
              “When an item’s days of supply drops below its lead time, propose a reorder PO and ask the buyer to approve it.”
            </p>
            <dl className="mt-4 grid gap-2 text-xs sm:grid-cols-3">
              <div className="rounded-xl border border-white/[0.06] bg-[#0a0d14] p-3">
                <dt className="text-white/40">When</dt>
                <dd className="mt-1 text-white">Days of supply &lt; lead time</dd>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-[#0a0d14] p-3">
                <dt className="text-white/40">Then</dt>
                <dd className="mt-1 text-white">Propose reorder PO</dd>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-[#0a0d14] p-3">
                <dt className="text-white/40">Check</dt>
                <dd className="mt-1 text-white">Daily, buyer approves</dd>
              </div>
            </dl>
            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] px-4 py-3 text-xs text-emerald-200">
              <span className="font-semibold">Dry run</span>
              <span className="text-emerald-200/70">Would have proposed 3 POs against last week’s data. No conflicts with existing rules.</span>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {trustModes.map((mode) => (
                <div key={mode.name} className={`rounded-xl border p-3 ${mode.name === 'Propose' ? 'border-cyan-400/40 bg-cyan-400/[0.07]' : 'border-white/[0.06] bg-[#0a0d14]'}`}>
                  <p className="text-sm font-semibold text-white">{mode.name}</p>
                  <p className="mt-1 text-xs leading-5 text-[#8b95a8]">{mode.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0a0d14] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Spark Solo by text</p>
              <a href="/spark-solo" className="text-xs font-semibold text-cyan-300 hover:text-white">Meet Spark Solo</a>
            </div>
            <div className="mt-4 space-y-2.5 text-[13px] leading-5">
              <p className="mr-8 rounded-2xl rounded-bl-md bg-white/[0.06] px-3.5 py-2.5 text-white/85">Spark Solo morning brief: 1 urgent, 6 open. A7: Classic Tee, Black, M is below its reorder point. Reply A7 for details, or ask me anything.</p>
              <p className="ml-8 rounded-2xl rounded-br-md bg-gradient-to-r from-cyan-500/80 to-violet-500/80 px-3.5 py-2.5 text-white">How many black tees do we have?</p>
              <p className="mr-8 rounded-2xl rounded-bl-md bg-white/[0.06] px-3.5 py-2.5 text-white/85">Spark Solo: 42 on hand at Main warehouse, with 24 more arriving on PO-1042.</p>
              <p className="ml-8 rounded-2xl rounded-br-md bg-gradient-to-r from-cyan-500/80 to-violet-500/80 px-3.5 py-2.5 text-white">Draft a reorder for them.</p>
              <p className="mr-8 rounded-2xl rounded-bl-md bg-white/[0.06] px-3.5 py-2.5 text-white/85">Spark Solo: B3: Create PO to Northline Supply: 96 Classic Tee, Black, M. Reply YES B3 to create it or NO B3 to skip.</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── Wholesale and suppliers ────────────────────────────────────────────── */

// Recreated from the vendor portal's purchase order page
// (web-app modules/VendorPortal/VendorPurchaseOrderPage): order details,
// shipping information, change requests, and line items, with example data.
const vendorLines = [
  { line: 1, item: 'Classic Tee, Black, M', qty: 48, price: '$6.40' },
  { line: 2, item: 'Classic Tee, White, L', qty: 24, price: '$6.40' },
  { line: 3, item: 'Dad Cap, Navy', qty: 12, price: '$4.10' },
];

/** What a supplier sees when they open a purchase order in the vendor portal. */
export function VendorPortalMockup() {
  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-slate-50 text-slate-900 shadow-2xl shadow-black/40">
        <div className="border-b border-slate-200 bg-white px-4 py-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">Vendor portal · Northline Apparel</p>
          <p className="mt-0.5 text-[15px] font-semibold">PO-1042</p>
          <p className="text-[11px] text-slate-500">Purchase order details and line items</p>
        </div>
        <div className="grid gap-2 p-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-[11px] font-semibold">Shipping Information</p>
            <dl className="mt-2 space-y-1 text-[11px]">
              <div className="flex justify-between"><dt className="text-slate-400">Status</dt><dd className="rounded bg-emerald-50 px-1.5 font-medium text-emerald-700">Shipped</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">Carrier</dt><dd>UPS</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">Tracking Number</dt><dd className="font-mono text-[10px]">1Z 84X 302</dd></div>
            </dl>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-[11px] font-semibold">Change Requests</p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px]">
              <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">Modify</span>
              <span className="truncate">Dad Cap, Navy: 12 to 10</span>
            </div>
            <p className="mt-1.5 text-[10px] text-amber-700">Waiting for buyer review</p>
          </div>
        </div>
        <div className="mx-3 mb-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <p className="border-b border-slate-100 px-3 py-2 text-[11px] font-semibold">Line Items</p>
          <table className="w-full text-left text-[11px]">
            <thead className="text-[10px] text-slate-400">
              <tr><th className="px-3 py-1.5 font-medium">Line</th><th className="py-1.5 font-medium">Item</th><th className="py-1.5 text-right font-medium">Quantity</th><th className="px-3 py-1.5 text-right font-medium">Unit price</th></tr>
            </thead>
            <tbody>
              {vendorLines.map((row) => (
                <tr key={row.line} className="border-t border-slate-100">
                  <td className="px-3 py-1.5 text-slate-400">{row.line}</td>
                  <td className="py-1.5">{row.item}</td>
                  <td className="py-1.5 text-right tabular-nums">{row.qty}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <figcaption className="mt-3 flex items-center justify-center gap-2 text-xs text-white/40">
        A purchase order in the vendor portal
      </figcaption>
    </figure>
  );
}

function LoopNode({ label, title, items, highlight }: { label: string; title: string; items: string[]; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${highlight ? 'border-cyan-400/35 bg-cyan-400/[0.07]' : 'border-white/[0.09] bg-white/[0.03]'}`}>
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{title}</p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li key={item} className="rounded-full border border-white/[0.08] bg-[#0a0d14] px-2 py-0.5 text-[10px] text-[#b8bfcc]">{item}</li>
        ))}
      </ul>
    </div>
  );
}

function LoopArrow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-1 text-[10px] text-white/40" aria-hidden="true">
      <span className="h-5 w-px bg-gradient-to-b from-cyan-400/60 to-violet-400/60" />
      {label}
    </div>
  );
}

/** Customers, Spark, and suppliers on one loop. */
export function WholesaleLoopDiagram() {
  return (
    <figure className="mx-auto w-full max-w-[420px] rounded-3xl border border-white/[0.09] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5 shadow-2xl shadow-cyan-950/20 sm:p-6">
      <LoopNode label="Your customers" title="Order how they already buy" items={['B2B store', 'EDI', 'Faire']} />
      <LoopArrow label="Orders and demand" />
      <LoopNode label="Spark Inventory" title="One plan, one stock count" items={['Forecast', 'Reorder', 'Invoices']} highlight />
      <LoopArrow label="Purchase orders" />
      <LoopNode label="Your suppliers" title="See and update their POs" items={['Vendor portal', 'EDI', 'Email capture']} />
      <figcaption className="mt-4 text-center text-xs text-white/40">How orders and purchase orders move through Spark.</figcaption>
    </figure>
  );
}

const supplierFlowSteps: readonly FlowStep[] = [
  { step: '01', title: 'Draft PO', body: 'Spark proposes the purchase order from your plan, and your buyer approves it.' },
  { step: '02', title: 'Supplier sees it', body: 'The PO appears in the vendor portal, goes out by email, or is sent over EDI. Suppliers add shipping status and tracking.' },
  { step: '03', title: 'Change request', body: 'The supplier asks for a new date or quantity in the portal. Your buyer accepts or declines.' },
  { step: '04', title: 'Receive', body: 'The delivery is scanned in against the PO, with any short or over lines flagged.' },
  { step: '05', title: 'Match the invoice', body: 'Spark reads the supplier invoice and flags anything that does not match.' },
];

/** The receive-to-ship strip for the mobile page, with scanner options below. */
export function MobileFloorFlow() {
  return (
    <FlowSection
      id="mobile-flow-heading"
      eyebrow="On the floor"
      title="One app from the dock to the door"
      intro="Every step updates the same stock and plan your team sees on the web."
      steps={floorFlowSteps}
      footer={<ScannerStrip />}
    />
  );
}

/** The purchase order loop for the wholesale page, with the loop diagram below. */
export function SupplierFlow() {
  return (
    <FlowSection
      id="supplier-flow-heading"
      eyebrow="Purchase order loop"
      title="From proposed PO to matched invoice"
      intro="Suppliers work in the same record your buyers do, so changes and shipping updates never live in a side inbox."
      steps={supplierFlowSteps}
      footer={<div className="mt-10"><WholesaleLoopDiagram /></div>}
    />
  );
}
