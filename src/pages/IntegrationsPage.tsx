import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Plug } from 'lucide-react';
import { useMemo } from 'react';
import AgencyHeader from '../agency/AgencyHeader';
import AgencyFooter from '../agency/AgencyFooter';
import BookACallButton from '../agency/BookACallButton';
import ScrollReveal, { RevealItem } from '../agency/ScrollReveal';
import { useCtaLinks } from '../agency/ctaLinks';
import { integrationsFaqs } from './features/featureFaqs';

interface Connector {
  name: string;
  description: string;
  /** White logo in public/logos; connectors without one get a lettermark. */
  logo?: string;
  mark?: string;
}

interface ConnectorGroup {
  id: string;
  label: string;
  intro: string;
  connectors: Connector[];
}

// Live connectors only. Each line says what the connector does in Spark today;
// systems that are only available on request are listed in the closing note.
const groups: ConnectorGroup[] = [
  {
    id: 'sales-channels',
    label: 'Sales channels',
    intro: 'Stores and marketplaces feed sales and stock into one plan.',
    connectors: [
      { name: 'Shopify', logo: '/logos/shopify-2 1.svg', description: 'Products, stock, and sales history, with location-level inventory sync and alerts when Shopify and Spark quantities drift apart.' },
      { name: 'Spark Pickup for Shopify', mark: 'SP', description: 'Shoppers pick a pickup store and time in your Shopify store, and the orders flow into Spark’s Pickup Monitor.' },
      { name: 'Amazon Seller Central and FBA', logo: '/logos/amazon.svg', description: 'Products, stock, and sales from Amazon, with alerts when FBA quantities and Spark disagree.' },
      { name: 'WooCommerce', logo: '/logos/woocommerce (2).svg', description: 'Products and sales from your WooCommerce store.' },
      { name: 'Square', logo: '/logos/Square_Logo_2025_White.svg', description: 'Products and sales from Square Online.' },
      { name: 'Faire', mark: 'F', description: 'Products, stock, and wholesale orders from Faire.' },
      { name: 'Etsy', mark: 'E', description: 'Products and sales from your Etsy shop.' },
      { name: 'Meta Commerce', logo: '/logos/meta 1.svg', description: 'Products and sales from Facebook and Instagram shops.' },
    ],
  },
  {
    id: 'accounting',
    label: 'Accounting',
    intro: 'Spark sends the documents. Your books stay the record.',
    connectors: [
      { name: 'QuickBooks Online', logo: '/logos/quickbooks.svg', description: 'Bring in sales and purchase history, and send invoices, bills, credit notes, and vendor credits to QuickBooks.' },
      { name: 'Xero', mark: 'X', description: 'Send Spark’s accounting documents to Xero, with a sync history you can check.' },
      { name: 'Zoho Books', logo: '/logos/Zoho-Books-logo 2.svg', description: 'Send Spark’s accounting documents to Zoho Books, with a sync history you can check.' },
    ],
  },
  {
    id: 'shipping',
    label: 'Shipping and trading partners',
    intro: 'Labels, inbound freight, and partner documents without leaving Spark.',
    connectors: [
      { name: 'ShipStation', logo: '/logos/logo-ss-primary-rgb-1-1 1.svg', description: 'Shipping rates, labels, voids, and tracking from inside your ship lists.' },
      { name: 'Flexport', mark: 'Fx', description: 'Create inbound shipping plans from transfer orders and track receiving automatically.' },
      { name: 'EDI', logo: '/logos/edi 1.svg', description: 'Exchange purchase orders, invoices, and shipping notices with trading partners.' },
    ],
  },
  {
    id: 'payments-email',
    label: 'Payments and email',
    intro: 'Get paid on invoices and keep supplier email in the loop.',
    connectors: [
      { name: 'Spark Payments', mark: '$', description: 'Accept card and ACH payments on invoices, with surcharging support.' },
      { name: 'Gmail', mark: 'G', description: 'Capture order and supplier emails from a connected inbox, and send customer emails from your own address.' },
    ],
  },
  {
    id: 'ai-assistants',
    label: 'AI assistants',
    intro: 'Bring the assistant your team already uses.',
    connectors: [
      { name: 'Claude and ChatGPT', mark: 'AI', description: 'Connect your own AI assistant to Spark over MCP, with read-only or read and write access that you control.' },
    ],
  },
];

const connectorCount = groups.reduce((total, group) => total + group.connectors.length, 0);

function ConnectorBadge({ connector, size = 'md' }: { connector: Connector; size?: 'md' | 'lg' }) {
  const box = size === 'lg' ? 'h-16' : 'h-12';
  if (connector.logo) {
    return (
      <span className={`flex ${box} items-center`}>
        <img src={connector.logo} alt={connector.name} loading="lazy" className="h-6 w-auto max-w-[120px] object-contain" />
      </span>
    );
  }
  return (
    <span className={`flex ${box} items-center gap-3`}>
      <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] text-xs font-bold text-white">
        {connector.mark}
      </span>
      <span className="text-sm font-semibold text-white">{connector.name}</span>
    </span>
  );
}

