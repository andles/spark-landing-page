import { Package } from 'lucide-react';
import { FeaturePage } from './FeaturePage';

const features = [
  {
    title: 'Items & SKU Management',
    description: 'Create and manage products with unique SKUs, multiple variants, pricing tiers, and detailed specifications. Support for serialized and lot-tracked items.',
  },
  {
    title: 'Bundle Items & Kits',
    description: 'Group multiple products together as bundles or kits. Automatically track component inventory when bundles are sold.',
  },
  {
    title: 'Item Groups & Categories',
    description: 'Organize your catalog with hierarchical categories and groups. Apply bulk settings and pricing rules to entire groups.',
  },
  {
    title: 'Custom Fields',
    description: 'Extend item records with unlimited custom fields. Track any data specific to your business needs.',
  },
  {
    title: 'Barcode Generation & Printing',
    description: 'Generate and print barcodes and labels for all your items. Support for multiple barcode formats including UPC, EAN, and QR codes.',
  },
  {
    title: 'Real-Time Stock Levels',
    description: 'View accurate, real-time inventory quantities across all locations. Set reorder points and receive low stock alerts.',
  },
  {
    title: 'Inventory Adjustments',
    description: 'Make quick adjustments for damaged goods, cycle counts, or corrections. Full audit trail for all changes.',
  },
  {
    title: 'Write-Offs & Shrinkage',
    description: 'Track and manage inventory write-offs with reason codes. Generate reports on shrinkage and loss.',
  },
  {
    title: 'Item History & Audit Trail',
    description: 'Complete visibility into every transaction affecting an item. Track who changed what and when.',
  },
];

export function InventoryPage() {
  return (
    <FeaturePage
      title="Inventory"
      subtitle="Core Feature"
      description="Complete control over your product catalog and stock levels. Track every item across all locations with real-time accuracy."
      icon={Package}
      gradientFrom="from-emerald-500"
      gradientTo="to-teal-400"
      features={features}
      nextCategory={{ name: 'Purchasing', href: '/features/purchasing' }}
    />
  );
}
