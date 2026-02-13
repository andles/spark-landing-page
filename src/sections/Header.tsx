import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button, Container } from '../components';
import { useTheme } from '../context/ThemeContext';

export function Header() {
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isNextGen = theme === 'nextgen';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm ${isNextGen ? 'bg-black/80 border-b border-white/10' : 'bg-white/95'}`}>
      <Container>
        <nav className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <img src="/spark_icon.png" alt="Spark Inventory" className="w-9 h-9" />
            <span className={`text-xl font-semibold ${isNextGen ? 'text-white' : 'text-gray-900'}`}>Spark Inventory</span>
          </Link>

          <div className="hidden lg:flex items-center gap-3">
            <a 
              href="https://app.sparkinventory.com" 
              className={`text-sm font-medium px-4 py-2 ${isNextGen ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Sign In
            </a>
            {isNextGen ? (
              <button 
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-medium text-sm transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                onClick={() => document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started
              </button>
            ) : (
              <Button 
                size="sm"
                onClick={() => document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book a demo
              </Button>
            )}
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className={`lg:hidden py-4 border-t ${isNextGen ? 'border-white/10 bg-black/95' : 'border-gray-100 bg-white'}`}>
            <div className="flex flex-col gap-2">
              <a href="https://app.sparkinventory.com" className={`font-medium py-2 ${isNextGen ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                Sign In
              </a>
              {isNextGen ? (
                <button 
                  className="w-full px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-medium text-sm transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get Started
                </button>
              ) : (
                <Button onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Book a demo
                </Button>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
