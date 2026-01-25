import { Container } from '../components';

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
];

export function Integrations() {
  return (
    <section id="integrations" className="py-20 lg:py-28 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600">
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
