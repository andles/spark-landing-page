import { TrendingUp, BarChart3, Workflow } from 'lucide-react';
import { Container } from '../components';
import { useTheme } from '../context/ThemeContext';

const capabilities = [
  {
    id: 'order-management',
    headline: 'Order Management & Forecasting',
    description: 'Spark gives you a complete understanding of your inventory — what\'s on order, in the warehouse, reserved, and available for sale. Using AI-driven analytics across order history, market trends, seasonality, and vendor data, Spark intelligently forecasts demand and recommends replenishment strategies that optimize ROI.',
    gradient: 'from-teal-500 to-cyan-400',
    bgGradient: 'from-teal-500/10 to-cyan-500/5',
    borderColor: 'border-teal-200/60',
    icon: TrendingUp,
  },
  {
    id: 'custom-reporting',
    headline: 'Custom Reporting & Signal',
    description: 'Create powerful, custom reports without being a data scientist. Spark\'s reporting tools surface exactly what matters, while Signal, Spark\'s AI-powered intelligence layer, proactively alerts you when something needs attention — so your inventory can talk to you.',
    gradient: 'from-violet-500 to-purple-400',
    bgGradient: 'from-violet-500/10 to-purple-500/5',
    borderColor: 'border-violet-200/60',
    icon: BarChart3,
  },
  {
    id: 'unified-integrations',
    headline: 'Unified Integrations & Workflow',
    description: 'Connect all of your tools into one streamlined system. With dozens of native integrations and hundreds of custom integrations via API, Spark ensures your systems work together seamlessly — eliminating silos and manual handoffs.',
    gradient: 'from-blue-500 to-indigo-400',
    bgGradient: 'from-blue-500/10 to-indigo-500/5',
    borderColor: 'border-blue-200/60',
    icon: Workflow,
  },
];

function OrderManagementGraphic() {
  return (
    <div className="relative w-full aspect-[4/3] min-h-[280px] flex items-center justify-center p-4">
      <img 
        src="/forecast.png" 
        alt="AI-powered demand forecasting and order management" 
        className="w-full h-full object-contain rounded-xl"
      />
    </div>
  );
}

