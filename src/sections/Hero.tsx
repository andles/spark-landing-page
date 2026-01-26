import { ArrowRight, Sparkles } from 'lucide-react';
import { Button, Container } from '../components';
import { useTheme } from '../context/ThemeContext';

function HeroClassic() {
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
                onClick={() => document.getElementById('all-features')?.scrollIntoView({ behavior: 'smooth' })}
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

function HeroNextGen() {
  return (
    <section className="pt-20 lg:pt-0 min-h-[100vh] relative overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/40 via-black to-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />
      
      <Container className="relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[100vh] text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-white/80 font-medium">Next-Generation Inventory Platform</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.1] mb-8 tracking-tight">
            <span className="text-white">Inventory</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Reimagined
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-white/60 mb-12 leading-relaxed max-w-2xl">
            The AI-native inventory platform that thinks ahead. Real-time visibility, 
            predictive insights, and autonomous optimization — all in one seamless experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button 
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-semibold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]"
              onClick={() => document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button 
              className="px-8 py-4 rounded-full text-white font-semibold text-lg border border-white/20 hover:bg-white/5 transition-all hover:border-white/40"
              onClick={() => document.getElementById('all-features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Features
            </button>
          </div>

          {/* Floating stats */}
          <div className="grid grid-cols-3 gap-8 lg:gap-16">
            {[
              { value: '10x', label: 'Faster Operations' },
              { value: '99.9%', label: 'Accuracy Rate' },
              { value: '24/7', label: 'AI Monitoring' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

export function Hero() {
  const { theme } = useTheme();
  return theme === 'nextgen' ? <HeroNextGen /> : <HeroClassic />;
}
