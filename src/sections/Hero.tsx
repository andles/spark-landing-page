import { ArrowRight } from 'lucide-react';
import { Button, Container } from '../components';

export function Hero() {
  return (
    <section className="pt-20 lg:pt-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 min-h-[600px] lg:min-h-[700px] relative overflow-hidden">
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[50%]">
        <div className="relative h-full w-full">
          <img 
            src="/hero-image.jpg" 
            alt="Warehouse worker using Spark Inventory on laptop"
            className="absolute inset-0 w-full h-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-700/40 to-transparent"></div>
        </div>
      </div>
      
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[600px] lg:min-h-[700px]">
          <div className="text-white py-12 lg:py-20">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-tight mb-6">
              Inventory Reimagined with <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-200 mb-8 leading-relaxed max-w-xl">
              Spark becomes the most powerful member of your logistics team, delivering real-time visibility into stock levels, demand trends, and true all-in pricing — while proactively taking action to minimize disruptions and maximize cash on hand.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button 
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book a demo!
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-slate-800"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Features
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div>
              <p className="text-slate-200 text-sm mb-2 font-semibold">Built for AI from the ground up.</p>
              <p className="text-slate-300 text-sm max-w-md">
                AI features are not 'bolt on' like you find with legacy software, they are native and incorporated into every flow.
              </p>
            </div>
          </div>
        </div>
      </Container>
      
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 to-transparent pointer-events-none"></div>
      
      <div className="absolute -bottom-1 left-0 right-0">
        <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0 50L1440 50L1440 25C1440 25 1200 0 720 0C240 0 0 25 0 25L0 50Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