function ReportingGraphic() {
  const metrics = [
    { label: 'Revenue', value: '$124.5K', change: '+12.3%', positive: true },
    { label: 'Orders', value: '1,847', change: '+8.1%', positive: true },
    { label: 'Avg. Value', value: '$67.40', change: '-2.4%', positive: false },
  ];

  return (
    <div className="relative w-full aspect-[4/3] min-h-[280px] flex items-center justify-center p-6">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #8b5cf6 1px, transparent 0)',
        backgroundSize: '24px 24px'
      }} />
      
      <div className="relative w-full max-w-md">
        {/* Dashboard mockup */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <BarChart3 className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-800">Sales Report</span>
            </div>
            <div className="text-xs text-slate-400">Last 30 days</div>
          </div>
          
          {/* Metrics row */}
          <div className="grid grid-cols-3 divide-x divide-slate-100">
            {metrics.map((metric) => (
              <div key={metric.label} className="p-3 text-center">
                <div className="text-[10px] uppercase tracking-wider text-slate-400">{metric.label}</div>
                <div className="text-base font-bold text-slate-800 mt-0.5">{metric.value}</div>
                <div className={`text-xs font-medium ${metric.positive ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {metric.change}
                </div>
              </div>
            ))}
          </div>
          
          {/* Chart area */}
          <div className="px-4 pb-4 pt-2">
            <div className="flex items-end gap-1.5 h-20">
              {[30, 45, 35, 60, 50, 75, 65, 85, 70, 90, 80, 95].map((h, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-violet-500 to-purple-400 rounded-t" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Signal notification */}
        <div className="absolute -right-2 top-8 bg-white rounded-xl shadow-lg border border-violet-100 p-3 max-w-[180px] animate-pulse">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-800">Signal Alert</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Low stock detected on 3 items</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegrationsGraphic() {
  return (
    <div className="relative w-full aspect-[4/3] min-h-[280px] flex items-center justify-center p-4">
      <img 
        src="/integrations.png" 
        alt="Unified integrations and workflow automation" 
        className="w-full h-full object-contain rounded-xl"
      />
    </div>
  );
}

function CoreCapabilitiesClassic() {
  const graphics = [OrderManagementGraphic, ReportingGraphic, IntegrationsGraphic];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Container>
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-100 mb-6">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-sm font-medium text-teal-700">Core Capabilities</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Intelligent Inventory for{' '}
            <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Modern Operations
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
            Spark combines AI-powered insights with seamless integrations to give you complete control over your inventory operations.
          </p>
        </div>

        {/* Capabilities */}
        <div className="space-y-20 lg:space-y-32">
          {capabilities.map((capability, index) => {
            const Graphic = graphics[index];
            const isReversed = index === 1;
            const Icon = capability.icon;
            
            return (
              <div
                key={capability.id}
                className="group"
              >
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
                  {/* Graphic */}
                  <div className={`relative ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className={`relative bg-gradient-to-br ${capability.bgGradient} rounded-3xl border ${capability.borderColor} overflow-hidden`}>
                      {/* Decorative corner accent */}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${capability.gradient} opacity-10 rounded-bl-[100px]`} />
                      <Graphic />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${isReversed ? 'lg:order-1 lg:pr-8' : 'lg:order-2 lg:pl-8'}`}>
                    {/* Icon badge */}
                    <div className={`inline-flex items-center gap-3 mb-6`}>
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${capability.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-slate-200 to-transparent" />
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-5 leading-tight">
                      {capability.headline}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed text-base lg:text-lg mb-6">
                      {capability.description}
                    </p>
                    
                    {/* Learn more link */}
                    <button className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${capability.gradient} bg-clip-text text-transparent hover:gap-3 transition-all duration-300`}>
                      Learn more
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-24">
          <div className="inline-flex flex-col items-center">
            <p className="text-slate-500 text-sm mb-4">
              Built for serious operators who demand intelligent, scalable solutions.
            </p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-slate-600">Trusted by 500+ businesses</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CoreCapabilitiesNextGen() {
  const graphics = [OrderManagementGraphicDark, ReportingGraphicDark, IntegrationsGraphicDark];

  return (
    <section className="py-16 lg:py-20 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-teal-600/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[180px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[150px]" />
      </div>

      <Container className="relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-sm text-white/80 font-medium">Core Capabilities</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            <span className="text-white">Intelligent Inventory for </span>
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Modern Operations
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-white/50 leading-relaxed">
            Spark combines AI-powered insights with seamless integrations to give you complete control over your inventory operations.
          </p>
        </div>

        {/* Capabilities */}
        <div className="space-y-20 lg:space-y-32">
          {capabilities.map((capability, index) => {
            const Graphic = graphics[index];
            const isReversed = index === 1;
            const Icon = capability.icon;
            
            return (
              <div
                key={capability.id}
                className="group"
              >
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
                  {/* Graphic */}
                  <div className={`relative ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative bg-white/[0.02] backdrop-blur-sm rounded-3xl border border-white/10 group-hover:border-white/20 group-hover:bg-white/[0.04] transition-all duration-500 overflow-hidden">
                      {/* Decorative corner accent */}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${capability.gradient} opacity-5 rounded-bl-[100px]`} />
                      <Graphic />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${isReversed ? 'lg:order-1 lg:pr-8' : 'lg:order-2 lg:pl-8'}`}>
                    {/* Icon badge */}
                    <div className={`inline-flex items-center gap-3 mb-6`}>
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${capability.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-white/20 to-transparent" />
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-5 leading-tight group-hover:text-teal-400 transition-colors">
                      {capability.headline}
                    </h3>
                    
                    <p className="text-white/50 leading-relaxed text-base lg:text-lg mb-6 group-hover:text-white/70 transition-colors">
                      {capability.description}
                    </p>
                    
                    {/* Learn more link */}
                    <button className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${capability.gradient} bg-clip-text text-transparent hover:gap-3 transition-all duration-300`}>
                      Learn more
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-24">
          <div className="inline-flex flex-col items-center">
            <p className="text-white/40 text-sm mb-4">
              Built for serious operators who demand intelligent, scalable solutions.
            </p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-white/50">Trusted by 500+ businesses</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function OrderManagementGraphicDark() {
  return (
    <div className="relative w-full aspect-[4/3] min-h-[280px] flex items-center justify-center p-4">
      <img 
        src="/forecast.png" 
        alt="AI-powered demand forecasting and order management" 
        className="w-full h-full object-contain rounded-xl"
      />
    </div>
  );
}

function ReportingGraphicDark() {
  const metrics = [
    { label: 'Revenue', value: '$124.5K', change: '+12.3%', positive: true },
    { label: 'Orders', value: '1,847', change: '+8.1%', positive: true },
    { label: 'Avg. Value', value: '$67.40', change: '-2.4%', positive: false },
  ];

  return (
    <div className="relative w-full aspect-[4/3] min-h-[280px] flex items-center justify-center p-6">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #8b5cf6 1px, transparent 0)',
        backgroundSize: '24px 24px'
      }} />
      
      <div className="relative w-full max-w-md">
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <BarChart3 className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold text-white">Sales Report</span>
            </div>
            <div className="text-xs text-white/40">Last 30 days</div>
          </div>
          
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {metrics.map((metric) => (
              <div key={metric.label} className="p-3 text-center">
                <div className="text-[10px] uppercase tracking-wider text-white/40">{metric.label}</div>
                <div className="text-base font-bold text-white mt-0.5">{metric.value}</div>
                <div className={`text-xs font-medium ${metric.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {metric.change}
                </div>
              </div>
            ))}
          </div>
          
          <div className="px-4 pb-4 pt-2">
            <div className="flex items-end gap-1.5 h-20">
              {[30, 45, 35, 60, 50, 75, 65, 85, 70, 90, 80, 95].map((h, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-violet-500 to-purple-400 rounded-t opacity-70" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="absolute -right-2 top-8 bg-white/[0.05] backdrop-blur-sm rounded-xl border border-violet-500/30 p-3 max-w-[180px] animate-pulse">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Signal Alert</div>
              <div className="text-[10px] text-white/50 mt-0.5">Low stock detected on 3 items</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegrationsGraphicDark() {
  return (
    <div className="relative w-full aspect-[4/3] min-h-[280px] flex items-center justify-center p-4">
      <img 
        src="/integrations.png" 
        alt="Unified integrations and workflow automation" 
        className="w-full h-full object-contain rounded-xl"
      />
    </div>
  );
}

export function CoreCapabilities() {
  const { theme } = useTheme();
  return theme === 'nextgen' ? <CoreCapabilitiesNextGen /> : <CoreCapabilitiesClassic />;
}
