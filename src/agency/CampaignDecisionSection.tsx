import { ArrowRight, CheckCircle2, type LucideIcon, Network, ScanLine, ShieldCheck, Store, TrendingUp, Users } from 'lucide-react';
import ScrollReveal, { RevealItem } from './ScrollReveal';

type CampaignDecisionKind = '3pl' | 'stockouts' | 'pickup';

interface DecisionCard {
  title: string;
  body: string;
  proof: string;
  icon: LucideIcon;
}

interface DecisionContent {
  eyebrow: string;
  title: string;
  description: string;
  cards: DecisionCard[];
  traceTitle: string;
  trace: { label: string; value: string; note: string }[];
  cta: string;
  ctaHref: string;
}

const content: Record<CampaignDecisionKind, DecisionContent> = {
  '3pl': {
    eyebrow: 'Built around the client relationship',
    title: 'Operate every client separately, without running separate systems',
    description: 'Spark connects client-scoped data, shared operator workflows, price-book economics, and the approvals that keep a 3PL in control.',
    cards: [
      {
        title: 'Client-scoped by design',
        body: 'Keep each client’s catalog, orders, forecasts, and operational context isolated while your team works from a consolidated operator view.',
        proof: 'Client workspaces and client-pinned MCP credentials',
        icon: Users,
      },
      {
        title: 'Plan against real economics',
        body: 'Compare vendor breaks, setup costs, carrying cost, run cadence, and available capital before recommending a production or replenishment run.',
        proof: 'Price-book import and run-planning tools',
        icon: TrendingUp,
      },
      {
        title: 'Give clients an answer, not a spreadsheet',
        body: 'Share current inventory, risk, and reviewed next actions through a branded operating experience while your team retains control.',
        proof: 'Scoped visibility with governed operator actions',
        icon: ShieldCheck,
      },
    ],
    traceTitle: 'A client request becomes an operator-ready plan',
    trace: [
      { label: 'Client signal', value: 'Demand + stock + open supply', note: 'Scoped to the selected client' },
      { label: 'Economic model', value: 'Price breaks + carrying cost', note: 'Compared across run sizes' },
      { label: 'Operator decision', value: 'Review recommended cadence', note: 'Human-controlled next action' },
    ],
    cta: 'Explore AI tools for 3PL operations',
    ctaHref: '/features/tools-services',
  },
  stockouts: {
    eyebrow: 'Explainable inventory control',
    title: 'Move from “low stock” to a decision your buyer can defend',
    description: 'Spark connects the demand evidence, supply position, timing, and purchasing workflow behind every replenishment recommendation.',
    cards: [
      {
        title: 'Detect the change',
        body: 'Compare recent velocity with historical demand, current stock, incoming supply, and lead times to surface the risk window early.',
        proof: 'Demand analysis, forecast, and stock-insight tools',
        icon: ScanLine,
      },
      {
        title: 'Show the reasoning',
        body: 'See which evidence moved the recommendation, rather than accepting a black-box score or rebuilding the model in another sheet.',
        proof: 'Demand evidence and readiness gates',
        icon: TrendingUp,
      },
      {
        title: 'Approve the action',
        body: 'Preview quantities and supplier context, adjust when judgment is needed, and approve the purchase action with a decision record.',
        proof: 'Governed preview, approval, and PO lifecycle',
        icon: CheckCircle2,
      },
    ],
    traceTitle: 'Every recommendation carries its evidence forward',
    trace: [
      { label: 'Risk', value: 'Projected coverage gap', note: 'Timing by SKU and location' },
      { label: 'Evidence', value: 'Velocity + lead time + supply', note: 'Inputs remain visible' },
      { label: 'Action', value: 'Draft purchasing plan', note: 'Reviewed before execution' },
    ],
    cta: 'Explore purchasing and purchase orders',
    ctaHref: '/features/purchasing',
  },
  pickup: {
    eyebrow: 'A location-aware fulfillment loop',
    title: 'Keep the Shopify promise aligned with the store handoff',
    description: 'Spark connects location inventory, the pickup queue, staff preparation, and the final order record so each promise has an operational path behind it.',
    cards: [
      {
        title: 'Promise from location stock',
        body: 'Use the selected store’s inventory position, not an optimistic global count, to inform whether pickup should be offered.',
        proof: 'Location inventory and channel integration context',
        icon: Store,
      },
      {
        title: 'Route work to the store',
        body: 'Turn the order into a clear location-level queue with the item, customer, and status context staff need at the counter.',
        proof: 'Pickup workflow and location-aware order state',
        icon: Network,
      },
      {
        title: 'Close the inventory loop',
        body: 'Record preparation and handoff so the customer promise, order status, and inventory movement stay aligned.',
        proof: 'Tracked handoff and inventory update',
        icon: CheckCircle2,
      },
    ],
    traceTitle: 'One order, one visible chain of custody',
    trace: [
      { label: 'Promise', value: 'Downtown · available', note: 'Location stock checked' },
      { label: 'Prepare', value: '2 items · counter queue', note: 'Store workflow assigned' },
      { label: 'Handoff', value: 'Picked up · recorded', note: 'Order and stock aligned' },
    ],
    cta: 'Explore warehouse operations',
    ctaHref: '/features/warehousing',
  },
};

export default function CampaignDecisionSection({ kind }: { kind: CampaignDecisionKind }) {
  const copy = content[kind];

  return (
    <section id={`${kind}-decision-system`} className="relative scroll-mt-16 overflow-hidden border-y border-white/[0.06] bg-[#080b12] py-16 lg:py-24">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_70%_at_80%_45%,rgba(6,182,212,0.07),transparent_68%)]" />
      <div className="relative mx-auto max-w-[1180px] px-6 md:px-8">
        <ScrollReveal className="max-w-4xl">
          <p className="text-sm font-semibold text-cyan-300">{copy.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">{copy.title}</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#b8bfcc]">{copy.description}</p>
        </ScrollReveal>

        <ScrollReveal staggerChildren={90} className="mt-10 grid gap-4 lg:grid-cols-3">
          {copy.cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <RevealItem key={card.title} index={index}>
                <article className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-7">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-200">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#8b95a8]">{card.body}</p>
                  <p className="mt-6 border-t border-white/[0.06] pt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-300/80">{card.proof}</p>
                </article>
              </RevealItem>
            );
          })}
        </ScrollReveal>

        <ScrollReveal className="mt-6 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#06080d]">
          <div className="border-b border-white/[0.07] px-6 py-5 sm:px-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">Decision trace</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{copy.traceTitle}</h3>
          </div>
          <div className="grid divide-y divide-white/[0.07] md:grid-cols-3 md:divide-x md:divide-y-0">
            {copy.trace.map((item, index) => (
              <div key={item.label} className="relative p-6 sm:px-8">
                <span className="font-mono text-[10px] text-cyan-300">0{index + 1} / {item.label.toUpperCase()}</span>
                <p className="mt-3 text-sm font-semibold text-white">{item.value}</p>
                <p className="mt-1 text-xs leading-5 text-[#8b95a8]">{item.note}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-white/[0.07] px-6 py-5 sm:px-8">
            <a href={copy.ctaHref} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
              {copy.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
