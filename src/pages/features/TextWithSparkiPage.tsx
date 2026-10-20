import { MessageSquareText } from 'lucide-react';
import MarketingVideo from '../../agency/MarketingVideo';
import { FeaturePage } from './FeaturePage';
import { textWithSparkiFaqs } from './featureFaqs';
import { SparkiControlSection, SparkiScheduleSection } from './textWithSparkiContent';

const features = [
  {
    title: 'Ask in Plain Words',
    description: 'Text what you would ask in the app: what needs reordering, how many are on hand, where a purchase order stands. Long answers continue when you reply MORE.',
  },
  {
    title: 'Draft Orders by Text',
    description: 'Ask Sparki to draft a purchase order, transfer, stock adjustment, or sales order. It shows the supplier, quantity, location, and estimated cost before anything is created.',
  },
  {
    title: 'Confirm With One Reply',
    description: 'Every drafted change comes with a short code. Reply YES with the code to create it, or NO to skip it.',
  },
  {
    title: 'Urgent Alerts',
    description: 'The signals that need you now arrive by text, with a code to see the details, approve, or dismiss. Open items get one reminder.',
  },
  {
    title: 'Morning Brief and Evening Wrap',
    description: 'Start the day with what is urgent and what is ready to approve. End it with orders and sales for the day.',
  },
  {
    title: 'Weekly Pulse',
    description: 'Every Monday: the signals raised last week, what you handled by text, and what is still open.',
  },
  {
    title: 'Pick Your Topics',
    description: 'Choose which kinds of alerts you get, such as reorders, supplier order updates, backorders, demand drops, and slow movers. You can change them by text too.',
  },
  {
    title: 'Quiet Hours and a Daily Limit',
    description: 'Set when Sparki stays quiet and the most texts it sends per day. Alerts held overnight arrive in your morning brief.',
  },
  {
    title: 'Powered by Sparki',
    description: 'Sparki is Spark Inventory’s AI assistant, the same Sparki as in the app, working from the same account data. Text conversations appear in your chat history.',
  },
];

export function TextWithSparkiPage() {
  return (
    <FeaturePage
      title="Text with Sparki"
      heroOutcome="Run Your Inventory by Text"
      subtitle="Spark Inventory’s AI assistant, by text"
      description="Text Sparki, Spark Inventory’s AI assistant, a question and get the answer. Get urgent alerts and a daily brief. Draft a purchase order from the parking lot and confirm it with one reply. Nothing changes until you confirm it with its code."
      capabilityLabel="your inventory by text"
      icon={MessageSquareText}
      gradientFrom="from-cyan-500"
      gradientTo="to-violet-500"
      features={features}
      faqs={textWithSparkiFaqs}
      faqEyebrow="Text with Sparki, explained"
      faqTitle="Text with Sparki"
      faqIntro="What it can do, how changes are confirmed, and how to turn it on."
      heroMedia={(
        <MarketingVideo
          mp4Src="/media/spark-solo-text-to-po.mp4"
          webmSrc="/media/spark-solo-text-to-po.webm"
          posterSrc="/media/spark-solo-text-to-po-poster.jpg"
          captionsSrc="/media/spark-solo-text-to-po-captions.vtt"
          videoLabel="Text with Sparki turning a text into a draft purchase order"
          eyebrow="42 second demo"
          title="From a text to a draft purchase order"
          summary="Ask what needs reordering, pick the item, reply yes, and the draft PO is in Spark."
        />
      )}
      showcase={(
        <>
          <SparkiScheduleSection />
          <SparkiControlSection />
        </>
      )}
      ctaSource="text-with-sparki"
      prevCategory={{ name: 'Signals & Automation', href: '/features/signals-automation/' }}
      nextCategory={{ name: 'Mobile App', href: '/features/mobile/' }}
      closingNote={<>Text with Sparki is included on the Solo plan and up for account owners and admins with a US mobile number. See the <a href="/sms-program/" className="underline hover:text-white">SMS program terms</a>.</>}
    />
  );
}
