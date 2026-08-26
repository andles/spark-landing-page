import { Wrench } from 'lucide-react';
import { FeaturePage } from './FeaturePage';

const features = [
  {
    title: 'Agentic Import & Onboarding',
    description: 'Ask Sparki, or your own assistant over MCP, to inspect, map, repair, validate, and verify one or many data sources with approval before import.',
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
    title: 'Integration & Agent Access',
    description: 'Connect channels and approved external assistants to the same governed Spark operating context.',
  },
  {
    title: 'MCP Protocol Support',
    description: 'Connect Claude, ChatGPT, and other MCP clients to governed Spark tools for onboarding and ongoing inventory work.',
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
      title="AI Inventory Automation"
      subtitle="Imports, reporting, API, and agents"
      description="Automate the manual work around inventory with intelligent imports, custom reporting, email processing, APIs, and AI-agent access."
      icon={Wrench}
      gradientFrom="from-pink-500"
      gradientTo="to-rose-400"
      features={features}
      prevCategory={{ name: 'Warehousing', href: '/features/warehousing' }}
      nextCategory={{ name: 'QuickBooks & Accounting', href: '/features/accounting' }}
    />
  );
}
