import { Check, ArrowRight, Cpu, Smartphone, Globe } from 'lucide-react';
import { Button, Container } from '../components';
import { useTheme } from '../context/ThemeContext';

const features = [
  'Open API for custom integrations',
  'MCP protocol support',
  'Real-time sync across all devices',
];

function FeatureShowcaseClassic() {
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

const platformFeatures = [
  { icon: Cpu, title: 'Open API', description: 'Full REST API for custom integrations with any system' },
  { icon: Globe, title: 'MCP Protocol', description: 'Model Context Protocol for AI agent integrations' },
  { icon: Smartphone, title: 'Cross-Platform', description: 'Native experience on desktop, iOS, and Android' },
];

function FeatureShowcaseNextGen() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[180px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[150px] -translate-y-1/2" />
      </div>
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
      
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-3xl blur-2xl opacity-50" />
            <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-3xl p-4 border border-white/10">
              <img 
                src="/mcp-api.png" 
                alt="Spark Inventory on mobile and desktop"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
          
          {/* Content side */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-white/80 font-medium">Platform Architecture</span>
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight">
              <span className="text-white">Built for </span>
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Developers
              </span>
              <span className="text-white"> & </span>
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                AI Agents
              </span>
            </h2>
            
            <p className="text-lg text-white/50 mb-10 leading-relaxed">
              A platform designed from the ground up for extensibility. Connect your tools, 
              build custom workflows, and let AI agents interact with your inventory data.
            </p>
            
            <div className="space-y-4 mb-10">
              {platformFeatures.map((feature) => (
                <div 
                  key={feature.title}
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:from-cyan-500/30 group-hover:to-violet-500/30 transition-all">
                    <feature.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                    <p className="text-white/40 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-semibold text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]"
              onClick={() => document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore the Platform
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function FeatureShowcase() {
  const { theme } = useTheme();
  return theme === 'nextgen' ? <FeatureShowcaseNextGen /> : <FeatureShowcaseClassic />;
}
