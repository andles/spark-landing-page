import { Star } from 'lucide-react';
import { Container } from '../components';

const testimonials = [
  {
    quote: "Spark Inventory transformed how we manage our warehouse. We've reduced stockouts by 80% and our team saves hours every week.",
    author: 'Sarah Chen',
    role: 'Operations Manager',
    company: 'TechGear Supply',
    rating: 5,
  },
  {
    quote: "The integration with Shopify was seamless. Now our inventory syncs automatically and we never oversell. Game changer!",
    author: 'Michael Rodriguez',
    role: 'E-commerce Director',
    company: 'Urban Essentials',
    rating: 5,
  },
  {
    quote: "Finally, an inventory system that's actually easy to use. Our team was up and running in less than a day.",
    author: 'Emily Thompson',
    role: 'Warehouse Supervisor',
    company: 'Pacific Distribution',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Loved by Operations Teams
          </h2>
          <p className="text-xl text-gray-600">
            See why hundreds of businesses trust Spark Inventory to manage their operations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="bg-gray-50 rounded-2xl p-8 relative"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
