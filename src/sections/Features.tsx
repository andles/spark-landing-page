import { 
  Package, 
  ShoppingCart,
  Truck,
  Factory,
  Globe,
  Sparkles,
  Check,
  ArrowRight,
  type LucideIcon
} from 'lucide-react';
import { Container } from '../components';
import { useTheme } from '../context/ThemeContext';

interface FeatureCategory {
  icon: LucideIcon;
  title: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  features: string[];
}

const featureCategories: FeatureCategory[] = [
  {
    icon: Package,
    title: 'Inventory Management',
    color: 'text-emerald-500',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-teal-400',
    features: [
      'Items & SKU management with variants',
      'Bundle items & kits',
      'Item groups & categories',
      'Multi-warehouse tracking',
      'Bin-level location management',
      'Transfer orders between locations',
      'Write-offs & adjustments',
      'Barcode generation & printing',
      'Custom fields per item',
    ],
  },
  {
    icon: ShoppingCart,
    title: 'Sales & Fulfillment',
    color: 'text-blue-500',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-cyan-400',
    features: [
      'Sales order management',
      'Invoicing & billing',
      'Quotes & estimates',
      'Customer return orders',
      'Return receipts processing',
      'Pick lists & wave picking',
      'Pack stations & ship lists',
      'Shipping method configuration',
      'Customer management & history',
      'Services & non-inventory items',
      'Discounts & discount groups',
    ],
  },
  {
    icon: Truck,
    title: 'Purchasing & Procurement',
    color: 'text-violet-500',
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-purple-400',
    features: [
      'Purchase order creation',
      'Delivery receipts & receiving',
      'Request for proposals (RFP)',
      'Supplier return orders',
      'Supplier management',
      'Reorder point planning',
      'Backorder management',
      'Procurement forecasting',
    ],
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    color: 'text-orange-500',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-amber-400',
    features: [
      'Multi-level bills of materials',
      'Manufacturing orders',
      'Work order management',
      'Operation tracking & scheduling',
      'Machine management',
      'Production materials tracking',
      'Shop floor control',
      'Work order approval workflows',
    ],
  },
  {
    icon: Globe,
    title: 'E-Commerce & Integrations',
    color: 'text-pink-500',
    gradientFrom: 'from-pink-500',
    gradientTo: 'to-rose-400',
    features: [
      'Shopify real-time sync',
      'B2B customer portal',
      'Member roles & permissions',
      'Category & brand management',
      'REST API access',
      'MCP protocol support',
      'API key management',
      'Webhook integrations',
    ],
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Features',
    color: 'text-cyan-500',
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-purple-500',
    features: [
      'AI-powered CSV/Excel import',
      'Smart email processing',
      'Automatic order extraction',
      'Intelligent data mapping',
      'Proactive inventory alerts',
      'Demand forecasting',
    ],
  },
];

function FeaturesClassic() {
  return (
    <section id="all-features" className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            Complete Platform
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            One Platform.{' '}
            <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
              Endless Possibilities.
            </span>
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to manage inventory, fulfill orders, and grow your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCategories.map((category) => (
            <div 
              key={category.title}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-slate-200 overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.gradientFrom} ${category.gradientTo}`} />
              
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.gradientFrom} ${category.gradientTo} flex items-center justify-center shadow-lg`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">{category.title}</h3>
              </div>

              <ul className="space-y-2.5">
                {category.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <Check className={`w-4 h-4 ${category.color} flex-shrink-0 mt-0.5`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            See It In Action
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </Container>
    </section>
  );
}

function FeaturesNextGen() {
  return (
    <section id="all-features" className="py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px]" />
      </div>
      
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-white/80 font-medium">Full Feature Suite</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            <span className="text-white">Built for </span>
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Modern Operations
            </span>
          </h2>
          <p className="text-lg text-white/50">
            Every feature designed with AI-first architecture. No legacy baggage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureCategories.map((category, index) => (
            <div 
              key={category.title}
              className="group relative bg-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/[0.05]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradientFrom} ${category.gradientTo} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.gradientFrom} ${category.gradientTo} flex items-center justify-center`}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                </div>

                <ul className="space-y-2">
                  {category.features.slice(0, 5).map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-white/50 group-hover:text-white/70 transition-colors">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.gradientFrom} ${category.gradientTo} flex-shrink-0 mt-1.5`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {category.features.length > 5 && (
                    <li className="text-sm text-white/30 pl-4">
                      +{category.features.length - 5} more features
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-semibold text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]"
          >
            Experience the Future
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </Container>
    </section>
  );
}

export function Features() {
  const { theme } = useTheme();
  return theme === 'nextgen' ? <FeaturesNextGen /> : <FeaturesClassic />;
}
