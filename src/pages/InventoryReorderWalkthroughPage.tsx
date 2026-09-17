import { ArrowRight, Bot, CheckCircle2, LineChart, PackageCheck, ShoppingCart, Warehouse } from 'lucide-react';
import { Link } from 'react-router-dom';
import AgencyFooter from '../agency/AgencyFooter';
import AgencyHeader from '../agency/AgencyHeader';
import BookACallButton from '../agency/BookACallButton';
import MarketingVideo from '../agency/MarketingVideo';
import ScrollReveal, { RevealItem } from '../agency/ScrollReveal';
import { useCtaLinks } from '../agency/ctaLinks';
import { inventoryReorderWalkthroughTranscript } from '../content/inventoryReorderWalkthrough';

const CTA_OPTIONS = { source: 'inventory-reorder-walkthrough' } as const;

const steps = [
  {
    number: '01',
    icon: LineChart,
    title: 'Read the demand signal',
    body: 'Keep completed sales visible beside the forecast range, then inspect the item\'s seasonal pattern instead of relying on one monthly average.',
    image: '/walkthrough/forecast.png',
    alt: 'Spark demand forecast showing observed sales, a forward forecast, and an uncertainty range for an example inventory item.',
  },
  {
    number: '02',
    icon: Warehouse,
    title: 'Check stock and incoming supply',
    body: 'Review on hand, reorder point, days of cover, planning rate, and open supply together. An incoming order only helps if its timing matches the demand risk.',
    image: '/walkthrough/stock.png',
    alt: 'Spark stock view showing example on-hand inventory, reorder point, incoming supply, and days of cover.',
  },
  {
    number: '03',
    icon: ShoppingCart,
    title: 'Add purchasing constraints',
    body: 'Bring the supplier, minimum order quantity, cost, lead time, and delivery date into the same decision before preparing another order.',
    image: '/walkthrough/purchasing.png',
    alt: 'Spark purchasing view with example supplier, minimum order quantity, cost, lead time, and an incoming purchase order.',
  },
  {
    number: '04',
    icon: Bot,
    title: 'Prepare a proposal in Sparki or MCP',
    body: 'Ask what needs attention, inspect the recommendation, and prepare a draft through Sparki in the app or through Spark MCP in a connected assistant.',
    image: '/walkthrough/sparki-proposal.png',
    alt: 'Sparki purchase order proposal showing the supplier, destination, item, quantity, cost, and estimated total before confirmation.',
  },
  {
    number: '05',
    icon: PackageCheck,
    title: 'Review the draft before issue',
    body: 'The approved action becomes a populated draft purchase order. Your team still controls when the order is issued or sent to the supplier.',
    image: '/walkthrough/draft-po.png',
    alt: 'Spark draft purchase order showing example supplier, destination, item quantity, cost, and total.',
  },
] as const;

