import { Calculator } from 'lucide-react';
import { FeaturePage } from './FeaturePage';

const features = [
  {
    title: 'QuickBooks Online Integration',
    description: 'Seamless two-way sync with QuickBooks Online. Automatically push invoices, payments, and inventory adjustments.',
  },
  {
    title: 'Invoice Sync',
    description: 'Sales invoices automatically sync to QuickBooks as they are created. No double entry required.',
  },
  {
    title: 'Payment Tracking',
    description: 'Track customer payments and sync payment status between Spark and your accounting system.',
  },
  {
    title: 'Expense Allocation',
    description: 'Allocate shipping, duties, and other expenses to purchase orders. Accurate landed cost tracking.',
  },
  {
    title: 'Tax Rate Management',
    description: 'Configure tax rates for different jurisdictions. Automatic tax calculation on orders and invoices.',
  },
  {
    title: 'Multi-Currency Accounting',
    description: 'Handle transactions in multiple currencies. Automatic exchange rate updates and conversion.',
  },
  {
    title: 'Financial Reports',
    description: 'Generate inventory valuation reports, COGS reports, and other financial summaries for accounting.',
  },
  {
    title: 'Audit Trail',
    description: 'Complete transaction history for compliance and auditing. Track every change with timestamps and user info.',
  },
  {
    title: 'Chart of Accounts Mapping',
    description: 'Map Spark transactions to your chart of accounts. Ensure proper categorization in your books.',
  },
];

export function AccountingPage() {
  return (
    <FeaturePage
      title="QuickBooks & Accounting"
      subtitle="Financial"
      description="Keep your books accurate with seamless accounting integrations. Eliminate double entry and reduce errors."
      icon={Calculator}
      gradientFrom="from-green-600"
      gradientTo="to-emerald-500"
      features={features}
      prevCategory={{ name: 'Tools & Services', href: '/features/tools-services' }}
    />
  );
}