/** Logo wall for the hero: the channels Spark connects, around one plan. */
function HeroLogoWall() {
  const logos = groups.flatMap((group) => group.connectors).filter((connector) => connector.logo);
  return (
    <div className="relative rounded-3xl border border-white/[0.09] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 shadow-2xl shadow-cyan-950/20 sm:p-8">
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      <div className="grid grid-cols-3 gap-3">
        {logos.map((connector) => (
          <div key={connector.name} className="flex h-16 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] px-3">
            <img src={connector.logo} alt={connector.name} className="h-5 w-auto max-w-full object-contain opacity-80" />
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-center gap-3 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-3 text-sm font-semibold text-white">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-400">
          <Plug className="h-3.5 w-3.5 text-white" />
        </span>
        {connectorCount} live connectors, one inventory plan
      </div>
    </div>
  );
}

export function IntegrationsPage() {
  const ctaOptions = useMemo(() => ({ source: 'integrations' }), []);
  const { signupUrl, bookUrl } = useCtaLinks(ctaOptions);

  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />

      <main>
        <section className="relative overflow-hidden px-6 pb-16 pt-28 md:px-8 lg:pb-24 lg:pt-32">
          <div className="absolute inset-0 dot-grid opacity-35" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_75%_10%,rgba(6,182,212,0.12),transparent_62%)]" />
          <div className="absolute -left-56 top-48 h-[620px] w-[620px] rounded-full bg-violet-500/[0.07] blur-[130px]" />

          <div className="relative z-10 mx-auto max-w-[1180px]">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#8b95a8] transition-colors hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Spark Inventory
            </Link>

            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
              <ScrollReveal>
                <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-[#b8bfcc]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-400">
                    <Plug className="h-4 w-4 text-white" />
                  </span>
                  Sales channels, accounting, shipping, and AI
                </div>
                <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[4.25rem]">
                  <span className="text-[#f0f2f5]">Inventory Integrations</span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Every Channel in One Plan</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
                  Connect the stores, marketplaces, accounting, and shipping tools you already use. Spark pulls them into one inventory plan and sends the results back where your team works.
                </p>
                <nav aria-label="Integration categories" className="mt-8 flex flex-wrap gap-2">
                  {groups.map((group) => (
                    <a key={group.id} href={`#${group.id}`} className="rounded-full border border-white/[0.10] bg-white/[0.03] px-4 py-2 text-xs font-semibold text-[#b8bfcc] transition-colors hover:border-white/20 hover:text-white">
                      {group.label}
                    </a>
                  ))}
                </nav>
              </ScrollReveal>

              <ScrollReveal delay={0.12}>
                <HeroLogoWall />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="relative border-t border-white/[0.06] px-6 py-16 md:px-8 lg:py-20">
          <div className="mx-auto max-w-[1180px] space-y-16">
            {groups.map((group) => (
              <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`} className="scroll-mt-28 grid gap-6 lg:grid-cols-[0.32fr_0.68fr] lg:gap-12">
                <ScrollReveal>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">{group.connectors.length} {group.connectors.length === 1 ? 'connector' : 'connectors'}</p>
                  <h2 id={`${group.id}-heading`} className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{group.label}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#9da8b9]">{group.intro}</p>
                </ScrollReveal>
                <ScrollReveal staggerChildren={50} className="grid gap-3 sm:grid-cols-2">
                  {group.connectors.map((connector, index) => (
                    <RevealItem key={connector.name} index={index}>
                      <article className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-white/[0.14] hover:bg-white/[0.05]">
                        <ConnectorBadge connector={connector} />
                        {connector.logo && <h3 className="mt-3 text-sm font-semibold text-white">{connector.name}</h3>}
                        {!connector.logo && <h3 className="sr-only">{connector.name}</h3>}
                        <p className="mt-2 text-sm leading-6 text-[#8b95a8]">{connector.description}</p>
                      </article>
                    </RevealItem>
                  ))}
                </ScrollReveal>
              </section>
            ))}
          </div>
        </section>

        <section className="relative border-t border-white/[0.06] bg-white/[0.015] px-6 py-16 md:px-8 lg:py-24" aria-labelledby="integrations-faq-heading">
          <div className="mx-auto grid max-w-[1080px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <ScrollReveal>
              <p className="text-sm font-semibold text-cyan-300">Integrations, explained</p>
              <h2 id="integrations-faq-heading" className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Connecting your systems to Spark</h2>
              <p className="mt-4 max-w-md text-base leading-7 text-[#b8bfcc]">What connects today, what each connector does, and what to do if yours is not listed.</p>
            </ScrollReveal>
            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {integrationsFaqs.map((faq, index) => (
                <details key={faq.question} className="group" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-base font-semibold text-white marker:content-none">
                    {faq.question}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.10] text-cyan-300 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="max-w-3xl pb-5 pr-12 text-sm leading-7 text-[#9ba5b6]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <nav aria-label="Related feature pages" className="border-y border-white/[0.06] bg-white/[0.02] px-6 py-6 md:px-8">
          <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-4">
            <Link to="/features/wholesale-suppliers" className="inline-flex items-center gap-2 text-sm text-[#b8bfcc] transition-colors hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Wholesale &amp; Suppliers
            </Link>
            <Link to="/features" className="inline-flex items-center gap-2 text-right text-sm text-[#b8bfcc] transition-colors hover:text-white">
              All features
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>

        <section className="relative overflow-hidden px-6 py-20 text-center md:px-8 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_70%_at_50%_100%,rgba(6,182,212,0.11),transparent_68%)]" />
          <ScrollReveal className="relative mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">See your own inventory plan in Spark Inventory</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#b8bfcc]">Upload the data you already have and turn it into the next decisions your team needs to make.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={signupUrl} className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">Start Free</a>
              <BookACallButton url={bookUrl} className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]">Book a demo</BookACallButton>
            </div>
            <div className="mt-6 text-sm text-[#b8bfcc]">
              Using NetSuite, BigCommerce, Walmart, ShipBob, or another system? <a href="/contact" className="underline hover:text-white">Ask us about it</a>.
            </div>
          </ScrollReveal>
        </section>
      </main>

      <AgencyFooter />
    </div>
  );
}
