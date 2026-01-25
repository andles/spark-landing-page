import { Container } from '../components';

const logos = [
  { src: '/fba.png', alt: 'FBA' },
  { src: '/b2b.png', alt: 'B2B Wholesale' },
  { src: '/order-pickup.png', alt: 'Order Pickup' },
  { src: '/Shopify.png', alt: 'Shopify' },
];

export function TrustedBy() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <Container>
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-slate-800 italic mb-12 max-w-2xl mx-auto">
          The #1 inventory platform for FBA, Shopify, and B2B Wholesale
        </h2>
        
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-12 lg:h-16 w-auto object-contain"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
