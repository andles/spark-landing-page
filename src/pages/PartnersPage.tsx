import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Users, DollarSign, BarChart3, Handshake, Sparkles, Check } from 'lucide-react';
import { Container, Button } from '../components';
import { Header, Footer } from '../sections';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from '../components';

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Commissions',
    description: 'Earn generous recurring commissions on every referral that converts to a paying customer.',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Get priority access to our partner success team for co-selling opportunities and technical support.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Tracking',
    description: 'Monitor your referrals, conversions, and commissions through our partner dashboard.',
  },
  {
    icon: Handshake,
    title: 'Co-Marketing Resources',
    description: 'Access sales collateral, demo environments, and marketing materials to help close deals.',
  },
];

function PartnersPageClassic() {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    company: '',
    phone: '',
    linkedin: '',
    website: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Partner application submitted:', formData);
    setIsSubmitted(true);
  };

  const isFormValid = formData.email.includes('@') && formData.email.includes('.') && 
                      formData.fullName.trim().length > 0 && formData.company.trim().length > 0;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        <section className="py-12 lg:py-20 bg-gradient-to-br from-violet-600 via-purple-600 to-violet-700 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          </div>
          
          <Container className="relative z-10">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left column - Copy */}
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-white/90 text-sm font-medium">Partner Program — Now Accepting Applications</span>
                </div>
                
                {/* Headline */}
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Earn Recurring Revenue<br />
                  <span className="text-white/90">Helping Businesses Grow</span>
                </h1>
                
                {/* Subheadline */}
                <p className="text-lg lg:text-xl text-white/80 leading-relaxed mb-8">
                  Earn commissions on every referral while delivering real value to your clients 
                  with AI-powered inventory management.
                </p>
                
                {/* Value props */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">Competitive recurring commissions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">Dedicated partner success team</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">Co-marketing resources & sales collateral</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">Real-time tracking dashboard</span>
                  </div>
                </div>
              </div>

              {/* Right column - Form */}
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Application Received!</h3>
                    <p className="text-slate-600 mb-4">
                      Thank you for applying. We'll review your application and get back to you within 48 hours.
                    </p>
                    <p className="text-sm text-slate-500">
                      Questions? Email <a href="mailto:partners@sparkinventory.com" className="text-violet-600 hover:underline">partners@sparkinventory.com</a>
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Apply to Become a Partner</h2>
                    <p className="text-slate-600 mb-6">Fill out the form below and we'll be in touch shortly.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => updateField('fullName', e.target.value)}
                            placeholder="John Smith"
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">
                            Company <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="company"
                            value={formData.company}
                            onChange={(e) => updateField('company', e.target.value)}
                            placeholder="Acme Consulting"
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            placeholder="(555) 123-4567"
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="linkedin" className="block text-sm font-medium text-slate-700 mb-1">
                            LinkedIn Profile
                          </label>
                          <input
                            type="url"
                            id="linkedin"
                            value={formData.linkedin}
                            onChange={(e) => updateField('linkedin', e.target.value)}
                            placeholder="linkedin.com/in/yourprofile"
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                          />
                        </div>
                        <div>
                          <label htmlFor="website" className="block text-sm font-medium text-slate-700 mb-1">
                            Company Website
                          </label>
                          <input
                            type="url"
                            id="website"
                            value={formData.website}
                            onChange={(e) => updateField('website', e.target.value)}
                            placeholder="https://example.com"
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!isFormValid}
                      >
                        Submit Application
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>

                      <p className="text-center text-sm text-slate-500">
                        Questions? Email <a href="mailto:partners@sparkinventory.com" className="text-violet-600 hover:underline">partners@sparkinventory.com</a>
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </Container>
        </section>

        <section id="benefits" className="py-16 lg:py-24">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-8">
                Partner Benefits
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit) => (
                  <div 
                    key={benefit.title}
                    className="flex gap-4 p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-1">{benefit.title}</h3>
                      <p className="text-slate-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 lg:py-20 bg-slate-50">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4">
                How It Works
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-violet-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">1</div>
                  <h3 className="font-semibold text-slate-800 mb-2">Apply</h3>
                  <p className="text-slate-600 text-sm">Submit your application and tell us about your business.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-violet-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">2</div>
                  <h3 className="font-semibold text-slate-800 mb-2">Get Approved</h3>
                  <p className="text-slate-600 text-sm">Our team reviews your application and sets you up for success.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-violet-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">3</div>
                  <h3 className="font-semibold text-slate-800 mb-2">Start Earning</h3>
                  <p className="text-slate-600 text-sm">Refer clients and earn commissions on every conversion.</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        </main>
      
      <Footer />
    </div>
  );
}

