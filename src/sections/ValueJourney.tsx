import { Container } from '../components';

const tiles = [
  {
    number: 1,
    image: '/data-migration.png',
    title: 'AI Data Migration',
    description: "Our team handles your full data migration so you can start generating value from day one. We'll securely import your products, historical sales data, supplier details, and customer details so no manual setup is required.",
    accent: 'from-pink-500 to-purple-500',
  },
  {
    number: 2,
    image: '/tablet-mobile.png',
    title: 'Drive Efficiency',
    description: "Let Spark's AI agent act as an extension of your team. Gain real-time insights and clear, actionable recommendations to optimize inventory and operations. When you're ready, enable the agent to take action on your behalf, automating updates, reorder points, and purchase orders.",
    accent: 'from-purple-500 to-cyan-500',
  },
  {
    number: 3,
    image: '/dashboard.png',
    title: 'Boost Revenue',
    description: "Spark's white-labeled seller and vendor portals transform how your customers buy and how your suppliers stay aligned. Improve visibility across partners and unlock new revenue opportunities.",
    accent: 'from-cyan-500 to-emerald-500',
  },
];

export function ValueJourney() {
  return (
    <section id="solutions" className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
      
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-16">
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
              Why Spark?
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 lg:max-w-lg leading-tight">
              The Smarter Way to Scale
            </h2>
          </div>
          <p className="text-lg text-slate-600 lg:max-w-md lg:pt-12">
            Set up in minutes, import your products, connect your sales channels, 
            and start processing orders seamlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiles.map((tile) => (
            <div
              key={tile.number}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tile.accent}`}></div>
              
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl aspect-[4/3] mb-6 flex items-center justify-center overflow-hidden shadow-inner">
                <img 
                  src={tile.image} 
                  alt={tile.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 bg-gradient-to-br ${tile.accent} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg`}>
                  {tile.number}
                </div>
                <h3 className="text-xl font-bold text-slate-800">{tile.title}</h3>
              </div>
              
              <p className="text-slate-600 leading-relaxed">{tile.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-10 flex justify-center md:justify-start md:pl-4">
          <button 
            className="group relative px-8 py-4 bg-primary text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-primary-dark"
            onClick={() => document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' })}
          >
            🚀 Book a demo today!
          </button>
        </div>
      </Container>
    </section>
  );
}
