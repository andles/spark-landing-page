import { Store, RefreshCw, MapPin } from 'lucide-react';
import { Container } from '../components';

const features = [
  {
    icon: Store,
    title: 'Hybrid Physical & Online Sales',
    subtitle: 'with Diverse Payment Options',
  },
  {
    icon: RefreshCw,
    title: 'One Time & Subscription Orders',
    subtitle: 'with Flexible Scheduling',
  },
  {
    icon: MapPin,
    title: 'Single & Multiple Locations',
    subtitle: 'with Nationwide Delivery',
  },
];

export function PerfectFor() {
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
