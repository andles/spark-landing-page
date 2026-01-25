import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button, Container } from '../components';

const navLinks = [
  { name: 'Integrations', href: '#integrations' },
  { name: 'Features', href: '#features' },
  { name: 'Partners', href: 'https://partners.sparkinventory.com' },
  { name: 'FAQ', href: '#faq' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
      <Container>
        <nav className="flex items-center justify-between h-16 lg:h-20">
          <a href="/" className="flex items-center gap-2">
            <img src="/spark_icon.png" alt="Spark Inventory" className="w-9 h-9" />
            <span className="text-xl font-semibold text-gray-900">Spark Inventory</span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a 
              href="https://app.sparkinventory.com" 
              className="text-gray-600 hover:text-gray-900 text-sm font-medium px-4 py-2"
            >
              Sign In
            </a>
            <Button 
              size="sm"
              onClick={() => document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book a demo
            </Button>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-gray-100" />
              <a href="https://app.sparkinventory.com" className="text-gray-600 hover:text-gray-900 font-medium">
                Sign In
              </a>
              <Button onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Book a demo
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
