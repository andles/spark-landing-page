import { ArrowRight, ChartNoAxesCombined, MessageSquareText } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductProofCards from '../../agency/ProductProofCards';
import ScrollReveal from '../../agency/ScrollReveal';
import { YouTubeVideoSection } from '../../components/YouTubeEmbed';
import { FeaturePage } from './FeaturePage';
import { demandForecastingFaqs } from './featureFaqs';

// Scope note: every statement on this page describes the shipped forecasting
// engine (server Areas/Velocity, Areas/Forecasting). The only figures are the
// approved proof cards, reused through ProductProofCards so the wording and the
// "How we measured it" disclosure cannot drift. Do not add new numbers here.

const patterns = [
  {
    name: 'Steady',
    body: 'Demand that holds around a level. Forecast with simple exponential smoothing.',
  },
  {
    name: 'Trending',
    body: 'Demand that is growing or shrinking. Forecast with damped Holt, so a trend eases off instead of running forever.',
  },
  {
    name: 'Seasonal',
    body: 'Demand with a yearly shape. Forecast with Holt-Winters once there are two full seasons of history.',
  },
  {
    name: 'Intermittent',
    body: 'Items that sell in some months and not others. Forecast with TSB, so the forecast falls as an item goes quiet.',
  },
] as const;

const features = [
  {
    title: 'A Method Chosen for Each SKU',
    description: 'Demand ESP reads each item’s demand pattern, tests the eligible methods against that item’s own recent months, and keeps the one that forecast it best. You see which method was chosen and why.',
  },
  {
    title: 'Stockout Correction',
    description: 'A month an item was out of stock sold less because there was nothing to sell. Demand ESP scales those months by the days the item was actually in stock, so lost sales do not read as low demand.',
  },
  {
    title: 'Promotions Taken Out of the Baseline',
    description: 'The extra units an occasional promotion sold are measured and removed before the forecast is fitted, so a one-off spike is not mistaken for growth or seasonality.',
  },
  {
    title: 'Seasonality, Even With Short History',
    description: 'Items with a full year or more get their own seasonal shape. Newer items can borrow the seasonal shape of similar items until their own history builds.',
  },
  {
    title: 'New Products and Launches',
    description: 'An item with no sales yet can start from a lookalike group of similar items, or from a reference item you choose, instead of a forecast of zero.',
  },
  {
    title: 'Forecast Ranges, Not Just a Number',
    description: 'Every forecast carries a range from how far the item’s past forecasts missed, and that range feeds safety stock.',
  },
  {
    title: 'Backtest Your Own Items',
    description: 'Run a backtest on your own catalog: Demand ESP hides recent months, forecasts them from the history before, and scores the result.',
  },
  {
    title: 'Demand Curves and Signals',
    description: 'Add what the history cannot know: a planned launch curve, an expected change in demand, or a known event, layered on top of the statistical forecast.',
  },
  {
    title: 'Reorder Points From the Forecast',
    description: 'The forecast and supplier lead times set each item’s reorder point and safety stock, then turn into draft purchase orders you review.',
  },
];

export function DemandForecastingPage() {
  return (
    <FeaturePage
      title="Demand forecasting software"
      heroOutcome="A forecast method for every SKU."
      subtitle="Powered by Demand ESP"
      capabilityLabel="demand forecasting"
      description="Demand ESP picks a forecasting method for each SKU, corrects for stockouts and promotions, and turns the forecast into draft purchase orders you approve in the app or by text with Sparki."
      ctaSource="demand-forecasting-software"
      icon={ChartNoAxesCombined}
      gradientFrom="from-cyan-500"
      gradientTo="to-violet-500"
      features={features}
      faqs={demandForecastingFaqs}
      faqEyebrow="Demand ESP, explained"
      faqTitle="Demand forecasting questions"
      faqIntro="How Demand ESP picks a method, what it needs from you, and what it costs."
      showcase={(
        <>
          <YouTubeVideoSection videoKey="demand" />

          <section aria-labelledby="patterns-heading" className="px-6 pb-16 md:px-8 lg:pb-20">
            <div className="mx-auto max-w-[1120px]">
              <ScrollReveal className="max-w-3xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">How Demand ESP works</p>
                <h2 id="patterns-heading" className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Four demand patterns, a method for each</h2>
                <p className="mt-3 text-sm leading-7 text-[#9da8b9]">
                  Demand ESP classifies every item from its monthly sales history, then compares the methods that fit its pattern on the item’s own recent months and keeps the most accurate one. When no single method wins, it can use the month by month median of the eligible methods. With too little history to test, it uses the standard method for the pattern. No AI model touches the numbers: the forecast is statistical and repeatable, and Sparki only explains it.
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <ol className="mt-8 grid gap-3 md:grid-cols-4">
                  {patterns.map((item) => (
                    <li key={item.name} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                      <h3 className="text-sm font-semibold text-white">{item.name}</h3>
                      <p className="mt-2 text-xs leading-6 text-[#8b95a8]">{item.body}</p>
                    </li>
                  ))}
                </ol>
              </ScrollReveal>
            </div>
          </section>

          <section aria-labelledby="results-heading" className="px-6 pb-16 md:px-8 lg:pb-20">
            <div className="mx-auto max-w-[1120px]">
              <ScrollReveal className="max-w-3xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">Measured on public data</p>
                <h2 id="results-heading" className="mt-3 text-2xl font-semibold text-white sm:text-3xl">How accurate is Demand ESP?</h2>
                <p className="mt-3 text-sm leading-7 text-[#9da8b9]">
                  We test Demand ESP against simple baselines on public sales data and publish how each figure was measured.
                </p>
              </ScrollReveal>
              <ProductProofCards showReorderLink showMethodLink={false} />
            </div>
          </section>

          <section aria-labelledby="sparki-heading" className="px-6 pb-16 md:px-8 lg:pb-24">
            <div className="mx-auto grid max-w-[1120px] gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.035] p-7 sm:p-9">
                <MessageSquareText className="h-6 w-6 text-cyan-300" aria-hidden="true" />
                <h2 id="sparki-heading" className="mt-4 text-2xl font-semibold text-white">Act on the forecast by text</h2>
                <p className="mt-3 text-sm leading-7 text-[#9da8b9]">
                  When the forecast says an item will run short, Sparki can text you the alert and the drafted purchase order. Reply YES with its code to create it. Text with Sparki is included on Solo and up.
                </p>
                <Link to="/text-with-sparki/" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">See Text with Sparki <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </div>
              <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 sm:p-9">
                <ChartNoAxesCombined className="h-6 w-6 text-violet-300" aria-hidden="true" />
                <h2 className="mt-4 text-2xl font-semibold text-white">Bring the data you already have</h2>
                <p className="mt-3 text-sm leading-7 text-[#9da8b9]">
                  Connect Shopify, Amazon, WooCommerce, QuickBooks Online and more, or import sales history from a file. You can also ask for forecasts from ChatGPT, Claude or another assistant through Spark’s MCP connection.
                </p>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  <Link to="/integrations/" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">Integrations <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                  <Link to="/connect-spark-to-your-assistant/" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">Connect an assistant <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      closingNote={(
        <>
          The Free plan includes a monthly per-SKU forecast for one user. Paid plans add live forecasts, purchasing and Text with Sparki, with a 14-day free trial.{' '}
          <Link to="/pricing/" className="font-semibold text-cyan-200 underline-offset-4 hover:underline">See pricing.</Link>
        </>
      )}
      prevCategory={{ name: 'Inventory', href: '/features/inventory/' }}
      nextCategory={{ name: 'Purchasing', href: '/features/purchasing/' }}
    />
  );
}
