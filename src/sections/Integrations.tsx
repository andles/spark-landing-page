import { Zap, ArrowRight } from 'lucide-react';
import { Container } from '../components';
import { useTheme } from '../context/ThemeContext';

const integrationLogos = [
  { src: '/integrations/shopfiy1.jpeg', alt: 'Shopify' },
  { src: '/integrations/woo.jpeg', alt: 'WooCommerce' },
  { src: '/integrations/amazon.jpeg', alt: 'Amazon' },
  { src: '/integrations/qbo.jpeg', alt: 'QuickBooks' },
  { src: '/integrations/stripe.jpeg', alt: 'Stripe' },
  { src: '/integrations/square.jpeg', alt: 'Square' },
  { src: '/integrations/zoho.jpeg', alt: 'Zoho' },
  { src: '/integrations/shipstation.jpeg', alt: 'ShipStation' },
  { src: '/integrations/meta.jpeg', alt: 'Meta' },
  { src: '/integrations/tiktokpng.jpeg', alt: 'TikTok' },
  { src: '/integrations/edi.jpeg', alt: 'EDI' },
  { src: '/integrations/rxo.jpeg', alt: 'RXO' },
];

function IntegrationsClassic() {
  return (
    <section id="integrations" className="py-16 lg:py-20 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-white italic">
            Native Integrations with your Favorite Tools & Services
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-4 lg:gap-6 justify-center items-center">
            {integrationLogos.map((logo) => (
              <div
                key={logo.alt}
                className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className="h-6 lg:h-8 w-auto object-contain"
                />
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 text-sm mt-6">...and many more</p>
        </div>
      </Container>
      
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 py-20 mt-20">
        <Container>
          <div className="text-center">
            <h3 className="text-3xl lg:text-4xl font-bold text-white italic max-w-3xl mx-auto mb-4">
              Power your inventory operations, optimized for growth
            </h3>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Join hundreds of businesses scaling smarter with Spark
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}

function IntegrationsNextGen() {
  return (
    <section id="integrations" className="py-16 lg:py-20 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[180px]" />
      </div>
      
      {/* Animated connection lines */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="50" x2="100" y2="50" stroke="url(#line-gradient)" strokeWidth="0.1" />
        </svg>
      </div>
      
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-white/80 font-medium">Seamless Connections</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            <span className="text-white">Connect Your </span>
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Entire Stack
            </span>
          </h2>
          <p className="text-lg text-white/50">
            Native integrations with the tools you already use. No middleware required.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 lg:p-8">
            <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-8">
              {integrationLogos.map((logo) => (
                <div
                  key={logo.alt}
                  className="group hover:scale-110 transition-transform duration-300"
                >
                  <img 
                    src={logo.src} 
                    alt={logo.alt}
                    className="h-6 lg:h-7 w-auto object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-white/30 text-sm mt-6">...and many more</p>
        </div>
        
        {/* Bottom CTA section */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-violet-500/10 rounded-3xl p-8 lg:p-12 border border-white/10">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Connect Everything?
            </h3>
            <p className="text-white/50 mb-8 max-w-xl mx-auto">
              Join hundreds of businesses scaling smarter with unified inventory operations
            </p>
            <button
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full text-white font-semibold text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]"
              onClick={() => document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Integrations() {
  const { theme } = useTheme();
  return theme === 'nextgen' ? <IntegrationsNextGen /> : <IntegrationsClassic />;
}
