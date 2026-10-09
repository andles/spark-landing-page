import { Plug } from 'lucide-react';
import { FeaturePage } from './features/FeaturePage';

// Live connectors only. Each line says what the connector does in Spark today;
// systems that are only available on request are listed in the closing note.
const integrations = [
  {
    title: 'Shopify',
    description: 'Products, stock, and sales history, with location-level inventory sync and alerts when Shopify and Spark quantities drift apart.',
  },
  {
    title: 'Spark Pickup for Shopify',
    description: 'Shoppers pick a pickup store and time in your Shopify store, and the orders flow into Spark’s Pickup Monitor.',
  },
  {
    title: 'Amazon Seller Central and FBA',
    description: 'Products, stock, and sales from Amazon, with alerts when FBA quantities and Spark disagree.',
  },
  {
    title: 'WooCommerce',
    description: 'Products and sales from your WooCommerce store.',
  },
  {
    title: 'Square',
    description: 'Products and sales from Square Online.',
  },
  {
    title: 'Faire',
    description: 'Products, stock, and wholesale orders from Faire.',
  },
  {
    title: 'Etsy',
    description: 'Products and sales from your Etsy shop.',
  },
  {
    title: 'Meta Commerce',
    description: 'Products and sales from Facebook and Instagram shops.',
  },
  {
    title: 'QuickBooks Online',
    description: 'Bring in sales and purchase history, and send invoices, bills, credit notes, and vendor credits to QuickBooks.',
  },
  {
    title: 'Xero',
    description: 'Send Spark’s accounting documents to Xero, with a sync history you can check.',
  },
  {
    title: 'Zoho Books',
    description: 'Send Spark’s accounting documents to Zoho Books, with a sync history you can check.',
  },
  {
    title: 'ShipStation',
    description: 'Shipping rates, labels, voids, and tracking from inside your ship lists.',
  },
  {
    title: 'Flexport',
    description: 'Create inbound shipping plans from transfer orders and track receiving automatically.',
  },
  {
    title: 'EDI',
    description: 'Exchange purchase orders, invoices, and shipping notices with trading partners.',
  },
  {
    title: 'Spark Payments',
    description: 'Accept card and ACH payments on invoices, with surcharging support.',
  },
  {
    title: 'Gmail',
    description: 'Capture order and supplier emails from a connected inbox, and send customer emails from your own address.',
  },
  {
    title: 'Claude and ChatGPT',
    description: 'Connect your own AI assistant to Spark over MCP, with read-only or read and write access that you control.',
  },
];

export function IntegrationsPage() {
  return (
    <FeaturePage
      title="Inventory Integrations"
      heroOutcome="Every Channel in One Plan"
      subtitle="Sales channels, accounting, shipping, and AI"
      description="Connect the stores, marketplaces, accounting, and shipping tools you already use. Spark pulls them into one inventory plan and sends the results back where your team works."
      capabilityLabel="your connected systems"
      icon={Plug}
      gradientFrom="from-violet-500"
      gradientTo="to-indigo-400"
      features={integrations}
      ctaSource="integrations"
      prevCategory={{ name: 'Wholesale & Suppliers', href: '/features/wholesale-suppliers' }}
      closingNote={<>Using NetSuite, BigCommerce, Walmart, ShipBob, or another system? <a href="/contact" className="underline hover:text-white">Ask us about it</a>.</>}
    />
  );
}
