import { BellRing } from 'lucide-react';
import { FeaturePage } from './FeaturePage';
import { signalsFaqs } from './featureFaqs';
import { AutomationShowcase, SignalInboxMockup } from './featureVisuals';

const features = [
  {
    title: 'One Inbox for Proposed Actions',
    description: 'Spark Signal collects what needs attention in one place. Approve, prepare, dismiss, or undo each item, on the web or from your phone.',
  },
  {
    title: 'Reorder and Backorder Signals',
    description: 'Get a signal when an item needs reordering or a sales order is waiting on stock, with the evidence behind it attached.',
  },
  {
    title: 'Demand and Velocity Changes',
    description: 'See when demand moves outside its normal range or an item starts selling faster or slower than its plan.',
  },
  {
    title: 'Expiring, Stale, and Slow-Moving Stock',
    description: 'Catch lots nearing expiry and items that have stopped moving, with markdown proposals for slow movers.',
  },
  {
    title: 'Channel Stock Mismatches',
    description: 'Spot when Shopify or Amazon FBA quantities drift from what Spark shows, so the difference gets resolved before it costs a sale.',
  },
  {
    title: 'Supplier and Invoice Checks',
    description: 'Get signals for supplier price changes, supplier emails about open purchase orders, invoice discrepancies, and receiving variances.',
  },
  {
    title: 'Rules in Plain English',
    description: 'Describe the rule you want and Spark drafts it. Set conditions and schedules, then dry run it against your data before it goes live.',
  },
  {
    title: 'Observe, Propose, or Autopilot',
    description: 'Choose how far each rule goes: watch and report, propose for approval, or act on its own. Built-in automations are visible and can be turned off.',
  },
  {
    title: 'Actions Rules Can Take',
    description: 'Notify people, require approval, assign tasks, call a webhook, propose reorder POs or transfers, run reports, and apply demand curves.',
  },
  {
    title: 'Conflict Checks',
    description: 'Spark checks a new rule against the ones you already have so two automations do not fight over the same item.',
  },
  {
    title: 'Spark Solo by Text',
    description: 'Owners and admins can text Spark questions about their account and get a morning summary, weekly summary, and urgent alerts. Changes made by text need a confirmation reply first.',
  },
  {
    title: 'Scheduled Reports',
    description: 'Have a rule run a report on a schedule and send it to the people who need it.',
  },
];

export function SignalsAutomationPage() {
  return (
    <FeaturePage
      title="Signals and Automation"
      heroOutcome="Spark Watches, You Decide"
      subtitle="Spark Signal, rules, and Spark Solo"
      description="Spark watches stock, demand, suppliers, and channels, then turns what it finds into proposed actions with the reasoning attached. You choose which ones run on their own."
      capabilityLabel="signals and automation"
      icon={BellRing}
      gradientFrom="from-amber-500"
      gradientTo="to-orange-400"
      features={features}
      faqs={signalsFaqs}
      faqEyebrow="Signals and rules, explained"
      faqTitle="How Spark watches and acts"
      faqIntro="What Spark Signal surfaces, how rules are built, and how much each one is allowed to do."
      heroMedia={<SignalInboxMockup />}
      showcase={<AutomationShowcase />}
      ctaSource="features-signals-automation"
      prevCategory={{ name: 'Mobile', href: '/features/mobile' }}
      nextCategory={{ name: 'Wholesale & Suppliers', href: '/features/wholesale-suppliers' }}
      closingNote={<>Run Spark by text with <a href="/spark-solo" className="underline hover:text-white">Spark Solo</a>, a paid add-on. See the <a href="/sms-program" className="underline hover:text-white">SMS program terms</a>.</>}
    />
  );
}
