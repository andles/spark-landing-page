import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Container } from '../components';
import { Header, Footer } from '../sections';
import { useTheme } from '../context/ThemeContext';

interface Section {
  title: string;
  text?: string;
  paragraphs?: string[];
  definitions?: { term: string; definition: string }[];
  items?: string[];
}

const sections: Section[] = [
  {
    title: '1. Definitions',
    text: 'In addition to capitalized terms that are defined anywhere in this Agreement, the capitalized terms set forth below shall have the meanings set forth therein for the purposes of this Agreement and any Order Form in which such term is used but not defined:',
    definitions: [
      { term: '1.1 "Spark Platform"', definition: 'means the version of a Software Product made available to Users through the internet.' },
      { term: '1.2 "Customer"', definition: 'means the purchasing entity identified on the Order Form.' },
      { term: '1.3 "Date Purchased"', definition: 'means the purchase date or effective date identified on the Order Form.' },
      { term: '1.4 "Documentation"', definition: 'means the user guides and manuals for installation and use of a Software Product that Spark Inventory makes generally available.' },
      { term: '1.5 "Hosted Services"', definition: 'means the Cloud Server/Hosting services designated in a relevant Order Form, which Customer is purchasing pursuant to this Agreement.' },
      { term: '1.6 "Intellectual Property Rights"', definition: 'means Spark Inventory\'s or its licensors\' patent, copyright, trademark, trade secret and any other intellectual property rights.' },
      { term: '1.7 "Order Form"', definition: 'means the standard Spark Inventory form used for placing orders of Spark Inventory Services, executed by Customer.' },
      { term: '1.8 "Products"', definition: 'means Software Products and Hosted Services licensed or purchased pursuant to this Agreement and the relevant Order Form.' },
      { term: '1.9 "Software Product(s)"', definition: 'means software products owned or licensed by Spark Inventory to which Spark Inventory grants the right to access and use, including Documentation and Updates, subject to the terms of the applicable Order Form(s) and this Agreement.' },
      { term: '1.10 "Subscription"', definition: 'means a subscription to the Software Products identified on the Order Form.' },
      { term: '1.11 "Subscription Term"', definition: 'means the term of a Subscription as set forth in the applicable Order Form.' },
      { term: '1.12 "Support"', definition: 'means support, maintenance, and related services made available by Spark Inventory for applicable Products, or as designated in a relevant Order Form purchased by Customer.' },
      { term: '1.13 "Update"', definition: 'means a current release of the Software Product which Spark Inventory makes generally available for Subscriptions.' },
      { term: '1.14 "User"', definition: 'means any person who is affiliated with Customer as (a) a full-time or part-time employee, or (b) a full-time or part-time contractor authorized by Customer to access the Software Product.' },
    ],
  },
  {
    title: '2. Term',
    text: 'This Agreement is valid so long as an Order Form or a Subscription granted therein is in effect. The initial Subscription Term of the Software Products and Hosted Services procured by Customer shall be as set forth in the relevant Order Form. Unless otherwise specified in an Order Form, the Subscription Term shall automatically renew for successive terms equal to the initial Subscription Term specified in the Order Form ("Renewal Term") unless either Party gives the other notice of non-renewal at least sixty (60) days prior to the end of the relevant Subscription Term.',
  },
  {
    title: '3. Spark Inventory Services',
    paragraphs: [
      '3.1 Order Form. Spark Inventory shall make the purchased Spark Inventory Services available to Customer pursuant to this Agreement and the relevant Order Forms, unless earlier suspended or terminated in accordance with this Agreement or an Order Form. Unless otherwise specified, changes to an Order Form must be mutually agreed in writing and may require additional fees.',
      '3.2 Subscriptions. Software Products and Hosted Services are provided on a subscription basis and will be made available during the applicable Subscription Term specified in the relevant Order Form. Customer agrees that purchases under this Agreement are neither contingent on delivery of future functionality nor dependent on any public statements by Spark Inventory regarding future features.',
    ],
  },
  {
    title: '4. Provision of Spark Inventory Services',
    text: '4.1 Software Products and Hosted Services. Access to Spark Platform and Hosted Services will be provided to Customer through the internet, subject to customer\'s payment of applicable fees.',
  },
  {
    title: '5. Fees and Payment Terms',
    paragraphs: [
      '5.1 Fees and Charges. Customer agrees to pay all Fees as specified in the applicable Order Form. Fees are based on Subscriptions purchased and not actual usage; fees paid are non-refundable.',
      '5.2 Payment Terms. All Fees are due as specified on an Order Form. Fees may be payable on a monthly or other periodic basis as set in the Order Form.',
      '5.3 Payment by Credit Card. To the extent Spark Inventory accepts credit card payments, Customer authorizes Spark Inventory to charge the card for recurring subscription fees.',
      '5.4 Late Payments. Amounts unpaid after the due date may be subject to late charges and suspension of Services until amounts are paid.',
    ],
  },
  {
    title: '6. Usage Restrictions',
    text: 'Customer shall not:',
    items: [
      'Reverse engineer the Software Products;',
      'Attempt to bypass technological protections;',
      'Distribute or sublicense the Products to third parties;',
      'Use the Products to operate a competing service.',
    ],
  },
  {
    title: '7. Support and Updates',
    text: 'Spark Inventory shall provide Support as designated in the Order Form. Spark Inventory may update or enhance the Software Product from time to time.',
  },
  {
    title: '8. Intellectual Property Rights',
    text: 'All intellectual property rights in and to the Software Products and Documentation remain with Spark Inventory or its licensors.',
  },
  {
    title: '9. Confidentiality',
    text: 'Each Party agrees to maintain the confidentiality of non-public information and not disclose such information to third parties.',
  },
  {
    title: '10. Termination',
    text: 'Either Party may terminate this Agreement upon material breach if the other Party fails to cure the breach within thirty (30) days of notice. Upon termination, Customer\'s access to the Software Product will cease and all outstanding fees shall become due.',
  },
  {
    title: '11. Warranty Disclaimer',
    text: 'THE SOFTWARE PRODUCTS ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. SPARK INVENTORY DISCLAIMS ALL IMPLIED WARRANTIES, INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.',
  },
  {
    title: '12. Limitation of Liability',
    text: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, SPARK INVENTORY\'S TOTAL LIABILITY ARISING OUT OF OR RELATING TO THIS AGREEMENT SHALL NOT EXCEED THE TOTAL AMOUNT PAID BY CUSTOMER TO SPARK INVENTORY DURING THE TWELVE (12) MONTHS PRECEDING THE CLAIM.',
  },
  {
    title: '13. Governing Law',
    text: 'This Agreement shall be governed by the laws of the State of Delaware, without regard to conflict of law principles.',
  },
];

