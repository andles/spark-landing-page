import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Container } from '../components';
import { useTheme } from '../context/ThemeContext';

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

function FAQClassic() {
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

function FAQNextGen() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-violet-600/5 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <span className="text-sm text-white/80 font-medium">FAQ</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            <span className="text-white">Still Got </span>
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Questions?
            </span>
          </h2>
          <p className="text-lg text-white/50">
            No worries — we've got answers.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-white/10"
            >
              <button
                className="w-full py-6 flex items-center justify-between text-left group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-white pr-8 group-hover:text-cyan-400 transition-colors">
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-all ${openIndex === index ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20' : ''}`}>
                  <ChevronDown
                    className={`w-4 h-4 text-white/60 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 pb-6' : 'max-h-0'}`}>
                <p className="text-white/50 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-white/40">
            Still have questions?{' '}
            <a href="#book-demo" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Contact us
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}

export function FAQ() {
  const { theme } = useTheme();
  return theme === 'nextgen' ? <FAQNextGen /> : <FAQClassic />;
}
