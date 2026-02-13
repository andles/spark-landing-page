import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button, Container } from '../components';
import { useTheme } from '../context/ThemeContext';

function BookDemoClassic() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
    } catch (error) {
      console.error('Form submission error:', error);
    }
    
    // Open Calendly regardless of submission result
    window.open('https://calendly.com/jason-sparkinventory/30min', '_blank');
    setIsSubmitting(false);
  };

  return (
    <section id="book-demo" className="py-16 lg:py-20 bg-[#faf8f5]">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ready to Scale your Inventory Operations?
            </h2>
            <p className="text-lg text-gray-600">
              Book a personalized demo with our team and see how Spark can transform your business.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-100">
            <form 
              name="demo-request" 
              method="POST" 
              data-netlify="true" 
              className="space-y-6" 
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="demo-request" />
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="john@company.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="Acme Inc."
                    required
                  />
                </div>
              </div>
              <div className="text-center pt-4">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Get Your Free Demo'}
                </Button>
                <p className="text-sm text-gray-500 mt-3">Takes less than 2 minutes to schedule</p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

function BookDemoNextGen() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
    } catch (error) {
      console.error('Form submission error:', error);
    }
    
    // Open Calendly regardless of submission result
    window.open('https://calendly.com/jason-sparkinventory/30min', '_blank');
    setIsSubmitting(false);
  };

  return (
    <section id="book-demo" className="py-16 lg:py-20 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[150px]" />
      </div>
      
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-white/80 font-medium">Get Started</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              <span className="text-white">Ready to </span>
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Transform
              </span>
              <span className="text-white"> Your Operations?</span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Experience the future of inventory management. Book a personalized demo with our team.
            </p>
          </div>

          <div className="bg-white/[0.03] backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10">
            <form 
              name="demo-request" 
              method="POST" 
              data-netlify="true" 
              className="space-y-6" 
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="demo-request" />
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email-ng" className="block text-sm font-medium text-white/70 mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email-ng"
                    name="email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none transition-all"
                    placeholder="john@company.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="company-ng" className="block text-sm font-medium text-white/70 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company-ng"
                    name="company"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none transition-all"
                    placeholder="Acme Inc."
                    required
                  />
                </div>
              </div>
              <div className="text-center pt-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-semibold text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Book a Call'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a
                    href="https://app.sparkinventory.com/sign-up"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full text-white font-semibold text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(217,70,239,0.3)]"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                <p className="text-sm text-white/40 mt-3">Takes less than 2 minutes to schedule</p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function BookDemo() {
  const { theme } = useTheme();
  return theme === 'nextgen' ? <BookDemoNextGen /> : <BookDemoClassic />;
}
