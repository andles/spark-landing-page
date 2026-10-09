import { ArrowRight, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductProofCards from '../../agency/ProductProofCards';
import ScrollReveal from '../../agency/ScrollReveal';
import { FeaturePage } from './FeaturePage';
import { PromotionsPlanningSection } from './PromotionsPlanningSection';

// Scope note: the flow below is limited to what drives the standard reorder
// recommendation (forecast, lead times, and their variability, then reorder
// point, then a proposed draft PO). Receipt variances and supplier price breaks
// are not inputs to that recommendation, so they appear only as information to
// check before approving. See the Revision 2.1 site proposal, table M2-T.
const reorderFlow = [
  { step: '01', title: 'Demand forecast', body: 'Demand ESP forecasts each item from your sales history.' },
  { step: '02', title: 'Lead times and their variability', body: 'Supplier lead times, and as order history builds, how much they vary.' },
  { step: '03', title: 'Reorder point', body: 'Forecast and lead times set when each item needs to be reordered.' },
  { step: '04', title: 'Proposed draft PO', body: 'Spark Inventory proposes a draft purchase order with the reasoning attached.' },
  { step: '05', title: 'Your review', body: 'Your team checks it, adjusts it, and approves it.' },
] as const;

const features = [
  {
    title: 'Purchase Order Management',
    description: 'Create, track, and manage purchase orders from request to receipt. Automated PO numbering and approval workflows.',
  },
  {
    title: 'Supplier Management',
    description: 'Maintain detailed supplier records with contact info, payment terms, lead times, and performance history.',
  },
  {
    title: 'Delivery Receipts & Receiving',
    description: 'Streamlined goods receiving with barcode scanning. Partial receipts, quality checks, and automatic inventory updates.',
  },
  {
    title: 'Request for Proposals (RFP)',
    description: 'Send RFPs to multiple suppliers and compare quotes. Track responses and select the best pricing.',
  },
  {
    title: 'Supplier Return Orders',
    description: 'Process returns to suppliers for defective or incorrect items. Track return shipments and credits.',
  },
  {
    title: 'Reorder Point Planning',
    description: 'Set minimum stock levels and automatically generate purchase suggestions when inventory runs low.',
  },
  {
    title: 'Backorder Management',
    description: 'Track items on backorder and automatically allocate incoming stock to waiting orders.',
  },
  {
    title: 'Demand ESP reorder planning',
    description: 'Each SKU gets its own forecast method. Review the forecast, recommended quantity, and timing before a draft PO is created.',
  },
  {
    title: 'Landed Cost Calculation',
    description: 'Calculate true item costs including shipping, duties, and fees. Allocate costs across purchase order items.',
  },
];

export function PurchasingPage() {
  return (
    <FeaturePage
      title="What should I order now?"
      heroOutcome="Get a reorder recommendation you can review."
      subtitle="Purchasing with Demand ESP"
      capabilityLabel="purchasing"
      description="Demand ESP forecasts each item from your sales history. Spark Inventory combines that forecast with supplier lead times and, as order history builds, how much they vary to set reorder points, then proposes draft purchase orders for your team to review. Receipt variances and supplier price books live in the same system, so you or your assistant can check them before you approve."
      ctaSource="features_purchasing"
      icon={Truck}
      gradientFrom="from-violet-500"
      gradientTo="to-purple-400"
      features={features}
      showcase={
        <>
        <section aria-labelledby="reorder-flow-heading" className="px-6 pb-16 md:px-8 lg:pb-20">
          <div className="mx-auto max-w-[1120px]">
            <ScrollReveal className="max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">How a recommendation is built</p>
              <h2 id="reorder-flow-heading" className="mt-3 text-2xl font-semibold text-white sm:text-3xl">From forecast to a draft PO you approve</h2>
              <p className="mt-3 text-sm leading-7 text-[#9da8b9]">
                A daily reorder sweep, on by default, rechecks stock against reorder points and proposes draft POs for review. Change its schedule or turn it off any time.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <ol className="mt-8 grid gap-3 md:grid-cols-5">
                {reorderFlow.map((item) => (
                  <li key={item.step} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                    <span className="font-mono text-xs text-cyan-300">{item.step}</span>
                    <h3 className="mt-4 text-sm font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-xs leading-6 text-[#8b95a8]">{item.body}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <p className="rounded-2xl border border-white/[0.08] bg-[#0a0d14] p-5 text-sm leading-7 text-[#b8bfcc]">
                  <span className="font-semibold text-white">Check before you approve. </span>
                  Receipt variances and supplier price books live in the same system, so you or your assistant can look at them as you review the draft.
                </p>
                <p className="rounded-2xl border border-white/[0.08] bg-[#0a0d14] p-5 text-sm leading-7 text-[#b8bfcc]">
                  <span className="font-semibold text-white">Measured lead times. </span>
                  For an item with enough qualifying purchase history, Spark Inventory can use measured lead times and their variability instead of supplier defaults.
                </p>
              </div>
            </ScrollReveal>
            <ProductProofCards />
          </div>
        </section>
        <PromotionsPlanningSection />
        <section className="px-6 pb-16 md:px-8 lg:pb-24">
          <div className="mx-auto flex max-w-[1120px] flex-col items-start justify-between gap-5 rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.035] p-7 sm:flex-row sm:items-center sm:p-9">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">See the full workflow</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">From demand signal to reviewed draft PO</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#9da8b9]">Watch a three minute walkthrough using real Spark Inventory screens and clearly labeled example data.</p>
            </div>
            <Link to="/inventory-reorder-walkthrough" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-cyan-100">Watch the walkthrough <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </section>
        </>
      }
      closingNote={
        <>
          Ready to upgrade your purchasing process from Fishbowl or spreadsheets?{' '}
          <Link to="/#why-switch" className="font-semibold text-cyan-200 underline-offset-4 hover:underline">See how the move works.</Link>
        </>
      }
      prevCategory={{ name: 'Inventory', href: '/features/inventory' }}
      nextCategory={{ name: 'Sales', href: '/features/sales' }}
    />
  );
}
