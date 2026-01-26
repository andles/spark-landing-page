import { Factory } from 'lucide-react';
import { FeaturePage } from './FeaturePage';

const features = [
  {
    title: 'Bills of Materials (BOM)',
    description: 'Define multi-level product recipes with components, sub-assemblies, and raw materials. Support for phantom BOMs and variants.',
  },
  {
    title: 'Manufacturing Orders',
    description: 'Plan and schedule production runs based on demand. Track progress from raw materials to finished goods.',
  },
  {
    title: 'Work Order Management',
    description: 'Create and manage work orders with detailed operation sequences. Track labor, materials, and machine time.',
  },
  {
    title: 'Operation Tracking & Scheduling',
    description: 'Define manufacturing operations with time estimates and dependencies. Schedule work across available resources.',
  },
  {
    title: 'Machine Management',
    description: 'Track machine availability, maintenance schedules, and utilization. Assign operations to specific machines.',
  },
  {
    title: 'Production Materials Tracking',
    description: 'Monitor raw material consumption and availability. Automatic material requisitions based on production schedules.',
  },
  {
    title: 'Shop Floor Control',
    description: 'Real-time visibility into production status. Workers can clock in/out of operations and report completions.',
  },
  {
    title: 'Work Order Approval Workflows',
    description: 'Configurable approval processes for work orders. Ensure proper authorization before production begins.',
  },
  {
    title: 'Yield & Scrap Tracking',
    description: 'Track actual vs expected output. Record scrap and waste with reason codes for continuous improvement.',
  },
];

export function ManufacturingPage() {
  return (
    <FeaturePage
      title="Manufacturing"
      subtitle="Production"
      description="Transform raw materials into finished products with complete visibility and control over your production process."
      icon={Factory}
      gradientFrom="from-orange-500"
      gradientTo="to-amber-400"
      features={features}
      prevCategory={{ name: 'Sales', href: '/features/sales' }}
      nextCategory={{ name: 'Warehousing', href: '/features/warehousing' }}
    />
  );
}
