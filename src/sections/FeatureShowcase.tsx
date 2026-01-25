import { Check } from 'lucide-react';
import { Button, Container } from '../components';

const features = [
  'Open API for custom integrations',
  'MCP protocol support',
  'Real-time sync across all devices',
];

export function FeatureShowcase() {
  return (
    <section id="features" className="relative">
      <div className="absolute inset-0 flex flex-col">
        <div className="h-[70%] bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 relative">
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
              <path d="M0 80L1440 80L1440 40C1440 40 1100 0 720 20C340 40 0 0 0 0L0 80Z" fill="url(#divider-gradient)"/>
              <defs>
                <linearGradient id="divider-gradient" x1="0" y1="0" x2="1440" y2="0">
                  <stop offset="0%" stopColor="#1e293b"/>
                  <stop offset="50%" stopColor="#334155"/>
                  <stop offset="100%" stopColor="#475569"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="h-[30%] bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600"></div>
      </div>
      
      <Container className="relative z-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-white/80 rounded-3xl shadow-2xl backdrop-blur-sm"></div>
            <img 
              src="/mcp-api.png" 
              alt="Spark Inventory on mobile and desktop"
              className="relative w-full h-auto rounded-2xl"
            />
          </div>
          
          <div className="lg:pl-8 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
              Platform Features
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              Mobile and Desktop enabled with an open MCP and API
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Built for your operation, the platform delivers the same core functionality and reliability across desktop, iOS, and Android.
            </p>
            
            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-slate-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-dark text-white shadow-lg hover:shadow-xl transition-all"
              onClick={() => document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book a demo today!
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