export default function InventoryReorderWalkthroughPage() {
  const { bookUrl, signupUrl } = useCtaLinks(CTA_OPTIONS);

  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />
      <main>
        <header className="relative overflow-hidden px-6 pb-16 pt-28 md:px-8 lg:pb-20 lg:pt-32">
          <div className="absolute inset-0 dot-grid opacity-25" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_62%_at_50%_-10%,rgba(6,182,212,0.17),transparent_65%)]" />
          <ScrollReveal className="relative z-10 mx-auto max-w-[1050px] text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2 text-xs text-cyan-200">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> 3 minute product walkthrough
            </div>
            <h1 className="mt-7 text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.7rem]">
              From demand signal to
              <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">reviewed purchase order</span>
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
              Follow a complete Spark planning decision through demand history, forecast, seasonality, stock, incoming supply, purchasing constraints, recommendation, and human reviewed action.
            </p>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-white/45">Spark demo workspace • Example data</p>
          </ScrollReveal>
        </header>

        <section className="px-6 pb-20 md:px-8 lg:pb-28">
          <ScrollReveal className="mx-auto max-w-[1180px]">
            <MarketingVideo
              mp4Src="/walkthrough/full-reorder-walkthrough.mp4?v=5"
              posterSrc="/walkthrough/full-reorder-walkthrough-poster.png"
              captionsSrc="/walkthrough/full-reorder-walkthrough.vtt"
              videoLabel="From demand signal to reviewed purchase order product walkthrough"
              className="rounded-[2rem] border border-white/[0.1] bg-[#090d15] p-2 shadow-[0_35px_100px_rgba(0,0,0,0.45)] sm:p-3"
            />
            <details className="mt-4 rounded-xl border border-white/[0.08] px-5 text-[#b8bfcc]">
              <summary className="cursor-pointer py-3 text-sm font-medium text-cyan-200">Read the video transcript</summary>
              <div className="space-y-3 pb-5 text-base leading-relaxed">
                {inventoryReorderWalkthroughTranscript.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </details>
          </ScrollReveal>
        </section>

        <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-20 md:px-8 lg:py-28">
          <div className="mx-auto max-w-[1180px]">
            <ScrollReveal className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">The full decision trace</p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Every step stays connected to the evidence</h2>
              <p className="mt-5 text-base leading-8 text-[#b8bfcc]">The screenshots below come from the same demo workflow shown in the video. Values are examples, and the actions remain reviewable before they affect operations.</p>
            </ScrollReveal>
            <ScrollReveal staggerChildren={80} className="mt-12 space-y-8">
              {steps.map(({ number, icon: Icon, title, body, image, alt }, index) => (
                <RevealItem key={number} index={index}>
                  <article className="grid overflow-hidden rounded-3xl border border-white/[0.08] bg-[#090d15] lg:grid-cols-[0.72fr_1.28fr]">
                    <div className="flex flex-col justify-center p-7 sm:p-10">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-300"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                      <p className="mt-8 font-mono text-xs text-cyan-300">STEP {number}</p>
                      <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">{title}</h3>
                      <p className="mt-4 text-sm leading-7 text-[#9da8b9]">{body}</p>
                    </div>
                    <div className="border-t border-white/[0.08] bg-[#04070c] p-3 lg:border-l lg:border-t-0">
                      <img src={image} alt={alt} className="h-full min-h-[280px] w-full rounded-2xl object-cover object-top" loading="lazy" />
                    </div>
                  </article>
                </RevealItem>
              ))}
            </ScrollReveal>
          </div>
        </section>

        <section className="px-6 py-20 md:px-8 lg:py-28">
          <div className="mx-auto grid max-w-[1120px] gap-5 lg:grid-cols-2">
            <ScrollReveal className="rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.035] p-8 sm:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-300">Choose your interface</p>
              <h2 className="mt-5 text-3xl font-semibold">Sparki and MCP support the same job</h2>
              <p className="mt-5 text-sm leading-7 text-[#aab8c1]">Work with Sparki inside Spark, or connect an approved assistant through MCP. In either interface, the flow is ask, inspect, prepare, and review.</p>
              <Link to="/features/tools-services" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">Explore Sparki and MCP <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </ScrollReveal>
            <ScrollReveal delay={0.08} className="rounded-3xl border border-violet-300/15 bg-violet-300/[0.035] p-8 sm:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-violet-300">Start at the right level</p>
              <h2 className="mt-5 text-3xl font-semibold">Forecast free, then connect the operating loop</h2>
              <p className="mt-5 text-sm leading-7 text-[#aab8c1]">Monthly forecasting is available on Spark's free plan. Purchasing and operational workflows are available when your team is ready to act on the plan.</p>
              <Link to="/pricing" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-violet-200">Compare plans <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </ScrollReveal>
          </div>
        </section>

        <section className="px-6 pb-24 md:px-8 lg:pb-32">
          <ScrollReveal className="mx-auto max-w-[1050px] rounded-[2rem] border border-white/[0.09] bg-gradient-to-br from-cyan-400/[0.08] to-violet-500/[0.08] px-7 py-14 text-center sm:px-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Bring your data. Review the plan.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#b8bfcc]">Start with free forecasting, or book a working session to see your purchasing workflow mapped in Spark.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={signupUrl} className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 text-sm font-semibold">Start forecasting free</a>
              <BookACallButton url={bookUrl} className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-semibold hover:bg-white/[0.08]">Book a 20-Minute Demo</BookACallButton>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <AgencyFooter />
    </div>
  );
}
