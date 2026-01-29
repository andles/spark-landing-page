import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Container } from '../components';
import { Header, Footer } from '../sections';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from '../components';

const sections = [
  {
    title: '1. Key Definitions',
    content: [
      { term: 'Customer', definition: 'Any entity that subscribes to or contracts with us for use of the Services.' },
      { term: 'User', definition: 'An individual authorized by a Customer to access and use the Services.' },
      { term: 'Visitor', definition: 'Any person who accesses the public portions of our website without logging in.' },
      { term: 'Client Data', definition: 'Information, documents, or data (including Personal Data) submitted or uploaded by Customers and Users into the Services.' },
      { term: 'Personal Data', definition: 'Any data that identifies or can reasonably be linked to an individual.' },
      { term: 'Public Area', definition: 'Sections of our site that do not require authentication.' },
      { term: 'Restricted Area', definition: 'Portions of the platform that require login credentials.' },
    ],
  },
  {
    title: '2. Information We Collect',
    content: [
      { term: 'a. Information You Provide', definition: 'Includes name, contact details, billing info, preferences, and business-related data.' },
      { term: 'b. Data From Customers', definition: 'We act as a processor for Client Data submitted by Customers or their Users.' },
      { term: 'c. Automatically Collected Data', definition: 'Includes IP addresses, browser types, page visits, timestamps, and device information.' },
      { term: 'd. Integrated Services', definition: 'When you link accounts like Google, we may access basic profile data as authorized.' },
      { term: 'e. Third-Party Sources', definition: 'We may supplement data from partners, ad networks, or data providers.' },
    ],
  },
  {
    title: '3. How We Use Your Information',
    items: [
      'Service Delivery: Maintain and operate our platform.',
      'Customer Support: Help you with questions or issues.',
      'Product Improvement: Analyze usage trends.',
      'Marketing & Communications: Send updates and offers.',
      'Legal Compliance: Fulfill obligations and enforce agreements.',
    ],
  },
  {
    title: '4. Sharing of Information',
    items: [
      'With Vendors: For operations and service delivery.',
      'With Consent: As directed by you.',
      'Legal Requirements: As required by law or legal process.',
      'Business Transfers: During merger or acquisition events.',
      'Aggregate Insights: Shared in anonymized format.',
    ],
  },
  {
    title: '5. Cookies and Tracking',
    text: 'We use cookies to personalize content, measure performance, and improve your experience. Manage your preferences through your browser settings.',
  },
  {
    title: '6. Analytics',
    text: 'We use services like Google Analytics to understand how users interact with our site and improve its usability.',
  },
  {
    title: '7. Interest-Based Advertising',
    text: 'We may use cookies and advertising networks to deliver relevant ads. You can opt out at aboutads.info or networkadvertising.org.',
  },
  {
    title: '8. Data Access and Your Rights',
    text: 'You may request access, correction, or deletion of your Personal Data by contacting us. For data controlled by a Customer, please contact them directly.',
  },
  {
    title: '9. Data Security',
    text: 'We use encryption and other security practices to protect your data, but no system is entirely secure. Notify us immediately of any suspected breach.',
  },
  {
    title: '10. Retention',
    items: [
      'User accounts: while active',
      'Backups: up to 3 months',
      'Billing records: 7 years',
      'Legal agreements: 10 years',
    ],
  },
  {
    title: '11. Children\'s Privacy',
    text: 'We do not knowingly collect data from users under 18. If discovered, it will be removed promptly.',
  },
  {
    title: '12. International Data Transfers',
    text: 'Your data may be stored or processed in the EU or other jurisdictions with appropriate legal safeguards in place.',
  },
  {
    title: '13. Third-Party Services',
    text: 'We are not responsible for the privacy practices of external websites or tools linked through our Services.',
  },
  {
    title: '14. Data Controller vs. Processor',
    text: 'We act as a processor for Client Data and as a controller for information related to accounts, billing, and support.',
  },
  {
    title: '15. Updates to This Policy',
    text: 'We may revise this Privacy Policy over time. Updates will be posted with a new effective date. Continued use constitutes agreement to the updated terms.',
  },
  {
    title: '16. Contact Us',
    text: 'If you have questions or concerns, contact us at:',
    contact: 'support@sparkinventory.com',
  },
];

function PrivacyPolicyPageClassic() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        <section className="py-12 lg:py-16">
          <Container>
            <div className="max-w-3xl mx-auto">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-8 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to home
              </Link>

              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
                Privacy Policy
              </h1>

              <p className="text-slate-600 mb-8 leading-relaxed">
                Thank you for choosing to work with Spark Inventory ("we," "our," or "us"). This Privacy Policy explains how we collect, use, share, and protect your personal information when you access our website, use our web-based platform, mobile applications, or engage with us through other digital or offline means (collectively referred to as the "Services").
              </p>

              <p className="text-slate-600 mb-12 leading-relaxed">
                By using our Services, you agree to the collection and use of information as outlined in this policy.
              </p>

              <div className="space-y-10">
                {sections.map((section) => (
                  <div key={section.title}>
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">
                      {section.title}
                    </h2>
                    
                    {section.text && (
                      <p className="text-slate-600 leading-relaxed">
                        {section.text}
                      </p>
                    )}

                    {section.contact && (
                      <p className="text-slate-600 mt-2">
                        Email: <a href={`mailto:${section.contact}`} className="text-violet-600 hover:underline">{section.contact}</a>
                      </p>
                    )}

                    {section.content && (
                      <dl className="space-y-3">
                        {section.content.map((item) => (
                          <div key={item.term}>
                            <dt className="font-medium text-slate-700">{item.term}</dt>
                            <dd className="text-slate-600 ml-4">{item.definition}</dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    {section.items && (
                      <ul className="list-disc list-inside space-y-2 text-slate-600">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

function PrivacyPolicyPageNextGen() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="pt-20">
        <section className="py-12 lg:py-16 relative">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-black to-black" />
          </div>
          
          <Container className="relative z-10">
            <div className="max-w-3xl mx-auto">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to home
              </Link>

              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Privacy Policy
              </h1>

              <p className="text-white/60 mb-8 leading-relaxed">
                Thank you for choosing to work with Spark Inventory ("we," "our," or "us"). This Privacy Policy explains how we collect, use, share, and protect your personal information when you access our website, use our web-based platform, mobile applications, or engage with us through other digital or offline means (collectively referred to as the "Services").
              </p>

              <p className="text-white/60 mb-12 leading-relaxed">
                By using our Services, you agree to the collection and use of information as outlined in this policy.
              </p>

              <div className="space-y-10">
                {sections.map((section) => (
                  <div key={section.title}>
                    <h2 className="text-xl font-semibold text-white mb-4">
                      {section.title}
                    </h2>
                    
                    {section.text && (
                      <p className="text-white/60 leading-relaxed">
                        {section.text}
                      </p>
                    )}

                    {section.contact && (
                      <p className="text-white/60 mt-2">
                        Email: <a href={`mailto:${section.contact}`} className="text-cyan-400 hover:underline">{section.contact}</a>
                      </p>
                    )}

                    {section.content && (
                      <dl className="space-y-3">
                        {section.content.map((item) => (
                          <div key={item.term}>
                            <dt className="font-medium text-white/80">{item.term}</dt>
                            <dd className="text-white/50 ml-4">{item.definition}</dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    {section.items && (
                      <ul className="list-disc list-inside space-y-2 text-white/60">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
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

export function PrivacyPolicyPage() {
  const { theme } = useTheme();
  return theme === 'nextgen' ? <PrivacyPolicyPageNextGen /> : <PrivacyPolicyPageClassic />;
}
