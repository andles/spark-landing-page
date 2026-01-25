import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { Button, Container } from '../components';

export function MobileDesktop() {
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
