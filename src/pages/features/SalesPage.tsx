import { ShoppingCart } from 'lucide-react';
import { FeaturePage } from './FeaturePage';

const features = [
  {
    title: 'Sales Order Management',
    description: 'Create and manage sales orders with full customer details, line items, pricing, and delivery information.',
  },
  {
    title: 'Invoicing & Billing',
    description: 'Generate professional invoices from sales orders. Support for partial invoicing, deposits, and payment tracking.',
  },
  {
    title: 'Quotes & Estimates',
    description: 'Create quotes for customers and convert approved quotes directly into sales orders with one click.',
  },
  {
    title: 'Customer Return Orders',
    description: 'Process customer returns with RMA tracking. Handle refunds, exchanges, and restocking.',
  },
  {
    title: 'Return Receipts Processing',
    description: 'Receive returned items back into inventory with quality inspection and disposition tracking.',
  },
  {
    title: 'Customer Management',
    description: 'Maintain detailed customer records with contact info, shipping addresses, payment terms, and order history.',
  },
  {
    title: 'Services & Non-Inventory Items',
    description: 'Sell services, labor, and other non-inventory items alongside physical products.',
  },
  {
    title: 'Discounts & Pricing Rules',
    description: 'Create flexible discount structures including volume discounts, customer-specific pricing, and promotional offers.',
  },
  {
    title: 'Discount Groups',
    description: 'Assign customers to discount groups for automatic pricing. Manage wholesale, retail, and VIP tiers.',
  },
  {
    title: 'Multi-Currency Support',
    description: 'Sell in multiple currencies with automatic exchange rate updates and conversion.',
  },
];

export function SalesPage() {
  return (
    <FeaturePage
      title="Sales"
      subtitle="Order Management"
      description="Manage your complete sales cycle from quote to cash. Delight customers with fast, accurate order processing."
      icon={ShoppingCart}
      gradientFrom="from-blue-500"
      gradientTo="to-cyan-400"
      features={features}
      prevCategory={{ name: 'Purchasing', href: '/features/purchasing' }}
      nextCategory={{ name: 'Manufacturing', href: '/features/manufacturing' }}
    />
  );
}
