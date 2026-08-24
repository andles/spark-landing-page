import { BarChart3, FileSpreadsheet, ShoppingBag, Sparkles } from 'lucide-react';
import AgencyHeader from '../agency/AgencyHeader';
import AgencyFooter from '../agency/AgencyFooter';
import BookACallButton from '../agency/BookACallButton';
import ScrollReveal, { RevealItem } from '../agency/ScrollReveal';
import { useCtaLinks } from '../agency/ctaLinks';
import CampaignWorkflowSection from '../agency/CampaignWorkflowSection';
import { campaignFaqs } from '../agency/campaignFaqs';

const capabilities = [
  {
    icon: BarChart3,
    title: 'Demand forecasts by SKU and variant',
    body: 'Use actual sales history, seasonality, current stock, and lead times to see what each product needs next.',
  },
  {
    icon: Sparkles,
    title: 'Reorder recommendations with reasoning',
    body: 'See what to buy, when to buy it, and how much—with the underlying demand and stock risk visible to your team.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Draft purchase orders ready to review',
    body: 'Turn recommendations into supplier-ready POs, adjust quantities, and approve without rebuilding the plan in a spreadsheet.',
  },
  {
    icon: ShoppingBag,
    title: 'One plan across every sales channel',
    body: 'Keep Shopify at the center while accounting for Amazon, wholesale, warehouses, and other places your inventory moves.',
  },
];

const steps = [
  ['Ask Sparki to onboard you', 'Connect Shopify, then let Sparki—or your AI assistant over MCP—bring in the history and supply data Spark still needs.'],
  ['Review the first inventory plan', 'Spark highlights stockout risk, excess stock, demand changes, and the purchase decisions that need attention.'],
  ['Approve what happens next', 'Adjust recommendations when needed, approve the draft PO, and keep a clear record of why the decision was made.'],
];

const faqs = campaignFaqs.shopify;

export function ShopifyInventoryPage() {
  const { signupUrl } = useCtaLinks({ source: 'shopify-inventory-management' });

  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />
      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-32 md:px-8 lg:pb-28 lg:pt-40">
          <div className="absolute inset-0 dot-grid opacity-35" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(34,197,94,0.13),transparent_65%)]" />
          <div className="absolute -right-40 top-40 h-[640px] w-[640px] rounded-full bg-cyan-500/[0.08] blur-[130px]" />
          <div className="relative z-10 mx-auto max-w-[1180px] text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-2 text-sm text-emerald-200">
                <img src="/logos/shopify-2 1.svg" alt="" className="h-5 w-auto" aria-hidden="true" />
                Shopify inventory management software
              </div>
              <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.8rem]">
                Turn Shopify Sales Into
                <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-400 bg-clip-text text-transparent">Your Next Purchase Order</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
                Spark forecasts demand by SKU, recommends what to reorder and when, and drafts the PO your team approves—across Shopify, Amazon, wholesale, and every place you hold stock.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={signupUrl} className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">Start 14-Day Free Trial</a>
                <BookACallButton className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]">Book a 30-Minute Demo</BookACallButton>
              </div>
              <p className="mt-3 text-xs text-white/40">Connect Shopify, ask Sparki, or onboard through your AI assistant over MCP.</p>
            </ScrollReveal>
          </div>
        </section>

        <CampaignWorkflowSection kind="shopify" />

        <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-16 md:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <ScrollReveal className="max-w-3xl">
              <p className="text-sm font-semibold text-emerald-300">From reporting to decision-making</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Shopify shows what sold. Spark tells you what to buy next.</h2>
              <p className="mt-4 text-base leading-7 text-[#b8bfcc]">Stop stitching together exports, reorder-point tabs, supplier sheets, and gut feel. Give the person responsible for inventory one place to see risk and approve the next move.</p>
            </ScrollReveal>
            <ScrollReveal staggerChildren={80} className="mt-10 grid gap-4 md:grid-cols-2">
              {capabilities.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <RevealItem key={capability.title} index={index}>
                    <article className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-7">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300"><Icon className="h-5 w-5" /></span>
                      <h3 className="mt-5 text-lg font-semibold">{capability.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#8b95a8]">{capability.body}</p>
                    </article>
                  </RevealItem>
                );
              })}
            </ScrollReveal>
          </div>
        </section>

        <section className="relative px-6 py-16 md:px-8 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(6,182,212,0.07),transparent_68%)]" />
          <div className="relative mx-auto max-w-[1080px]">
            <ScrollReveal className="text-center">
              <p className="text-sm font-semibold text-cyan-300">Live in minutes, useful from day one</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Your first reorder plan in three steps</h2>
            </ScrollReveal>
            <ScrollReveal staggerChildren={100} className="mt-10 grid gap-4 md:grid-cols-3">
              {steps.map(([title, body], index) => (
                <RevealItem key={title} index={index}>
                  <div className="h-full rounded-2xl border border-white/[0.08] bg-[#0a0d14] p-6">
                    <span className="font-mono text-xs text-emerald-300">0{index + 1}</span>
                    <h3 className="mt-8 text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#8b95a8]">{body}</p>
                  </div>
                </RevealItem>
              ))}
            </ScrollReveal>
          </div>
        </section>

        <section id="faq" className="scroll-mt-16 border-y border-white/[0.06] bg-white/[0.02] px-6 py-16 md:px-8 lg:py-24">
          <div className="mx-auto grid max-w-[1080px] gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <ScrollReveal>
              <p className="text-sm font-semibold text-violet-300">Shopify inventory FAQ</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">Answers before you connect your store</h2>
              <div className="mt-6 space-y-3 text-sm">
                <a href="/features/inventory" className="block text-cyan-300 hover:text-cyan-200">Explore inventory management →</a>
                <a href="/features/purchasing" className="block text-cyan-300 hover:text-cyan-200">Explore purchasing and POs →</a>
                <a href="/features/accounting" className="block text-cyan-300 hover:text-cyan-200">Explore accounting integrations →</a>
              </div>
            </ScrollReveal>
            <div className="space-y-3">
              {faqs.map(({ question, answer }, index) => (
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
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_75%_at_50%_100%,rgba(34,197,94,0.11),transparent_68%)]" />
          <ScrollReveal className="relative mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See what your Shopify inventory needs next</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#b8bfcc]">Bring the data you already have. Spark will turn it into the decisions your team needs to review.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={signupUrl} className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">Start 14-Day Free Trial</a>
              <BookACallButton className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 text-sm font-semibold text-white hover:bg-white/[0.08]">Book a Demo</BookACallButton>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <AgencyFooter />
    </div>
  );
}
