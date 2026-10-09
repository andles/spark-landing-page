import { Store } from 'lucide-react';
import { FeaturePage } from './FeaturePage';
import { SupplierFlow, VendorPortalMockup } from './featureVisuals';

const features = [
  {
    title: 'B2B Wholesale Store',
    description: 'Give wholesale customers a branded store with your catalog, item pages, cart, and checkout, backed by the same stock Spark plans.',
  },
  {
    title: 'Customer Invitations and Roles',
    description: 'Invite buyers to the store and control what each member of a customer account can see and do.',
  },
  {
    title: 'Vendor Portal',
    description: 'Invite suppliers to log in, see the purchase orders and items you share with them, and request changes that your buyers review.',
  },
  {
    title: 'EDI With Trading Partners',
    description: 'Exchange purchase orders, invoices, and shipping notices with trading partners, with document and item mappings managed in Spark.',
  },
  {
    title: 'Supplier Email Capture',
    description: 'Connect a Gmail inbox or forwarding address. Supplier emails about open purchase orders become signals your team can act on.',
  },
  {
    title: 'Invoice Matching',
    description: 'Spark reads supplier invoices and flags discrepancies and unmatched invoices against your purchase orders and receipts.',
  },
  {
    title: 'Requests for Proposal',
    description: 'Send RFPs to suppliers and compare their responses before you commit to a purchase order.',
  },
  {
    title: 'Supplier Terms and Price Books',
    description: 'Keep vendor terms, lead times, and quantity-break pricing per item, and get a signal when a supplier changes a price.',
  },
  {
    title: 'Faire Wholesale Orders',
    description: 'Bring Faire products, stock, and orders into Spark so wholesale demand counts in the same plan as every other channel.',
  },
  {
    title: 'Quotes, Invoices, and Payments',
    description: 'Turn quotes into sales orders, issue invoices and credit notes, and take card or ACH payments with Spark Payments.',
  },
];

export function WholesaleSuppliersPage() {
  return (
    <FeaturePage
      title="Wholesale and Supplier Portals"
      heroOutcome="Customers and Suppliers in One Loop"
      subtitle="B2B store, vendor portal, and EDI"
      description="Wholesale customers order from a branded store, suppliers see and update their purchase orders, and trading partners connect over EDI. All of it runs on the same inventory and plan."
      capabilityLabel="wholesale and supplier workflows"
      icon={Store}
      gradientFrom="from-emerald-500"
      gradientTo="to-teal-400"
      features={features}
      heroMedia={<VendorPortalMockup />}
      showcase={<SupplierFlow />}
      ctaSource="features-wholesale-suppliers"
      prevCategory={{ name: 'Signals & Automation', href: '/features/signals-automation' }}
      nextCategory={{ name: 'Integrations', href: '/integrations' }}
    />
  );
}