function SectionContent({ section, classNames }: { section: Section; classNames: { text: string; term: string; definition: string; item: string } }) {
  return (
    <>
      {section.text && (
        <p className={`${classNames.text} leading-relaxed`}>
          {section.text}
        </p>
      )}

      {section.paragraphs && (
        <div className="space-y-4">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className={`${classNames.text} leading-relaxed`}>
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {section.definitions && (
        <dl className="space-y-3 mt-4">
          {section.definitions.map((item) => (
            <div key={item.term}>
              <dt className={`font-medium ${classNames.term}`}>{item.term}</dt>
              <dd className={`${classNames.definition} ml-4`}>{item.definition}</dd>
            </div>
          ))}
        </dl>
      )}

      {section.items && (
        <ul className={`list-disc list-inside space-y-2 ${classNames.item} mt-3`}>
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
}

function TermsOfServicePageClassic() {
  const classNames = {
    text: 'text-slate-600',
    term: 'text-slate-700',
    definition: 'text-slate-600',
    item: 'text-slate-600',
  };

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

              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                Software Subscription Terms and Conditions
              </h1>

              <p className="text-sm text-slate-400 mb-8">
                Last Updated: February 10th, 2026
              </p>

              <p className="text-slate-600 mb-8 leading-relaxed text-sm uppercase tracking-wide">
                PLEASE READ THESE SPARK INVENTORY SOFTWARE SUBSCRIPTION TERMS AND CONDITIONS (THE "AGREEMENT") CAREFULLY BEFORE USING THE SERVICES OFFERED BY SPARK INVENTORY, INC., A DELAWARE CORPORATION ("SPARK INVENTORY"). BY EXECUTING THE ORDER FORM (AS DEFINED BELOW) WHICH INCORPORATES THE TERMS OF THIS AGREEMENT, CUSTOMER (AS DEFINED BELOW) CONSENTS TO BE BOUND BY AND TO BECOME A PARTY TO THE AGREEMENT TO THE EXCLUSION OF ALL OTHER TERMS. IF THE PERSON EXECUTING AN ORDER FORM ON BEHALF OF CUSTOMER IS ENTERING INTO THE AGREEMENT ON BEHALF OF A COMPANY OR OTHER LEGAL ENTITY, SUCH PERSON REPRESENTS THAT HE OR SHE HAS THE AUTHORITY TO BIND SUCH ENTITY TO THE AGREEMENT.
              </p>

              <p className="text-slate-600 mb-12 leading-relaxed">
                Spark Inventory and Customer shall herein be referred to each as a "Party" and collectively as the "Parties". Subject to the terms and conditions of this Agreement, the Parties agree as follows:
              </p>

              <div className="space-y-10">
                {sections.map((section) => (
                  <div key={section.title}>
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">
                      {section.title}
                    </h2>
                    <SectionContent section={section} classNames={classNames} />
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

function TermsOfServicePageNextGen() {
  const classNames = {
    text: 'text-white/60',
    term: 'text-white/80',
    definition: 'text-white/50',
    item: 'text-white/60',
  };

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

              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Software Subscription Terms and Conditions
              </h1>

              <p className="text-sm text-white/30 mb-8">
                Last Updated: February 10th, 2026
              </p>

              <p className="text-white/60 mb-8 leading-relaxed text-sm uppercase tracking-wide">
                PLEASE READ THESE SPARK INVENTORY SOFTWARE SUBSCRIPTION TERMS AND CONDITIONS (THE "AGREEMENT") CAREFULLY BEFORE USING THE SERVICES OFFERED BY SPARK INVENTORY, INC., A DELAWARE CORPORATION ("SPARK INVENTORY"). BY EXECUTING THE ORDER FORM (AS DEFINED BELOW) WHICH INCORPORATES THE TERMS OF THIS AGREEMENT, CUSTOMER (AS DEFINED BELOW) CONSENTS TO BE BOUND BY AND TO BECOME A PARTY TO THE AGREEMENT TO THE EXCLUSION OF ALL OTHER TERMS. IF THE PERSON EXECUTING AN ORDER FORM ON BEHALF OF CUSTOMER IS ENTERING INTO THE AGREEMENT ON BEHALF OF A COMPANY OR OTHER LEGAL ENTITY, SUCH PERSON REPRESENTS THAT HE OR SHE HAS THE AUTHORITY TO BIND SUCH ENTITY TO THE AGREEMENT.
              </p>

              <p className="text-white/60 mb-12 leading-relaxed">
                Spark Inventory and Customer shall herein be referred to each as a "Party" and collectively as the "Parties". Subject to the terms and conditions of this Agreement, the Parties agree as follows:
              </p>

              <div className="space-y-10">
                {sections.map((section) => (
                  <div key={section.title}>
                    <h2 className="text-xl font-semibold text-white mb-4">
                      {section.title}
                    </h2>
                    <SectionContent section={section} classNames={classNames} />
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

export function TermsOfServicePage() {
  const { theme } = useTheme();
  return theme === 'nextgen' ? <TermsOfServicePageNextGen /> : <TermsOfServicePageClassic />;
}
