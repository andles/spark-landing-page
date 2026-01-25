import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Container } from '../components';

const faqs = [
  {
    question: 'What is Spark Inventory?',
    answer: 'Spark is a modern inventory platform that helps manufacturers, wholesalers, and retailers stay on top of their products, orders, stock levels, and ops — with AI giving you a nudge when you need it.',
  },
  {
    question: 'Who is Spark for?',
    answer: "Small to mid-sized businesses that are tired of spreadsheets and clunky software. If you make, move, or sell stuff — Spark gets you.",
  },
  {
    question: 'Is Spark cloud-based?',
    answer: 'Yes. Nothing to install, nothing to update. Just log in and go.',
  },
  {
    question: 'Does it work across multiple warehouses?',
    answer: "Absolutely. You can track stock across warehouses, pickup points, and packing stations without breaking a sweat.",
  },
  {
    question: 'Can I ask it questions like "show me sales over $10K"?',
    answer: "Yes. Spark's AI lets you type or say what you want, and it'll pull the data, filter results, or even trigger actions — like magic, but nerdier.",
  },
  {
    question: 'How long to get started?',
    answer: "SaaS plans are plug-and-play — live in a few days. Custom setups usually launch in 4–6 weeks.",
  },
  {
    question: 'Is it customizable?',
    answer: "For sure. If your workflows are a bit... unique, we'll tailor Spark to fit.",
  },
  {
    question: 'What kind of support do I get?',
    answer: "SaaS plans come with email/chat support. Custom clients get a full support squad on speed dial.",
  },
  {
    question: 'Is my data safe?',
    answer: "Yes. Fully encrypted, securely stored, regularly backed up, and 100% yours — always exportable.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Still got questions?
          </h2>
          <p className="text-lg text-gray-600">
            No worries — we've got answers.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-100">
              <button
                className="w-full py-5 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900 pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500">
            Still have questions?{' '}
            <a href="#book-demo" className="text-primary hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
