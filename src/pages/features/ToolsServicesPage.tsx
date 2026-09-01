import { Wrench } from 'lucide-react';
import AgentOnboardingSection from '../../agency/AgentOnboardingSection';
import MarketingVideo from '../../agency/MarketingVideo';
import { FeaturePage } from './FeaturePage';
import { toolsServicesFaqs } from './toolsServicesData';

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
    title: 'Model Context Protocol (MCP)',
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
      title="Sparki and MCP Inventory Automation"
      heroOutcome="With Human Approval Built In"
      subtitle="Sparki, MCP, and automation"
      description="Sparki is Spark’s in-app AI inventory agent. Spark MCP lets approved assistants such as ChatGPT and Claude use the same governed inventory tools, with previews and approval before operational changes."
      capabilityLabel="Sparki and MCP inventory automation"
      icon={Wrench}
      gradientFrom="from-pink-500"
      gradientTo="to-rose-400"
      features={features}
      faqs={toolsServicesFaqs}
      heroMedia={(
        <MarketingVideo
          mp4Src="/media/sparki-mcp-overview.mp4"
          webmSrc="/media/sparki-mcp-overview.webm"
          posterSrc="/media/sparki-mcp-overview-poster.jpg"
          captionsSrc="/media/sparki-mcp-overview-captions.vtt"
          videoLabel="Thirty second overview of Sparki and Spark MCP"
          eyebrow="30 second overview"
          title="Sparki in app. Your assistant over MCP."
          summary="See both paths use the same governed inventory context and stop for your approval before anything changes."
        />
      )}
      showcase={<AgentOnboardingSection />}
      prevCategory={{ name: 'Warehousing', href: '/features/warehousing' }}
      nextCategory={{ name: 'QuickBooks & Accounting', href: '/features/accounting' }}
    />
  );
}
