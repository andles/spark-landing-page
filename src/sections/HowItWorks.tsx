import { Container } from '../components';
import { useTheme } from '../context/ThemeContext';

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

function HowItWorksClassic() {
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

function HowItWorksNextGen() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[180px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[150px] -translate-y-1/2" />
      </div>
      
      {/* Connecting line */}
      <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <span className="text-sm text-white/80 font-medium">How It Works</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            <span className="text-white">Get Started in </span>
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Minutes
            </span>
          </h2>
          <p className="text-lg text-white/50">
            Simple setup, powerful results. Here's how Spark Inventory transforms your operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div 
              key={step.number} 
              className="group relative bg-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500"
            >
              {/* Step number with gradient */}
              <div className="absolute -top-4 -left-2">
                <span className="text-6xl font-bold bg-gradient-to-br from-cyan-400/20 to-violet-400/20 bg-clip-text text-transparent">
                  {step.number}
                </span>
              </div>
              
              {/* Connector dot */}
              <div className="hidden lg:block absolute top-1/2 -right-3 w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 -translate-y-1/2 z-10" />
              
              <div className="pt-8">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-white/40 group-hover:text-white/60 transition-colors">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HowItWorks() {
  const { theme } = useTheme();
  return theme === 'nextgen' ? <HowItWorksNextGen /> : <HowItWorksClassic />;
}
