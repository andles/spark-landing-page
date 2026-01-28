import { Store, RefreshCw, MapPin } from 'lucide-react';
import { Container } from '../components';
import { useTheme } from '../context/ThemeContext';

const features = [
  {
    icon: Store,
    title: 'Hybrid Physical & Online Sales',
    subtitle: 'with Diverse Payment Options',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    icon: RefreshCw,
    title: 'One Time & Subscription Orders',
    subtitle: 'with Flexible Scheduling',
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    icon: MapPin,
    title: 'Single & Multiple Locations',
    subtitle: 'with Nationwide Delivery',
    gradient: 'from-fuchsia-400 to-pink-500',
  },
];

function PerfectForClassic() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Spark is perfect for small and large operations
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm">{feature.subtitle}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PerfectForNextGen() {
  return (
    <section className="py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Subtle gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <span className="text-sm text-white/80 font-medium">Built For You</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            <span className="text-white">Perfect for </span>
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Any Scale
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className="group relative bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="relative text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>
              <p className="relative text-white/40 text-sm">{feature.subtitle}</p>
            </div>
          ))}
        </div>
      </Container>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

export function PerfectFor() {
  const { theme } = useTheme();
  return theme === 'nextgen' ? <PerfectForNextGen /> : <PerfectForClassic />;
}
