import { Wrench } from 'lucide-react';
import { FeaturePage } from './FeaturePage';

const features = [
  {
    title: 'AI-Powered CSV/Excel Import',
    description: 'Upload any spreadsheet and let AI automatically map columns to the right fields. Import products, orders, and customers in seconds.',
  },
  {
    title: 'Smart Email Processing',
    description: 'AI reads incoming emails and attachments to automatically create orders, update records, and extract key information.',
  },
  {
    title: 'Proactive Inventory Alerts',
    description: 'Get intelligent notifications about low stock, slow-moving items, and reorder suggestions before problems occur.',
  },
  {
    title: 'Custom Reports & Analytics',
    description: 'Build custom reports with drag-and-drop. Schedule automated report delivery to stakeholders.',
  },
  {
    title: 'Report Templates',
    description: 'Customize invoice, packing slip, and label templates to match your brand. Multiple templates per document type.',
  },
  {
    title: 'User Management & Permissions',
    description: 'Create user accounts with role-based access control. Define exactly what each user can see and do.',
  },
  {
    title: 'Workplaces & Stations',
    description: 'Configure workstations for specific tasks like packing, receiving, or cycle counting. Optimize workflows.',
  },
  {
    title: 'API Access & Integrations',
    description: 'Full REST API for custom integrations. Connect Spark to any system in your tech stack.',
  },
  {
    title: 'MCP Protocol Support',
    description: 'Model Context Protocol support for AI agent integrations. Let AI assistants interact with your inventory data.',
  },
  {
    title: 'Notification Settings',
    description: 'Configure email and in-app notifications for important events. Stay informed without being overwhelmed.',
  },
  {
    title: 'Document Number Formatting',
    description: 'Customize numbering sequences for orders, invoices, and other documents. Include prefixes, dates, and more.',
  },
];

export function ToolsServicesPage() {
  return (
    <FeaturePage
      title="Tools & Services"
      subtitle="Platform"
      description="Powerful tools and AI-powered features to automate your workflows and integrate with your existing systems."
      icon={Wrench}
      gradientFrom="from-pink-500"
      gradientTo="to-rose-400"
      features={features}
      prevCategory={{ name: 'Warehousing', href: '/features/warehousing' }}
      nextCategory={{ name: 'QuickBooks & Accounting', href: '/features/accounting' }}
    />
  );
}