function PartnersPageNextGen() {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    company: '',
    phone: '',
    linkedin: '',
    website: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Partner application submitted:', formData);
    setIsSubmitted(true);
  };

  const isFormValid = formData.email.includes('@') && formData.email.includes('.') && 
                      formData.fullName.trim().length > 0 && formData.company.trim().length > 0;

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="pt-20">
        <section className="py-12 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/40 via-black to-black" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/30 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-[128px]" />
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-[100px]" />
          </div>
          
          <Container className="relative z-10">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left column - Copy */}
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span className="text-white/80 text-sm font-medium">Partner Program — Now Accepting Applications</span>
                </div>
                
                {/* Headline */}
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">Earn Recurring Revenue</span>
                  <br />
                  <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">Helping Businesses Grow</span>
                </h1>
                
                {/* Subheadline */}
                <p className="text-lg lg:text-xl text-white/50 leading-relaxed mb-8">
                  Earn commissions on every referral while delivering real value to your clients 
                  with AI-powered inventory management.
                </p>
                
                {/* Value props */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-500/30 to-cyan-500/30 flex items-center justify-center">
                      <Check className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-white/70">Competitive recurring commissions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-500/30 to-cyan-500/30 flex items-center justify-center">
                      <Check className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-white/70">Dedicated partner success team</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-500/30 to-cyan-500/30 flex items-center justify-center">
                      <Check className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-white/70">Co-marketing resources & sales collateral</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-500/30 to-cyan-500/30 flex items-center justify-center">
                      <Check className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-white/70">Real-time tracking dashboard</span>
                  </div>
                </div>
              </div>

              {/* Right column - Form */}
              <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Application Received!</h3>
                    <p className="text-white/60 mb-4">
                      Thank you for applying. We'll review your application and get back to you within 48 hours.
                    </p>
                    <p className="text-sm text-white/40">
                      Questions? Email <a href="mailto:partners@sparkinventory.com" className="text-cyan-400 hover:underline">partners@sparkinventory.com</a>
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-white mb-2">Apply to Become a Partner</h2>
                    <p className="text-white/50 mb-6">Fill out the form below and we'll be in touch shortly.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="fullName-ng" className="block text-sm font-medium text-white/70 mb-1">
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            id="fullName-ng"
                            value={formData.fullName}
                            onChange={(e) => updateField('fullName', e.target.value)}
                            placeholder="John Smith"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-white placeholder:text-white/30"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email-ng" className="block text-sm font-medium text-white/70 mb-1">
                            Email <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            id="email-ng"
                            value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-white placeholder:text-white/30"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="company-ng" className="block text-sm font-medium text-white/70 mb-1">
                            Company <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            id="company-ng"
                            value={formData.company}
                            onChange={(e) => updateField('company', e.target.value)}
                            placeholder="Acme Consulting"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-white placeholder:text-white/30"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="phone-ng" className="block text-sm font-medium text-white/70 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            id="phone-ng"
                            value={formData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            placeholder="(555) 123-4567"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-white placeholder:text-white/30"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="linkedin-ng" className="block text-sm font-medium text-white/70 mb-1">
                            LinkedIn Profile
                          </label>
                          <input
                            type="url"
                            id="linkedin-ng"
                            value={formData.linkedin}
                            onChange={(e) => updateField('linkedin', e.target.value)}
                            placeholder="linkedin.com/in/yourprofile"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-white placeholder:text-white/30"
                          />
                        </div>
                        <div>
                          <label htmlFor="website-ng" className="block text-sm font-medium text-white/70 mb-1">
                            Company Website
                          </label>
                          <input
                            type="url"
                            id="website-ng"
                            value={formData.website}
                            onChange={(e) => updateField('website', e.target.value)}
                            placeholder="https://example.com"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-white placeholder:text-white/30"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl text-white font-semibold text-lg transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        disabled={!isFormValid}
                      >
                        Submit Application
                        <ArrowRight className="w-5 h-5 ml-2 inline" />
                      </button>

                      <p className="text-center text-sm text-white/40">
                        Questions? Email <a href="mailto:partners@sparkinventory.com" className="text-cyan-400 hover:underline">partners@sparkinventory.com</a>
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </Container>
        </section>

        <section id="benefits-nextgen" className="py-16 lg:py-24 relative">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">
                Partner Benefits
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit) => (
                  <div 
                    key={benefit.title}
                    className="group flex gap-4 p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/[0.05] hover:border-white/20 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{benefit.title}</h3>
                      <p className="text-white/50">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 lg:py-20 relative">
          <div className="absolute inset-0 bg-white/[0.02]" />
          <Container className="relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                How It Works
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">1</div>
                  <h3 className="font-semibold text-white mb-2">Apply</h3>
                  <p className="text-white/50 text-sm">Submit your application and tell us about your business.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">2</div>
                  <h3 className="font-semibold text-white mb-2">Get Approved</h3>
                  <p className="text-white/50 text-sm">Our team reviews your application and sets you up for success.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">3</div>
                  <h3 className="font-semibold text-white mb-2">Start Earning</h3>
                  <p className="text-white/50 text-sm">Refer clients and earn commissions on every conversion.</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        </main>
      
      <Footer />
      <ThemeToggle />
    </div>
  );
}

export function PartnersPage() {
  const { theme } = useTheme();
  return theme === 'nextgen' ? <PartnersPageNextGen /> : <PartnersPageClassic />;
}
