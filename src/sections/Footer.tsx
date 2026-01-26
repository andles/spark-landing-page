import { Container } from '../components';
import { useTheme } from '../context/ThemeContext';

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
  const { theme } = useTheme();
  const isNextGen = theme === 'nextgen';

  return (
    <footer className={`py-12 ${isNextGen ? 'bg-black border-t border-white/10' : 'bg-gray-900'} text-gray-300`}>
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <img src="/spark_icon.png" alt="Spark Inventory" className="w-9 h-9" />
              <span className="text-xl font-semibold text-white">Spark Inventory</span>
            </a>
            <p className={`text-sm max-w-xs ${isNextGen ? 'text-white/40' : 'text-gray-400'}`}>
              {isNextGen 
                ? 'Next-generation inventory platform powered by AI. Built for the future of operations.'
                : 'Modern inventory management for growing businesses. Streamline operations and scale with confidence.'
              }
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-medium text-sm mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className={`text-sm transition-colors ${isNextGen ? 'text-white/50 hover:text-cyan-400' : 'hover:text-white'}`}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 ${isNextGen ? 'border-white/10' : 'border-gray-800'}`}>
          <p className={`text-sm ${isNextGen ? 'text-white/30' : 'text-gray-500'}`}>
            © {new Date().getFullYear()} Spark Inventory. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
