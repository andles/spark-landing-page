import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Mail, User, MessageSquare } from 'lucide-react';
import { Container, Button } from '../components';
import { Header, Footer } from '../sections';
import { useTheme } from '../context/ThemeContext';

function ContactPageClassic() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link with form data
    const mailtoLink = `mailto:info@sparkinventory.com?subject=${encodeURIComponent(formData.subject || 'Contact Form Submission')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
    setIsSubmitted(true);
  };

  const isFormValid = formData.name.trim().length > 0 && 
                      formData.email.includes('@') && 
                      formData.email.includes('.') && 
                      formData.message.trim().length > 0;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        <section className="py-12 lg:py-20 bg-gradient-to-br from-violet-600 via-purple-600 to-violet-700 relative overflow-hidden">
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
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Get in Touch
                </h1>
                
                <p className="text-lg lg:text-xl text-white/80 leading-relaxed mb-8">
                  Have a question about Spark Inventory? We'd love to hear from you. 
                  Send us a message and we'll respond as soon as possible.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Email us at</p>
                      <a href="mailto:info@sparkinventory.com" className="text-white font-medium hover:underline">
                        info@sparkinventory.com
                      </a>
                    </div>
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
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                    <p className="text-slate-600 mb-4">
                      Your email client should have opened with your message. If not, please email us directly at{' '}
                      <a href="mailto:info@sparkinventory.com" className="text-violet-600 hover:underline">info@sparkinventory.com</a>
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Send us a Message</h2>
                    <p className="text-slate-600 mb-6">Fill out the form below and we'll get back to you shortly.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                            Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="text"
                              id="name"
                              value={formData.name}
                              onChange={(e) => updateField('name', e.target.value)}
                              placeholder="Your name"
                              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="email"
                              id="email"
                              value={formData.email}
                              onChange={(e) => updateField('email', e.target.value)}
                              placeholder="you@example.com"
                              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => updateField('subject', e.target.value)}
                          placeholder="What's this about?"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                          <textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => updateField('message', e.target.value)}
                            placeholder="How can we help you?"
                            rows={5}
                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none"
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!isFormValid}
                      >
                        Send Message
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </Container>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

function ContactPageNextGen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link with form data
    const mailtoLink = `mailto:info@sparkinventory.com?subject=${encodeURIComponent(formData.subject || 'Contact Form Submission')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
    setIsSubmitted(true);
  };

  const isFormValid = formData.name.trim().length > 0 && 
                      formData.email.includes('@') && 
                      formData.email.includes('.') && 
                      formData.message.trim().length > 0;

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="pt-20">
        <section className="py-12 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/40 via-black to-black" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/30 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-[128px]" />
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
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">Get in Touch</span>
                </h1>
                
                <p className="text-lg lg:text-xl text-white/50 leading-relaxed mb-8">
                  Have a question about Spark Inventory? We'd love to hear from you. 
                  Send us a message and we'll respond as soon as possible.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white/40 text-sm">Email us at</p>
                      <a href="mailto:info@sparkinventory.com" className="text-white font-medium hover:text-cyan-400 transition-colors">
                        info@sparkinventory.com
                      </a>
                    </div>
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
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/60 mb-4">
                      Your email client should have opened with your message. If not, please email us directly at{' '}
                      <a href="mailto:info@sparkinventory.com" className="text-cyan-400 hover:underline">info@sparkinventory.com</a>
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-white mb-2">Send us a Message</h2>
                    <p className="text-white/50 mb-6">Fill out the form below and we'll get back to you shortly.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name-ng" className="block text-sm font-medium text-white/70 mb-1">
                            Name <span className="text-red-400">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                            <input
                              type="text"
                              id="name-ng"
                              value={formData.name}
                              onChange={(e) => updateField('name', e.target.value)}
                              placeholder="Your name"
                              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-white placeholder:text-white/30"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="email-ng" className="block text-sm font-medium text-white/70 mb-1">
                            Email <span className="text-red-400">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                            <input
                              type="email"
                              id="email-ng"
                              value={formData.email}
                              onChange={(e) => updateField('email', e.target.value)}
                              placeholder="you@example.com"
                              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-white placeholder:text-white/30"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject-ng" className="block text-sm font-medium text-white/70 mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject-ng"
                          value={formData.subject}
                          onChange={(e) => updateField('subject', e.target.value)}
                          placeholder="What's this about?"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-white placeholder:text-white/30"
                        />
                      </div>

                      <div>
                        <label htmlFor="message-ng" className="block text-sm font-medium text-white/70 mb-1">
                          Message <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-white/30" />
                          <textarea
                            id="message-ng"
                            value={formData.message}
                            onChange={(e) => updateField('message', e.target.value)}
                            placeholder="How can we help you?"
                            rows={5}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-white placeholder:text-white/30 resize-none"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl text-white font-semibold text-lg transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        disabled={!isFormValid}
                      >
                        Send Message
                        <ArrowRight className="w-5 h-5 ml-2 inline" />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </Container>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export function ContactPage() {
  const { theme } = useTheme();
  return theme === 'nextgen' ? <ContactPageNextGen /> : <ContactPageClassic />;
}
