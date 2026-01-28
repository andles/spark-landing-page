import { Monitor, Smartphone, Tablet, ArrowRight } from 'lucide-react';
import { Button, Container } from '../components';
import { useTheme } from '../context/ThemeContext';

function MobileDesktopClassic() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-700 to-slate-800 text-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="flex items-end justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 transform -rotate-6 shadow-2xl">
                <div className="w-28 h-48 bg-gray-900 rounded-xl flex items-center justify-center border border-white/10">
                  <Smartphone className="w-10 h-10 text-white/40" />
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 shadow-2xl z-10 transform translate-y-4">
                <div className="w-56 h-36 bg-gray-900 rounded-xl flex items-center justify-center border border-white/10">
                  <Monitor className="w-14 h-14 text-white/40" />
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 transform rotate-6 shadow-2xl">
                <div className="w-28 h-48 bg-gray-900 rounded-xl flex items-center justify-center border border-white/10">
                  <Tablet className="w-10 h-10 text-white/40" />
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Mobile and Desktop Virtual Storefront
            </h2>
            <p className="text-lg text-slate-200 mb-6">
              Get your own e-store, optimized to increase order value and streamline operations. 
              Launch it on the web or as iOS and Android apps.
            </p>
            <p className="text-slate-300 mb-8">
              Built for your operation, the platform delivers the same core functionality 
              and reliability across desktop, iOS, and Android.
            </p>

            <Button 
              variant="secondary"
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

function MobileDesktopNextGen() {
  return (
    <section className="py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[180px]" />
      </div>
      
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="flex items-end justify-center gap-6">
              {/* Phone */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-violet-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-3xl p-4 transform -rotate-6 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                  <div className="w-24 h-44 bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center border border-white/10">
                    <Smartphone className="w-10 h-10 text-cyan-400/60" />
                  </div>
                </div>
              </div>
              
              {/* Desktop */}
              <div className="group relative z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-violet-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-3xl p-4 transform translate-y-4 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                  <div className="w-52 h-32 bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center border border-white/10">
                    <Monitor className="w-14 h-14 text-violet-400/60" />
                  </div>
                </div>
              </div>
              
              {/* Tablet */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-violet-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-3xl p-4 transform rotate-6 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                  <div className="w-24 h-44 bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center border border-white/10">
                    <Tablet className="w-10 h-10 text-fuchsia-400/60" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <span className="text-sm text-white/80 font-medium">Multi-Platform</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              <span className="text-white">One Platform, </span>
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Every Device
              </span>
            </h2>
            <p className="text-lg text-white/60 mb-6">
              Get your own e-store, optimized to increase order value and streamline operations. 
              Launch it on the web or as iOS and Android apps.
            </p>
            <p className="text-white/40 mb-8">
              Built for your operation, the platform delivers the same core functionality 
              and reliability across desktop, iOS, and Android.
            </p>

            <button 
              onClick={() => document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
            >
              Book a Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function MobileDesktop() {
  const { theme } = useTheme();
  return theme === 'nextgen' ? <MobileDesktopNextGen /> : <MobileDesktopClassic />;
}
