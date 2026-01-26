import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Package,
  Truck,
  ShoppingCart,
  Factory,
  Warehouse,
  Wrench,
  Calculator
} from 'lucide-react';
import { Button, Container } from '../components';
import { useTheme } from '../context/ThemeContext';

const featureCategories = [
  { name: 'Inventory', href: '/features/inventory', icon: Package },
  { name: 'Purchasing', href: '/features/purchasing', icon: Truck },
  { name: 'Sales', href: '/features/sales', icon: ShoppingCart },
  { name: 'Manufacturing', href: '/features/manufacturing', icon: Factory },
  { name: 'Warehousing', href: '/features/warehousing', icon: Warehouse },
  { name: 'Tools & Services', href: '/features/tools-services', icon: Wrench },
  { name: 'QuickBooks & Accounting', href: '/features/accounting', icon: Calculator },
];

export function Header() {
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);

  const isNextGen = theme === 'nextgen';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm ${isNextGen ? 'bg-black/80 border-b border-white/10' : 'bg-white/95'}`}>
      <Container>
        <nav className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <img src="/spark_icon.png" alt="Spark Inventory" className="w-9 h-9" />
            <span className={`text-xl font-semibold ${isNextGen ? 'text-white' : 'text-gray-900'}`}>Spark Inventory</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <a
              href="#integrations"
              className={`text-sm font-medium transition-colors ${isNextGen ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Integrations
            </a>
            
            <div 
              className="relative"
              onMouseEnter={() => setFeaturesOpen(true)}
              onMouseLeave={() => setFeaturesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${isNextGen ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Features
                <ChevronDown className={`w-4 h-4 transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {featuresOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                  <div className={`rounded-xl shadow-xl py-2 min-w-[280px] ${isNextGen ? 'bg-slate-900 border border-white/10' : 'bg-white border border-gray-100'}`}>
                    {featureCategories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.href}
                        className={`flex items-center justify-between px-4 py-3 transition-colors group ${isNextGen ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isNextGen ? 'bg-white/10 group-hover:bg-white/20' : 'bg-primary/10 group-hover:bg-primary/20'}`}>
                            <category.icon className={`w-4 h-4 ${isNextGen ? 'text-cyan-400' : 'text-primary'}`} />
                          </div>
                          <span className={`font-medium ${isNextGen ? 'text-white/80 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>{category.name}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 group-hover:translate-x-0.5 transition-all ${isNextGen ? 'text-white/30 group-hover:text-cyan-400' : 'text-gray-400 group-hover:text-primary'}`} />
                      </Link>
                    ))}
                    <div className={`border-t mt-2 pt-2 px-4 pb-2 ${isNextGen ? 'border-white/10' : 'border-gray-100'}`}>
                      <Link
                        to="/#all-features"
                        className={`text-sm font-medium ${isNextGen ? 'text-cyan-400 hover:text-cyan-300' : 'text-primary hover:text-primary-dark'}`}
                      >
                        View all features →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a
              href="https://partners.sparkinventory.com"
              className={`text-sm font-medium transition-colors ${isNextGen ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Partners
            </a>
            <a
              href="#faq"
              className={`text-sm font-medium transition-colors ${isNextGen ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              FAQ
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a 
              href="https://app.sparkinventory.com" 
              className={`text-sm font-medium px-4 py-2 ${isNextGen ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
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
            <div className="flex flex-col gap-2">
              <a
                href="#integrations"
                className="text-gray-600 hover:text-gray-900 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Integrations
              </a>
              
              <div>
                <button
                  className="flex items-center justify-between w-full text-gray-600 hover:text-gray-900 font-medium py-2"
                  onClick={() => setMobileFeaturesOpen(!mobileFeaturesOpen)}
                >
                  Features
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileFeaturesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {mobileFeaturesOpen && (
                  <div className="pl-4 border-l-2 border-primary/20 ml-2 mt-2 space-y-1">
                    {featureCategories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.href}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 py-2"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileFeaturesOpen(false);
                        }}
                      >
                        <category.icon className={`w-4 h-4 ${isNextGen ? 'text-cyan-400' : 'text-primary'}`} />
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="https://partners.sparkinventory.com"
                className="text-gray-600 hover:text-gray-900 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Partners
              </a>
              <a
                href="#faq"
                className="text-gray-600 hover:text-gray-900 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              
              <hr className="border-gray-100 my-2" />
              <a href="https://app.sparkinventory.com" className="text-gray-600 hover:text-gray-900 font-medium py-2">
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
