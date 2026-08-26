import {
  ArrowRight,
  BookOpenCheck,
  Boxes,
  Building2,
  ChartNoAxesCombined,
  CircleCheck,
  ClipboardCheck,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import ScrollReveal, { RevealItem } from './ScrollReveal';

type CampaignPlatformKind = '3pl' | 'stockouts';

interface PlatformCard {
  title: string;
  body: string;
  signal: string;
  icon: LucideIcon;
}

interface PlatformContent {
  eyebrow: string;
  title: string;
  description: string;
  cards: PlatformCard[];
  comparisonTitle: string;
  comparisonDescription: string;
  oldLabel: string;
  newLabel: string;
  rows: { topic: string; old: string; next: string }[];
  linkLabel: string;
  linkHref: string;
}

const content: Record<CampaignPlatformKind, PlatformContent> = {
  '3pl': {
    eyebrow: 'The 3PL operating layer',
    title: 'Add planning services without turning every client into a custom project',
    description:
      'Spark keeps the client boundary, economic model, and operator approval path connected, so a 3PL can deliver a repeatable planning service across very different customer operations.',
    cards: [
      {
        title: 'Client-scoped context',
        body: 'Separate catalogs, orders, inventory, suppliers, forecasts, and credentials by client while operators retain a consolidated working view.',
        signal: 'Tenant boundary stays visible',
        icon: Building2,
      },
      {
        title: 'Price books become decisions',
        body: 'Model quantity breaks, setup and ordering costs, capital cost, annual demand, and run cadence before recommending the next production or replenishment run.',
        signal: 'Economics attached to the plan',
        icon: BookOpenCheck,
      },
      {
        title: 'Operators approve the action',
        body: 'Recommendations arrive with the supporting demand and supply context, then wait for review before purchasing or client-facing action moves forward.',
        signal: 'Governed, not autonomous',
        icon: ShieldCheck,
      },
      {
        title: 'A service clients can see',
        body: 'Give clients a clearer view of inventory risk, run choices, and next actions without handing them the internal spreadsheet used to build the answer.',
        signal: 'From report to operating service',
        icon: ChartNoAxesCombined,
      },
    ],
    comparisonTitle: 'From fulfillment reporting to inventory planning',
    comparisonDescription:
      'The difference is not another dashboard. It is whether demand, run economics, and the next approved action remain connected.',
    oldLabel: 'Typical reporting workflow',
    newLabel: 'Spark 3PL workflow',
    rows: [
      { topic: 'Client data', old: 'Exports assembled for each request', next: 'Persistent client-scoped operating context' },
      { topic: 'Vendor pricing', old: 'Price breaks checked manually', next: 'Price books modeled against demand and capital' },
      { topic: 'Run recommendation', old: 'One quantity in a spreadsheet', next: 'Alternatives compared by profit, cash, and runway' },
      { topic: 'Control', old: 'Decision lives in email or a call', next: 'Evidence, review, and approval stay together' },
    ],
    linkLabel: 'See Spark pricing for your operating model',
    linkHref: '/pricing',
  },
  stockouts: {
    eyebrow: 'The replenishment operating layer',
    title: 'Connect the early warning to the purchase decision',
    description:
      'Stockout prevention works when demand changes, current coverage, incoming supply, supplier timing, and the approved response live in one traceable workflow.',
    cards: [
      {
        title: 'Detect the coverage gap',
        body: 'Combine on-hand inventory, recent velocity, forecast demand, incoming supply, and lead time to see when each SKU becomes exposed.',
        signal: 'Risk has a date and a cause',
        icon: ChartNoAxesCombined,
      },
      {
        title: 'Build the buying decision',
        body: 'Move beyond a low-stock alert to a proposed quantity, supplier context, timing, and the evidence that changed the recommendation.',
        signal: 'Alert becomes a plan',
        icon: ClipboardCheck,
      },
      {
        title: 'Protect cash from the opposite error',
        body: 'Evaluate the stockout risk alongside overproduction, carrying cost, order cadence, and the inventory already on the way.',
        signal: 'Availability and cash considered together',
        icon: Boxes,
      },
      {
        title: 'Keep people in control',
        body: 'Let Spark prepare the action while buyers review exceptions, adjust judgment calls, and approve what actually reaches the supplier.',
        signal: 'Human-approved execution',
        icon: CircleCheck,
      },
    ],
    comparisonTitle: 'A reorder point is a trigger. A replenishment plan is a decision.',
    comparisonDescription:
      'Static thresholds can tell a buyer that stock is low. Spark connects the changing evidence needed to decide what to do next.',
    oldLabel: 'Static reorder workflow',
    newLabel: 'Spark replenishment workflow',
    rows: [
      { topic: 'Demand', old: 'Fixed average or manual forecast', next: 'Recent velocity and forecast context remain visible' },
      { topic: 'Supply', old: 'Lead time entered once', next: 'On-hand, incoming, supplier, and timing considered together' },
      { topic: 'Output', old: 'Low-stock alert or reorder point', next: 'Reviewable quantity and timing with evidence' },
      { topic: 'Execution', old: 'Buyer rebuilds the PO manually', next: 'Draft purchasing action moves through approval' },
    ],
    linkLabel: 'See pricing for the planning workflow',
    linkHref: '/pricing',
  },
};

export default function CampaignPlatformSection({ kind }: { kind: CampaignPlatformKind }) {
  const copy = content[kind];

  return (
    <section id={`${kind}-platform`} className="relative scroll-mt-16 overflow-hidden border-y border-white/[0.06] bg-[#06080d] px-6 py-20 md:px-8 lg:py-28">
      <div className="absolute inset-0 dot-grid opacity-15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_15%_45%,rgba(139,92,246,0.08),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1180px]">
        <ScrollReveal className="max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">{copy.eyebrow}</p>
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">{copy.title}</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#b8bfcc]">{copy.description}</p>
        </ScrollReveal>

        <ScrollReveal staggerChildren={80} className="mt-10 grid gap-4 md:grid-cols-2">
          {copy.cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <RevealItem key={card.title} index={index}>
                <article className="group h-full rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 transition-colors hover:border-white/[0.14] hover:bg-white/[0.04] sm:p-7">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#8b95a8]">{card.body}</p>
                    </div>
                  </div>
                  <p className="mt-6 border-t border-white/[0.06] pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-300/80">{card.signal}</p>
                </article>
              </RevealItem>
            );
          })}
        </ScrollReveal>

        <ScrollReveal className="mt-6 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#090d15]">
          <div className="border-b border-white/[0.07] p-6 sm:p-8">
            <h3 className="text-2xl font-semibold tracking-tight text-white">{copy.comparisonTitle}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#8b95a8]">{copy.comparisonDescription}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/[0.07] font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                  <th className="px-6 py-4 font-medium sm:px-8">Decision layer</th>
                  <th className="px-6 py-4 font-medium">{copy.oldLabel}</th>
                  <th className="bg-cyan-300/[0.035] px-6 py-4 font-medium text-cyan-200 sm:px-8">{copy.newLabel}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {copy.rows.map((row) => (
                  <tr key={row.topic}>
                    <th scope="row" className="px-6 py-5 text-sm font-semibold text-white sm:px-8">{row.topic}</th>
                    <td className="px-6 py-5 text-sm leading-6 text-white/45">{row.old}</td>
                    <td className="bg-cyan-300/[0.025] px-6 py-5 text-sm leading-6 text-[#d9e7eb] sm:px-8">{row.next}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-white/[0.07] px-6 py-5 sm:px-8">
            <a href={copy.linkHref} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
              {copy.linkLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
