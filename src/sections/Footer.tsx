import { Container } from '../components';
import { useTheme } from '../context/ThemeContext';

const footerLinks = [
  { name: 'Partners', href: '/partners' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '#' },
];

export function Footer() {
  const { theme } = useTheme();
  const isNextGen = theme === 'nextgen';

  return (
    <footer className={`py-12 ${isNextGen ? 'bg-black border-t border-white/10' : 'bg-gray-900'} text-gray-300`}>
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-8">
          <div className="flex-shrink-0">
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

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className={`text-sm transition-colors ${isNextGen ? 'text-white/50 hover:text-cyan-400' : 'hover:text-white'}`}
              >
                {link.name}
              </a>
            ))}
          </nav>
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
