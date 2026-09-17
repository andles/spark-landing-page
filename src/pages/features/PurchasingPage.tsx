import { ArrowRight, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FeaturePage } from './FeaturePage';

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
    title: 'Procurement Forecasting',
    description: 'AI-powered demand forecasting to optimize purchasing decisions and reduce stockouts.',
  },
  {
    title: 'Landed Cost Calculation',
    description: 'Calculate true item costs including shipping, duties, and fees. Allocate costs across purchase order items.',
  },
];

export function PurchasingPage() {
  return (
    <FeaturePage
      title="Purchasing & Purchase Orders"
      heroOutcome="Built From Live Demand"
      subtitle="AI-assisted procurement software"
      description="Turn live demand into supplier-ready purchase orders, manage approvals, and track every order from recommendation through receipt."
      icon={Truck}
      gradientFrom="from-violet-500"
      gradientTo="to-purple-400"
      features={features}
      showcase={
        <section className="px-6 pb-16 md:px-8 lg:pb-24">
          <div className="mx-auto flex max-w-[1120px] flex-col items-start justify-between gap-5 rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.035] p-7 sm:flex-row sm:items-center sm:p-9">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">See the full workflow</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">From demand signal to reviewed draft PO</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#9da8b9]">Watch a three minute walkthrough using real Spark screens and clearly labeled example data.</p>
            </div>
            <Link to="/inventory-reorder-walkthrough" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-cyan-100">Watch the walkthrough <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </section>
      }
      prevCategory={{ name: 'Inventory', href: '/features/inventory' }}
      nextCategory={{ name: 'Sales', href: '/features/sales' }}
    />
  );
}
