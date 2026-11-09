import {
  ArrowRight, Barcode, ChartNoAxesCombined, Check, FileSpreadsheet, MessageSquareText, Plug, Warehouse,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AgencyHeader from '../agency/AgencyHeader';
import AgencyFooter from '../agency/AgencyFooter';
import BookACallButton from '../agency/BookACallButton';
import ScrollReveal, { RevealItem } from '../agency/ScrollReveal';
import { useCtaLinks } from '../agency/ctaLinks';
import { pricingTiers } from '../agency/pricingData';
import { ALTERNATIVES_CHECKED, alternativeOptions, type AlternativeKey } from '../agency/competitors/alternativesData';
import { smallBusinessChecklist, smallBusinessFaqs } from '../content/smallBusiness';

const heroFacts = [
  'Free for one user',
  'Paid plans from $99 a month',
  'Unlimited users on paid plans',
  'No SKU or warehouse limits',
];

const capabilities = [
  {
    icon: Warehouse,
    title: 'Stock you can trust',
    body: 'Items, variants, bundles, and stock levels by location, updated from every channel you sell on.',
    href: '/features/inventory/',
    link: 'Inventory management',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'A demand forecast for every SKU',
    body: 'Demand ESP reads each item’s sales history, seasonality, and stockouts, so you know what will sell, not just what is low.',
    href: '/demand-forecasting-software/',
    link: 'Demand forecasting',
  },
  {
    icon: FileSpreadsheet,
    title: 'Draft purchase orders to approve',
    body: 'Spark recommends what to buy, when, and how much, then drafts the purchase order with the reasoning attached.',
    href: '/features/purchasing/',
    link: 'Purchasing',
  },
  {
    icon: Barcode,
    title: 'Barcode scanning on your phone',
    body: 'Receive, pick, pack, count, and move stock from iPhone, iPad, or Android with the camera or a rugged scanner.',
    href: '/features/mobile/',
    link: 'Mobile app',
  },
  {
    icon: Plug,
    title: 'Connected to your store and books',
    body: 'Shopify, Amazon, WooCommerce, Square, Etsy, QuickBooks Online, Xero, and more feed one inventory plan.',
    href: '/integrations/',
    link: 'Integrations',
  },
  {
    icon: MessageSquareText,
    title: 'Run it by text',
    body: 'From Solo up, Sparki texts you when an item will run short and lets you approve the drafted order with a reply.',
    href: '/text-with-sparki/',
    link: 'Text with Sparki',
  },
];

const comparedTools: AlternativeKey[] = ['spark', 'zoho', 'inflow', 'fishbowl', 'katana'];

export function SmallBusinessInventoryPage() {
  const { signupUrl, bookUrl } = useCtaLinks({ source: 'small-business-inventory-software' });

  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />
      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-28 md:px-8 lg:pb-24 lg:pt-32">
          <div className="absolute inset-0 dot-grid opacity-35" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(34,211,238,0.12),transparent_65%)]" />
          <div className="relative z-10 mx-auto max-w-[1180px] text-center">
            <ScrollReveal>
              <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2 text-sm text-cyan-100">
                Inventory software for small business
              </p>
              <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.6rem]">
                Small Business Inventory Software
                <span className="block bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400 bg-clip-text text-transparent">That Tells You What to Buy Next</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
                Track stock across every location and channel, scan barcodes from your phone, and get a demand forecast for each SKU that turns into a draft purchase order you approve. Start free, and add your whole team when you upgrade.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={signupUrl} className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-8 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">Start Free</a>
                <BookACallButton url={bookUrl} className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]">Book a demo</BookACallButton>
              </div>
              <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#c9d1dc]">
                {heroFacts.map((fact) => (
                  <li key={fact} className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                    {fact}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        <section aria-labelledby="needs-heading" className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-16 md:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <ScrollReveal className="max-w-3xl">
              <p className="text-sm font-semibold text-cyan-300">One system instead of a spreadsheet</p>
              <h2 id="needs-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">What a small business inventory system should do</h2>
              <p className="mt-4 text-base leading-7 text-[#b8bfcc]">Most small businesses start with a spreadsheet and a reorder point. That works until you add a second channel, a second location, or a supplier with a long lead time. Spark keeps the count, then plans the buy.</p>
            </ScrollReveal>
            <ScrollReveal staggerChildren={70} className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <RevealItem key={item.title} index={index}>
                    <article className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                      <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#8b95a8]">{item.body}</p>
                      <Link to={item.href} className="group mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-cyan-200 hover:text-white">
                        {item.link}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </Link>
                    </article>
                  </RevealItem>
                );
              })}
            </ScrollReveal>
          </div>
        </section>

        <section aria-labelledby="plans-heading" className="px-6 py-16 md:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <ScrollReveal className="max-w-3xl">
              <p className="text-sm font-semibold text-cyan-300">Grow into it</p>
              <h2 id="plans-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Start free, upgrade when you are ready to act</h2>
              <p className="mt-4 text-base leading-7 text-[#b8bfcc]">Free is an ongoing plan, not a trial. Paid plans include a 14-day free trial and unlimited users.</p>
            </ScrollReveal>
            <ScrollReveal staggerChildren={80} className="mt-10 grid gap-4 md:grid-cols-3">
              {pricingTiers.map((tier, index) => (
                <RevealItem key={tier.name} index={index}>
                  <article className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#0a0d14] p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">{tier.promise}</p>
                    <h3 className="mt-3 text-xl font-semibold">{tier.name}</h3>
                    <p className="mt-1 text-2xl font-bold">{tier.price}<span className="text-sm font-medium text-[#8b95a8]">{tier.period ?? ''}</span></p>
                    <p className="mt-1 text-xs text-[#8b95a8]">{tier.users === 'Unlimited' ? 'Unlimited users' : tier.users}</p>
                    <p className="mt-4 text-sm leading-6 text-[#aeb6c3]">{tier.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-[#c9d1dc]">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-300" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                </RevealItem>
              ))}
            </ScrollReveal>
            <p className="mt-6 text-sm text-[#8b95a8]">
              Manufacturers can start Scale at $749 a month for bills of materials and production planning.{' '}
              <Link to="/pricing/" className="font-semibold text-cyan-200 underline-offset-4 hover:underline">Compare every plan.</Link>
            </p>
          </div>
        </section>

        <section aria-labelledby="cost-heading" className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-16 md:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <ScrollReveal className="max-w-3xl">
              <p className="text-sm font-semibold text-cyan-300">Inventory software cost</p>
              <h2 id="cost-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">What small business inventory software costs</h2>
              <p className="mt-4 text-base leading-7 text-[#b8bfcc]">Published prices and user limits for five tools small businesses often compare. Price is only part of it: check what each plan caps and whether forecasting is included.</p>
            </ScrollReveal>
            <ScrollReveal className="mt-10 overflow-hidden rounded-2xl border border-white/[0.08]">
              <div className="hidden grid-cols-[1fr_1.6fr_1.2fr_1.6fr] gap-6 border-b border-white/[0.08] bg-white/[0.03] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45 md:grid">
                <span>Tool</span><span>Pricing</span><span>Users</span><span>Buying plan</span>
              </div>
              {comparedTools.map((key) => {
                const option = alternativeOptions[key];
                const isSpark = key === 'spark';
                return (
                  <div key={key} className={`grid gap-3 border-b border-white/[0.06] px-6 py-5 last:border-b-0 md:grid-cols-[1fr_1.6fr_1.2fr_1.6fr] md:gap-6 ${isSpark ? 'bg-cyan-300/[0.06]' : ''}`}>
                    <div>
                      <p className={`font-semibold ${isSpark ? 'text-cyan-100' : 'text-white'}`}>{option.name}</p>
                      {option.comparisonHref && (
                        <Link to={option.comparisonHref} className="mt-1 inline-block text-xs text-cyan-300 hover:text-white">
                          {option.name.replace(' Inventory', '')} alternatives
                        </Link>
                      )}
                    </div>
                    {([['Pricing', option.pricing], ['Users', option.users], ['Buying plan', option.planning]] as const).map(([label, value]) => (
                      <div key={label}>
                        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35 md:hidden">{label}</p>
                        <p className="text-sm leading-6 text-[#aeb6c3]">{value}</p>
                      </div>
                    ))}
                  </div>
                );
              })}
            </ScrollReveal>
            <p className="mt-5 text-xs leading-6 text-[#7f8999]">
              Spark Inventory publishes this comparison. Details for the other tools come from each vendor’s public pricing page, checked {ALTERNATIVES_CHECKED}. Prices and plans can change, so confirm with the vendor before you buy.
            </p>
          </div>
        </section>

        <section aria-labelledby="choose-heading" className="px-6 py-16 md:px-8 lg:py-24">
          <div className="mx-auto max-w-[1080px]">
            <ScrollReveal className="max-w-3xl">
              <p className="text-sm font-semibold text-cyan-300">Buyer’s checklist</p>
              <h2 id="choose-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">How to choose an inventory system for a small business</h2>
            </ScrollReveal>
            <ScrollReveal>
              <ol className="mt-10 grid gap-4 md:grid-cols-2">
                {smallBusinessChecklist.map((item, index) => (
                  <li key={item.title} className="rounded-2xl border border-white/[0.08] bg-[#0a0d14] p-6">
                    <span className="font-mono text-xs text-cyan-300">0{index + 1}</span>
                    <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#8b95a8]">{item.body}</p>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>
        </section>

        <section id="faq" className="scroll-mt-16 border-y border-white/[0.06] bg-white/[0.02] px-6 py-16 md:px-8 lg:py-24">
          <div className="mx-auto grid max-w-[1080px] gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <ScrollReveal>
              <p className="text-sm font-semibold text-violet-300">Small business inventory FAQ</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">Answers before you switch from spreadsheets</h2>
              <div className="mt-6 space-y-3 text-sm">
                <Link to="/what-is-inventory-management/" className="block text-cyan-300 hover:text-cyan-200">What is inventory management? →</Link>
                <Link to="/reorder-point-calculator/" className="block text-cyan-300 hover:text-cyan-200">Reorder point calculator →</Link>
                <Link to="/shopify-inventory-management/" className="block text-cyan-300 hover:text-cyan-200">Shopify inventory management →</Link>
              </div>
            </ScrollReveal>
            <div className="space-y-3">
              {smallBusinessFaqs.map(({ question, answer }, index) => (
                <ScrollReveal key={question} delay={Math.min(index * 0.05, 0.18)}>
                  <details className="group rounded-2xl border border-white/[0.08] bg-[#080b11] open:bg-white/[0.04]">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 font-semibold [&::-webkit-details-marker]:hidden">
                      {question}
                      <span className="text-cyan-300 transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="px-5 pb-5 text-sm leading-7 text-[#8b95a8]">{answer}</p>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-20 text-center md:px-8 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_75%_at_50%_100%,rgba(34,211,238,0.10),transparent_68%)]" />
          <ScrollReveal className="relative mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See your first forecast for free</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#b8bfcc]">Connect your store or import a file. Sparki maps and validates your data for you to approve, with no onboarding fee.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={signupUrl} className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-8 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">Start Free</a>
              <BookACallButton url={bookUrl} className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 text-sm font-semibold text-white hover:bg-white/[0.08]">Book a demo</BookACallButton>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <AgencyFooter />
    </div>
  );
}
