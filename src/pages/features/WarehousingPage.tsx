import { Warehouse } from 'lucide-react';
import { FeaturePage } from './FeaturePage';

const features = [
  {
    title: 'Multi-Warehouse Management',
    description: 'Manage inventory across unlimited warehouse locations. Track stock levels, transfers, and movements in real-time.',
  },
  {
    title: 'Bin-Level Location Tracking',
    description: 'Organize warehouses with zones, aisles, racks, and bins. Know exactly where every item is located.',
  },
  {
    title: 'Transfer Orders',
    description: 'Move inventory between warehouses with full tracking. Schedule transfers and track in-transit stock.',
  },
  {
    title: 'Pick Lists & Wave Picking',
    description: 'Generate optimized pick lists for order fulfillment. Support for wave picking, batch picking, and zone picking.',
  },
  {
    title: 'Pack Stations',
    description: 'Streamlined packing workflows with barcode verification. Ensure accurate shipments every time.',
  },
  {
    title: 'Ship Lists & Shipping',
    description: 'Create shipping manifests and integrate with carriers. Print labels and track shipments.',
  },
  {
    title: 'Shipping Method Configuration',
    description: 'Define shipping methods with rates, carriers, and delivery timeframes. Offer customers shipping options.',
  },
  {
    title: 'Shipping Containers',
    description: 'Manage box sizes and packaging materials. Optimize packing for shipping cost efficiency.',
  },
  {
    title: 'Cycle Counting',
    description: 'Schedule and perform cycle counts by location, category, or ABC classification. Maintain inventory accuracy.',
  },
  {
    title: 'Receiving & Put-Away',
    description: 'Streamlined receiving workflows with suggested put-away locations. Optimize warehouse space utilization.',
  },
];

export function WarehousingPage() {
  return (
    <FeaturePage
      title="Warehousing"
      subtitle="Fulfillment"
      description="Optimize your warehouse operations from receiving to shipping. Increase accuracy and efficiency across all locations."
      icon={Warehouse}
      gradientFrom="from-slate-600"
      gradientTo="to-slate-500"
      features={features}
      prevCategory={{ name: 'Manufacturing', href: '/features/manufacturing' }}
      nextCategory={{ name: 'Tools & Services', href: '/features/tools-services' }}
    />
  );
}
