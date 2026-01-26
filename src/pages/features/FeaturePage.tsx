import { Link } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, type LucideIcon } from 'lucide-react';
import { Container, Button } from '../../components';
import { Header, Footer } from '../../sections';

export interface FeatureItem {
  title: string;
  description: string;
}

export interface FeaturePageProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  features: FeatureItem[];
  nextCategory?: {
    name: string;
    href: string;
  };
  prevCategory?: {
    name: string;
    href: string;
  };
}

export function FeaturePage({
  title,
  subtitle,
  description,
  icon: Icon,
  gradientFrom,
  gradientTo,
  features,
  nextCategory,
  prevCategory,
}: FeaturePageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        <section className={`py-16 lg:py-24 bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
          <Container>
            <div className="max-w-4xl">
              <Link 
                to="/#all-features" 
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all features
              </Link>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-white/80 font-medium">{subtitle}</p>
                  <h1 className="text-4xl lg:text-5xl font-bold text-white">{title}</h1>
                </div>
              </div>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>
          </Container>
        </section>

        <section className="py-16 lg:py-24">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-8">
                Key Features
              </h2>
              
              <div className="grid gap-6">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex gap-4 p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center flex-shrink-0`}>
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-1">{feature.title}</h3>
                      <p className="text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-12 bg-slate-50">
          <Container>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {prevCategory ? (
                <Link
                  to={prevCategory.href}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{prevCategory.name}</span>
                </Link>
              ) : (
                <div />
              )}
              
              {nextCategory && (
                <Link
                  to={nextCategory.href}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <span>{nextCategory.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </Container>
        </section>

        <section className="py-16 lg:py-20 bg-gradient-to-r from-slate-800 to-slate-700">
          <Container>
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to transform your {title.toLowerCase()}?
              </h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                See how Spark Inventory can streamline your operations and save you time.
              </p>
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => window.location.href = '/#book-demo'}
              >
                Book a Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Container>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
