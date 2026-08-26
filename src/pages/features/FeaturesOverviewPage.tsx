import {
  ArrowRight,
  Bot,
  Calculator,
  Factory,
  Package,
  ShoppingCart,
  Truck,
  Warehouse,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AgencyFooter from '../../agency/AgencyFooter';
import AgencyHeader from '../../agency/AgencyHeader';
import BookACallButton from '../../agency/BookACallButton';
import ScrollReveal, { RevealItem } from '../../agency/ScrollReveal';
import { useCtaLinks } from '../../agency/ctaLinks';

interface Capability {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent: string;
  highlights: string[];
}

const capabilities: Capability[] = [
  {
    title: 'Inventory management',
    description: 'Keep items, variants, stock, locations, bundles, barcodes, and adjustments in one operating record.',
    href: '/features/inventory',
    icon: Package,
    accent: 'from-emerald-400 to-cyan-400',
    highlights: ['SKU and variant control', 'Live stock by location', 'Audit-ready adjustments'],
  },
  {
    title: 'Purchasing & planning',
    description: 'Turn demand, lead times, and supplier context into reviewable purchase decisions and tracked receipts.',
    href: '/features/purchasing',
    icon: Truck,
    accent: 'from-violet-400 to-fuchsia-400',
    highlights: ['Reorder recommendations', 'PO approvals and receiving', 'Supplier and landed-cost context'],
  },
  {
    title: 'Sales & customers',
    description: 'Run quotes, orders, invoices, returns, and customer records against the same inventory truth.',
    href: '/features/sales',
    icon: ShoppingCart,
    accent: 'from-blue-400 to-cyan-300',
    highlights: ['Sales order workflows', 'Invoicing and returns', 'Customer-specific pricing'],
  },
  {
    title: 'Manufacturing & BOMs',
    description: 'Connect components, bills of materials, production runs, and finished-goods availability to demand.',
    href: '/features/manufacturing',
    icon: Factory,
    accent: 'from-orange-400 to-amber-300',
    highlights: ['Multi-level BOMs', 'Material availability', 'Production planning'],
  },
  {
    title: 'Warehouse operations',
    description: 'Coordinate receiving, bins, transfers, picking, packing, and cycle counts across locations.',
    href: '/features/warehousing',
    icon: Warehouse,
    accent: 'from-slate-300 to-cyan-300',
    highlights: ['Bin-level inventory', 'Transfers and receiving', 'Pick, pack, and count'],
  },
  {
    title: 'QuickBooks & accounting',
    description: 'Keep invoices, payments, inventory adjustments, and financial context moving without double entry.',
    href: '/features/accounting',
    icon: Calculator,
    accent: 'from-green-400 to-emerald-300',
    highlights: ['QuickBooks Online sync', 'Invoices and payments', 'Inventory valuation context'],
  },
  {
    title: 'Sparki, MCP & automation',
    description: 'Onboard and operate with Sparki in app or your own AI assistant through Spark’s governed MCP tools.',
    href: '/features/tools-services',
    icon: Bot,
    accent: 'from-pink-400 to-violet-400',
    highlights: ['Agentic import and validation', 'Governed preview and approval', 'Readiness and demand analysis'],
  },
];

const operatingLoop = [
  ['01', 'Bring in the truth', 'Connect a channel, upload a spreadsheet for Sparki, or let your assistant bring data through MCP.'],
  ['02', 'See what is ready', 'Spark checks inventory, sales history, suppliers, lead times, and the gaps blocking better decisions.'],
  ['03', 'Review the next action', 'Forecasts, replenishment plans, and operational writes arrive with context and an approval step.'],
] as const;

export function FeaturesOverviewPage() {
  const { signupUrl } = useCtaLinks();

  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />
      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-32 md:px-8 lg:pb-28 lg:pt-40">
          <div className="absolute inset-0 dot-grid opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-8%,rgba(6,182,212,0.14),transparent_62%)]" />
          <div className="absolute -right-56 top-44 h-[620px] w-[620px] rounded-full bg-violet-500/[0.08] blur-[140px]" />
          <ScrollReveal className="relative z-10 mx-auto max-w-[1180px] text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">The complete Spark platform</p>
            <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.9rem]">
              One inventory system.<br />
              <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                Every decision connected.
              </span>
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
              Track the operation, understand demand, and move the next decision forward, from the first import through purchasing, fulfillment, and accounting.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={signupUrl} className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 text-sm font-semibold transition-transform hover:scale-[1.02]">
                Start Free
              </a>
              <BookACallButton className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-semibold transition-colors hover:bg-white/[0.08]">
                See Spark on Your Data
              </BookACallButton>
            </div>
          </ScrollReveal>
        </section>

        <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-16 md:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <ScrollReveal className="max-w-3xl">
              <p className="text-sm font-semibold text-cyan-300">Explore the product</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Go deep on the workflow your team owns</h2>
              <p className="mt-4 leading-7 text-[#b8bfcc]">Every capability shares the same inventory, order, supplier, and decision context, so work does not disappear between modules.</p>
            </ScrollReveal>

            <ScrollReveal staggerChildren={70} className="mt-10 grid gap-4 md:grid-cols-2">
              {capabilities.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <RevealItem
                    key={capability.href}
                    index={index}
                    className={index === capabilities.length - 1 ? 'md:col-span-2' : undefined}
                  >
                    <Link to={capability.href} className="group relative block h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0d14] p-6 transition-all hover:-translate-y-0.5 hover:border-white/[0.16] sm:p-7">
                      <div className={`absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent ${capability.accent} to-transparent opacity-65`} />
                      <div className="flex items-start gap-4">
                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${capability.accent}`}>
                          <Icon className="h-5 w-5 text-[#061018]" aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold tracking-tight">{capability.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-[#8b95a8]">{capability.description}</p>
                        </div>
                      </div>
                      <ul className="mt-6 grid gap-2 border-t border-white/[0.06] pt-5 sm:grid-cols-3">
                        {capability.highlights.map((highlight) => <li key={highlight} className="text-xs leading-5 text-white/55">{highlight}</li>)}
                      </ul>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                        Explore {capability.title} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </Link>
                  </RevealItem>
                );
              })}
            </ScrollReveal>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-20 md:px-8 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_50%_50%,rgba(139,92,246,0.07),transparent_68%)]" />
          <div className="relative mx-auto max-w-[1080px]">
            <ScrollReveal className="text-center">
              <p className="text-sm font-semibold text-violet-300">One operating loop</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">From unfamiliar data to a governed decision</h2>
            </ScrollReveal>
            <ScrollReveal staggerChildren={100} className="mt-10 grid gap-4 md:grid-cols-3">
              {operatingLoop.map(([number, title, body], index) => (
                <RevealItem key={number} index={index}>
                  <article className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
                    <span className="font-mono text-xs text-cyan-300">{number}</span>
                    <h3 className="mt-8 text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#8b95a8]">{body}</p>
                  </article>
                </RevealItem>
              ))}
            </ScrollReveal>
          </div>
        </section>
      </main>
      <AgencyFooter />
    </div>
  );
}
