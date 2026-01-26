import { Container } from '../components';
import { useTheme } from '../context/ThemeContext';

const logos = [
  { src: '/fba.png', alt: 'FBA' },
  { src: '/b2b.png', alt: 'B2B Wholesale' },
  { src: '/order-pickup.png', alt: 'Order Pickup' },
  { src: '/Shopify.png', alt: 'Shopify' },
];

function TrustedByClassic() {
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

function TrustedByNextGen() {
  return (
    <section className="py-16 bg-black relative overflow-hidden">
      {/* Subtle gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <Container>
        <div className="text-center mb-10">
          <p className="text-white/40 text-sm font-medium uppercase tracking-widest mb-4">
            Trusted by Industry Leaders
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold max-w-2xl mx-auto">
            <span className="text-white">The </span>
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">#1 Platform</span>
            <span className="text-white"> for FBA, Shopify & B2B</span>
          </h2>
        </div>
        
        <div className="bg-white rounded-2xl p-6 lg:p-8 max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {logos.map((logo) => (
              <div 
                key={logo.alt}
                className="group hover:scale-110 transition-transform duration-300"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 lg:h-12 w-auto object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
      
      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

export function TrustedBy() {
  const { theme } = useTheme();
  return theme === 'nextgen' ? <TrustedByNextGen /> : <TrustedByClassic />;
}
