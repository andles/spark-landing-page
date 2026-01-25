import { Container } from '../components';

const steps = [
  {
    number: '01',
    title: 'Set Up Your Inventory',
    description: 'Import your products, set up warehouses, and configure your stock levels. Our onboarding wizard makes it easy.',
  },
  {
    number: '02',
    title: 'Connect Your Channels',
    description: 'Integrate with your e-commerce platforms, accounting software, and shipping providers in minutes.',
  },
  {
    number: '03',
    title: 'Manage Operations',
    description: 'Process sales orders, manage purchases, and track inventory movements all from one dashboard.',
  },
  {
    number: '04',
    title: 'Grow Your Business',
    description: 'Use insights and analytics to optimize stock levels, reduce costs, and scale your operations.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-gray-50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Get Started in Minutes
          </h2>
          <p className="text-xl text-gray-600">
            Simple setup, powerful results. Here's how Spark Inventory transforms your operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -translate-x-4"></div>
              )}
              <div className="text-5xl font-bold text-primary/20 mb-4">{step.number}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
