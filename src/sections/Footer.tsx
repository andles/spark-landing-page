import { Container } from '../components';

const footerLinks = {
  Product: [
    { name: 'Integrations', href: '#integrations' },
    { name: 'Features', href: '#features' },
    { name: 'Partners', href: 'https://partners.sparkinventory.com' },
    { name: 'FAQ', href: '#faq' },
  ],
  Resources: [
    { name: 'Blog', href: '#' },
    { name: 'Help Center', href: '#' },
    { name: 'API Docs', href: '#' },
  ],
  Company: [
    { name: 'About Us', href: '#' },
    { name: 'Contact', href: '#book-demo' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <img src="/spark_icon.png" alt="Spark Inventory" className="w-9 h-9" />
              <span className="text-xl font-semibold text-white">Spark Inventory</span>
            </a>
            <p className="text-gray-400 text-sm max-w-xs">
              Modern inventory management for growing businesses. Streamline operations and scale with confidence.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-medium text-sm mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Spark Inventory. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
