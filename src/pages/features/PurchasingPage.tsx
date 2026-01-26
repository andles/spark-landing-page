import { Truck } from 'lucide-react';
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
      title="Purchasing"
      subtitle="Procurement"
      description="Streamline your entire procurement process from supplier management to goods receiving. Never run out of stock again."
      icon={Truck}
      gradientFrom="from-violet-500"
      gradientTo="to-purple-400"
      features={features}
      prevCategory={{ name: 'Inventory', href: '/features/inventory' }}
      nextCategory={{ name: 'Sales', href: '/features/sales' }}
    />
  );
}
